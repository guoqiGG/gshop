import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

//声明使用插件
Vue.use(VueRouter)

const routes = [{
        path: '/msite',
        name: 'msite',
        component: MSite,
        meta: {
            showFooter: true
        }
    }, {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            showFooter: true
        }
    },
    {
        path: '/',
        redirect: '/msite'
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }


]

const router = new VueRouter({
    routes
})

export default router