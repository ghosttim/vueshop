<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">

            <OrderField title="Получатель" :value="orderInfo.name"/>
            <OrderField title="Адрес доставки" :value="orderInfo.address"/>
            <OrderField title="Телефон" :value="orderInfo.phone"/>
            <OrderField title="Email" :value="orderInfo.email"/>

            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in products" :key="item.product.id" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ products.length }}</b> товара на сумму <b>{{ orderInfo.totalPrice | numberFormat }} ₽</b></p>
          </div>
        </div>


      </form>
    </section>
  </main>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import OrderItem from "@/components/OrderItem";
import OrderField from "@/components/OrderField";
import {mapGetters} from "vuex";

export default {
  filters: {numberFormat},
  components: {
    OrderItem,
    OrderField
  },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }

    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      orderInfo: 'cartInfo',
      products: 'cartInfoProducts',
    }),
  },
}
</script>
