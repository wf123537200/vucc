<!--
  select 下拉列表
  @param {Object} data 传入组件数据,用于渲染
    ex:
        {
          optsList: [{
            value: 0,
            label: 'value0'
          }, {
            value: 1,
            label: 'value1'
            // 特性渲染函数
            render: function() {
                return <a>111</a>
            }
          }, {
            value: 2,
            label: 'value2',
            isDisabled: true
          }]
        }
  @param {Array} resultList 多选的结果,如果是单选时,传入无效
  @param {Boolean} isDisabled 当前下拉列表是否可选
  @param {Boolean} isOpened 下拉列表是否显示
  @param {Boolean} hasSearch 下拉列表是否包含搜索框
  @param {String} okText 确定按钮的值,默认为'确定'
  @param {String} okCancel 取消按钮的值,默认为'取消'
  @param {Function} onOk 点击确定按钮后的回调函数
  @param {Function} onCancel 点击取消按钮后的回调函数
  @param {Number | String | Function} filter 传入过滤器,可以过滤下拉列表的值
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <pv-dropdown :data="data"
                 :is-disabled="isDisabled"
                 :is-opened="isOpened"
                 :has-search="hasSearch"
                 :result-list.sync="resultList"
                 :ok-text="okText"
                 :on-ok="onOk"
                 :on-cancel="onCancel"
                 :cancel-text="cancelText"
                 :append-style="appendStyle"
                 :filter="filter"
                 :as-label="asLabel"
                 :as-value="asValue"
                 :has-footer="true"
                 :is-multiple="true"
                 :append-class="appendClass">
        <slot></slot>
    </pv-dropdown>
</template>

<script>
    import {componentBaseParamConfig, alias} from '../base-config';
    import pvDropdown from '../dropdown';
    import pvButton from '../button';

    export default {
        props: Object.assign({}, componentBaseParamConfig, alias, {
            data: {
                type: Object,
                default: {
                    optsList: []
                }
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            isOpened: {
                type: Boolean,
                default: false
            },
            resultList: {
                type: Array,
                default() {
                    return [];
                }
            },

            okText: {
                type: String,
                default: '确 定'
            },

            cancelText: {
                type: String,
                default: '取 消'
            },

            onOk: {
                type: Function
            },

            onCancel: {
                type: Function
            },

            hasSearch: {
                type: Boolean,
                default: true
            },
            filter: {}
        }),

        components: {
            pvDropdown
        }
    }
</script>