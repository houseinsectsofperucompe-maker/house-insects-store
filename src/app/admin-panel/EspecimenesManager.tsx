'use client'
import { useState } from 'react'

type E = { n:string; p:number; s:number; foto?:string }
type F = { id:string; nm:string; e:E[] }

const FAM:F[] = [
  { id:'Brassolidae', nm:'Brassolidae', e:[{n:'Caligo eurilochus livius',p:8.0,s:800},{n:'Caligo idomenius idomenides',p:6.5,s:100},{n:'Caligo illioneus',p:3.5,s:200},{n:'Caligo placidianus',p:4.0,s:200},{n:'Caligo prometheus',p:9.0,s:200},{n:'Caligo superbus',p:15.0,s:50},{n:'Caligo teucer semicaerulea',p:3.5,s:300},{n:'Dynastor darius darius',p:15.0,s:10},{n:'Opoptera aorsa',p:4.5,s:100},{n:'Opoptera arsippe arsippe',p:4.5,s:200},{n:'Opsiphanes bogatanus',p:3.5,s:100},{n:'Opsiphanes tamarindi incolumis',p:4.0,s:50},{n:'Caligo illioneus oberon',p:4.0,s:200},{n:'Caligo Oberthuri floklides',p:10.0,s:50},{n:'Eryphanis Polyxena',p:7.5,s:200},{n:'Catoblepia Berecynthia',p:10.0,s:20},{n:'Dynastor macrosirus stix',p:30.0,s:5},{n:'Opoptera Arsippe Bracteolata',p:4.0,s:20},{n:'Opsiphanes Cassina',p:3.5,s:50},{n:'Opsiphanes Sallei',p:3.0,s:100},{n:'Opsiphanes Invirae Agasthenes',p:2.5,s:200},{n:'Opsiphanes Quiteria Quirinalis',p:2.5,s:100}] },
  { id:'Danaidae', nm:'Danaidae', e:[{n:'Danaus plexippus nigrippus',p:2.5,s:2000},{n:'Lycorea halia',p:4.0,s:20},{n:'Lycorea ilione lamaris',p:1.5,s:2000},{n:'Lycorea Ituna Ilione Phenarete',p:2.0,s:100},{n:'Danaus Gilippus thersippus',p:3.0,s:200}] },
  { id:'Heliconidae', nm:'Heliconidae & Ithomidae', e:[{n:'Dione juno',p:1.3,s:5000},{n:'Dione moneta',p:2.5,s:500},{n:'Dryas julia',p:1.3,s:5000},{n:'Eueides (Heliconius) aliphera',p:1.8,s:2000},{n:'Eueides isabella dissolutus',p:2.5,s:5},{n:'Euides tales',p:2.0,s:500},{n:'Godyris duillia (Ithomidae)',p:2.5,s:500},{n:'Godyris zavalata huanaco',p:1.8,s:500},{n:'Heliconius burneyi huebneri',p:4.0,s:100},{n:'Heliconius erato microclea',p:2.5,s:200},{n:'Heliconius hecale shanki',p:5.5,s:10},{n:'Heliconius melpomene amaryllis',p:2.0,s:5000},{n:'Heliconius melpomene',p:2.5,s:20},{n:'Heliconius numata bicoloratus',p:2.0,s:500},{n:'Heliconius telesiphe telesiphe',p:2.0,s:500},{n:'Heliconius wallacei flavescens',p:1.8,s:500},{n:'Methona curvifascia',p:1.8,s:3000},{n:'Philaethria (Metamorpha) dido',p:4.0,s:200},{n:'Thyridia psidii cetoides',p:1.5,s:2000},{n:'Tithorea harmonia',p:2.5,s:200},{n:'Hypothyris semifulva',p:2.0,s:300},{n:'Mechanitis polymnia',p:2.0,s:10}] },
  { id:'Lycaenidae', nm:'Lycaenidae', e:[{n:'Arawacus seperata',p:6.5,s:200},{n:'Arcas imperialis',p:15.0,s:200},{n:'Arcas tuneta',p:15.0,s:100},{n:'Evenus gannymedes',p:18.0,s:20},{n:'Thecla gibberosa',p:12.0,s:100},{n:'Arawacus dolylas',p:10.0,s:15}] },
  { id:'Morphidae', nm:'Morphidae', e:[{n:'Morpho absoloni',p:43.0,s:100},{n:'Morpho aurora aureola',p:13.0,s:200},{n:'Morpho lympharis selenarys',p:13.5,s:1000},{n:'Morpho sulkowskyi descimokoenigi',p:13.5,s:200},{n:'Morpho rhetenor cacica',p:33.0,s:500},{n:'Morpho rhtenor helena',p:45.0,s:1000},{n:'Morpho telemachus',p:5.5,s:500},{n:'Morpho zephritis',p:13.5,s:1000},{n:'Morpho theseus juturna',p:20.0,s:500},{n:'Morpho menelaus assarpai',p:12.0,s:500},{n:'Morpho Cisseis gahua',p:15.0,s:200},{n:'Morpho cisseis phanademus',p:18.0,s:50},{n:'Morpho adonis huallaga',p:12.0,s:200},{n:'Morpho amphitriom cinerous',p:43.0,s:100},{n:'Morpho deidamia marie',p:7.5,s:1000},{n:'Morpho achilles helenor',p:5.5,s:1000},{n:'Morpho didius',p:7.0,s:5000},{n:'Morpho didius tingomaria',p:7.0,s:5000},{n:'Morpho menelaus michaelus',p:20.0,s:20},{n:'Morpho Menelaus pucallpensis',p:21.0,s:50},{n:'Morpho helenor amazonius',p:6.0,s:200},{n:'Morpho mariosiajane',p:43.0,s:50},{n:'Morpho sulkowoskii Nieva',p:28.0,s:50},{n:'Morpho sulkowoskii zachi',p:40.0,s:100},{n:'Morpho godartii julanthicus',p:10.0,s:500},{n:'Morpho Menelaus ssp zischkai',p:12.0,s:5000},{n:'Morpho Rethenor mariosiojanae',p:45.0,s:200},{n:'Morpho aurora Isidorssoni',p:15.0,s:100},{n:'Morpho aurora lamasi',p:14.0,s:200},{n:'Morpho Cisseis gahua ssp Gahua',p:80.0,s:10},{n:'Antirreaha philaretes Averna',p:0,s:0},{n:'Morpho absoloni absoloni',p:0,s:0},{n:'Morpho achilles agamedes',p:0,s:0},{n:'Morpho achilles fagardii',p:0,s:0},{n:'Morpho achilles lacomei',p:0,s:0},{n:'Morpho achilles phokylides',p:0,s:0},{n:'Morpho cisseis gahua-blue',p:0,s:0},{n:'Morpho cisseis cabrera Orange-Blue',p:0,s:0},{n:'Morpho cisseis cabrera Blue',p:0,s:0},{n:'Morpho cisseis gahua orange',p:0,s:0},{n:'Morpho cisseis gahua Brows',p:0,s:0},{n:'Morpho cisseis gahua-both forms',p:0,s:0},{n:'Morpho deidamia',p:0,s:0},{n:'Morpho deidamia annae',p:0,s:0},{n:'Morpho deidamia grambergi',p:0,s:0},{n:'Morpho deidamia pyrrhus',p:0,s:0},{n:'Morpho didius tingomarensis',p:0,s:0},{n:'Morpho godarti didius',p:0,s:0},{n:'Morpho godarti julanthiscus',p:0,s:0},{n:'Morpho granadensis',p:0,s:0},{n:'Morpho hecuba werneri',p:0,s:0},{n:'Morpho helenor papirus',p:0,s:0},{n:'Morpho menelaus alexandrovana',p:0,s:0},{n:'Morpho menelaus melichaelus',p:0,s:0},{n:'Morpho menelaus zischkai',p:0,s:0},{n:'Morpho rhetenor cacica paradisiaca',p:0,s:0},{n:'Morpho rhetenor mariajosianae',p:0,s:0},{n:'Morpho sulkowskyi lympharis descimokoenig',p:0,s:0},{n:'Morpho sulkowskyi lympharis selenaris',p:0,s:0},{n:'Morpho sulkowskyi lympharis zachi',p:0,s:0},{n:'Morpho sulkowskyi nieva',p:0,s:0},{n:'Morpho telemachus penelope',p:0,s:0},{n:'Morpho uraneis eugenia',p:0,s:0},{n:'Morpho zephyritis ssp',p:0,s:0}] },
  { id:'Nymphalidae', nm:'Nymphalidae', e:[{n:'Adelpha mesentina',p:1.8,s:500},{n:'Agrias amydon zenodorus',p:60.0,s:100},{n:'Agrias claudina lugens',p:10.0,s:2000},{n:'Agrias hewitsonius beata',p:6.0,s:3000},{n:'Agrias pericles peruviana',p:120.0,s:10},{n:'Agrias sardanapulis',p:30.0,s:200},{n:'Callicore cynosura cynosura',p:2.5,s:5000},{n:'Callicore lyca aegina',p:2.5,s:5000},{n:'Diaethria clymena peruviana',p:1.8,s:5000},{n:'Doxocopa cherubina',p:2.5,s:5000},{n:'Hamadryas feronia',p:2.5,s:2000},{n:'Historis odius',p:1.5,s:5000},{n:'Marpesia berania',p:1.2,s:5000},{n:'Panacea prola',p:2.5,s:5000},{n:'Prepona praeneste',p:80.0,s:20},{n:'Siproeta stelenes',p:2.0,s:5000},{n:'Siproeta epaphus',p:1.5,s:5000}] },
  { id:'Papilionidae', nm:'Papilionidae', e:[{n:'Eurytides leucaspis',p:1.8,s:1000},{n:'Eurytides serville',p:1.4,s:5000},{n:'Papilio xanthopleura',p:40.0,s:10},{n:'Parides aeneas bolivar',p:17.5,s:20},{n:'Parides chabrias',p:7.0,s:100},{n:'Pterourus cacicus inca',p:40.0,s:100},{n:'Pterourus cacicus mendozaensis',p:60.0,s:20},{n:'Pterourus zagreus batesi',p:15.0,s:20}] },
  { id:'Pieridae', nm:'Pieridae', e:[{n:'Anteos chlorinde',p:45.0,s:100},{n:'Archonias hebra',p:15.0,s:200},{n:'Ascia buniae',p:45.0,s:1000},{n:'Leptophobia philoma',p:48.0,s:100},{n:'Methania agasicles',p:6.5,s:5000},{n:'Phoebis argante',p:1.8,s:5000},{n:'Phoebis philea',p:1.8,s:5000}] },
  { id:'Riodinidae', nm:'Riodinidae', e:[{n:'Ancyluris aulestes',p:45.0,s:100},{n:'Ancyluris pulchra',p:35.0,s:500},{n:'Chorinea sylphina',p:24.0,s:500},{n:'Rhetus periander',p:6.5,s:5000},{n:'Siseme hellotis',p:6.5,s:5000}] },
  { id:'Satyridae', nm:'Satyridae', e:[{n:'Cithaerais pireta',p:45.0,s:100},{n:'Haetera piera',p:45.0,s:1000},{n:'Pierella lena',p:48.0,s:100},{n:'Pierella lucia',p:7.5,s:1000}] },
]

