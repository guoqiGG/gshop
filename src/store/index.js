import Vue from 'vue'
import Vuex from 'vuex'
import { reqAddress, reqShopList, reqFoodCategorys, reqUserInfo, reqLogout, reqShopGoods, reqShopInfo, reqShopRatings, reqSearchShop } from '../api/index'
Vue.use(Vuex)
    // mutations-type
const RECEIVE_ADDRESS = "RECEIVE_ADDRESS" //接收地址
const RECEIVE_CATEGORYS = "RECEIVE_CATEGORYS" //接收食品分类
const RECEIVE_SHOPS = "RECEIVE_SHOPS" //接收商家列表
const RECEIVE_USER_iNFO = "RECEIVE_USER_iNFO" //接收用户信息
const RESET_USER_iNFO = "RESET_USER_iNFO" //重置用户信息

const RECEIVE_GOODS = "RECEIVE_GOODS" //接收商品数组
const RECEIVE_RATINGS = "RECEIVE_RATINGS" //接收商家评价数组
const RECEIVE_INFO = "RECEIVE_INFO" //接收商家信息

const INCREMENT_FOOD_COUNT = "INCREMENT_FOOD_COUNT" //增加food中的count
const DECREMENT_FOOD_COUNT = "DECREMENT_FOOD_COUNT" //减少food中的count
const CLEAR_CART = "CAEAR_CART" //清空购物车
const RECEIVE_SEARCH_SHOPS = "RECEIVE_SEARCH_SHOPS" //接收搜索商家的数组



export default new Vuex.Store({

    // 当前应用状态
    state: {
        latitude: 40.10038, //纬度
        longitude: 116.36867, //经度
        address: {}, //地址相关信息对象
        categorys: [], //食品分类数组
        shops: [], //商家数组
        userinfo: {}, //用户信息
        goods: [], //商品列表
        ratings: [], //商家评价列表
        info: {}, //商家信息
        cartFoods: [], //购物车中食物的列表
        searchShops: [], //搜索得到的商家信息
    },
    // 基于state的getter计算属性对象
    getters: {
        totalCount(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },
        totalPrice(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
        },
        positiveSize(state) {
            return state.ratings.reduce((preTotal, rating) => preTotal + (rating.rateType === 0 ? 1 : 0), 0)
        }
    },
    //直接更新state的多个方法的对象
    mutations: {
        [RECEIVE_ADDRESS](state, { address }) {
            state.address = address
        },
        [RECEIVE_CATEGORYS](state, { categorys }) {
            state.categorys = categorys
        },
        [RECEIVE_SHOPS](state, { shops }) {
            state.shops = shops
        },
        [RECEIVE_USER_iNFO](state, { userinfo }) {
            state.userinfo = userinfo
        },
        [RESET_USER_iNFO](state) {
            state.userinfo = {}
        },
        [RECEIVE_GOODS](state, { goods }) {
            state.goods = goods
        },
        [RECEIVE_RATINGS](state, { ratings }) {
            state.ratings = ratings
        },
        [RECEIVE_INFO](state, { info }) {
            state.info = info
        },
        [INCREMENT_FOOD_COUNT](state, { food }) {
            if (!food.count) { //第一次增加
                // food.count = 1  //新增属性（没有数据绑定）
                Vue.set(food, 'count', 1) //让新增的属性有数据绑定
                    // 将food添加到CartFoods中
                state.cartFoods.push(food)
            } else {
                food.count++
            }
        },
        [DECREMENT_FOOD_COUNT](state, { food }) {
            if (food.count) { //只有值才去减
                food.count--
                    if (food.count === 0) {
                        // 将food从cartFoods中移除
                        state.cartFoods.splice(state.cartFoods.indexOf(food, 1))
                    }
            }
        },
        [CLEAR_CART](state) {
            //清除food中的count
            state.cartFoods.forEach(food => food.count = 0)
                //移除购物车中所有购物项
            state.cartFoods = []
        },
        [RECEIVE_SEARCH_SHOPS](state, { searchShops }) {
            state.searchShops = searchShops
        }



    },
    //通过mutation间接更新state的多个方法的对象
    actions: {
        //异步获取地址
        async getAddress({ commit, state }) {
            //发送异步ajax请求
            const geohash = state.latitude + ',' + state.longitude
            const result = await reqAddress(geohash)
                //提交一个mutation
            if (result.code === 0) {
                const address = result.data
                commit(RECEIVE_ADDRESS, { address })
            }
        },
        //异步获取食品分类列表
        async getCategorys({ commit }) {
            //发送异步ajax请求
            const result = await reqFoodCategorys()
                //提交一个mutation
            if (result.code === 0) {
                const categorys = result.data
                commit(RECEIVE_CATEGORYS, { categorys })
            }
        },
        //异步获取商家列表
        async getShops({ commit, state }) {
            //发送异步ajax请求
            const { latitude, longitude } = state
            const result = await reqShopList(longitude, latitude)
                //提交一个mutation
            if (result.code === 0) {
                const shops = result.data
                commit(RECEIVE_SHOPS, { shops })
            }
        },
        //同步记录用户信息
        recordUser({ commit }, userinfo) {
            commit(RECEIVE_USER_iNFO, { userinfo })
        },
        //异步获取用户信息
        async getUserInfo({ commit }) {
            const result = await reqUserInfo()
            if (result.code === 0) {
                const userinfo = result.data
                commit(RECEIVE_USER_iNFO, { userinfo })
            }
        },
        //异步登出
        async logout({ commit }) {
            const result = await reqLogout()
            if (result.code === 0) {

                commit(RESET_USER_iNFO)
            }
        },
        // 异步获取商家信息
        async getShopInfo({ commit }) {
            const result = await reqShopInfo()
            if (result.code === 0) {
                const info = result.data
                commit(RECEIVE_INFO, { info })
            }
        },

        // 异步获取商家评价列表
        async getShopRatings({ commit }, callback) {
            const result = await reqShopRatings()
            if (result.code === 0) {
                const ratings = result.data
                commit(RECEIVE_RATINGS, { ratings })
                    // 数据更新了, 通知一下组件
                callback && callback()
            }
        },

        // 异步获取商家商品列表
        async getShopGoods({ commit }, callback) {
            const result = await reqShopGoods()
            if (result.code === 0) {
                const goods = result.data
                commit(RECEIVE_GOODS, { goods })
                    // 数据更新了, 通知一下组件
                callback && callback()
            }
        },
        //同步更新food中的count数量
        updateFoodCount({ commit }, { isAdd, food }) {
            if (isAdd) {
                commit(INCREMENT_FOOD_COUNT, { food })
            } else {
                commit(DECREMENT_FOOD_COUNT, { food })
            }
        },
        //同步清空购物车
        clearCart({ commit }) {
            commit(CLEAR_CART)
        },
        //异步搜索商家列表
        async searchShops({ commit, state }, keyword) {
            const geohash = state.latitude + ',' + state.longitude
            const result = await reqSearchShop(geohash, keyword)
            if (result.code === 0) {
                const searchShops = result.data
                commit(RECEIVE_SEARCH_SHOPS, { searchShops })

            }
        }


    },
    modules: {}
})