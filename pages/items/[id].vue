<template>
  <div v-if="item">
    <div class="gap-3 flex flex-col leading-tight">
      <h1 class="text-5xl mt-4">{{ item.content.title }}</h1>
      <NuxtLink :to="`/?author=${item.content.author}`" class="underline">
        <h2 class="font-serif text-lg">{{ item.content.author.join(', ') }}</h2>
      </NuxtLink>
    </div>

    <div class="block md:grid md:grid-cols-2 gap-6 mt-6">
      <div>
        <CarouselWrapper>
          <Image
            v-for="src in item.content.images"
            :key="src"
            :url="`https://img.webumenia.sk/preview/?path=${src}&size=800`"
          />
        </CarouselWrapper>
      </div>

      <div>
        <div class="flex flex-col gap-1">
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">datace</div>
            <div>{{ item.content.dating }}</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">rozměry</div>
            <div>{{ item.content.measurement.join(', ') }}</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">výtvarný druh</div>
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
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">námět</div>
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
            <div class="font-bold w-1/3">materiál</div>
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
            <div class="font-bold w-1/3">technika</div>
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
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">značení</div>
            <div>{{ item.content.tag.join(', ') }}❓</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">datum akvizice</div>
            <div>{{ item.content.dating }}❓</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">inventární číslo</div>
            <div>{{ item.content.identifier }}</div>
          </div>
          <div class="flex gap-1 hover:bg-white hover:bg-opacity-40 px-2 py-1">
            <div class="font-bold w-1/3">tagy</div>
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
            <div class="font-bold w-1/3">kolekce / výstava</div>
            <div>{{ item.content.exhibition }}</div>
          </div>
          <div class="whitespace-pre-line" v-html="item.content.description"></div>
        </div>
      </div>
      <div class="mt-10 text-2xl">
        <h3>Související díla</h3>
        <div class="flex mt-6">
          <ItemCard class="max-w-[300px]" :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Item from '~/models/Item'
import ItemCard from '~/components/general/Item.vue'
import CarouselWrapper from '~/components/general/CarouselWrapper.vue'
import Image from '~/components/general/Image.vue'

const route = useRoute()
const id = route.params.id as string
const nuxtConfig = useRuntimeConfig()

const { data } = await useFetch<any>(`${Item.endpoint}/${id}`, {
  baseURL: nuxtConfig.public.APP_URL,
})

const item = computed(() => new Item(data.value))

// console.log(item.value)
</script>

<style scoped lang="scss">

</style>
