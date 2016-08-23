<!--
   tooltip 文字提示组件

   @param {String} [type= bottom | bottomLeft | bottomRight
                    | top | topLeft | topRight | right | rightTop | rightBottom
                    | left | leftTop | leftBottom] 文字提示的位置
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['tbd-tooltip', typeClass, appendClass]">
        <i class="tbd-tooltip-arrow"></i>
        <div class="tbd-tooltip-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            type: {
                type: String,
                default: 'bottom'
            }
        }),

        data() {
            const PRE_FIX = 'tbd-tooltip-placement-';

            return {
                typeClass: PRE_FIX + this.type
            }
        },

        ready() {
            this.$el.parentElement.className += ' tbd-tooltip-wrap '
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>