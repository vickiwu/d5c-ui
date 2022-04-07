<!--
 * @Author: vickiWu
 * @Date: 2022-04-06 10:15:42
 * @LastEditTime: 2022-04-07 15:27:20
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\docs\sdk\token.md
-->
## Token 登录验证

socket的登录验证，先获取到token。

### 基本用法

携带token和userId登录。

:::demo Alert 组件提供四种主题，由`type`属性指定，默认值为`info`。
```html
<template>
  <el-button type="primary" @click="connectIM">
    连接
  </el-button>
 
</template>

<script>
  export default {
    data(){
      return {
        d5cIm:null,
        userId:100005, // 测试的用户id
      }
    },
    methods: {
      connectIM() {
        alert('Hello World!');
        this.d5cIm = new this.$d5cIm.WsSocketByte(this.getToken(), this.userId)
      },
      getToken(){
        // 测试token
        return '151493b01515146b4730082cedb0'
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title     | 标题           | string | — | — |
| type | 主题 | string | success/warning/info/error | info |
| description | 辅助性文字。也可通过默认 slot 传入 | string | — | — |
| closable | 是否可关闭 | boolean | — | true |
| center | 文字是否居中 | boolean | — | true |
| close-text | 关闭按钮自定义文本 | string | — | — |
| show-icon | 是否显示图标 | boolean | — | false |
| effect | 选择提供的主题 | string | light/dark | light |

### Slot

| Name | Description |
|------|--------|
| — | 描述 |
| title | 标题的内容 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| close | 关闭alert时触发的事件 | — |
