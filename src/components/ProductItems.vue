<template>
  <li v-bind="$attrs" class="catalog__item" v-for="product in productsNormalized" :key="product.id">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
      <img :src="product.preview.file.url" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title" @click.prevent="openQuickView(product.id)">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price"> {{ product.pricePretty }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors" :key="color.color.id">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="color.color.id" />
          <span class="colors__value" :style="{ 'background-color': color.color.code }"></span>
        </label>
      </li>
    </ul>
  </li>

  <BaseModal v-model:open="isQuickViewOpen">
    <ProductQuickView :product-id="currentProductId ?? 0" />
  </BaseModal>
</template>

<script lang="ts">
import gotoPage from '@/helpers/gotoPage'
import numberFormat from '@/helpers/numberFormat'
import { defineAsyncComponent, defineComponent, h, type PropType } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import type { IProduct } from '@/types/product.interface'

export default defineComponent({
  inheritAttrs: false,
  components: {
    BaseModal,
    ProductQuickView: defineAsyncComponent({
      loader: () => import('@/components/ProductQuickView.vue'),
      delay: 0,
      loadingComponent: () => h('div', 'Загрузка...')
    })
  },
  props: {
    products: {
      type: Array as PropType<IProduct[]>,
      default: () => []
    }
  },
  data() {
    return {
      currentProductId: null as number | null
    }
  },
  methods: {
    gotoPage,
    openQuickView(productId: number) {
      this.currentProductId = productId
    }
  },
  computed: {
    isQuickViewOpen: {
      get() {
        return !!this.currentProductId
      },
      set(isOpen: boolean) {
        if (!isOpen) {
          this.currentProductId = null
        }
      }
    },
    productsNormalized() {
      return this.products.map((product: IProduct) => ({
        ...product,
        pricePretty: numberFormat(product.price)
      }))
    }
  }
})
</script>
