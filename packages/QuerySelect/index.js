import QuerySelect from './src/main';

/* istanbul ignore next */
QuerySelect.install = function(Vue) {
  Vue.component(QuerySelect.name, QuerySelect);
};

export default QuerySelect;
