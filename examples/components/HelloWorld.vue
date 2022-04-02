<!--
 * @Author: vickiWu
 * @Date: 2022-03-23 18:35:48
 * @LastEditTime: 2022-04-02 10:05:32
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \element\examples\components\HelloWorld.vue
-->
<template>
  <div id="app">
    <JSX></JSX>
  </div>
</template>

<script>
import JSX from './JSX.vue';
export default {
  name: 'HelloWord',
  components: { JSX }
};
</script>

<style scoped>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
