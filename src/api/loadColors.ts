import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { IColorsResponse } from '@/types/color.interface'

export interface ILoadColors {
  colorsData: IColorsResponse
}

export default function loadColors(this: ILoadColors) {
  axios.get(`${API_BASE_URL}/api/colors`).then((response) => {
    this.colorsData = response.data
  })
}
