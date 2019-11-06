<template>
  <div id="add_address">
    <!-- 选择地址 -->
    <van-contact-card :type="address_type"
                add-text="选择收货地址"
                :name="address_name"
                :tel="address_phone"
                @click="chooseAddress" />
    <transition name="router-slider" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'AddAddress',
   data() {
       return {
           // 1. 地址
           address_type: 'add', // 地址卡片类型
           address_name: null, // 收货人
           address_phone: null, // 收货人电话
           address_id: null, // 收货人地址ID
       }
   },
    mounted() {
          // 接收收货地址  (从myAddress来)
          PubSub.subscribe('userAddress', (msg, address) => {
              if (msg === 'userAddress') {
                  // console.log(address);
                  // 修改卡片的类型
                  this.address_type = 'edit';
                  this.address_name = address.name;
                  this.address_phone = address.tel;
                  this.address_id = address.address_id;
              }
          })
    },
    methods: {
      chooseAddress(){
        this.$router.push('/confirmOrder/myAddress');
        // alert(0);
      },

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

  /*过度动画*/
  .router-slider-enter-active, .router-slider-leave-active{
      transition: all 0.3s;
  }

  .router-slider-enter, .router-slider-leave-active{
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
</style>
