<template>
    <section class="doc-part">
        <h3>button:</h3>
        <v-button>default</v-button>
        <v-button type="primary" size="large" @click="buttonClick()">primary/large</v-button>
        <v-button type="outline">outline</v-button>
        <v-button type="error">error</v-button>
        <v-button type="link" size="small" >link/small</v-button>
        <v-button type="primary" :is-disabled="true" @click="buttonClick()">primary/disable</v-button>
        <!-- 带图标 -->
        <h3>带图标button:</h3>
        <v-button>
            <span>default</span>
            <span class="vci vci-down"></span>
        </v-button>
        <v-button>
            <span class="vci vci-down"></span>
            <span>default</span>
        </v-button>

        <a class="demo-link" href="../components/button.html">组件连接</a>
    </section>
</template>

<script>
    import vButton from '../../src/components/button';

    export default {
        components: {
            vButton
        },
        methods: {
            buttonClick() {
                console.log('u has been click')
            }
        }
    }
</script>