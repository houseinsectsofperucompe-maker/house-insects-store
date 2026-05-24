'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'
type E={n:string;p:number;s:number;foto?:string;video?:string}
type F={id:string;nm:string;e:E[]}
const FAM:F[]=[
{id:'Brassolidae',nm:'Brassolidae',e:[{n:'Caligo eurilochus livius',p:4.0,s:800},{n:'Caligo idomenius idomenides',p:6.5,s:100},{n:'Caligo illioneus',p:3.5,s:200},{n:'Caligo placidianus',p:4.0,s:200},{n:'Caligo prometheus',p:9.0,s:200},{n:'Caligo superbus',p:15.0,s:50},{n:'Caligo teucer semicaerulea',p:3.5,s:300},{n:'Dynastor darius darius',p:15.0,s:10},{n:'Opoptera aorsa',p:4.5,s:100},{n:'Opoptera arsippe arsippe',p:4.5,s:200},{n:'Opsiphanes bogatanus',p:3.5,s:100},{n:'Opsiphanes tamarindi incolumis',p:4.0,s:50},{n:'Caligo illioneus oberon',p:4.0,s:200},{n:'Caligo Oberthuri floklides',p:10.0,s:50},{n:'Eryphanis Polyxena',p:7.5,s:200},{n:'Catoblepia Berecynthia',p:10.0,s:20},{n:'Dynastor macrosirus stix',p:30.0,s:5},{n:'Opoptera Arsippe Bracteolata',p:4.0,s:20},{n:'Opsiphanes Cassina',p:3.5,s:50},{n:'Opsiphanes Sallei',p:3.0,s:100},{n:'Opsiphanes Invirae Agasthenes',p:2.5,s:200},{n:'Opsiphanes Quiteria Quirinalis',p:2.5,s:100}]},
{id:'Danaidae',nm:'Danaidae',e:[{n:'Danaus plexippus nigrippus',p:2.5,s:2000},{n:'Lycorea halia',p:4.0,s:20},{n:'Lycorea ilione lamaris',p:1.5,s:2000},{n:'Lycorea Ituna Ilione Phenarete',p:2.0,s:100},{n:'Danaus Gilippus thersippus',p:3.0,s:200}]},
{id:'Heliconidae',nm:'Heliconidae & Ithomidae',e:[{n:'Dione juno',p:1.3,s:5000},{n:'Dione moneta',p:2.5,s:500},{n:'Dryas julia',p:1.3,s:5000},{n:'Eueides (Heliconius) aliphera',p:1.8,s:2000},{n:'Eueides isabella dissolutus',p:2.5,s:5},{n:'Euides tales',p:2.0,s:500},{n:'Godyris duillia (Ithomidae)',p:2.5,s:500},{n:'Godyris zavalata huanaco',p:1.8,s:500},{n:'Heliconius burneyi huebneri',p:4.0,s:100},{n:'Heliconius erato microclea',p:2.5,s:200},{n:'Heliconius hecale shanki',p:5.5,s:10},{n:'Heliconius melpomene amaryllis',p:2.0,s:5000},{n:'Heliconius melpomene',p:2.5,s:20},{n:'Heliconius numata bicoloratus',p:2.0,s:500},{n:'Heliconius telesiphe telesiphe',p:2.0,s:500},{n:'Heliconius wallacei flavescens',p:1.8,s:500},{n:'Methona curvifascia',p:1.8,s:3000},{n:'Philaethria (Metamorpha) dido',p:4.0,s:200},{n:'Thyridia psidii cetoides',p:1.5,s:2000},{n:'Tithorea harmonia',p:2.5,s:200},{n:'Hypothyris semifulva',p:2.0,s:300},{n:'Mechanitis polymnia',p:2.0,s:10}]},
{id:'Lycaenidae',nm:'Lycaenidae',e:[{n:'Arawacus seperata',p:6.5,s:200},{n:'Arcas imperialis',p:15.0,s:200},{n:'Arcas tuneta',p:15.0,s:100},{n:'Evenus gannymedes',p:18.0,s:20},{n:'Thecla gibberosa',p:12.0,s:100},{n:'Arawacus dolylas',p:10.0,s:15}]},
const VISTAS=['Frente','Lado','Reverso','Video'] as const
type Vista=typeof VISTAS[number]
export default function EspecimenPage(){
  const params=useParams()
  const router=useRouter()
  const {addItem}=useCarrito()
  const [v,setV]=useState<Vista>('Frente')
  const [ok,setOk]=useState(false)
  const rawId=typeof params.id==='string'?params.id:''
  const parts=rawId.split('-')
  const idx=parseInt(parts[parts.length-1])
  const famId=parts.slice(0,-1).join('-')
  const fam=FAM.find(f=>f.id===famId)
  const esp=fam?.e[idx]
  if(!fam||!esp)return(
    <main style={{minHeight:'100vh',background:'#0A0A05',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',color:'rgba(201,168,76,0.5)',fontFamily:'Georgia,serif'}}>
        <p style={{fontSize:'3rem',marginBottom:16}}>🦋</p>
        <p style={{fontSize:'1rem',marginBottom:24}}>Espécimen no encontrado</p>
        <button onClick={()=>router.back()} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'10px 24px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif'}}>← Volver</button>
      </div>
    </main>
  )
  const add=()=>{addItem({n:esp.n,p:esp.p,rubro:fam.nm});setOk(true);setTimeout(()=>setOk(false),2000)}
  const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',paddingBottom:80}}>
      <CarritoCompras/>
      <div style={{padding:'16px 20px',display:'flex',alignItems:'center',gap:12,borderBottom:`1px solid ${BD}`}}>
        <button onClick={()=>router.back()} style={{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,padding:'7px 14px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>← <ST t="Volver"/></button>
        <span style={{color:'rgba(201,168,76,0.35)',fontSize:'.7rem'}}>{fam.nm}</span>
      </div>
      <div style={{maxWidth:480,margin:'0 auto',padding:'20px 16px'}}>
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,overflow:'hidden',marginBottom:16}}>
          <div style={{width:'100%',height:280,background:'#050501',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {v==='Video'&&esp.video?<video src={esp.video} controls autoPlay muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            :v==='Frente'&&esp.foto?<img src={esp.foto} alt={esp.n} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            :<div style={{textAlign:'center',color:'rgba(201,168,76,0.25)',fontSize:'.7rem'}}><div style={{fontSize:'3rem',marginBottom:8}}>📷</div><div style={{textTransform:'uppercase',letterSpacing:2}}>{v}</div><div style={{marginTop:4,fontSize:'.6rem'}}>PRÓXIMAMENTE</div></div>}
          </div>
          <div style={{display:'flex',gap:4,padding:'10px 12px',borderTop:`1px solid ${BD}`}}>
            {VISTAS.map(t=>(
              <button key={t} onClick={()=>setV(t)} style={{flex:1,padding:'6px 4px',borderRadius:16,fontSize:'.6rem',cursor:'pointer',fontFamily:'Georgia,serif',border:`1px solid ${v===t?G:BD}`,background:v===t?G:'transparent',color:v===t?CARD:G,fontWeight:v===t?700:400,transition:'all 0.18s'}}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,padding:'16px',marginBottom:16}}>
          <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginBottom:4,textTransform:'uppercase',letterSpacing:2}}>{fam.nm}</p>
          <h1 style={{fontSize:'1rem',fontStyle:'italic',color:'#E8C97A',marginBottom:12,lineHeight:1.4}}>{esp.n}</h1>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:12,borderTop:`1px solid ${BD}`}}>
            <div><div style={{fontSize:'1.4rem',fontWeight:700,color:G}}>${esp.p.toFixed(2)}</div><div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>USD por unidad</div></div>
            <div style={{textAlign:'right'}}><div style={{fontSize:'.75rem',color:esp.s>0?'#5DBB63':'rgba(201,168,76,0.35)',fontWeight:700}}>{esp.s>0?`✓ ${esp.s.toLocaleString()} unid.`:'Sin stock'}</div><div style={{fontSize:'.6rem',color:'rgba(201,168,76,0.3)',marginTop:2}}>Stock disponible</div></div>
          </div>
        </div>
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,padding:'14px 16px',marginBottom:16,fontSize:'.65rem',color:'rgba(201,168,76,0.5)',lineHeight:1.8}}>
          <div style={{color:G,fontWeight:700,marginBottom:8,fontSize:'.7rem'}}>📦 <ST t="Información de exportación"/></div>
          <div>🌍 <ST t="Exportación mundial"/> · Tingo María, Perú</div>
          <div>✈️ <ST t="Envío express disponible"/></div>
          <div>📋 <ST t="Incluye certificado CITES cuando requerido"/></div>
          <div>📞 WhatsApp: +51 940 699 405</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <button onClick={add} disabled={esp.s===0} style={{width:'100%',padding:'14px',borderRadius:8,fontSize:'.85rem',fontFamily:'Georgia,serif',cursor:esp.s>0?'pointer':'not-allowed',background:ok?'#5DBB63':esp.s>0?G:'rgba(201,168,76,0.15)',color:ok||esp.s>0?CARD:'rgba(201,168,76,0.3)',border:'none',fontWeight:700,transition:'all 0.2s'}}>
            {ok?'✓ Agregado al carrito':<ST t="Agregar al carrito"/>}
          </button>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${encodeURIComponent(esp.n)} - $${esp.p.toFixed(2)} USD`} target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,background:'#25D366',color:'white',fontSize:'.8rem',fontFamily:'Georgia,serif',textDecoration:'none',fontWeight:700}}>
            💬 <ST t="Consultar por WhatsApp"/>
          </a>
        </div>
      </div>
    </main>
  )
}
