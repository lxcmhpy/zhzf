import request from "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";
import Vue from "vue";
import iLocalStroage from '@/common/js/localStroage'

let vm = new Vue();

// let CHECK_API='http://172.16.170.91:8086/cy';//信息查验
// let CHECK_API='http://124.192.215.11:8086/cy';//信息查验公网

let CHECK_API = iLocalStroage.gets('CURRENT_BASE_URL').CHECK_API

//业户查验
export function yehuCheckApi(data) {
    console.log(data);
    return request({
        url: "/cy/yuz/yh?licenseCode=" + data.licenseCode + "&ownerName=" + data.ownerName + "&provinceCode=" + data.provinceCode,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}
//船员适任证查验-身份证
export function crewCheckApiIdcard(data) {
    console.log(data);
    return request({
        url: "/cy/ship/shipInfoSrzSfz?idCardNo=" + data.idCardNo,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}
//船员适任证查验-证书号码
export function crewCheckApiCertificates(data) {
    console.log(data);
    return request({
        url: "/cy/ship/shipInfoZsh?certNo=" + data.certNo,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}


//船舶基础资料_船舶基本信息资源服务接口
export function crewCheckApiCbjczl(data) {
    console.log(data);
    return request({
        url: "/cy/ship/shipInfo?shipId=" + data.shipId,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}
//国际班轮运输经营资格登记证-证书编号资源服务接口
export function crewCheckApiGjysjyzgz(data) {
    console.log(data);
    return request({
        url: "/cy/ship/gjDjzsbh?zsbh=" + data.zsbh,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}

//客运线路标识牌查验接口
export function crewCheckApiKyxlbsp(data) {
    console.log(data);
    return request({
        url: "/cy/yuz/lxbsp?plateColorCode=" + data.plateColorCode + "&vehicleNo=" + data.vehicleNo,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}

//道路运输从业人员查验
export function dlyscyryCheckApi(data) {
    console.log(data);
    return request({
        url: "/cy/yuz/cyyy?certificateCode=" + data.certificateCode + "&staffName=" + data.staffName + "&provinceCode=" + data.provinceCode,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}

//营运车辆查验
export function yyclCheckApi(data) {
    console.log(data);
    return request({
        url: "/cy/yuz/car?vehicleNo=" + data.VehicleNo + "&transCertificateCode=" + data.TransCertificateCode + "&vin=" + data.Vin,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}

//营运车辆查验（通过车牌号码和车牌颜色查验，可批量）
export function vehicleCheckApi(data) {
    console.log(data);
    return request({
        url: "/cy/yuz/vehicle?json=" + data,
        method: "GET",
        showloading: false,
        baseUrlType: 4,
        cancelToken: setCancelSource()
    });
}
