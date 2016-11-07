<template>
    <div>
        <h3>常规 {{time1}}</h3>
        <v-datepicker v-model="time1" :disable-filter="disableFilter" :is-force-refresh="true"></v-datepicker>
        <h3>带时分秒</h3>
        <v-datepicker v-model="time" :format="'YYYY/MM/DD hh:mm:ss'"></v-datepicker>
        <h3>范围选择</h3>
        <v-datepicker :is-range="true"
                      :disable-filter="disableFilter"
                      :range-data="rangeData"
                      :format="'YYYY/MM/DD hh:mm:ss'"></v-datepicker>

        <a class="demo-link" href="../components/template.html">组件连接</a>
    </div>
</template>

<script>
    import vDatepicker from '../../src/components/datepicker';

    export default {
        components: {
            vDatepicker
        },
        data() {
            return {
                rangeData: {
                    endTime: '2016-10-30',
                    startTime: '2016-09-27',
                },
                time1: '',
                time: '2015/12/12'
            }
        },
        methods: {
            disableFilter(date) {
                if(this.xx) {
                    return date.getDay() === 0 || date.getDay() === 6;
                } else {
                    return false;
                }

            }
        },
        mounted() {
            setTimeout(() => {
                this.startTime = '2016-10-1';
                this.endTime = '2016-11-1';
                this.xx = true;
            }, 5000)
        }
    }
</script>