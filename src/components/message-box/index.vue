<!--
    message 类window.alert confirm 组件
    @require dialog
    调用方法如下:

    ex:
        <v-message-box :id="'mb1'" type="info" :title="'这是一条通知信息'" :explain="'一些解释'" :ok-fn="dialogCallbackFn1"></v-message-box>

    调用统一通过
    vm.$root.$$messageBox.yourId.show();

    @param {String}     type 对话框展示的类型,可选枚举值有:info, success, confirm, error
    @param {String}     title 弹出框主标题
    @param {String}     explain 弹出框说明文字
    @param {String}     cancelText 取消按钮的展示文字
    @param {String}     okText 确定按钮的展示文字
    @param {String}     isShow 是否展示
    @param {Function}   onOk ok按钮的回调函数
    @param {Function}   onCancel cancel按钮的回调函数
    @param {Object}     appendClass 自定义class
    @param {Object}     appendStyle 自定义Style对象
-->
<template>
    <pv-dialog :id="id"
              :append-class="appendClass"
              :append-style="appendStyle"
              :has-header="false"
              :on-cancel="onCancel"
              :on-ok="onOk"
              :cancel-text="cancelText"
              :has-cancel-btn="hasCancelBtn"
              :is-show="isShow"
              :ok-text="okText" >

            <div class="vc-confirm-body">
                <i class=" vci {{iconClass}}"></i>
                <span class="vc-confirm-title">{{title}}</span>
                <div class="vc-confirm-content">{{explain}}</div>
            </div>
    </pv-dialog>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvDialog from '../dialog';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            id: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'info'
            },
            title: {
                type: String
            },
            explain: {

            },
            okText: {
                type: String,
                default: '确 定'
            },
            cancelText: {
                type: String,
                default: '取 消'
            },
            onOk: {
                type: Function
            },
            onCancel: {
                type: Function
            },
            isShow: {
                type: Boolean,
                default: false
            }
        }),

        data() {
            return {
                iconClass: {
                    info: 'vci-info-circle',
                    error: 'vci-exclamation-circle',
                    success: 'vci-check-circle',
                    confirm: 'vci-question-circle'
                }[this.type],
                hasCancelBtn: this.type === 'confirm'
            }
        },

        compiled() {
            this.appendClass = ' vc-confirm ' + this.appendClass;
        },

        ready() {
            this.$root.$$messageBox = this.$root.$$messageBox || {};
            this.$root.$$messageBox[this.id] = this.$root.$$dialog[this.id];
        },

        components: {
            pvDialog
        }
    }
</script>

<style scoped lang="scss">
    @import "style.scss";
</style>