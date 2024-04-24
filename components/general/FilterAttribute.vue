<template>
  <div class="bg-primary text-white flex items-center py-1 px-3 gap-2 rounded-3xl text-xs">
    <span class="font-bold">{{ attribute }}:</span>
    <template v-if="Array.isArray(value)">
      {{ value.join(', ') }}
    </template>
    <template v-else>
      {{ value }}
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  attribute: string
  value: string | string[]
}>()
</script>
