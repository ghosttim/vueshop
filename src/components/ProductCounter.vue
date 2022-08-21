<template>
  <div>
    <div class="form__counter">
      <button
        type="button"
        aria-label="Убрать один товар"
        @click.prevent="changeCountProduct(productAmount - 1)">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" :value="productAmount">

      <button
        type="button"
        aria-label="Добавить один товар"
        @click.prevent="changeCountProduct(productAmount + 1)">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'productAmount',
    event: 'changeCountProduct',
  },
  props: ['productAmount'],
  methods: {
    changeCountProduct(productAmount) {
      console.log(productAmount)
      if (productAmount >= 0){
         this.$emit('changeCountProduct', productAmount);
      }
    }
  }
}
</script>
