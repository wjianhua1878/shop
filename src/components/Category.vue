<template>
  <div id="category">
    <div v-if="showLoading" style="transform: translate(-50%,-50%); position: absolute; top: 40%;left: 50%;">
      <van-loading type="spinner" color="green">拼命加载中...</van-loading>
    </div>
    <div v-else>
      <Header></Header>
      <Sidebar :name_list='name_list' @getIndex='changeProduct'></Sidebar>
      <ProductDetail :product_list='product_list'  :name_list='name_list' :indexPro='index1'></ProductDetail>
    </div>

  </div>
</template>

<script>
  import {getCategorData,getCategorDataDetail} from './../service/api/index.js'
  import Sidebar from '@/components/category/sidebar';
  import ProductDetail from '@/components/category/product-detail';
  import Header from './home/header'
  import Pubsub from 'pubsub-js'
  export default {
    name: 'Category',
    data() {
      return {
        name_list: [],
        product_list: [],
        showLoading: true,
        index: 1,
        index1:1
      }
    },
    created() {
      //左边商品名称
      getCategorData().then(response => {
        // console.log(response);
        // console.log(response.data.cate);
        this.name_list = response.data.cate;
        this.showLoading = false;
      }).catch(err => {
        console.log(err);
      });
      //右边商品初始化
      this.initData();

    },
/*  mounted() {
       Pubsub.subscribe('categoryAddCart',(msg,goods)=>{
         if(msg === 'categoryAddCart'){
           this.$store.commit('addGoods',{
             goodsId:goods.id,
             goodsName:goods.product_name,
             goodsImage:goods.small_image,
             goodsPrice:goods.price
           });
           // console.log('okokokok');
          this.$toast({
            message:'加入购物车成功！',
            duration:1000,
            closeOnClick:true
          });
         }
       })
     }, */
    components: {
      Sidebar,
      Header,
      ProductDetail
    },
    methods: {
      changeProduct(index) {
        this.index = index;
        this.index1 =index;
        this.initData()
      },

      //加载右侧的商品
      initData(){
        //右边商品详情
        if (this.index>6) {
          this.index = this.index%6+1;
        }
        getCategorDataDetail('00' + this.index).then(response => {
          // console.log(response);
          this.product_list = response.data.cate[0].products;
        }).catch(err => {
          console.log(err);
        })
      }

    }
  }
</script>

<style scoped="scoped">
  #category {
    /* width: 100%; */
    /* height: 100%; */
    background-color: #F5F5F5;
  }
</style>
