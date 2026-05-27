import { defineConfig, defineType, defineField } from 'sanity'
import { structureTool } from 'sanity/structure'

// ── SCHEMA: ESPECIE ─────────────────────────────────────────
const especieSchema = defineType({
  name: 'especie',
  title: 'Especie',
  type: 'document',
  fields: [
    defineField({ name: 'nombre', title: 'Nombre Científico', type: 'string', validation: r => r.required() }),
    defineField({ name: 'orden', title: 'Orden', type: 'string',
      options: { list: [
        'Lepidoptera Diurnae', 'Moths Nocturnas', 'Coleoptera', 'Arthropoda'
      ]}
    }),
    defineField({ name: 'familia', title: 'Familia', type: 'string' }),
    defineField({ name: 'subfamilia', title: 'Subfamilia', type: 'string' }),
    defineField({ name: 'localidad', title: 'Localidad', type: 'string', initialValue: 'Tingo María, Perú' }),
    defineField({ name: 'calidad', title: 'Calidad', type: 'string',
      options: { list: ['A1', 'A1/A1-', 'A1-', 'VGA2', 'A2'] },
      initialValue: 'A1'
    }),
    defineField({ name: 'sexo', title: 'Sexo', type: 'string',
      options: { list: ['M', 'F', 'P', 'EP', 'S', 'M or F'] },
      initialValue: 'M or F'
    }),
    defineField({ name: 'tamano', title: 'Tamaño (cm)', type: 'string' }),
    defineField({ name: 'precio', title: 'Precio USD', type: 'number', validation: r => r.required().min(0) }),
    defineField({ name: 'stock', title: 'Stock', type: 'number', validation: r => r.required().min(0) }),
    defineField({ name: 'codigoQR', title: 'Código QR / SKU', type: 'string' }),
    defineField({ name: 'fotoFrente', title: '📸 Foto Frente', type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Descripción' })]
    }),
    defineField({ name: 'fotoLado', title: '📸 Foto Lado', type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'fotoReverso', title: '📸 Foto Reverso', type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'video', title: '🎥 Video URL (Cloudinary)', type: 'url' }),
    defineField({ name: 'descripcion', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'activo', title: 'Activo en catálogo', type: 'boolean', initialValue: true }),
    defineField({ name: 'regiones', title: '🌍 Mercados Destacados', type: 'array',
      of: [{type:'string'}],
      options: { list: [
        {title:'🇨🇳 Asia Premium', value:'asia'},
        {title:'🇯🇵 Japón & Corea', value:'japon'},
        {title:'🇩🇪 Europa Museum', value:'europa'},
        {title:'🇸🇪 Nórdicos', value:'nordico'},
        {title:'🇺🇸 USA Ultra Lujo', value:'america'},
        {title:'🇦🇪 Dubai & Medio Oriente', value:'oriente'},
        {title:'🇧🇷 Latinoamérica', value:'latam'},
        {title:'🌍 Global', value:'global'},
      ], layout: 'grid'}
    }),
    defineField({ name: 'nicho', title: '🎯 Nicho de Cliente', type: 'string',
      options: { list: [
        {title:'🏛️ Museo & Científico', value:'museo'},
        {title:'💎 Coleccionista Lujo', value:'coleccionista'},
        {title:'🎨 Galería Arte', value:'galeria'},
        {title:'💍 Joyería Alta Moda', value:'joyeria'},
        {title:'🏨 Hotel 5 Estrellas', value:'hotel'},
        {title:'🔬 Farmacéutica', value:'farmaceutica'},
        {title:'🍽️ Gastronomía', value:'gastronomia'},
      ]}
    }),
    defineField({ name: 'destacado_global', title: '⭐ Destacado Global', type: 'boolean', initialValue: false }),
    defineField({ name: 'precio_lujo', title: '💎 Precio Lujo USD', type: 'number' }),
    defineField({ name: 'orden_display', title: 'Orden en lista (1,2,3...)', type: 'number' }),
  ],
  preview: {
    select: { title: 'nombre', subtitle: 'familia', media: 'fotoFrente' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media }
    }
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
    types: [especieSchema, familiaSchema, bannerSchema, avisoSchema],
  },
})
