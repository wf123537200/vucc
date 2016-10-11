<!--
   tag-list 标签列表

   @require input

   @param {String} [size=normal|large|small] 按钮的大小
   @param {Boolean} isDeleteAble 展示列表是否有删除按钮
   @param {Function} onAdd 标签列表增加时的回调函数
   @param {Function} onDelete 标签列表删除时的回调函数
   @param {Array} data 渲染数据
    ex:
        tagList: [{
          content: '内容'
        }]
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div :style="appendStyle" :class="['vc-tag-list', appendClass, sizeClass]">
        <label v-for="it in data" :class="['vc-tag', 'vc-tag-active', {'vc-tag-with-close': isDeleteAble}]">
            <span>
                {{it.content}}
                <i class="vci vci-cross" v-if="isDeleteAble" @click.stop="deleteItem(it)"></i>
            </span>
        </label>
        <!-- input -->
        <div class="vc-input-wrap">
            <pv-input v-model="text"></pv-input>
            <button class="vc-input-wrap-extra" @click.stop="addItem">
                <i class="vci vci-plus"></i>
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
            data: {
                type: Array
            },
            isDeleteAble: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            },
            onAdd: {
                type: Function
            },
            onDelete: {
                type: Function
            }
        }),

        data() {
            return {
                sizeClass: {
                    'default': '',
                    'small': 'vc-tag-list-sm'
                }[this.size],
                text: ''
            }
        },

        methods: {
            addItem() {
                if(!this.text || !this.text.trim()) return;

                this.data = this.data || [];
                this.data.push({
                    content: this.text.trim()
                });

                this.onAdd && this.onAdd();
            },
            deleteItem(item) {
                this.data.$remove(item);
                this.onDelete && this.onDelete();
            }
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>