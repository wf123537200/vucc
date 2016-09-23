<template>
    <v-tree :data="tree" :on-item-click="tree.onItemClick"></v-tree>
</template>

<script>
    import vTree from '../../src/components/tree';

    export default {
        components: {
            vTree
        },
        data() {
            return {
                tree: {
                    onItemClick() {
                        console.log(arguments);
                    },
                    isHasCheckbox: true,
                    leafs: [{
                        isOpened: true,
                        isChecked: true,
                        isDisabled: true,
                        content: '文本内容1'
                    }, {
                        content: '文本内容2',
                        subTree: {
                            isHasCheckbox: true,
                            leafs: [{
                                content: '文本内容1'
                            }, {
                                content: '文本内容2'
                            }]
                        }
                    }]
                }
            }
        }
    }
</script>