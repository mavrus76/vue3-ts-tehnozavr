<template>
  <main class="content container">
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

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalProducts }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              v-model.trim="formData.name"
              title="ФИО"
              type="text"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
            />

            <BaseFormText
              v-model.trim="formData.address"
              title="Адрес доставки"
              type="text"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              v-model.trim="formData.phone"
              title="Телефон"
              type="tel"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
            />

            <BaseFormText
              v-model.trim="formData.email"
              title="Email"
              type="email"
              :error="formError.email"
              placeholder="Введите ваш Email"
            />

            <BaseFormTextarea
              v-model.trim="formData.comment"
              title="Комментарий к заказу"
              :error="formError.comment"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="0"
                    @change="() => (formData.deliveryTypeId = 1)"
                  />
                  <span class="options__value"> Самовывоз <b>бесплатно</b> </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="500"
                    @change="() => (formData.deliveryTypeId = 2)"
                    :checked="isSelfPickup"
                  />
                  <span class="options__value"> Курьером <b>500 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="card"
                    @change="() => (formData.paymentTypeId = 1)"
                    :checked="isSelfPickup"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="cash"
                    @change="() => (formData.paymentTypeId = 2)"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.productId">
              <h3>
                {{ item.productOffer.product.title }}&nbsp;
                <span style="display: inline-block">{{ item.amount }} шт.</span>
              </h3>
              <b>{{ numberFormat(item.productOffer.product.price * item.amount) }} ₽</b>
              <span>Артикул: {{ item.productOffer.product.id }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p v-if="formData.deliveryTypeId === 2">Доставка: <b>500 ₽</b></p>
            <p>
              Итого:
              <b>{{ totalProducts }}</b>
              товара на сумму
              <b>{{ totalPricePretty }} ₽</b>
            </p>
          </div>
          <button class="cart__button button button--primary" type="submit">Оформить заказ</button>
        </div>
        <div class="lds-spinner" v-if="orderLoading">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4 class="message">Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import gotoPage from '@/helpers/gotoPage'
import { mapGetters } from 'vuex'
import BaseFormText from '@/components/BaseFormText.vue'
import BaseFormTextarea from '@/components/BaseFormTextarea.vue'
import { defineComponent } from 'vue'
import numberFormat from '@/helpers/numberFormat'
import type { ICartItem } from '@/types/cart.interface'
import order from '@/api/order'

export type TFormData = { [key: string]: any }
export type PartialCartItem = Partial<ICartItem>

export interface IOrderData {
  formData: TFormData
  formError: any
  formErrorMessage: string
  orderLoading: boolean
  item: PartialCartItem
  isSelfPickup: boolean
}

export default defineComponent({
  components: {
    BaseFormText,
    BaseFormTextarea
  },

  data(): IOrderData {
    return {
      formData: {
        name: '',
        address: '',
        phone: '',
        email: '',
        deliveryTypeId: 0,
        paymentTypeId: 0,
        comment: ''
      },
      formError: {},
      formErrorMessage: '',
      orderLoading: false,
      item: {},
      isSelfPickup: false
    }
  },

  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalProducts: 'cartTotalProducts'
    }),
    totalPricePretty() {
      return numberFormat(this.totalPrice)
    }
  },

  methods: {
    gotoPage,
    numberFormat,
    order
  }
})
</script>

<style scoped>
.lds-spinner {
  color: official;
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: ' ';
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #8a2be2;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
