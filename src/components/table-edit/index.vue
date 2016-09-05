<!--
   table-edit 编辑型表格组件

   @require select
   @require checkbox

   @param {Array} data 表格数据
   @param {Object} types 类型选择列表
   @param {Object} bases 基础类型列表
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div class="vc-edit-table">
        <div class="vc-table vc-table-bordered">
            <table>
                <thead>
                <tr>
                    <th>字段英文名</th>
                    <th>字段类型
                        <!--<div class="vc-tooltip-wrap">-->
                            <!--<i class="vci vci-question-circle-o"></i>-->
                            <!--<div-->
                                    <!--class="vc-tooltip vc-tooltip-placement-rightTop"-->
                                    <!--style="min-width:200px;-->
                            <!--position: absolute;-->
                            <!--left: 200%;">-->
                                <!--<i class="vc-tooltip-arrow"></i>-->
                                <!--<div class="vc-tooltip-inner">-->
                                    <!--char和varchar字段类型需要输入字段长度-->
                                    <!--array字段类型，需要输入值的类型-->
                                    <!--map字段类型，需要输入键和值的类型-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    </th>
                    <th>字段描述</th>
                    <th>分区字段</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in objs">
                    <td><input v-model="item.columnName" type="text" class="vc-input vc-input-sm"></td>

                    <td>

                        <div class="vcb-edit-table-select-group">
                            <!-- select -->
                            <pv-select :value.sync="item.columnType" :data="types">
                            </pv-select>

                            <div class="vc-input-group vc-input-group-sm" v-show="item.columnType === 'array'">
                                <span class="vc-input-extra">value=</span>
                                <pv-select :value.sync="item.sub" :data="bases">
                                </pv-select>
                            </div>

                            <!-- input group -->
                            <div class="vc-input-group vc-input-group-sm" v-show="item.columnType === 'map'">
                                <span class="vc-input-extra">key=</span>
                                <pv-select :value.sync="item.subKey" :data="bases">
                                </pv-select>
                            </div>
                            <!-- input group -->
                            <div class="vc-input-group vc-input-group-sm" v-show="item.columnType === 'map'">
                                <span class="vc-input-extra">value=</span>
                                <pv-select :value.sync="item.subValue" :data="bases">
                                </pv-select>
                            </div>

                            <div class="vc-input-group vc-input-group-sm" v-show="item.columnType.indexOf('char') > -1">
                                <span class="vc-input-extra">size=</span>
                                <input type="text" class="vc-input vc-input-sm" v-model="item.sub"  />
                            </div>
                        </div>

                    </td>

                    <td><input v-model="item.columnDesc" type="text" class="vc-input vc-input-sm"></td>
                    <td><pv-checkbox :value.sync="item.isPartition"></pv-checkbox></td>
                    <td>
                        <a href="javascript:void(0)" @click="removeItem(item, $index)" class="vc-link">删除</a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <a href="javascript:void(0)" @click="addItem(item)"  class="vc-link">+ 增加一行</a>
    </div>
</template>

<script>
    import pvSelect from '../select/';
    import pvCheckbox from '../checkbox/';

    export default {
        components: {
            pvSelect,
            pvCheckbox
        },
        props: {
            data: {
                type: Array,
                default: function() {
                    return [{
                        columnName: '',
                        columnType: 'string',
                        columnDesc: '',
                        isPartition: false
                    }]
                }
            },
            types: {
                types: Object,
                default: function() {
                    let res = [];

                    ['string','tinyint','smallint', 'int',
                        'bigint', 'boolean', 'float','double', 'timestamp','date',
                        'char','varchar','array','map'].map(function(it) {
                        res.push({
                            value: it
                        })
                    });

                    return {
                        optsList: res
                    };
                }
            },

            bases: {
                types: Object,
                default: function() {
                    let res = [];

                    ['string','tinyint','smallint', 'int',
                        'bigint', 'boolean', 'float','double', 'timestamp','date'].map(function(it) {
                        res.push({
                            value: it
                        })
                    });

                    return {
                        optsList: res
                    }
                }
            }
        },

        data () {
            return {
                objs: this.data
            }
        },

        watch: {
            objs: {
                deep: true,
                handler: function(val, oldVal) {
                    // 转换为 data
                    this.data = val.map((item, index) => {
                                let newItem = {
                                    columnName: item.columnName,
                                    columnDesc: item.columnDesc,
                                    columnType: item.columnType,
                                    isPartition: item.isPartition
                                }

                                if (newItem.columnType === 'array') {
                        newItem.columnType = 'ARRAY<' + (item.sub || 'string') +'>'
                    } else if (newItem.columnType === 'map') {
                        newItem.columnType = 'MAP<' + (item.subKey || 'string')
                                +',' + (item.subValue || 'string') + '>'

                    } else if (newItem.columnType === 'char' || newItem.columnType === 'varchar') {
                        newItem.columnType =  newItem.columnType.toUpperCase() +
                                '(' + (item.sub || 0) +')'

                    }
                    return newItem
                })

                }
            }


        },

        methods: {
            removeItem(item, index) {
                this.objs.splice(index, 1);
            },

            addItem() {
                const emptyItem = {
                    columnName: '',
                    columnType: 'string',
                    columnDesc: '',
                    isPartition: false
                };

                this.objs.push(emptyItem)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "style.scss";
</style>
