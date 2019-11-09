<template>
  <div id="mine_order_item">
    <div class="item">
      <div class="item-top">
        <van-cell  :value="order.order_status === 'pay' ? '待收货' : '待支付'" style="border-bottom: #F5F5F5 1px solid;"></van-cell>
      </div>
      <div class="item-center">
        <van-cell :value="`共${order.cart_shop.length}件`"  :center=true>
          <template slot="title">
            <span class="image">
              <img v-for="(shop,index) in order.cart_shop" :key='index' style="width: 3rem;" :src="shop.small_image">
            </span>
          </template>
        </van-cell>
      </div>
      <div class="item-bottom"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MineOrderItem',
    props:{
      order:Object
    }
  }
</script>

<style scoped="scoped">
  #mine_order_item{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .image {
    display: flex;
    flex-wrap: nowrap;
    width: 15rem;
    overflow-x: auto;
  }
</style>
