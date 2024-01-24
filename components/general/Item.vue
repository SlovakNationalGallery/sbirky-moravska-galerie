<template>
  <NuxtLink
    :to="item.link"
    :class="`transition-opacity duration-1000 opacity-${isVisible ? 100 : 0}`"
  >
    <Image ref="imageRef" :url="item.image" />
    <div class="flex mt-4 mb-10">
      <div class="flex-grow flex flex-col items-start">
        <div class="font-serif text-lg">{{ item.content.authors_formatted?.join(', ') }}</div>
        <div class="font-bold text-xl">{{ item.content.title }}</div>
        <div class="font-serif">{{ item.content.dating }}</div>
      </div>
      <Icon name="magnifying" class="w-6 h-6" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type Item from '~/models/Item'

import Image from '~/components/general/Image.vue'
import Icon from '~/components/general/Icon.vue'

defineProps<{
  item: Item
}>()

const imageRef = ref<InstanceType<typeof Image> | null>(null)

const isVisible = ref(false)
watch(
  () => imageRef.value?.isLoaded,
  (value) => {
    isVisible.value = value
  }
)
</script>

<style scoped lang="scss">

</style>
