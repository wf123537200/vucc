<!--
    dialog 对话框组件:只有一种调用方式
    @require button global-mask
    使用传入id进行调用
    ex: <v-dialog :id="'dialog1'" :ok-fn="dialogCallbackFn1" :cancel-fn="dialogCallbackFn2" :append-style="{width: '300px'}">
           你的内容
        </v-dialog>


    调用统一通过
    vm.$root.$$dialog.yourId.show();

    @param {String}     id 必填,dialog的id,指代整个dialog
    @param {String}     title 弹窗的title部分
    @param {Boolean}    hasHeader 是否存在头部
    @param {Boolean}    hasFooter 是否存在尾部
    @param {Boolean}    hasOkBtn 尾部中是否存在确定按钮
    @param {Boolean}    hasCancelBtn 尾部中是否存在取消按钮
    @param {String}     cancelText 取消按钮的展示文字
    @param {String}     okText 确定按钮的展示文字
    @param {Function}   onOk ok按钮的回调函数
    @param {Function}   onCancel cancel按钮的回调函数
    @param {Function}   onBeforeClose 窗口关闭前调用的函数,返回false可以阻止窗口关闭
    @param {Object}     appendClass 自定义class
    @param {Object}     appendStyle 自定义Style对象
-->
<template>
    <div :class="['tbd-dialog-wrap', {'tbd-block': isShow, 'tbd-hidden': !isShow}]" tabindex="10000" @keyup.esc="closeFn">
        <pv-mask :is-show="showMask"></pv-mask>
        <div :class="['tbd-dialog tbd-dialog-autoscroll', appendClass]" :style="appendStyle">
            <div class="tbd-dialog-content">
                <!-- header -->
                <!-- close -->
                <a v-if="hasHeader" href="javascript:void(0);" class="tbd-dialog-close" @click="closeFn">
                    <span class="tbd-dialog-close-x"></span>
                </a>

                <div v-if="hasHeader" class="tbd-dialog-header">
                    <h3 class="tbd-dialog-title">{{title}}</h3>
                </div><!-- header end -->

                <!-- body -->
                <div class="tbd-dialog-body">
                    <slot></slot>
                </div>

                <!-- footer -->
                <div v-if="hasFooter" class="tbd-dialog-footer">
                    <pv-button v-if="hasCancelBtn" @click="_onCancel">{{cancelText}}</pv-button>
                    <pv-button v-if="hasOkBtn"
                              type='primary'
                              @keyup.enter="_onOk"
                              @click="_onOk">
                        {{okText}}
                    </pv-button>
                </div>
            </div>
        </div>
        <a class="shortcut" href="javascript:void 0" @keyup.esc.stop="closeFn" @keyup.enter.stop="_onOk"></a>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvMask from '../global-mask';
    import pvButton from '../button';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                default: '弹窗'
            },
            hasHeader: {
                type: Boolean,
                default: true
            },
            hasFooter: {
                type: Boolean,
                default: true
            },
            hasCancelBtn: {
                type: Boolean,
                default: true
            },
            hasOkBtn: {
                type: Boolean,
                default: true
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
            onBeforeClose: {
                type: Function
            },
            isShow: {
                type: Boolean,
                default: false
            }
        }),

        compiled() {
            this.appendStyle = Object.assign({ width: '500px'}, this.appendStyle);
        },

        ready() {
            this.$root.$$dialog = this.$root.$$dialog || {};
            this.$root.$$dialog[this.id] = this;
        },

        data() {
            return {
                showMask: false
            }
        },

        watch: {
            isShow(val) {
                this.showMask = val;
            }
        },

        methods: {
            show() {
                const _this = this;
                this.isShow = true;
                // 快捷键绑定
                setTimeout(function() {
                    _this.$el.querySelector('.shortcut').focus();
                }, 20);
            },
            hide() {
                this.isShow = false;
            },
            closeFn() {
                this.hide();
            },
            _onOk() {
                if(this.onBeforeClose && this.onclosebefore() === false) {
                    return;
                }

                this.onOk && this.onOk();
                this.hide();
            },
            _onCancel() {
                if(this.onBeforeClose && this.onclosebefore() === false) {
                    return;
                }

                this.onCancel && this.onCancel();
                this.hide();
            }
        },

        components: {
            pvButton,
            pvMask
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>