<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        v-model:price-from="filterPriceFrom"
        v-model:price-to="filterPriceTo"
        v-model:category-id="filterCategoryId"
        v-model:color="filterColor"
        v-model:built-in-memory="filterMemory"
      />

      <section class="catalog">
        <div class="message" v-if="productsLoading">Загрузка товаров...</div>
        <div class="message" v-if="productsLoadingFailed">
          Произошла ошибка при загрузке товаров
          <button @click.prevent="loadProducts">Попробовать ещё раз</button>
        </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import ProductList from '@/components/ProductList.vue'
import BasePagination from '@/components/BasePagination.vue'
import ProductFilter from '@/components/ProductFilter.vue'
import loadProducts from '@/api/loadProducts'
import { defineComponent } from 'vue'
import type { IProduct, IProductsResponse } from '@/types/product.interface'

export interface IMainData {
  filterPriceFrom: number
  filterPriceTo: number
  filterCategoryId: number
  filterColor: string | null
  filterMemory: string | null
  page: number
  productsPerPage: number
  productsData: IProductsResponse | null
  productsLoading: boolean
  productsLoadingFailed: boolean
}

export default defineComponent({
  components: { ProductList, BasePagination, ProductFilter },
  data(): IMainData {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: null,
      filterMemory: null,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false
    }
  },

  computed: {
    products(): IProduct[] {
      return this.productsData ? this.productsData.items : []
    },
    countProducts(): number {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },

  methods: {
    loadProducts
  },

  watch: {
    page() {
      this.loadProducts()
    },
    filterPriceFrom() {
      this.loadProducts()
    },
    filterPriceTo() {
      this.loadProducts()
    },
    filterCategoryId() {
      this.loadProducts()
    },
    filterColor() {
      this.loadProducts()
    },
    filterMemory() {
      this.loadProducts()
    }
  },

  created() {
    this.loadProducts()
  }
})
</script>
