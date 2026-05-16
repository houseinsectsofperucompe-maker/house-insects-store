import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'house-insects-peru',
  title: 'House Insects of Peru',
  projectId: '4zd6pr6j',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: [] },
})
