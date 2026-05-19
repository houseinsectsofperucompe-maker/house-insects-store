const fs = require('fs');
const path = require('path');

const filePath = path.join(process.env.HOME, 'house-insects-store/src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const reemplazos = [
  // id:2 - Cuadros de Mariposas Tropicales
  [/(\{ id:2,[^}]*imagen:')[^']*(')/g, "$1/categorias/Cuadros_butetrfly__diurne.png$2"],
  // id:9 - Minerales & Piedras Preciosas
  [/(\{ id:9,[^}]*imagen:')[^']*(')/g, "$1/categorias/mineerales_joyas.png$2"],
  // id:10 - Semillas & Plantas Medicinales
  [/(\{ id:10,[^}]*imagen:')[^']*(')/g, "$1/categorias/Semillas_y_flores.png$2"],
  // id:11 - Frutas Exóticas & Deshidratadas
  [/(\{ id:11,[^}]*imagen:')[^']*(')/g, "$1/categorias/frutas__desidratdas.png$2"],
  // id:12 - Hongos & Productos Naturales
  [/(\{ id:12,[^}]*imagen:')[^']*(')/g, "$1/categorias/Hongo__siolvester_wild.png$2"],
  // id:13 - Textilería & Alpaca
  [/(\{ id:13,[^}]*imagen:')[^']*(')/g, "$1/categorias/Textrile_peruana_.png$2"],
  // id:14 - Alimentos Deshidratados
  [/(\{ id:14,[^}]*imagen:')[^']*(')/g, "$1/categorias/comida_desidratda.png$2"],
  // id:15 - Pinturas & Arte Rupestre
  [/(\{ id:15,[^}]*imagen:')[^']*(')/g, "$1/categorias/pinturea_arteanias.png$2"],
  // id:16 - Maderas Finas & Esculturas
  [/(\{ id:16,[^}]*imagen:')[^']*(')/g, "$1/categorias/Madera__fine.png$2"],
  // id:17 - Esencias & Aceites Naturales
  [/(\{ id:17,[^}]*imagen:')[^']*(')/g, "$1/categorias/Aceites__maderale.png$2"],
];

let cambios = 0;
for (const [regex, replacement] of reemplazos) {
  const antes = content;
  content = content.replace(regex, replacement);
  if (content !== antes) {
    cambios++;
    console.log(`✅ Cambiado id:${cambios + 1}`);
  }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log(`\n✅ ${cambios} categorías actualizadas en page.tsx`);
