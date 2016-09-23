<template>
    <v-progress :progress="20"></v-progress>
    <v-progress :size="'large'" :progress="30"></v-progress>
    <v-progress :progress="40" :title="'标题'" :info="'啦啦'"></v-progress>
    <v-progress :progress="40" :is-show-text="true" :is-active="true"></v-progress>
    <v-progress :type="'success'" :progress="50" :explain="'成功'"></v-progress>
    <v-progress :type="'error'" :progress="50" :explain="'失败'"></v-progress>
    <v-progress :type="'warn'" :progress="50" :explain="'警告'"></v-progress>
</template>

<script>
    import vProgress from '../../src/components/progress';

    export default {
        components: {
            vProgress
        },
        data() {
            return {

            }
        }
    }
</script>