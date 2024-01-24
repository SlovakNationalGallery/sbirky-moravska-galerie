import MasonryWall from '@yeger/vue-masonry-wall'
import vClickOutside from 'click-outside-vue3'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MasonryWall)
  nuxtApp.vueApp.use(vClickOutside)
})
