<template>
  <div class="flex flex-col items-center">
    <Header />
    <div class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12 max-w-[1320px] w-full">
      <slot />
    </div>
    <div class="text-center my-6">
      {{ t('site.credits') }}
      <NuxtLink class="underline" to="https://lab.sng.sk/">lab.SNG</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '~/components/layout/Header.vue'

const isReady = ref(false)
const { t } = useI18n()

onMounted(() => {
  isReady.value = true
})
</script>
