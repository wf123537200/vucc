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
                let srcEl = e.srcElement;
                let srcElVue = '';
                let cnt = 5;
                if(!$el || $el.children.length === 0 || this.isMultiple) return;

                while (cnt--) {
                    if(srcEl.__vue__) {
                        srcElVue = srcEl.__vue__
                        break;
                    } else {
                        srcEl = srcEl.parentElement;
                    }
                }

                // 已经打开就不折叠
                if(!srcElVue) return console.error('【vucc error】没有找到节点!');
                if(srcElVue.isOpened) return;

                // 打开折叠
                for(let i = 0; i < $el.children.length; i++) {
                    if($el.children[i].__vue__._uid !== srcElVue._uid) {
                        $el.children[i].__vue__.isOpened = false;
                    }
                }
            }
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>