const {v2:c}=require('cloudinary')
const fs=require('fs')
c.config({cloud_name:'dv3mvukmq',api_key:'499812389115752',api_secret:'aLqICg9H4_fYtcU1quAljjogtIo'})

async function main(){
  const r=await c.api.resources({type:'upload',prefix:'house-insects/ithomiidae-final',max_results:500})
  const especies=r.resources.map(x=>({
    n: x.public_id.split('/').pop().replace(/\.webp$/,'').replace(/-/g,' ').replace(/compressor/g,'').trim().replace(/\s+/g,' '),
    p:0.0,s:200,
    foto:x.secure_url
  }))
  
  let code=fs.readFileSync('src/app/catalogo/especimenes/page.tsx','utf8')
  const espStr=especies.map(e=>`{n:'${e.n}',p:${e.p},s:${e.s},foto:'${e.foto}'}`).join(',')
  code=code.replace("{ id:'Ithomiidae', nm:'Ithomiidae', e:[{n:'Godyris duillia'",`{ id:'Ithomiidae', nm:'Ithomiidae', e:[${espStr},{n:'Godyris duillia'`)
  fs.writeFileSync('src/app/catalogo/especimenes/page.tsx',code)
  console.log('OK - '+especies.length+' especies Ithomiidae con fotos')
}
main().catch(console.error)
