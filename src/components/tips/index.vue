<!--
    tips 提示组件,提示组件提供两种调用方式:
    一种是类似弹窗的,根据声明时注册的组件ID(以id:myTips为例),调用当前组件弹出窗口
    ex:
        <v-tips :id="myTips" :content="'我是一个提示操作/类型是info'" type="info"></v-tips>

    另一种是直接通过函数进行声明
    ex:
        window.Tips.init(type, content, [id, showTime, appendClass, appendStyle]);

    调用统一通过
    vm.$root.$$tips.myTips.show();
    NOTICE: 第二种调用方式还可以使用window.Tips.id.show()的方式调用

  @param {String} id tips id 必填
  @param {String} [type=info|success|error|warn] tips类型
  @param {Number} showTime tips展示的时间,默认为1200ms
  @param {String} content tips内容
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div id="{{id}}" :style="appendStyle" :class="['vc-popover-wrap', appendClass, {'vc-block': isShow, 'vc-hidden': !isShow}]">
        <div class="vc-popover {{typeClass}}">
            {{content}}
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    const classMap = {
        'info': '',
        'success': 'vc-popover-success',
        'error': 'vc-popover-error',
        'warn': 'vc-popover-warning'
    };

    // Tips class 4 call way 2
    class Tips {
        constructor (id, type, content, showTime, appendClass, appendStyle) {
            const Tips = window.Tips;

            Tips[id] = this;

            this.isNoId = !!id;
            id = id || ('tips' + Math.random().toString(36).substr(3, 15));
            this.id = id;
            this.tpl = `<div id="${id}" style="${appendStyle || ''}" class="vc-popover-wrap ${appendClass || ''}">
                            <div class="vc-popover ${classMap[type]}">
                                ${content}
                            </div>
                        </div>`;

            this.showTime = showTime;
        }

        show() {
            let _this = this;
            let document = window.document;
            let tips = document.querySelector('#' + this.id);

            if(!tips) {
                document.body.insertAdjacentHTML('beforeEnd', _this.tpl);
                tips = document.querySelector('#' + this.id);
            } else {
                tips.style.display = 'block';
            }

            window.setTimeout(function() {
                if(_this.isNoId) {
                    tips.style.display = 'none';
                } else {
                    document.body.removeChild(tips);
                }
            }, _this.showTime || 1200);
        }
    }

    Tips.init = function (id, type, content, showTime, appendClass, appendStyle) {
        let tips = new Tips(id, type, content, showTime, appendClass, appendStyle);
        if(!document.body.__vue__.$root.$$tips) document.body.__vue__.$root.$$tips = {};
        document.body.__vue__.$root.$$tips[tips.id] = tips;

        tips.show();
    };

    window.Tips = Tips;

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
            content: {
                type: String,
                default: 'info'
            }
        }),

        ready() {
            this.$root.$$tips = this.$root.$$tips || {};

            this.$root.$$tips[this.id] = this;
        },

        data() {
            return {
                isShow: false
            }
        },

        methods: {
            show() {
                let _this = this;

                this.isShow = true;

                window.setTimeout(function() {
                    _this.isShow = false;
                }, _this.showTime || 1200);
            }
        },

        computed: {
            typeClass() {
                return classMap[this.type];
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>