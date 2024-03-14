<template>
  <div id="viewer" class="absolute inset-0 rounded-xl overflow-hidden"></div>
</template>

<script setup lang="ts">
import OpenSeaDragon from 'openseadragon'

const props = defineProps<{
  tileSource: string
}>()

const viewer = ref<OpenSeadragon.Viewer | null>(null)
//TODO: navigation for multiple images

onMounted(() => {
  viewer.value = OpenSeaDragon({
    id: 'viewer',
    tileSources: props.tileSource,
    showNavigationControl: false,
    showNavigator: false,
  })
})

onBeforeUnmount(() => {
  if (viewer.value) {
    viewer.value.destroy()
  }
})
</script>
