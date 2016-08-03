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
                        <li v-for="it in data.leafs" :class="[{'tbd-tree-checked': it.isChecked || isParentChecked, 'tbd-tree-disabled': it.isDisabled, 'tbd-tree-open': it.isOpened}]">
                            <a href="javascript: void 0;" class="tbd-tree-item">
                                <i @click.stop="toggleOpen(it)" v-if="it.subTree" class="tbd-tree-caret"></i>
                                <span class="tbd-tree-text" @click.stop="toggleOpen(it)">
                                    <i @click.stop="toggleChecked(it)" v-if="data.isHasCheckbox" class="tbd-tree-checkbox"></i>
                                    <span @click.stop="toggleChecked(it)">{{it.content}}</span>
                                </span>
                            </a>

                            <tree_base v-if="it.subTree" :data="it.subTree" :is-parent-checked="it.isChecked"></tree_base>
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
            }
        },
        beforeCompile() {
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
            toggleChecked(it) {
                if(it.isDisabled) return;

                it.isChecked = !it.isChecked;
            }
        }
    }
</script>