<!--
  textarea 扩展textarea

  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <textarea :style="appendStyle" :class="['vc-textarea', sizeClass, appendClass]"></textarea>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig)
    }
</script>

<style scoped>
    @import "style.css";
</style>