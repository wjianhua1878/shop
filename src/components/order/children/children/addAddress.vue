<template>
  <div id="address_list">
    <van-nav-bar title="添加地址" left-arrow @click-left="onClickLeft" />

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
    />

  </div>


</template>

<script>
  import areaList from './../../../../../config/area.js'
  import {addUserAddress} from './../../../../service/api/index.js'
  import PubSub from 'pubsub-js'
  export default {
    name: 'AddressList',
    data() {
        return {
          areaList:areaList,
          searchResult: []
        }
      },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
     async onSave(data) {
            // console.log(data);
            let result = await addUserAddress(this.$store.state.userInfo.token, data.name, data.tel, data.province+data.city+data.county, data.addressDetail, data.postalCode, data.isDefault, data.province, data.city, data.county, data.areaCode);
            // console.log(result);
            if(result.success_code === 200){//成功
              this.$toast({
                message: '添加成功！',
                duration: 500,
                closeOnClick: true
              });
              //回到地址列表
              this.$router.back();
              //订阅发布  发布消息(在myAddress订阅)
              PubSub.publish('backToMyAddress');
            }else{
              this.$toast({
                message: '有点小错误！',
                duration: 500,
                closeOnClick: true
              });
            }
          },
    }
  }
</script>

<style scoped="scoped">
  #address_list {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #F5F5F5;
    z-index: 300;
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
</style>
