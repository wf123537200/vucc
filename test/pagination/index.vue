<template>
    <div>
        <h3>页: {{currentPage}}</h3>
        <section class="doc-part">
            <v-pagination :total="50" :current-page="currentPage" :on-page-change="onPageChange"
                          :page-size="10"></v-pagination>

            <a class="demo-link" href="../components/pagination.html">组件连接</a>
        </section>
    </div>
</template>

<script>
    import vPagination from '../../src/components/pagination';

    export default {
        components: {
            vPagination
        },
        data() {
            return {
                currentPage: 5
            }
        },
        methods: {
            onPageChange(val) {
                this.currentPage = val;
            }
        }
    }
</script>