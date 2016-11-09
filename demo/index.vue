<template>
  <!-- text body-->
  <div class="doc-index doc-container">
    <section class="doc-main">
      <h2>基本元素</h2>

      <div class="doc-example">
        <t-button></t-button>
        <t-button-group></t-button-group>
        <t-switch></t-switch>
        <t-checkbox></t-checkbox>
        <t-radio></t-radio>
        <t-select></t-select>
        <t-multi-select></t-multi-select>
      </div>

      <h2>弹窗</h2>
      <div class="doc-example">
        <t-tips></t-tips>
        <t-alert></t-alert>
        <t-message-box></t-message-box>
        <t-dialog></t-dialog>
      </div>

      <h2>标签页</h2>
      <div class="doc-example">
        <t-tabs></t-tabs>
      </div>

      <h2>表格</h2>
      <div class="doc-example">
        <t-table></t-table>
      </div>

      <h2>分页</h2>
      <div class="doc-example">
        <t-pagination></t-pagination>
      </div>

      <h2>滑动输入条</h2>
      <div class="doc-example">
        <t-slider></t-slider>
      </div>

      <h2>徽标数</h2>
      <div class="doc-example">
        <t-badge></t-badge>
      </div>

      <h2>输入框和文本域</h2>
      <div class="doc-example">
        <t-input></t-input>
        <t-textarea></t-textarea>
      </div>

      <h2>折叠面板</h2>
      <div class="doc-example">
        <t-collapse></t-collapse>
      </div>

      <h2>折叠面板组</h2>
      <div class="doc-example">
        <t-collapse-group></t-collapse-group>
      </div>

      <h2>步进输入框</h2>
      <div class="doc-example">
          <t-step-input></t-step-input>
      </div>

      <h2>进度条</h2>
      <div class="doc-example">
        <t-progress></t-progress>
      </div>

      <h2>加载</h2>
      <div class="doc-example">
        <t-loading></t-loading>
      </div>

      <h2>步骤条</h2>
      <div class="doc-example">
        <t-steps></t-steps>
      </div>

      <h2>文字提示</h2>
      <div class="doc-example">
        <t-tool-tip></t-tool-tip>
      </div>

      <h2>时间轴</h2>
      <div class="doc-example">
        <t-time-line></t-time-line>
      </div>

      <h2>标签列表</h2>
      <div class="doc-example">
        <t-tag-list></t-tag-list>
      </div>

      <h2>树形列表</h2>
      <div class="doc-example">
        <t-tree></t-tree>
      </div>

      <h2>穿梭框</h2>
      <div class="doc-example">
        <t-transfer></t-transfer>
      </div>

      <h2>表单</h2>
      <div class="doc-example">
        <t-form></t-form>
      </div>

      <h2>搜索框</h2>
      <div class="doc-example">
        <t-search></t-search>
      </div>

      <h2>日期选择器</h2>
          <div class="doc-example">
          <t-datepicker></t-datepicker>
      </div>

    </section>

    <div class="doc-footer">
      <p>维护： Zakwu / <a href="mailto:123537200@qq.com">email: 123537200@qq.com</a></p>
    </div>
  </div>
</template>

<script>
  import test from './test'

  export default {
    components: Object.assign({}, test)
  }
</script>

