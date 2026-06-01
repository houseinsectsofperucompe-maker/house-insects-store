import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const SUNAT_CLIENT_ID     = process.env.SUNAT_CLIENT_ID     || ''
const SUNAT_CLIENT_SECRET = process.env.SUNAT_CLIENT_SECRET || ''
const SUNAT_RUC           = process.env.SUNAT_RUC           || '20447397804'
const SUNAT_TOKEN_URL     = 'https://api-seguridad.sunat.gob.pe/v1/clientessol/grant'
const SUNAT_API_BASE      = 'https://api.sunat.gob.pe'

const COMPROBANTES_FILE = path.join(process.cwd(), 'public', 'data', 'comprobantes.json')

// ── Helpers ────────────────────────────────────────────────────
function leerComprobantes() {
  try {
    if (!fs.existsSync(COMPROBANTES_FILE)) return []
    return JSON.parse(fs.readFileSync(COMPROBANTES_FILE, 'utf-8'))
  } catch { return [] }
}

function guardarComprobantes(data: any[]) {
  fs.mkdirSync(path.dirname(COMPROBANTES_FILE), { recursive: true })
  fs.writeFileSync(COMPROBANTES_FILE, JSON.stringify(data, null, 2))
}

// ── Obtener token SUNAT ────────────────────────────────────────
async function getToken(): Promise<string> {
  const credentials = Buffer.from(`${SUNAT_CLIENT_ID}:${SUNAT_CLIENT_SECRET}`).toString('base64')
  const res = await fetch(SUNAT_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&scope=https://api.sunat.gob.pe/v1/contribuyente/gem'
  })
  const data = await res.json()
  return data.access_token || ''
}

// ── Número correlativo ─────────────────────────────────────────
function getSiguienteNumero(tipo: string): string {
  const comps = leerComprobantes()
  const serie = tipo === 'factura' ? 'F001' : 'B001'
  const delTipo = comps.filter((c: any) => c.tipo === tipo)
  const ultimo = delTipo.length > 0
    ? Math.max(...delTipo.map((c: any) => parseInt(c.numero.split('-')[1] || '0')))
    : 0
  return `${serie}-${String(ultimo + 1).padStart(8, '0')}`
}

// ── Construir XML UBL 2.1 ──────────────────────────────────────
function buildXML(datos: any): string {
  const { tipo, numero, fecha, cliente, items, subtotal, igv, total, moneda } = datos
  const tipoDoc = tipo === 'factura' ? '01' : '03'
  const tipoNombre = tipo === 'factura' ? 'FACTURA ELECTRÓNICA' : 'BOLETA DE VENTA ELECTRÓNICA'

  const itemsXML = items.map((item: any, i: number) => `
    <cac:InvoiceLine>
      <cbc:ID>${i + 1}</cbc:ID>
      <cbc:InvoicedQuantity unitCode="NIU">${item.cantidad}</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="${moneda}">${item.subtotal.toFixed(2)}</cbc:LineExtensionAmount>
      <cac:TaxTotal>
        <cbc:TaxAmount currencyID="${moneda}">${(item.subtotal * 0.18).toFixed(2)}</cbc:TaxAmount>
        <cac:TaxSubtotal>
          <cbc:TaxableAmount currencyID="${moneda}">${item.subtotal.toFixed(2)}</cbc:TaxableAmount>
          <cbc:TaxAmount currencyID="${moneda}">${(item.subtotal * 0.18).toFixed(2)}</cbc:TaxAmount>
          <cac:TaxCategory>
            <cbc:ID schemeID="UN/ECE 5305" schemeName="Tax Category Identifier">S</cbc:ID>
            <cbc:Percent>18</cbc:Percent>
            <cac:TaxScheme>
              <cbc:ID>1000</cbc:ID>
              <cbc:Name>IGV</cbc:Name>
              <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
            </cac:TaxScheme>
          </cac:TaxCategory>
        </cac:TaxSubtotal>
      </cac:TaxTotal>
      <cac:Item>
        <cbc:Description>${item.descripcion}</cbc:Description>
      </cac:Item>
      <cac:Price>
        <cbc:PriceAmount currencyID="${moneda}">${item.precioUnitario.toFixed(2)}</cbc:PriceAmount>
      </cac:Price>
    </cac:InvoiceLine>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
  xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
  xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
  xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2">
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>2.0</cbc:CustomizationID>
  <cbc:ID>${numero}</cbc:ID>
  <cbc:IssueDate>${fecha}</cbc:IssueDate>
  <cbc:IssueTime>00:00:00</cbc:IssueTime>
  <cbc:InvoiceTypeCode listID="0101">${tipoDoc}</cbc:InvoiceTypeCode>
  <cbc:Note languageLocaleID="1000">${tipoNombre}</cbc:Note>
  <cbc:DocumentCurrencyCode>${moneda}</cbc:DocumentCurrencyCode>
  <cac:Signature>
    <cbc:ID>${SUNAT_RUC}</cbc:ID>
    <cac:SignatoryParty>
      <cac:PartyName><cbc:Name>House Insects of Peru E.I.R.L.</cbc:Name></cac:PartyName>
    </cac:SignatoryParty>
  </cac:Signature>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="6">${SUNAT_RUC}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName><cbc:Name>HOUSE INSECTS OF PERU E.I.R.L.</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Jr. Tingo Maria</cbc:StreetName>
        <cbc:CityName>Tingo María</cbc:CityName>
        <cbc:CountrySubentity>Huánuco</cbc:CountrySubentity>
        <cac:Country><cbc:IdentificationCode>PE</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="${cliente.tipoDoc || '6'}">${cliente.documento || '00000000'}</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName><cbc:Name>${cliente.nombre || 'CLIENTE GENERAL'}</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>${cliente.direccion || ''}</cbc:StreetName>
        <cbc:CityName>${cliente.ciudad || ''}</cbc:CityName>
        <cac:Country><cbc:IdentificationCode>${cliente.pais || 'PE'}</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="${moneda}">${igv.toFixed(2)}</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="${moneda}">${subtotal.toFixed(2)}</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="${moneda}">${igv.toFixed(2)}</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>18</cbc:Percent>
        <cac:TaxScheme>
          <cbc:ID>1000</cbc:ID>
          <cbc:Name>IGV</cbc:Name>
          <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="${moneda}">${subtotal.toFixed(2)}</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="${moneda}">${subtotal.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="${moneda}">${total.toFixed(2)}</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="${moneda}">${total.toFixed(2)}</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  ${itemsXML}
</Invoice>`
}

// ── GET — listar comprobantes ──────────────────────────────────
export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get('tipo')
  const comps = leerComprobantes()
  const filtrados = tipo ? comps.filter((c: any) => c.tipo === tipo) : comps
  return NextResponse.json({ comprobantes: filtrados })
}

