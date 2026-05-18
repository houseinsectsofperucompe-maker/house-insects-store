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

// ── SANITY CONFIG ────────────────────────────────────────────
export default defineConfig({
  name: 'house-insects-peru',
  title: 'House Insects of Peru 🦋',
  projectId: '4zd6pr6j',
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
            S.listItem().title('📁 Familias & Subfamilias').child(
              S.documentTypeList('familia').title('Familias')
            ),
          ])
    })
  ],
  schema: {
    types: [especieSchema, familiaSchema],
  },
})
