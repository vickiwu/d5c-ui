/**
 * @Author: vickiWu
 * @Date: 2022-03-23 18:34:16
 * @LastEditTime: 2022-04-06 11:53:28
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \d5c-ui\examples\router.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import navConfig from './nav.config.json'; // 左侧导航

Vue.use(VueRouter);

// 加载网站多语言的vue文件
const LOAD_MAP = {
  'd5Comp': name=>{
    return (r) => require.ensure([], () => r(require(`./pages/d5Comp/${name}.vue`)), 'd5Comp');
  },
  'map': name=>{
    return (r) => require.ensure([], () => r(require(`./pages/map/${name}.vue`)), 'map');
  },
  'sdk': name=>{
    return (r) => require.ensure([], () => r(require(`./pages/sdk/${name}.vue`)), 'sdk');
  }

};

const load = function(type, path) {
  return LOAD_MAP[type](path);
};

// 加载网站组件文档多语言的md文件
const LOAD_DOCS_MAP = {
  'd5Comp': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/d5Comp${path}.md`)),
    'd5Comp');
  },
  'map': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/map${path}.md`)),
    'map');
  },
  'sdk': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/sdk${path}.md`)),
    'sdk');
  }
};

const loadDocs = function(type, path) {
  return LOAD_DOCS_MAP[type](path);
};

// 组件页面 路由注册
const registerRoute = (navConfig) => {
  let route = [];
  Object.keys(navConfig).forEach((type, index) => {
    let navs = navConfig[type];
    route.push({
      path: `/${ type }`,
      redirect: `/${ type }/installation`,
      component: load(type, 'component'),
      children: []
    });
    // 组件文档路由添加
    navs.forEach((nav) => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach((group) => {
          group.list.forEach((nav) => {
            addRoute(nav, type, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach((nav) => {
          addRoute(nav, type, index);
        });
      } else {
        addRoute(nav, type, index);
      }
    });
  });
  function addRoute(page, type, index) {
    const component = loadDocs(type, page.path);
    let child = {
      path: page.path.slice(1),

      meta: {
        title: page.title || page.name,
        description: page.description,
        routeType: type
      },
      name: 'component-' + type + '-' + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }
  console.log('%c 🍻 route: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', route);
  return route;
};
let route = registerRoute(navConfig);

route = route.concat([
  {
    path: '/', // 首页
    name: 'home-index',
    component: (resolve) => require(['./pages/index.vue'], resolve) // 使用vue的异步组件技术 , 可以实现按需加载 .
  },
  {
    path: '*',
    redirect: '/'
  }]);

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: route
});
