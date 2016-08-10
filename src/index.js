// 自动装载css
try {
    require('./style/main.css');
    //require('../assets/css/tbd-index.css');
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
var vLabelDropdown = require('./components/label-dropdown');
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

/* 为不支持模块化的系统提供简单支持 */
window.__tbd_design__ = {vFormItem, vForm, vTransfer, vTree, vTagList, vTimeLine, vToolTip, vSteps, vLoading, vProgress, vStepInput, vPagination, vPane, vCollapseGroup, vCollapse, vInput, vTextarea, vBadge, vAlert, vTableEdit, vLabelDropdown, vSlider, vTable, vButton, vButtonGroup, vSwitch, vCheckbox, vRadio, vDropdown, vSelect, vTips, vDialog, vMask, vMessageBox, vTabs, vButtonGroup};
module.exports = {vFormItem, vForm, vTransfer, vTree, vTagList, vTimeLine, vToolTip, vSteps, vLoading, vProgress, vStepInput, vPagination, vPane, vCollapseGroup, vCollapse, vInput, vTextarea, vBadge, vAlert, vTableEdit, vLabelDropdown, vSlider, vTable, vButton, vButtonGroup, vSwitch, vCheckbox, vRadio, vDropdown, vSelect, vTips, vDialog, vMask, vMessageBox, vTabs, vButtonGroup};

// 配置
window.tbdConfig = function(conf) {
    var res = {};
    var prefix = conf.prefix;
    var tbdDesign = window.__tbd_design__;

    for(var key in tbdDesign) {
        res[prefix + key.slice(1)] = tbdDesign[key];
    }

    return res;
};

