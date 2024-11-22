import { ref } from 'vue'
import type { IProduct } from '@/types/product.interface'
import { useStore } from '@/stores'

export default function () {
  const productAmount = ref(1)
  const productAdded = ref(false)
  const productAddSending = ref(false)
  const isShowAddedMessage = ref(false)
  const store = useStore()

  const doAddToCart = (product: IProduct) => {
    productAdded.value = false
    productAddSending.value = true

    store
      .dispatch('addProductToCart', {
        productOfferId: product.offers[0].id,
        colorId: product.colors[0].id,
        amount: productAmount.value
      })
      .then(() => {
        isShowAddedMessage.value = true
        productAdded.value = true
        productAddSending.value = false
      })
  }

  return {
    doAddToCart,
    productAmount,
    productAdded,
    productAddSending,
    isShowAddedMessage
  }
}
