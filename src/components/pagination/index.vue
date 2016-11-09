<!--
   分页栏 组件

   @param {Boolean} isShow 是否显示分页栏组件
   @param {Function} onPageChange 当选择分页时调用
   @param {Number} pageSizeShow 每页的大小
   @param {Number} currentPage 当前页的页码
   @param {Number} total 总页数
   @param {Array} pageSizeObject 页数选择select部分的下拉框数据
   @param {Function} onSizeChange 当前页显示多少条下拉列表变更事件
-->

<template>
    <div class="vc-pagination" v-if="isShow">
        <div class="vc-pagination-records">
            共<em>{{total}}</em>条记录，每页显示
            <pv-select :data="pageSizeObject" v-model="pageSizeShow" :on-select="_onSizeChange"></pv-select>
            条
        </div>

        <div class="vc-pagination-btns">
            <a class="vc-pagination-btns-first"
               href="javascript:void(0);"
               @click="selectPage(1)"></a>

            <a class="vc-pagination-btns-prev"
               href="javascript:void(0);"
               @click="jumpPrev"></a>

            <a v-for="num in pageNums"
               track-by="$index"
               href="javascript:void(0);"
               :class="{'vc-pagination-btns-dot': num == '...',
                'vc-pagination-btns-active': currentPageShow == num}"
               @click="selectPage(num)">{{num}}</a>

            <a class="vc-pagination-btns-next"
               href="javascript:void(0);"
               @click="jumpNext"></a>

            <a href="javascript:void(0);"
               class="vc-pagination-btns-last"
               @click="selectPage(totalNum)"></a>
            <span class="vc-pagination-btns-records">共<em>{{totalNum}}</em>页</span>
        </div>
    </div>
</template>

<script>
    import pvSelect from '../select/';
    import {componentBaseParamConfig, alias} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            isShow: {
                type: Boolean,
                default: true
            },
            onPageChange: {
                type: Function
            },
            pageSize: {
                type: Number,
                default: 5
            },
            currentPage: {
                type: Number,
                default: 1
            },
            total: {
                type: Number,
                default: 0
            },
            onSizeChange: {
                type: Function
            },
            pageSizeObject: {
                type: Array,
                default() {
                    return [{
                        value: 5
                    }, {
                        value: 10
                    }, {
                        value: 15
                    }]
                }
            }
        }),

        data() {
            return {
                currentPageShow: this.currentPage,
                pageSizeShow: this.pageSize
            }
        },

        watch: {
            pageSize(v) {
                this.pageSizeShow = v;
            },
            currentPage(v) {
                this.currentPageShow = v;
            }
        },

        components: {
            pvSelect
        },

        computed: {
            totalNum() {
                return Math.ceil(this.total / this.pageSizeShow)
            },
            pageNums() {
                let pageNums = [1,2];

                let totalNum = this.totalNum;

                let beginIndex = this.currentPageShow - 2;
                let endIndex = this.currentPageShow + 2;
                beginIndex = beginIndex < 1 ? 1 : beginIndex;
                endIndex = endIndex > totalNum ? totalNum : endIndex;

                if (totalNum < 3) {
                    // 没有 ... 的情况
                    pageNums = [];
                    for (let index = beginIndex; index < endIndex+1; index++) {
                        pageNums.push(index);
                    }

                } else {

                    if (beginIndex - 2 > 1) {
                        // add ...
                        pageNums.push('...');
                    }

                    for (let index = beginIndex; index < endIndex + 1; index++ ) {
                        if (index > 2 && index < totalNum) {
                            pageNums.push(index);
                        }
                    }

                    if (totalNum - endIndex > 1) {
                        pageNums.push('...');
                    }

                    pageNums.push(totalNum);
                }

                return pageNums;
            }
        },

        methods: {
            selectPage(num) {
                if (num === '...') {
                    return;
                }
                this.currentPageShow = num;
                this.onPageChange && this.onPageChange(this.currentPageShow)
            },

            jumpPrev() {
                this.currentPageShow = (this.currentPageShow - 1 > 0 ? this.currentPageShow - 1 : 1);
                this.onPageChange && this.onPageChange(this.currentPageShow)

            },

            jumpNext() {
                this.currentPageShow = (this.currentPageShow + 1 > this.totalNum ? this.totalNum : this.currentPageShow + 1 );
                this.onPageChange && this.onPageChange(this.currentPageShow)

            },
            _onSizeChange(val) {
                this.pageSizeShow = val;
                this.currentPageShow = 1;
                this.onPageChange && this.onPageChange(1);
                this.onSizeChange && this.onSizeChange(val);
            }
        }
    }
</script>

<style lang="scss">
    @import "style.scss";
</style>
