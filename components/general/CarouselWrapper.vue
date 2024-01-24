<template>
  <div>
    <ModuleCarousel :items-to-show="itemsToShow" snap-align="start">
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

withDefaults(
  defineProps<{
    itemsToShow?: number
  }>(),
  {
    itemsToShow: 1,
  }
)

const slots = useSlots()
const items = computed(() => (slots.default!()[0].children || []) as VNode[])
</script>

<style scoped lang="scss">

</style>

