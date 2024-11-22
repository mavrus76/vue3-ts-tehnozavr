import axios from 'axios'
import { API_BASE_URL } from '@/config'
import type { Store } from 'vuex'
import type { IState } from '@/stores'
import type { TFormData } from '@/views/OrderView.vue'
import type { Router } from 'vue-router'

interface IPostOrder {
  $store: Store<IState>
  $router: Router
  formData: TFormData
  formError: any
  orderLoading: boolean
  formErrorMessage: string
}

export default function order(this: IPostOrder) {
  this.orderLoading = true
  this.formError = {}
  this.formErrorMessage = ''

  axios
    .post(
      `${API_BASE_URL}/api/orders`,
      {
        ...this.formData
      },
      {
        params: {
          userAccessKey: this.$store.state.userAccessKey
        }
      }
    )
    .then((response) => {
      this.$store.commit('resetCart')
      this.$store.commit('updateOrderInfo', response.data)
      this.$router.push({ name: 'orderInfo', params: { id: response.data.id } })
    })
    .catch((error) => {
      this.formError = error.response?.data?.error?.request || {}
      this.formErrorMessage = error.response?.data?.error?.message
    })
    .then(() => {
      this.orderLoading = false
    })
}
