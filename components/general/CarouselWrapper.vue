<template>
  <div>
    <ModuleCarousel>
      <ModuleSlide v-for="(item, i) in items" :key="i">
        <component :is="item" />
      </ModuleSlide>
      <ModulePagination />
      <ModuleNavigation />
    </ModuleCarousel>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

const slots = useSlots()
const items = computed(() => (slots.default!() || []) as VNode[])

// onMounted(() => {
//   console.log(items.value)
// })
</script>

<style scoped lang="scss">

</style>

