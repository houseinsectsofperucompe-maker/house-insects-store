'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'
import { FOTOS } from '@/data/fotos'
type E={n:string;p:number;s:number}
type F={id:string;nm:string;e:E[]}
const FAM:F[]=[
{id:'Brassolidae',nm:'Brassolidae',e:[{n:'Caligo eurilochus livius',p:4.0,s:800},{n:'Caligo idomenius idomenides',p:6.5,s:100},{n:'Caligo illioneus',p:3.5,s:200},{n:'Caligo placidianus',p:4.0,s:200},{n:'Caligo prometheus',p:9.0,s:200},{n:'Caligo superbus',p:15.0,s:50},{n:'Caligo teucer semicaerulea',p:3.5,s:300},{n:'Dynastor darius darius',p:15.0,s:10},{n:'Opoptera aorsa',p:4.5,s:100},{n:'Opoptera arsippe arsippe',p:4.5,s:200},{n:'Opsiphanes bogatanus',p:3.5,s:100},{n:'Opsiphanes tamarindi incolumis',p:4.0,s:50},{n:'Caligo illioneus oberon',p:4.0,s:200},{n:'Caligo Oberthuri floklides',p:10.0,s:50},{n:'Eryphanis Polyxena',p:7.5,s:200},{n:'Catoblepia Berecynthia',p:10.0,s:20},{n:'Dynastor macrosirus stix',p:30.0,s:5},{n:'Opoptera Arsippe Bracteolata',p:4.0,s:20},{n:'Opsiphanes Cassina',p:3.5,s:50},{n:'Opsiphanes Sallei',p:3.0,s:100},{n:'Opsiphanes Invirae Agasthenes',p:2.5,s:200},{n:'Opsiphanes Quiteria Quirinalis',p:2.5,s:100}]},
{id:'Danaidae',nm:'Danaidae',e:[{n:'Danaus plexippus nigrippus',p:2.5,s:2000},{n:'Lycorea halia',p:4.0,s:20},{n:'Lycorea ilione lamaris',p:1.5,s:2000},{n:'Lycorea Ituna Ilione Phenarete',p:2.0,s:100},{n:'Danaus Gilippus thersippus',p:3.0,s:200}]},
{id:'Heliconidae',nm:'Heliconidae & Ithomidae',e:[{n:'Dione juno',p:1.3,s:5000},{n:'Dione moneta',p:2.5,s:500},{n:'Dryas julia',p:1.3,s:5000},{n:'Eueides aliphera',p:1.8,s:2000},{n:'Eueides isabella dissolutus',p:2.5,s:5},{n:'Euides tales',p:2.0,s:500},{n:'Godyris duillia',p:2.5,s:500},{n:'Godyris zavalata huanaco',p:1.8,s:500},{n:'Heliconius burneyi huebneri',p:4.0,s:100},{n:'Heliconius erato microclea',p:2.5,s:200},{n:'Heliconius hecale shanki',p:5.5,s:10},{n:'Heliconius melpomene amaryllis',p:2.0,s:5000},{n:'Heliconius melpomene',p:2.5,s:20},{n:'Heliconius numata bicoloratus',p:2.0,s:500},{n:'Heliconius telesiphe telesiphe',p:2.0,s:500},{n:'Heliconius wallacei flavescens',p:1.8,s:500},{n:'Methona curvifascia',p:1.8,s:3000},{n:'Philaethria dido',p:4.0,s:200},{n:'Thyridia psidii cetoides',p:1.5,s:2000},{n:'Tithorea harmonia',p:2.5,s:200},{n:'Hypothyris semifulva',p:2.0,s:300},{n:'Mechanitis polymnia',p:2.0,s:10}]},
{id:'Lycaenidae',nm:'Lycaenidae',e:[{n:'Arawacus seperata',p:6.5,s:200},{n:'Arcas imperialis',p:15.0,s:200},{n:'Arcas tuneta',p:15.0,s:100},{n:'Evenus gannymedes',p:18.0,s:20},{n:'Thecla gibberosa',p:12.0,s:100},{n:'Arawacus dolylas',p:10.0,s:15}]},
{id:'Morphidae',nm:'Morphidae',e:[{n:'Morpho absoloni',p:43.0,s:100},{n:'Morpho aurora aureola',p:13.0,s:200},{n:'Morpho lympharis selenarys',p:13.5,s:1000},{n:'Morpho sulkowskyi descimokoenigi',p:13.5,s:200},{n:'Morpho rhetenor cacica',p:33.0,s:500},{n:'Morpho rhtenor helena',p:45.0,s:1000},{n:'Morpho telemachus',p:5.5,s:500},{n:'Morpho zephritis',p:13.5,s:1000},{n:'Morpho theseus juturna',p:20.0,s:500},{n:'Morpho menelaus assarpai',p:12.0,s:500},{n:'Morpho Cisseis gahua',p:15.0,s:200},{n:'Morpho cisseis phanademus',p:18.0,s:50},{n:'Morpho adonis huallaga',p:12.0,s:200},{n:'Morpho amphitriom cinerous',p:43.0,s:100},{n:'Morpho deidamia marie',p:7.5,s:1000},{n:'Morpho achilles helenor',p:5.5,s:1000},{n:'Morpho didius',p:7.0,s:5000},{n:'Morpho didius tingomaria',p:7.0,s:5000},{n:'Morpho menelaus michaelus',p:20.0,s:20},{n:'Morpho Menelaus pucallpensis',p:21.0,s:50},{n:'Morpho helenor amazonius',p:6.0,s:200},{n:'Morpho mariosiajane',p:43.0,s:50},{n:'Morpho sulkowoskii Nieva',p:28.0,s:50},{n:'Morpho sulkowoskii zachi',p:40.0,s:100},{n:'Morpho godartii julanthicus',p:10.0,s:500},{n:'Morpho Menelaus ssp zischkai',p:12.0,s:5000},{n:'Morpho Rethenor mariosiojanae small',p:45.0,s:200},{n:'Morpho aurora Isidorssoni',p:15.0,s:100},{n:'Morpho aurora lamasi',p:14.0,s:200},{n:'Morpho Cisseis gahua A',p:80.0,s:10},{n:'Morpho Cisseis gahua B',p:90.0,s:3}]},
{id:'Nymphalidae',nm:'Nymphalidae',e:[{n:'Adelpha mesentina',p:1.8,s:500},{n:'Agrias pericles peruviana',p:120.0,s:10},{n:'Diaethria clymena peruviana',p:1.8,s:5000},{n:'Historis odius',p:1.5,s:5000},{n:'Marpesia berania',p:1.2,s:5000},{n:'Panacea prola',p:2.5,s:5000},{n:'Siproeta epaphus',p:1.5,s:5000}]},
{id:'Papilionidae',nm:'Papilionidae',e:[{n:'Battus crassus',p:3.5,s:50},{n:'Eurytides serville',p:1.4,s:5000},{n:'Papilio xanthopleura',p:40.0,s:10},{n:'Parides aeneas bolivar',p:17.5,s:20},{n:'Pterourus cacicus inca',p:40.0,s:100}]},
{id:'Pieridae',nm:'Pieridae',e:[{n:'Anteos chlorinde',p:45.0,s:100},{n:'Phoebis argante',p:1.8,s:5000},{n:'Phoebis philea',p:1.8,s:5000}]},
{id:'Riodinidae',nm:'Riodinidae',e:[{n:'Ancyluris aulestes',p:45.0,s:100},{n:'Rhetus periander',p:6.5,s:5000}]},
{id:'Satyridae',nm:'Satyridae',e:[{n:'Cithaerais pireta',p:45.0,s:100},{n:'Haetera piera',p:45.0,s:1000},{n:'Pierella lena',p:48.0,s:100}]}
]
const VISTAS=['Frente','Lado','Reverso','Video'] as const
type Vista=typeof VISTAS[number]
export default function EspecimenPage(){
  const params=useParams()
  const router=useRouter()
  const {items:carrito,addItem,updateItems:setCarrito}=useCarrito()
  const [showCarrito,setShowCarrito]=useState(false)
  const [v,setV]=useState<Vista>('Frente')
  const [ok,setOk]=useState(false)
  const rawId=typeof params.id==='string'?params.id:''
  const parts=rawId.split('-')
  const idx=parseInt(parts[parts.length-1])
  const famId=parts.slice(0,-1).join('-')
  const fotos=FOTOS[rawId]
  const fam=FAM.find(f=>f.id===famId)
  const esp=fam?.e[idx]
  if(!fam||!esp)return(
    <main style={{minHeight:'100vh',background:'#0A0A05',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center',color:'rgba(201,168,76,0.5)',fontFamily:'Georgia,serif'}}>
        <p style={{fontSize:'1rem',marginBottom:24}}>Especimen no encontrado</p>
        <button onClick={()=>router.back()} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'10px 24px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif'}}>Volver</button>
      </div>
    </main>
  )
  const add=()=>{addItem({n:esp.n,p:esp.p,rubro:fam.nm});setOk(true);setTimeout(()=>setOk(false),2000)}
  const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
  const fotoUrl=v==='Frente'?fotos?.f1:v==='Lado'?fotos?.f2:v==='Reverso'?fotos?.f3:undefined
  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',paddingBottom:80}}>
      {showCarrito&&<CarritoCompras items={carrito} onClose={()=>setShowCarrito(false)} onUpdateItems={(its)=>setCarrito(its)} onPagar={(d)=>{console.log(d);setShowCarrito(false)}}/>}
      <div style={{padding:'16px 20px',display:'flex',alignItems:'center',gap:12,borderBottom:`1px solid ${BD}`}}>
        <button onClick={()=>router.back()} style={{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,padding:'7px 14px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}><ST t="Volver"/></button>
        <span style={{color:'rgba(201,168,76,0.35)',fontSize:'.7rem'}}>{fam.nm}</span>
      </div>
      <div style={{maxWidth:480,margin:'0 auto',padding:'20px 16px'}}>
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,overflow:'hidden',marginBottom:16}}>
          <div style={{width:'100%',height:320,background:'#050501',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {v==='Video'&&fotos?.video?<video src={fotos.video} controls autoPlay muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            :fotoUrl?<img src={fotoUrl} alt={esp.n} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            :<div style={{textAlign:'center',color:'rgba(201,168,76,0.25)',fontSize:'.7rem'}}><div style={{fontSize:'3rem',marginBottom:8}}>📷</div><div style={{textTransform:'uppercase',letterSpacing:2}}>{v}</div><div style={{marginTop:4,fontSize:'.6rem'}}>PROXIMAMENTE</div></div>}
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
            <div style={{textAlign:'right'}}><div style={{fontSize:'.75rem',color:esp.s>0?'#5DBB63':'rgba(201,168,76,0.35)',fontWeight:700}}>{esp.s>0?`${esp.s.toLocaleString()} unid.`:'Sin stock'}</div><div style={{fontSize:'.6rem',color:'rgba(201,168,76,0.3)',marginTop:2}}>Stock</div></div>
          </div>
        </div>
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,padding:'14px 16px',marginBottom:16,fontSize:'.65rem',color:'rgba(201,168,76,0.5)',lineHeight:1.8}}>
          <div style={{color:G,fontWeight:700,marginBottom:8}}><ST t="Informacion de exportacion"/></div>
          <div>Tingo Maria, Peru - <ST t="Exportacion mundial"/></div>
          <div>WhatsApp: +51 940 699 405</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          <button onClick={add} disabled={esp.s===0} style={{width:'100%',padding:'14px',borderRadius:8,fontSize:'.85rem',fontFamily:'Georgia,serif',cursor:esp.s>0?'pointer':'not-allowed',background:ok?'#5DBB63':esp.s>0?G:'rgba(201,168,76,0.15)',color:ok||esp.s>0?CARD:'rgba(201,168,76,0.3)',border:'none',fontWeight:700,transition:'all 0.2s'}}>
            {ok?'Agregado':<ST t="Agregar al carrito"/>}
          </button>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${encodeURIComponent(esp.n)} - $${esp.p.toFixed(2)} USD`} target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,background:'#25D366',color:'white',fontSize:'.8rem',fontFamily:'Georgia,serif',textDecoration:'none',fontWeight:700}}>
            <ST t="Consultar por WhatsApp"/>
          </a>
        </div>
      </div>
    </main>
  )
}
