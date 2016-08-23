<!--
  radio 组件
  @param {Array} data 传入radio组件数据,用于渲染
  @param {Array} resultList 传入结果数组,用于接收设置和接收结果,当isMultiple为false时,返回数组中只有一个值
  @param {Boolean} isVertical radio组横向(false)排列还是纵向(true),默认为横向
  @param {Boolean} isMultiple radio返回数组中的值是一个还是多个
  @param {String | Number} value 当不传入resultList时,传入的值为value.sync
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
  <div v-for="it in data" track-by="$index" :style="appendStyle" :class="[appendClass]">
    <label class="tbd-label" :class="{'tbd-label-checked': it.value === (resultList ? resultList[isMultiple ? $index : 0] : value), 'tbd-label-disabled': it.isDisabled}"
           @click.stop="check($index, value)">
      <span class="tbd-radio"></span>
      <span class="tbd-label-text">
          {{{it.label}}}
      </span>
    </label>
  </div>
</template>

<script>
  import {componentBaseParamConfig, alias, name2Alias} from 'components/base-config';

  export default {
    props: Object.assign({}, componentBaseParamConfig, alias, {
      data: {
        type: Array
      },
      resultList: {
        type: Array
      },
      isVertical: {
        type: Boolean,
        default: false
      },
      isMultiple: {
        type: Boolean,
        default: false
      },
      value: {}
    }),

    beforeCompile() {
      name2Alias(this.data, this.asValue, this.asLabel);
    },

    compiled() {
      this.appendStyle = Object.assign({}, this.appendStyle, {
        display: this.isVertical ? 'block' : 'inline-block'
      })
    },

    watch: {
      isVertical() {
        this.appendStyle = Object.assign({}, this.appendStyle, {
          display: this.isVertical ? 'block' : 'inline-block'
        })
      }
    },

    data () {
      return {
        isDisabled: ''
      }
    },

    methods: {
      check(index, value) {
        if(this.data[index].isDisabled) return;

        if(this.isMultiple) {
          this.resultList.$set(index, this.data[index].value);
        } else {
          if(this.resultList) {
            this.resultList.$set(0, this.data[index].value);
          } else {
            this.value = this.data[index].value;
          }
        }
      }
    }
  }
</script>

<style scoped>
  @import "style.css";
</style>