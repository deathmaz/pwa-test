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
    };
  },
});
</script>

<template>
  <div>
    <div>
      <img src="https://picsum.photos/id/237/200/300" >
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
