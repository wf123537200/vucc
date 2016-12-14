<template>
    <div>
        <v-progress :progress="20"></v-progress>
        <v-progress :size="'large'" :progress="30"></v-progress>
        <v-progress :progress="40" :title="'标题'" :info="'啦啦'"></v-progress>
        <v-progress :progress="40" :is-show-text="true" :is-active="true"></v-progress>
        <v-progress :type="type" :progress="50" :explain="'成功'"></v-progress>
        <v-progress :type="'error'" :progress="50" :explain="'失败'"></v-progress>
        <v-progress :type="'warn'" :progress="50" :explain="'警告'"></v-progress>

        <a class="demo-link" href="../components/progress.html">组件连接</a>
    </div>
</template>

<script>
    import vProgress from '../../src/components/progress';

    export default {
        components: {
            vProgress
        },
        data() {
            return {
                type: ''
            }
        },
        mounted() {
            setTimeout(() => {
                this.type = 'success';
            }, 2000);
        }
    }
</script>