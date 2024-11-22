import BaseFormField from '@/components/BaseFormField.vue'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  components: { BaseFormField },
  props: {
    title: {
      type: String,
      required: true
    },
    error: {
      type: String,
      required: false,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: String,
      required: true
    }
  },

  setup(props, { emit }) {
    const dataValue = computed({
      get: () => props.modelValue,
      set: (value: string) => {
        emit('update:modelValue', value)
      }
    })

    return {
      dataValue
    }
  }
})
