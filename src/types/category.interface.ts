interface IAvailableValues {
  value: string
  productsCount: number
}

interface IProductProps {
  id: number
  title: string
  code: string
  availableValues: IAvailableValues[]
}

export interface ICategory {
  id: number
  title: string
  slug: string
  productProps: IProductProps[]
}

export interface ICategoriesResponse {
  items: ICategory[]
}