export default function EspecimenesManager() {
  const [famSel, setFamSel] = useState('Morphidae')
  const [datos, setDatos] = useState<Record<string,E[]>>(() => {
    const d:Record<string,E[]> = {}
    FAM.forEach(f => { d[f.id] = f.e.map(e => ({...e})) })
    return d
  })
  const [guardado, setGuardado] = useState(false)
  const [busq, setBusq] = useState('')

  const fam = FAM.find(f=>f.id===famSel)!
  const esp = datos[famSel] || []
  const filtrados = esp.filter(e=>e.n.toLowerCase().includes(busq.toLowerCase()))
  const total = Object.values(datos).reduce((a,b)=>a+b.length,0)
  const sinPrecio = Object.values(datos).reduce((a,b)=>a+b.filter(e=>e.p===0).length,0)

  const actualizar = (idx:number, campo:'p'|'s'|'foto', val:string) => {
    setDatos(prev => {
      const copia = [...prev[famSel]]
      const iReal = esp.indexOf(filtrados[idx])
      if(campo==='p') copia[iReal] = {...copia[iReal], p: parseFloat(val)||0}
      else if(campo==='s') copia[iReal] = {...copia[iReal], s: parseInt(val)||0}
      else copia[iReal] = {...copia[iReal], foto: val}
      return {...prev, [famSel]: copia}
    })
  }

  const generarCodigo = () => {
    let codigo = ''
    FAM.forEach(f => {
      const esp = datos[f.id]
      const items = esp.map(e => {
        let s = `{n:'${e.n}',p:${e.p},s:${e.s}`
        if(e.foto) s += `,foto:'${e.foto}'`
        s += '}'
        return s
      }).join(',')
      codigo += `{ id:'${f.id}', nm:'${f.nm}', e:[${items}] },\n`
    })
    navigator.clipboard.writeText(codigo)
    setGuardado(true)
    setTimeout(()=>setGuardado(false), 3000)
  }

  const S = {
    card: {background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'10px 12px',marginBottom:6},
    input: {background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'5px 8px',borderRadius:4,fontSize:'.78rem',fontFamily:'Georgia,serif',width:'80px'},
    inputFoto: {background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'5px 8px',borderRadius:4,fontSize:'.68rem',fontFamily:'Georgia,serif',flex:1},
    label: {color:'rgba(201,168,76,0.5)',fontSize:'.6rem',letterSpacing:'.06em',marginBottom:2,display:'block' as const},
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:10}}>
        <div>
          <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:4}}>🦋 Gestor de Especímenes</h2>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.68rem'}}>{total} especies · <span style={{color:sinPrecio>0?'#ff9966':'#25D366'}}>{sinPrecio} sin precio</span></p>
        </div>
        <button onClick={generarCodigo} style={{background:guardado?'rgba(37,211,102,0.2)':'linear-gradient(135deg,#C9A84C,#E8C97A)',color:guardado?'#25D366':'#1A1209',border:guardado?'1px solid #25D366':'none',padding:'10px 20px',borderRadius:6,fontSize:'.8rem',fontWeight:700,cursor:'pointer',fontFamily:'Georgia,serif'}}>
          {guardado?'✅ Copiado al portapapeles':'📋 Copiar código para pegar'}
        </button>
      </div>

      {guardado && (
        <div style={{background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:8,padding:12,marginBottom:16}}>
          <p style={{color:'#25D366',fontSize:'.75rem',marginBottom:4}}>✅ Código copiado. Ahora:</p>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.7rem'}}>1. Abre <code style={{color:'#C9A84C'}}>src/app/catalogo/especimenes/page.tsx</code></p>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.7rem'}}>2. Busca <code style={{color:'#C9A84C'}}>const FAM:F[] = [</code></p>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.7rem'}}>3. Reemplaza todo el contenido del array con lo que copiaste</p>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.7rem'}}>4. Guarda y haz git push</p>
        </div>
      )}

      <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:14}}>
        {FAM.map(f=>{
          const sinP = datos[f.id].filter(e=>e.p===0).length
          return (
            <button key={f.id} onClick={()=>{setFamSel(f.id);setBusq('')}} style={{padding:'5px 10px',background:famSel===f.id?'#C9A84C':'rgba(201,168,76,0.06)',color:famSel===f.id?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,fontSize:'.65rem',cursor:'pointer',fontFamily:'Georgia,serif',position:'relative' as const}}>
              {f.id} ({datos[f.id].length}){sinP>0?<span style={{color:famSel===f.id?'#1A1209':'#ff9966',marginLeft:4}}>·{sinP}$?</span>:''}
            </button>
          )
        })}
      </div>

      <input value={busq} onChange={e=>setBusq(e.target.value)} placeholder="🔍 Buscar especie..." style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',marginBottom:12,boxSizing:'border-box' as const}}/>

      <p style={{color:'rgba(201,168,76,0.35)',fontSize:'.65rem',marginBottom:10}}>{filtrados.length} especies en {fam.nm}</p>

      {filtrados.map((e,i)=>(
        <div key={i} style={{...S.card,borderLeft:e.p===0?'2px solid rgba(255,153,102,0.4)':'2px solid rgba(201,168,76,0.1)'}}>
          <p style={{color:e.p===0?'#ff9966':'#E8C97A',fontSize:'.75rem',fontStyle:'italic',marginBottom:8}}>{e.n}</p>
          <div style={{display:'flex',gap:10,flexWrap:'wrap' as const,alignItems:'flex-end'}}>
            <div>
              <span style={S.label}>PRECIO USD</span>
              <input type="number" value={e.p} onChange={ev=>actualizar(i,'p',ev.target.value)} style={S.input} step="0.5" min="0"/>
            </div>
            <div>
              <span style={S.label}>STOCK</span>
              <input type="number" value={e.s} onChange={ev=>actualizar(i,'s',ev.target.value)} style={S.input} min="0"/>
            </div>
            <div style={{flex:1,minWidth:200}}>
              <span style={S.label}>URL FOTO (Cloudinary)</span>
              <input type="text" value={e.foto||''} onChange={ev=>actualizar(i,'foto',ev.target.value)} placeholder="https://res.cloudinary.com/..." style={S.inputFoto}/>
            </div>
            {e.foto && <img src={e.foto} style={{width:36,height:36,objectFit:'cover',borderRadius:4,border:'1px solid rgba(201,168,76,0.3)'}}/>}
          </div>
        </div>
      ))}
    </div>
  )
}
