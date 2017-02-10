<!--
    dialog 对话框组件:只有一种调用方式
    @require button global-mask
    使用传入id进行调用
    ex: <v-dialog :id="'dialog1'" :ok-fn="dialogCallbackFn1" :cancel-fn="dialogCallbackFn2" :append-style="{width: '300px'}">
           你的内容
        </v-dialog>


    调用统一通过
    document.body.$$dialog.yourId.show();

    @param {String}     id 必填,dialog的id,指代整个dialog
    @param {String}     title 弹窗的title部分
    @param {Boolean}    hasHeader 是否存在头部
    @param {Boolean}    hasFooter 是否存在尾部
    @param {Boolean}    hasOkBtn 尾部中是否存在确定按钮
    @param {Boolean}    hasCancelBtn 尾部中是否存在取消按钮
    @param {Boolean}    hasCancelBtn 尾部中是否存在取消按钮
    @param {Boolean}    isShow 绑定value
    @param {String}     cancelText 取消按钮的展示文字
    @param {String}     okText 确定按钮的展示文字
    @param {Function}   onOk ok按钮的回调函数,函数返回false时阻止窗口关闭
    @param {Function}   onCancel cancel按钮的回调函数
    @param {Function}   onBeforeClose 窗口关闭前调用的函数,返回false可以阻止窗口关闭
    @param {Boolean}    isMultiple 是否允许当前窗口为复合弹出,即一个页面可以弹出多个窗口
    @param {Object}     appendClass 自定义class
    @param {Object}     appendStyle 自定义Style对象
-->
<template>
    <div :id="id" :class="['vc-dialog-wrap', {'vc-block': isShow, 'vc-hidden': !isShow}]" tabindex="10000" @keyup.esc="closeFn">
        <pv-mask :is-show="showMask"></pv-mask>
        <div :class="['vc-dialog vc-dialog-autoscroll', appendClass]">
            <div class="vc-dialog-content">
                <!-- header -->
                <!-- close -->
                <a v-if="hasHeader" href="javascript:void(0);" class="vc-dialog-close" @click="closeFn">
                    <span class="vc-dialog-close-x"></span>
                </a>

                <div v-if="hasHeader" class="vc-dialog-header">
                    <h3 class="vc-dialog-title">{{title}}</h3>
                </div><!-- header end -->

                <!-- body -->
                <div class="vc-dialog-body d-body" :style="appendStyle">
                    <slot></slot>
                </div>

                <!-- footer -->
                <div v-if="hasFooter" class="vc-dialog-footer">
                    <pv-button v-if="hasCancelBtn" @click.native="_onCancel">{{cancelText}}</pv-button>
                    <pv-button v-if="hasOkBtn"
                              type='primary'
                              @keyup.native.enter="_onOk"
                              @click.native="_onOk">
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
            value: {
                type: Boolean,
                default: false
            },
            isMultiple: {
                type: Boolean,
                default: false
            }
        }),

        compiled() {
            this.appendStyle = Object.assign({ width: '500px'}, this.appendStyle);
        },

        mounted() {
            this.$root.$$dialog = Object.assign(this.$root.$$dialog || {}, window.$$dialog);
            this.$root.$$dialog = this.$root.$$dialog || {};
            if(this.$root.$$dialog[this.id]) {
                console.warn(this.id + ' 此dialog id已经被使用,请确认id填写正确!');
            }
            this.$root.$$dialog[this.id] = this;
            this.isShow = this.value;

            // 如果不是复合弹出,则清理掉当前页面的所有窗口
            if(this.$root.$$dialog) {
                for(let it in this.$root.$$dialog) {
                    if(this.$root.$$dialog[it].isMultiple) continue;

                    if(this.$root.$$dialog[it].id !== this.id) this.$root.$$dialog[it].hide();
                }
            }
        },

        data() {
            return {
                showMask: false,
                isShow: false
            }
        },

        watch: {
            isShow(v) {
                this.showMask = v;
                this.$emit('input', v);
            },
            value(v) {
                this.isShow = v;
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
                // 如果不是复合弹出,则清理掉当前页面的所有窗口
                if(this.$root.$$dialog) {
                    for(let it in this.$root.$$dialog) {
                        if(this.$root.$$dialog[it].isMultiple) continue;

                        if(this.$root.$$dialog[it].id !== this.id) this.$root.$$dialog[it].hide();
                    }
                }
            },
            hide() {
                this.isShow = false;
            },
            closeFn() {
                this.hide();
            },
            _onOk() {
                let okRes = true;
                if(this.onOk) {
                    okRes = this.onOk();
                }
                if(this.onBeforeClose && this.onBeforeClose() === false) {
                    return;
                }

                if(okRes !== false) this.hide();
            },
            _onCancel() {
                this.onCancel && this.onCancel();

                if(this.onBeforeClose && this.onBeforeClose() === false) {
                    return;
                }

                this.hide();
            }
        },

        components: {
            pvButton,
            pvMask
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>