const fs=require('fs')
let code=fs.readFileSync('src/app/catalogo/especimenes/page.tsx','utf8')

const heliconidae="{ id:'Heliconidae', nm:'Heliconidae', e:[{n:'Dione juno',p:1.3,s:5000},{n:'Dione moneta',p:2.5,s:500},{n:'Dryas julia',p:1.3,s:5000},{n:'Eueides (Heliconius) aliphera',p:1.8,s:2000},{n:'Eueides isabella dissolutus',p:2.5,s:5},{n:'Heliconius burneyi huebneri',p:4.0,s:100},{n:'Heliconius erato microclea',p:2.5,s:200},{n:'Heliconius hecale shanki',p:5.5,s:10},{n:'Heliconius melpomene amaryllis',p:2.0,s:5000},{n:'Heliconius melpomene',p:2.5,s:20},{n:'Heliconius numata bicoloratus',p:2.0,s:500},{n:'Heliconius telesiphe telesiphe',p:2.0,s:500},{n:'Heliconius wallacei flavescens',p:1.8,s:500},{n:'Philaethria (Metamorpha) dido',p:4.0,s:200}] }"

const hesperiidae="{ id:'Hesperiidae', nm:'Hesperiidae', e:[{n:'Astraptes fulgerator',p:3.5,s:200},{n:'Autochton zarex',p:2.5,s:500},{n:'Burca braco',p:2.0,s:200},{n:'Celaenorrhinus eligius',p:3.0,s:100},{n:'Chioides catillus',p:2.5,s:500},{n:'Epargyreus clarus',p:2.0,s:500},{n:'Heliopetes arsalte',p:1.8,s:1000},{n:'Urbanus proteus',p:2.0,s:1000},{n:'Urbanus teleus',p:2.0,s:500},{n:'Pyrgus orcus',p:1.5,s:1000}] }"

const ithomiidae="{ id:'Ithomiidae', nm:'Ithomiidae', e:[{n:'Godyris duillia',p:2.5,s:500},{n:'Godyris zavaleta huanaco',p:1.8,s:500},{n:'Hypothyris semifulva',p:2.0,s:300},{n:'Mechanitis polymnia',p:2.0,s:10},{n:'Methona curvifascia',p:1.8,s:3000},{n:'Thyridia psidii cetoides',p:1.5,s:2000},{n:'Tithorea harmonia',p:2.5,s:200},{n:'Napeogenes peridia',p:2.0,s:500},{n:'Oleria onega',p:2.5,s:200},{n:'Pteronymia cotytto',p:1.8,s:500}] }"

const regex=/\{ id:'Heliconidae'.*?\] \}/s
code=code.replace(regex, heliconidae+',\n  '+hesperiidae+',\n  '+ithomiidae)
fs.writeFileSync('src/app/catalogo/especimenes/page.tsx',code)
console.log('OK')
