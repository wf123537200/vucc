<template>
    <section class="doc-part">
        <h3>复选框 checkbox: {{value}}</h3>
        <v-checkbox :data="[{label: '真'}]" v-model="value"></v-checkbox>
        <h3>复选框组 横向: {{checkboxResultList}}</h3>
        <v-checkbox :data="commonListData" :result-list="checkboxResultList"></v-checkbox>
        <h3>复选框组 纵向</h3>
        <v-checkbox :data="commonListData" :result-list="checkboxResultList" :is-vertical="true"></v-checkbox>
        <h3>复选框组(别名)</h3>
        <v-checkbox :data="commonListData2" :as-value="'name'"
        :as-label="'desc'" :result-list="checkboxResultList"></v-checkbox>

        <a class="demo-link" href="../components/checkbox.html">组件连接</a>
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
                value: true,
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
        mounted() {
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