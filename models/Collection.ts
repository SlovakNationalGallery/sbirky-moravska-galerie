import type Item from '~/models/Item'

import BaseModel from '@/models/_BaseModel'

export default class Collection extends BaseModel {
  public declare id: string
  public declare name: string
  public declare text: string
  public declare header_image_src: string
  public declare header_image_srcset: string
  public declare item_filter: string | string[]

  items: Item[] = []

  public get link() {
    return `/collections/${this.id}`
  }
}
