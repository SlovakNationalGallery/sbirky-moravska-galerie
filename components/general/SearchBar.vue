<template>
  <div class="relative">
    <Search
      ref="searchRef"
      v-model="q"
      prepend-icon
      :default="$route.query['q'] || ''"
      @focus="isOpen = true"
      @blur="isOpen = false"
      @keydown.enter="submit"
    />
    <transition-fade>
      <div v-if="isOpen && items.length" class="bg-white absolute top-100% w-full p-4 z-30">
        <div>Díla</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" @click="isOpen = false">
          <NuxtLink v-for="item in items" :key="item.id" :to="item.link" class="flex mt-4">
            <Image :url="item.image" class="!w-[56px] h-[56px] object-cover mr-4" />
            <div>
              <div class="font-serif">{{ item.content.author.join(', ') }}</div>
              <div>{{ item.content.title }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup lang="ts">
import Search from '~/components/controls/parts/Search.vue'
import Item from '~/models/Item'
import Image from '~/components/general/Image.vue'
import { useBaseFetch } from '~/composables/fetch'
import { useControls } from '~/composables/controls'

const route = useRoute()
const q = ref(route.query['q'] as string | undefined)
const isOpen = ref(false)

const { data } = await useBaseFetch<{
  data: any[]
}>('api/v1/items/suggestions', {
  params: {
    q,
    size: 9,
  },
  watch: [q],
})

const searchRef = ref<InstanceType<typeof Search>>()

const { filters, routeParams } = await useControls()

watch(routeParams, () => {
  q.value = routeParams['q'] as string | undefined
  if (q.value) {
    filters['q'] = routeParams['q']
  } else {
    delete filters['q']
  }
})

if (q.value) {
  routeParams['q'] = q.value
}

const submit = () => {
  if (q.value) {
    routeParams['q'] = q.value
  } else {
    delete routeParams['q']
  }

  searchRef.value?.blur()
}

const items = computed(() => data.value?.data.map((item) => new Item(item)) ?? [])
</script>
