<!--
  global mask 组件 提供全局遮罩,全局只能存在一份拷贝
  @param {String} appendClass 自定义class
  @param {Object} appendClass 自定义Style对象
-->
<template>
    <div :class="['tbd-global-mask', {'tbd-global-mask-hidden': !isShow}]"></div>
</template>
<script>
    import {componentBaseParamConfig} from 'components/base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            isShow: false
        }),

        methods: {
            show() {
                this.isShow = true;
            },

            hide() {
                this.isShow = false;
            }
        },
        watch: {
            isShow(val) {
                val ? this.show() : this.hide();
            }
        }
    }

</script>

<style scoped>
    @import "style.css";
</style>