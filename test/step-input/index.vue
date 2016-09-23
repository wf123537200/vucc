<template>
    <div>值: {{value}}</div>
    <v-step-input size="small" :value.sync="value"></v-step-input>
    <v-step-input></v-step-input>
    <v-step-input :size="'large'" :min="10" :max="80" :step="5"></v-step-input>
</template>

<script>
    import vStepInput from '../../src/components/step-input';

    export default {
        components: {
            vStepInput
        },
        data() {
            return {
                value: 20
            }
        }
    }
</script>