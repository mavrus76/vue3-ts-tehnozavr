<template>
  <router-link class="header__cart" aria-label="Корзина с товарами" :to="{ name: 'cart' }">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">
      {{ cartProductsCount }}
    </span>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    cartProductsCount(): number {
      return this.$store.state.cartProducts.length ?? 0
    }
  }
})
</script>
