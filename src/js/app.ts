import '@front/install-composition-api';
import Vue from 'vue';
import App from '@front/app.vue';
import VueRouter from 'vue-router';
import router from '@front/router';
import {
  Workbox,
} from 'workbox-window';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

Notification.requestPermission(function(status) {
  window.console.info('Notification permission status:', status);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const wb = new Workbox('/service-worker.js');
    window.mazWorkbox = wb;
    const showSkipWaitingPrompt = () => {
      if (window.confirm('New version available, refresh?')) {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        wb.messageSkipWaiting();
      }
    };

    wb.addEventListener('waiting', showSkipWaitingPrompt);

    wb.register()
      .then(registration => {
        if (!registration) {
          return;
        }
        window.mazServiceWorkerRegistration = registration;
        registration.pushManager.getSubscription().then(function(sub) {
          if (sub === null) {
            window.console.log('Not subscribed to push service!');
          } else {
            window.console.log('Subscription object: ', sub);
          }
        });
      })
      .catch(registrationError => {
        console.error('SW registration failed: ', registrationError);
      });
  });
}
