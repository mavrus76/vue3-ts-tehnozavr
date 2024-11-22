<template>
  <div class="message" v-if="productStatus.isLoading">Загрузка товара...</div>
  <div class="message" v-else-if="productStatus.isFailed">Не удалось загрузить товар</div>
  <div v-else>
    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="400" height="400" :src="product?.preview.file.url" :alt="product?.title" />
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product?.id }} </span>
        <h2 class="item__title">{{ product?.title }}</h2>
        <div class="item__form">
          <form
            class="form"
            action="#"
            method="POST"
            @submit.prevent="doAddToCart(product ?? ({} as IProduct))"
          >
            <b class="item__price"> {{ product?.pricePretty }} ₽ </b>

            <fieldset class="form__block" v-if="hasColor">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item" v-for="item in propValues" :key="item.productProp.id">
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      name="color-item"
                      :value="getColor(item.value)?.color.title"
                      :checked="isSelfPickup"
                      required
                      @change="getProductOfferId(item.value)"
                    />
                    <span
                      class="colors__value"
                      :style="{ 'background-color': getColor(item.value)?.color.code }"
                    >
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block" v-if="hasBuiltInMemory">
              <legend class="form__legend">Объем в ГБ:</legend>
              <ul class="sizes sizes--primary">
                <li class="sizes__item" v-for="item in propValues" :key="item.productProp.id">
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      :value="item.value"
                      :checked="isSelfPickup"
                      required
                      @change="getProductOfferId(item.value)"
                    />
                    <span class="sizes__value">{{ item.value }}</span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button
                  type="button"
                  aria-label="Убрать один товар"
                  @click.prevent="productAmount > 1 ? productAmount-- : false"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>
                <label>
                  <input type="text" v-model.number="productAmount" />
                </label>
                <button
                  type="button"
                  aria-label="Добавить один товар"
                  @click.prevent="productAmount++"
                >
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primary" type="submit" :disabled="productAddSending">
                В корзину
              </button>
              <BaseModal v-model:open="isShowAddedMessage"> Товар добавлен в корзину </BaseModal>
            </div>

            <div class="message" v-show="productAdded">Товар добавлен в корзину</div>
            <div class="message" v-show="productAddSending">Добавляем товар в корзину...</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br />
            Синхронизация со смартфоном<br />
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br />
            Поддержка сторонних приложений<br />
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            Wahoo ELEMNT BOLT GPS – это велокомпьютер, который позволяет оптимизировать свои
            велотренировки, сделав их максимально эффективными. Wahoo ELEMNT BOLT GPS
            синхронизируется с датчиками по ANT+, объединяя полученную с них информацию. Данные
            отображаются на дисплее, а также сохраняются на смартфоне. При этом на мобильное
            устройство можно установить как фирменное приложение, так и различные приложения
            сторонних разработчиков. Велокомпьютер точно отслеживает местоположение, принимая сигнал
            с целого комплекса спутников. Эта информация позволяет смотреть уже преодоленные
            маршруты и планировать новые велопрогулки.
          </p>

          <h3>Дизайн</h3>

          <p>
            Велокомпьютер Wahoo ELEMNT BOLT очень компактный. Размеры устройства составляют всего
            74,6 x 47,3 x 22,1 мм. что не превышает габариты смартфона. Корпус гаджета выполнен из
            черного пластика. На обращенной к пользователю стороне расположен дисплей диагональю 56
            мм. На дисплей выводятся координаты и скорость, а также полученная со смартфона и
            синхронизированных датчиков информация: интенсивность, скорость вращения педалей, пульс
            и т.д. (датчики не входят в комплект поставки). Корпус велокомпьютера имеет степень
            защиты от влаги IPX7. Это означает, что устройство не боится пыли, а также выдерживает
            кратковременное (до 30 минут) погружение в воду на глубину не более 1 метра.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import useProduct from '@/composables/useProduct'
import type { IOffer } from '@/types/offer.interface'
import type { IProduct } from '@/types/product.interface'

export default defineComponent({
  components: { BaseModal },

  props: {
    productId: { type: [Number, String], required: true }
  },

  setup(props) {
    const colorId = ref<number | null>(null)

    const getProductOfferId = (colorValue?: string, memoryValue?: string) => {
      let offerId: number | null = null

      if (colorValue) {
        offerId =
          product.value?.offers.find((offer) => {
            return offer.propValues.find(
              (prop) =>
                prop.value.toLowerCase().replace('ё', 'е') ===
                colorValue?.toLowerCase().replace('ё', 'е')
            )
          })?.id ?? null

        colorId.value = getColor(colorValue)?.id ?? null
      }

      if (memoryValue) {
        offerId =
          product.value?.offers.find((offer) => {
            return offer.propValues.find((prop) => prop.value === memoryValue)
          })?.id ?? null
      }

      return offerId
    }

    const productOfferId = computed<number | null>(() => {
      return getProductOfferId() ?? null
    })

    const propValues = computed(() => {
      if (product) {
        let values: {
          value: string
          productProp: {
            id: number
            title: string
            code: string
          }
        }[] = []
        product.value?.offers.forEach((offer: IOffer) => {
          values.push(...offer.propValues)
        })

        return values
      } else {
        return []
      }
    })

    const hasBuiltInMemory = computed(() => {
      return propValues.value.some((prop) => prop.productProp.code === 'built_in_memory') ?? false
    })
    const hasColor = computed(() => {
      return propValues.value.some((prop) => prop.productProp.code === 'color') ?? false
    })

    const getColor = (value: string) => {
      return product.value?.colors.find(
        (prop) =>
          prop.color.title.toLowerCase().replace('ё', 'е') ===
          value.toLocaleLowerCase().replace('ё', 'е')
      )
    }

    const {
      product,
      category,
      status: productStatus,
      fetchProduct,

      doAddToCart,
      productAmount,
      productAdded,
      productAddSending,
      isShowAddedMessage
    } = useProduct()

    fetchProduct(Number(props.productId))

    return {
      colorId,
      getProductOfferId,
      productOfferId,
      getColor,
      hasColor,
      hasBuiltInMemory,
      propValues,

      productAmount,
      productData: product,
      productStatus,
      productAdded,
      productAddSending,
      isShowAddedMessage,
      product,
      category,

      doAddToCart,
      isSelfPickup: false
    }
  }
})
</script>

<style scoped>
.item {
  grid-template-columns: 1fr;
}

button {
  cursor: pointer;
}
</style>
