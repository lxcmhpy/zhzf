// import Cookies from 'js-cookie'
import Cookies from "@/js/cookies";

const TokenKey = "TokenKey";

export function getToken(tokenName) {
  return Cookies.get(tokenName);
}

/**
 * Cookies 得到加密后的数据
 * @param {*} key
 * @param {*} value
 * @param {*} expires 如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间
 */
export function setToken(tokenName, tokenVal, expires = 60 * 60 * 24 * 7) {
  var date = new Date();
  date.setTime(date.getTime() + expires * 60 * 1000); //10表示10秒钟
  return Cookies.set(tokenName, tokenVal, { expires: date });
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
