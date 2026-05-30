const {Redis}=require('@upstash/redis')
const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})
r.get('catalogo:familias').then(async d=>{
  const idx=d.findIndex(f=>f.id==='Nymphalidae')
  const actuales=d[idx].e||[]
  const nuevas=[
    {n:'Memphis cerelia ♂',p:7.5,stock:1,desc:'Nymphalidae — Perú · A1 · 6.0cm'},
    {n:'Memphis falcata ♂',p:25,stock:1,desc:'Nymphalidae — Perú · A1 · 6-6.5cm · rara'},
    {n:'Memphis florita ♂',p:0,stock:0,desc:'Nymphalidae — Perú · A1 · 5.0cm · SIN STOCK'},
    {n:'Memphis glauce felderi ♂',p:0,stock:0,desc:'Nymphalidae — Perú · A1 · 5.5cm · SIN STOCK'},
  ]
  const nombresActuales=new Set(actuales.map(e=>e.n))
  const sinDuplicados=nuevas.filter(e=>!nombresActuales.has(e.n))
  d[idx].e=[...actuales,...sinDuplicados]
  await r.set('catalogo:familias',d)
  console.log('OK — Nymphalidae total:',d[idx].e.length,'· Nuevas:',sinDuplicados.length)
})
