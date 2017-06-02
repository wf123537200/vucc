import pvCheckbox from '../checkbox'

export default {
    components: {
        pvCheckbox
    },
    render(h) {
        return (
            <table class="vc-table-body-wrap">
                <tbody>
                {
                    this._l(this.dataShow, (row, index) => {
                        return <tr>
                            {
                                this._l(this.body, (el, ins) => {
                                    const getStyle = (el) => {
                                        const s = el.style;
                                        let res = [];

                                        for (let key in s) {
                                            res.push(key + ': ' + s[key]);
                                        }

                                        return res.join('; ')
                                    };

                                    if(ins === 0 && this.hasSelectAll) {
                                        return <td style={getStyle(el)}>
                                            <label on-click={($event) => this.handlerClick($event, row)}
                                                   class={row.isDisabled ? 'vc-label all-select-checkbox vc-label-disabled' : 'vc-label all-select-checkbox'}>
                                                <span class="vc-checkbox"></span>
                                                <span class="vc-label-text"> </span>
                                            </label>
                                            {row[el.key] !== void 0 ?  row[el.key] : el.renderCell.call(this._renderProxy, h, {row, el, index})}
                                        </td>
                                    } else {
                                        return <td style={getStyle(el)}>
                                            {row[el.key] !== void 0 ?  row[el.key] : el.renderCell.call(this._renderProxy, h, {row, el, index})}
                                        </td>
                                    }
                                })
                            }
                        </tr>
                    })
                }
                </tbody>
            </table>
        )
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        body: {
            type: Array,
            default() {
                return [];
            }
        },
        pageSize: Number,
        currentPage: Number,
        hasSelectAll: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            dataShow: []
        }
    },

    watch: {
        data: {
            deep: true,
            handler() {
                this.calcDataShow();
            }
        },
        currentPage() {
            this.calcDataShow();
        },
        pageSize() {
            this.calcDataShow();
        }
    },

    methods: {
        calcDataShow(sort, sortFn) {
            this.dataShow = [];

            if(sort !== undefined) {
                if(sortFn) {
                    sortFn(this.data, sort);
                } else {
                    this.data.sort((a, b) => {
                        if(sort) return a.index - b.index;
                        else return b.index - a.index;
                    })
                }
            }

            if (this.data && this.data.length > 0) {
                let temp = this.isReal ? this.data : this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);

                temp.forEach((it, index) => {
                    this.dataShow.push(Object.assign({}, {
                        isChecked: false
                    }, it))
                });
            }
        },
        handlerClick($event, row) {
            if(row.isDisabled) return;

            row.isChecked = !row.isChecked;

            if(row.isChecked) {
                $event.srcElement.parentElement.classList.add('vc-label-checked');
            } else {
                $event.srcElement.parentElement.classList.remove('vc-label-checked');

                this.$parent.$emit('tableTdSelect', false);
            }
        }
    },

    mounted() {
        this.calcDataShow();

        this.$parent.$on('tableSort', (isUp, sortFn) => {
            this.calcDataShow(isUp, sortFn);
        });

        this.$parent.$on('tableAllSelect', (val) => {
            this.dataShow.forEach((it) => {
                it.isChecked = val;
            });

            const checkbox = this.$el.querySelectorAll('.vc-table-body-wrap .all-select-checkbox') || [];

            checkbox.forEach((it) => {
                if(val) {
                    it.classList.add('vc-label-checked');
                } else {
                    it.classList.remove('vc-label-checked');
                }
            });
        });
    }
}