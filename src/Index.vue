<template>
  <div id="app">
    <header>一米六二的Blog</header>


    <ol>
      <li v-for="item in items">
        <h5>
        <a v-bind:href="'/'+ item.postId +'#disqus_thread'">{{ item.title }} </a>
        </h5>
      </li>
    </ol>



    <router-view></router-view>

  </div>
</template>

<script>
//import axios from "../axios";
const axios = require("axios");
const _ = require("lodash");
export default {
  name: 'app',
  data () {
   //
    return {
      msg: 'Welcome to Your Vue.js App',
      items: [
      { title: 'Foo' ,postId:1},
      { title: 'Bar' ,postId:2}
    ]
    }
  },
  mounted(){
    let self = this;
    axios.get('/data/index.json').then( function(response){
    let items = response.data;
    self.items = _(items).reverse().value();
    //self.items = items;
    });
  }
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

  a {
    color: #567b99;
    font-weight: normal;
  }

  header {
    font-size:64px;
    height:100px;
    padding:0;
  }
  h5 {
    font-size: 16px;
    line-height:16px;
  }

</style>
