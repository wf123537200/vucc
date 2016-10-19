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
   @param {Boolean} isTextUp 组件文字是否展示在步进条上方
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul :style="appendStyle" :class="['vc-step', appendClass, sizeClass, {'vc-step-vertical': isVertical}]">
        <li v-for="it in data" :class="['vc-step-item', {'vc-step-item-finish': it.isFinished, 'vc-step-item-active': it.isActive}]">
            <div v-if="isTextUp">
                <h3 class="vc-step-item-title">{{it.title}}</h3>
                <p class="vc-step-item-explain">{{it.explain}}</p>
            </div>
            <i :class="['vc-step-item-line', {'vc-step-item-line-up': isTextUp}]"></i>
            <span class="vc-step-item-order">{{it.order}}</span>
            <div v-if="!isTextUp">
                <h3 class="vc-step-item-title">{{it.title}}</h3>
                <p class="vc-step-item-explain">{{it.explain}}</p>
            </div>
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
            },
            isTextUp: {
                type: Boolean,
                default: false
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'small': 'vc-step-sm'
                }[this.size]
            }
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>