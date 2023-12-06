<template>
  <div class="flex bg-white border-[1px] border-dark px-3 py-2">
    <input
        v-model="model"
        placeholder="Napíšte kľúčové slovo"
        class="w-full border-transparent !outline-none"
    />
    <Icon name="search" class="w-5" />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>({
  default: '',
})
</script>
