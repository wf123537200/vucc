<template>
    <h3>分页组件</h3>
    <section class="doc-part">
        <v-pagination :total="50" :current-page="5" :page-size="10"></v-pagination>

        <a class="demo-link" href="../components/pagination.html">组件连接</a>
    </section>
</template>

<script>
    import vPagination from '../../src/components/pagination';

    export default {
        components: {
            vPagination
        },
        data() {
            return {

            }
        }
    }
</script>