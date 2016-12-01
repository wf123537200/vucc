<!--
  checkbox 组件
  @param {Array<Object>} data 传入checkbox组件数据,用于渲染
      ex: [{
          value: 0,
          label: 'value0'
        }, {
          value: 1,
          label: 'value1'
        }, {
          value: 2,
          label: 'value2',
          isDisabled: true
        }]

  @param {Array} resultList 传入结果数组,用于接收设置和接收结果
  @param {value} value 如果没有传入resultList就使用value接收结果,如果有传入resultList相当于resultList[0]
  @param {Boolean} isVertical checkbox横向(false)排列还是纵向(true),默认为横向
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
  @param {String} asValue 自定义value key
  @param {String} asLabel 自定义label key
-->
<template>
  <div>
    <div v-for="(it, index) in data" track-by="index" :style="_appendStyle" :class="[appendClass]">
      <label class="vc-label" :class="{'vc-label-checked': (resultList && resultList.includes(it.value) || value === true), 'vc-label-disabled': it.isDisabled}"
             @click="toggleSwitch(index, it.value)">
        <span class="vc-checkbox"></span>
        <span class="vc-label-text" v-html="it.label || it.value">
        </span>
      </label>
    </div>
  </div>
</template>

<script>
  import {componentBaseParamConfig, alias, name2Alias} from '../base-config';

  export default {
    props: Object.assign({}, componentBaseParamConfig, alias, {
      data: {
        type: Array,
        default: function() {
          return [{
            value: false,
            label: ' '
          }];
        }
      },
      resultList: {
        type: Array
      },
      isVertical: {
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

    data () {
      return {
        isDisabled: ''
      }
    },

    watch: {
        data() {
          // 为了解决异步刷新问题
          name2Alias(this.data, this.asValue, this.asLabel);
        }
    },

    methods: {
      toggleSwitch(index, value) {
        if(this.data[index].isDisabled) return;

        if(this.resultList) {
          if(!this.resultList.includes(value)) {
            this.resultList.push(value);
          } else {
            const i = this.resultList.indexOf(value);
            this.resultList.splice(i, 1);
          }

          this.$emit('input', this.resultList[0]);
        } else {
          this.$emit('input', !this.value);
        }
      }
    }
  }
</script>

<style lang="sass">
  @import "style.scss";
</style>