<template>
  <div id="app">
    <!-- <Cart></Cart> -->
    <!-- <Main></Main> -->

    <!-- <router-view/> -->
    <transition name="router-slider" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import Cart from './components/Cart';
  import Main from './components/Main';
  export default {
    name: 'App',
    data() {
      return {

      }
    },
    components: {
      Cart,
      Main
    }
  }
</script>

<style scoped="scoped">
  #app {
    width: 100%;
    height: 100%;
  }

  /*过渡动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.1s;
  }

  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
