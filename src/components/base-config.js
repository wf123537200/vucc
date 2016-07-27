var componentBaseParamConfig = {
    appendClass: {
        type: String,
        default: ''
    },
    appendStyle: {
        type: Object,
        default: function() {
            return {}
        }
    }
};

module.exports = {
    componentBaseParamConfig: componentBaseParamConfig
};