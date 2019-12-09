import Cookies from "js-cookie";
import { encryption, decryption } from "./cryptoAes";

let iCookies = {};

/**
 * Cookies 得到解密后的数据
 * @param {*} key
 */
iCookies.get = function(key) {
  let data = Cookies.get(key);
  if (data) {
    let dataAes = decryption(data); //解密
    return dataAes;
  }
};

/**
 * Cookies 得到加密后的数据
 * @param {*} key
 * @param {*} value
 * @param {*} expires 如果传入Number，那么单位为天，你也可以传入一个Date对象，表示有效期至Date指定时间
 */
iCookies.set = function(key, value, expires) {
  let dateAes = encryption(value); //加密
  if (expires) {
    Cookies.set(key, dateAes, expires);
  } else {
    Cookies.set(key, dateAes);
  }
};

/**
 * Cookies 去除
 * @param {*} key
 */
iCookies.remove = function(key) {
  return Cookies.remove(key);
};

export default iCookies;
