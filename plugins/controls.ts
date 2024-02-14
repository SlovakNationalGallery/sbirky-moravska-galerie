import { watchDebounced } from '@vueuse/core'
import { type InjectionKey } from 'vue'
export const ControlsSymbol: InjectionKey<ReturnType<typeof controlsService>> = Symbol('controls')

import Item from '~/models/Item'
interface IFilterConfig {
  sortBy: string
  sortDirection?: 'asc' | 'desc'
  perPage: number
}

interface Response {
  data: Item[]
  total: number
  current_page: number
  last_page: number
}

const controlsService = async (
  options: IFilterConfig = {
    sortBy: 'updated_at',
    sortDirection: 'asc',
    perPage: 12,
  }
) => {
  const nuxtConfig = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()
  const filters = reactive<Record<string, any>>({})
  const routeParams = reactive<Record<string, string>>({})
  const aggregations = reactive<Record<string, unknown>>({
    size: 1000,
  })

  const page = ref(route.query.page ? Number(route.query.page) : 1)
  const sortBy = ref(route.query.sortBy || options.sortBy)
  const sortDirection = ref(route.query.sortDirection || options.sortDirection)

  const items = ref<any[]>([])

  const aggregationQuery = computed(() => ({ ...filtersQuery.value, ...aggregations }))

  const filtersQuery = computed(() => {
    const query = {
      page: page.value,
      size: options.perPage,
      [`sort[${sortBy.value}]`]: sortDirection.value,
    }

    return {
      ...query,
      ...filters,
    }
  })

  const [itemsDataFetch, aggDataFetch] = await Promise.all([
    useFetch<Response>('api/v1/items', {
      baseURL: nuxtConfig.public.APP_URL,
      query: filtersQuery,
      watch: [filtersQuery],
      transform: (response) => ({
        ...response,
        data: response.data.map((data) => new Item(data)),
      }),
      immediate: false,
    }),
    useFetch<Record<string, { count: number; value: string }[]>>('api/v1/items/aggregations', {
      baseURL: nuxtConfig.public.APP_URL,
      query: aggregationQuery,
      watch: [aggregationQuery],
      immediate: false,
    }),
  ])

  watchDebounced(
    routeParams,
    () => {
      router.push({
        query: routeParams,
      })
    },
    { debounce: 500, maxWait: 1000 }
  )

  watch(
    [filters],
    () => {
      items.value = []
    },
    {
      deep: true,
    }
  )

  watch(itemsDataFetch.data, () => {
    if (page.value == 1) {
      items.value = itemsDataFetch.data.value?.data ?? []
    } else {
      items.value = [...items.value, ...(itemsDataFetch.data.value?.data ?? [])]
    }
  })

  return {
    page,
    items,
    filters,
    aggregations,
    routeParams,
    sortBy,
    sortDirection,
    refresh: () => Promise.all([itemsDataFetch.refresh(), aggDataFetch.refresh()]),
    reset: () => {
      items.value = []
      page.value = 1
      sortBy.value = options.sortBy
      sortDirection.value = options.sortDirection
    },
    options: computed(() => aggDataFetch.data.value),
    isLoading: computed(() => itemsDataFetch.pending.value || aggDataFetch.pending.value),
    total: computed(() => itemsDataFetch.data.value?.total ?? 0),
    lastPage: computed(() => itemsDataFetch.data.value?.last_page ?? 0),
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.provide(ControlsSymbol, controlsService())

  return {}
})
