<script lang="ts">
import {
  defineComponent, ref,
} from '@vue/composition-api';
import FormField from '@components/form-field/form-field.vue';

export default defineComponent({
  components: {
    FormField,
  },
  setup() {
    const count = ref(0);
    function onClick() {
      count.value++;
    }

    function subscribe() {
      window.mazServiceWorkerRegistration.pushManager.subscribe().then(function(pushSubscription) {
        console.log(pushSubscription);
      });
    }

    return {
      count,
      onClick,
      subscribe,
    };
  },
});
</script>

<template>
  <div>
    <form-field />
    <button type="button" @click="onClick">
      Increase number
    </button>
    <br >
    <button type="button" @click="subscribe">
      Subscribe to push notification
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
