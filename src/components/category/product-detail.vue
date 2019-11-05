<template>
  <div id="product_detail">
    <div v-for="(name,index) in name_list" :key='index'>
      <div class="title" v-if="index==indexPro-1">---------{{name.name}}-----------</div>
    </div>
    <div class="product_grid">
      <div class="images" v-for="(product,index) in product_list" :key='index'>
        <img v-lazy="product.small_image" />
        <div class="product_name">{{product.product_name}}</div>
        <div class="info">{{product.spec}}</div>
        <div class="product_price"> {{product.price | moneyFormat}}</div>
        <div class="cart" @click="addToCart(product)">
          <van-icon name="shopping-cart-o" color="gray" size="1.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pubsub from 'pubsub-js'
  import {
    addGoodsToCart
  } from './../../service/api/index.js'
  export default {
    name: 'ProductDetail',
    props: {
      product_list: Array,
      name_list: Array,
      indexPro: Number
    },
    methods: {
      addToCart(goods) {
        // Pubsub.publish('homeAddCart',goods);
        if (this.$store.state.userInfo.token) { //已经登录
          this.dealGoodsAdd(goods);
        } else { //没有登录
          this.$router.push('/loginMain');
        }
      },
      async dealGoodsAdd(goods) {
        let result = await addGoodsToCart(this.$store.state.userInfo.token, goods.id, goods.product_name, goods.price,
          goods.small_image, );
        console.log(result);
        if (result.success_code === 200) {
          this.$store.commit('addGoods', {
            goodsId: goods.id,
            goodsName: goods.product_name,
            goodsImage: goods.small_image,
            goodsPrice: goods.price
          });
          // console.log('okokokok');
          this.$toast({
            message: '加入购物车成功！',
            duration: 1000,
            closeOnClick: true
          });
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .title {
    width: 100%;
    height: 2rem;
    color: gray;
    margin-top: 1rem;
    padding-left: 0.3125rem;
    font-size: 1.1rem;
    text-align: center;
    background-color: #F5F5F5;
  }

  #product_detail {

    /* height: 100%; */
    width: 16.5rem;
    /* background-color: black; */
    position: absolute;
    top: 3.125rem;
    left: 4.5rem;
    /* margin-bottom: 10rem; */
  }

  .product_grid {
    width: 100%;
    /* height: 2000px; */
    background-color: #F5F5F5;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .images {
    display: inline-block;
    box-sizing: border-box;
    width: 8rem;
    height: 14rem;
    margin-left: 0.2rem;
    /* border: 1px solid #999999; */
    border-radius: 5px;
    margin-top: 0.1rem;
    text-align: center;
    background-color: white;
    overflow: hidden;
    position: relative;
  }

  .images img {
    height: 6rem;
    width: 6rem;
  }

  .product_name {
    font-size: 1rem;
  }

  .info {
    margin-bottom: 0.3125rem;
    /* margin-left: 1.5rem; */
    font-size: 0.8rem;
    color: gray;
    width: 100%;
    box-sizing: border-box;
    /* background-color: #000000; */
    /* width: 6rem; */
    height: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .product_price {
    height: 1.875rem;
    line-height: 1.875rem;
    font-size: 1rem;
    color: #FE6263;
    text-align: left;
    margin-left: 1rem;
    /* border: 1px solid red; */
    position: absolute;
    bottom: 1rem;
    left: 0;
  }

  .cart {
    /* border: 1px solid magenta; */
    /* background-color: #F5F5F5; */
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2.2rem;
    text-align: center;
    /* vertical-align: bottom; */
    line-height: 2.5rem;
    border-radius: 50%;
    position: absolute;
    right: 0.5rem;
    bottom: 1rem;
  }
</style>
