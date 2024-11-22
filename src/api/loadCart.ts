import axios from 'axios'
import type { ActionContext } from 'vuex'
import { API_BASE_URL } from '@/config'
import type { IState } from '@/stores'

export default async function loadCart(context: ActionContext<IState, IState>) {
  const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
    params: {
      userAccessKey: context.state.userAccessKey
    }
  })
  if (!context.state.userAccessKey) {
    localStorage.setItem('userAccessKey', response.data.user.accessKey)
    context.commit('updateUserAccessKey', response.data.user.accessKey)
  }
  context.commit('updateCartProductsData', response.data.items)
  context.commit('syncCartProducts')
}
