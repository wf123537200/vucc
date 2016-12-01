<!--
  input 扩展input

  @param {String} type input类型
  @param {String} size 输入框的大小
  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <input :type="type" :style="appendStyle" :class="['vc-input', sizeClass, appendClass]" @input="onInput">
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig, {
            type: {
                type: String,
                default: 'text'
            },
            size: {
                type: String,
                default: ''
            }
        }),
        data() {
            return {
                sizeClass: {
                    small: 'vc-input-sm',
                    large: 'vc-input-lg'
                }[this.size]
            }
        },
        methods: {
            onInput(event) {
                this.$emit('input', event.target.value)
            }
        }

    }
</script>

<style lang="sass">
    @import "style.scss";
</style>