<template>
    <h3>dialog类弹窗</h3>
    <section class="doc-part">
        <v-dialog :id="'dialog1'" :on-ok="dialogCallbackFn1" :on-cancel="dialogCallbackFn2">
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
        </v-dialog>

        <v-dialog :id="'dialog2'" :on-ok="dialogCallbackFn1" :on-cancel="dialogCallbackFn2">
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
            <div>hi, 我是一个弹窗</div>
        </v-dialog>

        <v-button type="primary" @click="showDialog('dialog1')">show dialog</v-button>
    </section>
</template>

<script>
    import vDialog from '../../src/components/dialog';
    import vButton from '../../src/components/button';

    export default {
        components: {
            vDialog,
            vButton
        },
        data() {
            return {

            }
        },
        methods: {
            // 展示对话框
            showDialog(id) {
                this.$root.$$dialog[id].show();
                this.$root.$$dialog['dialog2'].show();
            },

            dialogCallbackFn1() {
                alert('ok callback !');
            },

            dialogCallbackFn2() {
                alert('cancel callback !');
            }
        }
    }
</script>