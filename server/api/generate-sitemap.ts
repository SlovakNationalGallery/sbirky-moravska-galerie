import redisDriver from 'unstorage/drivers/redis'
import { createStorage } from 'unstorage'

export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)
  if (token !== process.env.SITEMAP_TOKEN) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }

  const now = new Date().toISOString()
  const urls: string[] = ['/', '/collections', '/about']

  let page, lastPage
  for (page = lastPage = 1; page <= lastPage; page++) {
    const { data, meta } = await $fetch<any>(`/api/collections?size=1000&page=${page}`, {
      baseURL: process.env.APP_URL,
    })
    lastPage = meta.last_page
    urls.push(...data.map((i: any) => `/collections/${i.id}`))
  }

  for (page = lastPage = 1; page <= lastPage; page++) {
    const endpoint = `${process.env.API_URL}/v2/items?size=1000&page=${page}`
    const { data, meta } = await $fetch<any>(endpoint, {
      headers: {
        'X-Frontend': 'moravska-galerie',
        'Accept-Language': 'cs',
      },
    })
    lastPage = meta.last_page
    urls.push(...data.map((i: any) => `/items/${i.id}`))
  }

  const entries = urls.map((url) => ({
    loc: url,
    lastmod: now,
    changefreq: 'monthly',
    priority: 0.5,
  }))

  const driver = redisDriver({
    url: process.env.REDIS_DSN || 'redis://localhost:6379',
  })

  const storage = createStorage({ driver })
  await storage.setItem('sitemap-entries', entries)

  return {
    status: 'ok',
  }
})
