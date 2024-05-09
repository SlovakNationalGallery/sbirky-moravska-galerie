export const useBaseFetch = <T>(url: string, config?: any) => {
  const nuxtConfig = useRuntimeConfig()

  return useFetch<T>(url, {
    baseURL: nuxtConfig.public.APP_URL,
    ...(config ?? {}),
  })
}
