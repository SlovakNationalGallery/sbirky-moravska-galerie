<template>
  <NuxtLink
    :to="item.link"
    class="group"
    :class="`transition-opacity  opacity-${isVisible ? 100 : 0}`"
  >
    <Image
      ref="imageRef"
      :url="item.image"
      :disable-lazy="item.loaded"
      :style="imageStyle"
      class="max-h-[90vh] w-auto"
    />
    <div class="flex mt-4">
      <div class="flex-grow flex flex-col items-start">
        <div class="font-serif text-lg">{{ item.content.authors_formatted?.join(', ') }}</div>
        <div class="group-hover:underline font-bold text-xl text-left">
          {{ item.content.title }}
        </div>
        <div class="font-serif">{{ item.content.dating }}</div>
      </div>
      <Icon name="magnifying" class="w-6 h-6 shrink-0" />
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
