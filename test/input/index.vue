<template>
    <div>{{value}}</div>
    <v-input type="text" size="small" placeholder="sm" v-model="value"></v-input>
    <v-input type="text" value="disabled" disabled></v-input>
</template>

<script>
    import vInput from '../../src/components/input';

    export default {
        components: {
            vInput
        },
        data() {
            return {
                value: 10
            }
        }
    }
</script>