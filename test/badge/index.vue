<template>
    <v-badge :number="10" :is-show-number="true">
        <i class="vci vci-mail"></i>
    </v-badge>
    <v-badge style="margin-left: 30px;">
        <i class="vci vci-mail"></i>
    </v-badge>

    <a class="demo-link" href="../components/badge.html">组件连接</a>
</template>

<script>
    import vBadge from '../../src/components/badge';

    export default {
        components: {
            vBadge
        }
    }
</script>