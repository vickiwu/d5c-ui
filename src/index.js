/* 由 './build/bin/build-entry.js' 自动生成 */
import Loading from '../packages/loading/index.js';
import Wwy from '../packages/wwy/index.js';
import D5cButton from '../packages/d5c-button/index.js';
import QuerySelect from '../packages/querySelect/index.js';
import locale from 'element-ui/src/locale';
const components = [
  Loading,
  Wwy,
  D5cButton,
  QuerySelect
];
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default {
  install,
  Loading,
  Wwy,
  D5cButton,
  QuerySelect
};
