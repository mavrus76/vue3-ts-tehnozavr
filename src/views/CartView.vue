<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }"> Каталог </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info"> {{ totalProducts }} товара </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе</p>
          <p class="cart__price">
            Итого: <span>{{ totalPricePretty }} ₽</span>
          </p>

          <router-link v-slot="{ navigate }" :to="{ name: 'order' }" custom>
            <button
              class="cart__button button button--primary"
              type="button"
              :disabled="!totalPrice"
              v-show="products.length > 0"
              @click="navigate"
            >
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script lang="ts">
import CartItem from '@/components/CartItem.vue'
import gotoPage from '@/helpers/gotoPage'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import numberFormat from '@/helpers/numberFormat'

export default defineComponent({
  components: { CartItem },

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
    gotoPage
  }
})
</script>
