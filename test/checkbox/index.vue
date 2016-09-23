<template>
    <section class="doc-part">
        <h3>checkbox: 横向{{checkboxResultList | json}}</h3>
        <v-checkbox :data="commonListData" :result-list.sync="checkboxResultList"></v-checkbox>
        <h3>checkbox: 横向使用别名{{checkboxResultList | json}}</h3>
        <v-checkbox :data="commonListData2" :as-value="'name'"
                    :as-label="'desc'" :result-list.sync="checkboxResultList"></v-checkbox>
        <h3>checkbox: 纵向{{checkboxResultList | json}}</h3>
        <v-checkbox :data="commonListData" :result-list.sync="checkboxResultList" :is-vertical="true"></v-checkbox>
    </section>
</template>

<script>
    import vCheckbox from '../../src/components/checkbox';

    export default {
        components: {
            vCheckbox
        },
        data() {
            return {
                checkboxResultList: [0, 2],
                // checkbox / radio data
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
                }]
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