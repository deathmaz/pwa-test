<script lang="ts">
import {
  defineComponent, ref,
} from '@vue/composition-api';
import FormField from '@components/form-field/form-field.vue';
import axios from 'axios';

export default defineComponent({
  components: {
    FormField,
  },
  setup() {
    const products = ref([] as any[]);
    async function getProducts() {
      const productList = await axios.get('https://fakestoreapi.com/products?limit=5');
      products.value = productList.data;
    }

    getProducts();

    const count = ref(0);
    function onClick() {
      count.value++;
    }

    function subscribe() {
      window.mazServiceWorkerRegistration?.pushManager.subscribe().then(function(pushSubscription) {
        window.console.log(pushSubscription);
      });
    }

    async function getManifest() {
      if (!window.mazWorkbox) {
        return;
      }
      const manifest = await window.mazWorkbox.messageSW({
        type: 'GET_MANIFEST',
      });
      window.console.log(manifest);
    }

    return {
      count,
      onClick,
      subscribe,
      getManifest,
      products,
    };
  },
});
</script>

<template>
  <div>
    <div>
      <img src="https://picsum.photos/id/237/200/300" >
    </div>

    <div class="product-list-grid">
      <div v-for="product in products" :key="product.id">
        <img
          class="product__image"
          :src="product.image"
          :alt="product.title" >
        <h3>{{ product.title }}</h3>
      </div>
    </div>

    <form-field />
    <button type="button" @click="onClick">
      Increase
    </button>
    <br >
    <button type="button" @click="subscribe">
      Subscribe to push notification
    </button>
    <br >
    <button type="button" @click="getManifest">
      Get workbox manifest
    </button>

    {{ count }}
    <div>
      <router-link
        :to="{
          name: 'about',
        }"
      >
        To about page
      </router-link>
      <a href="/blah">Not existing page</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-gap: 20px;
}

.product {
  &__image {
    max-width: 100%;
  }
}
</style>
