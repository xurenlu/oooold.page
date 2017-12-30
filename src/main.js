import Vue from 'vue'
import App from './App.vue'
import Page from './Page.vue'
import Index from './Index.vue'
import NotFound from './NotFound'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes:[
    {path :'/index',component:Index},
    { path: '/:postId', component: Page },
    { path: '*', component: NotFound }
  ]

});

// const app = new Vue({
//   router
// }).$mount("#app");
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app');


// new Vue({
//   el:'#app',
//   router,
//   render: h => h(App)
// });
