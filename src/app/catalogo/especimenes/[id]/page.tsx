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
const FOTOS_BUNNY: Record<string, Record<string, string>> = {
  'Caligo eurilochus livius': {
    'Frente': 'https://HouseInsects1967.b-cdn.net/brassolidae/MS-BRA-EUR-A1M-cara-A.png',
    'Lado': 'https://HouseInsects1967.b-cdn.net/brassolidae/MS-BRA-EUR-A1M-lateral.png',
    'Reverso': 'https://HouseInsects1967.b-cdn.net/brassolidae/MS-BRA-EUR-A1M-reverso-V.png',
  }
}
const VISTAS=['Frente','Lado','Reverso','Video'] as const
type Vista=typeof VISTAS[number]
function Acc({title,children,open:init=false}:{title:string;children:React.ReactNode;open?:boolean}){
  const [op,setOp]=useState(init)
  const G='#C9A84C',BD='rgba(201,168,76,0.2)',CARD='#1A1209'
  return(
    <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,marginBottom:6,overflow:'hidden'}}>
      <div onClick={()=>setOp(!op)} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 12px',cursor:'pointer'}}>
        <span style={{fontSize:'.72rem',color:G,fontFamily:'Georgia,serif'}}>{title}</span>
        <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.75rem'}}>{op?'▴':'▾'}</span>
      </div>
      {op&&<div style={{padding:'0 12px 10px'}}>{children}</div>}
    </div>
  )
}
function ARow({k,v}:{k:string;v:string}){
  return(
    <div style={{display:'flex',justifyContent:'space-between',borderBottom:'1px solid rgba(201,168,76,0.08)',padding:'4px 0',fontSize:'.62rem'}}>
      <span style={{color:'rgba(201,168,76,0.4)'}}>{k}</span>
      <span style={{color:'#E8C97A',textAlign:'right'}}>{v}</span>
    </div>
  )
}
export default function EspecimenPage(){
  const params=useParams()
  const router=useRouter()
  const {items:carrito,addItem,updateItems:setCarrito}=useCarrito()
  const [showCarrito,setShowCarrito]=useState(false)
  const [v,setV]=useState<Vista>('Frente')
  const [lb,setLb]=useState(false)
  const [dragStart,setDragStart]=useState(0)
  const [dragging,setDragging]=useState(false)
  const [ok,setOk]=useState(false)
  const [popCal,setPopCal]=useState(false)
  const [popAbr,setPopAbr]=useState(false)
  const [tipo,setTipo]=useState('Sin montar / alas cerradas')
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
  const add=()=>{addItem({n:esp.n,p:esp.p,rubro:fam.nm});setOk(true);setShowCarrito(true);setTimeout(()=>setOk(false),2000)}
  const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
  const fotosBunny=FOTOS_BUNNY[esp?.n||'']
  const fotoUrl=fotosBunny?.[v]||(v==='Frente'?fotos?.f1:v==='Lado'?fotos?.f2:v==='Reverso'?fotos?.f3:undefined)
  const popup=(title:string,rows:{k:string;v:string}[],onClose:()=>void)=>(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,width:300,maxWidth:'90vw',padding:16,position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute',top:8,right:8,background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,color:G,width:28,height:28,borderRadius:'50%',cursor:'pointer',fontSize:'.9rem'}}>x</button>
        <div style={{fontSize:'.75rem',color:G,fontWeight:700,marginBottom:10,fontFamily:'Georgia,serif'}}>{title}</div>
        {rows.map(r=><div key={r.k} style={{display:'flex',gap:8,padding:'5px 0',borderBottom:`1px solid rgba(201,168,76,0.08)`,fontSize:'.62rem'}}><span style={{color:G,fontWeight:700,minWidth:40}}>{r.k}</span><span style={{color:'rgba(201,168,76,0.7)',lineHeight:1.4}}>{r.v}</span></div>)}
      </div>
    </div>
  )
  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',paddingBottom:80}}>
      {showCarrito&&<CarritoCompras items={carrito} onClose={()=>setShowCarrito(false)} onUpdateItems={(its)=>setCarrito(its)} onPagar={(d)=>{console.log(d);setShowCarrito(false)}}/>}
      {popCal&&popup('Tabla de calidad',[{k:'A1',v:'Perfecto, sin defectos. Muchos son ex-pupae criados.'},{k:'A1-',v:'Con defectos pero generalmente respetable.'},{k:'VGA2',v:'Segunda calidad muy buena. Facilmente reparable.'},{k:'A2',v:'Segunda calidad definitiva.'}],()=>setPopCal(false))}
      {popAbr&&popup('Abreviaciones',[{k:'M',v:'Macho'},{k:'F',v:'Hembra'},{k:'P',v:'Par (macho y hembra)'},{k:'EP',v:'Ex-pupae, criado en granja'},{k:'S',v:'Set con descuento'}],()=>setPopAbr(false))}
      <div style={{padding:'16px 20px',display:'flex',alignItems:'center',gap:12,borderBottom:`1px solid ${BD}`}}>
        <button onClick={()=>router.back()} style={{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,padding:'7px 14px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}><ST t="Volver"/></button>
        <span style={{color:'rgba(201,168,76,0.35)',fontSize:'.7rem'}}>{fam.nm}</span>
      </div>
      <div style={{maxWidth:480,margin:'0 auto',padding:'20px 16px'}}>
        {lb&&<div onClick={()=>setLb(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.96)',zIndex:300,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}
          onMouseDown={e=>{setDragStart(e.clientX);setDragging(true)}}
          onMouseMove={e=>{if(!dragging)return;const d=e.clientX-dragStart;if(Math.abs(d)>60){const vs=['Frente','Lado','Reverso'] as const;const ci=vs.indexOf(v as any);if(d<0&&ci<2){setV(vs[ci+1]);setDragStart(e.clientX);}else if(d>0&&ci>0){setV(vs[ci-1]);setDragStart(e.clientX);}}}}
          onMouseUp={()=>setDragging(false)}
          onMouseLeave={()=>setDragging(false)}
          onTouchStart={e=>setDragStart(e.touches[0].clientX)}
          onTouchEnd={e=>{const d=e.changedTouches[0].clientX-dragStart;if(Math.abs(d)>40){const vs=['Frente','Lado','Reverso'] as const;const ci=vs.indexOf(v as any);if(d<0&&ci<2)setV(vs[ci+1]);else if(d>0&&ci>0)setV(vs[ci-1]);}}}
        >
          <button onClick={()=>setLb(false)} style={{position:'absolute',top:16,right:16,background:'rgba(201,168,76,0.15)',border:'2px solid rgba(201,168,76,0.4)',color:'#C9A84C',width:40,height:40,borderRadius:'50%',cursor:'pointer',fontSize:'1.2rem',zIndex:10}}>x</button>
          <div style={{width:'min(900px,95vw)',height:'min(900px,85vh)',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid rgba(201,168,76,0.3)',borderRadius:12,background:'#0A0A05'}}>
            {v==='Video'&&fotos?.video?<video src={fotos.video} controls autoPlay muted playsInline style={{maxWidth:'100%',maxHeight:'100%'}}/>:fotoUrl?<div style={{position:'relative',width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><img src={fotoUrl} alt={esp.n} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain'}}/><div style={{position:'absolute',inset:0,pointerEvents:'none'}}><div style={{position:'absolute',top:'42%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}><div style={{fontFamily:'Georgia,serif',fontStyle:'italic',color:'rgba(212,175,55,0.7)',fontSize:'1.4rem'}}>Javier Zavala</div></div><div style={{position:'absolute',bottom:16,right:16,textAlign:'right'}}><div style={{fontFamily:'Georgia,serif',fontStyle:'italic',color:'rgba(212,175,55,0.8)',fontSize:'1rem'}}>Javier Zavala</div><div style={{fontSize:'0.55rem',color:'rgba(212,175,55,0.6)',letterSpacing:'0.1em',textTransform:'uppercase',lineHeight:1.7}}>- Muestra Protegida<br/>Módulo Web Virtual -<br/>Propiedad Intelectual</div></div><div style={{position:'absolute',bottom:16,left:16,textAlign:'left'}}><div style={{fontSize:'0.5rem',color:'rgba(212,175,55,0.55)',letterSpacing:'0.06em',textTransform:'uppercase',lineHeight:1.7}}>Calidad A1 (A.1) - Macho / Male<br/>Documentación Legal Completa Incluida:<br/>Certificados SERFOR &amp; CITES Originales<br/>Permisos de Exportación Oficiales<br/>Customs Code 9705 - Importación Verificada</div></div></div></div>:<img src='https://HouseInsects1967.b-cdn.net/logo/logo-hip.png' style={{width:280,opacity:0.4}}/>}
          </div>
          <div style={{display:'flex',gap:20,marginTop:16,alignItems:'center'}}>
            <button onClick={e=>{e.stopPropagation();const vs=['Frente','Lado','Reverso'] as const;const ci=vs.indexOf(v as any);if(ci>0)setV(vs[ci-1]);}} style={{width:54,height:54,background:'rgba(201,168,76,0.1)',border:'2px solid rgba(201,168,76,0.4)',borderRadius:'50%',color:'#C9A84C',fontSize:'1.5rem',cursor:'pointer'}}>&#8592;</button>
            <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',letterSpacing:2}}>{v.toUpperCase()}</span>
            <button onClick={e=>{e.stopPropagation();const vs=['Frente','Lado','Reverso'] as const;const ci=vs.indexOf(v as any);if(ci<2)setV(vs[ci+1]);}} style={{width:54,height:54,background:'rgba(201,168,76,0.1)',border:'2px solid rgba(201,168,76,0.4)',borderRadius:'50%',color:'#C9A84C',fontSize:'1.5rem',cursor:'pointer'}}>&#8594;</button>
          </div>
          <p style={{color:'rgba(201,168,76,0.25)',fontSize:'.6rem',marginTop:8,fontFamily:'Georgia,serif'}}>Arrastra para girar · Toca fuera para cerrar</p>
        </div>}
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,overflow:'hidden',marginBottom:16}}>
          <div onClick={()=>{if(v!=='Video')setLb(true)}} style={{width:'100%',height:320,background:'#050501',display:'flex',alignItems:'center',justifyContent:'center',cursor:v!=='Video'?'zoom-in':'default',position:'relative'}}
            onTouchStart={e=>setDragStart(e.touches[0].clientX)}
            onTouchEnd={e=>{const d=e.changedTouches[0].clientX-dragStart;if(Math.abs(d)>40){const vs=['Frente','Lado','Reverso'] as const;const ci=vs.indexOf(v as any);if(d<0&&ci<2)setV(vs[ci+1]);else if(d>0&&ci>0)setV(vs[ci-1]);}}}
          >
            {v==='Video'&&fotos?.video?<video src={fotos.video} controls autoPlay muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            :fotoUrl?<div style={{position:'relative',width:'100%',height:'100%'}}>
  <img src={fotoUrl} alt={esp.n} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
  <div style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:2}}>
    <div style={{position:'absolute',top:'42%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center'}}>
      <div style={{fontFamily:'Georgia,serif',fontStyle:'italic',color:'rgba(212,175,55,0.7)',fontSize:'1.0rem'}}>Javier Zavala</div>
    </div>
    <div style={{position:'absolute',bottom:10,right:10,textAlign:'right'}}>
      <div style={{fontFamily:'Georgia,serif',fontStyle:'italic',color:'rgba(212,175,55,0.8)',fontSize:'0.75rem'}}>Javier Zavala</div>
      <div style={{fontSize:'0.42rem',color:'rgba(212,175,55,0.6)',letterSpacing:'0.1em',textTransform:'uppercase',lineHeight:1.7}}>- Muestra Protegida<br/>Módulo Web Virtual -<br/>Propiedad Intelectual</div>
    </div>
    <div style={{position:'absolute',bottom:10,left:10,textAlign:'left'}}>
      <div style={{fontSize:'0.4rem',color:'rgba(212,175,55,0.55)',letterSpacing:'0.06em',textTransform:'uppercase',lineHeight:1.7}}>Calidad A1 (A.1) - Macho / Male<br/>Documentación Legal Completa Incluida:<br/>Certificados SERFOR &amp; CITES Originales<br/>Permisos de Exportación Oficiales<br/>Customs Code 9705 - Importación Verificada</div>
    </div>
  </div>
</div>
            :<div style={{textAlign:'center',color:'rgba(201,168,76,0.25)',fontSize:'.7rem'}}><img src="https://HouseInsects1967.b-cdn.net/logo/logo-hip.png" style={{width:220,opacity:0.4,marginBottom:8}}/><div style={{textTransform:'uppercase',letterSpacing:2,fontSize:'.65rem'}}>{v}</div><div style={{marginTop:4,fontSize:'.6rem'}}>PROXIMAMENTE</div></div>}
            {v!=='Video'&&fotoUrl&&<span style={{position:'absolute',bottom:8,right:8,background:'rgba(0,0,0,0.6)',color:'rgba(201,168,76,0.6)',fontSize:'.55rem',padding:'3px 8px',borderRadius:10,fontFamily:'Georgia,serif'}}>+ ver grande</span>}
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
        <Acc title="Especificaciones tecnicas" open={true}>
          <ARow k="Familia" v={fam.nm}/>
          <ARow k="Calidad" v="A1"/>
          <ARow k="Tamanio" v="Variable"/>
          <ARow k="Origen" v="Tingo Maria, Huanuco, Peru"/>
          <div style={{display:'flex',gap:8,marginTop:6}}>
            <button onClick={()=>setPopCal(true)} style={{fontSize:'.55rem',color:'rgba(201,168,76,0.4)',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,padding:'3px 8px',cursor:'pointer',fontFamily:'Georgia,serif'}}>? Calidad</button>
            <button onClick={()=>setPopAbr(true)} style={{fontSize:'.55rem',color:'rgba(201,168,76,0.4)',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,padding:'3px 8px',cursor:'pointer',fontFamily:'Georgia,serif'}}>? Sexo</button>
          </div>
        </Acc>
        <Acc title="Tipo de especimen">
          <div style={{marginBottom:6}}>
            <span style={{fontSize:'.6rem',color:'rgba(201,168,76,0.4)',display:'block',marginBottom:4}}>Selecciona el tipo:</span>
            <select value={tipo} onChange={e=>setTipo(e.target.value)} style={{width:'100%',background:'#0A0A05',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:6,fontSize:'.65rem',fontFamily:'Georgia,serif',cursor:'pointer'}}>
              <option>Sin montar / alas cerradas</option>
              <option>Montado / alas abiertas</option>
              <option>Enmarcado</option>
              <option>Par enmarcado</option>
              <option>Enmarcado fondo negro</option>
            </select>
          </div>
          <ARow k="Sin montar" v="A granel - precio base"/>
          <ARow k="Montado" v="+$1.50 por unidad"/>
          <ARow k="Enmarcado" v="Consultar precio"/>
        </Acc>
        <Acc title="Mayorista y minorista">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5,marginBottom:8}}>
            {[{q:'1-9',p:`$${esp.p.toFixed(2)}`,l:'Minorista'},{q:'10-49',p:`$${(esp.p*0.85).toFixed(2)}`,l:'Mayorista'},{q:'50-99',p:`$${(esp.p*0.78).toFixed(2)}`,l:'Mayorista+'},{q:'100+',p:'Consultar',l:'Precio especial'}].map(r=>(
              <div key={r.q} style={{background:'rgba(201,168,76,0.06)',border:`1px solid rgba(201,168,76,0.12)`,borderRadius:6,padding:7,textAlign:'center'}}>
                <div style={{fontSize:'.8rem',fontWeight:700,color:G}}>{r.q}</div>
                <div style={{fontSize:'.65rem',color:'#E8C97A'}}>{r.p} c/u</div>
                <div style={{fontSize:'.52rem',color:'rgba(201,168,76,0.35)',marginTop:2}}>{r.l}</div>
              </div>
            ))}
          </div>
        </Acc>
        <Acc title="Condicion y empaque">
          <ARow k="Condicion" v="Seco, calidad A1"/>
          <ARow k="Empaque" v="Antihumedad + foam"/>
          <ARow k="Granel" v="En papel glasin"/>
          <ARow k="Montado" v="En caja entomologica"/>
        </Acc>
        <Acc title="Exportacion mundial">
          <ARow k="Origen" v="Tingo Maria, Peru"/>
          <ARow k="CITES" v="Incluido si requerido"/>
          <ARow k="Certificado" v="Fitosanitario disponible"/>
          <ARow k="Envio" v="Express mundial"/>
          <ARow k="RUC" v="20447397804"/>
          <ARow k="WhatsApp" v="+51 940 699 405"/>
        </Acc>
        <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
          <button onClick={add} disabled={esp.s===0} style={{width:'100%',padding:'14px',borderRadius:8,fontSize:'.85rem',fontFamily:'Georgia,serif',cursor:esp.s>0?'pointer':'not-allowed',background:ok?'#5DBB63':esp.s>0?G:'rgba(201,168,76,0.15)',color:ok||esp.s>0?CARD:'rgba(201,168,76,0.3)',border:'none',fontWeight:700,transition:'all 0.2s'}}>
            {ok?'Agregado al carrito':<ST t="Agregar al carrito"/>}
          </button>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${encodeURIComponent(esp.n)} - $${esp.p.toFixed(2)} USD - Tipo: ${encodeURIComponent(tipo)}`} target="_blank" rel="noopener noreferrer" style={{display:'block',textAlign:'center',padding:'12px',borderRadius:8,background:'#25D366',color:'white',fontSize:'.8rem',fontFamily:'Georgia,serif',textDecoration:'none',fontWeight:700}}>
            <ST t="Consultar por WhatsApp"/>
          </a>
        </div>
      </div>
    </main>
  )
}
