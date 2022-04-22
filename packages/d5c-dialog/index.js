import D5cDialog from './src/main';

/* istanbul ignore next */
D5cDialog.install = function(Vue) {
  Vue.component(D5cDialog.name, D5cDialog);
};

export default D5cDialog;
