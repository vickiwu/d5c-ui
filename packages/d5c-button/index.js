import D5cButton from './src/main';

/* istanbul ignore next */
D5cButton.install = function(Vue) {
  Vue.component(D5cButton.name, D5cButton);
};

export default D5cButton;
