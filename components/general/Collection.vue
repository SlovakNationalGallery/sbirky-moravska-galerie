<template>
  <NuxtLink
    to="/collections/mock"
    :class="`transition-opacity relative opacity-${isVisible ? 100 : 0}`"
  >
    <div class="absolute right-5 top-5 bg-black/50 px-2 py-1 text-sm text-white rounded-3xl">
      95 děl
    </div>
    <Image ref="imageRef" :url="item.image" :disable-lazy="item.loaded" :style="imageStyle" />
    <div class="flex mt-4 mb-10">
      <div class="flex-grow flex flex-col items-start">
        <div class="font-bold text-xl text-left">{{ item.content.title }}</div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type Item from '~/models/Item'

import Image from '~/components/general/Image.vue'
import Icon from '~/components/general/Icon.vue'

const props = defineProps<{
  item: Item
}>()

const imageRef = ref<InstanceType<typeof Image> | null>(null)
const imageStyle = computed(() => ({
  aspectRatio: props.item.content.image_ratio || 700 / 800,
}))

const isVisible = ref(props.item.loaded ?? false)
watch(
  () => imageRef.value?.isLoaded,
  (value) => {
    if (value) {
      isVisible.value = value
      props.item.update({ loaded: true })
    }
  }
)
</script>
