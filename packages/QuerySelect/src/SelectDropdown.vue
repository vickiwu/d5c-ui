<!--
 * @Author: vickiWu
 * @Date: 2022-04-07 15:40:45
 * @LastEditTime: 2022-04-07 15:41:49
 * @LastEditors: vickiWu
 * @Description: 
 * @FilePath: \d5c-ui\packages\QuerySelect\src\SelectDropdown.vue
-->
<template>
  <div
    class="el-select-dropdown el-popper"
    :class="[{ 'is-multiple': $parent.multiple }, popperClass]"
    :style="{ minWidth: minWidth }"
  >
    <slot></slot>
  </div>
</template>

<script>
import Popper from 'element-ui/src/utils/vue-popper';

export default {
  name: 'SelectDropdown',

  componentName: 'SelectDropdown',

  mixins: [Popper],

  props: {
    placement: {
      type: String,
      default: 'bottom-start'
    },
    boundariesPadding: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false
        };
      }
    },
    visibleArrow: {
      type: Boolean,
      default: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      minWidth: ''
    };
  },
  computed: {
    popperClass() {
      return this.$parent.popperClass;
    }
  },
  watch: {
    '$parent.inputWidth'() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },
  mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', () => {
      if (this.$parent.visible) {
        this.updatePopper();
        this.$nextTick(() => {
          this.popperElm.style.zIndex = +this.popperElm.style.zIndex + 1000;
        });
      }
    });
    this.$on('destroyPopper', this.destroyPopper);
  }
};
</script>
<style lang="scss" scoped>
.el-popper {
  z-index: 10000;
}
</style>
