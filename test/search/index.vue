<template>
    {{search}}
    <v-search :value.sync="search" :on-search="buttonClick" :placeholder="'sousou'"></v-search>

    <a class="demo-link" href="../components/search.html">组件连接</a>
</template>

<script>
    import vSearch from '../../src/components/search';

    export default {
        components: {
            vSearch
        },
        data() {
            return {
                search: ''
            }
        }
    }
</script>