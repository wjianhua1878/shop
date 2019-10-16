<template>
  <van-grid :column-num="5">
    <van-grid-item v-for="value in img_grid" :key="value.icon_url" :icon="value.icon_url" :text="value.name" />
  </van-grid>
</template>

<script>
  export default {
    name: 'Grid',
    props:{
      img_grid:Array
    }
  }
</script>

<style scoped="scoped">

</style>
