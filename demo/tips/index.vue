<template>
    <div>
        <h3>轻提示 tips</h3>
        <section class="doc-part">
            <v-tips :id="'infoTips1'" :content="'我是一个提示操作/类型是info'" type="info"></v-tips>
            <v-tips :id="'infoTips2'" :content="'我是一个提示操作/类型是success'" type="success"></v-tips>
            <v-tips :id="'infoTips3'" :content="'我是一个提示操作/类型是error'" type="error"></v-tips>
            <v-tips :id="'infoTips4'" :content="'我是一个提示操作/类型是warn'" type="warn"></v-tips>

            <!-- 第一种调用方法 -->
            <v-button type="primary" @click.native="showTips('infoTips1', 'info')">tips info</v-button>
            <v-button type="primary" @click.native="showTips('infoTips2', 'success')">tips success</v-button>
            <v-button type="primary" @click.native="showTips('infoTips3', 'error')">tips error</v-button>
            <v-button type="primary" @click.native="showTips('infoTips4', 'warn')">tips warn</v-button>

            <!-- 第二种调用方法 -->
            <v-button @click.native="showTipsWay2()">tips第二种调用方法</v-button>

            <a class="demo-link" href="../components/tips.html">组件连接</a>
        </section>
    </div>
</template>

<script>
    import vTips from '../../src/components/tips';
    import vButton from '../../src/components/button';

    export default {
        components: {
            vTips,
            vButton
        },
        data() {
            return {

            }
        },
        methods: {
            // tips show way 1
            showTips(id) {
                document.body.$$tips[id].show();
            },

            showTipsWay2() {
                window.Tips.init('', 'info', 'lalalala', 20000);
            },
        }
    }
</script>