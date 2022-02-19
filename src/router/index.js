import Vue from 'vue'
import VueRouter from 'vue-router'
const MSite = () =>
    import ('../pages/MSite/MSite.vue')
const Search = () =>
    import ('../pages/Search/Search.vue')
const Order = () =>
    import ('../pages/Order/Order.vue')
const Profile = () =>
    import ('../pages/Profile/Profile.vue')
const Login = () =>
    import ('../pages/Login/Login.vue')
const Shop = () =>
    import ('../pages/Shop/Shop.vue')
const ShopGoods = () =>
    import ('../pages/Shop/ShopGoods/ShopGoods.vue')
const ShopInfo = () =>
    import ('../pages/Shop/ShopInfo/ShopInfo.vue')
const ShopRatings = () =>
    import ('../pages/Shop/ShopRatings/ShopRatings.vue')

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
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop,
        children: [{
                path: '/shop/goods',
                name: '/shop/goods',
                component: ShopGoods,
            }, {
                path: '/shop/info',
                name: '/shop/info',
                component: ShopInfo,
            },
            {
                path: '/shop/ratings',
                name: '/shop/ratings',
                component: ShopRatings,
            },
            {
                path: '',
                redirect: '/shop/goods'
            }
        ]
    },


]

const router = new VueRouter({
    routes
})

export default router