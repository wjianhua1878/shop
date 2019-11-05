<template>
  <div id="home">
    <div v-if="showLoading" style="transform: translate(-50%,-50%); position: absolute; top: 40%;left: 50%;">
      <van-loading type="spinner" color="green">拼命加载中...</van-loading>
    </div>
    <div v-else>
      <Header></Header>
      <Swipe :img_list='img_list'></Swipe>
      <Grid :img_grid='img_grid'></Grid>
      <Countdown></Countdown>
      <ProductList :product_list='product_list'></ProductList>
      <ProductGrid :product_grid='product_grid'></ProductGrid>
    </div>
  </div>
</template>

<script>
  import {
    getHomeData,
    addGoodsToCart
  } from './../service/api/index.js'
  import Header from './home/header'
  import Swipe from './home/swipe'
  import Grid from './home/grid'
  import Countdown from './home/countdown'
  import ProductList from './home/product_list'
  import ProductGrid from './home/product_grid'


  import Pubsub from 'pubsub-js'
  export default {
    name: 'Home',
    data() {
      return {
        img_list: [],
        img_grid: [],
        product_list: [],
        product_grid: [],
        showLoading: true
      }
    },
    created() {
      getHomeData().then(response => {
        // console.log(response);
        this.img_list = response.data.list[0].icon_list;
        this.img_grid = response.data.list[2].icon_list;
        //限时抢购
        this.product_list = response.data.list[3].product_list;
        //猜你喜欢
        this.product_grid = response.data.list[12].product_list
        console.log();
        this.showLoading = false;
      }).catch(err => {
        console.log(err);
      })
    },
 /*   mounted() {
      Pubsub.subscribe('homeAddCart', (msg, goods) => {
        if (msg === 'homeAddCart') {
          if (this.$store.state.userInfo.token) { //已经登录
            this.dealGoodsAdd(goods);
          } else { //没有登录
            this.$router.push('/loginMain');
          }

        }
      })
    }, */
 /*   methods: {
      //添加商品到购物车
      async dealGoodsAdd(goods) {
        let result = await addGoodsToCart(this.$store.state.userInfo.token,goods.id,goods.product_name,goods.price,goods.small_image,);
        console.log(result);
        if(result.success_code === 200){
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
    }, */
    components: {
      Header,
      Swipe,
      Grid,
      Countdown,
      ProductList,
      ProductGrid
    }
  }
</script>

<style scoped="scoped">
  #home {
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
  }
</style>
