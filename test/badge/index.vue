<template>
    <v-badge :number="10" :is-show-number="true">
        <i class="vci vci-mail"></i>
    </v-badge>
    <v-badge style="margin-left: 30px;">
        <i class="vci vci-mail"></i>
    </v-badge>
</template>

<script>
    import vBadge from '../../src/components/badge';

    export default {
        components: {
            vBadge
        }
    }
</script>