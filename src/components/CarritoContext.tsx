'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

// ══════════════════════════════════════════════════════════════════
// TIPOS — todos los campos que necesita el carrito
// ══════════════════════════════════════════════════════════════════

export interface ItemCarrito {
  id:        string
  nombre:    string
  n?:        string   // alias legacy de nombre
  p:         number
  qty:       number
  foto:      string
  familia:   string
  rubro:     string
  orden?:    string
  subfamilia?: string
  subespecie?: string
  marco?: string
  [key: string]: any
}

export type Courier = 'exportafacil' | 'ems' | 'dhl' | 'fedex' | ''
export type Seguro  = 'lloyds' | 'ship' | 'insurtech' | ''

export interface PermisosExportacion {
  serfor:        boolean  // SERFOR — especímenes, cuadros, maderas
  fitosanitario: boolean  // SENASA Fitosanitario
  digesa:        boolean  // DIGESA — alimentos, esencias
}

export interface CourierInfo {
  nombre: string
  tiempo: string
  icono:  string
}

export interface SeguroInfo {
  nombre: string
  icono:  string
}

// ══════════════════════════════════════════════════════════════════
// CONSTANTES
// ══════════════════════════════════════════════════════════════════

export const COURIER_INFO: Record<string, CourierInfo> = {
  exportafacil: { nombre: 'Exporta Fácil (Serpost)', tiempo: '15-30 días', icono: '📦' },
  ems:          { nombre: 'EMS Serpost',              tiempo: '7-15 días',  icono: '✈️'  },
  dhl:          { nombre: 'DHL Express',              tiempo: '3-5 días',   icono: '🚀' },
  fedex:        { nombre: 'FedEx International',      tiempo: '3-5 días',   icono: '🚀' },
}

export const SEGURO_INFO: Record<string, SeguroInfo> = {
  lloyds:    { nombre: "Lloyd's London",   icono: '🛡️' },
  ship:      { nombre: 'Ship Insurance',   icono: '🚢' },
  insurtech: { nombre: 'Insurtech Digital',icono: '📲' },
}

// Rubros que requieren cada permiso
const RUBROS_SERFOR        = ['especimenes','cuadros','nocturnas','coleoptera','rarezas','maderas']
const RUBROS_FITOSANITARIO = ['especimenes','cuadros','nocturnas','coleoptera','rarezas','semillas','hongos','frutas','alimentos','superalimentos']
const RUBROS_DIGESA        = ['semillas','hongos','frutas','alimentos','superalimentos','esencias']

export const COSTO_SERFOR        = 100  // USD
export const COSTO_FITOSANITARIO = 100  // USD
export const COSTO_DIGESA        = 80   // USD
export const COSTO_SEGURO_PCT    = 0.02 // 2% del subtotal
export const MINIMO_PEDIDO       = 300  // USD mínimo

// ══════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════

export function getPermisos(rubros: string[]): PermisosExportacion {
  const s = new Set(rubros)
  return {
    serfor:        RUBROS_SERFOR.some(r        => s.has(r)),
    fitosanitario: RUBROS_FITOSANITARIO.some(r => s.has(r)),
    digesa:        RUBROS_DIGESA.some(r        => s.has(r)),
  }
}

export function calcularTotales(items: ItemCarrito[], courier: Courier, seguro: Seguro) {
  const subtotal   = items.reduce((acc, i) => acc + i.p * i.qty, 0)
  const rubros     = [...new Set(items.map(i => i.rubro))]
  const permisos   = getPermisos(rubros)

  const costoSerfor  = permisos.serfor        ? COSTO_SERFOR        : 0
  const costoFito    = permisos.fitosanitario  ? COSTO_FITOSANITARIO : 0
  const costoDigesa  = permisos.digesa         ? COSTO_DIGESA        : 0
  const costoTramites= costoSerfor + costoFito + costoDigesa
  const costoSeguro  = seguro ? Math.round(subtotal * COSTO_SEGURO_PCT) : 0

  // Costo courier según selección
  const TARIFAS_COURIER: Record<string, number> = {
    exportafacil: 25,
    ems:          45,
    dhl:          85,
    fedex:        85,
  }
  const costoCourier = courier ? (TARIFAS_COURIER[courier] ?? 0) : 0
  const total = subtotal + costoTramites + costoSeguro + costoCourier

  return {
    subtotal,
    costoSerfor,
    costoFito,
    costoDigesa,
    costoTramites,
    costoSeguro,
    costoCourier,
    total,
    permisos,
    cumpleMinimo: subtotal >= MINIMO_PEDIDO,
  }
}

// QR tracking URL
export function getQRTrackingURL(pedidoId: string): string {
  return `https://houseinsectsofperu.com/tracking/${pedidoId}`
}

// ══════════════════════════════════════════════════════════════════
// CONTEXT
// ══════════════════════════════════════════════════════════════════

interface CarritoContextType {
  items:          ItemCarrito[]
  abierto:        boolean
  totalItems:     number
  cantidad:       number
  agregarItem:    (item: ItemCarrito | Omit<ItemCarrito, 'qty'>) => void
  addItem:        (item: ItemCarrito | Omit<ItemCarrito, 'qty'>) => void
  quitarItem:     (id: string) => void
  actualizarQty:  (id: string, qty: number) => void
  updateItems:    (items: ItemCarrito[]) => void
  limpiarCarrito: () => void
  abrirCarrito:   () => void
  cerrarCarrito:  () => void
}

const CarritoContext = createContext<CarritoContextType | null>(null)

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [items,   setItems]   = useState<ItemCarrito[]>([])
  const [abierto, setAbierto] = useState(false)

  const agregarItem = useCallback((item: any) => {
    setItems((prev: ItemCarrito[]) => {
      const existe = prev.find((i: ItemCarrito) => i.id === item.id)
      if (existe) {
        return prev.map((i: ItemCarrito) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...item, qty: item.qty ?? 1 }] as ItemCarrito[]
    })
    setAbierto(true)
  }, [])

  const quitarItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const actualizarQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id))
    } else {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
    }
  }, [])

  const limpiarCarrito = useCallback(() => setItems([]), [])
  const abrirCarrito   = useCallback(() => setAbierto(true),  [])
  const cerrarCarrito  = useCallback(() => setAbierto(false), [])

  const totalItems = items.reduce((acc, i) => acc + i.qty, 0)

  return (
        <CarritoContext.Provider value={{
      items, abierto, totalItems,
      cantidad: totalItems,
      agregarItem, addItem: agregarItem,
      quitarItem, actualizarQty,
      updateItems: setItems,
      limpiarCarrito, abrirCarrito, cerrarCarrito,
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito(): CarritoContextType {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}

// ── Alias de compatibilidad con CarritoCompras.tsx ──────────────
export type Item = any
