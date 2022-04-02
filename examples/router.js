/**
 * @Author: vickiWu
 * @Date: 2022-03-23 18:34:16
 * @LastEditTime: 2022-04-02 15:48:34
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \element\examples\router.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import navConfig from './nav.config.json'; // 左侧导航

Vue.use(VueRouter);

// 加载网站多语言的vue文件
const LOAD_MAP = (name) => {
  return (r) => require.ensure([], () => r(require(`./pages/${name}.vue`)), 'zh-CN');
};

const load = function(path) {
  return LOAD_MAP(path);
};

// 加载网站组件文档多语言的md文件
const LOAD_DOCS_MAP = (path) => {
  return (r) => require.ensure([], () => r(require(`./docs${path}.md`)), 'zh-CN');
};

const loadDocs = function(path) {
  return LOAD_DOCS_MAP(path);
};

// 组件页面 路由注册
const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((navMenu, index) => {
    let navs = navConfig[navMenu];
    route.push({
      path: '/component',
      component: load('component'),
      children: []
    });
    // 组件文档路由添加
    navs.forEach((nav) => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach((group) => {
          group.list.forEach((nav) => {
            addRoute(nav, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach((nav) => {
          addRoute(nav, index);
        });
      } else {
        addRoute(nav, index);
      }
    });
  });
  function addRoute(page, index) {
    const component = loadDocs(page.path);
    let child = {
      path: page.path.slice(1),

      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: 'component-' + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};
let route = registerRoute(navConfig);

const routes = [
  {
    path: '/hello',
    name: 'index',
    component: (resolve) => require(['./components/HelloWorld.vue'], resolve) // 使用vue的异步组件技术 , 可以实现按需加载 .
  }
];

routes.push({
  path: '/component',
  name: 'test',
  component: (resolve) => require(['./docs/loading.md'], resolve)
});

routes.push({
  path: '/jsx',
  name: 'jsx',
  component: (resolve) => require(['./components/JSX.vue'], resolve)
  // component: () => import('./components/JSX.vue'),
});

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [...routes, ...route]
});
