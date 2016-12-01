<!--
   tag-list 标签列表

   @require input

   @param {String} [size=normal|large|small] 按钮的大小
   @param {Boolean} isDeleteAble 展示列表是否有删除按钮
   @param {Function} onAdd 标签列表增加时的回调函数
   @param {Function} onDelete 标签列表删除时的回调函数
   @param {Function} onBeforeAdd addItem之前调用,如有传入,则会将addItem作为回调函数传入,同时回调函数支持自定义传入item
   @param {String} placeholder 占位符
   @param {String} asContent content别名
   @param {Array} data 渲染数据
    ex:
        tagList: [{
          content: '内容'
        }]
   @param {Boolean} isShowInput 是否展示,默认值为false
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<template>
    <div v-if="isShow" :style="appendStyle" :class="['vc-tag-list', appendClass, sizeClass]">
        <label v-for="it in data" :class="['vc-tag', 'vc-tag-active', {'vc-tag-with-close': isDeleteAble}]">
            <span>
                {{it.content}}
                <i class="vci vci-cross" v-if="isDeleteAble" @click.stop="deleteItem(it)"></i>
            </span>
        </label>
        <!-- link -->
        <a class="vc-tag-link" v-if="!isShowAddInput" @click.stop="switchInput">{{placeholder}}</a>
        <!-- input -->
        <div class="vc-input-wrap" v-if="isShowAddInput" @click.stop>
            <pv-input v-model="text" :placeholder="placeholder" @keyup.native.enter="addItem"></pv-input>
            <button class="vc-input-wrap-extra" @click.stop="addItem">
                <i class="vci vci-plus"></i>
            </button>
        </div>
    </div>
</template>

<script>
    import {componentBaseParamConfig} from '../base-config';
    import pvInput from '../input';

    export default {
        components: {
            pvInput
        },
        props: Object.assign({}, componentBaseParamConfig, {
            data: {
                type: Array
            },
            isDeleteAble: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            },
            onAdd: {
                type: Function
            },
            onDelete: {
                type: Function
            },
            placeholder: {
                type: String,
                default: '增加标签'
            },
            onBeforeAdd: {
                type: Function
            },
            asContent: {
                type: String
            },
            isShowInput: {
                type: Boolean,
                default: false
            }
        }),

        data() {
            return {
                sizeClass: {
                    'default': '',
                    'small': 'vc-tag-list-sm'
                }[this.size],
                text: '',
                isShow: true,
                isShowAddInput: this.isShowInput
            }
        },

        created() {
            if(!this.data || !this.asContent) return;
            this.data.forEach((it) => {
                it.content = it[this.asContent];
            });
        },

        watch: {
            data() {
                // 为了解决异步刷新问题
                this.data.forEach((it) => {
                    this.data.content = it[this.asContent];
                });

                this.isShow = false;
                setTimeout(() => {
                    this.isShow = true;
                }, 30)
            }
        },

        methods: {
            switchInput() {
                this.isShowAddInput = true;
            },
            addItem() {
                if(!this.text || !this.text.trim()) return;

                const addedItem = {
                    content: this.text.trim()
                };

                // 如果有别名
                if(this.asContent) addedItem[this.asContent] = this.text.trim();
                this.data = this.data || [];

                // 如果有传入先执行的方法
                if(this.onBeforeAdd) return this.onBeforeAdd((item) => {
                    this.data.push(item || addedItem);
                    this.onAdd && this.onAdd(item || addedItem);
                    setTimeout(() => {
                        this.$el.querySelector('.vc-input-wrap > input').focus();
                    }, 100);
                });

                this.data.push(addedItem);
                this.onAdd && this.onAdd(addedItem);
                setTimeout(() => {
                    this.$el.querySelector('.vc-input-wrap > input').focus();
                }, 100);
            },
            deleteItem(item) {
                this.data.$remove(item);
                this.onDelete && this.onDelete(item);
            }
        },

        mounted() {
            document.body.addEventListener('click', () => {
                this.isShowAddInput = false;
            })
        }
    }
</script>

<style lang="sass">
    @import "style.scss";
</style>