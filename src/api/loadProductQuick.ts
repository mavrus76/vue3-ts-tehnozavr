import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { IProductsResponse } from '@/types/product.interface'

interface ILoadProductQuick {
  productId: number
  productLoading: boolean
  productLoadingFailed: boolean
  productData: IProductsResponse | null
}

export default function loadProductQuick(this: ILoadProductQuick) {
  this.productLoading = true
  this.productLoadingFailed = false

  axios
    .get(`${API_BASE_URL}/api/products/${this.productId}`)
    .then((response) => {
      this.productData = response.data
    })
    .catch(() => {
      this.productLoadingFailed = true
    })
    .then(() => {
      this.productLoading = false
    })
}
