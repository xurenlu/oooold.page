<template>
  <div id="app">
    <BlogHead/>

    <ol class="main-list">
      <li v-for="item in items">

        <a v-bind:href="'/'+ item.postId +''">{{ item.title }} </a>

      </li>
    </ol>
    <div class="page">
      <Pager
        background


        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </Pager>
    </div>


    <BlogFoot/>
    <router-view></router-view>

  </div>
</template>

<script>
import Vue from 'vue';
//import axios from "../axios";
const Pagesize = 10;
import BlogFoot from "./BlogFoot.vue";
import BlogHead from "./BlogHead.vue";
import { Pagination,Alert} from  'element-ui';
const axios = require("axios");
Vue.use(Pagination);
export default {
  name: 'app',
  methods:{
   handleCurrentChange(page){
      console.log(this);
      console.log(page);
      this.items = this.all.slice((page-1)*Pagesize,page*Pagesize);
    }
  },
  data () {
   //
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [
      ],
      all:[],
      page:1,
      total:0,
      pagesize:Pagesize
    }
  },
  mounted(){
    let self = this;
    axios.get('/data/index.json').then( function(response){
    let items = response.data;
    let target = [];
    for(let item of items){
      target.unshift(item);
    }
    let page = self.page;
    self.total = target.length;
    self.all = target;
    self.items =  target.slice((page-1)*Pagesize,(page)*Pagesize);
    //self.items = items;
    });
  },
   components:{
    BlogHead:BlogHead,BlogFoot:BlogFoot,
    Pager:Pagination
  },


}


</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
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

  ol.main-list {
    padding-left:100px;
  }
  div.page {
    padding-left:100px;
    margin-top:50px;
  }
  a {
    color: #567b99;
    font-weight: normal;
  }
  a:hover {
    text-decoration: none;
  }

  header {
    font-size:64px;
    height:100px;
    padding:0;
  }
  h5 {
    line-height:1rem;
  }

</style>
