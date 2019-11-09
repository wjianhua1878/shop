<template>
  <div id="order">
   <Header></Header>
    <Address></Address>
    <!-- <PayCell></PayCell> -->
   <!-- <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft" :fixed='true' />

    <van-contact-card add-text='选择收货地址' @click="chooseAddress" /> -->


  </div>
</template>

<script>
  import Header from './order/header'
  import Address from './order/address'
  export default {
    name: 'Order',

    components: {
      Header,
      Address,
    }
  }
</script>

<style scoped="scoped">


</style>
