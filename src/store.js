import Vue from 'vue'
import Vuex from 'vuex'

import { queryGoods, queryRatings, queryInfo } from './api/index'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        goods: [],
        ratings: [],
        info: [],
        cartFoods: [] //购物车食物列表
    },
    getters: {
        totalCount(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count, 0)
        },
        totalPrice(state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price, 0)
        },
        satisfiedRate(state) {
            return state.ratings.filter((value, index, array) => {
                return value.rateType == 0;
            }).length
        }
    },
    mutations: {
        receive_user_info(state, { userInfo }) {
            state.userInfo = userInfo;
        },
        reset_user_info(state) {
            state.userInfo = {};
        },
        receive_goods(state, { goods }) {
            state.goods = goods;
        },
        receive_ratings(state, { ratings }) {
            state.ratings = ratings;
        },
        receive_info(state, { info }) {
            state.info = info;
        },
        add_food_count(state, { food }) {
            if (!food.count) {
                Vue.set(food, 'count', 1);
                state.cartFoods.push(food);
            } else {
                food.count++;
            }
        },
        remove_food_count(state, { food }) {
            if (food.count) {
                food.count--;
                if (food.count == 0) {
                    //将food从cartFoods中移除
                    state.cartFoods.splice(state.cartFoods.indexOf(food), 1);
                }
            }
        },
        clear_food_count(state) {
            state.cartFoods.forEach(food => {
                food.count = 0;
            });
            state.cartFoods = [];
        },
        add_ratings(state) {
            let arr = state.ratings.slice(0, 3);
            state.ratings = state.ratings.concat(arr);

        },
    },
    actions: {
        recordUser({ commit }, userInfo) {
            commit('receive_user_info', { userInfo })
        },
        getUserInfo({ commit }) {
            let userName = sessionStorage.getItem('userName');
            if (userName) {
                let userInfo = {
                    userName
                }
                commit('receive_user_info', { userInfo });
            }
        },
        logout({ commit }) {
            let userName = sessionStorage.getItem('userName');
            if (userName == undefined) {
                commit('reset_user_info');
            }
        },
        async receiveGoods({ commit }, callback) {
            const result = await queryGoods();
            if (result.code === 0) {
                const goods = result.data;
                commit('receive_goods', { goods });
                callback && callback();
            }
        },
        async receiveInfo({ commit }) {
            const result = await queryInfo();
            if (result.code === 0) {
                const info = result.data;
                commit('receive_info', { info })
            }
        },
        async receiveRatings({ commit }, callback) {
            const result = await queryRatings();
            if (result.code === 0) {
                const ratings = result.data;
                commit('receive_ratings', { ratings });
                callback && callback();
            }
        },
        updateFoodCount({ commit }, { isAdd, food }) {
            if (isAdd) {
                commit('add_food_count', { food })
            } else {
                commit('remove_food_count', { food })
            }
        },
        clearFoodCount({ commit }) {
            commit('clear_food_count');
        },
        addRatings({ commit }) {
            commit('add_ratings');
        }
    }
})