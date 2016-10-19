<!--
   step-input 步进输入框

   @param {Boolean} isDisabled 组件是否可以点击
   @param {Number} value 当前步进输入框的值,不传入时默认为最小值
   @param {Number} min 当前步进输入框的最小值
   @param {Number} max 当前步进输入框的最大值
   @param {Number} step 步进值,每次增加或者减少多少
   @param {Function} onUp 点击向上按钮时的回调,会传入值和当前vm对象
   @param {Function} onDown 点击向下按钮时的回调,会传入值和当前vm对象
   @param {Boolean} isOnlyClick 限制只能点击改变数值,而不能按住,防止onUp/onDown中的大量逻辑被触发
   @param {Function} onChange 输入框填写改变事件
   @param {Number} step 步进值,每次增加或者减少多少
   @param {String} [size=normal|large|small] 组件的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['vc-input-number', sizeClass, appendClass, {'vc-input-number-disabled': isDisabled}]">
        <pv-input type="text" placeholder="{{min}}" v-model="value" @change="onChangeWarp"></pv-input>
        <div class="vc-input-number-handle-wrap">
            <button class="vc-input-number-handle" @mousedown.stop="stepUp" @mouseup.stop="cleanTimerUp">
                <i class="vci vci-up"></i>
            </button>
            <button class="vc-input-number-handle vc-input-number-handle-down" @mousedown.stop="stepDown" @mouseup.stop="cleanTimerDown">
                <i class="vci vci-down"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvInput from '../input';

    export default {
        components: {
            pvInput
        },
        props: Object.assign({}, componentBaseParamConfig, {
            value: {},
            min: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 100
            },
            step: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
                default: 'normal'
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            onUp: {
                type: Function
            },
            onDown: {
                type: Function
            },
            isOnlyClick: {
                type: Boolean
            },
            onChange: {
                type: Function
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'large': 'vc-input-number-lg',
                    'small': 'vc-input-number-sm',
                    'xsmall': 'vc-input-number-xs'
                }[this.size]
            }
        },
        compiled() {
            this.value = this.value || this.min;
        },

        watch: {
            value(val, oldValue) {
                if(isNaN(parseInt(val, 10))) this.value = oldValue;

                this.value = parseInt(val, 10);
                if(val <= this.min) this.value = this.min;
                if(val >= this.max) this.value = this.max;
            }
        },
        methods: {
            onChangeWarp() {
                this.onChange && this.onChange(this.value, this);
            },
            stepUp() {
                this.value = parseInt(this.value, 10);
                this.value += this.step;
                this.onUp && this.onUp(this.value, this);

                if(!this.isOnlyClick) {
                    this.upTimer = window.setInterval(() => {
                        this.value += this.step;
                        this.onUp && this.onUp(this.value, this);
                    }, 200)
                }
            },

            stepDown() {
                this.value = parseInt(this.value, 10);
                this.value -= this.step;
                this.onDown && this.onDown(this.value, this);

                if(!this.isOnlyClick) {
                    this.downTimer = window.setInterval(() => {
                        this.value -= this.step;
                        this.onDown && this.onDown(this.value, this);
                    }, 200);
                }
            },

            cleanTimerUp() {
                window.clearInterval(this.upTimer);

            },

            cleanTimerDown() {
                window.clearInterval(this.downTimer);
            }
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>