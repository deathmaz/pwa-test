<script lang="ts">
import Vue from 'vue';
import FormField from '@components/form-field/form-field.vue';
export default Vue.extend({
  data() {
    return {
      count: 0,
    };
  },
  components: {
    FormField,
  },

  methods: {
    onClick() {
      this.count++;
    },
  },
});
</script>

<template>
  <div>
    <form-field />
    <button type="button" @click="onClick">
      Increase
    </button>
    <br >

    {{ count }}
  </div>
</template>

<style lang="scss">
@import '~@styles/app.scss';
</style>
