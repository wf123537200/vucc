export default {
    render(h) {
        return (
            <table>
                <tbody>
                {
                    this._l(this.dataShow, (row, index) => {
                        return <tr>
                            {
                                this._l(this.body, (el) => {
                                    const getStyle = (el) => {
                                        const s = el.style;
                                        let res = [];

                                        for (let key in s) {
                                            res.push(key + ': ' + s[key]);
                                        }

                                        return res.join('; ')
                                    };

                                    return <td style={getStyle(el)}>
                                        {row[el.key] !== void 0 ?  row[el.key] : el.renderCell.call(this._renderProxy, h, {row, el, index})}
                                    </td>
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
        currentPage: Number
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
        calcDataShow() {
            this.dataShow = [];

            if (this.data && this.data.length > 0) {
                let temp = this.isReal ? this.data : this.data.slice(this.pageSize * (this.currentPage - 1), this.pageSize * this.currentPage);

                temp.forEach((it, index) => {
                    this.dataShow.push(Object.assign({}, {
                        isChecked: false
                    }, it))
                });
            }
        }
    },

    mounted() {
        this.calcDataShow();
    }
}