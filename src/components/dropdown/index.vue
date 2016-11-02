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
         @click="onClick">
        <slot></slot>
        <!-- 单选 -->
        <div v-if="!isMultiple" class="vc-dropdown" :class="{'hide': !isOpened}">
            <ul class="vc-dropdown-menu">
                <li v-if="data.length === 0">
                    没有数据....
                </li>
                <li v-for="(it, index) in showData" value="it.value"
                    :class="['vc-dropdown-menu-item', {'vc-dropdown-menu-item-disabled': it.isDisabled, 'vc-dropdown-menu-item-active': index === curIndex}]"
                    @click.stop="onSelected(index)" v-html="renderLi(index)">
                </li>
            </ul>
        </div>
        <!-- 单选 end -->

        <!-- 多选 -->
        <div v-if="isMultiple" class="vc-dropdown vc-dropdown-multi" :class="{'hide': !isOpened}">
            <pv-button v-if="hasSearch" type="outline" :style="{margin: '10px', border: 0}">清空</pv-button>
            <pv-search v-if="hasSearch" v-model="filter" :append-style="searchAppendStyle" :size="'small'"></pv-search>

            <ul class="vc-dropdown-menu">
                <li v-if="data.length === 0">
                    没有数据....
                </li>
                <li v-for="(it, index) in showData" value="it.value"
                    :class="['vc-dropdown-menu-item', {'vc-dropdown-menu-item-disabled': it.isDisabled, 'vc-dropdown-menu-item-active': indexList.includes(index)}]"
                    @click.stop="onSelected(index, it)" v-html="renderLi(index)" :title="renderLi(index)">
                </li>
            </ul>

            <!-- 已选展示 -->
            <div class="vc-dropdown-multi-result">
                <span class="vc-dropdown-multi-result-title">已选:
                </span>
                <ul>
                    <li v-for="it in resultListTemp">
                        <span class="vc-dropdown-multi-result-text" :title="it.label">{{it.label}}</span>
                        <span class="vc-dropdown-multi-result-delete" @click.stop="onDelete(it)"></span>
                    </li>
                </ul>
            </div><!-- 已选展示 end -->

            <!-- 确定取消按钮 -->
            <div v-if="hasFooter" class="vc-dropdown-multi-footer">
                <pv-button :type="'primary'" @click.native.stop="_onOk" :append-style="{float: 'right'}">
                    {{okText}}
                </pv-button>
                <a v-if="!hasSearch" href="javascript: void 0;" @click.native.stop="onClear" class="vc-dropdown-multi-a">清空</a>
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
                type: Array,
                default:  []
            },
            onSelect: {
                type: Function
            },
            isDisabled: {
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
                    return _this.data.findIndex(function(it) {
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
                },
                isOpened: false
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
                name2Alias(this.data, this.asValue, this.asLabel);

                if(!this.filter) return this.data;
                if(Object.prototype.toString.call(this.filter) === '[object Function]') {
                    return this.filter(this.data)
                } else {
                    return (this.filter === '' || this.filter === '请选择') ? this.data : this.data.filter((it) => {
                        const tag = it.renderLi ? it.renderLi() : it.label;
                        return this.includeIgnore(tag, _this.filter);
                    })
                }
            }
        },

        methods: {
            includeIgnore(src, regx) {
                let reg = new RegExp(regx, 'i');

                return reg.test(src);
            },
            onClick() {
                if(this.isDisabled) return;

                this.$emit('isOpenedChange', this.isOpened = this.isMultiple ? true : !this.isOpened);
            },

            onSelected (index, item){
                let opts = this.showData;

                if(opts[index].isDisabled) return;

                if(opts[index].value === undefined) console.warn('%c the value is undefined, please check it!', 'color: red;');

                // 多选
                if(this.isMultiple) {
                    if(!this.indexList.includes(index)) {
                        this.resultListTemp.push(opts[index]);
                        this.indexList.push(index);
                    } else {
                        const insListIndex = this.indexList.findIndex((it) => {
                            return it === index;
                        });
                        this.indexList.splice(insListIndex, 1);
                        const existIndex = this.resultListTemp.findIndex((it) => {return it.value === opts[index].value});
                        if(existIndex >= 0) this.resultListTemp.splice(existIndex, 1);
                    }
                } else {
                    this.$emit('isOpenedChange', this.isOpened = false);
                    this.onSelect && this.onSelect(index, opts[index]);
                    this.curIndex = index;
                }


            },

            renderLi(index) {
                let opts = this.showData;
                let curObj = opts[index];

                if(curObj.renderLi && typeof curObj.renderLi == 'function') {
                    return curObj.renderLi(index, opts[index]);
                } else {
                    return curObj.label || curObj.value;
                }
            },

            _onOk() {
                this.onOk && this.onOk(this.resultListTemp);
                this.$emit('isOpenedChange', this.isOpened = false);
            },

            onClear() {
                this.resultListTemp.splice(0);
                this.indexList.splice(0);
            },
            onDelete(item) {
                let opts = this.showData;
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

        mounted() {
            let _this = this;

            document.addEventListener('click', function() {
                _this.$emit('isOpenedChange', _this.isOpened = false);
            });
        },

        watch: {
            isOpened() {
                if (!this.isMultiple) return;

                this.indexList = (() => {
                    let res = [];
                    this.data.map((it, index) => {
                        if (this.resultList.find((el) => {
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