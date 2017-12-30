<template>
  <div id="content">
    <BlogHead/>
    <article class="help-md" id="post">
      <div class="panel-heading">
        <div class="nothing">
          <a href="/">&lt;&lt;返回首页</a>
        </div>
        <title>
          {{item.title}}
        </title>
      </div>

      <div class="">
        <span v-html="html"></span>
      </div>
      <div class="dashang-wrapper">
        <div> 如果您觉得对您有帮助，欢迎打赏。</div>
        <img src="https://yl162cm.oss-cn-beijing.aliyuncs.com/dist/code.jpg" class="dashang"/>
      </div>

      <div class="disqus">
        <div id="disqus_thread"></div>
      </div>
    </article>


    <BlogFoot/>
  </div>
</template>
<style>
.dashang-wrapper {
margin-top:50px;
  text-align:center;
}
.dashang {
  min-width:250px;
  max-width:400px;
  min-height:250px;
  max-height:400px;
}
#content {
  background:white;
}
  .help-md {
    width:95%;

    min-Height:200px;
  }

  #post {
      color: #2c353d;
    line-height: 1.5;
width:95%;
    }
    @media screen and (min-width: 801px) {
      #post {
        padding-left:180px;
        padding-right:80px;
        width:85%;
      }
    }





</style>
<script>
  const axios = require("axios");
import BlogFoot from "./BlogFoot.vue";
import BlogHead from "./BlogHead.vue";
  var remark = require('remark');
var html  = require('remark-html');
var hljs  = require('remark-highlight.js');



    //text      = '#hello, markdown!',
    //html      = converter.makeHtml(text);
    export default{
        data(){
            return{
                msg:' ',
                item:{
                },
                html:""
            }
        },
    components:{
    BlogHead:BlogHead,BlogFoot:BlogFoot
  },
        mounted(){
          let self = this;

        //console.log($route.params);
          axios.get("/data/"+this.$route.params.postId+".json").then(function(response){
            //console.log(response.data);
            self.item = response.data;
            //console.log(response.data);
            let content = response.data.zzzContent;
            console.log(content);
            //content += "\n1. Hey \n2. Cute.\n## hello world";
            //let html = converter.makeHtml(content);
            //console.log(html);

          let c = remark().use([ html, hljs ]).processSync(content )
            self.html = c.contents;
          });

        }
    }







</script>
