<template>
  <div id="mine" v-if="this.$store.state.userInfo.token">
    <van-nav-bar title="我的" fixed right-text="退出登录" @click-right="onClickRight"/>

    <van-cell-group style="margin-top: 2.6rem;">
      <van-cell :center=true>
        <template slot="title">
          <div class="personInfo">
            <span class="image">
              <img src="./../../build/logo.png" alt="" style="width: 3rem;">
            </span>
            <div class="info">
              <span>姓名:{{this.$store.state.userInfo.real_name || ''}}</span>
              <span>手机号码:{{this.$store.state.userInfo.phone || ''}}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group >
      <van-cell icon="balance-list" title="我的订单" value="查看所有订单" is-link/>
      <van-grid>
        <van-grid-item :icon="item.icon" :text="item.text" v-for="(item,index) in gridItem" :key='index'/>
      </van-grid>
    </van-cell-group>

    <van-cell-group style="margin-top: 1rem;">
      <van-cell title="我的优惠券" value="" is-link/>
      <van-cell title="我的收货地址" value="" is-link/>
    </van-cell-group>

    <van-cell-group style="margin-top: 1rem;">
      <van-cell title="联系客服" value="客服时间9:00-19:00" is-link/>
      <van-cell title="意见反馈" value="" is-link/>
    </van-cell-group>

    <van-cell-group style="margin-top: 1rem;">
      <van-cell title="帮助" value="查看更多帮助" is-link/>
    </van-cell-group>


  </div>
<LoginMethods v-else></LoginMethods>
</template>

<script>
  import LoginMethods from './login/loginMethods'
  import {
    Dialog
  } from 'vant';
  import {getLogout} from './../service/api/index.js'
  export default {
    name: 'Mine',
    methods:{
       async onClickRight(){
        Dialog.confirm({
          title: '提示',
          message: '确定要退出登录吗?'
        }).then(() => {
          this.$store.commit('clearUserInfo');
          this.$store.commit('clearCart');
          // on confirm
        }).catch(() => {
          // on cancel
        });
      }
    },
    components:{
      LoginMethods
    },
    data(){
      return{
        gridItem:[
          {icon:'bill-o',text:'待支付'},
          {icon:'send-gift-o',text:'待收货'},
          {icon:'coupon-o',text:'待评价'},
          {icon:'friends-o',text:'售后服务'}
        ]
      }
    }
  }
</script>

<style scoped="scoped">
  #mine {
    /* width: 100%; */
    /* height: 100%; */
    /* background-color: darkmagenta; */
  }


  .van-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1rem;
  }

  .image>img {
    border: black solid 0.1rem;
    border-radius: 50%;
  }
  .personInfo{
    display: flex;
    align-content: center;
  }
  .info {
    justify-content: center;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
  }
  .van-cell__left-icon{
    color: green;
    font-size: 1.5rem;
  }
  .van-nav-bar__text{
    color: #999;
  }
</style>
