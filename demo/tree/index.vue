<template>
    <div>
        <v-tree :data="tree" :on-item-click="tree.onItemClick" :on-item-right-click="tree.onItemRightClick"></v-tree>

        <a class="demo-link" href="../components/tree.html">组件连接</a>
    </div>
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
                    onItemRightClick() {
                        console.log(arguments);
                    },
                    isHasCheckbox: true,
                    leafs: [{
                        isOpened: true,
                        isChecked: true,
                        isDisabled: true,
                        content: '文本内容1',
                        icon: 'lala'
                    }, {
                        content: '文本内容2',
                        subTree: {
                            isHasCheckbox: true,
                            leafs: [{
                                content: '文本内容1',
                                icon: 'lala'
                            }, {
                                content: '文本内容2',
                                icon: 'lala'
                            }]
                        }
                    }]
                }
            }
        },
        mounted() {
            window.inputProxy = (dir) => {
                console.log(dir);
            };

            setTimeout(() => {
                this.tree = {
                    onItemClick() {
                        console.log(arguments);
                    },
                    onItemRightClick() {
                        console.log(arguments);
                    },
                    isHasCheckbox: false,
                    leafs: [{
                        isOpened: true,
                        isChecked: true,
                        isDisabled: true,
                        content: '延迟加载1',
                        icon: 'lala'
                    }, {
                        content: '延迟加载2',
                        icon: 'lala',
                        subTree: {
                            isHasCheckbox: true,
                            leafs: [{
                                content: '延迟加载3'
                            }, {
                                content: '延迟加载4'
                            }]
                        }
                    }]
                };

                this.tree.leafs.push({
                    content: '延迟加载4',
                    subTree: {
                        isHasCheckbox: true,
                        leafs: [{
                            content: '延迟加载5'
                        }, {
                            content: `<input value="1111111" onclick="inputProxy(1);"/>`
                        }]
                    }
                })
            }, 2000)
        }
    }
</script>