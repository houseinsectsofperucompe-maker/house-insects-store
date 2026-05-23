const {v2:c}=require('cloudinary')
const fs=require('fs')
c.config({cloud_name:'dv3mvukmq',api_key:'499812389115752',api_secret:'aLqICg9H4_fYtcU1quAljjogtIo'})

async function main(){
  const r=await c.api.resources({type:'upload',prefix:'house-insects/hesperidae',max_results:500})
  const especies=r.resources.map(x=>({
    n: x.public_id.split('/').pop().replace(/\.webp$/,'').replace(/-/g,' ').replace(/hesperidae/g,'').trim().replace(/\s+/g,' '),
    p:0.0,s:200,
    foto:x.secure_url
  }))
  
  let code=fs.readFileSync('src/app/catalogo/especimenes/page.tsx','utf8')
  const espStr=especies.map(e=>`{n:'${e.n}',p:${e.p},s:${e.s},foto:'${e.foto}'}`).join(',')
  code=code.replace("{ id:'Hesperiidae', nm:'Hesperiidae', e:[{n:'Astraptes fulgerator'",`{ id:'Hesperiidae', nm:'Hesperiidae', e:[${espStr},{n:'Astraptes fulgerator'`)
  fs.writeFileSync('src/app/catalogo/especimenes/page.tsx',code)
  console.log('OK - '+especies.length+' especies Hesperiidae con fotos')
}
main().catch(console.error)
