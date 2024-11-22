<template>
  <label class="form__label">
    <slot></slot>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['title', 'error']
})
</script>
