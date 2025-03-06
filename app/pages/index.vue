<template>
  <div class="flex flex-col gap-7 items-center">
    <WUFilter class="w-full mt-6" />

    <div class="w-full flex items-center">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> {{ t('item.resultsCount', total) }}
      </div>
      <WUSort />
    </div>
    <div
      v-if="items.length"
      class="w-full"
    >
      <masonry-wall
        :items="items"
        :ssr-columns="$masonrySsrColumns"
        :column-width="300"
        :gap="24"
        :key-mapper="(item: any) => item.id"
      >
        <template #default="{ item }">
          <WUItem
            :key="`item-${item.id}`"
            :item="item"
          />
        </template>
      </masonry-wall>
    </div>

    <WUPager
      v-model="page"
      :is-loading="isLoading"
      :last-page="lastPage"
      :enabled="page > 1 && page < lastPage"
    />
  </div>
</template>

<script setup lang="ts">
const { items, total, page, lastPage, isLoading, selectedFilters, controls } = await useControls()
const { t } = useI18n()

const { $masonrySsrColumns } = useNuxtApp()

const pageTitle = computed(() => {
  return selectedFilters.value.map(({ key, value }) => {
    if (key === 'author')
      value = formatAuthor(value)

    return `${controls[key].label}: ${value}`
  }).join(', ')
})

useHead(() => ({
  title: pageTitle,
}))
</script>
