<template>
    <div>
        <h3>消息类 messageBox</h3>
        <section class="doc-part">
            <v-message-box :id="'mb1'" type="info" :title="'这是一条通知信息'" :explain="'一些解释'"
                           :on-ok="dialogCallbackFn1"></v-message-box>
            <v-message-box :id="'mb2'" type="success" :title="'这是一条通知信息'" :explain="'一些解释'"></v-message-box>
            <v-message-box :id="'mb3'" type="error" :title="'这是一条通知信息'" :explain="'一些解释'"></v-message-box>
            <v-message-box :id="'mb4'" type="confirm" :title="'您是否确认要删除这项内容'" :explain="'一些解释'"
                           :on-cancel="dialogCallbackFn1"></v-message-box>

            <v-button type="primary" @click="showMb('mb1', 'info')">msgBox info</v-button>
            <v-button type="primary" @click="showMb('mb2', 'success')">msgBox success</v-button>
            <v-button type="primary" @click="showMb('mb3', 'error')">msgBox error</v-button>
            <v-button type="primary" @click="showMb('mb4', 'confirm')">msgBox confirm</v-button>

            <!-- 第二种调用方法 -->
            <v-button @click="showMb2()">messagebox 第二种调用方法</v-button>

            <a class="demo-link" href="../components/message-box.html">组件连接</a>
        </section>
    </div>
</template>

<script>
    import vMessageBox from '../../src/components/message-box';
    import vButton from '../../src/components/button';
    // message 的包装代码
    window.MessageBox = require('../../src/components/message-box/wrap.js');

    export default {
        components: {
            vMessageBox,
            vButton
        },
        data() {
            return {

            }
        },
        methods: {
            // message box
            showMb(id) {
                this.$root.$$messageBox[id].show();
            },

            showMb2(id) {
                window.MessageBox.init({
                    type: 'confirm',
                    title: '标题',
                    explain: '我就是一个解释!',
                    onOk() {
                        console.log('我是OK!');
                    }
                });
            },
            dialogCallbackFn1() {
                console.log(1);
            }
        }
    }
</script>