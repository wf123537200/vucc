<!--
   tooltip 文字提示组件

   @param {String} [type= bottom | bottomLeft | bottomRight
                    | top | topLeft | topRight | right | rightTop | rightBottom
                    | left | leftTop | leftBottom] 文字提示的位置
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['vc-tooltip', typeClass, appendClass]">
        <i class="vc-tooltip-arrow"></i>
        <div class="vc-tooltip-inner">
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
            const PRE_FIX = 'vc-tooltip-placement-';

            return {
                typeClass: PRE_FIX + this.type
            }
        },

        mounted() {
            this.$el.parentElement.className += ' vc-tooltip-wrap '
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>