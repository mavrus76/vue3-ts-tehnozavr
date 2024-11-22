import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { ICategory } from '@/types/category.interface'

export interface ILoadCategory {
  categoryData: ICategory
}

export default function loadCategory(this: ILoadCategory, categoryId: number) {
  axios.get(`${API_BASE_URL}/api/productCategories/${categoryId}`).then((response) => {
    this.categoryData = response.data
  })
}
