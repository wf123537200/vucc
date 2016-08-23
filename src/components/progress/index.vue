<!--
   progress 进度条组件

   @param {Number} progress 组件进度百分比,取值在[0, 100]
   @param {String} [size=normal|large] 组件的大小
   @param {String} [type=normal|success|error|warn] 组件的的类型
   @param {String} title 是否有title,决定是否显示title栏
   @param {String} info 标题说明文字,如果没有title,也不会显示
   @param {String} explain 说明文字,决定是否显示explain部分
   @param {Boolean} isShowText 是否显示progress
   @param {Boolean} isActive 是否展示动态类型的progress
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['tbd-progress', appendClass, typeClass, sizeClass, {'status-active': isActive, 'tbd-progress-full': !isShowText}]">
        <!-- title -->
        <div class="tbd-progress-title" v-if="!!title">
            <h3>{{title}}</h3>
            <span class="tbd-progress-title-info">{{info || progress + '%'}}</span>
        </div><!-- title end -->

        <!-- line -->
        <div class="tbd-progress-line-wrap">
            <span class="tbd-progress-line-text" v-if="isShowText">{{progress + '%'}}
                <slot></slot>
            </span>
            <div class="tbd-progress-line">
                <span class="tbd-progress-line-bg" :style="progressStyle"></span>
            </div>
        </div><!-- line end -->

        <!-- explain -->
        <div class="tbd-progress-explain" v-if="explain">{{explain}}</div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from 'components/base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            type: {
                type: String,
                default: 'default'
            },
            size: {
                type: String,
                default: 'normal'
            },
            title: {
                type: String
            },
            info: {
                type: String
            },
            explain: {
                type: String
            },
            progress: {
                type: Number
            },
            isShowText: {
                type: Boolean,
                default: false
            },
            isActive: {
                type: Boolean,
                default: false
            }
        }),

        data() {
            return {
                typeClass: {
                    'default': '',
                    'success': 'status-success',
                    'error': 'status-error',
                    'warn': 'status-warning'
                }[this.type],
                sizeClass: {
                    'normal': '',
                    'large': 'tbd-progress-lg'
                }[this.size]
            }
        },
        computed: {
            progressStyle() {
                return {
                    width: this.progress + '%'
                }
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>