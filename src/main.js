import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import './mock/mockServer' //加载mockServer即可
//注册全局组件标签
import { Button } from 'mint-ui';
import './filters' //加载过滤器

Vue.component(Button.name, Button);

Vue.config.productionTip = false

Vue.use(VueLazyload, {
    loading: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F69%2F58%2F595f8b118ff2f_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647877805&t=ad6e23f233bb4af7d2599ef0af5e96b0',
    attempt: 1
})
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')