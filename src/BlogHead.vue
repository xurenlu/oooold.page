<template>
  <div class="header-wrapper">
  <header>
    <div class="header"><a href="/">一米六二</a></div>
  </header>
  <div class="sub-header">
    <span class="very-gray">十二年</span>老博客
  </div>
    <div class="subsub">
      年头长有啥用?
    </div>
  </div>
</template>
<style>
  div.header a:hover {
    text-decoration:none;
  }
  div.sub-header {
    float:right;
    padding-right:200px;
    margin-top:-20px;
    font-size:2rem;
    color:#bbb;
  }
  @media screen and (min-width: 1000px) {
    div.sub-header {
      padding-right:400px;
    }
  }
    div.subsub {
    float:right;
    padding-right:290px;
    margin-top:10px;
    font-size:12px;
    color:#bbb;
  }
  div.sub-header .very-gray {
    color:#999;
    text-decoration:line-through;
    text-decoration-style:solid;
    text-decoration-color:#1863a1;
  }
  div.sub-header .very-gray :after {
    content:"";
  }
  div.sub-header:after {
    clear:both;

  }
  div.header {
  font-size:4rem;
    height:100px;
    padding:0;
    width:95%;

   text-align:center;
    }

  @media screen and (max-width: 600px) {
  div.header {
   font-size:2rem;
   height:50px;
  }
    div.sub-header {
      display:none;
    }
    div.subsub {
      display:none;
    }
  }
@media screen and (min-width: 801px) {
  div.header {
    padding-left:80px;
    padding-right:80px;
     width:85%;
    }
}


</style>
<script>

    export default{
        data(){
            return{

            }
        },
        components:{
        }
    }


</script>
