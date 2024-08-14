export const createRedirects = () => {
  const redirects: Record<string, any> = {
    '/katalog': {
      redirect: {
        to: '/',
        statusCode: 301,
      },
    },

    '/archiv-hochova': {
      redirect: {
        to: '/collections/190',
        statusCode: 301,
      },
    },

    '/informacie': {
      redirect: {
        to: '/about',
        statusCode: 301,
      },
    },

    '/dilo/**': {
      redirect: {
        to: '/items/**',
        statusCode: 301,
      },
    },
  }

  return redirects
}