<style>
  @charset "UTF-8";

  /* 页面导航 */

  .doc-header ul,
  .doc-header li {
    list-style: none;
  }

  /*==公用菜单==*/

  .doc-header {
    height: 50px;
  }

  .doc-header .inner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background: #41abe1;
    z-index: 102;
  }

  .doc-header .nav {
    margin: 0 auto;
    padding: 0 30px;
  }

  .doc-header .nav li {
    position: relative;
    float: left;
    *display: inline;
    margin-right: 20px;
    *zoom: 1;
  }

  .doc-header .nav a {
    display: block;
    min-width: 80px;
    text-align: center;
    font: 14px/50px 'Microsoft Yahei';
    color: #fff;
    opacity: 0.6;
    filter: alpha(opacity=60);
    text-decoration: none;
  }

  .doc-header .nav a:hover,
  .doc-header .nav .current a {
    opacity: 1;
    filter: alpha(opacity=100);
    text-decoration: none;
  }

  .doc-header .nav .current:after {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -4px;
    content: '.';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 6px;
    border-color: #fff transparent;
    font-size: 0;
  }

  .doc-container {
    margin: 20px auto 0;
  }


  /*==首页==*/

  .doc-index {
  }

  .doc-index h1 {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .doc-index .doc-sidebar {
    display: none;
  }

  .doc-index .doc-main {
    margin-left: 0;
    min-height: 500px;
  }

  /*快速预览*/

  .doc-view {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1100;
    background: #fff;
    overflow: hidden;
  }

  .doc-view iframe {
    width: 100%;
    height: 100%;
  }

  .doc-view .nav-bar {
    position: absolute;
    right: -252px;
    top: 5px;
    width: 284px;
    overflow: hidden;
    *zoom: 1;
    -webkit-transition: all 0.5s ease-in;
    -moz-transition: all 0.5s ease-in;
    -ms-transition: all 0.5s ease-in;
    transition: all 0.5s ease-in;
  }

  .doc-view .nav-bar:hover,
  .doc-view .nav-bar.show {
    right: 0;
  }

  .doc-view .links {
    float: left;
  }

  .doc-view .links a {
    display: block;
    margin: 0 -1px -1px 0;
    width: 30px;
    height: 30px;
    border: 1px solid #d1d5d9;
    background: #f4f5f8;
    text-align: center;
    font: 12px/30px 'Microsoft Yahei';
    vertical-align: middle;
  }

  .doc-view .links a:hover {
    text-decoration: none;
    background: #fff;
    color: #383d49;
  }

  .doc-view .links .close {
    font-size: 18px;
  }

  .doc-view .links a:first-child {
    border-top-left-radius: 5px;
  }

  .doc-view .links a:last-child {
    border-bottom-left-radius: 5px;
  }

  .doc-view .nav {
    margin-left: 32px;
    padding: 10px;
    height: 400px;
    background: #f4f5f8;
    border: 1px solid #d1d5d9;
    border-radius: 5px;
    border-top-left-radius: 0;
    box-shadow: 0 0 2px rgba(73, 56, 61, 0.3);
    overflow: auto;
  }

  .doc-view .nav label {
    display: block;
    margin-bottom: 10px;
  }

  .doc-view .nav input {
    margin-top: 3px;
    padding: 4px 10px;
    width: 201px;
    height: 19px;
    border: 1px solid #dee2e5;
    border-color: #bdc4ca #bdc4ca #dee2e5 #dee2e5;
    line-height: 18px;
    font-size: 12px;
  }

  .doc-view .nav h2 {
    margin-bottom: 5px;
    font-weight: bold;
    cursor: pointer;
    opacity: 0.6;
    filter: alpha(opacity=60);
  }

  .doc-view .nav h2.open {
    opacity: 1;
    filter: alpha(opacity=100);
  }

  .doc-view .nav .pages {
    margin: 0 0 5px 10px;
    display: none;
  }

  .doc-view .nav li {
    padding: 3px 0;
  }

  .doc-view .nav a {
    opacity: 0.6;
    filter: alpha(opacity=60);
  }

  .doc-view .nav a:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }

  .doc-view .nav .current a {
    opacity: 1;
    filter: alpha(opacity=100);
    font-weight: bold;
  }


  /*快速预览——只有导航条*/

  .doc-view.justbar {
    position: static;
    height: 0;
    overflow: visible;
  }

  .doc-view.justbar .nav-bar {
    position: fixed;
    top: 60px;
    z-index: 1002;
  }


  /*==公用ui控件==*/

  .doc-main > h1,
  .doc-main > h2,
  .doc-main > h3,
  .doc-main > h4,
  .doc-main > h5,
  .doc-main > h6 {
    margin-bottom: 20px;
    font-weight: bold;
    color: #222;
  }

  .doc-main > h1 {
    font-size: 26px;
  }

  .doc-main > h2 {
    font-size: 20px;
  }

  .doc-main > p {
    margin-bottom: 10px;
  }

  .doc-main > pre {
    margin-bottom: 20px;
    padding: 8px 15px;
    max-height: 200px;
    background: #f8f8f8;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    overflow-x: auto;
    font-size: 12px;
    white-space: pre-wrap;
    *white-space: pre;
    word-break: break-all;
  }

  .doc-table {
    width: 100%;
    border-collapse: collapse
  }

  .doc-table th,
  .doc-table td {
    text-align: left;
    padding: 5px 10px;
    border-bottom: 1px solid #e5e5e5
  }

  .doc-table .i-name {
    margin-left: 5px;
  }

  .doc-example {
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 0 10px rgba(56, 61, 73, 0.05);
    *zoom: 1;
  }

  .doc-example-gray-bg {
    background: #e5e9ec;
  }

  .doc-example pre {
    display: block;
    margin: 15px -15px -15px;
  }

  .doc-example pre code {
    margin: 0;
  }

  .doc-example code {
    display: block;
    margin: 15px -15px -15px;
    padding: 10px 20px;
    max-height: 200px;
    background: #fafafc;
    border-radius: 0 0 4px 4px;
    border-top: 1px solid #ddd;
    overflow: auto;
    font-size: 12px;
    white-space: pre-wrap;
    *white-space: pre;
    word-break: break-all;
  }

  .doc-example .doc-part {
    padding: 15px 15px 15px 15px;
  }

  .doc-sidebar {
    position: fixed;
    *left: 20%;
    left: 20px;
    width: 200px;
    max-height: 80%;
    overflow: auto;
  }

  .doc-sidebar-nav {
    margin: 0;
    padding-left: 10px;
    list-style: none;
  }

  .doc-sidebar-nav a {
    display: block;
    padding-left: 20px;
    font:12px/2 'Microsoft Yahei';
    text-decoration: none;
    color: #767676;
  }

  .doc-sidebar-nav a:hover {
    border-left: 1px solid #41abe1;
    padding-left: 19px;
    color: #41abe1;
  }

  .doc-main {
    margin-left: 200px;
    padding: 0 20px;
  }

  .doc-footer {
    font-size: 12px;
    width: 100%;
    text-align: center;
    height: 30px;
  }


  /*==公用布局==*/

  .doc-mod {
    margin: 10px auto;
    width: 1260px;
    border: 1px solid #d7dcdf;
    background: #fff;
  }

  .doc-mod > .hd {
    padding: 0 20px;
    height: 46px;
    background: #fafafc;
    border-bottom: 1px solid #e1e5e7;
  }

  .doc-mod > .hd > h2 {
    display: inline;
    font: bold 18px/46px 'Microsoft Yahei';
  }

  .doc-mod > .bd {
    padding: 25px;
    min-height: 120px;
  }


  /*模块分组*/

  .doc-summary {}

  .doc-summary > .hd {
    padding: 0 20px;
    height: 28px;
    border-top: 1px solid #c6cdd3;
    background: #f4f5f8;
  }

  .doc-summary > .hd h3 {
    float: left;
    font: bold 14px/28px 'Microsoft Yahei';
    color: #383838;
  }

  .doc-summary > .bd {
    padding: 10px 0;
  }

  .doc-icons {
    margin: 0 -10px;
    overflow: hidden;
    *zoom: 1;
  }

  .doc-icons li {
    float: left;
    margin: 0 10px 10px;
    width: 150px;
    text-align: center;
    color: #767676;
    border-radius: 5px;
    -webkit-transition: all 0.3s linear;
    transition: all 0.3s linear;
  }
  .doc-icons li:hover {
    background: #41abe1;
    color: #fff;
  }
  .doc-icons li > span {
    display: table-cell;
    width: 150px;
    height: 100px;
    vertical-align: middle;
  }

  .doc-icons .vci {
    margin-bottom: 10px;
    font-size: 24px;
  }

  .doc-col-demo {
    padding: 10px;
    border: 1px solid #999;
  }

  .demo-link {
    float: right;
  }
</style>
