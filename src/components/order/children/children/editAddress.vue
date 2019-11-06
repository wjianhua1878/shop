<template>
  <div id="edit_address">
    <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft"  />

    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      show-search-result
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
  import {Toast} from 'vant'
  import areaList from './../../../../../config/area.js'
  import {getCurrentUserAddress} from './../../../../service/api/index.js'
export default {
  name: 'EditAddress',
   data() {
      return {
        areaList:areaList,
        addressInfo:{}
      }
    },
    mounted() {
      this.initCurrentAddress()
    },
  methods:{
    onClickLeft() {
      this.$router.back();
    },

    onSave() {
          Toast('save');
        },
        onDelete() {
          Toast('delete');
        },
        
        //获取要修改的地址的信息
    async initCurrentAddress(){
       let user_id = this.$store.state.userInfo.token;
       let address = this.$route.query.address_id
       let result = await getCurrentUserAddress(user_id,address);
       // console.log(result);
       let data = result.data;
       if(result.success_code === 200){//成功
          this.addressInfo = {
            id: data._id,
            name: data.address_name,
            tel: data.address_phone,
            province: data.province,
            city: data.city,
            county: data.county,
            addressDetail: data.address_area_detail,
            areaCode: data.areaCode,
            postalCode: data.address_post_code,
            isDefault: data.address_tag
          }
       }
     }
  }
}
</script>

<style scoped="scoped">
  #edit_address{
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
