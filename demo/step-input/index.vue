<template>
    <div>
        <div>值: {{value}}</div>
        <v-step-input :size="'small'" v-model="value"></v-step-input>
        <v-step-input :on-change="onChange" v-model="value"></v-step-input>
        <v-step-input :size="'large'" :min="10" :max="80" :step="5" v-model="value"></v-step-input>

        <a class="demo-link" href="../components/step-input.html">组件连接</a>
    </div>
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
        },
        methods: {
            onChange(value, vm) {
                console.log(arguments);
            }
        }
    }
</script>