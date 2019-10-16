//本地化存储
export const setStore = (key, value) => {
  if (!key) return;
  let goods = JSON.stringify(value);
  window.localStorage.setItem(key, goods);
}

//本地化获取
export const getStore = (name) =>{
  if(!name) return;
  return window.localStorage.getItem(name);
}
