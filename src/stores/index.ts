import { Store, createStore, useStore as baseUseStore } from 'vuex'
import loadCart from '@/api/loadCart'
import addProductToCart from '@/api/addProductToCart'
import updateCartProductAmount from '@/api/updateCartProductAmount'
import deleteProductFromCart from '@/api/deleteProductFromCart'
import loadOrderInfo from '@/api/loadOrderInfo'
import type { ICartProducts } from '@/types/cart.interface'
import type { IOrderInfo } from '@/types/order.interface'
import type { InjectionKey } from 'vue'

export interface IState {
  cartProducts: {
    basketItemId: number
    amount: number
  }[]
  userAccessKey: string | null
  cartProductsData: ICartProducts[]
  orderInfo: IOrderInfo | null
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $store: Store<IState>
  }
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
  state: () => ({
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null
  }),

  mutations: {
    updateOrderInfo(state, orderInfo: IOrderInfo) {
      state.orderInfo = orderInfo
    },
    resetCart(state) {
      state.cartProducts = []
      state.cartProductsData = []
    },
    updateCartProductAmount(
      state,
      {
        basketItemId,
        amount
      }: {
        basketItemId: number
        amount: number
      }
    ) {
      const item = state.cartProducts.find((el) => el.basketItemId === basketItemId)

      if (item) {
        item.basketItemId = basketItemId
        item.amount = amount
      }
    },
    updateUserAccessKey(state, accessKey: string) {
      state.userAccessKey = accessKey
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        ...item,
        basketItemId: item.id,
        amount: item.quantity
      }))
    }
  },

  getters: {
    cartDetailProducts(state) {
      return state.cartProducts
        .map((item) => {
          const matchingItem = state.cartProductsData.find((p) => p.id === item.basketItemId)
          if (matchingItem) {
            const { productOffer } = matchingItem
            return {
              ...item,
              product: {
                ...productOffer,
                image: productOffer.product.preview.file.url
              }
            }
          }
          return item
        })
        .filter(Boolean)
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc: number, item: ICartProducts) => item.productOffer.product.price * item.amount + acc,
        0
      )
    },
    cartTotalProducts(state, getters) {
      return getters.cartDetailProducts.length
    }
  },

  actions: {
    loadOrderInfo,
    loadCart,
    addProductToCart,
    updateCartProductAmount,
    deleteProductFromCart
  }
})

export function useStore() {
  return baseUseStore(key)
}
