<template>
    <div>
        <h2>默认 tabs(带额外操作和图标头部)</h2>
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

            <v-pane></v-pane>
            <v-pane></v-pane>
            <v-pane></v-pane>
        </v-tabs>

        <h2>卡片式</h2>
        <v-tabs type="card" :active-index.sync="activeIndex">
            <div slot="header">
                <div>选项卡1</div>
                <div>选项卡2</div>
                <div>选项卡3</div>
            </div>

            <v-pane></v-pane>
            <v-pane></v-pane>
            <v-pane></v-pane>
        </v-tabs>

        <h2>面板式</h2>
        <v-tabs type="panel" size="small" :active-index="1">
            <div slot="header">
                <div>选项卡1</div>
                <div>选项卡2</div>
                <div>选项卡3</div>
            </div>

            <v-pane></v-pane>
            <v-pane></v-pane>
            <v-pane></v-pane>
        </v-tabs>

        <a class="demo-link" href="../components/tabs.html">组件连接</a>
    </div>
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
        mounted() {
            setTimeout(() => {
                this.activeIndex = 1
            }, 3000)
        }
    }
</script>