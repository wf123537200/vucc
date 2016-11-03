<template>
    <div>
        <h3>警告 alert</h3>
        <section class="doc-part">
            <v-alert :id="'alert1'" :title="'我是标题'" :explain="'辅助说明性文字'" :type="'success'"></v-alert>
            <v-alert :id="'alert2'" :title="'我是标题'" :explain="'辅助说明性文字'" :type="'error'"
                     :is-close-able="true"></v-alert>

            <v-button type="primary" @click.native="showAlert('alert1')">alert success</v-button>
            <v-button type="primary" @click.native="showAlert('alert2')">alert error</v-button>

            <!-- 第二种调用方法 -->
            <v-button @click.native="showAlert2()">alert第二种调用方法</v-button>

            <a class="demo-link" href="../components/loading.html">组件连接</a>
        </section>
    </div>
</template>

<script>
    import vAlert from '../../src/components/alert';
    import vButton from '../../src/components/button';

    export default {
        components: {
            vAlert,
            vButton
        },
        data() {
            return {

            }
        },
        methods: {
            // alert
            showAlert(id) {
                document.body.$$alert[id].show();
            },

            showAlert2() {
                window.Alert.init({
                    type: 'info',
                    title: '我是标题',
                    explain: '我是说明文字',
                    isCloseAble: true
                });
            }
        }
    }
</script>