<template>
  <div>
    <Header class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12" />
    <div class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12">
      <slot />
    </div>
    <div class="text-center my-6">
      Vyrobil a spravuje <NuxtLink class="underline" to="https://lab.sng.sk/">lab.SNG</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
</script>
