<template>
    <table>
        <thead>
            <tr>
                <th :style="it.style" :class="{pointer: it.isSort}" v-for="(it, index) in header" @click="sort(it)">
                    <pv-checkbox @click.native.stop v-if="index === 0 && hasSelectAll" v-model="selectAll" :append-style="{float: 'left', 'margin-right': '5px'}"></pv-checkbox>
                    <span v-if="it.isSort"
                          :class="['vc-table-sort-arrow', {'vc-table-sort-arrow-down': !it.isSortUp}]"></span>
                    <span :class="{'vc-table-label': hasSelectAll}">{{it.label}}</span>
                </th>
            </tr>
        </thead>
    </table>
</template>

<script>
    import pvCheckbox from '../checkbox'

    export default {
        components: {
            pvCheckbox
        },
        props: {
            header: {
                type: Array,
                default: []
            },
            hasSelectAll: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                selectAll: false
            }
        },

        methods: {
            sort(it) {
                if(!it.isSort) return;

                it.isSortUp = !it.isSortUp;
                this.$parent.$emit('tableSort', it.isSortUp, it.sortFn);
            }
        },

        watch: {
            selectAll(val) {
                if(!this.isClickSelectAll && !this.selectAll) return;

                this.isClickSelectAll = true;
                this.$parent.$emit('tableAllSelect', val);
            }
        },

        mounted() {
            this.$parent.$on('tableTdSelect', () => {
                this.isClickSelectAll = false;
                this.selectAll = false;
            });
        }
    }
</script>