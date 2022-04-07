/**
 * @Author: vickiWu
 * @Date: 2022-03-23 14:25:44
 * @LastEditTime: 2022-04-07 15:02:46
 * @LastEditors: vickiWu
 * @Description:
 * @FilePath: \d5c-ui\examples\entry.js
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import element from 'element-ui';
import * as d5cIm from 'd5c-im-ts';
import MeUI from '../lib/d5c-ui.common';
import '../lib/d5c-style/index.css';
console.log('%c 🍋 MeUI: ', 'font-size:20px;background-color: #3F7CFF;color:#fff;', MeUI);
import hljs from 'highlight.js';
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/stackoverflow-light.css';
import './assets/styles/common.scss';

// 文档样式
import './demo-styles/index.scss';
import demoBlock from './components/demo-block';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';

Vue.config.productionTip = false;
Vue.prototype.$d5cIm = d5cIm;
Vue.use(element);
Vue.use(MeUI);

Vue.component('demo-block', demoBlock);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

router.afterEach(() => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = 'd5c-ui';
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
