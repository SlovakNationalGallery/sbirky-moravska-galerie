<template>
  <div
    :class="!isLoaded ? `animate-pulse bg-gray-400` : 'opacity-0 '"
    class="absolute w-full h-full transition-opacity duration-1000 pointer-events-none"
  />
  <slot :class="{ 'opacity-0': !isLoaded, 'opacity-100': isLoaded }" />
</template>

<script setup lang="ts">
const slots = useSlots()
const isLoaded = ref(false)

onMounted(() => {
  const url = slots.default?.()[0].props?.url

  if (url) {
    const img = new Image()
    img.src = url
    img.onload = () => {
      isLoaded.value = true
    }
  } else {
    isLoaded.value = true
  }
})
</script>
