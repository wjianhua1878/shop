<template>
  <van-swipe :autoplay="1000">
    <van-swipe-item v-for="(image, index) in img_list" :key="index">
      <img v-lazy="image.icon_url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
  export default {
    name: 'Swipe',
    data() {
      return {
        
      }
    },
    props:{
      img_list:Array
    }
  }
</script>

<style scoped="scoped">
 .van-swipe{
   width: 100%;
   height: 15.625rem;
 }
 .van-swipe-item{
   width: 100%;
   height: 100%;
 }
img{
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>
