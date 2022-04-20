<!--
 * @Author: vickiWu
 * @Date: 2022-04-06 10:15:31
 * @LastEditTime: 2022-04-15 14:58:48
 * @LastEditors: vickiWu
 * @Description: 地图相关
 * @FilePath: \d5c-ui\examples\docs\map\installation.md
-->
## 介绍

### 目标

根据业务将地图功能，封装设计，快速开发。可使用npm下载，更好地和webpack打包工具配合使用。或通过CDN获取sdk，在页面中直接引入js和css文件，即可开始使用。

```shell
npm i d5c-map -S
```

```html
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/d5c-map/lib/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/d5c-map/lib/index.js"></script>
```

:::tip
d5c-ma目前还在开发过程中，暂未发布至npm。包资源可本地使用
:::

### 平台兼容
| H5      | Web          | electron桌面应用      | 小程序                           |
|:--------: |:------------: |:--------: |:------------------------------:  |
| √     | √           | √  | √  |

### 地图服务商

| 地图服务商     | Web          | electron桌面应用      | 小程序                           | H5|
|:--------: |:------------: |:--------: |:------------------------------:  |:-----: |
| 高德    | √           | √  | √  |√|
| 百度     | √           | √  | √  |√|
| 腾讯     | √           | √  | √  |√|
| Goolge     | √           | √  | √  |√|

:::tip
当前高德地图的开发功能完整，其他地图服务商还在开发过程中
:::
