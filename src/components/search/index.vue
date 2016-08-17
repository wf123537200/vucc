<!--
   搜索框 组件

   @requires input

   @param {String} value 输入输出的值
   @param {String} [size=normal|large|small] 按钮的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['tbd-input-wrap tbd-input-wrap-search', appendClass, sizeClass]">
        <pv-input type="text" class="tbd-input" placeholder="请输入关键词查找" v-model="value"></pv-input>
        <button class="tbd-input-wrap-extra">
            <i class="tbdi tbdi-search"></i>
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
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'large': 'tbd-input-wrap-lg',
                    'small': 'tbd-input-wrap-sm'
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