<!--
 * @Author: vickiWu
 * @Date: 2022-04-06 10:15:31
 * @LastEditTime: 2022-04-15 17:34:29
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\docs\map\alert.md
-->
## marker标记点

用于地图中展示标记点。
### 基本用法

在地图上加标记点，可设置图标，支持多点

:::demo marker标记点的基础用法。

```html
<template>
  <my-map :mid="mid" :mark-data="markData"></my-map>
</template>

<script>
  export default {
    data() {
      return {
        mid: 'myMap',
        markData:[
        { 
          LngLat: [116.35, 39.89],
          icon: require('examples/assets/mapImg/car-1.png') ,
          title:"mark标题尽量保存唯一",
        },
        { LngLat: [116.38, 39.92] },
        ]
      }
    },
  }
</script>
```

:::


