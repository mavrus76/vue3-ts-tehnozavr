import { computed, getCurrentInstance, ref, watch } from 'vue'

const openModalsCount = ref(new Set())

export default function () {
  const uid = getCurrentInstance()?.uid
  const isOpen = ref(false)

  const doOpen = () => {
    isOpen.value = true
    openModalsCount.value.add(uid)
  }

  const doClose = () => {
    isOpen.value = false
    openModalsCount.value.delete(uid)
  }

  const isSomeOpen = computed(() => !!openModalsCount.value.size)

  const checkBlackoutState = () => {
    if (!isSomeOpen.value) {
      ;(document.body.style.overflow as string | null) = null
      ;(document.body.style.paddingRight as string | null) = null
    } else {
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
      document.body.style.overflow = 'hidden'
    }
  }

  watch(isSomeOpen, () => {
    checkBlackoutState()
  })

  return {
    doOpen,
    doClose,

    isOpen,
    isSomeOpen
  }
}
