/* 由 './build/bin/build-entry.js' 自动生成 */
import Loading from '../packages/loading/index.js';
import Wwy from '../packages/wwy/index.js';
import D5cButton from '../packages/d5c-button/index.js';
import QuerySelect from '../packages/querySelect/index.js';
import D5cDialog from '../packages/d5c-dialog/index.js';
import locale from 'element-ui/src/locale';
const components = [
  Loading,
  Wwy,
  D5cButton,
  QuerySelect,
  D5cDialog
];
const install = function(Vue, opts = {}) {
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
  QuerySelect,
  D5cDialog
};
