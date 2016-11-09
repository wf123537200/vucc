<template>
    <table>
        <thead>
            <tr>
                <th :style="it.style" v-for="it in header">{{it.label}}</th>
            </tr>
        </thead>
    </table>
</template>

<script>
    export default {
        props: {
            header: {
                type: Array,
                default: []
            }
        }
    }
</script>