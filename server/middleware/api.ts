import { createProxyMiddleware } from 'http-proxy-middleware'

const config = useRuntimeConfig()

let proxy: ReturnType<typeof createProxyMiddleware>

const getProxy = () => {
  if (!proxy) {
    const prefix = config.app.baseURL.replace(/\/$/, '') + '/api'
    proxy = createProxyMiddleware(prefix + '/', {
      changeOrigin: true,
      ws: false,
      timeout: 3000,
      target: config.API_URL,
      pathRewrite: { ['^' + prefix]: '' },
      headers: {
        'X-Frontend': 'moravska-galerie',
        'Accept-Language': 'cs',
      },
    })
  }

  return proxy
}

export default defineEventHandler(async ({ req, res }) => {
  const url = req.url ?? ''
  if (!url.startsWith('/api/')) {
    return
  }

  const proxy = getProxy() as any

  await new Promise<void>((resolve, reject) => {
    const next = (err?: unknown) => {
      if (err) {
        return reject(err)
      }

      return resolve()
    }

    return proxy(req as any, res as any, next)
  })
})
