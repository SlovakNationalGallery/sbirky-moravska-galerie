<template>
  <div :class="!loaded ? `animate-pulse` : ''">
    <div class="bg-gray-400 aspect-square" :style="{ aspectRatio: ratio }">
      <slot
        class="transition-opacity duration-500"
        :class="{ 'opacity-0': !loaded, 'opacity-100': loaded }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  loaded: boolean
  ratio: number | string
}>()
</script>
