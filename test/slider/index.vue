<template>
    <div style="left: 10px; top: 200px; width: 400px;">
        <v-slider min="100" max="1000" :value.sync="sliderValue" :text="'px'"></v-slider>
    </div>
    <input type="text" style="margin-top:20px;" v-model="sliderValue"></input>
    <div style="left: 10px; top: 200px; width: 400px;">
        <v-slider :value.sync="sliderValue2" :text="'px'" :value-list="sliderValueList"></v-slider>
    </div>
    <input type="text" style="margin-top:20px;" v-model="sliderValue2"></input>

    <a class="demo-link" href="../components/slider.html">组件连接</a>
</template>

<script>
    import vSlider from '../../src/components/slider';

    export default {
        components: {
            vSlider
        },
        data() {
            return {
                // slider
                sliderValue: 10,
                // 固定点阵的滑动输入条
                sliderValueList: [{
                    label: '0ms',
                    value: 0
                }, {
                    label: '25ms',
                    value: 25
                }, {
                    label: '50ms',
                    value: 50
                }, {
                    label: '100ms',
                    value: 100
                }, {
                    label: '200ms',
                    value: 200
                }, {
                    label: '400ms',
                    value: 400
                }, {
                    label: '1s',
                    value: 1000
                }, {
                    label: '2s',
                    value: 2000
                }],
                sliderValue2: 50
            }
        }
    }
</script>