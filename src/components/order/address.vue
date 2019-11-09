<template>
  <div id="add_address">
    <!-- 选择地址 -->
    <van-contact-card :type="address_type" add-text="选择收货地址" :name="address_name" :tel="address_phone" @click="chooseAddress" />

    <!-- 选择送达时间 -->
    <van-cell-group class="time">
      <van-cell title="送达时间" @click="showData" :value="arriveDate" is-link></van-cell>
      <van-cell :value="`共${totalGoodsNum}件`" is-link :center=true @click='toCart'>
        <template slot="title">
          <span class="image">
            <img v-for="(goods,index) in this.$store.state.shopCart" :key='index' :src="goods.selected ? goods.image : ''"
              alt="" style="width: 3rem;">
          </span>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 支付方式 -->
    <van-cell-group style="margin-top: 2rem;">
      <van-cell title="支付方式" value="微信" />
      <van-cell title="总额" :value="totalPrice | moneyFormat" />
      <van-cell title="优惠" :value="subPrice | moneyFormat" />
    </van-cell-group>

    <!-- 备注 -->
    <van-cell-group style="margin-top: 1rem;">
      <van-cell title="备注">
        <input type="text" style="text-align: right" placeholder="选填，备注您的特殊需求!" v-model="notice">
      </van-cell>
    </van-cell-group>

    <!-- 提交订单 -->
    <div id="submit_bar">
      <van-submit-bar :price="(totalPrice - subPrice)*100" button-text="提交订单" label="实付" @submit="onSubmit" />
    </div>

    <!-- 日期组件 -->
    <van-popup v-model="dateShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="datetime" :min-date="minDate" :max-date="maxDate" @cancel="onDateCancel"
        @confirm="onDateConfirm">
      </van-datetime-picker>
    </van-popup>
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {
    Dialog
  } from 'vant'
  import {
    getAllSelectedGoods,
    postOrder,
    delAllSelectedGoods,
    orderPaySuccess,
    getGoodsCart
  } from './../../service/api/index.js'
  import {
    setStore
  } from './../../../config/global.js'
  export default {
    name: 'AddAddress',
    data() {
      return {
        // 1. 地址
        address_type: 'add', // 地址卡片类型
        address_name: null, // 收货人
        address_phone: null, // 收货人电话
        address_id: null, // 收货人地址ID

        //选择日期组件
        arriveDate: '请选择送达时间',
        dateShow: false,
        minDate: new Date(),
        maxDate: new Date(2021, 10, 1),
        currentDate: new Date(),

        //备注
        notice: null,
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
      chooseAddress() {
        this.$router.push('/confirmOrder/myAddress');
        // alert(0);
      },
      toCart() {
        this.$router.back();
      },
      onSubmit() {
        if (this.totalGoodsNum > 0) { //选购了商品
          if (!this.address_id) { //没有选择地址
            this.$toast({
              message: '请选择收货地址！',
              duration: 1000,
              closeOnClick: true
            });
            return;
          } else if (this.arriveDate === '请选择送达时间') { //没有选择送达时间
            this.$toast({
              message: '请选择送达时间！',
              duration: 500,
              closeOnClick: true
            });
            return;
          } else { //全部信息填写正确
            Dialog.confirm({
              title: '提示',
              message: '确定要提交订单吗?'
            }).then(async () => {
              // on confirm

              //查询所有被选中的商品
              let selectedGoods = await getAllSelectedGoods(this.$store.state.userInfo.token);
              console.log(selectedGoods);
              if (selectedGoods.success_code === 200) { //查询成功
                //选中的商品创建订单
                let orderResult = await postOrder(this.$store.state.userInfo.token, this.address_id, this.arrive_time,
                  selectedGoods.data, this.notice, this.totalPrice, 0);
                console.log(orderResult);
                if (orderResult.success_code === 200) { //订单创建成功
                  //删除已经生成订单的商品
                  let delResult = await delAllSelectedGoods(this.$store.state.userInfo.token);
                  console.log(delResult);
                  if (delResult.success_code === 200) { //删除成功
                    this.$toast({
                      message: '正在支付中...',
                      duration: 1500,
                      onClose:()=>{
                        this.$toast({
                          message: '支付成功！',
                          duration: 1000,
                        });
                      }


                    });
                    let paySuccessResult = await orderPaySuccess(this.$store.state.userInfo.token, orderResult.data
                      .order_id);
                    console.log(paySuccessResult);
                    if (paySuccessResult.success_code === 200) {
                      this.$router.replace('/main/cart');
                      this.initShopCart();
                    }
                  } else {
                    this.$toast({
                      message: '有点小错误！',
                      duration: 500,
                    });
                  }
                } else {
                  this.$toast({
                    message: '有点小错误！',
                    duration: 500,
                  });
                }
              } else {
                this.$toast({
                  message: '有点小错误！',
                  duration: 500,
                });
              }




            }).catch(() => {
              // on cancel
            });
          }


        } else { //没有选购商品
          Dialog.alert({
            title: '提示',
            message: '请先选购商品！'
          }).then(() => {
            // on close
          });
        }

      },
      showData() {
        this.dateShow = true;
      },
      onDateCancel() {
        this.dateShow = false;
      },
      onDateConfirm(value) {
        this.dateShow = false;
        let year = value.getFullYear(); //2019
        let month = value.getMonth() + 1; //11
        let day = value.getDate();
        let hour = value.getHours();
        let minutes = value.getMinutes();
        day = day > 10 ? day : '0' + day;
        hour = hour > 10 ? hour : '0' + hour;
        minutes = minutes > 10 ? minutes : '0' + minutes;
        this.arriveDate = `${year}-${month}-${day}  ${hour}:${minutes}`;
      },
      //初始化购物车商品
      async initShopCart() {
        if (this.$store.state.userInfo.token) { //已经登录
          //从服务器获取当前用户购物车中的数据
          let result = await getGoodsCart(this.$store.state.userInfo.token);
          // console.log(result);
          //如果获取成功
          let shopCart = {};
          if (result.success_code === 200) {
            let cartArr = result.data;
            //遍历
            cartArr.forEach((value) => {
              shopCart[value.goods_id] = {
                'count': value.num,
                'id': value.goods_id,
                'name': value.goods_name,
                'image': value.small_image,
                'price': value.goods_price,
                'selected': value.checked
              }
            });
          }
          //存入本地
          setStore('shopCart', shopCart);
          //初始化购物车，获取本地购物车数据
          this.$store.commit('initCart');

        }
      }

    },
    computed: {
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
      subPrice() {
        let subPrice = 0;
        if (this.totalPrice < 100) {
          subPrice = this.totalPrice * 0.05;
        } else if (this.totalPrice < 200) {
          subPrice = this.totalPrice * 0.1;
        } else if (this.totalPrice < 300) {
          subPrice = this.totalPrice * 0.15;
        } else {
          subPrice = this.totalPrice * 0.2;
        }
        return subPrice;
      }
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

  .van-cell-group {
    width: 100%;
  }

  .time {
    margin-top: 2rem;
  }

  .image {
    display: flex;
    flex-wrap: nowrap;
    width: 15rem;
    overflow-x: auto;
  }

  .van-submit-bar__text:nth-child(1) {
    font-size: 1rem;
    padding-right: 1rem;
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
