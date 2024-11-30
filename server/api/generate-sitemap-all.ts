export default defineEventHandler(async (event) => {
  const { token } = getQuery(event)

  if (token !== process.env.SITEMAP_TOKEN) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Page Not Found',
    })
  }

  const page = 1
  const { lastPage } = await $fetch(`/api/generate-sitemap?page=${page}&token=${token}`)

  for (let i = 2; i <= lastPage; i++) {
    console.log(`Generating sitemap page ${i} of ${lastPage}`)
    await $fetch(`/api/generate-sitemap?page=${i}&token=${token}`)
  }

  return {
    status: 'ok',
  }
})
