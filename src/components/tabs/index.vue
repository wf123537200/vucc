<!--
  tabs 选项卡组件

  @param {String} [type=default|primary|outline|error|link] 按钮的类型
  @param {String} [size=normal|large|small] 按钮的大小
  @param {Number} activeIndex 当前选中的标签页索引
  @param {String} appendClass 自定义class
  @param {Object} appendClass 自定义Style对象
-->
<template>
    <!-- tabs头部-->
    <div :class="['vc-tabs vc-tabs-top', type, appendClass, size]">
        <div class="vc-tabs-bar">
            <!-- 额外操作 -->
            <div class="vc-tabs-extra-content">
                <slot name="operate"></slot>
            </div>

            <!-- 内容头部分 -->
            <div class="vc-tabs-nav-container" >
                <div class="vc-tabs-nav-wrap" >
                    <div class="vc-tabs-nav-scroll">
                        <div class="vc-tabs-nav" @click.stop="selectTab(curIndex, $event)">
                            <slot name="header"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 切换tab内容部分 -->
        <div class="vc-tabs-content" >
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            type: {
                type: String,
                default: 'line'
            },
            size: {
                type: String,
                default: 'normal'
            },
            activeIndex: {
                type: Number,
                default: 0
            },
            onChange: {
                type: Function
            }
        }),

        data() {
            return {
                curIndex: this.activeIndex
            }
        },

        methods: {
            selectTab(index, event) {
                if(!event) {
                    this.$el.querySelector('.vc-tabs-tab-active').className = this.$el.querySelector('.vc-tabs-tab-active').className.replace(/\s?vc-tabs-tab-active\s?/, '');

                    event = {};
                    event.target = this.$el.querySelector('.vc-tabs-nav > [slot=header]').children[index];
                    event.target.className += ' vc-tabs-tab-active';

                    return;
                }

                let selectIndex = +(event.target.getAttribute('tab_index'));
                if(selectIndex === null) {
                    selectIndex  = +(event.target.parentElement.getAttribute('tab_index'));
                }

                if(selectIndex === null || (event.type && selectIndex === +index)) return;

                // switch header
                this.$el.querySelector('.vc-tabs-tab-active').className = this.$el.querySelector('.vc-tabs-tab-active').className.replace(/\s?vc-tabs-tab-active\s?/, '');
                this.$el.querySelector('.vc-tabs-nav [slot=header] > :nth-child(' + (selectIndex + 1) + ')').className += ' vc-tabs-tab-active ';

                // switch context
                let oldContextEl = this.$el.querySelector('.vc-tabs-content > :nth-child(' + (index + 1) + ')');
                oldContextEl.setAttribute('class',  oldContextEl.className + ' vc-tabs-tabpane-hidden ');
                let curContextEl = this.$el.querySelector('.vc-tabs-content > :nth-child(' + (selectIndex + 1) + ')');
                curContextEl.setAttribute('class',  curContextEl.className.replace(/\s?vc-tabs-tabpane-hidden\s?/, ''));

                this.curIndex = selectIndex;

                this.onChange && this.onChange(this.curIndex);
            }
        },

        ready() {
            this.type = {
               'line' : 'vc-tabs-line',
               'card' : 'vc-tabs-card',
               'panel' : 'vc-tabs-panel'
            }[this.type];

            this.size = {
               'normal': '',
               'large': 'vc-tabs-lg',
               'small': 'vc-tabs-sm'
            }[this.size];

            // header slot 样式填充和插入,并绑定事件
            const tabHeader = this.$el.querySelector('.vc-tabs-nav > [slot=header]');
            let temp = '';
            let _this = this;

            tabHeader.children && Array.from(tabHeader.children).forEach(function(el, index) {
                el.className += ' vc-tabs-tab-inner ';
                el.setAttribute('tab_index', index);

                if(index == _this.activeIndex) {
                    _this.curIndex = +index;
                    temp += '<div class="vc-tabs-tab vc-tabs-tab-active" >' + el.outerHTML + '</div>';
                } else {
                    temp += '<div class="vc-tabs-tab" >' + el.outerHTML + '</div>';
                }
            });

            tabHeader.innerHTML = temp;

            // panes class 绑定
            const tabPanes = this.$el.querySelector('.vc-tabs-content');
            let panes = '';
            tabPanes.children && Array.from(tabPanes.children).forEach(function(el, index) {
                if(index !== _this.curIndex) {
                    el.className += ' vc-tabs-tabpane-hidden ';
                }

            });

            if(_this.curIndex === 0) _this.selectTab(_this.activeIndex || 0);
        },

        watch: {
            activeIndex(val) {
                this.selectTab(+val)
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>