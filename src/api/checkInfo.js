import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";

let vm = new Vue();

let CHECK_API='http://124.192.215.11:8086/cy';//信息查验
//业户查验
export function yehuCheckApi(data) {
    console.log(data);
    return request({
        url: CHECK_API + "/yuz/yh?licenseCode=" + data.licenseCode + "&ownerName=" + data.ownerName + "&provinceCode=" + data.provinceCode,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}
//船员适任证查验-身份证
export function crewCheckApiIdcard(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/shipInfoSrzSfz?idCardNo=" + data.idCardNo ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}
//船员适任证查验-证书号码
export function crewCheckApiCertificates(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/shipInfoZsh?certNo=" + data.certNo ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}
//国内水路运输船舶营运证-证书编号资源服务接口
export function crewCheckApiGnslcbyy(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/shipYyzNO?zjh=" + data.zjh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}
//国际班轮运输经营资格登记证-证书编号资源服务接口
export function crewCheckApiGjysjyzgz(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/gjDjzsbh?zsbh=" + data.zsbh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}

//客运线路标识牌查验接口
export function crewCheckApiKyxlbsp(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/gjDjzsbh?zsbh=" + data.zsbh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}

//国内水路运输船舶营运证-证书编号资源服务接口
export function crewCheckApiGnslcbyy(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/shipYyzNO?zjh=" + data.zjh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}
//国际班轮运输经营资格登记证-证书编号资源服务接口
export function crewCheckApiGjysjyzgz(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/gjDjzsbh?zsbh=" + data.zsbh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}

//客运线路标识牌查验接口
export function crewCheckApiKyxlbsp(data) {
    console.log(data);
    return request({
        url: CHECK_API +"/ship/gjDjzsbh?zsbh=" + data.zsbh ,
        method: "GET",
        showloading: false,
        cancelToken: setCancelSource()
    });
}