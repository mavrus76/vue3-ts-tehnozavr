import axios from 'axios'
import { API_BASE_URL } from '@/config'
import numberFormat from '@/helpers/numberFormat'
import { ref, computed, reactive } from 'vue'
import useAddToCart from '@/composables/useAddToCart'
import type { IProduct } from '@/types/product.interface'

export default function () {
  const productData = ref<IProduct | null>(null)
  const category = computed(() => productData.value?.category)

  const { doAddToCart, productAmount, productAdded, productAddSending, isShowAddedMessage } =
    useAddToCart()

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false
  })

  const fetchProduct = (productId: number) => {
    fetchStatus.isLoading = true
    fetchStatus.isFailed = false

    axios
      .get(`${API_BASE_URL}/api/products/${productId}`)
      .then((response) => {
        const product = response.data

        productData.value = Object.assign(product, {
          pricePretty: numberFormat(product.price),
          image: product.preview.file.url
        })
      })
      .catch(() => {
        fetchStatus.isFailed = true
      })
      .then(() => {
        fetchStatus.isLoading = false
      })
  }

  return {
    product: productData,
    category,
    status: fetchStatus,
    fetchProduct,

    doAddToCart,
    productAmount,
    productAdded,
    productAddSending,
    isShowAddedMessage
  }
}
