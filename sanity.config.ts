import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'

// ── SCHEMA: ESPECIE ─────────────────────────────────────────
const especieSchema = defineType({
  name: 'especie',
  title: 'Especie',
  type: 'document',
  fields: [
    defineField({ name: 'ordenCategoria', title: '1. Orden / Categoria', type: 'string',
      options: { list: [
        {title:'🦋 Lepidoptera Diurnae', value:'Lepidoptera Diurnae'},
        {title:'🌙 Moths Nocturnas', value:'Moths Nocturnas'},
        {title:'🪲 Coleoptera', value:'Coleoptera'},
        {title:'🕷️ Arthropoda', value:'Arthropoda'},
      ], layout:'radio' },
      validation: r=>r.required()
    }),
    defineField({ name: 'familia', title: '2. Familia', type: 'string', validation: r=>r.required(),
      description: 'Ej: Brassolidae, Morphidae, Dynastidae, etc.'
    }),
    defineField({ name: 'subfamilia', title: '3. Subfamilia (si tiene)', type: 'string',
      description: 'Ej: Erebidae > Acontiinae. Dejar vacio si no tiene subfamilia.'
    }),
    defineField({ name: 'nombre', title: '4. Nombre Cientifico', type: 'string', validation: r=>r.required() }),
    defineField({ name: 'precio', title: '5. Precio USD', type: 'number', validation: r=>r.required().min(0) }),
    defineField({ name: 'stock', title: '6. Stock (cantidad)', type: 'number', validation: r=>r.required().min(0) }),
    defineField({ name: 'calidad', title: '7. Calidad', type: 'string',
      options: { list: [
        {title:'A1 - Perfecto sin defectos', value:'A1'},
        {title:'A1- - Con pequeños defectos', value:'A1-'},
        {title:'A1/A1- - Entre A1 y A1-', value:'A1/A1-'},
        {title:'VGA2 - Segunda calidad buena', value:'VGA2'},
        {title:'A2 - Segunda calidad', value:'A2'},
      ], layout:'radio' },
      initialValue: 'A1'
    }),
    defineField({ name: 'sexo', title: '8. Sexo', type: 'string',
      options: { list: [
        {title:'M - Macho', value:'M'},
        {title:'F - Hembra', value:'F'},
        {title:'P - Par (macho y hembra)', value:'P'},
        {title:'EP - Ex-pupae criado en granja', value:'EP'},
        {title:'S - Set con descuento', value:'S'},
        {title:'M or F - Indistinto', value:'M or F'},
      ], layout:'radio' },
      initialValue: 'M or F'
    }),
    defineField({ name: 'tamano', title: '9. Tamano (cm)', type: 'string', description:'Ej: 8-10 cm' }),
    defineField({ name: 'localidad', title: '10. Localidad de origen', type: 'string', initialValue: 'Tingo Maria, Huanuco, Peru' }),
    defineField({ name: 'codigoQR', title: '11. Codigo QR / SKU', type: 'string' }),
    defineField({ name: 'fotoFrente', title: '12. Foto Frente (URL Bunny.net)', type: 'url',
      description: 'URL de la foto frente en Bunny.net. Ej: https://HouseInsects1967.b-cdn.net/brassolidae/caligo-frente.webp'
    }),
    defineField({ name: 'fotoLado', title: '13. Foto Lado (URL Bunny.net)', type: 'url',
      description: 'URL de la foto lado en Bunny.net'
    }),
    defineField({ name: 'fotoReverso', title: '14. Foto Reverso (URL Bunny.net)', type: 'url',
      description: 'URL de la foto reverso en Bunny.net'
    }),
    defineField({ name: 'video', title: '15. Video URL', type: 'url' }),
    defineField({ name: 'descripcion', title: '16. Descripcion', type: 'text', rows: 3 }),
    defineField({ name: 'precio_lujo', title: '17. Precio Lujo USD (opcional)', type: 'number' }),
    defineField({ name: 'activo', title: 'Activo en catalogo web', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'familia', media: 'fotoFrente' },
    prepare({ title, subtitle, media }) { return { title, subtitle } }
  },
  orderings: [
    { title: 'Nombre A-Z', name: 'nombreAsc', by: [{ field: 'nombre', direction: 'asc' }] },
    { title: 'Precio Mayor', name: 'precioDesc', by: [{ field: 'precio', direction: 'desc' }] },
    { title: 'Stock Mayor', name: 'stockDesc', by: [{ field: 'stock', direction: 'desc' }] },
  ]
})

// ── SCHEMA: FAMILIA ─────────────────────────────────────────
const familiaSchema = defineType({
  name: 'familia',
  title: 'Familia / Subfamilia',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'ID único', type: 'slug', options: { source: 'nombre' } }),
    defineField({ name: 'nombre', title: 'Nombre', type: 'string', validation: r => r.required() }),
    defineField({ name: 'orden', title: 'Orden (Lepidoptera, Moths, etc)', type: 'string',
      options: { list: ['Lepidoptera Diurnae', 'Moths Nocturnas', 'Coleoptera', 'Arthropoda'] }
    }),
    defineField({ name: 'ordenRef', title: 'Orden (Referencia)', type: 'reference', to: [{type: 'orden'}], weak: true }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text' }),
    defineField({ name: 'activo', title: 'Activo', type: 'boolean', initialValue: true }),
    defineField({ name: 'orden_display', title: 'Orden en lista', type: 'number' }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'orden' }
  }
})


