<template>
    <!-- 底部 -->
    <div style="margin-left: 50px;">
        <div>底部</div>
        <v-tool-tip>文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>底部靠左</div>
        <v-tool-tip :type="'bottomLeft'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>底部靠右</div>
        <v-tool-tip :type="'bottomRight'">文字提示</v-tool-tip>
    </div>

    <!-- 顶部 -->
    <div style="margin-left: 50px;">
        <div>顶部</div>
        <v-tool-tip :type="'top'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>顶部靠右</div>
        <v-tool-tip :type="'topRight'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>顶部靠左</div>
        <v-tool-tip :type="'topLeft'">文字提示</v-tool-tip>
    </div>

    <br />
    <!-- 右边 -->
    <div style="margin-left: 50px;">
        <div>右边</div>
        <v-tool-tip :type="'right'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>右边靠顶</div>
        <v-tool-tip :type="'rightTop'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>右边靠底</div>
        <v-tool-tip :type="'rightBottom'">文字提示</v-tool-tip>
    </div>

    <!-- 左边 -->
    <div style="margin-left: 50px;">
        <div>左边</div>
        <v-tool-tip :type="'left'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>左边靠顶</div>
        <v-tool-tip :type="'leftTop'">文字提示</v-tool-tip>
    </div>

    <div style="margin-left: 50px;">
        <div>左边靠底</div>
        <v-tool-tip :type="'leftBottom'">文字提示</v-tool-tip>
    </div>

    <a class="demo-link" href="../components/tool-tip.html">组件连接</a>
</template>

<script>
    import vToolTip from '../../src/components/tool-tip';

    export default {
        components: {
            vToolTip
        },
        data() {
            return {

            }
        }
    }
</script>