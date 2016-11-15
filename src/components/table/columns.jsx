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
        renderTd: Function,
        isSort: Boolean,
        sortFn: Function
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
            }, this.thStyle || this.tdStyle),
            isSort: this.isSort,
            isSortUp: this.isSort,
            sortFn: this.sortFn
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