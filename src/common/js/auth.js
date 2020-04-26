import iLocalStroage from '@/common/js/localStroage'
const TokenKey = "TokenKey";

export function getToken(tokenName) {
  return iLocalStroage.getExpired(tokenName);
}

/**
 * Cookies 得到加密后的数据
 * @param {*} key
 * @param {*} value
 * @param {*} expires 如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间
 */
export function setToken(tokenName, tokenVal, expires = 1) {
  let date = new Date() 
  date.setDate(date.getDate()+1)//1表示1天
  return iLocalStroage.setExpired(tokenName, tokenVal, date.getTime().toString());
}

export function removeToken() {
  return iLocalStroage.removeExpired(TokenKey);
}

