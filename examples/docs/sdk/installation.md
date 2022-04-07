<!--
 * @Author: vickiWu
 * @Date: 2022-04-06 10:15:42
 * @LastEditTime: 2022-04-06 16:59:15
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\docs\sdk\installation.md
-->
## 安装

### npm 安装

推荐使用 npm 的方式安装，它能更好地和 [webpack](https://webpack.js.org/) 打包工具配合使用。

```shell
npm i d5c-im-ts -S
```

### CDN

目前可以通过 [unpkg.com/d5c-im-ts](https://unpkg.com/d5c-im-ts/) 获取到最新版本的资源，在页面上引入 js 文件即可开始使用。

```html
<!-- 引入组件库 -->
<script src="https://unpkg.com/d5c-im-ts/lib/index.js"></script>
```

:::tip
我们建议使用 CDN 引入 d5c-im-ts 的用户在链接地址上锁定版本，以免将来 d5c-im-ts 升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

### 起步

通过 CDN 的方式我们可以很容易地使用 d5c-im-ts 写出一个发送消息 页面。[在线演示](https://codepen.io/vicki_wu/pen/ExoQeJE)

如果是通过 npm 安装，并希望配合 webpack 使用，请阅读下一节：[快速上手](/#/sdk/quickstart)。
