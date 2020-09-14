import CryptoJS from "crypto-js";

// 加密秘钥
const aesKey = "U2FsdGVkX19oil2jSpI2nhJcXe6OOnZk57R72HI="; //秘钥。长度32的16进制字符串。
//随机生成长度为32的16进制字符串。IV称为初始向量
const aesIv = "abcdefgabcdefg12";

/**
 * 加密
 * @param {*} data
 * @param {*} key
 * @param {*} iv
 */
function getEnAesString(data, key, iv) {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    var encrypted = CryptoJS.AES.encrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return encrypted.toString();    //返回的是base64格式的密文
}


/**
 * 解密
 * @param {*} data
 * @param {*} key
 * @param {*} iv
 */
function getDeAesString(data, key, iv) {
    key = CryptoJS.enc.Utf8.parse(key);
    iv = CryptoJS.enc.Utf8.parse(iv);
    var decrypted = CryptoJS.AES.decrypt(data, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encryption(data) {
    //加密
    var encrypted = getEnAesString(data.toString(), aesKey, aesIv); //密文
    return encrypted;
}

export function decryption(data) {
    //解密
    var decryptedStr = getDeAesString(data.toString(), aesKey, aesIv);
    return decryptedStr;
}


export function generatekey(num) {
    let library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (var i = 0; i < num; i++) {
        let randomPoz = Math.floor(Math.random() * library.length);
        key += library.substring(randomPoz, randomPoz + 1);
    }
    return key;
}

export function encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12'; //判断是否存在ksy，不存在就用定义好的key
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
export function decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'abcdsxyzhkj12345';
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}


