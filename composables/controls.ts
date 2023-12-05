import type Item from '~/models/Item'

import Select from '~/components/controls/Select.vue'
import Boolean from '~/components/controls/Boolean.vue'

export interface ITermsConfig {
  key: string
  type: 'select' | 'boolean'
  label: string
}

const componentsMap = {
  select: Select,
  boolean: Boolean,
}

export const useCreateControls = async (config: readonly ITermsConfig[]) => {
  type ConfigKey = (typeof config)[number]['key']
  const PER_PAGE = 30

  const nuxtConfig = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()

  const page = ref(+(route.query.page ?? 1))
  // TODO: proper pager
  const perPage = ref(PER_PAGE)

  const controls = computed(() => {
    return config.map((control) => {
      const items = aggregations.data.value?.[control.key] ?? []
      const options = items.map((item) => ({
        label: `${item.value} (${item.count})`,
        value: item.value,
      }))

      return {
        ...control,
        component: componentsMap[control.type],
        options,
      }
    })
  })

  const selected = computed(() => {
    const items = []
    for (const key in models) {
      if (Array.isArray(models[key]) && models[key].length) {
        items.push(models[key].map((value: string) => ({ key, value })))
      }
    }
    return items.flat()
  })

  const toggle = (key: ConfigKey, value: string) => {
    const index = models[key].indexOf(value)

    if (index === -1) {
      models[key].push(value)
    } else {
      models[key].splice(index, 1)
    }
  }

  const reset = () => {
    config.forEach((control) => {
      models[control.key] = control.type === 'boolean' ? false : []
    })
  }

  const getQuery = () => {
    const query = {
      ...route.query,
    } as Record<string, any>

    for (const key in query) {
      const control = config.find((control) => control.key === key)

      if (control!.type === 'select') {
        query[key] = Array.isArray(query[key]) ? query[key] : [query[key]]
      }

      if (control!.type === 'boolean') {
        query[key] = query[key] === 'true'
      }
    }

    return query
  }

  const createQuery = () => {
    const query = {
      ...models,
    }

    for (const key in query) {
      if ((Array.isArray(query[key]) && !query[key].length) || !query[key]) {
        delete query[key]
      }
    }

    return query
  }

  const models = reactive<Record<ConfigKey, any>>({
    ...config.reduce((acc, control) => {
      if (acc[control.key]) {
        return acc
      }

      acc[control.key] = control.type === 'boolean' ? false : []
      return acc
    }, getQuery() as any),
  })

  const filtersQuery = computed(() => {
    return {
      ...config.reduce((acc, control) => {
        if (control.type === 'boolean' && models[control.key]) {
          acc[`filter[${control.key}]`] = models[control.key]
        }
        if (control.type === 'select' && models[control.key].length) {
          acc[`filter[${control.key}][]`] = models[control.key]
        }
        return acc
      }, [] as any),
      page: 1,
      size: PER_PAGE * page.value,
    }
  })

  const aggregationQuery = computed(() => {
    return {
      ...filtersQuery.value,
      ...config.reduce((acc, control) => {
        acc[`terms[${control.key}]`] = control.key
        return acc
      }, [] as any),
      // TODO: min/max
      'min[date_earliest]': 'date_earliest',
      'max[date_latest]': 'date_latest',
      'size': 1000,
    }
  })

  const [items, aggregations] = await Promise.all([
    useFetch<{
      data: Item[]
      total: number
      current_page: number
      last_page: number
    }>('api/items', {
      baseURL: nuxtConfig.public.APP_URL,
      query: filtersQuery,
      watch: [filtersQuery],
      lazy: true, // TODO: evaluate ssr performance
      deep: true,
    }),
    useFetch<Record<string, { count: number; value: string }[]>>('api/items/aggregations', {
      baseURL: nuxtConfig.public.APP_URL,
      query: aggregationQuery,
      watch: [aggregationQuery],
      lazy: true, // TODO: evaluate ssr performance
      deep: true,
    }),
  ])

  watch(
    models,
    () => {
      router.push({
        query: createQuery(),
      })
    },
    {
      deep: true,
    }
  )

  return {
    controls,
    models,
    selected,
    filtersQuery,
    toggle,
    reset,
    items: computed(() => items.data.value?.data ?? []),
    total: computed(() => items.data.value?.total ?? 0),
    lastPage: computed(() => items.data.value?.last_page ?? 0),
    page,
  }
}