const bannerSchema = defineType({
  name: 'banner',
  title: 'Banners Publicitarios',
  type: 'document',
  fields: [
    defineField({name:'cliente',title:'Cliente/Empresa',type:'string',validation:r=>r.required()}),
    defineField({name:'pais',title:'País',type:'string'}),
    defineField({name:'email',title:'Email',type:'string'}),
    defineField({name:'url',title:'URL destino',type:'url'}),
    defineField({name:'posicion',title:'Posición',type:'string',options:{list:['header','catalogo','sidebar','footer']}}),
    defineField({name:'plan',title:'Plan',type:'string',options:{list:['mensual','trimestral','semestral','anual']}}),
    defineField({name:'precio',title:'Precio USD',type:'number'}),
    defineField({name:'vence',title:'Fecha vencimiento',type:'date'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'imagen',title:'Imagen del banner',type:'image',options:{hotspot:true}}),
    defineField({name:'imagenUrl',title:'URL imagen (Bunny.net)',type:'url'}),
  ],
  preview:{select:{title:'cliente',subtitle:'plan'}}
})


const avisoSchema = defineType({
  name: 'aviso',
  title: 'Avisos & Publicidad',
  type: 'document',
  fields: [
    defineField({name:'titulo',title:'Título',type:'string',validation:r=>r.required()}),
    defineField({name:'subtitulo',title:'Subtítulo',type:'string'}),
    defineField({name:'precio',title:'Precio/CTA',type:'string'}),
    defineField({name:'mercado',title:'Mercado objetivo',type:'string',options:{list:['asia','japon','europa','usa','dubai','latam','global']}}),
    defineField({name:'formato',title:'Formato',type:'string',options:{list:['instagram','facebook','whatsapp','banner_web','tiktok']}}),
    defineField({name:'canales',title:'Canales',type:'array',of:[{type:'string'}]}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'fecha',title:'Fecha',type:'date'}),
    defineField({name:'imagen',title:'Imagen',type:'image',options:{hotspot:true}}),
  ],
  preview:{select:{title:'titulo',subtitle:'mercado'}}
})


const ordenSchema = defineType({
  name: 'orden',
  title: 'Ordenes / Categorias',
  type: 'document',
  fields: [
    defineField({name:'nombre',title:'Nombre',type:'string',validation:r=>r.required()}),
    defineField({name:'icono',title:'Icono',type:'string'}),
    defineField({name:'activo',title:'Activo',type:'boolean',initialValue:true}),
    defineField({name:'orden_display',title:'Orden en lista',type:'number'}),
  ],
  preview:{select:{title:'nombre',subtitle:'icono'}}
})

// ── SANITY CONFIG ────────────────────────────────────────────
export default defineConfig({
  name: 'house-insects-peru',
  title: 'House Insects of Peru 🦋',
  projectId: 'lyty7d3g',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Panel de Administración')
          .items([
            S.listItem().title('📋 Ordenes / Categorias').child(S.documentTypeList('orden').title('Ordenes')),
            S.divider(),
            S.listItem().title('📁 Familias & Subfamilias').child(S.documentTypeList('familia').title('Familias')),
            S.divider(),
            S.listItem().title('🦋 Especies').child(S.documentTypeList('especie').title('Todas las Especies')),
            S.divider(),
            S.listItem().title('📢 Banners').child(S.documentTypeList('banner').title('Banners')),
            S.listItem().title('📣 Avisos').child(S.documentTypeList('aviso').title('Avisos')),
          ])
    })
  ],
  schema: {
    types: [especieSchema, familiaSchema, bannerSchema, avisoSchema, ordenSchema],
  },
})
