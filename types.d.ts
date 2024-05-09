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
