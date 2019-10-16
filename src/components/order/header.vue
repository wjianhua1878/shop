<template>
  <div id="header">
    <van-nav-bar title="填写订单" left-arrow @click-left="onClickLeft"  />
  </div>
</template>

<script>
  export default {
    name: 'Header',
    methods: {
      onClickLeft() {
        this.$router.back();
      },
    }
  }
</script>

<style scoped="scoped">
  .van-nav-bar .van-icon {
    color: #000000;
    vertical-align: middle;
    font-size: 1.2rem;
  }

  .van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
  }
</style>
