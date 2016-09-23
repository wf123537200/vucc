<template>
    <h3>tips类弹窗</h3>
    <section class="doc-part">
        <v-tips :id="'infoTips1'" :content="'我是一个提示操作/类型是info'" type="info"></v-tips>
        <v-tips :id="'infoTips2'" :content="'我是一个提示操作/类型是success'" type="success"></v-tips>
        <v-tips :id="'infoTips3'" :content="'我是一个提示操作/类型是error'" type="error"></v-tips>
        <v-tips :id="'infoTips4'" :content="'我是一个提示操作/类型是warn'" type="warn"></v-tips>

        <!-- 第一种调用方法 -->
        <v-button type="primary" @click="showTips('infoTips1', 'info')">tips info</v-button>
        <v-button type="primary" @click="showTips('infoTips2', 'success')">tips success</v-button>
        <v-button type="primary" @click="showTips('infoTips3', 'error')">tips error</v-button>
        <v-button type="primary" @click="showTips('infoTips4', 'warn')">tips warn</v-button>

        <!-- 第二种调用方法 -->
        <v-button @click="showTipsWay2()">tips第二种调用方法</v-button>
    </section>
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
                this.$root.$$tips[id].show();
            },

            showTipsWay2() {
                window.Tips.init('', 'info', 'lalalala');
            },
        }
    }
</script>