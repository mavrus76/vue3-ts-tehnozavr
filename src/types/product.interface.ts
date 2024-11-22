import type { ICategory } from './category.interface'
import type { IColors } from './color.interface'
import type { IOffer } from './offer.interface'

export interface IProduct {
  id: number
  title: string
  slug: string
  price: number
  colors: IColors[]
  preview: {
    file: {
      url: string
      name: string
      originalName: string
      extension: string
      size: number
    }
  }
  mainProp: {
    id: number
    title: string
    code: string
  }
  offers: IOffer[]
  category: ICategory
  content: string
  pricePretty: number
}

export interface IProductsResponse {
  items: IProduct[]
  pagination: {
    page: number
    pages: number
    total: number
  }
}
