<template>
  <div id="mine_order">
    <van-nav-bar title="我的订单" fixed left-arrow @click-left="onClickLeft" />
    <div class="tab">
    <van-tabs v-model="activeNamr" @click='tabClick' style="margin-top:2.5rem;;">
      <van-tab title="全部" name="all">
        <MineOrderItem v-for="(order,index) in allOrder" :key='index' :order="order"></MineOrderItem>
        </van-tab>
      <van-tab title="待支付" name="will">
        <MineOrderItem v-for="(order,index) in willOrder" :key='index' :order="order"></MineOrderItem>
      </van-tab>
      <van-tab title="待收货" name="pay">
        <MineOrderItem v-for="(order,index) in payOrder" :key='index' :order="order"></MineOrderItem>
      </van-tab>
    </van-tabs>
    </div>
  </div>
</template>

<script>
  import MineOrderItem from './MineOrderItem.vue'
  import {getOrder} from './../../service/api/index.js'
  export default {
    name: 'MineOrder',
    data() {
      return {
        activeNamr: 'all',

        allOrder:null,
        willOrder:null,
        payOrder:null
      };
    },
    mounted() {
      this.getOrderByStatus();
    },
    components:{
      MineOrderItem
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },

      //处理标签页选项的点击
      async tabClick(name){
        // console.log(name);
        let result;
        if(name === 'all'){//点击了全部标签页
          this.allOrder = await this.getOrderByStatus();
        }else if(name === 'will'){//点击了待支付标签页
          this.willOrder = await this.getOrderByStatus('will');
        }else if(name === 'pay'){//点击了待收货标签页
          this.payOrder = await this.getOrderByStatus('pay');
        }
          // console.log(result);
      },

      //点击标签页时按状态请求数据
      async getOrderByStatus(status){
        let result = await getOrder(this.$store.state.userInfo.token,status);
        // console.log(result.data);
        return result.data//[{},{},{}]
      }
    }
  }
</script>

<style scoped="scoped">
  /* .tab{
    position: fixed;
    width: 100%;
    top: 2.875rem;
  } */
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
