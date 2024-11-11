<template>
  <div class="flex flex-col gap-3 items-center">
    <ClientOnly>
      <Filter class="w-full" />
    </ClientOnly>

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> děl
      </div>

      <Sort v-model:sort-by="sortBy" v-model:sort-direction="sortDirection" />
    </div>
    <div v-if="items.length" class="w-full">
      <masonry-wall
        :items="items"
        :ssr-columns="3"
        :column-width="300"
        :gap="24"
        :key-mapper="(item: any) => item.id"
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
import Item from '~/components/general/Item.vue'
import Sort from '~/components/general/Sort.vue'
import Pager from '~/components/general/Pager.vue'
import { useControls } from '~/composables/controls'
import Filter from '~/components/general/Filter.vue'
import { formatString } from '~/utils/formatters'
import { labels } from '~/utils/filter'

const { items, total, page, lastPage, isLoading, sortBy, sortDirection, refresh, filters } =
  await useControls()

const pageTitle = computed(() => {
  const attributes = [
    {
      key: 'filter[exhibition][]',
      label: `${labels.exhibtion}: {value}`,
    },
    {
      key: 'filter[author][]',
      label: `${labels.author}: {value}`,
    },
    {
      key: 'filter[work_type][]',
      label: `${labels.work_type}: {value}`,
    },
    {
      key: 'filter[topic][]',
      label: `${labels.topic}: {value}`,
    },
    {
      key: 'filter[medium][]',
      label: `${labels.medium}: {value}`,
    },
    {
      key: 'filter[technique][]',
      label: `${labels.technique}: {value}`,
    },
    {
      key: 'filter[related_work]',
      label: `${labels.related_work}: {value}`,
    },
    {
      key: 'filter[has_image]',
      label: labels.has_image,
    },
    {
      key: 'filter[has_iip]',
      label: labels.has_iip,
    },
  ]

  return attributes
    .map((attribute) => {
      const values =
        attribute.key === 'filter[author][]' && filters[attribute.key]
          ? filters[attribute.key].map((value) => formatAuthor(value))
          : filters[attribute.key]

      const value = Array.isArray(values) ? values.join(', ') : values

      if (value) {
        return formatString(attribute.label, { value })
      }
    })
    .filter(Boolean)
    .join(' • ')
})

useHead(() => ({
  title: pageTitle.value,
}))

onMounted(() => {
  refresh()
})
</script>
