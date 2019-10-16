<template>
  <div>
    <div class="titleWrapper">
      <div class="title">
		  <span id="limit" >限时抢购</span>
          <span ref='finish'  class="finish">已结束</span>
        <span>
          <div id="countdown" ref='countdown'>
            <van-count-down :time="time" class="actionStateText" @finish='finish' >
              <template v-slot="timeData">
                <span class="item">{{ timeData.hours }}</span><span>:</span>
                <span class="item">{{ timeData.minutes }}</span><span>:</span>
                <span class="item">{{ timeData.seconds }}</span>
              </template>
            </van-count-down>
          </div>
        </span>
        <span class="more" @click='changeStore'>
          <router-link to="/main/category">更多</router-link>
        </span>
      </div>

    </div>


    <!-- <div id="countdown">
      <van-count-down :time="time">
        <template v-slot="timeData">
          <span class="item">{{ timeData.hours }}</span><span>:</span>
          <span class="item">{{ timeData.minutes }}</span><span>:</span>
          <span class="item">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div> -->

  </div>
</template>

<script>
  export default {
    name: 'Countdown',
    data() {
      return {
        timeData: {
          hours: 15,
          minutes: 45,
          seconds: 30
        },
        time: 1000*10,
      }
    },
    

    methods: {
      changeStore() {
        sessionStorage.setItem('tabbarIndex', 1);
      },
      finish() {
        this.$refs.countdown.style.display = 'none';
        this.$refs.finish.style.display = 'inline-block';
      }
    },

  }
</script>

<style scoped="scoped">
  .item {
    display: inline-block;
    width: 22px;
    margin-right: 5px;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    background-color: green;
  }

  #limit {
    width: 30%;
    /* border: 1px solid red; */
  }

  .wrapper {
    position: relative;
    margin-top: 0.625rem;
    padding: 1.25rem 0 0.9375rem 0;
    background: white;
  }

  .titleWrapper {
    position: relative;
    margin-top: 1rem;
    /* margin: 0 0.625rem 0.625rem 0.625rem; */
    height: 2.5rem;
    background-color: white;
    width: 100%;
  }

  .title {
    display: inline-block;
    border-left: 4px #3cb963 solid;
    padding-left: 0.3125rem;
    height: 2rem;
    line-height: 1.3125rem;
    vertical-align: middle;
    font-size: 1.1875rem;
  }
  .finish {
      vertical-align: middle;
      line-height: 0.875rem;
      font-size: 0.875rem;
      border-radius: 3px;
      padding: 0.15625rem;
      border: 1px solid #999;
      color: #666;
      margin-left: 0.3125rem;
      display: none;
  }

  .actionStateText {
    display: inline-block;
    display: block;
    vertical-align: middle;
    line-height: 0.875rem;
    font-size: 0.875rem;
    border-radius: 3px;
    padding: 0.15625rem;
    /* border: 1px solid #FE3824; */
    color: #FE3824;
    margin-left: 5rem;
  }



  .more>a {
    position: absolute;
    top: 30%;
    right: 0.5rem;
    /* height: 1.5625rem; */
    /* line-height: 1.5625rem; */
    font-size: 1rem;
    color: green;
    font-weight: 450;
    /* border: 1px red so; */
  }

  .isFinish{
    /* display: inline-block; */
  }
</style>
