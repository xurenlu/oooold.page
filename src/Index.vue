<template>
  <div id="app">
    <BlogHead/>

    <ol class="main-list">
      <li v-for="item in items">
        <h5>
          <a v-bind:href="'/'+ item.postId +''">{{ item.title }} </a>
        </h5>
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
    axios.get('/data/index.json?id='+ Math.random()).then( function(response){
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


</style>
