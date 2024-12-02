import { createStorage } from 'unstorage'
import redisDriver from 'unstorage/drivers/redis'

export default defineEventHandler(async () => {
  const driver = redisDriver({
    url: process.env.REDIS_DSN || 'redis://localhost:6379',
  })
  const storage = createStorage({ driver })
  return await storage.getItem('sitemap-entries')
})
