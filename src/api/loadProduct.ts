import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { IProduct } from '@/types/product.interface'
import { useRoute } from 'vue-router'

interface ILoadProduct {
  productLoading: boolean
  productLoadingFailed: boolean
  productData: IProduct
}
export default function loadProduct(this: ILoadProduct) {
  this.productLoading = true
  this.productLoadingFailed = false
  const route = useRoute()

  axios
    .get(`${API_BASE_URL}/api/products/${route.params.id}`)
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
