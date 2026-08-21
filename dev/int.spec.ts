import type { Payload } from 'payload'
import config from '@payload-config'
import { getPayload } from 'payload'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

let payload: Payload
beforeAll(async () => { payload = await getPayload({ config }) })
afterAll(async () => { await payload.destroy() })

describe('payload-fields on the places collection', () => {
  test('all field factories registered the expected fields', () => {
    const names = payload.collections['places'].config.fields
      .flatMap((f) => ('name' in f ? [f.name] : []))
    for (const n of ['slug', 'slugLock', 'season', 'gallery', 'tags', 'budget', 'address', 'countryCode', 'opening_times', 'months', 'createdBy', 'updatedBy']) {
      expect(names).toContain(n)
    }
  })

  test('slug auto-formats from title (with transliteration) and changedBy stamps the user', async () => {
    const { docs: [admin] } = await payload.find({ collection: 'users', limit: 1 })
    const doc = await payload.create({
      collection: 'places',
      data: { title: 'Réunion Île' } as never,
      user: admin,
      overrideAccess: false,
    })
    expect(doc.slug).toBe('reunion-ile')
    expect(doc.createdBy).toBeTruthy()
    expect(doc.updatedBy).toBeTruthy()
  })

  test('bestTimeToVisit seeds 12 month rows by default', async () => {
    const doc = await payload.create({ collection: 'places', data: { title: 'Somewhere' } as never })
    expect((doc.months as unknown[]).length).toBe(12)
  })

  test('country code select carries the full ISO list', () => {
    const field = payload.collections['places'].config.fields.find(
      (f) => 'name' in f && f.name === 'countryCode',
    ) as { options: unknown[] }
    expect(field.options.length).toBeGreaterThan(200)
  })
})
