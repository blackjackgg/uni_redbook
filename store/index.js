/*
 * @Author: vinc
 * @LastEditTime: 2020-04-26 15:55:48
 */

import Vue from 'vue'
import Vuex from 'vuex'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    httpUrl: 'http://127.0.0.1:8351',
    userInfo: null,
    token: null,
    locationInfo: null
  },
  mutations: {
    //设置token
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    //设置个人信息
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    },
    //用户地址
    SET_LOCATION(state, payload) {
      state.locationInfo = payload
    },
    //退出登录
    LOGOUT(state, payload) {
      state.token = '';
      state.userInfo = '';
    },
    //设置url
    SET_URL(state, payload) {
      state.httpUrl = payload
    }
  },
  actions: {
    async changeUser({ commit }, params) { // 跳转到用户详情页
      if (params.uid || params.id) { 
        uni.navigateTo({ url: `../personal/main?id=${params.uid || params.id}` });
      }
    },
    async changeUserFollow({ commit }, params) {
      uni.navigateTo({ url: `../follow/index?id=${params.uid || params.id || ''}` });
    },
    async changeUserFans({ commit }, params) {
      uni.navigateTo({ url: `../fans/index?id=${params.uid || params.id || ''}` });
    },
    async changeWorks({ commit }, params) {
      uni.navigateTo({ url: `../detail/index?id=${params.id}` });
    }
  },
  getters: {
    isLogin(state) {
      return Boolean(state.userInfo);
    }
  }

})

export default store;
