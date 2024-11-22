<template>
  <BaseFormField :title="title" :error="error">
    <label>
      <input
        class="form__input"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :type="type"
        :placeholder="placeholder"
      />
    </label>
  </BaseFormField>
</template>

<script lang="ts">
import formFieldMixin from '@/mixins/formFieldMixin'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: String,
    type: String
  },
  mixins: [formFieldMixin],
  computed: {
    inputPlaceholder() {
      return 'Enter text'
    }
  }
})
</script>
