import { createStorage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'

export default defineEventHandler(async () => {
  const items: any[] = []

  const now = new Date().toISOString()

  const staticPages = [
    {
      url: '/',
      updatedAt: now,
    },
    {
      url: '/collections',
      updatedAt: now,
    },
    {
      url: '/about',
      updatedAt: now,
    },
  ]

  items.push(...staticPages)

  try {
    const driver = redisDriver({
      url: process.env.REDIS_DSN || 'redis://localhost:6379',
    })

    const storage = createStorage({ driver })

    const pages = await storage.getItem('sitemap-urls-pages')

    if (!pages) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
      })
    }

    for (let i = 1; i <= pages; i++) {
      const pageItems = await storage.getItem(`sitemap-urls-${i}`)
      items.push(...pageItems)
    }
  } finally {
    return items
  }
})
