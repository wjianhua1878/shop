import ajax from './ajax'
//http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail
//http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk002

//首页数据
export const getHomeData = ()=>ajax('http://demo.itlike.com/web/xlmc/api/homeApi');
//购物车数据
export const getCategorData = ()=>ajax('http://demo.itlike.com/web/xlmc/api/homeApi/categories');
//购物车商品数据
export const getCategorDataDetail = (param)=>ajax('http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk'+param);


//获取验证码
export const getPhoneCode = (phone) => ajax('http://demo.itlike.com/web/xlmc/api/send_code', {phone});
//手机验证码登录
export const phoneCodeLogin = (phone, code) => ajax('http://demo.itlike.com/web/xlmc/api/login_code', {phone, code}, 'POST');
//账号密码登录
export const pwdLogin = (user_name, user_pwd, captcha) => ajax('http://demo.itlike.com/web/xlmc/api/login_pwd', {user_name, user_pwd, captcha}, 'POST');


//购物车接口
//添加商品
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image)=>ajax('http://demo.itlike.com/web/xlmc/api/cart/add', {user_id, goods_id, goods_name, goods_price, small_image}, 'POST');
//从服务器获取购物车数据
export const getGoodsCart = (user_id) => ajax('http://demo.itlike.com/web/xlmc/api/cart/search/'+ user_id );
//修改购物车商品数量
export const changeCartNum = (user_id, goods_id, type)=>ajax('http://demo.itlike.com/web/xlmc/api/cart/num', {user_id, goods_id, type}, 'POST');
//删除当前用户购物车中所有的商品
export const clearAllCart = (user_id) => ajax('http://demo.itlike.com/web/xlmc/api/cart/clear/'+ user_id);
