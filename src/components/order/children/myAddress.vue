<template>
  <div id="myAddress">
    <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />


    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" style="margin-top: 1rem;"></van-address-list>

    <!-- 转场动画 -->
    <transition name="router-slider" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>

</template>

<script>
  import {
    Toast
  } from 'vant'
  export default {
    name: 'MyAddress',
    data() {
      return {
        chosenAddressId: '1',
        list: [{
            id: '1',
            name: '张三',
            tel: '13000000000',
            address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
          },
          {
            id: '2',
            name: '李四',
            tel: '1310000000',
            address: '浙江省杭州市拱墅区莫干山路 50 号'
          }
        ],
      }
    },

    methods: {
      onAdd() {
        // Toast('新增地址');
        this.$router.push('/myAddress/addAddress');
      },

      onEdit(item, index) {
        // Toast('编辑地址:' + index);
        this.$router.push('/myAddress/editAddress');
      },

      onClickLeft() {
        this.$router.back();
      }
    }

  }
</script>


<style scoped="scoped">
 .van-address-list__add{
   z-index: 200;
 }
 

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


  /*转场动画*/
  .router-slider-enter-active, .router-slider-leave-active{
      transition: all 0.3s;
  }

  .router-slider-enter, .router-slider-leave-active{
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
</style>
