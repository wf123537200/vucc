<!--
   折叠面板组 组件

   @param {Boolean} isMultiple 是否能同时打开多个collapse-group
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['vc-collapse-group', appendClass]" @mousedown="open">
        <slot></slot>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            isMultiple: {
                type: Boolean,
                default: true
            }
        }),

        methods: {
            open(e) {
                let $el = this.$el;
                if(!$el || $el.children.length === 0 || this.isMultiple) return;


                // 已经打开就不折叠
                if(!e.srcElement._vue_directives[0] || e.srcElement._vue_directives[0].vm.isOpened) return;

                // 打开折叠
                for(let i = 0; i < $el.children.length; i++) {
                    $el.children[i].__vue__.isOpened = false;
                }

                setTimeout(function() {
                    e.srcElement._vue_directives[0].vm.isOpened = true;
                }, 100);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "style.scss";
</style>