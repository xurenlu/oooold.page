<template>
  <div id="content">
    <a href="/">
    <header>一米六二的Blog</header>
      </a>

    <div class="  help-md">
      <div class="panel-heading">
        <div class="nothing">
          <a href="/">&lt;&lt;返回首页</a>
        </div>
        <h3>
          {{item.title}}
        </h3>
      </div>

      <div class="">
        <span v-html="html"></span>

      </div>

      <div class="disqus">
        <div id="disqus_thread"></div>


      </div>
    </div>


    {{msg}}
  </div>
</template>
<style>
  .help-md {
    width:80%;
    min-Height:200px;
  }
   header {
    font-size:64px;
    height:100px;
    padding:0;
  }
</style>
<script>
  const axios = require("axios");

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
