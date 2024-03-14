<template>
  <div class="flex flex-col items-center">
    <TransitionExpand>
      <Image v-if="isReady" url="/info.png" class="aspect-[9/4] mt-8 object-cover" />
    </TransitionExpand>

    <div class="max-w-[740px]">
      <h2 class="text-3xl md:text-5xl md:text-center mt-10 mb-6">
        Prohlédněte si uměleckou sbírku děl naší galerie
      </h2>

      <div class="md:text-xl md:text-center">
        Moravská galerie v Brně je výjimečná šíří svého záběru. Jako jediné muzeum umění v České
        republice se zabývá výtvarnou kulturou zcela komplexně. Pracuje jak s volným uměním, tedy
        malbou, kresbou, grafikou a plastikou od nejstaršího období po současnost, tak s fotografií,
        užitým uměním, grafickým designem a architekturou. Moravská galerie v Brně je druhým
        největším muzeem umění v České republice.
      </div>

      <hr class="border-dark max-w-[200px] md:mx-auto my-6" />

      <div class="flex flex-col gap-4">
        <h3 class="text-2xl md:text-3xl">Co je on-line katalog sbírek?</h3>
        <p>
          Jedná se o kompletní on-line zveřejnění sbírek Moravské galerie v Brně. Webová stránka
          umožňuje uživateli vyhledávat sbírkové předměty dle autora, techniky, výtvarného žánru,
          materiálu, námětu a také místa vzniku. Přehledný on-line katalog bude postupně doplňován o
          další fotografie, zpřesňující informace a články, rovněž nové sbírkové předměty, které
          Moravská galerie průběžně získává pro své sbírky.
        </p>
        <h3 class="text-2xl md:text-3xl">
          Jaká jsou pravidla užívání obrazových materiálů z on-line katalogu sbírek?
        </h3>
        <p>
          Jedná se o kompletní on-line zveřejnění sbírek Moravské galerie v Brně. Webová stránka
          umožňuje uživateli vyhledávat sbírkové předměty dle autora, techniky, výtvarného žánru,
          materiálu, námětu a také místa vzniku. Přehledný on-line katalog bude postupně doplňován o
          další fotografie, zpřesňující informace a články, rovněž nové sbírkové předměty, které
          Moravská galerie průběžně získává pro své sbírky.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Image from '~/components/general/Image.vue'

const isReady = ref(false)

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 333))
  isReady.value = true
})
</script>
