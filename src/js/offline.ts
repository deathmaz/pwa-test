import '@front/install-composition-api';
import Vue from 'vue';
import App from '@front/offline.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
