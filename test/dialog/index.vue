<template>
    <div>
        <h3>普通 dialog</h3>
        <section class="doc-part">
            <v-dialog :id="'dialog1'" :on-ok="dialogCallbackFn1" :on-cancel="dialogCallbackFn2">
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
            </v-dialog>

            <v-dialog :id="'dialog2'" :on-ok="dialogCallbackFn1" :on-cancel="dialogCallbackFn2" v-model="show">
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
                <div>hi, 我是一个弹窗</div>
            </v-dialog>

            <v-button type="primary" @click.native="showDialog('dialog1')">show dialog1</v-button>
            <v-button type="primary" @click.native="showDialog2">show dialog2</v-button>

            <a class="demo-link" href="../components/dialog.html">组件连接</a>
        </section>
    </div>
</template>

<script>
    import vDialog from '../../src/components/dialog';
    import vButton from '../../src/components/button';

    export default {
        data() {
            return {
                show: false
            }
        },
        components: {
            vDialog,
            vButton
        },

        methods: {
            // 展示对话框
            showDialog(id) {
                this.$root.$$dialog[id].show();
            },

            showDialog2() {
                this.show = true;
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