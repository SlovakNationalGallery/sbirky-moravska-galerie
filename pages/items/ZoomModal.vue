<template>
  <ClientOnly>
    <TransitionSlide mode="out-in">
      <div
        v-if="isOpened"
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md"
      >
        <div
          class="left-3 top-3 absolute z-50 bg-white/70 flex items-center justify-center px-2 py-2 border border-black/30 cursor-pointer transition-opacity duration-300"
          :class="{ 'opacity-0': idle }"
          @click="onToggle(false)"
        >
          <Icon name="back" class="w-4 mr-1" /> <span class="text-sm">BACK</span>
        </div>

        <div
          class="absolute bottom-3 left-1/2 -translate-x-1/2 z-50 bg-white/70 flex items-center justify-center px-3 py-2 border border-black/30 transition-opacity duration-300"
          :class="{ 'opacity-0': idle }"
        >
          <span class="text-md">{{ activeIndex + 1 }} / {{ images.length }}</span>
        </div>

        <div
          class="select-none fixed inset-0 w-[128px] left-auto z-50 bg-white/50 p-2 transition-all duration-300 ease-out"
          :class="{ 'translate-x-[100%]': idle }"
        >
          <div
            class="absolute right-[calc(100%+0.75em)] top-3 flex gap-2 transition-opacity duration-300"
            :class="{ 'opacity-0': idle }"
          >
            <div
              class="aspect-square bg-white/70 flex items-center justify-center p-2 border border-black/30 cursor-pointer transition-opacity duration-300"
              @click="onZoom(1)"
            >
              <span>+</span>
            </div>
            <div
              class="aspect-square bg-white/70 flex items-center justify-center p-2 border border-black/30 cursor-pointer transition-opacity duration-300"
              @click="onZoom(-1)"
            >
              <span>-</span>
            </div>
            <div
              class="aspect-square bg-white/70 flex items-center justify-center p-2 border border-black/30 cursor-pointer transition-opacity duration-300"
              @click="onPrev"
            >
              <Icon name="back" class="w-4 rotate-90" />
            </div>

            <div
              class="aspect-square bg-white/70 flex items-center justify-center p-2 border border-black/30 cursor-pointer transition-opacity duration-300"
              @click="onNext"
            >
              <Icon name="back" class="w-4 -rotate-90" />
            </div>
          </div>
          <div class="grid columns-1 gap-2">
            <Image
              v-for="(thumbnail, index) in thumbs"
              :key="index"
              class="cursor-pointer relative z-30 pointer-events-auto"
              :class="{ 'opacity-70': index !== activeIndex }"
              alt="thumbnail"
              :url="thumbnail"
              @click="onClick(index)"
            />
          </div>
        </div>

        <TransitionSlide mode="out-in" appear>
          <ZoomViever v-if="isVisible" ref="viewer" :tile-source="activeItem" />
        </TransitionSlide>
      </div>
    </TransitionSlide>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useIdle, watchDebounced } from '@vueuse/core'
import { TransitionSlide } from '@morev/vue-transitions'

import ZoomViever from '~/components/general/ZoomViever.vue'
import Icon from '~/components/general/Icon.vue'
import Image from '~/components/general/Image.vue'
import { useZoom } from '~/composables/zoom'

const { isOpened, index: activeIndex, images, thumbs, onToggle } = useZoom()
const viewer = ref<InstanceType<typeof ZoomViever> | null>(null)
const { idle } = useIdle(3 * 1000)
const isVisible = ref(true)

const activeItem = computed(() => images.value[activeIndex.value])

watch(activeIndex, () => {
  isVisible.value = false
})

watchDebounced(
  activeIndex,
  () => {
    isVisible.value = true
  },
  { debounce: 300 }
)

const onClick = (index: number) => {
  activeIndex.value = index
}

const onNext = () => {
  activeIndex.value = (activeIndex.value + 1) % images.value.length
}

const onPrev = () => {
  activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length
}

const onZoom = (direction: 1 | -1) => {
  if (viewer.value) {
    viewer.value.zoomBy(direction)
  }
}
</script>
