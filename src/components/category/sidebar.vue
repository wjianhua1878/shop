<template>
  <div id="sidebar">
    <van-sidebar v-model="activeKey"  >
      <van-sidebar-item :title="name.name" v-for="(name,index) in name_list" :key='index' @click='getIndex(index)' />

    </van-sidebar>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
        return {
          activeKey: 0
        };
      },
      props:{
        name_list:Array
      },
      methods:{
        getIndex(index){
          this.$emit('getIndex',index+1);
        }
      }
  }
</script>

<style scoped="scoped">
#sidebar{
  position: fixed;
  top: 3.125rem;
  height: 36rem;
  overflow-y: auto;
  overflow-x: hidden;
  /* background-color: black; */
}
#sidebar::-webkit-scrollbar{
    display: none;
}
.van-sidebar{
  width: 4.5rem;
  margin-bottom: 3.2rem;
}
.van-sidebar-item{
  height: 100%;
  width: 100%;
}
.van-sidebar-item--select{
  color: orangered;
  border-color:orangered;
}

</style>
