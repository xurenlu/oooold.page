<template>

  <div id="app" v-bind:style="{fontSize: fontSize}">
    <router-view></router-view>
  </div>
</template>

<script>
//import axios from "../axios";
import BlogFoot from "./BlogFoot.vue";
import BlogHead from "./BlogHead.vue";
const axios = require("axios");
export default {
  name: 'app',
  data () {
   //
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [
      { title: 'Foo' ,postId:1},
      { title: 'Bar' ,postId:2},

      ],
       fontSize:"1rem"
    }
  },
  components:{
    BlogHead:BlogHead,BlogFoot:BlogFoot
  },

  mounted(){
    var browser={
    versions:function(){
           var u = navigator.userAgent, app = navigator.appVersion;
           return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}

  if(browser.versions.mobile || browser.versions.ios || browser.versions.android ||
  	browser.versions.iPhone || browser.versions.iPad){
   		this.fontSize = "2.5rem";
    }

  }
}




</script>

<style lang="scss">
  body {
    background-color:#eee;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    margin-top: 60px;
    background-color:white;
  }

  h1, h2 {
    font-weight: normal;
  }
  h1,h2,h3,h4,h5,h6 {
    font-size:inherit !important;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  ul li {
    display: inline-block;
    margin: 0 10px;
  }

  ol li {
    list-style: none;
  }

  a {

  }

  .help-md p {
    line-height: 1.5em !important;
    text-indent: 2em;
  }

  #app {

  }
  html, body {
    font-family: "SF UI Display", ".PingFang SC", "PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
    font-size: 18px;

    color: #222;
    -webkit-text-size-adjust: none;
    min-width: 200px;
    max-width: 1200px;
    margin: 0 auto;

    line-height: 0rem;

  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "PT Sans", "SF UI Display", ".PingFang SC", "PingFang SC", "Neue Haas Grotesk Text Pro", "Arial Nova", "Segoe UI", "Microsoft YaHei", "Microsoft JhengHei", "Helvetica Neue", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "Hiragino Sans GB", sans-serif;
    text-rendering: optimizelegibility;
    margin-bottom: 1em;
    font-weight: bold;
    line-height: 1.8rem;

  }

  h1, h2 {
    position: relative;
    padding-top: 1rem;
    padding-bottom: 0.2rem;
    margin-bottom: 1rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAABCAYAAACsXeyTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAFUlEQVQIHWNIS0sr/v//PwMMDzY+ADqMahlW4J91AAAAAElFTkSuQmCC') bottom left repeat-x;
  }

  h2 {
    padding-top: 0.8rem;
    padding-bottom: 0.2rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  h4 {
    font-size: 1.1rem;
  }

  h5 {
    font-size: 1.0rem;
  }

  h6 {
    font-size: 0.9rem;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    margin-top: 0.8rem;
    margin-bottom: 1.4rem;
  }

  tr {
    background-color: #fff;
    border-top: 1px solid #ccc;
  }

  th, td {
    padding: 5px 14px;
    border: 1px solid #ddd;
  }

  blockquote {
    font-style: italic;
    font-size: 1.1em;
    line-height: 1.5em;
    padding-left: 1em;
    border-left: 4px solid #D5D5D5;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 1.5rem;
  }

  a {
    color: #1863a1
  }

  pre, code, p code, li code {
    font-family: Menlo, Monaco, "Andale Mono", "lucida console", "Courier New", monospace
  }

  pre {
    -webkit-border-radius: 0.4em;
    -moz-border-radius: 0.4em;
    -ms-border-radius: 0.4em;
    -o-border-radius: 0.4em;
    border-radius: 0.4em;
    border: 1px solid #e7dec3;
    line-height: 1.45em;
    font-size: 0.9rem;
    margin-bottom: 2.1em;
    padding: .8em 1em;
    color: #586e75;
    overflow: auto;
    background-color: #fdf6e3;
  }

  p code, li code {
    display: inline-block;
    white-space: no-wrap;
    background: #fff;
    font-size: 0.9rem;
    line-height: 1.5em;
    color: #555;
    border: 1px solid #ddd;
    -webkit-border-radius: 0.4em;
    -moz-border-radius: 0.4em;
    -ms-border-radius: 0.4em;
    -o-border-radius: 0.4em;
    border-radius: 0.4em;
    padding: 0 .3em;
    margin: -1px 4px;
  }

  p pre code, li pre code {
    font-size: 1em !important;
    background: none;
    border: none
  }

  img {
    max-width: 100%;
    -webkit-border-radius: 0.3em;
    -moz-border-radius: 0.3em;
    -ms-border-radius: 0.3em;
    -o-border-radius: 0.3em;
    border-radius: 0.3em;
    -webkit-box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    -moz-box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0 1px 4px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border: #fff 0.5em solid
  }

  hr {
    height: 0;
    margin: 15px 0;
    overflow: hidden;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #ddd;
  }

  /*

  Orginal Style from ethanschoonover.com/solarized (c) Jeremy Hull <sourdrums@gmail.com>

  */

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #fdf6e3;
    color: #657b83;
    -webkit-text-size-adjust: none;
  }

  .hljs-comment,
  .diff .hljs-header,
  .hljs-doctype,
  .hljs-pi,
  .lisp .hljs-string {
    color: #93a1a1;
  }

  /* Solarized Green */
  .hljs-keyword,
  .hljs-winutils,
  .method,
  .hljs-addition,
  .css .hljs-tag,
  .hljs-request,
  .hljs-status,
  .nginx .hljs-title {
    color: #859900;
  }

  /* Solarized Cyan */
  .hljs-number,
  .hljs-command,
  .hljs-string,
  .hljs-tag .hljs-value,
  .hljs-rule .hljs-value,
  .hljs-doctag,
  .tex .hljs-formula,
  .hljs-regexp,
  .hljs-hexcolor,
  .hljs-link_url {
    color: #2aa198;
  }

  /* Solarized Blue */
  .hljs-title,
  .hljs-localvars,
  .hljs-chunk,
  .hljs-decorator,
  .hljs-built_in,
  .hljs-identifier,
  .vhdl .hljs-literal,
  .hljs-id,
  .css .hljs-function,
  .hljs-name {
    color: #268bd2;
  }

  /* Solarized Yellow */
  .hljs-attribute,
  .hljs-variable,
  .lisp .hljs-body,
  .smalltalk .hljs-number,
  .hljs-constant,
  .hljs-class .hljs-title,
  .hljs-parent,
  .hljs-type,
  .hljs-link_reference {
    color: #b58900;
  }

  /* Solarized Orange */
  .hljs-preprocessor,
  .hljs-preprocessor .hljs-keyword,
  .hljs-pragma,
  .hljs-shebang,
  .hljs-symbol,
  .hljs-symbol .hljs-string,
  .diff .hljs-change,
  .hljs-special,
  .hljs-attr_selector,
  .hljs-subst,
  .hljs-cdata,
  .css .hljs-pseudo,
  .hljs-header {
    color: #cb4b16;
  }

  /* Solarized Red */
  .hljs-deletion,
  .hljs-important {
    color: #dc322f;
  }

  /* Solarized Violet */
  .hljs-link_label {
    color: #6c71c4;
  }

  .tex .hljs-formula {
    background: #eee8d5;
  }


</style>
