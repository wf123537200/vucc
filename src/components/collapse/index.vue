<!--
   折叠面板 组件

   @param {String} title 下拉列表标题
   @param {Boolean} isOpened 下拉列表是否展开
   @param {Boolean} isHasBorder 下拉列表是否有边框
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['tbd-collapse', appendClass, {'tbd-collapse-open': isOpened, 'tbd-collapse-noborder': !isHasBorder}]">
        <div class="tbd-collapse-header">
            <div style="width: 80%; float: left; height: 100%;" @click="trigger">
                <i class="tbd-collapse-header-trigger"></i>
                <h3 class="tbd-collapse-header-title">{{title}}</h3>
            </div>
            <div class="tbd-collapse-header-extra">
                <slot name="operate"></slot>
            </div>
        </div>
        <div class="tbd-collapse-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from 'components/base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            title: {
                type: String,
                default: '标题'
            },
            isOpened: {
                type: Boolean,
                default: false
            },
            isHasBorder: {
                type: Boolean,
                default: true
            }
        }),

        data() {
            return {

            }
        },

        methods: {
            trigger() {
                this.isOpened = !this.isOpened;
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>