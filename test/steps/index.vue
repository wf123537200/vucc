<template>
    <v-steps :data="stepsData"></v-steps>
    <v-steps :data="stepsData" :size="'small'"></v-steps>
    <v-steps :data="stepsData" :is-text-up="true" :size="'small'"></v-steps>
    <v-steps :data="stepsData" :append-style="{'margin-left': '30%!important'}" :is-vertical="true"></v-steps>

    <a class="demo-link" href="../components/steps.html">组件连接</a>
</template>

<script>
    import vSteps from '../../src/components/steps';

    export default {
        components: {
            vSteps
        },
        data() {
            return {
                stepsData: [{
                    order: 1,
                    title: '完成',
                    explain: '说明文字',
                    isFinished: true
                }, {
                    order: 2,
                    title: '进行中',
                    explain: '说明文字',
                    isActive: true
                }, {
                    order: 3,
                    title: '默认尺寸',
                    explain: '说明文字'
                }]
            }
        },
        mounted() {
            setTimeout(() => {
                this.stepsData = [{
                    order: 1,
                    title: '完成',
                    explain: '说明文字',
                    isFinished: true
                }, {
                    order: 2,
                    title: '进行中',
                    explain: '说明文字',
                    isFinished: true
                }, {
                    order: 3,
                    title: '默认尺寸',
                    explain: '说明文字',
                    isActive: true
                }]
            }, 2000)
        }
    }
</script>