'use client'
import { useState } from 'react'

export default function ExportacionPage() {
  const [open, setOpen] = useState<string|null>(null)
  const [done, setDone] = useState<number[]>([])

  const tog = (id:string, n:number) => {
    if(open===id){setOpen(null)}
    else{
      setOpen(id)
      if(!done.includes(n)) setDone([...done,n])
    }
  }

  const pct = (done.length/8*100)+'%'

  const Card = ({id,n,icon,title,sub,badge,bc,children}:{id:string,n:number,icon:string,title:string,sub:string,badge:string,bc:string,children:React.ReactNode}) => (
    <div onClick={()=>tog(id,n)} style={{background:open===id?'rgba(201,168,76,0.1)':'rgba(201,168,76,0.04)',border:`1px solid ${open===id?'#C9A84C':'rgba(201,168,76,0.15)'}`,borderRadius:10,padding:16,marginBottom:10,cursor:'pointer',transition:'all .25s'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:34,height:34,borderRadius:'50%',background:open===id?'#C9A84C':'rgba(201,168,76,0.1)',border:`1px solid ${open===id?'#C9A84C':'rgba(201,168,76,0.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.75rem',fontWeight:700,color:open===id?'#1A1209':'#C9A84C',flexShrink:0}}>{n}</div>
        <div style={{fontSize:'1.4rem',flexShrink:0}}>{icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:'.88rem',fontWeight:700,color:'#E8C97A',marginBottom:2}}>{title}</div>
          <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.45)',letterSpacing:'.04em'}}>{sub}</div>
        </div>
        <span style={{fontSize:'.58rem',padding:'3px 8px',borderRadius:20,fontWeight:700,flexShrink:0,...JSON.parse(bc)}}>{badge}</span>
      </div>
      {open===id&&<div style={{marginTop:12,paddingTop:12,borderTop:'1px solid rgba(201,168,76,0.1)'}}>{children}</div>}
    </div>
  )

  const DC = ({title,rows}:{title:string,rows:[string,string][]}) => (
    <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'10px 12px',marginBottom:8}}>
      <div style={{fontSize:'.72rem',fontWeight:700,color:'#C9A84C',marginBottom:5}}>{title}</div>
      {rows.map(([k,v],i)=>(
        <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'2px 0',fontSize:'.63rem'}}>
          <span style={{color:'rgba(201,168,76,0.4)'}}>{k}</span>
          <span style={{color:'rgba(232,201,122,0.8)',textAlign:'right',maxWidth:'60%'}}>{v}</span>
        </div>
      ))}
    </div>
  )

  const Auth = ({title,rows}:{title:string,rows:string[]}) => (
    <div style={{background:'rgba(37,211,102,0.06)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:8,padding:'10px 12px',marginBottom:8}}>
      <div style={{fontSize:'.7rem',fontWeight:700,color:'#25D366',marginBottom:5}}>{title}</div>
      {rows.map((r,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:6,padding:'2px 0',fontSize:'.62rem',color:'rgba(232,201,122,0.7)'}}>{r}</div>)}
    </div>
  )

  const QR = ({url,title,desc,auth}:{url:string,title:string,desc:string,auth:string}) => (
    <div style={{display:'flex',alignItems:'center',gap:10,background:'rgba(37,211,102,0.04)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:8,padding:10,marginTop:8}}>
      <div style={{background:'white',padding:5,borderRadius:5,flexShrink:0}}>
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=${encodeURIComponent(url)}`} style={{width:70,height:70,display:'block'}} alt="QR"/>
      </div>
      <div style={{flex:1}}>
        <div style={{fontSize:'.68rem',fontWeight:700,color:'#25D366',marginBottom:3}}>{title}</div>
        <div style={{fontSize:'.6rem',color:'rgba(201,168,76,0.5)',lineHeight:1.5}}>{desc}</div>
        <div style={{fontSize:'.6rem',color:'#25D366',marginTop:4,fontWeight:700}}>{auth}</div>
      </div>
    </div>
  )

  const bc1 = JSON.stringify({background:'rgba(201,168,76,0.1)',color:'#C9A84C',border:'1px solid rgba(201,168,76,0.2)'})
  const bc2 = JSON.stringify({background:'rgba(37,211,102,0.1)',color:'#25D366',border:'1px solid rgba(37,211,102,0.2)'})
  const bc3 = JSON.stringify({background:'rgba(126,184,247,0.1)',color:'#7EB8F7',border:'1px solid rgba(126,184,247,0.2)'})

  return (
    <div style={{background:'#1A1209',minHeight:'100vh',fontFamily:'Georgia,serif',color:'#E8C97A'}}>
      <div style={{background:'linear-gradient(135deg,#1A1209,#2A1A08)',borderBottom:'1px solid rgba(201,168,76,0.3)',padding:'20px 24px',textAlign:'center'}}>
        <img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',marginBottom:10,borderRadius:'50%',border:'2px solid rgba(201,168,76,0.4)'}} alt="House Insects of Peru"/>
        <h1 style={{fontSize:'1.3rem',fontWeight:300,letterSpacing:'.08em',marginBottom:4}}>Proceso de Exportación Legal</h1>
        <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',letterSpacing:'.1em'}}>HOUSE INSECTS OF PERU E.I.R.L. · RUC 20447397804 · TINGO MARÍA, PERÚ</p>
        <div style={{height:3,background:'rgba(201,168,76,0.08)',borderRadius:2,margin:'10px 0 4px',overflow:'hidden'}}>
          <div style={{height:'100%',background:'linear-gradient(to right,#C9A84C,#E8C97A)',borderRadius:2,width:pct,transition:'width 1s ease'}}/>
        </div>
        <p style={{fontSize:'.6rem',color:'rgba(201,168,76,0.3)',letterSpacing:'.08em',marginTop:4}}>CLIC EN CADA PASO · QR VERIFICABLE POR ADUANA Y AUTORIDADES</p>
      </div>

      <div style={{padding:'20px 14px',maxWidth:780,margin:'0 auto'}}>

        <Card id="s1" n={1} icon="🛒" title="Compra + Factura Electrónica SUNAT" sub="FACTURA E001 · RUC 20447397804 · VERIFICABLE ONLINE" badge="INICIO" bc={bc1}>
          <DC title="📋 Factura Electrónica SUNAT — E001-13" rows={[['Empresa','House Insects of Peru E.I.R.L.'],['RUC','20447397804'],['Producto','Especímenes disecados · Morphinae/Nymphalidae'],['Moneda','USD · Soles · Multi-divisa']]}/>
          <Auth title="🔐 QR en la Factura — Para Aduana y Autoridades" rows={['✓ Aduana Perú escanea y verifica la transacción en SUNAT','✓ Aduana destino verifica el valor declarado','✓ Policía confirma que la empresa es formal y registrada','✓ Verificable en portal SUNAT con clave SOL']}/>
          <QR url="https://e-factura.sunat.gob.pe/20447397804/E001-13" title="📲 QR SUNAT — Factura Verificable por Aduana" desc="Aduana, PNP y autoridades escanean este QR para confirmar que la factura es auténtica y que House Insects of Peru es empresa formal registrada en SUNAT" auth="✓ VERIFICADO · EMPRESA FORMAL · RUC ACTIVO"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s2" n={2} icon="🌿" title="Permiso SERFOR + Cert. Entomológico" sub="GUÍA TRANSPORTE FAUNA SILVESTRE · BIÓLOGO CERTIFICADO" badge="OFICIAL" bc={bc2}>
          <DC title="🏛️ SERFOR — Guía Transporte Fauna Silvestre" rows={[['Titular','Javier Luis Zavala Lopez'],['Finalidad','Comercial · Exportación internacional'],['Total','2,517 especímenes certificados · Disecados']]}/>
          <Auth title="🔐 QR en Guía SERFOR — Para Aduana y PNP" rows={['✓ Policía Nacional escanea y verifica autorización legal','✓ SUNAT Aduana confirma permiso de exportación','✓ Aduana destino verifica que los especímenes son legales','✓ MINAGRI confirma el permiso de fauna silvestre']}/>
          <QR url="https://serfor.gob.pe/verificar/GTFS-000596" title="📲 QR SERFOR — Verificable por Policía y Aduana" desc="PNP, Aduana Perú y autoridades del país destino escanean este QR para confirmar que los especímenes tienen permiso oficial de SERFOR/MINAGRI" auth="✓ AUTORIZADO · FAUNA SILVESTRE LEGAL · SERFOR"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s3" n={3} icon="🌍" title="SENASA + CITES + DIGESA" sub="FITOSANITARIO · CONVENCIÓN CITES · DIGESA SANITARIO" badge="INTERNACIONAL" bc={bc2}>
          <DC title="🌱 Certificado Fitosanitario SENASA N°003894" rows={[['Organismo','SENASA · Dr. Rafael Guillen'],['Tratamiento','Hipoclorito de Sodio 95% · 6 meses · 28°C'],['CITES','Apéndice II · Exportación certificada'],['DIGESA','Registro sanitario · Productos naturales']]}/>
          <Auth title="🔐 QR SENASA+CITES — Para Aduana Internacional" rows={['✓ Aduana USA / Europa / Asia escanea y verifica CITES','✓ Confirma que los especímenes están libres de enfermedades','✓ SENASA verifica el tratamiento de desinfección aplicado','✓ CITES confirma que la exportación es legal según convenio']}/>
          <QR url="https://senasa.gob.pe/verificar/003894" title="📲 QR SENASA+CITES — Verificable en Todo el Mundo" desc="Aduanas de 190+ países escanean este QR para confirmar el Certificado Fitosanitario SENASA y la autorización CITES · Cumple normas FAO y Convenio de Washington" auth="✓ FREE OF DISEASES · CITES LEGAL · SENASA CERTIFIED"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s4" n={4} icon="📦" title="ExportaFácil · SERPOST · EMS Internacional" sub="SUNAT EXPORTAFÁCIL · EMS POSTAL · EMBALAJE CERTIFICADO" badge="PRINCIPAL" bc={bc1}>
          <DC title="📮 ExportaFácil SUNAT + SERPOST + EMS" rows={[['Programa','ExportaFácil · SUNAT + SERPOST Perú'],['EMS','Express Mail Service · Red UPU · +190 países'],['Límite','Hasta $7,500 USD · Sin agente de aduana'],['Tiempo EMS','7-15 días hábiles · Con rastreo incluido'],['Beneficio','Exoneración IGV · DUA simplificada online']]}/>
          <Auth title="🔐 QR ExportaFácil — Declaración Aduanera Verificable" rows={['✓ SUNAT verifica la declaración de exportación DUA','✓ Aduana Perú confirma el despacho legal por ExportaFácil','✓ SERPOST registra el envío en sistema EMS internacional','✓ Aduana destino verifica el manifiesto de carga']}/>
          <QR url="https://exportafacil.sunat.gob.pe" title="📲 QR ExportaFácil — Verificable por Aduana" desc="Aduana Perú y destino escanean este QR para verificar la Declaración Única de Aduanas (DUA) generada en ExportaFácil SUNAT · Todo el proceso es 100% legal y transparente" auth="✓ DUA VERIFICADA · EXPORTAFÁCIL SUNAT · SERPOST EMS"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s5" n={5} icon="🛡️" title="Seguro Internacional del Envío" sub="LLOYD'S · SHIP INSURANCE · COBERTURA TOTAL" badge="SEGURO" bc={bc3}>
          <DC title="🏛️ Lloyd's of London · Ship Insurance" rows={[['Cobertura','Pérdida · Daño · Robo · En tránsito'],['Valor','100% del valor declarado en factura SUNAT'],['Validez','Desde despacho Lima hasta entrega final']]}/>
          <Auth title="🔐 QR Seguro — Póliza Verificable en Aduana" rows={['✓ Aduana verifica que el envío tiene cobertura de seguro','✓ Empresa de courier confirma la póliza activa','✓ Cliente verifica su cobertura antes de la entrega']}/>
          <QR url="https://shipinsurance.com/verify/houseinsectsofperu" title="📲 QR Seguro — Póliza Activa Verificable" desc="Aduana, courier y cliente escanean este QR para verificar que el envío tiene seguro activo · Cobertura total door to door" auth="✓ PÓLIZA ACTIVA · LLOYD'S LONDON · COBERTURA TOTAL"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s6" n={6} icon="✈️" title="Logística Internacional" sub="EMS + SERPOST PRINCIPAL · DHL · FEDEX · UPS OPCIONALES" badge="EXPRESS" bc={bc1}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(100px,1fr))',gap:6,marginBottom:8}}>
            {[['EMS · SERPOST','7-15 días','★ PRINCIPAL',true],['ExportaFácil','10-20 días','★ PRINCIPAL',true],['DHL','2-5 días','opcional',false],['FedEx','3-5 días','opcional',false],['UPS','3-7 días','opcional',false],['Aramex','5-10 días','opcional',false]].map(([n,t,c,m])=>(
              <div key={String(n)} style={{background:m?'rgba(201,168,76,0.1)':'rgba(201,168,76,0.05)',border:`1px solid rgba(201,168,76,${m?'.35':'.1'})`,borderRadius:7,padding:8,textAlign:'center'}}>
                <div style={{fontSize:'.7rem',fontWeight:700,color:'#C9A84C',marginBottom:2}}>{String(n)}</div>
                <div style={{fontSize:'.58rem',color:'rgba(201,168,76,0.4)'}}>{String(t)}</div>
                <div style={{fontSize:'.55rem',color:m?'#25D366':'rgba(201,168,76,0.4)',marginTop:2}}>{String(c)}</div>
              </div>
            ))}
          </div>
          <Auth title="🔐 QR Logística — Guía de Envío Verificable" rows={['✓ Aeropuerto escanea y verifica el manifiesto de carga','✓ Aduana en tránsito verifica documentos del envío','✓ Aduana destino confirma la guía aérea y contenido']}/>
          <QR url="https://ems.post/track/houseinsectsofperu" title="📲 QR Guía Aérea — Aeropuerto y Aduana" desc="Aeropuerto, aduana en tránsito y aduana destino escanean este QR para verificar la guía de envío EMS/SERPOST y confirmar que el paquete es legal" auth="✓ GUÍA VERIFICADA · EMS INTERNACIONAL · SERPOST PERÚ"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s7" n={7} icon="📱" title="Rastreo en Tiempo Real" sub="QR EN CADA DOCUMENTO · TRACKING LIVE · ADUANA · POLICÍA" badge="LIVE 🔴" bc={bc2}>
          <Auth title="🔐 QR en Cada Documento — Cualquier Autoridad Puede Verificar" rows={['📋 Factura SUNAT → Aduana verifica empresa y valor','🌿 Guía SERFOR → PNP verifica permiso fauna silvestre','🌍 SENASA+CITES → Aduana destino verifica sanidad y legalidad','📦 ExportaFácil → SUNAT verifica DUA de exportación','🛡️ Seguro → Courier verifica póliza activa','✈️ Guía EMS → Aeropuerto verifica manifiesto de carga']}/>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:8,marginBottom:8}}>
            {[['#C9A84C','Lima · Despachado'],['#C9A84C','En vuelo internacional'],['#25D366','En destino · Aduana'],['rgba(201,168,76,0.25)','Entrega final']].map(([c,t],i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:5,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:16,padding:'4px 10px',fontSize:'.62rem'}}>
                <div style={{width:7,height:7,borderRadius:'50%',background:String(c)}}/>
                <span style={{color:i===2?'#25D366':'rgba(232,201,122,0.7)'}}>{String(t)}</span>
              </div>
            ))}
          </div>
          <QR url="https://www.houseinsectsofperu.com/rastreo" title="📲 QR Master — Rastreo + Verificación Completa" desc="Este QR master contiene todos los documentos del envío verificables en tiempo real · Aduana, PNP, policía del país destino pueden escanear y confirmar que todo es legal" auth="✓ EXPORTACIÓN 100% LEGAL · TODOS LOS DOCUMENTOS VERIFICABLES"/>
        </Card>

        <div style={{width:2,height:10,background:'linear-gradient(to bottom,rgba(201,168,76,0.25),rgba(201,168,76,0.05))',margin:'0 auto 0 25px'}}/>

        <Card id="s8" n={8} icon="🏠" title="Entrega al Cliente" sub="CONFIRMACIÓN · TODOS LOS DOCUMENTOS INCLUIDOS · GARANTÍA" badge="✓ FINAL" bc={bc2}>
          <DC title="🎁 Paquete Incluye Todos los Documentos Originales" rows={[['✓ Factura SUNAT','Con QR verificable'],['✓ Guía SERFOR','Con QR verificable'],['✓ SENASA + CITES','Con QR verificable'],['✓ Póliza Seguro','Con QR verificable'],['✓ Guía EMS/SERPOST','Con QR rastreo'],['Soporte','WhatsApp +51 940 699 405']]}/>
        </Card>

        <div style={{marginTop:20,paddingTop:18,borderTop:'1px solid rgba(201,168,76,0.1)'}}>
          <p style={{textAlign:'center',fontSize:'.62rem',color:'rgba(201,168,76,0.35)',letterSpacing:'.1em',marginBottom:12}}>INICIAR SU EXPORTACIÓN</p>
          <a href="/catalogo/especimenes" style={{display:'block',textAlign:'center',background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:8,padding:11,color:'#C9A84C',textDecoration:'none',fontSize:'.78rem',marginBottom:7}}>🦋 Ver Catálogo y Comprar Ahora</a>
          <a href="https://www.sunat.gob.pe/orientacionaduanera/exportafacil/index.html" target="_blank" style={{display:'block',textAlign:'center',background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:8,padding:11,color:'#C9A84C',textDecoration:'none',fontSize:'.78rem',marginBottom:7}}>📦 Portal ExportaFácil SUNAT</a>
          <a href="https://wa.me/51940699405?text=Hola, quiero información sobre exportación" style={{display:'block',textAlign:'center',background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:8,padding:11,color:'#25D366',textDecoration:'none',fontSize:'.78rem',marginBottom:7}}>💬 WhatsApp · +51 940 699 405</a>
          <a href="/" style={{display:'block',textAlign:'center',background:'transparent',border:'1px solid rgba(201,168,76,0.18)',borderRadius:8,padding:10,color:'rgba(201,168,76,0.45)',textDecoration:'none',fontSize:'.78rem',marginTop:8}}>← Volver al Escritorio Principal</a>
        </div>

      </div>
    </div>
  )
}
