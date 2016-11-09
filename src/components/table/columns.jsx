export default {
    render(c) {
        this.template = this.$slots.template || '';

        return c('div',
            {
                attrs: {
                    class: 'vc-columns'
                }
            })
    },
    props: {
        prop: String,
        label: String,
        data: Object,
        tdStyle: Object,
        renderHeader: Function,
        renderTd: Function
    },

    created() {
        const parent = this.$parent;
        let renderCellX = () => {};
        let renderCell = (h, data) => {
            if (this.$vnode.data.inlineTemplate) {
                renderCellX = () => {
                    data._renderProxy = this._renderProxy;
                    data._staticTrees = this._staticTrees;
                    data._m = this._m;

                    debugger
                    return this.$options.render.call(data);
                };
            }

            return renderCellX();
        };

        // 构造parent
        parent.header.push({
            label: this.renderHeader ? this.renderHeader() : this.label,
            style: Object.assign({
                width: (100 / parent.colsNum) + '%'
            }, this.thStyle || this.tdStyle)
        });

        parent.body.push({
            key: this.prop,
            style: Object.assign({
                width: (100 / parent.colsNum) + '%'
            }, this.tdStyle),
            template: this.template,
            renderCell
        });

    }
}