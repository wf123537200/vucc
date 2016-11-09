<template>
    <div>
        <h3>值: {{search}}</h3>
        <v-search v-model="search" :on-search="buttonClick" :placeholder="'sousou'"></v-search>

        <a class="demo-link" href="../components/search.html">组件连接</a>
    </div>
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
        },
        methods: {
            buttonClick() {
                console.log('it is going 2 search!');
            }
        }
    }
</script>