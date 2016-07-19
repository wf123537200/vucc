<!--
  input 扩展input

  @param {String} size 输入框的大小
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <input type="text" :style="appendStyle" :class="['tbd-input', sizeClass, appendClass]">
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            size: {
                type: String,
                default: ''
            }
        }),
        data() {
            return {
                sizeClass: {
                    small: 'tbd-input-sm',
                    large: 'tbd-input-lg'
                }[this.size]
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>