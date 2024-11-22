<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        width="120"
        height="120"
        :src="item.productOffer.product.preview.file.url"
        :alt="item.productOffer.product.title"
      />
    </div>
    <h3 class="product__title">
      {{ item.productOffer.product.title }}
    </h3>
    <span class="product__code"> Артикул: {{ item.productOffer.product.id }} </span>

    <div class="product__counter form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="amount > 1 ? amount-- : false"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <label>
        <input type="text" v-model.number="amount" name="count" />
      </label>
      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ totalPricePretty }} ₽ </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteFromCart()"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
    <div class="message" v-show="productDeleting">Товар удаляется...</div>
  </li>
</template>

<script lang="ts">
import { mapActions } from 'vuex'
import numberFormat from '@/helpers/numberFormat'
import { defineComponent } from 'vue'
import type { ICartProducts } from '@/types/cart.interface'
import type { PropType } from 'vue'

export default defineComponent({
  data() {
    return {
      productDeleting: false
    }
  },

  props: {
    item: {
      type: Object as PropType<ICartProducts>,
      default: () => ({})
    }
  },

  computed: {
    totalPricePretty() {
      return numberFormat(this.item.productOffer.price * this.item.amount)
    },
    amount: {
      get() {
        return this.item.amount
      },
      set(value: number) {
        this.$store.dispatch('updateCartProductAmount', {
          basketItemId: this.item.id,
          amount: value
        })
      }
    }
  },

  methods: {
    ...mapActions(['deleteProductFromCart']),

    deleteFromCart() {
      this.productDeleting = true
      this.deleteProductFromCart(this.item.id).then(() => {
        this.productDeleting = false
      })
    }
  }
})
</script>

<style scoped>
button {
  cursor: pointer;
}
</style>
