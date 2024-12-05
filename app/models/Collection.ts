import { z } from 'zod'

import type Item from '~/models/Item'

import BaseModel from '~/models/_BaseModel'

export default class Collection extends BaseModel {
  public declare id: string
  public declare name: string
  public declare text: string
  public declare header_image_src: string
  public declare header_image_srcset: string
  public declare item_filter: string | string[]

  items: Item[] = []

  static parser = z.object({
    id: z.number(),
    name: z.string(),
    text: z.string(),
    header_image_src: z.string(),
    header_image_srcset: z.string(),
    item_filter: z.record(z.union([z.string(), z.array(z.string())])).optional(),
  })

  constructor(data: z.infer<typeof Collection.parser>) {
    const parse = Collection.parser.safeParse(data)

    if (!parse.success) {
      console.error(parse.error)
    } else {
      data = parse.data
    }

    super(data)
  }

  public get link() {
    return `/collections/${this.id}`
  }
}
