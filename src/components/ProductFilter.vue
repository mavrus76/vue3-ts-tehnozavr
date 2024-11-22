<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      v-bind="$attrs"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="min-price"
            v-model.trim.number="currentPriceFrom"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            class="form__input"
            type="text"
            name="max-price"
            v-model.trim.number="currentPriceTo"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            v-model.number="currentCategoryId"
            @change="changeCategoryId(currentCategoryId)"
          >
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block" v-if="currentCategoryId > 0 && hasColor">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colorsFromProps" :key="color.id">
            <label class="colors__label">
              <input
                class="colors__radio sr-only"
                type="radio"
                name="color"
                :checked="color.title === currentColor"
                @change="() => (currentColor = color.title)"
              />
              <span class="colors__value" :style="{ 'background-color': color.code }"></span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block" v-if="currentCategoryId > 0 && hasBuiltInMemory">
        <legend class="form__legend">Объем в ГБ</legend>
        <ul class="check-list">
          <li
            class="check-list__item"
            v-for="{ value, productsCount } in memoriesFromProps"
            :key="value"
          >
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                :value="value"
                v-model="currentMemory"
              />
              <span class="check-list__desc">
                {{ value }}
                <span>({{ productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primary" type="submit">Применить</button>
      <button class="filter__reset button button--second" type="button" @click.prevent="reset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script lang="ts">
import loadCategories from '@/api/loadCategories'
import loadCategory from '@/api/loadCategory'
import loadColors from '@/api/loadColors'
import { getPropsForFilter } from '@/helpers/getPropsForFilter'
import type { ICategoriesResponse, ICategory } from '@/types/category.interface'
import type { IColor, IColorsResponse } from '@/types/color.interface'
import { defineComponent } from 'vue'

export interface IProductFilterData {
  currentPriceFrom: number
  currentPriceTo: number
  currentCategoryId: number
  currentColor: string | null
  currentMemory: string[]
  categoriesData: ICategoriesResponse | null
  categoryData: ICategory | null
  colorsData: IColorsResponse | null
  isSelfPickup: boolean
  loadCategories?: () => void
  loadCategory?: (categoryId: number) => void
  loadColors?: () => void
}

export default defineComponent({
  data(): IProductFilterData {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentColor: null,
      currentMemory: [],
      categoriesData: null,
      categoryData: null,
      colorsData: null,
      isSelfPickup: false
    }
  },

  props: ['priceFrom', 'priceTo', 'categoryId', 'color', 'builtInMemory'],

  computed: {
    categories() {
      return this.categoriesData ? this.categoriesData.items : []
    },
    colors() {
      return this.colorsData
        ? this.colorsData.items.map((color: IColor) => {
            return { ...color, title: color.title.replace('ё', 'е') }
          })
        : []
    },
    productProps() {
      return this.categoryData ? this.categoryData.productProps : []
    },
    colorsFromProps() {
      const availableColors = getPropsForFilter(this.productProps, 'color')

      const filteredColors: IColor[] = []
      availableColors.forEach((color) => {
        this.colors.forEach((c) => {
          if (c.title === color.value) {
            filteredColors.push(c)
          }
        })
      })
      return filteredColors
    },
    memoriesFromProps() {
      return getPropsForFilter(this.productProps, 'built_in_memory')
    },
    hasBuiltInMemory() {
      return (
        this.categoryData?.productProps?.some((prop) => prop.code === 'built_in_memory') ?? false
      )
    },
    hasColor() {
      return this.categoryData?.productProps?.some((prop) => prop.code === 'color') ?? false
    }
  },

  watch: {
    priceFrom(value: number) {
      this.currentPriceFrom = value
    },
    priceTo(value: number) {
      this.currentPriceTo = value
    },
    categoryId(value: number) {
      this.currentCategoryId = value
    },
    color(value: string) {
      this.currentColor = value
    },
    builtInMemory(value: string) {
      this.currentMemory = [...value]
    }
  },

  methods: {
    changeCategoryId(categoryId: number) {
      if (categoryId > 0) {
        this.loadCategory(categoryId)
      }
    },
    submit() {
      this.$emit('update:priceFrom', this.currentPriceFrom)
      this.$emit('update:priceTo', this.currentPriceTo)
      this.$emit('update:categoryId', this.currentCategoryId)
      this.$emit('update:color', this.currentColor)
      this.$emit('update:builtInMemory', this.currentMemory)
    },
    reset() {
      this.$emit('update:priceFrom', 0)
      this.$emit('update:priceTo', 0)
      this.$emit('update:categoryId', 0)
      this.$emit('update:color', null)
      this.$emit('update:builtInMemory', [])
    },
    loadCategories,
    loadCategory,
    loadColors
  },

  created() {
    this.loadCategories()
    this.loadColors()
  }
})
</script>
