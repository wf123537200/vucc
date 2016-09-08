var fs = require("fs");
var path = require('path');

let BuildAll = function (option) {
    this.dist = option.dist;
};

BuildAll.prototype.apply = function(compiler, callback) {
    const _this = this;
    compiler.plugin("make", function(compilation, callback) {
        compilation.applyModuleIds = function() {
            var unusedIds = [];
            var nextFreeModuleId = 10000;
            if(this.usedModuleIds) {
                var usedIds = Object.keys(this.usedModuleIds).map(function(key) {
                    return this.usedModuleIds[key];
                }, this).sort();
                var usedNumberIds = usedIds.filter(function(id) {
                    return typeof id === "number";
                });
                nextFreeModuleId = usedNumberIds.reduce(function(a, b) {
                        return Math.max(a, b);
                    }, -1) + 1;
                for(var i = 0; i < nextFreeModuleId; i++) {
                    if(this.usedModuleIds[i] !== i)
                        unusedIds.push(i);
                }
                unusedIds.reverse();
            }
            this.modules.forEach(function(module) {
                if(module.id === null) {
                    if(unusedIds.length > 0)
                        module.id = unusedIds.pop();
                    else
                        module.id = nextFreeModuleId++;
                }
            }, this);
        };

        callback && callback();
    });

    compiler.plugin("after-emit", function(compilation, callback) {
        fs.readFile(_this.dist, (err, data) => {
            if(err) {
                throw err;
            }

            let fileData = data.toString();
            const matchList = fileData.match(/return\s\w\.m=\w\,\w\.c=\w\,\w\.\w=\"\"\,(\w)\(0\)/);
            if(matchList.length < 2) throw '没有匹配到数据!?';
            const tmp = matchList[1];
            fileData = fileData.replace(/return\s\w\.m=\w\,\w\.c=\w\,\w\.\w=\"\"\,\w\(0\)/, tmp + '(0);return module.exports=window.__vc_design__;');

            fs.writeFile(_this.dist, fileData, (err) => {
                if (err) throw err;

                callback();
            });
        });
    });
};

module.exports = BuildAll;