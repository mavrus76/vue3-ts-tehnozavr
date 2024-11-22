import axios from 'axios'
import type { ActionContext } from 'vuex'
import { API_BASE_URL } from '@/config'
import type { IState } from '@/stores'

export default async function loadOrderInfo(
  context: ActionContext<IState, IState>,
  orderId: number
) {
  const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
    params: {
      userAccessKey: context.state.userAccessKey
    }
  })
  context.commit('updateOrderInfo', response.data)
}
