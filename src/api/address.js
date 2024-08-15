import request from '@/utils/request'

// 获取购物车列表
export const getAddressList = () => {
  return request.get('/address/list')
}
