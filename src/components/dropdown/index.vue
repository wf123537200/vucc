<!--
  dropdown 下拉列表
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
  @param {String} [size = normal | large | small] 组件大小,单选时使用
  @param {String} value 绑定外部数据对象的结果
  @param {Boolean} isDisabled 当前下拉列表是否可选
  @param {Boolean} isOpened 下拉列表是否显示
  @param {Boolean} isMultiple 是否展现多选
  @param {Array} resultList 多选的结果,如果是单选时,传入无效
  @param {Boolean} hasFooter 是否展示确定取消按钮,只在多选时有效
  @param {String} okText 确定按钮的值,默认为'确定'
  @param {Function} onOk 点击确定按钮后的回调函数
  @param {Function} onSelect 当下拉列表选中后调用,调用后会将列表隐藏
  @param {Number | String | Function} filter 传入过滤器,可以过滤下拉列表的值
  @param {Boolean} hasSearch 下拉列表是否包含搜索框
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div :style="appendStyle"
         :class="['vc-select', appendClass, sizeClass, {'vc-select-disabled': isDisabled, 'vc-dropdown-wrap-open': isOpened}]"
         @click.stop="onClick">
        <slot></slot>
        <!-- 单选 -->
        <div v-if="!isMultiple" class="vc-dropdown" :class="{'hide': !isOpened}">
            <ul class="vc-dropdown-menu">
                <li v-if="data.optsList.length === 0">
                    没有数据....
                </li>
                <li v-for="it in showData.optsList" value="it.value"
                    :class="['vc-dropdown-menu-item', {'vc-dropdown-menu-item-disabled': it.isDisabled, 'vc-dropdown-menu-item-active': $index === curIndex}]"
                    @click.stop="onSelected($index)">
                    {{{renderLi($index)}}}
                </li>
            </ul>
        </div>
        <!-- 单选 end -->

        <!-- 多选 -->
        <div v-if="isMultiple" class="vc-dropdown vc-dropdown-multi" :class="{'hide': !isOpened}">
            <pv-button v-if="hasSearch" type="outline" :style="{margin: '10px', border: 0}">清空</pv-button>
            <pv-search v-if="hasSearch" :value.sync="filter" :append-style="searchAppendStyle" :size="'small'"></pv-search>

            <ul class="vc-dropdown-menu">
                <li v-if="data.optsList.length === 0">
                    没有数据....
                </li>
                <li v-for="it in showData.optsList" value="it.value"
                    :class="['vc-dropdown-menu-item', {'vc-dropdown-menu-item-disabled': it.isDisabled, 'vc-dropdown-menu-item-active': indexList.includes($index)}]"
                    @click.stop="onSelected($index, it)">
                    {{{renderLi($index)}}}
                </li>
            </ul>

            <!-- 已选展示 -->
            <div class="vc-dropdown-multi-result">
                <span class="vc-dropdown-multi-result-title">已选:
                    <a v-if="!hasSearch" href="javascript: void 0;" @click.stop="onClear" class="vc-dropdown-multi-a">清空</a>
                </span>
                <ul>
                    <li v-for="it in resultListTemp">
                        <span class="vc-dropdown-multi-result-text">{{it.label}}</span>
                        <span class="vc-dropdown-multi-result-delete" @click.stop="onDelete(it)"></span>
                    </li>
                </ul>
            </div><!-- 已选展示 end -->

            <!-- 确定取消按钮 -->
            <div v-if="hasFooter" class="vc-dropdown-multi-footer">
                <pv-button :type="'primary'" @click.stop="_onOk">
                    {{okText}}
                </pv-button>
            </div><!-- 确定取消按钮 End -->
        </div>
        <!-- 多选 end -->
    </div>
</template>

