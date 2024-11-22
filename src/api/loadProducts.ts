import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { IProductsResponse } from '@/types/product.interface'

export interface ILoadProducts {
  page: number
  productsPerPage: number
  filterPriceFrom: number
  filterPriceTo: number
  filterCategoryId: number
  filterColor: string | null
  filterMemory: string | null
  productsLoading: boolean
  productsLoadingFailed: boolean
  loadProductsTimer?: NodeJS.Timeout
  productsData: IProductsResponse | null
}

export default function loadProducts(this: ILoadProducts) {
  this.productsLoading = true
  this.productsLoadingFailed = false
  clearTimeout(this.loadProductsTimer)
  this.loadProductsTimer = setTimeout(() => {
    const params: any = {
      page: this.page,
      limit: this.productsPerPage,
      categoryId: this.filterCategoryId,
      minPrice: this.filterPriceFrom > 0 ? this.filterPriceFrom : 1,
      maxPrice: this.filterPriceTo > 0 ? this.filterPriceTo : 1000000
    }

    if (this.filterColor !== null) {
      params['props[color][]'] = this.filterColor
    }

    if (this.filterMemory !== null) {
      params['props[built_in_memory][]'] = this.filterMemory
    }

    axios
      .get(`${API_BASE_URL}/api/products`, { params })
      .then((response) => {
        this.productsData = response.data
      })
      .catch(() => {
        this.productsLoadingFailed = true
      })
      .finally(() => {
        this.productsLoading = false
      })
  }, 0)
}
