import { expect, test } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const shot = (name: string) => path.resolve(dirname, 'screenshots', name)

test('capture admin screenshots', async ({ page }) => {
  test.setTimeout(180_000)
  const res = await page.request.post('/api/users/login', { data: { email: 'dev@payloadcms.com', password: 'test' } })
  expect(res.ok(), `login failed: ${res.status()}`).toBeTruthy()

  const list = await page.request.get('/api/places?limit=1')
  const id = (await list.json()).docs[0].id
  await page.goto(`/admin/collections/places/${id}`)
  await page.waitForSelector('.slug-field-component', { timeout: 30_000 })
  await page.waitForTimeout(1500)
  await page.screenshot({ path: shot('01-all-fields.png'), fullPage: true })

  // Focused shot of the best-time-to-visit month grid
  const btv = page.locator('.field-type.array').last()
  await btv.scrollIntoViewIfNeeded().catch(() => {})
  await page.waitForTimeout(500)
  await page.screenshot({ path: shot('02-best-time-to-visit.png') })
})
