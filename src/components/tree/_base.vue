<!--
   tree 树状组件

   @param {String}
   @param {String} appendClass 自定义class
   @param {Object} appendStyle 自定义Style对象
-->

<script>
    export default {
        name: 'tree_base',
        template:    `<ul>
                        <li v-for="it in data.leafs" :class="[{'vc-tree-checked': it.isChecked, 'vc-tree-disabled': it.isDisabled, 'vc-tree-open': it.isOpened}]">
                            <a href="javascript: void 0;" class="vc-tree-item" @click.stop="onItemClick(it)">
                                <i @click="toggleOpen(it)" v-if="it.subTree" class="vc-tree-caret"></i>
                                <span class="vc-tree-text" @click="toggleOpen(it)">
                                    <i @click="toggleChecked(it)" v-if="data.isHasCheckbox" class="vc-tree-checkbox"></i>
                                    <span @click="toggleChecked(it)">{{it.content}}</span>
                                </span>
                            </a>

                            <tree_base v-if="it.subTree" :data="it.subTree" :on-item-click="onItemClick" :is-parent-checked.sync="it.isChecked"></tree_base>
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
                    isDisabled: false
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
                        isDisabled: false
                    }, it);
                });
            }
        }
    }
</script>