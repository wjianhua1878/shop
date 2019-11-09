import Vue from 'vue'

//图标
import { Icon } from 'vant';
Vue.use(Icon);


//底部导航栏
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);

//首页轮播图
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);

import { Lazyload } from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);

//首页商品列表
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);

//加载
import { Loading } from 'vant';
Vue.use(Loading);

//倒计时
import { CountDown } from 'vant';
Vue.use(CountDown);

//侧边导航
import { Sidebar, SidebarItem } from 'vant';
Vue.use(Sidebar);
Vue.use(SidebarItem);

//文字提示
import { Toast } from 'vant';
Vue.use(Toast)

//订单页面顶部导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);

//订单页面添加地址
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit);

//订单页面单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);

//订单页面提交
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);

//地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);

//地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit)

//时间选择组件
import { DatetimePicker } from 'vant';
Vue.use(DatetimePicker);

//弹出层
import { Popup } from 'vant';
Vue.use(Popup)

//标签页
import { Tab, Tabs } from 'vant';
Vue.use(Tab).use(Tabs);