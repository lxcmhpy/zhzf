

// 加密秘钥
const aesKey = "U2FsdGVkX19oil2jSpI2nhJcXe6OOnZk57R72HI="; //秘钥。长度32的16进制字符串。
//随机生成长度为32的16进制字符串。IV称为初始向量
const aesIv ="123456654321123456";

/**
 * 加密
 * @param {*} data
 * @param {*} key
 * @param {*} iv
 */
function getEnAesString(data, key, iv) {
     key  = CryptoJS.enc.Utf8.parse(key);
     iv   = CryptoJS.enc.Utf8.parse(iv);
    var encrypted =CryptoJS.AES.encrypt(data,key,
        {
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7
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
     key  = CryptoJS.enc.Utf8.parse(key);
     iv   = CryptoJS.enc.Utf8.parse(iv);
    var decrypted =CryptoJS.AES.decrypt(data,key,
        {
            iv:iv,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.Pkcs7
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function encryption(data) {
    //加密
    var encrypted = getEnAesString(data.toString(), aesKey, aesIv); //密文
    return encrypted;
}

function decryption(data) {
    //解密
    var decryptedStr = getDeAesString(data.toString(), aesKey, aesIv);
    return decryptedStr;
}
