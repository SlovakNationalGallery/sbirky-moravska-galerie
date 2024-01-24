<template>
  <div class="relative">
    <Search v-model="q" prepend-icon @focus="isOpen = true" @blur="isOpen = false" />
    <transition-fade>
      <div v-if="isOpen" class="bg-white absolute top-100% w-full p-4">
        <div>Diela</div>
        <div class="flex mt-4">
          <img
            src="https://img.webumenia.sk/preview/?path=/MGHQ/A-MU2/A001188.jp2&size=800"
            alt=""
            class="w-[56px] h-[56px] object-cover mr-4"
          />
          <div>
            <div class="font-serif">Ján Kotlík</div>
            <div>Jezdec na koni</div>
          </div>
        </div>

        <div class="flex mt-4">
          <img
            src="https://img.webumenia.sk/preview/?path=/MGHQ/A-MU2/A001188.jp2&size=800"
            alt=""
            class="w-[56px] h-[56px] object-cover mr-4"
          />
          <div>
            <div class="font-serif">Ján Kotlík</div>
            <div>Jezdec na koni</div>
          </div>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import Search from '~/components/controls/parts/Search.vue'

const q = ref('')
const isOpen = ref(false)

const nuxtConfig = useRuntimeConfig()
// const { data: item } = await useFetch('api/suggestions', {
//   baseURL: nuxtConfig.public.APP_URL,
//   params: {
//     search: q,
//   },
//   watch: [q],
// })
</script>

<style scoped lang="scss">

</style>
