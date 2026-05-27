const {createClient} = require('@sanity/client');
const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sklfHrDIKRAM4FzHerAVfprMrhxYUfjuArRwMmhMRtgCb9Bwf6QfSqoLQ2kJwcj1s1awC86sXf6x7DdnZ',
  useCdn: false,
});
const FAMILIAS=[
  {nm:'Brassolidae',orden:'Lepidoptera Diurnae',n:1},
  {nm:'Danaidae',orden:'Lepidoptera Diurnae',n:2},
  {nm:'Heliconidae',orden:'Lepidoptera Diurnae',n:3},
  {nm:'Ithomiidae',orden:'Lepidoptera Diurnae',n:4},
  {nm:'Hesperiidae',orden:'Lepidoptera Diurnae',n:5},
  {nm:'Lycaenidae',orden:'Lepidoptera Diurnae',n:6},
  {nm:'Morphidae',orden:'Lepidoptera Diurnae',n:7},
  {nm:'Nymphalidae',orden:'Lepidoptera Diurnae',n:8},
  {nm:'Papilionidae',orden:'Lepidoptera Diurnae',n:9},
  {nm:'Pieridae',orden:'Lepidoptera Diurnae',n:10},
  {nm:'Riodinidae',orden:'Lepidoptera Diurnae',n:11},
  {nm:'Satyridae',orden:'Lepidoptera Diurnae',n:12},
  {nm:'Moths Nocturnas',orden:'Moths Nocturnas',n:13},
  {nm:'Coleoptera',orden:'Coleoptera',n:14},
  {nm:'Arthropoda',orden:'Arthropoda',n:15},
];
async function migrate(){
  let total=0;
  for(const f of FAMILIAS){
    try{
      await client.create({_type:'familia',nombre:f.nm,id:{_type:'slug',current:f.nm.toLowerCase().replace(/\s+/g,'-')},orden:f.orden,activo:true,orden_display:f.n});
      total++;
      console.log('OK '+f.nm);
    }catch(err){console.log('❌ '+f.nm+': '+err.message);}
  }
  console.log('TOTAL: '+total+' familias');
}
migrate();
