<template>
  <main class="content container" v-if="orderInfo">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }"> Корзина </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо
            с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для
            уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key"> Получатель </span>
              <span class="dictionary__value">
                {{ orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Адрес доставки </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Телефон </span>
              <span class="dictionary__value">
                {{ orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Email </span>
              <span class="dictionary__value">
                {{ orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Доставка </span>
              <span class="dictionary__value">{{
                orderInfo.deliveryTypeId === 2 ? 'Курьером' : 'Самовывоз'
              }}</span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key"> Способ оплаты </span>
              <span class="dictionary__value">{{
                orderInfo.paymentTypeId === 1 ? 'Картой при получении' : 'Наличными при получении'
              }}</span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in productsNormalized" :key="item.product.id">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.pricePretty }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p v-if="orderInfo.deliveryTypeId === 2">"Доставка: <b>500 ₽</b></p>
            <p>
              Итого:
              <b>{{ products.length }}</b>
              товара на сумму
              <b>{{ totalPricePretty }} ₽</b>
            </p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import gotoPage from '@/helpers/gotoPage'
import { defineComponent } from 'vue'
import numberFormat from '@/helpers/numberFormat'
import type { ICartItem } from '@/types/cart.interface'
import { useRoute } from 'vue-router'

export default defineComponent({
  methods: {
    gotoPage
  },

  computed: {
    orderInfo() {
      return this.$store.state.orderInfo
    },
    products() {
      return this.orderInfo?.basket.items ?? []
    },
    productsNormalized() {
      return this.products.map((item: ICartItem) => ({
        ...item,
        product: {
          ...item.productOffer.product,
          pricePretty: numberFormat(item.productOffer.product.price)
        }
      }))
    },
    totalPricePretty() {
      return numberFormat(this.orderInfo?.totalPrice ?? 0)
    }
  },

  created() {
    const route = useRoute()

    if (
      this.$store.state.orderInfo &&
      this.$store.state.orderInfo.id.toString() === route.params.id
    ) {
      return
    }
    this.$store.dispatch('loadOrderInfo', route.params.id)
  }
})
</script>
