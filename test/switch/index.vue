<template>
    <section class="doc-part">
        <h3>开关 switch : {{switchValue}}</h3>
        <v-switch v-model="switchValue" :on-change="switchChange"></v-switch>
        <h3>禁用开关</h3>
        <v-switch v-model="switchValue" :is-disabled="true" :on-change="switchChange"></v-switch>
        <h3>带文字开关</h3>
        <v-switch v-model="switchValue" :on-change="switchChange" :on-text="'on111111'" :off-text="'off'"></v-switch>

        <a class="demo-link" href="../components/switch.html">组件连接</a>
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