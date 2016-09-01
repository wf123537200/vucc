vucc (vue 组件库)


任何问题,可以联系
123537200@qq.com

vue 组件部分

一 使用

1 框架载入

a) npm引入

npm install vucc

或者:

package.json 中配置 dependencies

"vucc" : "^0.9.0"

b) 标签引入

下载源代码

script引入/dist/app.js

link引入/dist/style.css

2 使用

a) 全局使用,整个框架引入

示例:

var vucc = require('vucc');

new Vue({
    el: '#app',
    components: vucc
});

b) 单组件使用,需要webpack环境

var vButton = require('vucc').vButton;

或者

var vButton = require('vucc/scr/components/button');


二 开发

1,开发模式

npm run dev

2,生产模式

npm run prd

三 历史
0.9.4 table组件增加trClick方法,便于给行绑定事件

