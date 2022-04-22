<!--
 * @Author: vickiWu
 * @Date: 2022-04-07 16:15:33
 * @LastEditTime: 2022-04-21 16:23:14
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\docs\d5Comp\querySelect.md
-->
## QuerySelect 下拉表格查询

下拉查询表格，带搜索。
### 表格

:::demo QuerySelect 组件

```html
<template>
  <d5c-query-select  v-model="carId" placeholder="请选择车辆" value-key="id" value-label="carNum" :default-label="carNo" clearable :search-fields="car" :remote="carRemote" @change="onCarChange">
    <template>
      <el-table-column label="司机" prop="name"></el-table-column>
      <el-table-column label="押运员" prop="name2"></el-table-column>
      <el-table-column label="车牌号" prop="carNum"></el-table-column>
      <el-table-column label="准牵引总质量/核载质量" prop="tractionWeight"></el-table-column>
    </template>
  </d5c-query-select>
</template>


<script>
  export default {
    data(){
      return{
        carId:0,
        carNo:"",
        car: [{ field: "carNum", label: "车牌号" },{ field: "name", label: "司机" }],
      }
    },
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      },
      carRemote(query){
        console.log('%c 🌽 query: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', query);
        return this.getData(query)
      },
      getData(query){
        return new Promise((resolve,reject)=>{
          if(query){
            resolve({
              data:[{name:"张三",name2:"张三2",carNum:"苏A12345",tractionWeight:100},
              {name:"李四",name2:"李四2",carNum:"苏A12345",tractionWeight:100},
              {name:"王五",name2:"王五2",carNum:"苏A12345",tractionWeight:100},
              {name:"赵六",name2:"赵六2",carNum:"苏A12345",tractionWeight:100}],
              total:4
            })
          }else{
            reject(new Error("没有参数"))
          }
        })
      },
      onCarChange(id, row) {
        console.log('%c 🍻 id, row: ', 'font-size:20px;background-color: #B03734;color:#fff;', id, row);
      },
    }
  };
</script>
```
:::


### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| placeholder | placeholder文字 | string | — | 请选择 |
| size | 尺寸  | string | medium / small / mini | mini |
| clearable | input框是否可清除 | Boolean | — | false |
| multiple | 是否多选 | boolean | — | false |
| value | - | boolean | String, Array, Number | - |
| valueKey | -必填 | string | - | — |
| valueLabel | -必填 | String, Array | — | - |
|width | 下拉框的宽度 | String | — | 默认100% |
| remote | 加载数据，异步函数 | Function | — | - |
| disabled | input是否可用 | Boolean | — | false |
| searchFields | 查询项 | Array | — |
| labelWidth | - | String | — | 73px |
| defaultLabel | - | String | — | — |


###  Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| visible-change | - | val |


