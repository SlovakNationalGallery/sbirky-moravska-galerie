<template>
  <div v-if="item">
    <div class="gap-3 flex flex-col leading-tight">
      <h1 class="text-3xl md:text-5xl mt-4">{{ item.content.title }}</h1>
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

    <div
      class="block md:grid md:grid-cols-2 gap-6 mt-6"
      :class="{ 'cursor-pointer': item.content.has_iip }"
    >
      <div class="relative">
        <CarouselWrapper v-if="item.content.images?.length > 1">
          <Skeleton v-for="(src, i) in item.content.images" :key="src">
            <Image
              :url="item.previewImages[i]"
              :aspect-ratio="item.content.image_ratio"
              class="w-full max-h-[90vh] object-contain"
              @click.prevent="onOpenZoom(item, i)"
            />
          </Skeleton>
        </CarouselWrapper>
        <Skeleton v-else>
          <Image
            class="w-full max-h-[90vh] object-contain"
            :url="item.image"
            :aspect-ratio="item.content.image_ratio"
            @click="onOpenZoom(item)"
          />
        </Skeleton>
      </div>

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
          <div
            v-if="item.workTypeTrees.length"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">výtvarný druh</div>
            <div>
              <template v-for="(tree, i) in item.workTypeTrees" :key="i">
                <template v-for="(node, j) in tree" :key="j">
                  <NuxtLink :to="`/?work_type=${node.path}`" class="underline">
                    {{ node.label }}
                  </NuxtLink>
                  <span v-if="j < tree.length - 1" class="px-1">›</span>
                </template>
                <br />
              </template>
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
          <div
            v-if="item.content.related_work && item.content.relationship_type"
            class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1"
          >
            <div class="font-bold w-1/3 shrink-0">{{ item.content.relationship_type }}</div>
            <div>
              <NuxtLink :to="`/?related_work=${item.content.related_work}`" class="underline">
                {{ item.content.related_work }}
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
          <div v-for="similar in similars" :key="similar.id" class="md:px-3 w-full">
            <ItemCard :item="similar" />
          </div>
        </CarouselWrapper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import Item from '~/models/Item'
import ItemCard from '~/components/general/Item.vue'
import CarouselWrapper from '~/components/general/CarouselWrapper.vue'
import Image from '~/components/general/Image.vue'
import { useBaseFetch } from '~/composables/fetch'
import Skeleton from '~/components/general/Skeleton.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const { width } = useWindowSize()

const [itemData, similarData] = await Promise.all([
  useBaseFetch<any>(`${Item.endpoint}/${id}`),
  useBaseFetch<{
    data: any[]
  }>(`${Item.endpoint}/${id}/similar`, {
    params: {
      size: 9,
    },
  }),
])

const item = computed(() => new Item(itemData.data.value))

const similars = computed(() => similarData.data.value?.data.map((item) => new Item(item)) ?? [])

const itemsToShow = computed(() => (width.value < 768 ? 1 : width.value < 1024 ? 2 : 3))

useSeoMeta({
  title: item.value.pageTitle,
  description: item.value.pageDescription,
  ogTitle: item.value.pageTitle,
  ogDescription: item.value.pageDescription,
  ogImage: item.value.image,
})

useBaseFetch(`/api/v1/items/${id}/views`, {
  method: 'POST',
})

const onOpenZoom = (item: Item, index?: number) => {
  if (item.content.has_iip) {
    router.push(`${item.link}/zoom${index ? `#${index}` : ''}`)
  }
}
</script>
