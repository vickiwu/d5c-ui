import navConfig from './nav.config.json'; // 左侧导航
import langs from './json/route'; // 路由配置支持的语言

// 加载网站多语言的vue文件
const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN');
  },
  'en-US': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/en-US/${name}.vue`)),
    'en-US');
  }
};

const load = function(lang, path) {
  console.log('%c 🥃 lang, path: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', lang, path);
  return LOAD_MAP[lang](path);
};

// 加载网站组件文档多语言的md文件
const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN');
  },
  'en-US': path => {
    return r => require.ensure([], () =>
      r(require(`./docs/en-US${path}.md`)),
    'en-US');
  }
};

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path);
};

// 组件页面 路由注册
const registerRoute = (navConfig) => {
  let route = [];

  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang];
    route.push({
      path: `/${ lang }/component`,
      redirect: `/${ lang }/component/installation`,
      component: load(lang, 'component'),
      children: []
    });
    // 组件文档路由添加
    navs.forEach(nav => {
      if (nav.href) return;
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index);
          });
        });
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index);
        });
      } else {
        addRoute(nav, lang, index);
      }
    });
  });
  function addRoute(page, lang, index) {
    const component = loadDocs(lang, page.path);
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    };

    route[index].children.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

const generateMiscRoutes = function(lang) {

  let indexRoute = {
    path: `/${ lang }`, // 首页
    meta: { lang },
    name: 'home' + lang,
    component: load(lang, 'index')
  };

  return [ indexRoute];
};

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang));
});

route.push({
  path: '/play',
  name: 'play',
  component: require('./play/index.vue')
});

let userLanguage = localStorage.getItem('ELEMENT_LANGUAGE') || window.navigator.language || 'en-US';
let defaultPath = '/en-US';
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN';
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}]);

export default route;
