import type { Payload } from 'payload'
import { devUser } from './helpers/credentials.js'

export const seed = async (payload: Payload) => {
  const { totalDocs } = await payload.count({
    collection: 'users',
    where: { email: { equals: devUser.email } },
  })
  if (!totalDocs) await payload.create({ collection: 'users', data: devUser })

  const { totalDocs: placeCount } = await payload.count({ collection: 'places' })
  if (!placeCount) {
    await payload.create({
      collection: 'places',
      data: {
        title: 'Constance Moofushi',
        countryCode: 'MV',
        tags: [{ tag: { tag: 'Beach' } }, { tag: { tag: 'Luxury' } }],
        budget: [{ durationValue: 7, durationUnit: 'nights', price: 3200, per: 'person' }],
        address: { line1: '1 Ocean Road', city: 'Malé', postcode: '20026', country: 'Maldives' },
        opening_times: [{ opening_time: { day: 'Monday', opening_time: '09:00', closing_time: '17:00' } }],
      } as never,
    })
  }
}
