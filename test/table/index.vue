<template>
    <v-table :page-size="10" :has-all-select="true" :on-checkbox-click="table.checkboxClick" :data="table.data" :columns="table.columns"></v-table>
</template>

<script>
    import vTable from '../../src/components/table';
    import Vue from 'vue';

    export default {
        components: {
            vTable,
        },
        data() {
            const _this = this;
            return {
                // table
                table: {
                    checkboxClick() {
                        console.log(arguments);
                    },
                    data: (function() {
                        var res = [];
                        for (let i = 0; i < 50; i++) {
                            res.push({
                                key: i,
                                name: `name${i}`,
                                age: 32,
                                address: `address${i}号`
                            });
                        }

                        return res;
                    })(),
                    columns: [{
                        title: '姓名',
                        style: {width: '200px'},
                        dataIndex: 'name',
                        render(text, item) {
                            return `<a href="#">${text}</a>`;
                        }
                    }, {
                        title: '年龄',
                        dataIndex: 'age'
                    }, {
                        title: '住址',
                        dataIndex: 'address'
                    }, {
                        title: '操作',
                        hasPartial: true,
                        render(text, item) {
                            var id = 'xxx' + Date.now();
                            Vue.partial(id, `<a class="vc-inline" @click="clicked(row)">操作一</a>
                                    <span class="vc-divider"></span>
                                  <a class="vc-inline">操作二</a>`);

                            return {
                                id,
                                functions: {
                                    clicked: _this.clicked
                                }
                            };
                        }
                    }]
                }
            }
        },
        methods: {
            clicked(item) {
                console.log(item)
            }
        }
    }
</script>