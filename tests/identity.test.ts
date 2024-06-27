import { expect, test } from '@nuxt/test-utils/playwright'

test('Check header integrity', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.locator('#logo')).toHaveAttribute('alt', 'Moravská galerie')
})
