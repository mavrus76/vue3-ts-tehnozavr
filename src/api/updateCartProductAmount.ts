import axios from 'axios'
import type { ActionContext } from 'vuex'
import { API_BASE_URL } from '@/config'
import type { IState } from '@/stores'

export default function updateCartProductAmount(
  context: ActionContext<IState, IState>,
  { basketItemId, amount }: { basketItemId: number; amount: number }
) {
  context.commit('updateCartProductAmount', { basketItemId, amount })

  if (amount < 1) {
    return false
  }

  return axios
    .put(
      `${API_BASE_URL}/api/baskets/products`,
      {
        basketItemId,
        quantity: amount
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }
    )
    .then((response) => {
      context.commit('updateCartProductsData', response.data.items)
    })
}
