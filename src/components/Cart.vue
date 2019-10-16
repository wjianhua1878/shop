<template>
  <div id="cart">
    <!--头部区域-->
    <header class="titleWrapper">
      <h4><strong>购物车</strong></h4>
      <span class="clearCart" @click="clearCart">清空购物车</span>
    </header>
    <div class="contentWrapper">
      <!--中间内容-->
      <main class="contentWrapperList">
        <section>
          <div class="shopCartListCon" v-for="(goods,index) in this.$store.state.shopCart" :key='index'>
            <div class="left" @click="single_goods_selected(goods.id)">
              <a href="javascript:;" class="cartCheckBox" :checked='goods.selected'></a>
            </div>
            <div class="center">
              <img :src="goods.image" alt="">
            </div>
            <div class="right">
              <span>{{goods.name}}</span>
              <span class="deleteGoods" @click="deleteGoods(goods.id)">x</span>

              <div class="bottomContent">
                <p class="shopPrice">{{goods.price | moneyFormat}}</p>
                <div class="shopDeal">
                  <span @click="subFromCart(goods.id,goods.count)">-</span>
                  <!-- <input disabled type="number" value="1"> -->
                  <input disabled type="number" v-model="goods.count">
                  <span @click="addToCart(goods.id,goods.name,goods.image,goods.price)">+</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>


      <!--底部通栏-->
      <div class="tabBar">
        <div class="tabBarLeft">
          <a href="javascript:;" class="cartCheckBox" @click.stop='all_goods_selected(isSelectAll)' :checked='isSelectAll'></a>
          <span style="font-size: 16px;">全选</span>
          <div class="selectAll">
            合计：<span class="totalPrice">{{totalPrice | moneyFormat}}</span>
          </div>
        </div>
        <div class="tabBarRight">
          <a href="#" class="pay" @click.prevent="toPay">去结算({{totalGoodsNum}})</a>
          <!-- <router-link class="pay" :to="{path:'/confirmOrder'}">去结算({{totalGoodsNum}})</router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Pubsub from 'pubsub-js'
  import {
    Dialog
  } from 'vant';
  import LoginMethods from './login/loginMethods'
  export default {
    name: 'Cart',
    components:{
      LoginMethods
    },
    methods: {
      //从购物车增加商品
      addToCart(goodsId, goodsName, goodsImage, goodsPrice) {
        this.$store.commit('addGoods', {
          goodsId,
          goodsName,
          goodsImage,
          goodsPrice
        })
      },

      //从购物车减少商品
      subFromCart(goodsId, goodsCount) {
        if (goodsCount > 1) {
          this.$store.commit('subCartGoods', {
            goodsId
          });
        }
        if (goodsCount === 1) {
          Dialog.confirm({
            title: '提示',
            message: '确定要从购物车移除该商品吗?'
          }).then(() => {
            // on confirm
            this.$store.commit('subCartGoods', {
              goodsId
            });
          }).catch(() => {
            // on cancel
          });
        }
      },

      //从购物车删除一个商品
      deleteGoods(goodsId) {
        Dialog.confirm({
          title: '提示',
          message: '确定要从购物车移除该商品吗?'
        }).then(() => {
          // on confirm
          this.$store.commit('deleteGoods', {
            goodsId
          });
        }).catch(() => {
          // on cancel
        });

      },

      //单个商品的选中和取消选中
      single_goods_selected(goodsId) {
        this.$store.commit('single_goods_selected', {
          goodsId
        });
      },

      //全选和取消全选
      all_goods_selected(isSelectAll) {
        this.$store.commit('all_goods_selected', {
          isSelectAll
        });
      },

      //清空购物车
      clearCart() {
        if ((Object.values(this.$store.state.shopCart).length) > 0) {
          Dialog.confirm({
            title: '提示',
            message: '确定要清空购物车吗?'
          }).then(() => {
            // on confirm
            this.$store.commit('clearCart');
          }).catch(() => {
            // on cancel
          });
        }
      },
      toPay(){
        if(this.$store.state.userInfo.token){
          this.$router.push('/confirmOrder');
        }else{
          this.$router.push('/main/login');
        }
      }

    },
    computed: {

      //全选和取消全选
      isSelectAll() {
        let flag = this.totalGoodsNum > 0;
        Object.values(this.$store.state.shopCart).forEach((goods, index) => {
          if (goods['selected'] === false) {
            flag = false;
          }
        });
        return flag;
      },

      //计算商品总价
      totalPrice() {
        let totalPrice = 0;
        Object.values(this.$store.state.shopCart).forEach((goods, index) => {
          if (goods.selected) {
            totalPrice = totalPrice + goods.count * goods.price;
          }
        });
        return totalPrice;
      },

      //计算商品件数
      totalGoodsNum() {
        let totalGoodsNum = 0;
        Object.values(this.$store.state.shopCart).forEach((goods) => {
          if (goods.selected) {
            totalGoodsNum++;
          }
        })
        return totalGoodsNum;

      }
    },

  }
