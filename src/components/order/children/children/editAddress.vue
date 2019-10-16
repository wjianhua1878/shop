<template>
  <div id="edit_address">
    <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft"  />

    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
export default {
  name: 'EditAddress',
   data() {
      return {
        areaList:{},
        searchResult: []
      }
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
        onChangeDetail(val) {
          if (val) {
            this.searchResult = [{
              name: '黄龙万科中心',
              address: '杭州市西湖区'
            }];
          } else {
            this.searchResult = [];
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
