/**
 * @Author: vickiWu
 * @Date: 2022-04-07 15:41:16
 * @LastEditTime: 2022-04-07 15:42:39
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \d5c-ui\packages\QuerySelect\index.js
 */
import QuerySelect from './src/main';

/* istanbul ignore next */
QuerySelect.install = function(Vue) {
  Vue.component(QuerySelect.name, QuerySelect);
};

export default QuerySelect;
