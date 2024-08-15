/* 封装axios用于发送请求 */
import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000,
  headers: { platform: 'h5' }
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 开启loading，节流处理，避免多次无效触发
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner', // 自定义图标
    duration: 0 // 不自动关闭loading
  })
  // token存在，就在请求时携带
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const res = response.data
  if (res.status !== 200) {
    // 错误提示
    Toast(res.message)
    // 抛出promise
    return Promise.reject(res.message)
  } else {
    // 响应成功后关闭loading
    Toast.clear()
  }
  // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default request
