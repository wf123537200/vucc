<!--
   步骤条 组件

   @param {Array} data 渲染组件的数据
   ex:
        data: [{
                order: 1,
                title: '完成',
                explain: '说明文字',
                isFinished: true
            }, {
                order: 2,
                title: '进行中',
                explain: '说明文字',
                isActive: true
            }, {
                order: 3,
                title: '默认尺寸',
                explain: '说明文字'
            }]
   @param {String} [size=normal|small] 组件的大小
   @param {Boolean} isVertical 组件是否竖向排列
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
    import {componentBaseParamConfig} from 'components/base-config';

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