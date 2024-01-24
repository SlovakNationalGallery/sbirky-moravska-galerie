<template>
  <img
    ref="target"
    class="image block w-full"
    :alt="alt"
    :title="title"
    :src="isLoaded || disableLazy ? url : ''"
    :class="{ 'opacity-0': !isLoaded && !disableLazy }"
  />
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps<{
  url: string
  alt?: string
  title?: string
  width?: number
  height?: number
  disableLazy?: boolean
}>()

const target = ref(null)
const isLoaded = ref(false)

const { stop, pause, resume } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isLoaded.value || !isIntersecting || props.disableLazy) {
    return
  }

  const img = document.createElement('img')

  img.src = props.url
  img.onload = () => {
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

<style scoped>
.image {
  transition: opacity 0.5s ease-in-out;
  pointer-events: none;
}
</style>
