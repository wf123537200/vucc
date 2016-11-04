<template>
    <div>
        <v-tag-list :data="tagList" :placeholder="'请填写内容'" :on-before-add="onBeforeAdd" :is-delete-able="true"></v-tag-list>
        <v-tag-list :data="tagList2" :on-before-add="onBeforeAdd" :is-delete-able="true"
                    :as-content="'tags'"></v-tag-list>

        <a class="demo-link" href="../components/tag-list.html">组件连接</a>
    </div>
</template>

<script>
    import vTagList from '../../src/components/tag-list';

    export default {
        components: {
            vTagList
        },
        data() {
            return {
                tagList: [{
                    content: '内容'
                }],
                tagList2: [{
                    tags: '内容'
                }]
            }
        },
        methods: {
            onBeforeAdd(next) {
                console.log('before add function is trigger!');
                next();
            }
        }
    }
</script>