<template>
    <div>
        <h3>结果: {{transferRes}}</h3>
        <v-transfer :src-title="'原数据'" :dist-title="'选择'" :data="transfer" v-model="transferRes"></v-transfer>

        <a class="demo-link" href="../components/transfer.html">组件连接</a>
    </div>
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