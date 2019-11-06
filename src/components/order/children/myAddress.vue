<template>
  <div id="myAddress">
    <van-nav-bar title="我的地址" left-arrow @click-left="onClickLeft" />


    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" @select="onBackAddress" style="margin-top: 1rem;"></van-address-list>

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
  import {
    getUserAddress
  } from './../../../service/api/index.js'
  import PubSub from 'pubsub-js'
  export default {
    name: 'MyAddress',
    data() {
      return {
        chosenAddressId: '1',
        list: [],
      }
    },
    mounted() {
      // console.log('myAddress mounted');
      this.initUserAddress();
      //订阅(从addAddress来)
      PubSub.subscribe('backToMyAddress', (msg) => {
        if (msg === 'backToMyAddress') {
          this.initUserAddress();
        }
      })
    },
    methods: {
      onAdd() {
        // Toast('新增地址');
        this.$router.push('/confirmOrder/myAddress/addAddress');
      },

      onEdit(item, index) {
        // Toast('编辑地址:' + index);
        this.$router.push('/confirmOrder/myAddress/editAddress?address_id=' + item.address_id);
        // console.log(item);
      },

      onClickLeft() {
        this.$router.back();
      },

     onBackAddress(item, index){
         // console.log(item, index);
         if(item){
             // 发布地址数据  (到address)
             PubSub.publish('userAddress', item);
             // 返回上一级界面
             this.$router.back();
         }
     },

      //获取当前用户地址列表
      async initUserAddress() {
        if (this.$store.state.userInfo.token) { //已经登录
          let result = await getUserAddress(this.$store.state.userInfo.token);
          // console.log(result);
          if (result.success_code === 200) { //成功
            let addressArr = result.data;
            addressArr.forEach((data, index) => {
              let addressObj = {
                id: String(index + 1),
                name: data.address_name,
                tel: data.address_phone,
                address: data.address_area + ' ' + data.address_area_detail,
                address_id: data._id,
                user_id: data.user_id
              };
              this.list.push(addressObj);
              // console.log(data);
              // console.log(index);
            })
          }

        } else { //没有登录

        }
      }
    },
    beforeDestroy() {
      PubSub.unsubscribe('backToMyAddress');
    }

  }
</script>


<style scoped="scoped">
  #myAddress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    z-index: 200;
  }

  .van-address-list__add {
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


  /*过度动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
