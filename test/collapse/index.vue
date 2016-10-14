<template>
    <v-collapse :title="'我是一个下拉面板'">
        <div slot="operate">
            <a href="" class="vc-link">额外操作</a>
        </div>
        <div style="padding: 20px 0;">
            <p>内容内容</p>
        </div>
    </v-collapse>

    <a class="demo-link" href="../components/collapse.html">组件连接</a>
</template>

<script>
    import vCollapse from '../../src/components/collapse';

    export default {
        components: {
            vCollapse
        }
    }
</script>