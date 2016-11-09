<template>
    <section class="doc-part">
        <h3>按钮组 button-group</h3>
        <v-button-group :data="buttonGroupList"></v-button-group>

        <a class="demo-link" href="../components/button-group.html">组件连接</a>
    </section>
</template>

<script>
    import vButtonGroup from '../../src/components/button-group';

    export default {
        components: {
            vButtonGroup
        },
        data() {
            return {
                // button group
                buttonGroupList: [{
                    text: 'btn1',
                    icon: 'android'
                }, {
                    text: 'btn2',
                    icon: 'apple',
                    isSelected: true,
                    onClick: function() {
                        alert('btn2')
                    }
                }, {
                    text: 'btn3',
                    icon: 'android',
                    onClick: function() {
                        alert('btn3')
                    },
                    isDisabled: true
                }]
            }
        }
    }
</script>