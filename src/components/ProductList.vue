<template>
  <ul class="catalog__list">

    <ProductItem v-for="(product, index) in products" :key="index"
      :product="product"
    />

  </ul>
</template>
<script>
import ProductItem from './ProductItem';

export default {
  props: ['products'],
  components: {
    ProductItem
  },
}
</script>
