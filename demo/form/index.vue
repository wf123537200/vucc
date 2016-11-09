<template>
    <div>
        <div>
            <h3>水平</h3>
            <div>
                <v-form>
                    <v-form-item
                            :is-explain-show="true"
                            :explain-text="'输入正确'"
                            :explain-type="'success'"
                            label="账户：">

                        <v-input placeholder="请输入账户名"></v-input>
                    </v-form-item>

                    <v-form-item
                            label="密码：">
                        <v-input type="password" placeholder="请输入密码"></v-input>
                    </v-form-item>

                    <v-form-item>
                        <label>
                            <v-checkbox :data="[{label: '记住我', value: true}]"></v-checkbox>
                        </label>
                    </v-form-item>

                    <v-button type="primary">登录</v-button>
                </v-form>
            </div>

            <h3>垂直</h3>
            <div>
                <v-form :is-vertical="true" :is-valid="false">
                    <v-form-item
                            :is-require="true"
                            :label="'账户：'"
                            :is-explain-show="true"
                            :explain-text="'输入错误'"
                            :explain-type="'error'"
                            :label-col=4
                            :wrapper-col=8>
                        <v-input placeholder="请输入账户名"></v-input>
                    </v-form-item>

                    <v-form-item
                            :label="'密码：'"
                            :is-explain-show="true"
                            :explain-text="'输入正确'"
                            :explain-type="'success'"
                            :label-col=4
                            :wrapper-col=8>
                        <v-input type="password" placeholder="请输入密码"></v-input>
                    </v-form-item>

                    <v-form-item
                            :label="'密码：'"
                            :is-explain-show="true"
                            :explain-text="'警告提示'"
                            :explain-type="'warning'"
                            :label-col=4
                            :wrapper-col=8>
                        <v-input placeholder="请输入密码"></v-input>
                    </v-form-item>

                    <v-form-item
                            :label="'密码：'"
                            :is-explain-show="true"
                            :explain-text="'验证中提示'"
                            :explain-type="'feedback'"
                            :label-col=4
                            :wrapper-col=8>
                        <v-input type="password" placeholder="请输入密码"></v-input>
                    </v-form-item>

                    <v-form-item
                            label="选中："
                            label-col=4
                            wrapper-col=4>
                        <label>
                            <v-checkbox :data="[{label: '记住我', value: true}]"></v-checkbox>
                        </label>
                    </v-form-item>

                    <v-form-item
                            label="多选："
                            label-col=4
                            wrapper-col=4>
                        <label>
                            <v-checkbox :data="[{label: '我是A', value: true}]"></v-checkbox>
                            <v-checkbox :data="[{label: '我是B', value: true}]"></v-checkbox>
                            <v-checkbox :data="[{label: '我是C', value: true}]"></v-checkbox>
                        </label>
                    </v-form-item>

                    <v-form-item
                            label="开关："
                            label-col=4
                            wrapper-col=4>
                        <label>
                            <v-switch></v-switch>
                        </label>
                    </v-form-item>

                    <v-form-item
                            label-col=4
                            wrapper-col=4>
                        <v-button :type="'primary'">登录</v-button>
                    </v-form-item>
                </v-form>
            </div>
        </div>
        <a class="demo-link" href="../components/form.html">组件连接</a>
    </div>
</template>

<script>
    import vForm from '../../src/components/form';
    import vFormItem from '../../src/components/form-item';
    import vButton from '../../src/components/button';
    import vInput from '../../src/components/input';
    import vCheckbox from '../../src/components/checkbox';
    import vSwitch from '../../src/components/switch';

    export default {
        components: {
            vCheckbox,
            vInput,
            vForm,
            vFormItem,
            vButton,
            vSwitch
        }
    }
</script>