<template>
  <div class="flex flex-col items-center">
    <Header />
    <div class="px-4 pt-3 pb-6 md:px-16 md:pt-6 md:pb-12 max-w-[1320px] w-full">
      <TransitionExpand>
        <Filter
          v-show="isFrontpage && isReady"
          class="w-full"
          :class="{
            'opacity-0': !isReady,
          }"
        />
      </TransitionExpand>

      <slot />
    </div>
    <div class="text-center my-6">
      Vyrobil a spravuje <NuxtLink class="underline" to="https://lab.sng.sk/">lab.SNG</NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Filter from '~/components/general/Filter.vue'

const route = useRoute()
const isFrontpage = computed(() => route.name === 'index')
const isReady = ref(false)

onMounted(() => {
  isReady.value = true
})
</script>
