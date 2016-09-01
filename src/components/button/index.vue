<!--
   button 组件

   @param {Boolean} isDisabled 按钮是否可以点击
   @param {String} [type=default|primary|outline|error|link] 按钮的类型
   @param {String} [size=normal|large|small] 按钮的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
  <button :style="appendStyle" :class="['vc-btn', typeClass, sizeClass, appendClass, {'vc-btn-disabled': isDisabled}]">
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
          'primary': 'vc-btn-primary',
          'outline': 'vc-btn-outline',
          'error': 'vc-btn-error',
          'link': 'vc-btn-link'
        }[this.type],
        sizeClass: {
          'normal': '',
          'large': 'vc-btn-lg',
          'small': 'vc-btn-sm'
        }[this.size]
      }
    }
  }
</script>

<style scoped>
  @import "style.css";
</style>