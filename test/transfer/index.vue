<template>
    <v-transfer :src-title="'原数据'" :dist-title="'选择'" :data="transfer" :result="transferRes"></v-transfer>
</template>

<script>
    import vTransfer from '../../src/components/transfer';

    export default {
        components: {
            vTransfer
        },
        data() {
            return {
                transfer: [{
                    content: '我是选择框Aaa',
                    isChecked: true
                }, {
                    content: '我是选择框Bbb'
                }],
                transferRes: [{
                    content: '我是选择框Ccc',
                    isChecked: true
                }]
            }
        }
    }
</script>