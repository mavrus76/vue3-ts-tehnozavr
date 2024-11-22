import axios from 'axios'
import type { ActionContext } from 'vuex'
import { API_BASE_URL } from '@/config'
import type { ICartItem, ICartProducts } from '@/types/cart.interface'
import type { IState } from '@/stores'

export default async function addProductToCart(
  context: ActionContext<IState, IState>,
  { productOfferId, colorId, amount }: ICartProducts
) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/baskets/products`,
      {
        productOfferId,
        colorId,
        quantity: amount
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }
    )

    const items: ICartItem[] = response.data.items
    context.commit('updateCartProductsData', items)
    context.commit('syncCartProducts')
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Данное API работает только с категориями 'Смартфоны' и 'Самокаты': ${error.name}`
      )
    }
  }
}
