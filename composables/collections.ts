import Collection from '~/models/Collection'
import { useBaseFetch } from '~/composables/fetch'

interface Meta {
  total: number
  current_page: number
  last_page: number
}

interface Response {
  data: Collection[]
  meta: Meta
}

export const useCollections = (perPage: number = 12) => {
  const nuxtConfig = useRuntimeConfig()
  const route = useRoute()

  const page = ref(route.query.page ? Number(route.query.page) : 1)

  const collections = ref<any[]>([])

  const query = computed(
    (): Record<string, number | string> => ({
      page: page.value,
      size: perPage,
    })
  )

  const collectionsDataFetch = useBaseFetch<Response>('api/collections', {
    query: query,
    watch: [query],
    transform: (response) => ({
      ...response,
      data: response.data.map((data) => new Collection(data)),
    }),
    immediate: false,
  })

  watch(collectionsDataFetch.data, () => {
    if (page.value == 1) {
      collections.value = collectionsDataFetch.data.value?.data ?? []
    } else {
      collections.value = [...collections.value, ...(collectionsDataFetch.data.value?.data ?? [])]
    }
  })

  return {
    page,
    collections,
    refresh: () => collectionsDataFetch.refresh(),
    reset: () => {
      collections.value = []
      page.value = 1
    },
    isLoading: computed(() => collectionsDataFetch.pending.value),
    total: computed(() => collectionsDataFetch.data.value?.meta.total ?? 0),
    lastPage: computed(() => collectionsDataFetch.data.value?.meta.last_page ?? 0),
  }
}
