<template>

  <footer>
    <div id="footer">
      <div>
        <a href="/">162cm.com</a>,版权所有。<span class="stat-info">由<a href="https://yuanfenxi.com/">猿分析</a>提供分析服务。</span>
      </div>

    </div>
    </footer>
</template>
<style>
div#footer {
  min-height:200px;
  padding-top:30px;
  text-align:center;
}
 @media screen and (max-width: 600px) {
  .stat-info {
    display:none;
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
