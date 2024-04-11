<template>
  <div id="viewer" class="absolute inset-0 rounded-xl overflow-hidden"></div>
</template>

<script setup lang="ts">
import OpenSeaDragon from 'openseadragon'

const props = defineProps<{
  tileSource: string
}>()

const zoomPerClick = 2
const viewer = ref<OpenSeadragon.Viewer | null>(null)

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

defineExpose({
  zoomBy: (dir: 1 | -1) => {
    if (viewer.value) {
      if (dir === 1) {
        viewer.value.viewport.zoomBy(zoomPerClick)
      } else {
        viewer.value.viewport.zoomBy(1 / zoomPerClick)
      }

      viewer.value.viewport.applyConstraints()
    }
  },
})
</script>
