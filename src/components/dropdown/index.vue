<!--
  select 下拉列表
  @param {Array} data 传入组件数据,用于渲染
  @param {String} size 组件大小
  @param {String} value 绑定外部数据对象的结果
  @param {Boolean} isDisabled 当前下拉列表是否可选
  @param {Boolean} isMultiple value返回数组中的值是一个还是多个
  @param {Boolean} isOpened 下拉列表是否显示
  @param {Function} onSelect 当下拉列表选中后调用,调用后会将列表隐藏
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <div :style="appendStyle"
         :class="['tbd-select', appendClass, sizeClass, {'tbd-select-disabled': isDisabled, 'tbd-dropdown-wrap-open': isOpened}]"
         @click.stop="onClick">
      <slot></slot>
      <div class="tbd-dropdown" :class="{'hide': !isOpened}">
        <ul class="tbd-dropdown-menu">
            <li v-if="data.optsList.length === 0">
                没有数据....
            </li>
            <li v-for="it in data.optsList" value="it.value"
                :class="['tbd-dropdown-menu-item', {'tbd-dropdown-menu-item-disabled': it.isDisabled, 'tbd-dropdown-menu-item-active': $index === curIndex}]"
                @click.stop="onSelected($index)">
                {{{renderLi($index)}}}
            </li>
        </ul>
      </div>
   </div>
</template>

<script>
import {componentBaseParamConfig} from '../base-config';

export default {
    props: Object.assign({}, componentBaseParamConfig, {
        isDisabled: {
            type: Boolean,
            default: false
        },
        isMultiple: {
            type: Boolean,
            default: false
        },
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
        isOpened: {
            type: Boolean,
            default: false
        }
    }),

    data () {
        let _this = this;
        return {
            curIndex: (function() {
                return _this.data.optsList.findIndex(function(it) {
                    return it.value == _this.value;
                });
            })()
        }
    },

    computed: {
        sizeClass() {
            const sizeMap = {
                'normal': '',
                'large': 'tbd-switch-lg',
                'small': 'tbd-switch-sm"'
            };

            return sizeMap[this.size]
        }
    },

    methods: {
        onClick() {
            this.isOpened = true;
        },

        onSelected (index){
            let opts = this.data.optsList;

            if(opts[index].isDisabled) return;

            this.curIndex = index;
            this.value = opts[index].value;
            this.onSelect && this.onSelect(index, opts[index]);
            this.isOpened = false;
        },

        renderLi(index) {
            let opts = this.data.optsList;
            let curObj = opts[index];

            if(curObj.renderLi) {
                return curObj.renderLi(index, opts[index]);
            } else {
                return curObj.label || curObj.value;
            }
        }
    },

    ready() {
        let _this = this;

        document.addEventListener('click', function() {
            _this.isOpened = false
        });
    }
}
</script>

<style scoped>
    @import "style.css";
</style>