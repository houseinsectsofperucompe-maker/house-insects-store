const fs = require('fs');
const path = require('path');

const filePath = path.join(process.env.HOME, 'house-insects-store/src/app/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const antes = content;
content = content.replace(
  /(\{ id:8,[^}]*imagen:')[^']*(')/g,
  "$1/categorias/marcos_de_de_diferente_colores_pa_ta_insectos.png$2"
);

if (content !== antes) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Coleópteros actualizado OK');
} else {
  console.log('❌ No se encontró id:8');
}
