<template>
  <div class="flex flex-col gap-3 items-center">
    <Filter
      v-model="models"
      class="w-full mt-6"
      :controls="controls"
      :selected="selected"
      :toggle="toggle"
      :reset="reset"
    />

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> děl
      </div>

      <Sort v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" />
    </div>

    <div class="w-full">
      <masonry-wall
        :items="pagedItems"
        :ssr-columns="3"
        :column-width="300"
        :gap="24"
        :key-mapper="(item: Item) => item.id"
      >
        <template #default="{ item }">
          <Item :key="`item-${item.id}`" :item="item" />
        </template>
      </masonry-wall>
    </div>

    <Pager v-model="page" :is-loading="isLoading" :last-page="lastPage" />
  </div>
</template>
<script setup lang="ts">
import Filter from '~/components/general/Filter.vue'
import Item from '~/components/general/Item.vue'
import Sort from '~/pages/Sort.vue'
import Pager from '~/components/general/Pager.vue'

const config = [
  {
    key: 'author',
    type: 'select',
    label: 'autor',
  },
  {
    key: 'work_type',
    type: 'select',
    label: 'výtvarný druh',
  },
  {
    key: 'topic',
    type: 'select',
    label: 'námět',
  },
  {
    key: 'technique',
    type: 'select',
    label: 'technika',
  },
  {
    key: 'medium',
    type: 'select',
    label: 'materiál',
  },
  {
    key: 'exhibition',
    type: 'select',
    label: 'výstava',
  },
  {
    key: 'range',
    type: 'range',
    label: 'rok',
    options: {
      min: 'date_latest',
      max: 'date_earliest',
    },
  },
  {
    key: 'has_image',
    type: 'boolean',
    label: 'Len s obrázkom',
    options: {
      default: true,
    },
  },
  {
    key: 'has_iip',
    type: 'boolean',
    label: 'Len so zoomom',
  },
  {
    key: 'q',
    type: 'hidden',
    label: 'q',
    options: {
      default: '',
    },
  },
] as const

const {
  controls,
  models,
  selected,
  toggle,
  reset,
  items,
  total,
  page,
  lastPage,
  sortBy,
  sortDirection,
  isLoading,
} = await useCreateControls(config)

const pagedItems = ref(items.value)

watch(items, () => {
  // remove duplicates from the list
  // TODO: investigate why is useFetch triggering twice
  pagedItems.value = [
    pagedItems.value,
    items.value.filter((item) => !pagedItems.value.some((pagedItem) => pagedItem.id === item.id)),
  ].flat()
})

onMounted(async () => {
  await nextTick()
  watch([sortBy, sortDirection, models], () => {
    pagedItems.value = []
  })
})
</script>
