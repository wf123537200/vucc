<template>
    <div>
        <h3>多选 multi-select: {{multiResList}}</h3>
        <v-multi-select :data="multiDataList" :append-style="{width: '200px'}" v-model="multiResList">
            <v-button>点击选择</v-button>
        </v-multi-select>

        <v-multi-select :has-search="false" :filter="search" :data="multiDataList" :append-style="{width: '200px'}"
                        v-model="multiResList">
            <v-search v-model="search"></v-search>
        </v-multi-select>

        <a class="demo-link" href="../components/multi-select.html">组件连接</a>
    </div>
</template>

<script>
    import vMultiSelect from '../../src/components/multi-select';
    import vButton from '../../src/components/button';
    import vSearch from '../../src/components/search';

    export default {
        components: {
            vSearch,
            vButton,
            vMultiSelect
        },
        data() {
            return {
                search: '',
                // multi-select
                multiDataList: (function() {
                        var base =[{
                            value: 1,
                            label: 'value1value1value1value1value1',
                            renderLi: function() {
                                return `<a>111value1value1value1value1value1</a>`
                            }
                        }, {
                            value: 2,
                            label: 'value2disabledvalue2disabled',
                            isDisabled: true,
                            isDeleteAble: false
                        }];

                        var other = [];
                        for(var i = 0; i < 30; i++) {
                            other.push({
                                value: i,
                                label: 'value' + i,
                                isDeleteAble: false
                            })
                        }

                        return base.concat(other);
                    })(),
                multiResList: [ { "value": 7, "label": "value7", isDeleteAble: false}, { "value": 9, "label": "value9" }, { "value": 17, "label": "value17" }, { "value": 11, "label": "value11" }]
            }
        },
        methods: {
            buttonClick() {
                console.log('u has been click')
            }
        }
    }
</script>