<!--
  select 下拉列表
  @param {Object} data 传入组件数据,用于渲染
    ex:
      data: [{
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
  @param {String | Number} value 绑定外部数据对象的结果
  @param {Boolean} isDisabled 当前下拉列表是否可选
  @param {Function} onOpen 下拉列表展示时回调
  @param {Boolean} isEditAble 下拉列表是否可编辑,如果可编辑,则展示框变成输入框,并自带过滤功能
  @param {Function} onSelect 选择事件
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <span @click.stop>
        <pv-dropdown :data="data"
                     :append-style="appendStyle"
                     :append-class="appendClass"
                     :is-disabled="isDisabled"
                     :on-select="onSelected"
                     :as-label="asLabel"
                     :as-value="asValue"
                     :filter="isEditAble ? inputSelect : ''">
            <span class="vc-select-selection vc-select-selection-single">
                <pv-input v-if="isEditAble && !isDisabled" v-model="inputSelect"></pv-input>
                <span v-if="isDisabled || !isEditAble" class="vc-select-selection-rendered" v-html="currentSelected"></span>
                <span class="vc-select-arrow"></span>
            </span>
        </pv-dropdown>
    </span>
</template>

<script>
    import {componentBaseParamConfig, alias, name2Alias} from '../base-config';
    import pvDropdown from '../dropdown';
    import pvInput from '../input';

    export default {
        props: Object.assign({}, componentBaseParamConfig, alias, {
            isDisabled: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: []
            },
            onSelect: {
                type: Function
            },
            isEditAble: {
                type: Boolean,
                default: false
            },
            onOpen: {
                type: Function
            },
            value: {}
        }),

        data () {
            return {
                inputSelect: ''
            }
        },

        computed: {
            currentSelected() {
                let res = this.data.find((it) => {
                    return it.value == this.value;
                });

                let returnValue = '请选择';

                if(!res) return returnValue;

                if(res.renderLi) return returnValue = res.renderLi();

                if(res.label !== undefined || res[this.asLabel] !== undefined) {
                    if(res.label !== undefined) res.label += '';
                    returnValue = res.label || res[this.asLabel];
                } else if(res.value !== undefined || res[this.asValue] !== undefined) {
                    returnValue = res.value || res[this.asValue];
                }

                return returnValue;
            }
        },

        created() {
            name2Alias(this.data, this.asValue, this.asLabel);
        },

        methods: {
            onSelected(index, item) {
                let opts = this.data;

                if(opts.isDisabled) return;

                this.inputSelect = this.currentSelected = opts[index].renderLi ? opts[index].renderLi() : opts[index].label || this.value;
                this.onSelect && this.onSelect(item.value, index);

                this.$emit('input', item.value === undefined ? item.asValue : item.value);
            }
        },

        mounted() {
            // 初始化input数据
            this.inputSelect = this.currentSelected;
        },

        watch: {
            // 数据变化重置初始值
            data() {
                name2Alias(this.data, this.asValue, this.asLabel);
                this.inputSelect = this.currentSelected;
            }
        },

        components: {
            pvDropdown,
            pvInput
        }
    }
</script>

<!-- 这里控制了 dropdown 所以不能加上scoped -->
<style lang="sass">
    @import "style.scss";
</style>