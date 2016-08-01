<!--
   tree 树状组件

   @param {String}
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <ul>
        <li v-for="it in data.leafs" :class="['tbd-tree-open', {'tbd-tree-checked': isChecked, 'tbd-tree-disabled': isDisabled}]">
            <a href="javascript: void 0;" class="tbd-tree-item">
                <i v-if="it.subTree" class="tbd-tree-caret"></i>
                <span class="tbd-tree-text">
                    <i v-if="isHasCheckbox" class="tbd-tree-checkbox"></i>
                    {{it.content}}
                </span>
            </a>

            <pv-base :data="it.subTree"></pv-base>
        </li>
    </ul>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvBase from './_base.vue';

    export default {
        components: {
            pvBase
        },
        props: Object.assign({}, componentBaseParamConfig, {
            data: {
                type: Object,
                default() {
                    return {
                        isHasCheckbox: true,
                        isChecked: true,
                        isDisabled: false,
                        leafs: [{
                            content: '文本内容1'
                        }, {
                            content: '文本内容2',
                            subTree: {
                                isHasCheckbox: true,
                                isChecked: true,
                                isDisabled: false,
                                leafs: [{
                                    content: '文本内容1'
                                }, {
                                    content: '文本内容2'
                                }, {
                                    content: '文本内容3'
                                }]
                            }
                        }, {
                            content: '文本内容2',
                            subTree: {
                                isHasCheckbox: true,
                                isChecked: true,
                                isDisabled: false,
                                leafs: [{
                                    content: '文本内容1'
                                }, {
                                    content: '文本内容2'
                                }, {
                                    content: '文本内容3'
                                }]
                            }
                        }]
                    }
                }
            }
        })
    }
</script>