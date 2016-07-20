<!--
   step-input 步进输入框

   @param {Boolean} isDisabled 按钮是否可以点击
   @param {String} [size=normal|large|small] 组件的大小
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['tbd-input-number', sizeClass, appendClass, {'tbd-input-number-disabled': isDisabled}]">
        <input type="text" class="tbd-input" placeholder="{{min}}" v-model="value"/>
        <div class="tbd-input-number-handle-wrap">
            <button class="tbd-input-number-handle" @mousedown.stop="stepUp" @mouseup.stop="cleanTimer">
                <i class="tbdi tbdi-up"></i>
            </button>
            <button class="tbd-input-number-handle tbd-input-number-handle-down" @mousedown.stop="stepDown" @mouseup.stop="cleanTimer">
                <i class="tbdi tbdi-down"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            value: {
                type: Number
            },
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
            }
        }),

        data() {
            return {
                sizeClass: {
                    'normal': '',
                    'large': 'tbd-input-number-lg',
                    'small': 'tbd-input-number-sm'
                }[this.size]
            }
        },
        compiled() {
            this.value = this.value || this.min;
        },

        watch: {
            value(val, oldValue) {
                if(isNaN(parseInt(val))) this.value = oldValue;
                if(val <= this.min) this.value = this.min;
                if(val >= this.max) this.value = this.max;
            }
        },
        methods: {
            stepUp() {
                const _this = this;
                _this.value += _this.step;

                _this.upTimer = window.setInterval(function() {
                    _this.value += _this.step;
                }, 200)
            },

            stepDown() {
                const _this = this;
                _this.value -= _this.step;

                _this.downTimer = window.setInterval(function() {
                    _this.value -= _this.step;
                }, 200);
            },

            cleanTimer() {
                window.clearInterval(this.upTimer);
                window.clearInterval(this.downTimer);
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>