<template>
  <div v-if="item">
    <div class="gap-3 flex flex-col leading-tight">
      <h1 class="text-5xl mt-4">{{ item.content.title }}</h1>
      <div class="flex flex-wrap gap-3">
        <NuxtLink
          v-for="(author, i) in item.authorsFormatted"
          :key="`author${i}`"
          :to="`/?author=${item.content.author[i]}`"
          class="underline"
        >
          <h2 class="font-serif text-lg">{{ author }}</h2>
        </NuxtLink>
      </div>
    </div>

    <div class="block md:grid md:grid-cols-2 gap-6 mt-6">
      <div @click="isZoomOpened = true">
        <CarouselWrapper v-if="item.content.images?.length">
          <Image
            v-for="src in item.content.images"
            :key="src"
            :url="`https://img.webumenia.sk/preview/?path=${src}&size=800`"
          />
        </CarouselWrapper>
        <Image v-else :url="item.image" />
      </div>
      <ClientOnly>
        <TransitionSlide mode="out-in">
          <ZoomModal
            :is-open="isZoomOpened"
            :tile-sources="item.tileSources"
            :thumbnails="item.thumbnails"
            @close="isZoomOpened = false"
          />
        </TransitionSlide>
      </ClientOnly>
      <div class="mt-10 lg:mt-0">
        <div class="flex flex-col gap-1">
          <div
            v-if="item.content.dating"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">datace</div>
            <div>{{ item.content.dating }}</div>
          </div>
          <div
            v-if="item.content.measurement?.length"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">rozměry</div>
            <div>
              <div v-for="(measurement, i) in item.content.measurement" :key="`measurement${i}`">
                {{ measurement }}
              </div>
            </div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3 shrink-0">výtvarný druh</div>
            <div>
              <NuxtLink
                v-for="link in item.content.work_type"
                :key="link"
                :to="`/?work_type=${link}`"
                class="underline"
              >
                {{ link }}
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="item.content.topic?.length"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">námět</div>
            <div>
              <NuxtLink
                v-for="link in item.content.topic"
                :key="link"
                :to="`/?topic=${link}`"
                class="underline"
              >
                {{ link }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3 shrink-0">materiál</div>
            <div>
              <NuxtLink
                v-for="link in item.content.medium"
                :key="link"
                :to="`/?medium=${link}`"
                class="underline"
              >
                {{ link }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3 shrink-0">technika</div>
            <div>
              <NuxtLink
                v-for="link in item.content.technique"
                :key="link"
                :to="`/?technique=${link}`"
                class="underline"
              >
                {{ link }}
              </NuxtLink>
            </div>
          </div>
          <div
            v-if="item.content.inscription"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">značení</div>
            <div>{{ item.content.inscription }}</div>
          </div>
          <div
            v-if="item.content.acquisition_date"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3">datum akvizice</div>
            <div>{{ item.content.acquisition_date }}</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3 shrink-0">inventární číslo</div>
            <div>{{ item.content.identifier }}</div>
          </div>
          <div
            v-if="item.content.tag?.length"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">tagy</div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="tag in item.content.tag"
                :key="tag"
                class="bg-primary text-white px-1 py-0.5 text-sm"
              >
                {{ tag }}
              </div>
            </div>
          </div>
          <div
            v-if="item.content.exhibition"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">kolekce / výstava</div>
            <div>
              <NuxtLink :to="`/?exhibition=${item.content.exhibition}`" class="underline">
                {{ item.content.exhibition }}
              </NuxtLink>
            </div>
          </div>
          <div class="whitespace-pre-line px-2 py-1" v-html="item.content.description"></div>
        </div>
      </div>
    </div>
    <div class="mt-10 text-2xl">
      <h3>Související díla</h3>
      <div class="flex mt-6">
        <CarouselWrapper class="w-full" :items-to-show="itemsToShow">
          <div v-for="similar in similars" :key="similar.id" class="md:px-3">
            <ItemCard :item="similar" />
          </div>
        </CarouselWrapper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { TransitionSlide } from '@morev/vue-transitions'

import Item from '~/models/Item'
import ItemCard from '~/components/general/Item.vue'
import ZoomViever from '~/components/general/ZoomViever.vue'
import CarouselWrapper from '~/components/general/CarouselWrapper.vue'
import Image from '~/components/general/Image.vue'
import ZoomModal from '~/pages/items/ZoomModal.vue'

const route = useRoute()
const id = route.params.id as string
const nuxtConfig = useRuntimeConfig()
const { width } = useWindowSize()
const isZoomOpened = ref<boolean>(false)

const [itemData, similarData] = await Promise.all([
  useFetch<any>(`${Item.endpoint}/${id}`, {
    baseURL: nuxtConfig.public.APP_URL,
  }),
  useFetch<{
    data: any[]
  }>(`${Item.endpoint}/${id}/similar`, {
    baseURL: nuxtConfig.public.APP_URL,
    params: {
      size: 9,
    },
  }),
])

const item = computed(() => new Item(itemData.data.value))

const similars = computed(() => similarData.data.value?.data.map((item) => new Item(item)) ?? [])

const itemsToShow = computed(() => (width.value < 768 ? 1 : width.value < 1024 ? 2 : 3))
</script>
