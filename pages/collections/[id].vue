<template>
  <div v-if="collection" class="flex flex-col items-center">
    <TransitionExpand>
      <Image :url="collection.header_image_src" class="max-h-[400px] w-full mt-8 object-cover" />
    </TransitionExpand>

    <div class="max-w-[740px]">
      <h2 class="text-3xl md:text-5xl md:text-center mt-10 mb-6">{{ collection.name }}</h2>

      <div class="md:text-xl md:text-center" v-html="collection.text"></div>

      <div class="flex justify-center gap-3 my-6">
        <FilterAttribute
          v-for="(value, attribute) in collection.item_filter"
          v-bind="{ attribute, value }"
          :key="attribute"
        />
      </div>
    </div>

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> {{ t('item.resultsCount', total) }}
      </div>
      <Sort v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" />
    </div>
    <div v-if="collection.items.length" class="w-full">
      <masonry-wall
        :items="collection.items"
        :ssr-columns="3"
        :column-width="300"
        :gap="24"
        :key-mapper="(item: Item) => item.id"
      >
        <template #default="{ item }">
          <ItemCard :key="`item-${item.id}`" :item="item" />
        </template>
      </masonry-wall>
    </div>

    <Pager v-model="page" :is-loading="isLoading" :last-page="lastPage" />
  </div>
</template>

<script setup lang="ts">
import Image from '~/components/general/Image.vue'
import Item from '~/models/Item'
import ItemCard from '~/components/general/Item.vue'
import Collection from '~/models/Collection'
import Pager from '~/components/general/Pager.vue'
import FilterAttribute from '~/components/general/FilterAttribute.vue'
import Sort from '~/components/general/Sort.vue'
import { useBaseFetch } from '~/composables/fetch'
const route = useRoute()
const { t } = useI18n()
const id = route.params.id as string

const collectionData = useBaseFetch<any>(`api/collections/${id}`)
const collection = computed(() => new Collection(collectionData.data.value?.data))

useSeoMeta(() => ({
  title: collection.value.name,
  ogTitle: collection.value.name,
  ogImage: collection.value.header_image_src,
}))

// todo from url?
const sortBy = ref(null)
const sortDirection = ref(null)
const page = ref(1)

const itemsQuery = computed(() => {
  const query: Record<string, number | string> = {
    size: 12,
    page: page.value,
  }

  if (sortBy.value && sortDirection.value) {
    query[`sort[${sortBy.value}]`] = sortDirection.value
  }

  return query
})

interface ItemsResponse {
  data: Item[]
  total: number
  last_page: number
}

const itemsDataFetch = useBaseFetch<ItemsResponse>(`api/collections/${id}/items`, {
  query: itemsQuery,
  watch: [itemsQuery],
  transform: (response) => ({
    ...response,
    data: response.data.map((data) => new Item(data)),
  }),
  immediate: false,
})

watch(itemsDataFetch.data, () => {
  if (page.value == 1) {
    collection.value.items = itemsDataFetch.data.value?.data ?? []
  } else {
    collection.value.items = [...collection.value.items, ...(itemsDataFetch.data.value?.data ?? [])]
  }
})

itemsDataFetch.execute()

const total = computed(() => itemsDataFetch.data.value?.total ?? 0)
const isLoading = computed(() => itemsDataFetch.pending.value)
const lastPage = computed(() => itemsDataFetch.data.value?.last_page ?? 0)
</script>
