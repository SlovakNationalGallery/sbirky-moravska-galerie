<template>
  <div class="flex flex-col items-center">
    <div class="max-w-[740px]">
      <h2 class="text-3xl md:text-5xl md:text-center mt-10 mb-6">
        {{ t('collection.title') }}
      </h2>
    </div>

    <div class="w-full my-4 flex">
      <div class="flex-grow">
        <span class="font-bold">{{ total }}</span> {{ t('collection.resultsCount', total) }}
      </div>
    </div>

    <div v-if="collections.length" class="w-full">
      <masonry-wall
        :items="collections"
        :ssr-columns="3"
        :column-width="300"
        :gap="24"
        :key-mapper="(collection: Collection) => collection.id"
      >
        <template #default="{ item }">
          <Collection :key="`collection-${item.id}`" :collection="item" />
        </template>
      </masonry-wall>
    </div>

    <Pager v-model="page" :is-loading="isLoading" :last-page="lastPage" />
  </div>
</template>

<script setup lang="ts">
import { useCollections } from '~/composables/collections'
import Collection from '~/components/general/Collection.vue'
import Pager from '~/components/general/Pager.vue'

const { collections, total, page, lastPage, isLoading, refresh, reset } = useCollections()
const { t } = useI18n()

useHead(() => ({
  title: t('collection.title'),
}))

onMounted(async () => {
  refresh()
})

onUnmounted(() => {
  reset()
})
</script>
