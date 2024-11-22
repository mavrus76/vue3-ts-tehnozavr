export interface IColor {
  id: number
  title: string
  code: string
}

export interface IColors {
  id: number
  color: IColor
  gallery: null
}

export interface IColorsResponse {
  items: IColor[]
}