<script>
    import {componentBaseParamConfig, alias, name2Alias} from '../base-config';
    import pvSearch from '../search';
    import pvButton from '../button';

    export default {
        props: Object.assign({}, componentBaseParamConfig, alias, {
            size: {
                type: String,
                default: 'normal'
            },
            data: {
                type: Object,
                default: {
                    optsList: []
                }
            },
            value: {
            },
            onSelect: {
                type: Function
            },
            isDisabled: {
                type: Boolean,
                default: false
            },
            isOpened: {
                type: Boolean,
                default: false
            },
            isMultiple: {
                type: Boolean,
                default: false
            },
            resultList: {
                type: Array,
                default() {
                    return [];
                }
            },
            hasFooter: {
                type: Boolean,
                default: true
            },
            okText: {
                type: String,
                default: '确 定'
            },
            onOk: {
                type: Function
            },
            hasSearch: {
                type: Boolean,
                default: true
            },
            filter: {}
        }),

        data () {
            let _this = this;
            return {
                curIndex: (function() {
                    return _this.data.optsList.findIndex(function(it) {
                        return it.value == _this.value;
                    });
                })(),
                // 多选,记录哪些选项呗选中的index
                indexList: [],
                // 临时存选择结果,为了确定和取消
                resultListTemp: Array.from(this.resultList),
                // search 样式控制
                searchAppendStyle: {
                    float: 'right',
                    margin: '10px 10px 5px 0',
                    width: '200px'
                }
            }
        },

        computed: {
            sizeClass() {
                const sizeMap = {
                    'normal': '',
                    'large': 'vc-switch-lg',
                    'small': 'vc-switch-sm"'
                };

                return sizeMap[this.size]
            },

            showData() {
                var _this = this;
                name2Alias(this.data.optsList, this.asValue, this.asLabel);

                if(!this.filter) return this.data;
                if(Object.prototype.toString.call(this.filter) === '[object Function]') {
                    return {
                        optsList: this.filter(this.data)
                    };
                } else {
                    return {
                        optsList: (this.filter === '' || this.filter === '请选择') ? this.data.optsList : this.data.optsList.filter((it) => {return it.label && it.label.includes(_this.filter)})
                };
                }
            }
        },

        methods: {
            onClick() {
                if(this.isDisabled) return;

                this.isOpened = true;
            },

            onSelected (index, item){
                let opts = this.showData.optsList;

                if(opts[index].isDisabled) return;

                if(opts[index].value === undefined) console.warn('%c the value is undefinde, please check it!', 'color: red;');

                // 多选
                if(this.isMultiple) {
                    if(!this.indexList.includes(index)) {
                        this.resultListTemp.push(opts[index]);
                        this.indexList.push(index);
                    } else {
                        this.indexList.$remove(index);
                        const existIndex = this.resultListTemp.findIndex((it) => {return it.value === opts[index].value});
                        if(existIndex >= 0) this.resultListTemp.splice(existIndex, 1);
                        this.resultListTemp.$remove(item);
                    }
                } else {
                    this.value = opts[index].value;
                    this.isOpened = false;
                    this.onSelect && this.onSelect(index, opts[index]);
                    this.curIndex = index;
                }


            },

            renderLi(index) {
                let opts = this.showData.optsList;
                let curObj = opts[index];

                if(curObj.renderLi && typeof curObj.renderLi == 'function') {
                    return curObj.renderLi(index, opts[index]);
                } else {
                    return curObj.label || curObj.value;
                }
            },

            _onOk() {
                this.resultList = Array.from(this.resultListTemp);
                this.onOk && this.onOk(this.resultListTemp);
                this.isOpened = false;
            },

            onClear() {
                this.resultListTemp.splice(0);
                this.indexList.splice(0);
            },
            onDelete(item) {
                let opts = this.showData.optsList;
                // 删除展示list中的数据
                const realIndex = opts.findIndex((it) => {return it.value === item.value});
                if(realIndex >= 0) {
                    this.indexList.splice(this.indexList.findIndex((it) => {return it === realIndex}), 1);
                }
                // 删除结果暂存列表中数据
                const existIndex = this.resultListTemp.findIndex((it) => {return it.value === item.value});
                if(existIndex >= 0) this.resultListTemp.splice(existIndex, 1);
            }
        },

        ready() {
            let _this = this;

            document.addEventListener('click', function() {
                _this.isOpened = false
            });
        },

        watch: {
            isOpened() {
                if(!this.isMultiple) return;

                this.indexList = (() => {
                            let res = [];
                this.data.optsList.map((it, index) => {
                    if(this.resultList.find((el) => {
                    return el.value == it.value;
            })) {
                    res.push(index);
                }
            });

                return res;
            })();

                this.resultListTemp = Array.from(this.resultList);
            }
        },

        components: {
            pvButton,
            pvSearch
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>