// 其实是很不想引入vue的,不得已额
const Vue = require('vue');
const vMessageBox = require('./index');

class MessageBox {
    constructor(obj) {
        Object.assign(this, obj);
    }
}

MessageBox.init = function(obj) {
    let mb = new MessageBox(obj);
    let tmpDiv = document.createElement('div');

    document.body.appendChild(tmpDiv);

    return this.messageBox = new Vue({
        el: tmpDiv,
        template: `<v-message-box
                                :id="id" :type="type"
                                :title="title"
                                :explain="explain"
                                :on-ok="onOk"
                                :on-cancel="onCancelWrap"
                                :is-use-html="isUseHtml"
                                :is-show="isShow"></v-message-box>`,
        data: {
            type: mb.type,
            id: mb.id || ('MessageBox' + Math.random().toString(36).substr(3, 15)),
            title: mb.title,
            explain: mb.explain,
            onOk: mb.onOk,
            onCancel: mb.onCancel,
            isShow: mb.isShow || true,
            isUseHtml: mb.isUseHtml || false
        },
        methods: {
            onCancelWrap() {
                this.onCancel && this.onCancel();
                this.$el.remove();
            },
            hide() {
                this.$el.remove();
            }
        },
        components: {
            vMessageBox
        },
        mounted() {
            window.$$dialog = window.$$dialog || {};
            window.$$dialog[this.id] = this;
            this.isShow = true;
        }
    })
};

module.exports = MessageBox;