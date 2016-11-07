// 自动装载css
try {
    require('./style/main.scss');
} catch (e) {
    console.error('如果不使用css-load,请手动拷贝css,使用link标签进行加载!');
}

// components public interface
var vButton = require('./components/button');
var vButtonGroup = require('./components/button-group');
var vSwitch = require('./components/switch');
var vCheckbox = require('./components/checkbox');
var vRadio = require('./components/radio');
var vDropdown = require('./components/dropdown');
var vSelect = require('./components/select');
var vTips = require('./components/tips');
var vDialog = require('./components/dialog');
var vMask = require('./components/global-mask');
var vMessageBox = require('./components/message-box');
var vTable = require('./components/table');
var vPagination = require('./components/pagination');
var vTabs = require('./components/tabs');
var vSlider = require('./components/slider');
var vTableEdit = require('./components/table-edit');
var vAlert = require('./components/alert');
var vBadge = require('./components/badge');
var vInput = require('./components/input');
var vTextarea = require('./components/textarea');
var vCollapse = require('./components/collapse');
var vCollapseGroup = require('./components/collapse-group');
var vPane = require('./components/pane');
var vStepInput = require('./components/step-input');
var vProgress = require('./components/progress');
var vLoading = require('./components/loading');
var vSteps = require('./components/steps');
var vToolTip = require('./components/tool-tip');
var vTimeLine = require('./components/time-line');
var vTagList = require('./components/tag-list');
var vTree = require('./components/tree');
var vTransfer = require('./components/transfer');
var vForm = require('./components/form');
var vFormItem = require('./components/form-item');
var vSearch = require('./components/search');
var vMultiSelect = require('./components/multi-select');
var vDatepicker = require('./components/datepicker');
// message 的包装代码
window.MessageBox = require('./components/message-box/wrap.js');

/* 为不支持模块化的系统提供简单支持 */
window.__vc_design__ = {vDatepicker, vMultiSelect, vSearch, vFormItem, vForm, vTransfer, vTree, vTagList, vTimeLine, vToolTip, vSteps, vLoading, vProgress, vStepInput, vPagination, vPane, vCollapseGroup, vCollapse, vInput, vTextarea, vBadge, vAlert, vTableEdit, vSlider, vTable, vButton, vButtonGroup, vSwitch, vCheckbox, vRadio, vDropdown, vSelect, vTips, vDialog, vMask, vMessageBox, vTabs, vButtonGroup};
module.exports = window.__vc_design__;

// 配置
window.vcConfig = function(conf) {
    var res = {};
    var prefix = conf.prefix;
    var vcDesign = window.__vc_design__;

    for(var key in vcDesign) {
        res[prefix + key.slice(1)] = vcDesign[key];
    }

    return res;
};

