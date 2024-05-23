import { z } from 'zod'

import BaseModel from '@/models/_BaseModel'
import { formatAuthor } from '@/utils/formatters'

type TreeNode = { label: string; path: string }

export default class Item extends BaseModel {
  public static mapping = {}
  public static endpoint = 'api/v1/items'

  public declare id: string
  public declare content: z.infer<typeof Item.Content>

  loaded = false

  static Hsl = z.object({
    h: z.number(),
    s: z.number(),
    l: z.number(),
    amount: z.number(),
  })

  static Content = z.object({
    id: z.string(),
    identifier: z.string(),
    author: z.array(z.string()),
    authors: z.array(z.any()),
    tag: z.array(z.string()),
    date_earliest: z.number().nullable(),
    date_latest: z.number().nullable(),
    updated_at: z.string(),
    created_at: z.string(),
    has_image: z.boolean(),
    has_iip: z.boolean(),
    has_text: z.boolean(),
    is_free: z.boolean(),
    is_for_reproduction: z.boolean(),
    authority_id: z.array(z.string()),
    view_count: z.number(),
    work_type: z.array(z.string()),
    image_ratio: z.number(),
    title: z.string(),
    description: z.string(),
    topic: z.array(z.string()),
    measurement: z.array(z.string()),
    dating: z.string().nullable(),
    medium: z.array(z.string()),
    technique: z.array(z.string()),
    gallery: z.string(),

    place: z.array(z.string()),

    images: z.array(z.string()),
    hsl: z.array(Item.Hsl),
    authors_formatted: z.array(z.string()).optional(),
    exhibition: z.string().nullable().optional(),
    inscription: z.array(z.string()).nullable().optional(),
    acquisition_date: z.string().nullable().optional(),
  })

  constructor(data: Item) {
    // TODO: figure out why is this causing recursion and memory leak
    // console.log(data)
    // const parse = Item.Content.safeParse(data.content)
    //
    // if (!parse.success) {
    //   console.error(parse.error)
    // } else {
    //   data.content = parse.data
    // }

    super(data)
  }

  public get link() {
    return `/items/${this.id}`
  }

  public get image() {
    const config = useRuntimeConfig()

    return `${config.public.CDN_URL}/dielo/nahlad/${this.id}/800`
  }

  public get authorsFormatted() {
    return (this.content.author || this.content.authors)?.map((author) => formatAuthor(author))
  }

  public get tileSources() {
    return this.content.images.map(
      (image) => `https://img.webumenia.sk/zoom/?path=${encodeURIComponent(image)}.dzi`
    )
  }

  public get previewImages() {
    return this.content.images.map(
      (image) => `https://img.webumenia.sk/preview/?path=${image}&size=800`
    )
  }

  public get workTypeTrees(): TreeNode[][] {
    return this.content.work_type.map((tree: string) => {
      const parts: string[] = []
      return tree.split('/').map((label: string): TreeNode => {
        parts.push(label)
        return { label, path: parts.join('/') }
      })
    })
  }
}
