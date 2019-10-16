<template>
  <div id="add_address">
    <!-- 选择地址 -->
    <van-contact-card add-text='选择收货地址' @click="chooseAddress" />
  </div>
</template>

<script>
  export default {
    name: 'AddAddress',
    methods: {
      chooseAddress(){
        this.$router.push('/myAddress');
        // alert(0);
      }
    }


  }
</script>

<style scoped="scoped">
  .van-contact-card {
    margin-top: 1rem;
  }

  .van-contact-card__value {
    margin-left: 5px;
    font-size: 1rem;
  }
</style>
