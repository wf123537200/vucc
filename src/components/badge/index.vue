<!--
  徽标数 俗称小红点,用于提示用户有消息了

  @param {Number} number 徽标数的数字,大于100会展示99+
  @param {Boolean} isShowNumber 是否展示数字,还是展示红点
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <span class="tbd-badge-wrap">
        <slot></slot>
        <span v-if="number > 0 || !isShowNumber" :style="appendStyle"
              :class="[appendClass, {'tbd-badge': isShowNumber, 'tbd-badge-dot': !isShowNumber}]">
            {{isShowNumber ? (+number > 100 ? '99+' : number) : ''}}
        </span>
    </span>
</template>

<script>
    import {componentBaseParamConfig} from 'components/base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            number: {
                type: Number,
                default: 0
            },
            isShowNumber: {
                type: Boolean,
                default: false
            }
        })
    }
</script>

<style scoped>
    @import "style.css";
</style>