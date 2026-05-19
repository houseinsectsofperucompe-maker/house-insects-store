const cloudinary = require('cloudinary').v2;
const path = require('path');
const os = require('os');

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
});

const downloads = path.join(os.homedir(), 'Downloads');

const fotos = [
  ['minerales_joyas',      'mineerales_joyas.png'],
  ['semillas_flores',      'Semillas_y_flores.png'],
  ['frutas_deshidratadas', 'frutas__desidratdas.png'],
  ['hongos_wild',          'Hongo__siolvester_wild.png'],
  ['textiles_peruana',     'Textrile_peruana_.png'],
  ['comida_deshidratada',  'comida_desidratda.png'],
  ['pinturas_artesanias',  'pinturea_arteanias.png'],
  ['madera_fine',          'Madera__fine.png'],
  ['aceites_maderales',    'Aceites__maderale.png'],
  ['cuadros_butterfly',    'Cuadros_butetrfly__diurne.png'],
];

(async () => {
  for (const [id, archivo] of fotos) {
    const filepath = path.join(downloads, archivo);
    try {
      const r = await cloudinary.uploader.upload(filepath, {
        public_id: `houseinsects/${id}`,
        overwrite: true
      });
      console.log(`✅ ${id}: ${r.secure_url}`);
    } catch (e) {
      console.log(`❌ ${id}: ${e.message}`);
    }
  }
  console.log('\n✅ TERMINADO');
})();
