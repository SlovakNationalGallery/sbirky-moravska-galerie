import isEqual from 'lodash-ts/isEqual'

import Item from '~/models/Item'
import { Select, Range, Boolean } from '#components'
const componentsMap = {
  select: Select,
  boolean: Boolean,
  range: Range,
  hidden: null,
}
export interface ITermsConfig {
  key: string
  type: 'select' | 'boolean' | 'range' | 'hidden'
  label: string
  options?: Record<string, string>
}

export const useCreateControls = async (config: readonly ITermsConfig[]) => {
  type ConfigKey = (typeof config)[number]['key']
  const PER_PAGE = 12

  const nuxtConfig = useRuntimeConfig()
  const route = useRoute()
  const router = useRouter()

  const page = ref(+(route.query.page ?? 1))
  // TODO: proper pager
  // const perPage = ref(PER_PAGE)

  const controls = computed(() => {
    return config.map((control) => {
      const items = aggregations.data.value?.[control.key] ?? []
      let options: any

      if (control.type === 'range') {
        options = {
          min: aggregations.data.value?.[control.options?.min ?? 'min'],
          max: aggregations.data.value?.[control.options?.max ?? 'max'],
        }
      }
      if (control.type === 'select') {
        options = items.map((item) => ({
          label: `${item.value} (${item.count})`,
          value: item.value,
        }))
      }

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
      const control = config.find((control) => control.key === key)!

      if (control.type === 'select') {
        query[key] = Array.isArray(query[key]) ? query[key] : [query[key]]
      }

      if (control.type === 'boolean') {
        query[key] = query[key] === 'true'
      }

      if (control.type === 'range') {
        const range = typeof query[key] === 'string' ? JSON.parse(query[key]) : query[key]

        query[key] = {
          min: range.min ?? null,
          max: range.max ?? null,
        }
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

      const control = config.find((control) => control.key === key)!

      if (control.type === 'hidden' && !query[key]) {
        delete query[key]
      }

      if (control.type === 'range') {
        const defaultValues = {
          min: aggregations.data.value?.[control.options?.min ?? 'min'],
          max: aggregations.data.value?.[control.options?.max ?? 'max'],
        }

        if (isEqual(models[key], defaultValues)) {
          delete query[key]
        }
      }
    }

    return query
  }

  const models = reactive<Record<ConfigKey, any>>({
    ...config.reduce((acc, control) => {
      if (acc[control.key]) {
        return acc
      }

      switch (control.type) {
        case 'boolean':
          acc[control.key] = false
          break
        case 'select':
          acc[control.key] = []
          break
        case 'range':
          acc[control.key] = {
            min: null,
            max: null,
          }
          break
        case 'hidden':
          acc[control.key] = control.options?.default ?? ''
          break
      }

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

        if (control.type === 'range') {
          if (models[control.key].min) {
            acc[`filter[${control.options?.min ?? 'min'}][gte]`] = models[control.key].min
          }
          if (models[control.key].max) {
            acc[`filter[${control.options?.max ?? 'max'}][lte]`] = models[control.key].max
          }
        }

        if (control.type === 'hidden' && models[control.key]) {
          acc[`filter[${control.key}]`] = models[control.key]
        }

        return acc
      }, [] as any),
      page: page.value,
      size: PER_PAGE,
    }
  })

  const aggregationQuery = computed(() => {
    return {
      ...filtersQuery.value,
      ...config.reduce((acc, control) => {
        if (['boolean', 'select'].includes(control.type)) {
          acc[`terms[${control.key}]`] = control.key
        }

        if (control.type === 'range' && control.options) {
          acc[`min[${control.options.min}]`] = control.options.min
          acc[`max[${control.options.max}]`] = control.options.max
        }

        return acc
      }, [] as any),

      size: 1000,
    }
  })

  type Response = {
    data: Item[]
    total: number
    current_page: number
    last_page: number
  }

  const [items, aggregations] = await Promise.all([
    useFetch<Response>('api/v1/items', {
      baseURL: nuxtConfig.public.APP_URL,
      query: filtersQuery,
      watch: [filtersQuery],
      transform: (response) => ({
        ...response,
        data: response.data.map((data) => new Item(data)),
      }),
      lazy: false, // TODO: evaluate ssr performance
      deep: true,
    }),
    useFetch<Record<string, { count: number; value: string }[]>>('api/v1/items/aggregations', {
      baseURL: nuxtConfig.public.APP_URL,
      query: aggregationQuery,
      watch: [aggregationQuery],
      lazy: false,
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

  // const appendPage = () => {
  //   const test = useFetch<Response>('api/items', {
  //     baseURL: nuxtConfig.public.APP_URL,
  //     query: {
  //       ...filtersQuery.value,
  //       page: page.value + 1,
  //     },
  //     transform: (response) => ({
  //       ...response,
  //       data: response.data.map((data) => new Item(data)),
  //     }),
  //   })
  // }

  return {
    controls,
    models,
    selected,
    toggle,
    reset,
    items: computed(() => items.data.value?.data.map((data) => new Item(data)) ?? []),
    total: computed(() => items.data.value?.total ?? 0),
    lastPage: computed(() => items.data.value?.last_page ?? 0),
    page,
    sortBy: ref('last_update'),
  }
}
