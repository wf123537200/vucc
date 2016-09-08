var fs = require("fs");
var path = require('path');

let BuildComponents = function (option) {
    this.distArray = option;
};

BuildComponents.prototype.apply = function(compiler, callback) {
    const _this = this;

    compiler.plugin("after-emit", function(compilation, callback) {
        console.log(distArray);
    });
};

module.exports = BuildComponents;