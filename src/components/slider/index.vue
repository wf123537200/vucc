<!--
   slide 组件

   @param {String} max 拖拽的最大值
   @param {String} min 拖拽的最小值
   @param {String} text 拖拽值的附加文本
   @param {String} type 当type为percent的时,将附加text = %
   @param {String | Number} value 当前滑动条的值
   @param {Boolean} isDisabled 当前滑动条不可滑动
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div :class="['tbd-slider', appendClass, {'tbd-slider-disabled': isDisabled}]" :style="appendStyle" @mousemove="mousemove($event)" @mousedown="mousedown($event)" @mouseup="mouseup($event)">
        <!-- 滑块 -->
        <div class="tbd-slider-handle" v-el:dot-btn :style="{'left' : percentValue + '%'}">
            <!-- 提示tips -->
            <div class="tbd-tooltip tbd-tooltip-placement-top show-tips">
                <i class="tbd-tooltip-arrow"></i>
                <div class="tbd-tooltip-inner">
                    {{type === 'percent' ? value + '%' : parseInt(value) + text}}
                </div>
            </div>
        </div>

        <div class="tbd-slider-track" style="left:0%;visibility:visible;"
             :style="{'width' : percentValue + '%'}"></div>
        <div class="tbd-slider-step" v-el:step></div>

        <span class="tbd-slider-dot tbd-slider-dot-active" style="left:0%" v-el:dot-left
              @click="dotClick(min)"></span>
        <span class="tbd-slider-dot tbd-slider-dot-active" style="left:100%" v-el:dot-right
              @click="dotClick(max)"></span>

        <!-- 最小值滑块, 最大值滑块, 游标滑块下方为处理处理-->
        <div class="tbd-slider-mark">
            <span class="tbd-slider-mark-text tbd-slider-mark-text-active min">
                {{parseInt(min) + text}}
            </span>
            <span class="tbd-slider-mark-text tbd-slider-mark-text-active cur"
                  :style="{'left' : (percentValue) + '%'}">
                {{type === 'percent' ? value + '%' : parseInt(value) + text}}

            </span>
            <span class="tbd-slider-mark-text max">
                {{parseInt(max) + text}}
            </span>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            max : {
                type: String,
                default : 100
            },
            min: {
                type: String,
                default: 0
            },
            text : {
                type: String,
                default : ''
            },
            type : {
                type: String,
                default : "number"
            },
            value : {
                default : 0
            },
            isDisabled : {
                type: Boolean,
                default : false
            }
        }),

        data () {
            return{
                status : false,
                dotLeft : 0,
                dotRight : 0
            }
        },

        computed: {
            percentValue() {
                if(this.value <= this.min) this.value = this.min;

                let percent = (this.value - this.min) / (this.max - this.min);
                return parseInt(percent * 100);
            }
        },

        methods: {
            // 点击端点,直接设置值
            dotClick(val) {
                this.value = val;
            },

            //鼠标按下按键，更新鼠标点击值
            mousedown(event) {
                if(this.isDisabled) return;

                //获取起点和重点的位移
                let offset = this.getRect(this.$els.step);
                let left = this.dotLeft = offset.left;
                let right = this.dotRight = offset.right;
                let x = event.clientX;

                this.status = true;

                if(x >= left && x <= right) {
                    let value = (this.max - this.min) * ((x - left) / (right - left));
                    this.value = parseInt(value) + parseInt(this.min);
                }
            },
            //鼠标按键结束则停止更新值
            mouseup() {
                if(this.isDisabled) return;

                this.status = false
            },

            //鼠标滑动过程动态更新值
            mousemove(event) {
                if(!this.status || this.isDisabled) return;

                let left = this.dotLeft;
                let right = this.dotRight;
                let x = event.clientX;

                if(this.value >= this.min && this.value <= this.max) {
                    let current = (this.max - this.min) * ((x - left) / (right - left));
                    if(current >= this.min && current <= this.max) {
                        this.value =  parseInt(current) + parseInt(this.min);
                    }
                }

                if(x < left) {
                    this.value = this.min
                }

                if(x > right) {
                    this.value = this.max
                }
            },

            getRect(elements) {
                let rect = elements.getBoundingClientRect();
                let clientTop = document.documentElement.clientTop;
                let clientLeft = document.documentElement.clientLeft;

                return ({ // 兼容ie多出的两个px
                        top: rect.top - clientTop, // 距离顶部的位置
                        bottom: rect.bottom - clientTop, // 距离顶部加上元素本身的高度就等于bottom的位置
                        left: rect.left - clientLeft, // 距离左边的位置
                        right: rect.right - clientLeft // 距离右边的位置就是 距离左边的位置加上元素本身的宽度
                })
            }
    }
}
</script>

<style scoped>
    @import "style.css";
</style>
