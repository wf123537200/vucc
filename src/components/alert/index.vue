<!--
    警告类提示组件,提示组件提供两种调用方式:
    一种是类似弹窗的,根据声明时注册的组件ID(以id:myAlert为例),调用当前组件弹出窗口
    ex:
        <v-alert :id="myAlert" :content="'我是一个提示操作/类型是info'" type="info"></v-alert>

    可以通过如下方式调用
    vm.$root.$$alert.myAlert.show();
    另一种是直接通过函数进行声明
    ex:
        window.Alert.init({
            type: 'info',
            title: '我是标题',
            explain: '我是说明文字',
            isCloseAble: true
        });

  @param {String} id Alert id 必填
  @param {String} [type=info|success|error|warn] 弹出框类型
  @param {Number} showTime Alert展示的时间,默认为1200ms
  @param {String} title alert框的标题
  @param {String} explain alert框的解释性文字
  @param {Boolean} isCloseAble 是否带有关闭按钮
  @param {Boolean} isUseHtml 当传入为true时,explain允许传入html参数
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div :style="appendStyle" v-if="isShow" :class="['vc-alert', appendClass, typeClass, {'show': isShow, 'vc-alert-with-description': explain}]">
        <a v-if="isCloseAble" @click="closeFn" href="javascript: void 0" class="vc-alert-close-icon"><i class="vci vci-cross"></i></a>
        <h3 class="vc-alert-message">{{title}}</h3>
        <div v-if="!isUseHtml" class="vc-alert-description">{{explain}}</div>
        <div v-if="isUseHtml" class="vc-alert-description" v-html="explain"></div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    const TYPE_CLASS = {
        'info': 'vc-alert-info',
        'success': 'vc-alert-success',
        'error': 'vc-alert-error',
        'warn': 'vc-alert-waring'
    };

    // Alert class 4 call way 2
    class Alert {
        constructor ({id, type, title, explain, isCloseAble, showTime, appendClass = '', appendStyle = ''}) {
            const Alert = window.Alert;
            const typeClass = TYPE_CLASS[type];
            const close = isCloseAble ? `<a href="javascript: void 0" class="vc-alert-close-icon"><i class="vci vci-cross"></i></a>` : ``

            Alert[id] = this;

            this.isNoId = !!id;
            id = id || ('Alert' + Math.random().toString(36).substr(3, 15));
            this.id = id;

            this.tpl = `<div id=${id} style="${appendStyle}" class="vc-alert ${appendClass} ${typeClass} show vc-alert-with-description">
                            ${close}
                            <h3 class="vc-alert-message">${title}</h3>
                            <div class="vc-alert-description">${explain}</div>
                        </div>`;

            this.showTime = showTime;
        }

        show() {
            let _this = this;
            let document = window.document;
            let alert = document.querySelector('#' + this.id);

            if(!alert) {
                document.body.insertAdjacentHTML('beforeEnd', _this.tpl);
                alert = document.querySelector('#' + this.id);
            } else {
                alert.style.display = 'block';
            }

            window.setTimeout(function() {
                if(_this.isNoId) {
                    alert.style.display = 'none';
                } else {
                    document.body.removeChild(alert);
                }
            }, _this.showTime || 2000);
        }

        hide() {
            let document = window.document;
            let alert = document.querySelector('#' + this.id);

            if(this.isNoId) {
                alert.style.display = 'none';
            } else {
                document.body.removeChild(alert);
            }
        }
    }

    Alert.init = function (obj) {
        let alert = new Alert(obj);
        let document = window.document;

        if(!document.body.$$alert) document.body.$$alert.$$alert = {};
        document.body.$$alert[alert.id] = alert;
        alert.show();

        let alertEl = document.querySelector('#' + alert.id);

        alertEl.querySelector('.vc-alert-close-icon').addEventListener('click', () => {
            alert.hide();
        });
    };

    window.Alert = Alert;

    // Alert class 4 call way 1
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
            },
            isUseHtml: {
                type: Boolean,
                default: false
            }
        }),

        mounted() {
            document.body.$$alert = document.body.$$alert || {};
            document.body.$$alert[this.id] = this;
        },

        data() {
            return {
                isShow: false,
                typeClass: TYPE_CLASS[this.type]
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

<style lang="scss">
    @import "style.scss";
</style>