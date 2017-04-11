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
   @param {Function} onSelectAll 全选事件，只有在hasAllSelect为true时可用，传入全选checkbox框的值
   @param {Number} currentPage 当前组件停留页
   @param {Number} pageSize 每一页展示多少条数据
   @param {Number} total 总页数
   @param {Function} onSizeChange 当每页页数变化时产生的数据
   @param {Boolean} isShowPagination 是否显示分页栏
   @param {Boolean} isReal 是否采用真分页,如果真分页,则每次传入数据都以外部为准
   @param {Boolean} hasAllSelect 是否展示全选框和每行前的勾选框
   @param {Function} trClick 行点击事件,会传入行的数据
   @param {Function} onCheckboxClick 组件前勾选框点击事件
   @param {String} emptyText 空数据提示,可以传入html
   @param {Number} colsNum 列的数量
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div>
        <div :style="appendStyle" :class="['vc-table', appendClass]">
            <div class="cols vc-hidden" ref="hiddenCols" v-if="colsHidden">
                <slot></slot>
            </div>
            <div class="vc-table-body">
                <pv-table-header :header="header" :body="body" :on-select-all="onSelectAll" :has-select-all="hasSelectAll"></pv-table-header>
                <!-- 没有数据提示 -->
                <div v-show="!data || data.length === 0" class="vc-table-empty-text" v-html="emptyText">
                </div>
                <pv-table-body v-show="data && data.length > 0" :body="body" :data="data" :page-size="pageSizeShow" :has-select-all="hasSelectAll"
                               :current-page="currentPageShow"></pv-table-body>
            </div>
        </div>

        <pv-pagination :total="totalNum"
                       v-if="isShowPagination"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :on-size-change="onSizeChangeFn"
                       :on-page-change="onPageChangeFn"></pv-pagination>
    </div>
</template>

<script>
    import pvPagination from '../pagination'
    import pvCheckbox from '../checkbox'
    import pvTableHeader from './header'
    import pvTableBody from './body'
    import {componentBaseParamConfig} from '../base-config';

    export default {
        components: {
            pvPagination,
            pvTableHeader,
            pvTableBody
        },
        props: Object.assign({}, componentBaseParamConfig, {
            isShowPagination: {
                type: Boolean,
                default: true
            },
            onChangePage: {
                type: Function,
                default() {}
            },
            onSizeChange: {
                type: Function,
                default() {}
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
            data: {
                type: Array,
                default() {
                    return []
                }
            },
            colsNum: Number,
            hasSelectAll: {
                type: Boolean,
                default: false
            },
            emptyText: {
                type: String,
                default: '没有数据,请重新查询'
            },
            onSelectAll: {
                type: Function,
                default: () => {
                    return;
                }
            }
        }),

        data() {
            return {
                header: [],
                body: [],
                totalNum: this.total || this.data.length,
                pageSizeShow: this.pageSize,
                currentPageShow: this.currentPage,
                colsHidden: true
            }
        },

        methods: {
            onSizeChangeFn(val) {
                this.pageSizeShow = val;
                this.onSizeChange && this.onSizeChange(val);
            },
            onPageChangeFn(val) {
                this.currentPageShow = val;
                this.onPageChange && this.onPageChange(val);
            }
        },

        mounted() {
            this.data.forEach((it, index) => {
                it.index = index;
            });

            this.colsHidden = false;
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>