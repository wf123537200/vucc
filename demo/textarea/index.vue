<template>
    <div>
        <div>{{value}}</div>
        <v-textarea rows="3" placeholder="textarea的高度由rows属性决定" v-model="value"></v-textarea>
        <v-textarea rows="3" placeholder="textarea的高度由rows属性决定" disabled></v-textarea>

        <a class="demo-link" href="../components/textarea.html">组件连接</a>
    </div>
</template>

<script>
    import vTextarea from '../../src/components/textarea';

    export default {
        components: {
            vTextarea
        },
        data() {
            return {
                value: '我是一个文本框!'
            }
        }
    }
</script>