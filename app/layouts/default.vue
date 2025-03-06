<template>
  <Header class="px-4 md:px-16" />
  <div class="px-4 md:px-16 flex flex-col items-center">
    <div class="max-w-[1320px] w-full border-b pb-8">
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

const { t } = useI18n()
</script>
