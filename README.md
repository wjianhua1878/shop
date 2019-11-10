# shop

> 基于vue2.x实现的购物商城（vue vue-router vuex axios vant）

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 技术栈
1. vue-router : vue-router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
2. vuex : vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
3. axios : 用于请求网络数据。
4. vant : 有赞团队开发的轻量、可靠的移动端Vue组件库。

# 实现的功能
商品详情、商品分类浏览、登录、购物车（与用户信息相关联、根据用户信息读取购物车数据，商品的增加、减少、删除和单全选）、收货地址管理（增删查改）、订单提交、订单查询等功能。

# 部分效果展示
> ## 首页、分类、购物车、我的

![](https://github.com/wjianhua1878/study/raw/master/images/main.png)

>## 地址管理（增删查改）

![地址管理](https://github.com/wjianhua1878/study/raw/master/images/address.png)

>## 订单查询

![订单查询](https://github.com/wjianhua1878/study/raw/master/images/order.png)

# 预计可能会完成的功能
1. 集成定位
2. 查看商品详情
3. 商品搜索功能
