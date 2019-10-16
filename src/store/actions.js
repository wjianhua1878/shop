export default {
  // add(context,stark) {
  //   context.commit('add',stark);
  // },
  // sub(context){
  //   context.commit('sub');
  // }

    syncUserInfo(context,userInfo){
      context.commit('setUserInfo',{userInfo});
    }
}
