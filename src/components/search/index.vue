<!--
   搜索框 组件

   @requires input

   @param {String} value 输入输出的值
   @param {String} [size=normal|large|small] 按钮的大小
   @param {String} placeholder placeholder文案
   @param {Function} onSearch 点击回车或者搜索按钮
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['vc-input-wrap vc-input-wrap-search', appendClass, sizeClass]">
        <pv-input type="text" @keyup.enter="onSearch" class="vc-input" placeholder="{{placeholder}}" v-model="value"></pv-input>
        <button class="vc-input-wrap-extra" @click.stop="onSearch">
            <i class="vci vci-search"></i>
        </button>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvInput from '../input';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            size: {
                type: String,
                default: 'normal'
            },
            value: {
                type: String
            },
            placeholder: {
                type: String,
                default: '点击确定搜索'
            },
            onSearch: {
                type: Function,
                default() {}
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'large': 'vc-input-wrap-lg',
                    'small': 'vc-input-wrap-sm'
                }[this.size]
            }
        },

        components: {
            pvInput
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>