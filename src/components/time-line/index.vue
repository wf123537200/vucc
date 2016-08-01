<!--
   time-line 时间轴组件

   @param {Boolean} isDisabled 按钮是否可以点击
   @param {String} [type=default|primary|outline|error|link] 按钮的类型
   @param {String} [size=normal|large|small] 按钮的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul class="tbd-timeline">
        <li class="tbd-timeline-item" v-for="it in data">
            <i class="tbd-timeline-item-dot"></i>
            <div class="tbd-timeline-item-content">
                <p>
                    <span class="tbd-timeline-item-info">{{it}}</span>
                </p>
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
            }
        })
    }
</script>

<style scoped>
    @import "style.css";
</style>