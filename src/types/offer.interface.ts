export interface IOffer {
  id: number
  title: string
  price: number
  propValues: {
    value: string
    productProp: {
      id: number
      title: string
      code: string
    }
  }[]
  specifications: {
    id: number
    title: string
    value: string
  }
}
