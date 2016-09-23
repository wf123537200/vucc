<template>
    {{search}}
    <v-search :value.sync="search" :on-search="buttonClick" :placeholder="'sousou'"></v-search>
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