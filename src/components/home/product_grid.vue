<template>
  <!-- 猜你喜欢 -->
  <div id="product_grid">
    <div>
      <div id="title">---------------猜你喜欢----------------</div>
      <div class="product_grid">
        <div class="images" v-for="(product,index) in product_grid" :key='index'>
          <img v-lazy="product.small_image" />
          <div class="product_name">{{product.product_name}}</div>
          <br>
          <div class="product_price"> {{product.price | moneyFormat}}</div>
          <div class="cart" @click="addToCart(product)">
            <van-icon name="shopping-cart-o" color="gray" size="1.8rem" />
          </div>
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
    name: 'ProductGrid',
    props: {
      product_grid: Array
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
        // console.log(result);
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
  #product_grid {
    margin-bottom: 4rem;

  }

  #title {
    width: 100%;
    height: 2rem;
    color: gray;
    /* border-left: 4px #3cb963 solid; */
    /* background-color: white; */
    margin-top: 1rem;
    padding-left: 0.3125rem;
    font-size: 1.1rem;
    text-align: center;
  }

  .product_grid {
    width: 100%;
    /* height: 2000px; */
    background-color: #F5F5F5;
    display: flex;
    flex-wrap: wrap;
  }

  .images {
    display: inline-block;
    box-sizing: border-box;
    width: 10rem;
    height: 16rem;
    margin-left: 0.5rem;
    /* border: 1px solid #999999; */
    border-radius: 5px;
    margin-top: 0.5rem;
    text-align: center;
    background-color: white;
    overflow: hidden;
    position: relative;
  }

  .images img {
    height: 9rem;
    width: 9rem;
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
    bottom: 2rem;
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
