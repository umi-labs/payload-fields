import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  address,
  bestTimeToVisitMonths,
  budgetField,
  changedByFields,
  countryCodeField,
  dateRangeField,
  gallery,
  openingTimes,
  populateChangedBy,
  slugField,
  tags,
} from '@foundrykit/payload-fields'
import { seed } from './seed.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

export default buildConfig({
  admin: {
    importMap: { baseDir: path.resolve(dirname) },
    autoLogin: { email: 'dev@payloadcms.com', password: 'test', prefillOnly: true },
  },
  collections: [
    {
      slug: 'places',
      admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'countryCode'] },
      hooks: { beforeChange: [populateChangedBy] },
      fields: [
        { name: 'title', type: 'text', required: true },
        ...slugField('title'),
        dateRangeField({ name: 'season', label: 'Best season', description: 'From/to months.' }),
        gallery(),
        tags(),
        budgetField(),
        address(),
        countryCodeField({ required: false }),
        openingTimes(),
        bestTimeToVisitMonths(),
        ...changedByFields(),
      ],
    },
    { slug: 'media', fields: [], upload: { staticDir: path.resolve(dirname, 'media') } },
  ],
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || `file:${path.resolve(dirname, 'dev.db')}` },
    push: true,
  }),
  editor: lexicalEditor(),
  onInit: async (payload) => {
    await seed(payload)
  },
  plugins: [],
  secret: process.env.PAYLOAD_SECRET || 'test-secret_key',
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
