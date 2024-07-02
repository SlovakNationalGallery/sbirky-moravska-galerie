<template>
  <NuxtLink :to="item.link" class="relative flex">
    <Skeleton>
      <Image
        ref="imageRef"
        :url="item.image"
        :disable-lazy="item.loaded"
        :aspect-ratio="item.content.image_ratio || 700 / 800"
        class="w-full max-h-[90vh] object-contain"
      />
    </Skeleton>
  </NuxtLink>
  <NuxtLink :to="item.link">
    <div class="flex mt-4">
      <div class="flex-grow flex flex-col items-start">
        <div class="font-serif text-lg">{{ item.content.authors_formatted?.join(', ') }}</div>
        <div class="group-hover:underline font-bold text-xl text-left">
          {{ item.content.title }}
        </div>
        <div class="font-serif">{{ item.content.dating }}</div>
      </div>
      <Icon
        v-if="item.content.has_iip"
        name="magnifying"
        class="w-6 h-6 shrink-0"
        @click.prevent="onOpenZoom"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type Item from '~/models/Item'

import Image from '~/components/general/Image.vue'
import Icon from '~/components/general/Icon.vue'
import Skeleton from '~/components/general/Skeleton.vue'

const props = defineProps<{
  item: Item
}>()

const router = useRouter()
const imageRef = ref<InstanceType<typeof Image> | null>(null)

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

const onOpenZoom = () => {
  router.push(`${props.item.link}/zoom`)
}
</script>
