import {
  setStore,
  getStore
} from './../../config/global.js';

export default {


  //往购物车添加商品
  addGoods(state, {
    goodsId,
    goodsName,
    goodsImage,
    goodsPrice
  }) {
    let shopCart = state.shopCart;
    if (shopCart[goodsId]) { //商品存在
      shopCart[goodsId]['count']++;
    } else { //商品不存在
      shopCart[goodsId] = {
        'count': 1,
        'id': goodsId,
        'name': goodsName,
        'image': goodsImage,
        'price': goodsPrice,
        'selected': true
      }
    }
    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)
  },

  //获取本地购物车数据
  initCart(state) {
    let initCartData = getStore('shopCart');
    if (initCartData) {
      state.shopCart = JSON.parse(initCartData);
    }
  },

  //从购物车减少商品
  subCartGoods(state, {
    goodsId
  }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsId];
    if (goods) {
      if (goods['count'] > 0)
        goods['count']--;
      if (goods['count'] == 0) {
        delete shopCart[goodsId];
      }
    } else {
      // goods = null;
    }
    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)

  },


  //从购物车删除一个商品
  deleteGoods(state, {
    goodsId
  }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsId];
    if (goods) {
      delete shopCart[goodsId];
    }

    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)

  },


  //单个商品的选中和取消选中
  single_goods_selected(state, {
    goodsId
  }) {
    let shopCart = state.shopCart;
    let goods = shopCart[goodsId];
    if (goods) {
      goods['selected'] = !goods['selected'];
    }

    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)
  },

  //全选和取消全选
  all_goods_selected(state, {
    isSelectAll
  }) {
    let shopCart = state.shopCart;
    Object.values(shopCart).forEach((goods, index) => {
      goods['selected'] = !isSelectAll;
    });

    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)
  },

//清空购物车
  clearCart(state) {
    let shopCart = state.shopCart;
   shopCart = null;

    //产生一个新对象
    state.shopCart = { ...shopCart
    };
    //存入本地
    setStore('shopCart', state.shopCart)

  },
  //初始化用户信息
  initUserInfo(state){
      // 8.1 获取用户信息
      let userInfo = getStore('userInfo');
      // 8.2 判断
      if(userInfo){
          state.userInfo = JSON.parse(userInfo);
      }
  },

//保存用户信息
setUserInfo(state,{userInfo}){
  // console.log(userInfo);
  state.userInfo = userInfo;
  state.userInfo.real_name = 'wjh';
  setStore('userInfo',state.userInfo);
},

//清空本地用户信息
  clearUserInfo(state) {
    let userInfo = state.userInfo;
   userInfo = null;

    //产生一个新对象
    state.userInfo = { ...userInfo
    };
    //存入本地
    setStore('userInfo', state.userInfo)

  },
}
