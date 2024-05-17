import type Item from '~/models/Item'

const index = ref(0)
const images = ref<string[]>([])
const thumbs = ref<string[]>([])
const isOpened = ref(false)

export const useZoom = () => {
  const onToggle = (state?: boolean) => {
    if (state !== undefined) {
      isOpened.value = state
      return
    }

    isOpened.value = !isOpened.value
  }

  const onOpen = (item: Item, i?: number) => {
    index.value = i ?? 0
    images.value = item.tileSources
    thumbs.value = item.previewImages
    isOpened.value = true
  }

  return {
    index,
    images,
    thumbs,
    onOpen,
    isOpened,
    onToggle,
  }
}
