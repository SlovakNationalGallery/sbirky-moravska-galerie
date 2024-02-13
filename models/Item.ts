import BaseModel from '@/models/_BaseModel'

// TODO: fix with BE incosistencies
interface IItemContent {
  id: string
  identifier: string
  author: string[]
  authors: string[]
  tag: string[]
  date_earliest: number
  date_latest: number
  updated_at: string
  created_at: string
  has_image: boolean
  has_iip: boolean
  has_text: boolean
  is_free: boolean
  is_for_reproduction: boolean
  authority_id: string[]
  view_count: number
  work_type: string[]
  object_type: any[]
  image_ratio: null // TODO: get right type
  title: string
  description: string
  topic: string[]
  place: any[]
  measurement: string[]
  dating: string
  medium: string[]
  technique: string[]
  gallery: string
  credit: null // TODO: get right type
  contributor: null // TODO: get right type
  related_work: null // TODO: get right type
  additionals: null // TODO: get right type
  images: string[]
  hsl: Hsl[]
  authors_formatted?: string[]
  exhibition?: string

  inscription: string[]
  acquisition_date: string
}

export interface Hsl {
  h: number
  s: number
  l: number
  amount: number
}
export default class Item extends BaseModel {
  public static mapping = {}
  public static endpoint = 'api/v1/items'

  public declare id: string
  public declare content: IItemContent

  loaded = false

  public get link() {
    return `/items/${this.id}`
  }

  public get image() {
    const config = useRuntimeConfig()

    return `${config.public.CDN_URL}/dielo/nahlad/${this.id}/800`
  }

  public get authorsFormatted() {
    return (this.content.author || this.content.authors)?.map((author) =>
      author.replace(/^([^,]*),\s*(.*)$/, '$2 $1')
    )
  }

  public get previewImages() {
    return this.content.images.map(
      (image) => `https://img.webumenia.sk/preview/?path=${image}&size=800`
    )
  }
}
