import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    // 商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    // 选中商品
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => sum + item.goods_num, 0)
    },
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },

    // 是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },

    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },

    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },

    changeCount (state, { goodsId, value }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = value
    }

  },
  actions: {
    // 获取购物车数据
    async getCartAction (context) {
      const { data } = await getCartList()
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },

    // 更新购物车数据
    async changeCountAction (context, obj) {
      const { goodsId, value, skuId } = obj
      // 本地更改数据
      context.commit('changeCount', {
        goodsId,
        value
      })
      // 后台更改数据
      await changeCount(goodsId, value, skuId)
    },

    // 删除购物车数据
    async delSelect (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      await delSelect(cartIds)
      Toast('删除成功')

      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('getCartAction')
    }
  }

}
