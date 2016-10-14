<template>
    <h2>默认类型tabs</h2>
    <v-tabs type="" :on-change="switchChange">
        <div slot="operate">
            <v-button>额外操作</v-button>
        </div>

        <div slot="header">
            <div class="a">
                <i class="vci vci-apple"></i>
                <span>选项卡1</span>
            </div>
            <div>选项卡2</div>
            <div>选项卡3</div>
        </div>

        <v-pane><v-button @click="buttonClick">测试按钮</v-button></v-pane>
        <v-pane>选项卡222222内容</v-pane>
        <v-pane>选项卡33333内容</v-pane>
    </v-tabs>

    <h2>card tabs</h2>
    <v-tabs type="card" :active-index.sync="activeIndex">
        <div slot="header">
            <div class="a">选项卡1</div>
            <div>选项卡2</div>
            <div>选项卡3</div>
        </div>

        <v-pane>选项卡111111内容</v-pane>
        <v-pane>选项卡222222内容</v-pane>
        <v-pane>选项卡33333内容</v-pane>
    </v-tabs>

    <h2>panel tabs small</h2>
    <v-tabs type="panel" size="small" :active-index="1">
        <div slot="header">
            <div class="a">选项卡1</div>
            <div>选项卡2</div>
            <div>选项卡3</div>
        </div>

        <v-pane>选项卡111111内容</v-pane>
        <v-pane>选项卡222222内容</v-pane>
        <v-pane>选项卡33333内容</v-pane>
    </v-tabs>

    <h2>panel tabs small</h2>
    <v-tabs type="panel" size="large">
        <div slot="header">
            <div class="a">选项卡1</div>
            <div>选项卡2</div>
            <div>选项卡3</div>
        </div>

        <v-pane>选项卡111111内容</v-pane>
        <v-pane>选项卡222222内容</v-pane>
        <v-pane>选项卡33333内容</v-pane>
    </v-tabs>

    <a class="demo-link" href="../components/tabs.html">组件连接</a>
</template>

<script>
    import vTabs from '../../src/components/tabs';
    import vPane from '../../src/components/pane';
    import vButton from '../../src/components/button';

    export default {
        components: {
            vTabs,
            vPane,
            vButton
        },
        data() {
            return {
                activeIndex: 2
            }
        },
        methods: {
            switchChange(value) {
                console.log('Tab switch result is :', value)
            },
            buttonClick() {
                console.log('u has been click')
            }
        },
        ready() {
            setTimeout(() => {
                this.activeIndex = 1
            }, 3000)
        }
    }
</script>