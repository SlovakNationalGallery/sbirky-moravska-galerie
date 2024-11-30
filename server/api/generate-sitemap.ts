import redisDriver from 'unstorage/drivers/redis'
import { createStorage } from 'unstorage'

export default defineEventHandler(async (event) => {
  const { page, token } = getQuery(event)

  if (!page || token !== process.env.SITEMAP_TOKEN) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }

  const now = new Date().toISOString()

  const items: any[] = []

  const { data: pageItems, meta } = await $fetch<any>(
    `${process.env.API_URL}/v2/items?size=1000&page=${page}`,
    {
      headers: {
        'X-Frontend': 'moravska-galerie',
        'Accept-Language': 'cs',
      },
    }
  )

  items.push(
    ...pageItems.map((i: any) => ({
      url: `/items/${i.id}`,
      updatedAt: now,
    }))
  )

  const lastPage = meta.last_page
  try {
    const driver = redisDriver({
      url: process.env.REDIS_DSN || 'redis://localhost:6379',
    })

    const storage = createStorage({ driver })

    await storage.setItem('sitemap-urls-pages', lastPage)
    await storage.setItem(`sitemap-urls-${page}`, items)
  } finally {
    return {
      lastPage: meta.last_page,
    }
  }
})
