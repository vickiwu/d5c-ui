<!--
 * @Author: vickiWu
 * @Date: 2022-03-23 18:00:11
 * @LastEditTime: 2022-04-02 17:24:04
 * @LastEditors: vickiWu
 * @Description: loading组件 demo
 * @FilePath: \element\packages\loading\src\main.vue
-->

<template>
  <div class="me-loading">
    <div class="loader">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
    </div>
    <div class="loading-text">{{ loadingText }}</div>
  </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    loadingText: {
      type: String,
      default: ''
    }
  }
};
</script>

