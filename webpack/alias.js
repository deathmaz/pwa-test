const helpers = require('./helpers.js');

module.exports = {
  vue$: 'vue/dist/vue.esm.js',
  '@img': helpers.getSrcPath('/img'),
  '@fonts': helpers.getSrcPath('/fonts'),
  '@api': helpers.getSrcPath('/js/api'),
  '@styles': helpers.getSrcPath('/styles'),
  '@front': helpers.getSrcPath('/js'),
  '@components': helpers.getSrcPath('/js/components'),
  '@pages': helpers.getSrcPath('/js/pages'),
  '@store': helpers.getSrcPath('/js/store'),
  '@utils': helpers.getSrcPath('/js/utils'),
};
