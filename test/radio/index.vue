<template>
    <section class="doc-part">
        <h3>radio: 横向{{radioResultList | json}}</h3>
        <v-radio :data="commonListData" :result-list.sync="radioResultList"></v-radio>
        <h3>radio: 横向{{radioValue}}</h3>
        <v-radio :data="commonListData2" :as-value="'name'"
                 :as-label="'desc'" :value.sync="radioValue"></v-radio>
        <h3>radio: 纵向/多选{{radioMulResultList | json}}</h3>
        <v-radio :data="commonListData" :result-list.sync="radioMulResultList" :is-vertical="true" :is-multiple="true"></v-radio>
    </section>
</template>

<script>
    import vRadio from '../../src/components/radio';

    export default {
        components: {
            vRadio
        },
        data() {
            return {
                commonListData: [{
                    value: 0,
                    label: 'value0'
                }, {
                    value: 1,
                    label: '<a>111</a>'
                }, {
                    value: 2,
                    label: 'value1',
                    isDisabled: true
                }],

                commonListData2: [{
                    name: 0,
                    desc: 'value0'
                }, {
                    name: 1,
                    desc: '<a>111</a>'
                }, {
                    name: 2,
                    desc: 'value1',
                    isDisabled: true
                }],
                radioValue: 0,

                // radio
                radioResultList: [1],
                radioMulResultList: [0, '']
            }
        },
        methods: {
            switchChange(value) {
                console.log('Tab switch result is :', value)
            }
        },
        ready() {
            setTimeout(() => {
                this.commonListData = [{
                    value: 0,
                    label: 'value1'
                }, {
                    value: 1,
                    label: '<a>222</a>'
                }, {
                    value: 2,
                    label: 'value2',
                    isDisabled: true
                }];

                this.commonListData2 = [{
                    name: 0,
                    desc: 'value21123'
                }, {
                    name: 3,
                    desc: 'value2123123123'
                }];
            }, 3000)
        }
    }
</script>