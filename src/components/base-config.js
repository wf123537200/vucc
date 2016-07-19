var componentBaseParamConfig = {
    appendClass: {
        type: String,
        default: ''
    },
    appendStyle: {
        type: Object,
        default() {
            return {}
        }
    }
};

module.exports = {
    componentBaseParamConfig: componentBaseParamConfig
};