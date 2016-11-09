<template>
    <section class="doc-part">
        <h3>单选框 select: {{dropDownValue}}</h3>
        <v-select @click.stop="buttonClick($event)" :data="dropDownData" :append-style="{width: '200px'}"
                  v-model="dropDownValue"></v-select>
        <h3>单选框 (别名)</h3>
        <v-select :data="dropDownData2"
                  :as-label="'desc'":append-style="{width: '200px'}" v-model="dropDownValue"></v-select>
        <h3>单选框禁用</h3>
        <v-select :data="dropDownData" :is-disabled="true" v-model="dropDownValue"></v-select>

        <h3>单选框可输入搜索</h3>
        <v-select :data="dropDownData" :is-edit-able="true" v-model="dropDownValue"></v-select>

        <a class="demo-link" href="../components/select.html">组件连接</a>
    </section>
</template>

<script>
    import vSelect from '../../src/components/select';

    export default {
        components: {
            vSelect
        },
        data() {
            return {
                // dropdown
                dropDownData: [{
                    value: 0,
                    label: 0
                }, {
                    value: 1,
                    label: 'value1',
                    renderLi: function () {
                        return `<a>111</a>`
                    }
                }, {
                    value: 2,
                    label: 'value2',
                    isDisabled: true
                }],

                dropDownData2: [{
                    value: 0,
                    desc: 'value0'
                }, {
                    value: 1,
                    desc: 'value1',
                    renderLi: function () {
                        return `<a>111</a>`
                    }
                }, {
                    value: 2,
                    desc: 'value2',
                    isDisabled: true
                }],

                dropDownValue: 0
            }
        },
        methods: {
            buttonClick() {
                console.log(arguments)
            }
        },
        mounted() {
            // 动态化兼容测试
            setTimeout(() => {
                this.dropDownData = [{
                    value: 0,
                    label: 'change1'
                }, {
                    value: 1,
                    label: 'change2',
                    renderLi: function () {
                        return `<a>222</a>`
                    }
                }, {
                    value: 2,
                    label: 'change3',
                    isDisabled: true
                }]
            }, 3000);
        }
    }
</script>