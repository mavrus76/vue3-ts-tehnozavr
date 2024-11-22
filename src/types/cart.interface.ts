import type { IColor } from './color.interface'
import type { IUser } from './user.interface'

export interface ICart {
  id: number
  items: ICartItem[]
  user: IUser
}

export interface ICartItem {
  id: number
  price: number
  quantity: number
  color: IColor
  productOffer: {
    id: number
    title: string
    price: number
    propValues: {
      value: string
      productsCount: number
    }[]
    product: {
      id: number
      title: string
      slug: string
      price: number
      colors: {
        id: number
        color: {
          id: number
          title: string
          code: string
        }
      }[]
      preview: {
        file: {
          url: string
          name: string
          originalName: string
          extension: string
          size: string
        }
      }
      mainProp: {
        id: number
        title: string
        code: string
      }
    }
  }
}

export interface ICartProducts extends ICartItem {
  productId: number
  productOfferId: number
  colorId: number
  amount: number
}
