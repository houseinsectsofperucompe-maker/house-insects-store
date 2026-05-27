import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'

// ── SCHEMA: ESPECIE ─────────────────────────────────────────
const especieSchema = defineType({
  name: 'especie',
  title: 'Especie',
  type: 'document',
  fields: [
    defineField({ name: 'orden', title: '1. Orden / Categoria', type: 'string',
      options: { list: ['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda'] },
      validation: r=>r.required()
    }),
    defineField({ name: 'familia', title: '2. Familia', type: 'string', validation: r=>r.required() }),
    defineField({ name: 'subfamilia', title: '3. Subfamilia (opcional)', type: 'string' }),
    defineField({ name: 'nombre', title: '4. Nombre Cientifico', type: 'string', validation: r=>r.required() }),
    defineField({ name: 'precio', title: '5. Precio USD', type: 'number', validation: r=>r.required().min(0) }),
    defineField({ name: 'stock', title: '6. Stock', type: 'number', validation: r=>r.required().min(0) }),
    defineField({ name: 'calidad', title: 'Calidad', type: 'string', options: { list: ['A1','A1/A1-','A1-','VGA2','A2'] }, initialValue: 'A1' }),
    defineField({ name: 'sexo', title: 'Sexo', type: 'string', options: { list: ['M','F','P','EP','S','M or F'] }, initialValue: 'M or F' }),
    defineField({ name: 'tamano', title: 'Tamano (cm)', type: 'string' }),
    defineField({ name: 'localidad', title: 'Localidad', type: 'string', initialValue: 'Tingo Maria, Peru' }),
    defineField({ name: 'fotoFrente', title: 'Foto Frente', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', type: 'string', title: 'Descripcion' })] }),
    defineField({ name: 'fotoLado', title: 'Foto Lado', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'fotoReverso', title: 'Foto Reverso', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'video', title: 'Video URL', type: 'url' }),
    defineField({ name: 'descripcion', title: 'Descripcion', type: 'text', rows: 3 }),
    defineField({ name: 'activo', title: 'Activo en catalogo', type: 'boolean', initialValue: True }),
    defineField({ name: 'codigoQR', title: 'Codigo QR / SKU', type: 'string' }),
    defineField({ name: 'precio_lujo', title: 'Precio Lujo USD', type: 'number' }),
    defineField({ name: 'orden_display', title: 'Orden en lista', type: 'number' }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'familia', media: 'fotoFrente' },
    prepare({ title, subtitle, media }) { return { title, subtitle, media } }
  },
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
            S.listItem().title('🦋 Especies').child(
              S.documentTypeList('especie').title('Todas las Especies')
            ),
            S.divider(),
            S.listItem().title('📢 Banners').child(S.documentTypeList('banner').title('Banners')),
            S.listItem().title('📣 Avisos').child(S.documentTypeList('aviso').title('Avisos')),
            S.divider(),
            S.listItem().title('📁 Familias & Subfamilias').child(
              S.documentTypeList('familia').title('Familias')
            ),
          ])
    })
  ],
  schema: {
    types: [especieSchema, familiaSchema, bannerSchema, avisoSchema, ordenSchema],
  },
})
