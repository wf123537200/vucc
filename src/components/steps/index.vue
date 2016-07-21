<!--
   步骤条 组件

   @param {Array} data 渲染组件的数据
   ex:

   @param {String} [size=normal|small] 组件的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul :style="appendStyle" :class="['tbd-step', appendClass, sizeClass, {'tbd-step-vertical': isVertical}]">
        <li v-for="it in data" :class="['tbd-step-item', {'tbd-step-item-finish': it.isFinished, 'tbd-step-item-active': it.isActive}]">
            <i class="tbd-step-item-line"></i>
            <span class="tbd-step-item-order">{{it.order}}</span>
            <h3 class="tbd-step-item-title">{{it.title}}</h3>
            <p class="tbd-step-item-explain">{{it.explain}}</p>
        </li>
    </ul>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            data: {
                type: Array
            },
            size: {
                type: String,
                default: 'normal'
            },
            isVertical: {
                type: Boolean,
                default: false
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'small': 'tbd-step-sm'
                }[this.size]
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>