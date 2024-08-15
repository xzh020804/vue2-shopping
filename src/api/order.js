import request from '@/utils/request'

// 订单结算
// mode:cart => obj{cartIds}
// mode:buyNow => obj{ goodsId , goodsNum , goodsSkuId}

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 配送方式（10快递配送 20上门自提）
      couponId: 0, // 优惠券ID
      isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用）
      ...obj
    }
  })
}

// 订单提交
// mode:cart => obj{ cartIds, remark}
// mode:buyNow => obj{ goodsId , goodsNum , goodsSkuId, remark}
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 配送方式（10快递配送 20上门自提）
    couponId: 0, // 优惠券ID
    isUsePoints: 0, // 是否使用积分抵扣（1使用 0不使用
    payType: 10, // 余额支付
    ...obj

  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
