<!--
   表单布局子组件

   @param {String} label 标题
   @param {} labelCol label占grid列数,[0, 24]
   @param {} wrapperCol input占grid列数,[0, 24]
   @param {Boolean} isRequire 是否必填,带小红点
   @param {String} explainType=error|success|warning|feedback 说明文字的类型
   @param {Boolean} isExplainShow 是否显示提示文字
   @param {String} explainText 提示文字
-->

<template>
    <div :class="['tbd-form-item', {'tbd-form-item-with-help': isExplainShow}]">
        <label :class="['tbd-col-' + labelCol, {'tbd-form-item-required': isRequire}]">{{label}}</label>
        <div :class="['tbd-form-item-control', explainClass, 'tbd-col-' + wrapperCol]">
            <slot></slot>
            <div class="tbd-form-explain">{{explainText}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },

            labelCol: {
                default: ''
            },

            wrapperCol: {
                default: ''
            },

            isRequire: {
                type: Boolean,
                default: false
            },
            explainType: {
                type: String,
                default: ''
            },
            isExplainShow: {
                type: Boolean,
                default: false
            },
            explainText: {
                type: String,
                default: ''
            }
        },

        computed: {
            explainClass() {
                return {
                    error: 'has-error',
                    success: 'has-success',
                    warning: 'has-warning',
                    feedback: 'has-feedback is-validating'
                }[this.explainType]
            }
        },

        data () {
            return {}
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>