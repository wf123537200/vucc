<template>
    <section class="doc-part">
        <h3>switch: {{switchValue}}</h3>
        <v-switch :value.sync="switchValue" :onChange="switchChange"></v-switch>
        <v-switch :value.sync="switchValue" :is-disabled="true" :onChange="switchChange"></v-switch>
    </section>
</template>

<script>
    import vSwitch from '../../src/components/switch';

    export default {
        components: {
            vSwitch
        },
        data() {
            return {
                // switch
                switchValue: false
            }
        },
        methods: {
            switchChange(value) {
                console.log('Tab switch result is :', value)
            }
        }
    }
</script>