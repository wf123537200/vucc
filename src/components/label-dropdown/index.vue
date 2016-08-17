<!--
   label-dropdown 组件, 带选择框的标签类下拉列表选择器

   @param {Array} selected 已经选中的标签组
    ex:
        [{
            userId : 1,
            userName : 'hill'
          },{
            userId : 2,
            userName : 'shijia'
          }]
   @param {Array} disabled 不能修改的标签组
    ex:
        [{
            userId : 100,
            userName : 'admin'
         }]
   @param {Array} data 下拉列表数据
    ex:
        [
            {userId:1, userName: 'hill'},
            {userId:2, userName: 'shijia'},
            {userId:3, userName: 'zac'},
            {userId:4, userName: 'admin'}
        ]
   @param {String} appendClass 自定义class
   @param {Object} appendClass 自定义Style对象
-->
<template>
    <div class="tbd-select" :class="[appendClass, {'tbd-dropdown-wrap-open' : showDropdown}]" :style="appendStyle">
        <div class="tbd-select-selection tbd-select-selection-multiple"
             @click.stop="focus">
            <ul class="tbd-select-selection-rendered">
                <li class="tbd-select-selection-choice tbd-select-selection-choice-disabled"
                    v-if="disabled.length > 0" v-for="item in disabled">
                    <!-- 不可编辑或删除加上 tbd-select-selection-choice-disabled -->
              <span class="tbd-select-selection-choice-content">
                  {{item.userName}}
              </span>
                </li>
                <li class="tbd-select-selection-choice" v-if="selected.length > 0"
                    v-for="item in selected">
              <span class="tbd-select-selection-choice-content">
                  {{item.userName}}
              </span>
              <span class="tbd-select-selection-choice-remove" @click.stop="deleteItem(item.userId)">
              </span>
                </li>
                <li class="tbd-select-selection-choice tbd-select-selection-choice-editing">
                    <!-- 正在编辑中加上 tbd-select-selection-choice-editing -->
                    <input class="tbd-select-selection-choice-input" type="text" style="width:80px"
                           v-model="keyword" v-el:keyword>
                    <span class="tbd-select-selection-choice-remove"></span>
                </li>
            </ul>
        </div>
        <!-- select 下拉选项 -->
        <pv-dropdown :data="dropDownList"
                    :on-select="selectItem"
                    :is-opened="showDropdown"
                    :filter = "keyword"
                    :append-style="{width: '305px','margin-top': '-24px'}">
        </pv-dropdown>
    </div>
</template>
<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvDropdown from '../dropdown';

    export default {
        components: {
            pvDropdown
        },
        props : Object.assign({}, componentBaseParamConfig, {
            disabled : {
                type: Array
            },

            selected : {
                type: Array,
                default : []
            },

            data : {
                type: Array,
                default : []
            }
        }),

        computed: {
            dropDownList() {
                let resList = [];

                this.data.map(function(it) {
                    resList.push({
                        value: it.userId,
                        label: it.userName
                    })
                });

                return {
                    optsList: resList
                }
            }
        },

        data() {
            return {
                keyword : '',
                showDropdown : false,
                optionData : [],
                optionsKey : {
                    userId : 'userId',
                    userName : 'userName'
                }
            }
        },

        methods : {
            focus() {
                this.$els.keyword.focus();
                this.getData();
            },

            selectItem(index, it) {
                const userId = it.value + '';
                const userName = it.label + '';

                for(let i = 0; i < this.selected.length; i++) {
                    let selectedId = this.selected[i].userId + '';

                    if(userId === selectedId) {
                        this.showDropdown = false;
                        return
                    }
                }

                let item = {
                    userId : userId,
                    userName : userName
                };

                item[this.optionsKey.userId] = userId;
                item[this.optionsKey.userName] = userName;

                this.selected.push(item);
                this.keyword = '';
                this.showDropdown = false;
            },

            deleteItem(userId) {
                userId += '';

                for(let i = 0; i < this.selected.length; i++) {
                    let selectedId = this.selected[i].userId + '';
                    if(userId === selectedId) {
                        this.selected.splice(i ,1);
                        return
                    }
                }
            },

            getData() {
                this.showDropdown = true;
            }
        },

        watch : {
            keyword() {
                if(this.keyword === '' && this.showDropdown === false) {
                    return
                } else {
                    this.getData()
                }
            }
        },

        ready() {
            let _this = this;

            if(this.selected.length > 0) {
                for(let i = 0; i < this.selected.length; i++) {
                    let key1 = _this.optionsKey.userId;
                    let key2 = _this.optionsKey.userName;
                    this.selected[i].userId = this.selected[i][key1];
                    this.selected[i].userName = this.selected[i][key2];
                }
            }
        }
    }
</script>
