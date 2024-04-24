import { CollectionsSymbol } from '~/plugins/collections'

export const useCollections = () => {
  return inject(CollectionsSymbol)!
}
