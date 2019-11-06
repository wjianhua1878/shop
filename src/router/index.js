import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Cart from './../components/Cart'
import Main from './../components/Main'
const Home = () => import('./../components/Home.vue');
const Category = () => import('./../components/Category.vue');
const Mine = () => import('./../components/Mine.vue');
const Cart = () => import('./../components/Cart.vue');

import Order from './../components/Order'
const MyAddress = () => import('./../components/order/children/myAddress.vue');
const AddAddress = () => import('./../components/order/children/children/addAddress.vue');
const EditAddress = () => import('./../components/order/children/children/editAddress.vue');

import LoginMethods from './../components/login/loginMethods'
import loginMain from './../components/login/loginMain'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        keepAlive: true
      },
      children: [
        // {path:'/main',redirect:'/main/home'},
        {
          path: '/main',
          redirect: '/main/home',
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: {
            keepAlive: true
          }
        },
        // {path:'home',name:'home',component:Home},
        // {path:'category',name:'category',component:Category},
        {
          path: 'category',
          name: 'category',
          component: Category,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'mine',
          name: 'mine',
          component: Mine
        },
        {
          path: 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'login',
          component: LoginMethods
        },
      ]
    },
    {
      path: '/confirmOrder',
      name: 'order',
      component: Order,
      children: [{
        path: 'myAddress',
        component: MyAddress,
        name: 'myAddress',
        children:[
          {path:'editAddress',name:'editAddress',component:EditAddress},
          {path:'addAddress',name:'addAddress',component:AddAddress},
        ]
      }]
    },
    /*   {
       path:'/myAddress',
       name:'myAddress',
       component:MyAddress,
       children:[
         {path:'editAddress',name:'editAddress',component:EditAddress},
         {path:'addAddress',name:'addAddress',component:AddAddress},
       ]
       }, */
    {
      path: '/login',
      name: 'login',
      component: LoginMethods
    },
    {
      path: '/loginMain',
      name: 'loginMain',
      component: loginMain
    }
  ],
})
