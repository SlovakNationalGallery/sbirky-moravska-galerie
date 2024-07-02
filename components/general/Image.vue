<template>
  <img
    ref="target"
    class="image block transition-opacity ease-in-out"
    :alt="alt"
    :title="title"
    :src="isLoaded || disableLazy ? url : ''"
    :class="{ 'opacity-0': !isLoaded && !disableLazy }"
    :style="imageStyle"
  />
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  url: string
  alt?: string
  title?: string
  disableLazy?: boolean
  aspectRatio?: number
}>()

const target = ref(null)
const isLoaded = ref(false)

const imageStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
}))

const { stop, pause, resume } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isLoaded.value || !isIntersecting || props.disableLazy) {
    return
  }

  const img = document.createElement('img')

  img.src = props.url
  img.onload = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 333))
    isLoaded.value = true
  }
})

onUnmounted(() => {
  stop()
})

defineExpose({
  pause,
  resume,
  stop,
  isLoaded,
})
</script>