// ── POST — emitir comprobante ──────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { accion } = body

    // ── Emitir factura o boleta ──────────────────────────────
    if (accion === 'emitir') {
      const {
        tipo = 'boleta', // 'factura' o 'boleta'
        cliente,
        items,
        moneda = 'USD',
        ordenId,
        metodoPago,
      } = body

      const numero  = getSiguienteNumero(tipo)
      const fecha   = new Date().toISOString().split('T')[0]
      const subtotal = items.reduce((a: number, i: any) => a + i.subtotal, 0)
      const igv      = subtotal * 0.18
      const total    = subtotal + igv

      const datos = { tipo, numero, fecha, cliente, items, subtotal, igv, total, moneda }

      // Construir XML
      const xml = buildXML(datos)

      // Obtener token SUNAT
      let token = ''
      let sunatOk = false
      let sunatMsg = 'Sin conexión SUNAT'

      try {
        token = await getToken()
        if (token) {
          // Enviar a SUNAT via API GEM
          const xmlBase64 = Buffer.from(xml).toString('base64')
          const sunatRes = await fetch(`${SUNAT_API_BASE}/v1/contribuyente/gem/comprobantes/${numero}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              archivo: {
                nomArchivo: `${SUNAT_RUC}-${tipo === 'factura' ? '01' : '03'}-${numero}.xml`,
                arcGreLog: xmlBase64,
                hashZip: '',
              }
            })
          })
          const sunatData = await sunatRes.json()
          sunatOk = sunatData.success || sunatRes.ok
          sunatMsg = sunatData.mensaje || 'Enviado a SUNAT'
        }
      } catch (e) {
        sunatMsg = 'Error conectando a SUNAT — guardado localmente'
      }

      // Guardar comprobante localmente
      const comprobante = {
        id:          `${numero}-${Date.now()}`,
        tipo,
        numero,
        fecha,
        cliente,
        items,
        subtotal,
        igv,
        total,
        moneda,
        ordenId:     ordenId || '',
        metodoPago:  metodoPago || 'izipay',
        sunatOk,
        sunatMsg,
        xml,
        creado:      new Date().toISOString(),
      }

      const comps = leerComprobantes()
      comps.push(comprobante)
      guardarComprobantes(comps)

      return NextResponse.json({
        ok: true,
        numero,
        sunatOk,
        sunatMsg,
        comprobante,
      })
    }

    // ── Consultar estado en SUNAT ────────────────────────────
    if (accion === 'consultar') {
      const { numero } = body
      try {
        const token = await getToken()
        const res = await fetch(`${SUNAT_API_BASE}/v1/contribuyente/gem/comprobantes/${numero}/rechazos`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        return NextResponse.json({ ok: true, estado: data })
      } catch {
        return NextResponse.json({ ok: false, error: 'Error consultando SUNAT' })
      }
    }

    return NextResponse.json({ ok: false, error: 'Acción no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
