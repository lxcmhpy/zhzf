import axios from "axios";
/**
 * 页面初始化或者局部加载前清除前面还在请求的接口
 */
let source;

//请求时设置
export function setCancelSource() {
     source = axios.CancelToken.source(); // 这里初始化source对象
    return source.token; // 这里初始化source对象
}

//清除前面接口
export function stopCancelSource() {
    if (typeof source === "object") {
        source.cancel("stopQuest"); //取消请求
    }
}
