<template>
  <ul class="catalog__list">
    <ProductItems :products="products"></ProductItems>
  </ul>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ProductItems from './ProductItems.vue'
import type { IProduct } from '@/types/product.interface'

export default defineComponent({
  components: { ProductItems },
  props: {
    products: {
      type: Array as PropType<IProduct[]>,
      default: () => []
    }
  }
})
</script>
