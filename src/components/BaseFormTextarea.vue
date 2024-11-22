<template>
  <BaseFormField :title="title" :error="error">
    <label>
      <textarea
        class="form__input form__input--area"
        v-model="dataValue"
        name="comments"
        :placeholder="placeholder"
      ></textarea>
    </label>
  </BaseFormField>
</template>

<script lang="ts">
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent } from 'vue'

export default defineComponent({
  mixins: [formFieldMixin],
  computed: {
    inputPlaceholder() {
      return 'Enter text'
    }
  }
})
</script>
