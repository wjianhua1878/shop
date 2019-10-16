<template>
	<!-- 限时抢购 -->
  <div>
    <div id="list" >
      <div id="list_item" v-for="(list,index) in product_list" :key='index'>
        <img v-lazy="list.small_image" alt="">
        <div class="name">{{list.name}}</div>
        <span class="originPrice">{{list.origin_price | moneyFormat}}</span>
        <span class="price">{{list.price | moneyFormat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProductList',
    props: {
      product_list: Array
    },

  }
</script>

<style scoped="scoped">
  #list {
    height: 14rem;
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    background-color: white;
    /* border: 1px solid red; */
  }
.list_item{
}
  img {
    width: 8rem;
    height: 8rem;
  }
  .name{
    margin-bottom: 0.625rem;
    height: 2.5rem;
    line-height: 1.25rem;
    font-size: 0.8125rem;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .originPrice {
      margin-bottom: 0.3125rem;
      font-size: 0.6875rem;
      color: #999999;
      text-decoration: line-through;
      width: 50%;
      box-sizing: border-box;
  }
  .price {
      height: 1.875rem;
      line-height: 1.875rem;
      font-size: 0.85rem;
      color: #FE6263;
      text-align: right;
      margin-left: 1rem;
  }
</style>
