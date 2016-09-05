<!--
   loading 组件,可以遮罩整个区域,也可以遮罩整个页面

   @require global-mask

   @param {Boolean} isShow 是否显示loading动画
   @param {Boolean} isGlobal 是否是全局遮罩
   @param {String} content loading提示语
   @param {String} [size=normal|large|small] loading的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div v-if="isShow" :style="appendStyle" :class="['vc-spin', appendClass, sizeClass, {'vc-spin-lg': isGlobal}]">
        <!-- 全局遮罩 -->
        <pv-mask :is-show="isGlobal && isShow"></pv-mask>
        <!-- 局部遮罩 -->
        <div v-if="!isGlobal && isShow" class="vc-spin-wrap-mask"></div>

        <div :class="['vc-spin-content']">
            <span class="vc-spin-circle"></span>
            <span v-if="content" class="vc-spin-text">{{content}}</span>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvMask from '../global-mask';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            size: {
                type: String,
                default: 'normal'
            },
            isShow: {
                type: Boolean,
                default: false
            },
            isGlobal: {
                type: Boolean,
                default: false
            },
            content: {
                type: String,
                default: ''
            }
        }),

        components: {
            pvMask
        },

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'large': 'vc-spin-lg',
                    'small': 'vc-spin-sm'
                }[this.size]
            }
        },

        watch: {
            isShow(val) {
                if(!val) return;

                const cName = this.$el.nextSibling.className;
                if(cName.indexOf('vc-spin-page') < 0 && this.isGlobal) {
                    this.$el.nextSibling.className += ' vc-spin-page';
                }

                if(this.$el.parentElement.className.indexOf('vc-spin-warp') < 0 && !this.isGlobal) {
                    this.$el.parentElement.className += ' vc-spin-wrap';
                }

            }
        }
    }
</script>

<style scoped lang="scss">
    @import "style.scss";
</style>