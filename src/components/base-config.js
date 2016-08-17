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

var alias = {
    asValue: {
        type: String
    },
    asLabel: {
        type: String
    }
};

function name2Alias(data, asValue, asLabel) {
    if(!asValue && !asLabel) return data;

    data.forEach(function(it) {
        it.value = it[asValue];
        it.label = it[asLabel];
    });
};

module.exports = {
    componentBaseParamConfig: componentBaseParamConfig,
    alias: alias,
    name2Alias: name2Alias
};