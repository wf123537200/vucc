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
  <div>
    <div v-for="(it, index) in data" track-by="index" :style="_appendStyle" :class="[appendClass]">
      <label class="vc-label" :class="{'vc-label-checked': it.value === (resultList ? resultList[isMultiple ? index : 0] : value), 'vc-label-disabled': it.isDisabled}"
             @click.stop="check(index, value)">
        <span class="vc-radio"></span>
        <span class="vc-label-text" v-html="it.label">
        </span>
      </label>
    </div>
  </div>
</template>

<script>
  import {componentBaseParamConfig, alias, name2Alias} from '../base-config';
  import Vue from 'vue';

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

    created() {
      name2Alias(this.data, this.asValue, this.asLabel);
    },

    computed: {
      _appendStyle() {
        return Object.assign({}, this.appendStyle, {
          display: this.isVertical ? 'block' : 'inline-block'
        });
      }
    },

    watch: {
      isVertical() {
        this.appendStyle = Object.assign({}, this.appendStyle, {
          display: this.isVertical ? 'block' : 'inline-block'
        })
      },
      data() {
        // 为了解决异步刷新问题
        name2Alias(this.data, this.asValue, this.asLabel);
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
          Vue.set(this.resultList, index, this.data[index].value);
        } else {
          if(this.resultList) {
            Vue.set(this.resultList, 0, this.data[index].value);
          } else {
            this.$emit('input', this.data[index].value);
          }
        }
      }
    }
  }
</script>

<style lang="sass">
  @import "style.scss";
</style>