import { createRouter, createWebHashHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import ProductView from '@/views/ProductView.vue'
import CartView from '@/views/CartView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import OrderView from '@/views/OrderView.vue'
import OrderInfoView from '@/views/OrderInfoView.vue'

const routes = [
  { name: 'main', component: MainView, path: '/' },
  { name: 'product', component: ProductView, path: '/product/:id' },
  { name: 'cart', component: CartView, path: '/cart' },
  { name: 'order', component: OrderView, path: '/order' },
  { name: 'orderInfo', component: OrderInfoView, path: '/order/:id' },
  { name: 'notFound', component: NotFoundView, path: '/:pathMatch(.*)*' }
]

const router = createRouter({
  history: createWebHashHistory(
    process.env.NODE_ENV === 'production' ? '/vue-ts-tehnozavr-master/' : '/'
  ),
  routes
})

export default router
