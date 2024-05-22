<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register'

useHead({
  meta: [
    {
      charset: 'utf-8',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: '/og-image.png',
    },
  ],
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
  transform: translateX(0);
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

body {
  @apply bg-[#D9D9D9];
}
</style>
