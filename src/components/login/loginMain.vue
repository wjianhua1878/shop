<template>
  <div id="login_main">
    <van-nav-bar left-arrow @click-left="onClickLeft" />
    <div class="login-container">
      <div class="login-inner">
        <div class="login-header">
          <div class="login-logo">
            <img src="./../../assets/logo.png" alt="" width="200">
          </div>
          <!--面板标题-->
          <div class="login-header-title">
            <a href="javascript:;" :class="{current:loginChoose}" @click="changeChoose(true)">手机登录</a>
            <a href="javascript:;" :class="{current:!loginChoose}" @click="changeChoose(false)">用户名登录</a>
          </div>
        </div>

        <!--面板表单部分-->
        <div class="login-content">
          <form action="">
            <!-- 验证码登录部分 -->
            <div :class="{current:loginChoose}">
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="请输入手机号码" v-model="phoneNum">
                <button class="get-verification" v-if="!countDown" :class="{phone_right:testPhoneNumRight}"
                  @click.prevent="getVerification">获取验证码</button>
                <button disabled="disabled" class="get-verification" v-else>
                  已发送({{countDown}}s)
                </button>
              </section>
              <section class="login-hint" v-if="countDown">
                测试接口,验证码均为666666 ￣▽￣
              </section>
              <section class="login-verification">
                <input type="text" maxlength="6" placeholder="请输入验证码" v-model="verifyCode" />
              </section>
            </div>

            <!-- 账号密码登录部分 -->
            <div :class="{current:!loginChoose}">
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="请输入用户名" v-model="userName">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="11" placeholder="请输入密码" v-model="userPwd" />
              </section>

              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img class="get-verification" src="http://demo.itlike.com/web/xlmc/api/captcha" ref='captcha' @click="getCaptcha">
              </section>
            </div>
            <button class="login-submit" @click.prevent="login">登录</button>
          </form>
          <button class="login-back" @click="$router.back()">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getPhoneCode,
    phoneCodeLogin,
    pwdLogin,
    getGoodsCart
  } from './../../service/api/index.js'
  import {setStore} from './../../../config/global.js'
  export default {
    name: 'loginMain',
    data() {
      return {
        //手机验证码登录部分
        loginChoose: true, //选择登录方式
        phoneNum: null, //手机号码
        verifyCode: null, //手机登录验证码
        countDown: 0,
        userInfo: {},

        //账号密码登录部分
        userName: null,
        userPwd: null,
        captcha: null

      }
    },
    computed: {
      testPhoneNumRight() {
        let reg = /^[1][3,5,7,8][0-9]{9}$/;
        return reg.test(this.phoneNum);
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back();
      },
      changeChoose(flag) {
        this.loginChoose = flag;
      },

      //获取短信验证码
      async getVerification() {
        if (this.testPhoneNumRight) {
          // alert('success');
          this.countDown = 60;
          this.interval = setInterval(() => {
            this.countDown--;
            if (this.countDown == 0) {
              clearInterval(this.interval);
            };
          }, 1000);

          let result = await getPhoneCode(this.phoneNum);
          this.verifyCode = result.code;
          console.log(result);
        } else {
          this.$toast({
            message: '请输入正确的手机号码!',
            duration: 500,
            closeOnClick: true
          });
        }
      },

      //登录
      async login() {
        //判断登录方式
        if (this.loginChoose) { //手机验证码登录
          if (!this.phoneNum) { //没有填写手机号码
            this.$toast({
              message: '请输入手机号码!',
              duration: 500,
              closeOnClick: true,
            });
            return;
          } else if (!this.verifyCode) { //没有输入验证码
            this.$toast({
              message: '请输入验证码!',
              duration: 500,
              closeOnClick: true,

            });
          } else { //输入了正确的手机号码和验证码  可以进行登录
            let result = await phoneCodeLogin(this.phoneNum, this.verifyCode);
            this.userInfo = result.data;
            if (result.success_code === 200) {
              this.$toast({
                message: '登录成功!',
                duration: 500
              });
              // console.log(this.userInfo);
              this.$store.dispatch('syncUserInfo', this.userInfo);
              this.initShopCart();
              // this.$router.push('/main');
              this.$router.back();
            } else {
              this.$toast({
                message: '验证码错误!',
                duration: 500
              })
            }
          }
        } else { //账号密码登录
          if (!this.userName) { //没有输入用户名
            this.$toast({
              message: '请输入用户名!',
              duration: 500
            });
            return;
          } else if (!this.userPwd) { //没有输入密码
            this.$toast({
              message: '请输入密码!',
              duration: 500
            });
            return;
          } else if (!this.captcha) { //没有输入验证码
            this.$toast({
              message: '请输入验证码!',
              duration: 500
            });
            return;
          } else {
            let result = await pwdLogin(this.userName, this.userPwd, this.captcha);
            console.log(result);
            if (result.success_code !== 200) {
              this.$toast({
                message: '有点小错误!',
                duration: 500
              });
            }
          }
        }

      },

      //获取图形验证码
      getCaptcha() {
        this.$set(this.$refs.captcha, 'src', 'http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date());
      },
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
      },
    }
  }
</script>

<style scoped="scoped">
  .van-nav-bar .van-icon {
    color: gray;
    vertical-align: middle;
    font-size: 1.2rem;
  }

  .van-hairline--bottom {
    background-color: #F5F5F5;
  }


  .login-container {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
  }

  .login-container .login-inner {
    padding-top: 3.75rem;
    width: 80%;
    margin: 0 auto;
  }

  .login-container .login-inner .login-header .login-logo {
    font-size: 2.5rem;
    font-weight: bold;
    color: #75a342;
    text-align: center;
    position: fixed;
    top: 4rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .login-container .login-inner .login-header .login-header-title {
    padding-top: 2.5rem;
    padding-bottom: 0.625rem;
    margin-top: 8rem;
    text-align: center;
  }

  .login-container .login-inner .login-header .login-header-title>a {
    color: #333;
    font-size: 1rem;
    padding-bottom: 4px;
  }

  .login-container .login-inner .login-header .login-header-title>a:first-child {
    margin-right: 40px
  }

  .login-container .login-inner .login-header .login-header-title>a.current {
    color: #75a342;
    font-weight: 700;
    border-bottom: 2px solid #75a342
  }

  .login-container .login-inner .login-content>form>div {
    display: none;
  }

  .login-container .login-inner .login-content>form>div.current {
    display: block
  }

  .login-container .login-inner .login-content>form>div input {
    width: 100%;
    height: 100%;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }

  .login-container .login-inner .login-content>form>div input:focus {
    border: 1px solid #75a342
  }

  .login-container .login-inner .login-content>form>div .login-message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }

  .login-container .login-inner .login-content>form>div .login-message .get-verification {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
  }

  .login-container .login-inner .login-content>form>div .login-message .get-verification.phone_right {
    color: #75a342
  }

  .login-container .login-inner .login-content>form>div .login-verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }



  .login-container .login-inner .login-content>form>div .login-hint {
    margin-top: 12px;
    color: #999;
    font-size: 12px;
    line-height: 20px;
  }

  .login-container .login-inner .login-content>form .login-submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #75a342;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0
  }

  .login-container .login-inner .login-content .login-back {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 15px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #75a342;
    color: #75a342;
    text-align: center;
    font-size: 16px;
    line-height: 42px
  }
</style>
