<!--
   tree 树状组件

   @param {Boolean} isShow tree中的一行是否展示
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<script>
    export default {
        name: 'tree_base',
        template:    `<ul>
                        <li v-for="it in data.leafs" v-show="it.isShow" :class="[{'vc-tree-checked': data.isHasCheckbox && it.isChecked, 'vc-tree-disabled': it.isDisabled, 'vc-tree-open': it.isOpened}]">
                            <a class="vc-tree-item" @click.stop="onItemClick(it, $event)" @contextmenu.prevent="onItemRightClick(it, $event)" @dblclick="onItemDbclick(it, $event)">
                                <i @click="toggleOpen(it)" v-if="it.subTree || it.icon" :class="[it.icon ? it.icon : 'vc-tree-caret']"></i>
                                <span class="vc-tree-text" @click="toggleOpen(it)">
                                    <i @click="toggleChecked(it)" v-if="data.isHasCheckbox" class="vc-tree-checkbox"></i>
                                    <span @click="toggleChecked(it)" v-html="it.content"></span>
                                </span>
                            </a>

                            <tree_base v-if="it.subTree" :data="it.subTree" :on-item-click="onItemClick" :on-item-dbclick="onItemDbclick" :on-item-right-click="onItemRightClick" :is-parent-checked.sync="it.isChecked"></tree_base>
                        </li>
                     </ul>`,
        props: {
            data: {
                type: Object,
                default() {}
            },
            isParentChecked: {
                type: Boolean,
                default: false
            },
            onItemClick: {
                type: Function,
                default() {
                    return () => {
                    };
                }
            },
            onItemRightClick: {
                type: Function,
                default() {
                    return () => {
                    };
                }
            },
            onItemDbclick: {
                type: Function,
                default() {
                    return () => {};
                }
            }
        },

        created() {
            if(!this.data) return;
            if(!this.data.leafs) this.data.leafs = [];

            this.data.isHasCheckbox = this.data.isHasCheckbox || false;
            this.data.leafs = this.data.leafs.map(function(it) {
                return Object.assign({
                    isOpened: false,
                    isChecked: false,
                    isDisabled: false,
                    isShow: true
                }, it);
            });
        },
        methods: {
            toggleOpen(it) {
                if(it.isDisabled) return;
                it.isOpened = !it.isOpened;
            },
            toggleChecked(it, ctrl) {
                if(it.isDisabled) return;

                it.isChecked = ctrl === undefined ? !it.isChecked : ctrl;
            }
        },
        watch: {
            isParentChecked(val) {
                if(!this.data.isHasCheckbox) return;

                this.data.leafs.forEach((it) => {
                    this.toggleChecked(it, val);
                });
            },
            data() {
                if(!this.data) return;
                if(!this.data.leafs) this.data.leafs = [];

                this.data.isHasCheckbox = this.data.isHasCheckbox || false;
                this.data.leafs = this.data.leafs.map(function(it) {
                    return Object.assign({
                        isOpened: false,
                        isChecked: false,
                        isDisabled: false,
                        isShow: true
                    }, it);
                });
            }
        }
    }
</script>