</script>

<style scoped="scoped">
  #cart {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }

  .titleWrapper {
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .clearCart {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    right: 0.5rem;
  }

  .contentWrapper {
    padding-top: 2rem;
  }

  /*列表内容*/
  .contentWrapperList {
    padding-bottom: 6rem;
  }

  .contentWrapperList section {
    background-color: #fff;
  }

  .cartCheckBox {
    background: url("./cart/images/shop-icon.png ") no-repeat;
    -webkit-background-size: 2.5rem 5rem;
    background-size: 2.5rem 5rem;
    width: 1rem;
    height: 1rem;
  }

  .cartCheckBox[checked] {
    background-position: -1.2rem 0;
  }

  .shopCartListCon {
    display: flex;
    height: 6rem;
    border-bottom: 0.01rem solid #e0e0e0;
    margin-bottom: 0.7rem;
    padding: 0.5rem 0;
  }

  .shopCartListCon .left {
    /*background: purple;*/
    flex: 1;
    display: flex;
    /*justify-content: center;*/
  }

  .shopCartListCon .left a {
    display: inline-block;
    margin-top: 0.8rem;
    margin-left: 0.5rem;
  }


  .shopCartListCon .center {
    /*background: blue;*/
    flex: 3;
  }

  .shopCartListCon .center img {
    width: 100%;
    height: 100%;
  }

  .shopCartListCon .right {
    /* background: orangered; */
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    position: relative;
  }

  .deleteGoods {
    /* background-color: white; */
    width: 1rem;
    font-size: 0.8rem;
    text-align: center;
    position: absolute;
    right: -0.3rem;
    top: 50%;
    color: red;
    transform: translateY(-50%);
    /* display: none; */
  }


  .shopCartListCon .right a {
    height: 2.2rem;
    line-height: 1.2rem;
    overflow: hidden;
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
    color: #000;
  }

  .shopCartListCon .bottomContent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .shopCartListCon .bottomContent .shopPrice {
    font-size: 1rem;
    color: red;
  }

  .shopCartListCon .right .shopDeal span {
    display: inline-block;
    width: 1rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    float: left;
  }

  .shopCartListCon .right .shopDeal input {
    float: left;
    width: 2rem;
    height: 1.2rem;
    text-align: center;
    margin: 0 0.2rem;
    font-size: 0.8rem;
  }

  /*底部通栏*/
  .tabBar {
    position: fixed;
    left: 0;
    bottom: 2.7rem;
    width: 100%;
    height: 2.5rem;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.01rem solid #e0e0e0;
  }

  .tabBarLeft {
    display: flex;
    align-items: center;
    margin-left: 0.5rem;
  }

  .tabBarLeft .selectAll {
    margin-left: 1rem;
    font-size: 1rem;
  }

  .totalPrice {
    color: #E9232C;
  }


  .tabBarRight .pay {
    width: 5rem;
    height: 2rem;
    background-color: #E9232C;
    border-radius: 1rem;
    margin-right: 0.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #fff;
  }
</style>
