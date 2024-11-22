import axios from 'axios'
import type { ActionContext } from 'vuex'
import { API_BASE_URL } from '@/config'
import type { IState } from '@/stores'

export default function deleteProductFromCart(
  context: ActionContext<IState, IState>,
  basketItemId: number
) {
  axios
    .delete(`${API_BASE_URL}/api/baskets/products`, {
      params: {
        userAccessKey: context.state.userAccessKey
      },
      data: {
        basketItemId
      }
    })
    .then((response) => {
      context.commit('updateCartProductsData', response.data.items)
      context.commit('syncCartProducts')
    })
}
