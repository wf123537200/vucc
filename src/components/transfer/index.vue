<!--
   transfer 穿梭匡组件,只提供穿梭框框架

   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <!-- 要限制穿梭框的宽度时，直接在 tbd-transfer 上写上总宽度 -->
    <div class="tbd-transfer">
        <!-- 中间按钮 -->
        <div class="tbd-transfer-btns">
            <pv-button :size="'tbd-btn-sm'" :type="'outline'" @click.stop="addSelect">
                {{addText}}
                <i class="tbdi tbdi-right"></i>
            </pv-button>
            <pv-button :size="'tbd-btn-sm'" :type="'outline'" :is-disabled="isDeleteAble" @click.stop="removeSelect">
                <i class="tbdi tbdi-left"></i>
                {{deleteText}}
            </pv-button>
        </div>
        <!-- 左侧框 -->
        <div class="tbd-transfer-item-wrap">
            <div class="tbd-transfer-item">
                <!-- 标题栏 -->
                <div v-if="srcTitle" class="tbd-transfer-item-header">
                    <h3>{{srcTitle}}</h3>
                    <div class="tbd-transfer-item-extra">
                        <label class="tbd-label">
                            <pv-checkbox :data="[{label: '全选', value: true}]" :value.sync="selectAll"></pv-checkbox>
                        </label>
                    </div>
                </div> <!-- 标题栏 end -->

                <!-- 选择框 -->
                <div class="tbd-transfer-item-content">
                    <label v-for="it in data | orderBy '_index'" @click.stop="onCheckboxClick(it.isChecked)" :class="['tbd-label tbd-label-vertical', {'tbd-label-checked': it.isChecked}]">
                        <pv-checkbox :data="[{label: it.content, value: true}]" :value.sync="it.isChecked"></pv-checkbox>
                    </label>
                </div><!-- 选择框 end -->
            </div>
        </div>

        <!-- 右侧框 -->
        <div class="tbd-transfer-item-wrap">
            <div class="tbd-transfer-item">
                <!-- 标题栏 -->
                <div v-if="distTitle || srcTitle" class="tbd-transfer-item-header">
                    <h3>{{distTitle || srcTitle}}</h3>
                </div>
                <div class="tbd-transfer-item-content">
                    <label v-for="it in result" :class="['tbd-label tbd-label-vertical', {'tbd-label-checked': it.isChecked}]">
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
                if(this.cancelSelectAll) {
                    this.selectAll = false;
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