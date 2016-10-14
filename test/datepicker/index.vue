<template>
    {{time1}}
    <v-datepicker :time.sync="time1" :disable-filter="disableFilter" :is-force-refresh="true"></v-datepicker>
    {{time1}}
    <v-datepicker :is-disabled="true" :time.sync="time1" :disable-filter="disableFilter" :is-force-refresh="true"></v-datepicker>

    {{time}}
    <v-datepicker :time.sync="time" :format="'YYYY/MM/DD hh:mm:ss'"></v-datepicker>


    {{startTime}} -- {{endTime}}
    <v-datepicker :is-range="true" :start-time.sync="startTime"
                  :disable-filter="disableFilter"
                  :end-time.sync="endTime"
                  :format="'YYYY/MM/DD hh:mm:ss'"></v-datepicker>

    {{startTime}} -- {{endTime}}
    <v-datepicker :is-range="true" :start-time.sync="startTime"
                  :disable-filter="disableFilter"
                  :end-time.sync="endTime"
                  :format="'YYYY/MM/DD'"></v-datepicker>
</template>

<script>
    import vDatepicker from '../../src/components/datepicker';

    export default {
        components: {
            vDatepicker
        },
        data() {
            return {
                startTime: '2016-09-27',
                endTime: '2016-10-30',
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
        ready() {
            setTimeout(() => {
                this.startTime = '2016-10-1';
                this.endTime = '2016-11-1';
                this.xx = true;
            }, 5000)
        }
    }
</script>