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
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProducts | numberFormat }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя" />
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес" />
            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон" placeholder="Введите ваш телефон" type="tel" />
            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" placeholder="Введи ваш Email" type="email" />
            <BaseFormTextarea v-model="formData.comment" :error="formError.comment" title="Комментарий к заказ" placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalProducts | numberFormat }}</b> товара на сумму <b>{{ totalPrice | numberFormat }}</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit"  :disabled="orderAddSending">
            Оформить заказ
          </button>
        </div>

        <img src="/img/preloader.gif" style="margin: 0 auto" v-show="orderAddSending">

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
  import numberFormat from '@/helpers/numberFormat';
  import BaseFormText from "@/components/BaseFormText";
  import BaseFormTextarea from "@/components/BaseFormTextarea";
  import OrderItem from "@/components/OrderItem";
  import {mapGetters} from "vuex";
  import axios from 'axios';
  import {API_BASE_URL} from "@/config";

  export default {
    filters: {numberFormat},
    components: {
      BaseFormText,
      BaseFormTextarea,
      OrderItem,
    },
    data() {
      return {
        formData: {},
        formError: {},
        formErrorMessage: '',
        orderAddSending: false,
      }
    },
    methods: {
      order() {
        this.formError = {};
        this.formErrorMessage = '';
        this.orderAddSending = true;

        return (new Promise(resolvee => setTimeout(resolvee, 2000)))
          .then(() => {
            axios
              .post(API_BASE_URL + '/api/orders', {
                ...this.formData
              },{
                params: {
                  userAccessKey: this.$store.state.userAccessKey
                }
              })
              .then(() => {
                this.$store.commit('resetCart');
                this.orderAddSending = false;
              })
              .catch(error => {
                this.formError = error.response.data.error.request || {};
                this.formErrorMessage = error.response.data.error.message;
                this.orderAddSending = false;
              })
          });
      }
    },
    computed: {
      ...mapGetters({
        products: 'cartDetailProducts',
        totalPrice: 'cartTotalPrice',
        totalProducts: 'cartCountProducts',
        productsLoading: 'cartProductsLoading'
      }),
    }
  }
</script>
