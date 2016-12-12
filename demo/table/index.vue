<template>
    <div>
        <v-table :page-size="10" :has-all-select="true" :cols-num="5" :on-checkbox-click="table.checkboxClick" :data="table.data" :has-select-all="true">
            <v-table-columns :prop="'key'" :label="'索引'" :td-style="{width: '100px', color: 'red'}" :is-sort="true"></v-table-columns>
            <v-table-columns :prop="'name'" :label="'姓名'" :render-header="renderHeader" :is-sort="true" :sort-fn="sortFn"></v-table-columns>
            <v-table-columns :prop="'age'" :label="'年龄'"></v-table-columns>
            <v-table-columns :prop="'address'" :label="'地址'"></v-table-columns>
            <v-table-columns inline-template :label="'操作1'">
                <span>
                    <v-button @click.native="clickX(row)">增加</v-button>
                    <v-button @click.native="clickX(row)">删除</v-button>
                </span>
            </v-table-columns>
        </v-table>

        <a class="demo-link" href="../components/table.html">组件连接</a>
    </div>
</template>

<script>
    import vTable from '../../src/components/table';
    import vButton from '../../src/components/button';
    import vTableColumns from '../../src/components/table-columns';
    import Vue from 'vue';

    export default {
        components: {
            vTable,
            vButton,
            vTableColumns
        },
        data() {
            const _this = this;
            return {
                // table
                table: {
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
                    })()
                }
            }
        },
        methods: {
            renderHeader() {
                return `我是渲染函数渲染的`;
            },
            clickX() {
                console.log(arguments)
            },
            sortFn(data, sort) {
                data.sort((a, b) => {
                    return sort ? b.index - a.index : a.index - b.index;
                })
            }
        }
    }
</script>