/**
 * @Author: vickiWu
 * @Date: 2022-02-18 10:04:00
 * @LastEditTime: 2022-04-02 10:01:07
 * @LastEditors: vickiWu
 * @Description:打包配置的公用配置。
 * @FilePath: \element\build\config.js
 */
var path = require('path');
// 排除node_modules中模块
var nodeExternals = require('webpack-node-externals');
// 所有项目组件
var Components = require('../components.json');

// 源码
var externals = {}; // 外部扩展

Object.keys(Components).forEach(function(key) {
  externals[`d5c-ui/packages/${key}`] = `d5c-ui/lib/${key}`;
});

// 国际化
// 源码遍历

// vue库
externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.externals = externals;
// 创建import或require的别名
exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'd5c-ui': path.resolve(__dirname, '../')
};
// webpack.cong.js vue扩展依赖设置
exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;

// 外部扩展(externals) 从输出的 bundle 中排除依赖,在运行时(runtime)从外部获取这些扩展依赖(external dependencies),主要解决组件依赖导致代码冗余问题。
