// 生成组件库入口文件src/index.js
// 项目组件清单
var Components = require('../../components.json');
var fs = require('fs');
// 字符串模板
var render = require('json-templater/string'); // 字符串模版库
// 大驼峰式命名规则  组件名称经常使用 - 分割，import导入后需要用首字母大写驼峰命名
// 组件CheckboxButton => CheckboxButton
// import CheckboxButton from '../packages/checkbox-button/index.js'
var uppercamelcase = require('uppercamelcase');
var path = require('path');
var endOfLine = require('os').EOL;

// 文件输出路径
var OUTPUT_PATH = path.join(__dirname, '../../src/index.js');
// 组件导入模板 生成示例 import CheckboxButton from '../packages/checkbox-button/index.js'
var IMPORT_TEMPLATE = 'import {{name}} from \'../packages/{{package}}/index.js\';';
// 大驼峰命名格式组件名称
var INSTALL_COMPONENT_TEMPLATE = '  {{name}}';
// src/index.js 内容模板
var MAIN_TEMPLATE = `/* 由 './build/bin/build-entry.js' 自动生成 */
{{include}}
import locale from 'element-ui/src/locale';
const components = [
{{install}}
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
{{list}}
};
`;

delete Components.font;
// 得到所有组件名称，[component-name,component-name,...]
var ComponentNames = Object.keys(Components);

// 存放所有组件得import导入语句
var includeComponentTemplate = [];
// 注册安装得install组件集合
var installTemplate = [];
// 组件名数组
var listTemplate = [];

ComponentNames.forEach(name => {
  // 将组件名称格式化大驼峰
  var componentName = uppercamelcase(name);
  // 生成组件导入语句
  includeComponentTemplate.push(render(IMPORT_TEMPLATE, {
    name: componentName,
    package: name
  }));
  // 以下组件不需要全局注册，采用挂载到Vue.prototype
  // if (['Loading', 'MessageBox', 'Notification', 'Message', 'InfiniteScroll'].indexOf(componentName) === -1) {
  installTemplate.push(render(INSTALL_COMPONENT_TEMPLATE, {
    name: componentName,
    component: name
  }));
  // }
  // 将所有组件添加到listTemplate
  listTemplate.push(`  ${componentName}`);
});
// 模板变量内容替换
var template = render(MAIN_TEMPLATE, {
  include: includeComponentTemplate.join(endOfLine),
  install: installTemplate.join(',' + endOfLine),
  list: listTemplate.join(',' + endOfLine)
});
// 模板内容替换生成后 输出文件 src/index.js
fs.writeFileSync(OUTPUT_PATH, template);
// 返回处理进度
console.log('[build entry] DONE:', OUTPUT_PATH);
