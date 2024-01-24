declare module 'levenshtein-array' {
  function levenshtein(
    array: string[],
    string: string
  ): {
    l: number
    w: string
  }[]
  export default levenshtein
}

declare module 'click-outside-vue3' {
  import { Plugin } from 'vue'
  const plugin: Plugin
  export default plugin
}
