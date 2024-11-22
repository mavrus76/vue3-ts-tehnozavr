import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { ICategoriesResponse } from '@/types/category.interface'

export interface ILoadCategories {
  categoriesData: ICategoriesResponse
}

export default function loadCategories(this: ILoadCategories) {
  axios.get(`${API_BASE_URL}/api/productCategories`).then((response) => {
    this.categoriesData = response.data
  })
}
