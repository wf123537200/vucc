<!--
    警告类提示组件,提示组件提供两种调用方式:
    一种是类似弹窗的,根据声明时注册的组件ID(以id:myTips为例),调用当前组件弹出窗口
    ex:
        <v-alert :id="myAlert" :content="'我是一个提示操作/类型是info'" type="info"></v-alert>

    调用统一通过
    vm.$root.$$alert.myAlert.show();

  @param {String} id tips id 必填
  @param {String} [type=info|success|error|warn] 弹出框类型
  @param {Number} showTime tips展示的时间,默认为1200ms
  @param {String} title alert框的标题
  @param {String} explain alert框的解释性文字
  @param {Boolean} isCloseAble 是否带有关闭按钮
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div :style="appendStyle" v-if="isShow" :class="['tbd-alert', appendClass, typeClass, {'show': isShow, 'tbd-alert-with-description': explain}]">
        <a v-if="isCloseAble" @click="closeFn" href="javascript: void 0" class="tbd-alert-close-icon"><i class="tbdi tbdi-cross"></i></a>
        <h3 class="tbd-alert-message">{{title}}</h3>
        <div class="tbd-alert-description">{{explain}}</div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    // 暂不提供window上的直接注册和调用方式

    // Tips class 4 call way 1
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
            showTime: {
                type: Number,
                default: 1200
            },
            title: {
                type: String,
                default: 'info'
            },
            explain: {
                type: String,
                default: ''
            },
            isCloseAble: {
                type: Boolean,
                default: false
            }
        }),

        ready() {
            this.$root.$$alert = this.$root.$$alert || {};

            this.$root.$$alert[this.id] = this;
        },

        data() {
            return {
                isShow: false,
                typeClass: {
                    'info': 'tbd-alert-info',
                    'success': 'tbd-alert-success',
                    'error': 'tbd-alert-error',
                    'warn': 'tbd-alert-waring'
                }[this.type]
            }
        },

        methods: {
            show() {
                let _this = this;

                this.isShow = true;

                window.setTimeout(function() {
                    _this.isShow = false;
                }, _this.showTime || 1200);
            },
            closeFn() {
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>