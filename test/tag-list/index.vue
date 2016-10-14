<template>
    <v-tag-list :data="tagList" :placeholder="'请填写内容'"></v-tag-list>
    <v-tag-list :data="tagList" :size="'small'" :is-delete-able="true"></v-tag-list>
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
                }]
            }
        }
    }
</script>