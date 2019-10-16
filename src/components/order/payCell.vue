<template>
  <div id="pay_cell">

    <van-cell-group class="time">
      <van-cell title="送达时间" @click="" is-link></van-cell>
          <van-cell :value="`共${totalGoodsNum}件`" is-link :center=true @click='toCart'>
            <template slot="title">
              <span class="image">
              <img v-for="(goods,index) in this.$store.state.shopCart" :src="goods.selected ? goods.image : ''" alt="" style="width: 3rem;">
              </span>
            </template>
          </van-cell>
    </van-cell-group>


    <van-cell-group style="margin-top: 2rem;">
      <van-cell title="支付方式" value="微信" is-link/>
      <van-cell title="总额" :value="totalPrice | moneyFormat"  />
      <van-cell title="优惠" :value= "subPrice | moneyFormat"  />
    </van-cell-group>

    <van-cell-group style="margin-top: 1rem;">
      <van-cell title="备注">
        <input type="text" style="text-align: right" placeholder="选填，备注您的特殊需求！">
      </van-cell>
    </van-cell-group>


  <div id="submit_bar">
    <van-submit-bar
      :price="(totalPrice - subPrice)*100"
      button-text="提交订单"
      label="实付"
      @submit="onSubmit"
    />
  </div>




  </div>
</template>

<script>
	import {Dialog} from 'vant'
  export default {
    name: 'PayCell',
    methods: {
      test() {
        alert(1);
      },
      toCart(){
        this.$router.back();
      },
      onSubmit(){
        if (this.totalGoodsNum > 0) {
          Dialog.confirm({
            title: '提示',
            message: '确定要提交订单吗?'
          }).then(() => {
            // on confirm
          this.$toast({
            message:'提交成功！',
            duration:500,
            closeOnClick:true
          });
          // this.$router.push({path:'/main/cart'});
          }).catch(() => {
            // on cancel
          });
        } else{
          Dialog.alert({
            title: '提示',
            message: '请选购商品！'
          }).then(() => {
            // on close
          });
        }

      }
    },
    computed:{
      //计算商品件数
      totalGoodsNum() {
        let totalGoodsNum = 0;
        Object.values(this.$store.state.shopCart).forEach((goods) => {
          if (goods.selected) {
            totalGoodsNum++;
          }
        })
        return totalGoodsNum;

      },
      //商品总价
      totalPrice() {
        let totalPrice = 0;
        Object.values(this.$store.state.shopCart).forEach((goods, index) => {
          if (goods.selected) {
            totalPrice = totalPrice + goods.count * goods.price;
          }
        });
        return totalPrice;
      },

      //优惠价格
      subPrice(){
        let subPrice = 0;
        if (this.totalPrice < 100) {
          subPrice = this.totalPrice * 0.05;
        }else if (this.totalPrice <200) {
          subPrice = this.totalPrice * 0.1;
        }else if (this.totalPrice <300) {
          subPrice = this.totalPrice * 0.15;
        }else{
          subPrice = this.totalPrice * 0.2;
        }
        return subPrice;
      }
    }
  }
</script>

<style scoped="scoped">
  .van-cell-group {
    width: 100%;
  }
  .time{
    margin-top: 2rem;
  }
  .image{
    display: flex;
    flex-wrap: nowrap;
    width: 15rem;
    overflow-x: auto;
  }
  .van-submit-bar__text:nth-child(1){
    font-size: 1rem;
    padding-right: 1rem;
  }

</style>
