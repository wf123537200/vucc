<!--
   slide 组件

   @param {String} max 拖拽的最大值
   @param {String} min 拖拽的最小值
   @param {String} text 拖拽值的附加文本
   @param {String} type 当type为percent的时,将附加text = %
   @param {String | Number} value 当前滑动条的值
   @param {Boolean} isDisabled 当前滑动条不可滑动
   @param {Array} valueList 固定点的点阵渲染列表,如果传入,则按照固定点阵进行拖拽
    ex:
        [{
            label: '0ms',
            value: 0
        }, {
            label: '25ms',
            value: 25
        }]
   @param {Object} appendClass 自定义Style对象
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div :class="['vc-slider', appendClass, {'vc-slider-disabled': isDisabled}]" :style="appendStyle"
         @mousemove="mousemove($event)" @mousedown="mousedown($event)" @mouseup="mouseup($event)">
        <!-- 滑块 -->
        <div class="vc-slider-handle" v-el:dot-btn :style="{'left' : percentValue + '%'}"></div>

        <div class="vc-slider-track" style="left:0%;visibility:visible;"
             :style="{'width' : percentValue + '%'}"></div>
        <div class="vc-slider-step" v-el:step></div>

        <!-- 没有传入 valueList 只有两个端点 end -->
        <span v-if="!valueList" class="vc-slider-dot vc-slider-dot-active"
              style="left:0%" v-el:dot-left
              @click="dotClick(min)">
        </span>
        <span v-if="!valueList" class="vc-slider-dot vc-slider-dot-active"
              style="left:100%" v-el:dot-right
              @click="dotClick(max)">
        </span><!-- 没有传入 valueList 只有两个端点 end -->

        <!-- 传入valueList -->
        <span v-for="it in valueList" class="vc-slider-dot vc-slider-dot-active"
              :style="{'left': ($index / (valueList.length - 1) * 100) + '%'}" v-el:dot-left
              @click="dotClick($index)">
        </span>
        <!-- 传入valueList end -->


        <!-- valueList 未传入 最小值滑块, 最大值滑块, 游标滑块下方为处理处理 -->
        <div v-if="!valueList" class="vc-slider-mark">
            <span class="vc-slider-mark-text vc-slider-mark-text-active min">
                {{parseInt(min) + text}}
            </span>
            <span class="vc-slider-mark-text vc-slider-mark-text-active cur"
                  :style="{'left' : (percentValue) + '%'}">
                {{type === 'percent' ? value + '%' : parseInt(value) + text}}

            </span>
            <span class="vc-slider-mark-text max">
                {{parseInt(max) + text}}
            </span>
        </div>
        <!-- valueList 未传入 最小值滑块, 最大值滑块, 游标滑块下方为处理处理 end -->
        <div v-for="it in valueList" class="vc-slider-mark">
            <span class="vc-slider-mark-text vc-slider-mark-text-active min"
                  :style="{'left': ($index / (valueList.length - 1) * 100) + '%'}">
                {{it.label}}
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
            },
            valueList: {
                type: Array
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
                let percent = 0;

                if(this.value <= this.min) this.value = this.min;

                percent = (this.value - this.min) / (this.max - this.min);

                // 固定点重置
                if(this.valueList) {
                    const curIndex = this.valueList.findIndex((it) => {return it.value == this.value});
                    return curIndex / (this.valueList.length - 1) * 100;
                } else {
                    return parseInt(percent * 100);
                }
            },
            valueListPoint() {
                if(!this.valueList) return;
                let res = [];
                const len = this.valueList.length;

                this.valueList.map((it, index) => {
                    res.push(index / (len - 1));
                });

                return res
            }
        },

        methods: {
            // 点击端点,直接设置值
            dotClick(val) {
                this.value = this.valueList ? this.valueList[val].value : val;
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

                // 固定点
                if(this.valueList) {
                    this.value = this.valueList[Math.round(this.value / 2000 / this.valueListPoint[1])].value;
                }
            },
            //鼠标按键结束则停止更新值
            mouseup() {
                if(this.isDisabled) return;

                this.status = false;
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

                // valueList 固定点
                if(this.valueList) {
                    this.value = this.valueList[Math.round(this.value / 2000 / this.valueListPoint[1])].value;
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
        },
        ready() {
            if(!this.valueList) return;

            this.min = this.valueList[0].value;
            this.max = this.valueList[this.valueList.length - 1].value;
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>
