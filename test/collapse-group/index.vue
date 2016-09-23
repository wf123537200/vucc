<template>
    <v-collapse-group :is-multiple="false">
        <!-- xx -->
        <v-collapse :title="'我是一个下拉面板'">
            <div slot="operate">
                <a href="" class="vc-link">额外操作</a>
            </div>
            <div style="padding: 20px 0;">
                <p>内容内容</p>
            </div>
        </v-collapse>
        <v-collapse :title="'我是一个下拉面板'">
            <div slot="operate">
                <a href="" class="vc-link">额外操作</a>
            </div>
            <div style="padding: 20px 0;">
                <p>内容内容</p>
            </div>
        </v-collapse>
        <v-collapse :title="'我是一个下拉面板'">
            <div slot="operate">
                <a href="" class="vc-link">额外操作</a>
            </div>
            <div style="padding: 20px 0;">
                <p>内容内容</p>
            </div>
        </v-collapse>
    </v-collapse-group>
</template>

<script>
    import vCollapseGroup from '../../src/components/collapse-group';
    import vCollapse from '../../src/components/collapse';

    export default {
        components: {
            vCollapse,
            vCollapseGroup
        }
    }
</script>