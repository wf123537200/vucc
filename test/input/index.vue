<template>
    <div>
        <div>{{value}}</div>
        <v-input type="text" size="small" placeholder="sm" v-model="value"></v-input>
        <v-input type="text" value="disabled" disabled></v-input>

        <a class="demo-link" href="../components/input.html">组件连接</a>
    </div>
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