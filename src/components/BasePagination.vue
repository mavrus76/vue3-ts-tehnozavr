<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        href="#"
        @click.prevent="page != null && page > 1 ? paginate(page - 1) : false"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber === page }"
        href="#"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        aria-label="Следующая страница"
        href="#"
        @click.prevent="page != null && page < pages ? paginate(page + 1) : false"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: { type: Number },
    count: { type: Number, default: 0 },
    perPage: { type: Number, default: 0 }
  },
  computed: {
    page() {
      return this.modelValue
    },
    pages() {
      return Math.ceil(this.count / this.perPage)
    }
  },
  methods: {
    paginate(page: number) {
      this.$emit('update:modelValue', page)
    }
  }
})
</script>
