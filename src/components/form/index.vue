<!--
   表单布局组件

   @require form-item

   @param {Boolean} isVertical 是否竖向排列
   @param {Boolean} isValid 表单是否验证完成
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <form :class="[appendClass, {'tbd-form-inline': !isVertical, 'tbd-form-horizontal': isVertical}]"
          :style="appendStyle">
        <slot></slot>
    </form>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            isVertical: {
                type: Boolean,
                default: false
            },
            isValid: {
                type: Boolean,
                default: false
            }
        }),

        data () {
            return {}
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>
