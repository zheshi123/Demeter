import axios from 'axios'
import Vue from 'vue'
import { getCurrentTime, getRandomUuid } from '@/utils/index'
import { encrypt, decrypt } from '@/utils/encrypt'
import {CLIENT_ID, PROVIDER_ID} from "../config/target_url"
import store from "../store";
import router from '@/router/index'

// 创建axios实例
const service = axios.create({
  timeout: 100000  // 请求超时时间
})

const showTip = (msg) => {
  Vue.$toast({
    message: msg,
    duration: 2000
  })
}

// request拦截器
service.interceptors.request.use(config => {
  const uuid = getRandomUuid()
  const data = config.data
  const currentDate = getCurrentTime()
  config.headers['Accept'] = 'application/json;chartset=UTF-8;text-plain,*/*'
  config.headers['Content-Type'] = 'application/json'
  config.headers['uuid'] = uuid
  config.headers['trandt'] = currentDate.trandt
  config.headers['clientid'] = CLIENT_ID
  config.headers['userId'] = store.getters.userID
  config.headers['acton'] = store.getters.action
  config.headers['providerId'] = PROVIDER_ID

  console.log('-----接口上送')
  console.log(JSON.stringify(data))
  if (config.headers['encryptType'] && config.headers['encryptType'] === '0') {
    // 不加密
    config.headers['encryptType'] = '0'
  } else {
    config.headers['encryptType'] = '1'
    config.data = encrypt(JSON.stringify(data), uuid)
  }

  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(
  response => {
    let res = ''
    if (response.headers.encryptType && response.headers.encryptType === '1' || response.headers.encrypttype && response.headers.encrypttype === '1') {
      const uuid = response.config.headers.uuid
      res = JSON.parse(decrypt(response.data, uuid))
    } else {
      res = response.data
    }
    console.log('-----接口返回')
    console.log(res)
    console.log('-----END')
    if (res.errcode === '120002' || res.errcode === '120003') { // 登录失效，清除缓存
      showTip(res.errmsg)
      store.commit('logout')
      // router.push({name: 'Login', query: {nextPage: 'Home'}})
    } else if (res.errcode !== '00' && res.errcode !== undefined) {
      showTip(res.errmsg)
      return Promise.reject(res)
    }
    return res
  },
  error => {
    showTip(error.message)
    return Promise.reject(error)
  }
)

export default service
