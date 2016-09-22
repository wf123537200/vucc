var fs = require("fs");
var path = require('path');

let BuildComponents = function (option) {
    this.distArray = option;
};

BuildComponents.prototype.apply = function(compiler, callback) {
    const _this = this;

    // 替换id
    compiler.plugin("make", function(compilation, callback) {
        compilation.applyModuleIds = function() {
            var unusedIds = [];
            var nextFreeModuleId = 20000;
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

    compiler.plugin("after-emit", (compilation, callback) => {
        // console.log(_this.distArray);
        // console.log(_this.nameList);

        for(let i in _this.distArray) {

            // console.log(path.join(__dirname, '../dist' + i));
            fs.readFile(path.join(__dirname, '../dist' + i + '.js'), (err, data) => {
                if(err) {
                    throw err;
                }
                let name = i.match(/\/(.*)\//)[1].replace(/^(\w)|(-\w)/g, function($0) {return $0.replace('-', '').toUpperCase()});
                name = 'v' + name;
                let fileData = data.toString();
                const matchList = fileData.match(/return\s\w\.m=\w\,\w\.c=\w\,\w\.\w=\"\"\,(\w)\(0\)/);
                if(matchList.length < 2) throw '没有匹配到数据!?';
                const tmp = matchList[1];
                fileData = fileData.replace(/return\s\w\.m=\w\,\w\.c=\w\,\w\.\w=\"\"\,\w\(0\)/, tmp + '(0);return module.exports=window.' + name + '=' + tmp + '(0);');

                fs.writeFile(path.join(__dirname, '../dist' + i + '.js'), fileData, (err) => {
                    if (err) throw err;

                    callback();
                });
            });
        }
    });
};

module.exports = BuildComponents;