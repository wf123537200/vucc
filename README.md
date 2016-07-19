tbd-design (fork from tencent big data component lib)

任何问题,可以联系
zakwu@tencent.com

vue 组件部分

一 使用

1 框架载入

a) tnpm引入

tnpm install @tencent/tbd-design-vue

或者:

package.json 中配置 dependencies

"@tencent/tbd-design-vue": "^0.2.0",

b) 标签引入

下载源代码

script引入/res/app.js(没有使用模块化系统的情况下,引入app4no-modules.js)

link引入/assets/css/tbd-index.css

2 使用

a) 全局使用,整个框架引入

示例:

var tbdDesign = require('@tencent/tbd-design-vue');

new Vue({
    el: '#app',
    components: tbdDesign
});

b) 单组件使用

var vButton = require('@tencent/tbd-design-vue').vButton;

或者

var tbdDesign = require('@tencent/tbd-design-vue/scr/components/button');


二 开发

1,开发模式

npm run dev

2,生产模式

npm run res


