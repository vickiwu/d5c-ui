<!--
 * @Author: vickiWu
 * @Date: 2022-04-02 09:45:34
 * @LastEditTime: 2022-04-06 17:05:13
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\docs\sdk\quickstart.md
-->
## 快速上手

本节将介绍如何在项目中使用 d5c-im-ts。

### 引入 d5c-im-ts

引入整个 d5c-im-ts；在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import {WsSocketByte, Events} from 'd5c-im-ts'
import App from './App.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});
```

以上代码便完成了 d5c-im-ts 的引入。
### 开始使用

至此，一个基于 Vue 和 d5c-im-ts 的开发环境已经搭建完毕，现在就可以编写代码了。各个功能api的使用方法请参阅它们各自的文档。
