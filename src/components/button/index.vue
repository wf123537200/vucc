<!--
   button 组件

   @param {Boolean} isDisabled 按钮是否可以点击
   @param {String} [typeClass=default|primary|outline|error|link] 按钮的类型
   @param {String} [sizeClass=normal|large|small] 按钮的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
  <button :style="appendStyle" :class="['tbd-btn', typeClass, sizeClass, appendClass, {'tbd-btn-disabled': isDisabled}]">
    <span>
        <slot></slot>
    </span>
  </button>
</template>

<script>
  import {componentBaseParamConfig} from '../base-config';

  export default {
    props: Object.assign({}, componentBaseParamConfig, {
      type: {
        type: String,
        default: 'default'
      },
      size: {
        type: String,
        default: 'normal'
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    }),

    data() {
      return {
        typeClass: {
          'default': '',
          'primary': 'tbd-btn-primary',
          'outline': 'tbd-btn-outline',
          'error': 'tbd-btn-error',
          'link': 'tbd-btn-link'
        }[this.type],
        sizeClass: {
          'normal': '',
          'large': 'tbd-btn-lg',
          'small': 'tbd-btn-sm'
        }[this.size]
      }
    }
  }
</script>

<style scoped>
  @import "style.css";
</style>