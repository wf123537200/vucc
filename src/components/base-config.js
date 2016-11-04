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
        if(asValue && asValue !== 'value') it.value = it[asValue];
        if(asLabel && asLabel !== 'label') it.label = it[asLabel];
    });
};

module.exports = {
    componentBaseParamConfig: componentBaseParamConfig,
    alias: alias,
    name2Alias: name2Alias
};