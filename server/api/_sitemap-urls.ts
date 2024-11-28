import { createStorage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'

export default defineEventHandler(async (event) => {
  const driver = redisDriver({
    url: process.env.REDIS_DSN || 'redis://localhost:6379',
  })

  const storage = createStorage({ driver })

  if (!event.node.req.headers.host?.match(/^localhost(:\d+)?$/)) {
    return storage.getItem('sitemap-urls')
  }

  const { data: collections } = await $fetch<any>('api/collections?size=1000', {
    baseURL: process.env.APP_URL,
  })

  const now = new Date().toISOString()

  const pages = [
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

  const fetchAllItems = async () => {
    const res = await $fetch<any>(`${process.env.API_URL}/v2/items?size=1000`, {
      headers: {
        'X-Frontend': 'moravska-galerie',
        'Accept-Language': 'cs',
      },
    })

    let page = 1
    const items: any[] = []
    const lastPage = res.meta.last_page

    for (page; page <= lastPage; page++) {
      const { data: pageItems } = await $fetch<any>(
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
    }

    return items
  }

  const items = await fetchAllItems()

  const sitemapUrls = [
    ...pages,
    ...items,
    ...collections.map((i: any) => ({
      url: `/collections/${i.id}`,
      updatedAt: now,
    })),
  ].map((i) => ({
    url: i.url,
    lastmod: i.updatedAt,
    changefreq: 'monthly',
    priority: 0.8,
  }))

  storage.setItem('sitemap-urls', sitemapUrls)

  return sitemapUrls
})
