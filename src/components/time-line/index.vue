<!--
   time-line 时间轴组件

   @param {Array} data 时间轴渲染数据
    ex:
        ['我们发布了alpha \n\r 再试试', '我们发布了beta']
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul class="vc-timeline">
        <li class="vc-timeline-item" v-for="it in data">
            <i class="vc-timeline-item-dot"></i>
            <div class="vc-timeline-item-content">
                <p>
                    <span class="vc-timeline-item-info">{{it}}</span>
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

<style scoped lang="scss">
    @import "style.scss";
</style>