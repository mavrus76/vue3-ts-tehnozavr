import { createApp, h } from 'vue'
import mitt, { type Emitter } from 'mitt'
import App from './App.vue'
import router from './router'
import { store, key } from './stores'

export type Events = {
  gotoPage: {
    pageName: string
    pageParams: any
  }
}

const eventBus: Emitter<Events> = mitt<Events>()
const app = createApp({
  render: () => h(App)
})

app.config.globalProperties.eventBus = eventBus
app.config.errorHandler = (err) => {
  console.error('Ошибки от всех компонентов-потомков:', err)
}

app.use(router)
app.use(store, key)

app.mount('#app')
