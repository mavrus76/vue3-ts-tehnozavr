export interface IDelivery {
  id: number
  title: string
  price: number
}

export interface IDeliveries extends Array<IDelivery> {}
