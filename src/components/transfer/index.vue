<!--
   transfer 穿梭匡组件,只提供穿梭框框架

   @param {Array} data 左侧框渲染数据
    ex:
        {
          content: '我是选择框Aaa',
          isChecked: true
        }, {
          content: '我是选择框Bbb'
        }
   @param {Array} result 右侧框渲染数据
    ex:
        {
          content: '我是选择框Ccc',
          isChecked: true
        }
   @param {String} srcTitle 左侧框的title
   @param {String} distTitle 右侧框的title
   @param {Boolean} isDeleteAble 删除按钮是否可用
   @param {String} addText 添加按钮文案
   @param {Function} onAdd 添加按钮的回调function
   @param {String} deleteText 删除按钮文案
   @param {Function} onDelete 删除按钮的回调function
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <!-- 要限制穿梭框的宽度时，直接在 vc-transfer 上写上总宽度 -->
    <div class="vc-transfer">
        <!-- 中间按钮 -->
        <div class="vc-transfer-btns">
            <pv-button :size="'vc-btn-sm'" :type="'outline'" @click.stop="addSelect">
                {{addText}}
                <i class="tbdi tbdi-right"></i>
            </pv-button>
            <pv-button :size="'vc-btn-sm'" :type="'outline'" :is-disabled="isDeleteAble" @click.stop="removeSelect">
                <i class="tbdi tbdi-left"></i>
                {{deleteText}}
            </pv-button>
        </div>
        <!-- 左侧框 -->
        <div class="vc-transfer-item-wrap">
            <div class="vc-transfer-item">
                <!-- 标题栏 -->
                <div v-if="srcTitle" class="vc-transfer-item-header">
                    <h3>{{srcTitle}}</h3>
                    <div class="vc-transfer-item-extra">
                        <label class="vc-label">
                            <pv-checkbox :data="[{label: '全选', value: true}]" :value.sync="selectAll"></pv-checkbox>
                        </label>
                    </div>
                </div> <!-- 标题栏 end -->

                <!-- 选择框 -->
                <div class="vc-transfer-item-content">
                    <label v-for="it in data | orderBy '_index'" @click.stop="onCheckboxClick(it.isChecked)" :class="['vc-label vc-label-vertical', {'vc-label-checked': it.isChecked}]">
                        <pv-checkbox :data="[{label: it.content, value: true}]" :value.sync="it.isChecked"></pv-checkbox>
                    </label>
                </div><!-- 选择框 end -->
            </div>
        </div>

        <!-- 右侧框 -->
        <div class="vc-transfer-item-wrap">
            <div class="vc-transfer-item">
                <!-- 标题栏 -->
                <div v-if="distTitle || srcTitle" class="vc-transfer-item-header">
                    <h3>{{distTitle || srcTitle}}</h3>
                </div>
                <div class="vc-transfer-item-content">
                    <label v-for="it in result" :class="['vc-label vc-label-vertical', {'vc-label-checked': it.isChecked}]">
                        <pv-checkbox :data="[{label: it.content, value: true}]" :value.sync="it.isChecked"></pv-checkbox>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvButton from '../button';
    import pvCheckbox from '../checkbox';

    export default {
        components: {
            pvButton,
            pvCheckbox
        },
        props: Object.assign({}, componentBaseParamConfig, {
            srcTitle: {
                type: String,
                default: '标题'
            },
            distTitle: {
                type: String,
                default: '标题'
            },
            isDeleteAble: {
                type: Boolean,
                default: false
            },
            addText: {
                type: String,
                default: '添加'
            },
            onAdd: {
                type: Function
            },
            deleteText: {
                type: String,
                default: '删除'
            },
            onDelete: {
                type: Function
            },
            data: {
                type: Array
            },
            result: {
                type: Array
            }
        }),

        beforeCompile() {
            this.data = this.data.map((it, index) => {
                return Object.assign({
                    _index: index,
                    isChecked: false
                }, it);
            });

            this.result = this.result.map((it, index) => {
                return Object.assign({
                    _index: index + 999,
                    isChecked: false
                }, it);
            });
        },

        data() {
            return {
                selectAll: false
            }
        },

        watch: {
            selectAll(val) {
                if(this.cancelSelectAll && !val) {
                    return this.cancelSelectAll = false;
                }

                this.data.map((it) => {
                    it.isChecked = val;
                });
            }
        },

        methods: {
            addSelect() {
                const transfer = this.data.filter((it) => {
                    return it.isChecked === true;
                });

                transfer.forEach((it) => {
                    this.data.$remove(it);
                });

                this.result.push(...transfer);

                this.result.sort((a, b) => {
                    return a._index - b._index;
                });

                onAdd && onAdd(transfer);
            },

            removeSelect() {
                const transfer = this.result.filter((it) => {
                    return it.isChecked === true;
                });

                transfer.forEach((it) => {
                    this.result.$remove(it);
                });

                this.data.push(...transfer);

                this.data.sort((a, b) => {
                    return a._index - b._index;
                });

                onDelete && onDelete(transfer);
            },

            onCheckboxClick(val) {
                if(!val) {
                    this.cancelSelectAll = true;
                    this.selectAll = false;
                }
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>