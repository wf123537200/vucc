<template>
    <div>
        <v-time-line :text-type="'left'" :data="timeLineData"></v-time-line>

        <a class="demo-link" href="../components/time-line.html">组件连接</a>
    </div>
</template>

<script>
    import vTimeLine from '../../src/components/time-line';

    export default {
        components: {
            vTimeLine
        },
        data() {
            return {
                timeLineData: [`<a style="color: red;">我们发布了alpha \n\r 再试试</a>`, '我们发布了beta']
            }
        }
    }
</script>