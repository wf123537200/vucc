<!--
  button-group 组件
  @requires button

  @param {Array} data 用于渲染的数据
    ex:
        [{
          text: 'btn1',
          icon: 'android',
          onClick: function() {
            alert('btn1')
          }
        }, {
          text: 'btn2',
          icon: 'apple',
          isSelected: true,
          onClick: function() {
            alert('btn2')
          }
        }, {
          text: 'btn3',
          icon: 'android',
          onClick: function() {
            alert('btn3')
          },
          isDisabled: true
        }]
  @param {String} appendClass 自定义class
  @param {Object} appendClass 自定义Style对象
-->
<template>
    <div :class="['tbd-btn-group', appendClass]" :style="appendStyle">
        <v-button v-for="it in data" :append-class="$index === curBtnIndex ? 'tbd-btn-primary' : ''"
                  @click="it.onClickWarp($index)"
                  :size="size"
                  :is-disabled="it.isDisabled">
            <span>{{it.text}}</span>
        </v-button>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import vButton from '../button';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            size: {
                type: String,
                default: 'normal'
            },
            data: {
                type: Array
            }
        }),

        data() {
            var _this = this;

            return {
                curBtnIndex: (function(){
                    let ins = 0;
                    _this.data.map(function(it, index) {
                        if(it.isSelected) ins = index;
                    });

                    return ins;
                })()
            }
        },

        beforeCompile() {
            const _this = this;

            this.data.map(function(it) {
                if(it.isDisabled) return it.onClickWarp = function() {};

                it.onClickWarp = function(index) {
                    _this.curBtnIndex = index;

                    it.onClick();
                }
            });
        },

        components: {
            vButton
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>