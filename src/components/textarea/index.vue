<!--
  textarea 扩展textarea

  @param {Object} appendClass 自定义class
  @param {Object} appendStyle 自定义Style对象
-->
<template>
    <textarea :style="appendStyle" :class="['tbd-textarea', sizeClass, appendClass]"></textarea>
</template>

<script>
    import {componentBaseParamConfig} from 'components/base-config';

    export default {
        props: Object.assign({}, componentBaseParamConfig)
    }
</script>

<style scoped>
    @import "style.css";
</style>