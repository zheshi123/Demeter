// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import {Field,Swipe, SwipeItem, Toast, Picker, Popup, Actionsheet,DatetimePicker, Indicator} from 'mint-ui'
// import MintUI, {Toast} from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/mint-ui-style.css' //全局修改mint-UI样式
import 'swiper/dist/css/swiper.css'
import store from './store'
import * as filters from './utils/filter'
import VueScroller from 'vue-scroller'
import {isWeixin} from "./utils";
import {getOpenID, login} from "./api/system";
import VueTouch from 'vue-touch'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
Vue.use(VueTouch, { name: 'v-touch' })
Vue.component(Field.name, Field);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.use(VueScroller)
// Vue.use(MintUI)
Vue.$toast = Vue.prototype.$toast = Toast
Vue.use(BaiduMap, {
  ak: 'uGGrrSrVMAQrobjCkoCwzMt91lDbYflr'
})

// 自动使用openid登录
router.beforeEach((to, from, next) => {
  // 判断dev或非微信环境
  if (process.env.NODE_ENV !== 'production' || !isWeixin()) {
    next()
  } else {
    // 避免重复以下自动登录流程
    if (store.getters.autoLoginFlag) {
      next()
    } else {
      // 根据action判断是否登录
      if (store.getters.action) {
        next()
      } else {
        // 如有openid和usertel则进行登录
        if (store.getters.openID && store.getters.userTel) {
          const param = {
            loginType: 4,
            msgCode: '',
            phoneNum: store.getters.userTel,
            openId: store.getters.openID
          }
          login(param).then(res => {
            if (res.errcode === '00') {
              store.commit('setUserID', res.peopleEntity.userId)
              store.commit('setUserTel', res.peopleEntity.peopleTel)
              store.commit('setAction', res.acton)
            }
          }).finally(() => {
            store.commit("setAutoLoginFlag", true)
            next()
          })
        } else {
          // 判断是否有code，有则获取openid，没有则重定向获取code
          if(location.href.indexOf('code') !== -1) {
            let codeReg = new RegExp('(^|&?)' + 'code' + '=([^&#]*)(&|#|$)', 'i')
            let code = location.href.match(codeReg)
            if (code && code[2]) {
              // 获取openid
              const params = {
                appId: global.appId,
                code: code[2],
                granType: 'authorization_code',
              }
              getOpenID(params).then(res => {
                if (res.errcode === '00' && res.openid && res.openid.openid) {
                  store.commit('setOpenID', res.openid.openid)
                  if (res.phoneNum) {
                    store.commit('setUserTel', res.phoneNum)
                    // 不希望url中带有code，重新进行登录流程
                    // window.location.href = global.h5url + '#' + to.path
                    window.location.href = location.origin + location.pathname + '/#' + to.path
                  } else {
                    store.commit("setAutoLoginFlag", true)
                    next()
                  }
                } else {
                  store.commit("setAutoLoginFlag", true)
                  next()
                }
              }).catch(e => {
                store.commit("setAutoLoginFlag", true)
                next()
              })
            } else {
              store.commit("setAutoLoginFlag", true)
              next()
            }
          } else {
            // let redirectUri = global.h5url + '#' + to.fullPath
            let redirectUri = location.origin + location.pathname + '/#' + to.fullPath
            window.location.href = `${global.oauthUrl}/connect/oauth2/authorize?appid=${global.appId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=snsapi_base#wechat_redirect`
          }
        }
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
