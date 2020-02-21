// 入口js

// import Vue from "vue";
// import App from "./App.vue";
Vue.config.productionTip = true;

// new Vue({
//   render: h => h(App)
// }).$mount("#app");

import Vue from "vue";
import App from "./App.vue";
// 引入路由器
import router from "./router";
new Vue({
  el: "#app",
  render: h => h(App),
  router
});
