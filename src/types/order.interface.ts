import type { ICart } from './cart.interface'

export interface IOrderInfo {
  id: number
  name: string
  address: string
  phone: string
  email: string
  deliveryTypeId: number
  paymentTypeId: number
  comment: string
  basket: ICart
  totalPrice: number
}

export interface IOrder {
  orderId: number
  userAccessKey: string
}
