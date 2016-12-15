<!--
   time-line 时间轴组件

   @param {Array} data 时间轴渲染数据
    ex:
        ['我们发布了alpha \n\r 再试试', '我们发布了beta']
   @param {String} textType 定义说明是在时间轴左侧还是右侧
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul :class="['vc-timeline', appendClass]" :style="appendStyle">
        <li :class="['vc-timeline-item', {'vc-timeline-left': textType === 'left'}]" v-for="it in data">
            <i :class="['vc-timeline-item-dot', {'vc-timeline-left-dot': textType === 'left'}]"></i>
            <div class="vc-timeline-item-content">
                <p>
                    <span class="vc-timeline-item-info" v-html="it"></span>
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
            },
            textType: {
                type: String,
                default: 'right'
            }
        })
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>