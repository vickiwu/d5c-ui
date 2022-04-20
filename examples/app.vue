<!--
 * @Author: vickiWu
 * @Date: 2022-03-23 14:24:42
 * @LastEditTime: 2022-04-02 17:08:10
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\examples\app.vue
-->
<template>
  <div id="app">
    <main-header></main-header>
    <div class="main-cnt">
      <router-view />
    </div>
  </div>
</template>

<script>
import mainHeader from './components/header.vue';
export default {
  name: 'App',
  components: { mainHeader }
};
</script>
