<template>
    <v-label-dropdown :data="staff.data"
                      :selected.sync="staff.selected" :disabled="staff.disabled">
    </v-label-dropdown>

    <a class="demo-link" href="../components/label-dropdown.html">组件连接</a>
</template>

<script>
    import vLabelDropdown from '../../src/components/label-dropdown';

    export default {
        components: {
            vLabelDropdown
        },
        data() {
            return {
                staff: {
                    data : [
                        {userId:1, userName: 'hill'},
                        {userId:2, userName: 'shijia'},
                        {userId:3, userName: 'zac'},
                        {userId:4, userName: 'admin'}
                    ],
                    selected : [{
                        userId : 1,
                        userName : 'hill'
                    },{
                        userId : 2,
                        userName : 'shijia'
                    }],
                    disabled : [{
                        userId : 100,
                        userName : 'admin'
                    }]
                }
            }
        }
    }
</script>