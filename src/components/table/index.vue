<!--
   table 组件

   @param {Array} data 用于table tbody部分的数据渲染
   ex:
          data: [{
            key: 0,
            name: 'name0',
            age: 32,
            address: 'address0'
          }, {
            key: 1,
            name: 'name1',
            age: 33,
            address: 'address1'
          }]


   @param {Array} columns 用于table thead部分的渲染,并可以通过传入rander函数对数据进行渲染指定
   ex:
           columns: [{
                        title: '姓名',
                        dataIndex: 'name',
                        render(text, item) {
                          return `<a href="#">${text}</a>`;
                        }
                      }, {
                        title: '年龄',
                        dataIndex: 'age'
                      }, {
                        title: '住址',
                        dataIndex: 'address'
                      }, {
                        title: '操作',
                        render(text, item) {
                          return `<a class="vc-inline" @click="clickOperate">操作一</a>
                                    <span class="vc-divider"></span>
                                  <a class="vc-inline">操作二</a>`;
                        }
                    }]
   @param {Function} onChangePage 用于传入分页组件页面变更事件进行响应
   @param {Number} currentPage 当前组件停留页
   @param {Number} pageSize 总页数
   @param {Number} onSizeChange 当每页页数变化时产生的数据
   @param {Boolean} isShowPagination 是否显示分页栏
   @param {Boolean} isReal 是否采用真分页,如果真分页,则每次传入数据都以外部为准
   @param {Boolean} hasAllSelect 是否展示全选框和每行前的勾选框
   @param {Function} trClick 行点击事件,会传入行的数据
   @param {Function} onCheckboxClick 组件前勾选框点击事件
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div :style="appendStyle" :class="['vc-table', appendClass]">
        <div class="vc-table-body">
            <table>
                <thead>
                <tr>
                    <!-- 全选框 -->
                    <th v-if="hasAllSelect" style="width: 50px;">
                        <pv-checkbox :value.sync="selectAll"></pv-checkbox>
                    </th>
                    <th :style="col.style" v-for="col in cols" v-show="col.isShow === undefined">{{col.title}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in currentData" track-by="$index" @click.stop="trClick(row, currentData)">
                    <td v-if="hasAllSelect" @click.stop="itemClick(row.isChecked, row)">
                        <pv-checkbox :value.sync="row.isChecked"></pv-checkbox>
                    </td>
                    <td v-for="col in cols" v-show="col.isShow === undefined">
                        <span v-if="!col.hasPartial">{{{renderTD(col, row)}}}</span>
                        <span v-if="col.hasPartial">
                            <partial :name="renderTD(col, row).id"></partial>
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <pv-pagination :total.sync="totalNum"
                   v-if="isShowPagination"
                   :current-page.sync="currentPage"
                   :page-size.sync="pageSize"
                   :on-size-change="onSizeChange"
                   :on-change="onChangePage"></pv-pagination>
</template>

<script>
    import pvPagination from '../pagination'
    import pvCheckbox from '../checkbox'
    import {componentBaseParamConfig} from '../base-config';


    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            data: {
                type: Array
            },

            columns: {
                type: Array
            },

            onChangePage: {
                type: Function,
                default: function(index) {}
            },

            currentPage: {
                type: Number,
                default: 1
            },

            pageSize: {
                type: Number,
                default: 5
            },

            total: {
                type: Number
            },

            isShowPagination: {
                type: Boolean,
                default: true
            },
            onSizeChange: {
                type: Function,
                default() {}
            },
            hasAllSelect: {
                type: Boolean,
                default: false
            },
            selectAll: {
                type: Boolean,
                default: false
            },
            isReal: {
                type: Boolean,
                default: false
            },
            trClick: {
                type: Function,
                default() {
                    return () => {};
                }
            },
            onCheckboxClick: {
                type: Function,
                default() {
                    return () => {};
                }
            }
        }),

        data () {
            return {
                currentData: []
            }
        },

        beforeCompile() {
            // 初始化currentData
            // 每一个data增加key值,为了全选
            this.data.forEach((it) => {
                it.__el__id__ = Math.random().toString(36).substr(3)
            });
            this.refreshCurrentData();
        },

        watch: {
            data(val, newVal) {
                // 每一个data增加key值,为了全选
                this.data.forEach((it) => {
                    it.__el__id__ = Math.random().toString(36).substr(3)
                });
                // 表格数据变化 分页重置为默认
                this.refreshCurrentData();
            },
            pageSize() {
                this.refreshCurrentData();
            },
            currentPage() {
                this.refreshCurrentData();
            },
            selectAll(val) {
                if(!this.hasAllSelect) return;

                if(this.cancelSelectAll && !val) {
                    return this.cancelSelectAll = false;
                }

                this.currentData.forEach((it) => {
                    let temp = this.data.filter((el) => {
                        return el.__el__id__ === it.__el__id__;
                    });

                    temp[0].isChecked = it.isChecked = val;
                });
            }
        },

        methods: {
            refreshCurrentData() {
                this.currentData = [];

                if (this.data && this.data.length > 0) {
                    let temp = this.isReal ? this.data : this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);

                    temp.forEach((it, index) => {
                        this.currentData.push(Object.assign({}, {
                            isChecked: false
                        }, it))
                    });
                }

                this.selectAll = false;
            },
            itemClick(isChecked, item) {
                // 调用点击事件
                this.onCheckboxClick(isChecked, item);

                // 更新data内部值
                let temp = this.data.filter((el) => {
                    return el.__el__id__ === item.__el__id__;
                });

                temp[0].isChecked = isChecked;

                if(isChecked) return;

                this.selectAll = false;
                this.cancelSelectAll = true;


            }
        },

        components: {
            pvPagination,
            pvCheckbox
        },

        computed: {
            // 计算表头,如果没有传入表头,使用data数据的第一行进行绘制
            cols () {
                if (this.columns !== undefined) {
                    return this.columns
                }

                let cols = [];

                this.data[0] && (cols = Object.keys(this.data[0]).map((col) => {
                    return {
                        dataIndex: col,
                        title: col
                    }
                }));

                return cols;
            },

            totalNum () {
                // 真分页时
                if (this.total !== undefined) {
                    return this.total
                }

                // 非真分页时
                if (this.data && this.data.length > 0) {
                    return this.data.length
                }

                return 0
            },

            // 根据传入的渲染函数,对列进行渲染
            renderTD() {
                return (col, row) => {
                    if (col.render && typeof col.render === 'function') {
                        const renderRes = col.render(row[col.dataIndex], row);
                        if(col.hasPartial && renderRes.functions) {
                            for(let k in renderRes.functions) {
                                this[k] = renderRes.functions[k];
                            }
                        }

                        return renderRes;
                    } else {
                        return row[col.dataIndex]
                    }
                }
            },
            checkboxClickFn() {
                this.checkboxClick();
            }
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>