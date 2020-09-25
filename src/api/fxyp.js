import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";
//分析研判
export function getFxypApi(data) {
    return  request({
      url: "/fxyp/test",
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //年度业务分析---年度案件类型数量比重统计
  export function ndajsllxslbztj(data) {
    return  request({
      url: "/fxyp/ndajsllxslbztj",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //年度业务分析---年度案件数量同比统计
  export function ndajsltbtj(data) {
    return  request({
      url: "/fxyp/ndajsltbtj",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //案件分析---案件数量时间趋势分析
  export function ajslsjqsfx(data) {
    return  request({
      url: "/fxyp/ajslsjqsfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件发案数量同比分析
  export function ajfasltbfx(data) {
    return  request({
      url: "/fxyp/ajfasltbfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件数量对比分析  赔补偿
  export function ajsldbfxpbc(data) {
    return  request({
      url: "/fxyp/ajsldbfxpbc",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件数量对比分析  赔补偿发案
  export function ajsldbfxpbcfa(data) {
    return  request({
      url: "/fxyp/ajsldbfxpbcfa",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件数量对比分析  处罚
  export function ajsldbfxcf(data) {
    return  request({
      url: "/fxyp/ajsldbfxcf",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件数量对比分析  处罚发案
  export function ajsldbfxcffa(data) {
    return  request({
      url: "/fxyp/ajsldbfxcffa",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //电子化办案分析
  export function dzhbafx(data) {
    return  request({
      url: "/fxyp/dzhbafx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //电子化办案分析 人员
  export function dzhbafxry(data) {
    return  request({
      url: "/fxyp/dzhbafxry",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件当事人特征分析
  export function getAjdsrtzfx(data) {
    return  request({
      url: "/fxyp/ajdsrtzfx",
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //发案原因分析
  export function getFayyfx(data) {
    return  request({
      url: "/fxyp/fayyfx",
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案发地点分布
  export function afddfb(data) {
    return  request({
      url: "/fxyp/afddfb",
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //人员关联分析
  export function ryglfx(data) {
    return  request({
      url: "/fxyp/ryglfx",
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  年
  export function sjglfx(data) {
    return  request({
      url: `/case/numYear/${data}`,
      method:  "get",
      showloading: false,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  月
   export function sjglfxmonth(data) {
    return  request({
      url: `/case/numMonth/${data}`,
      method:  "post",
      showloading: false,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  日
   export function sjglfxday(data) {
    return  request({
      url: `/case/numDay/${data}`,
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //时间关联分析  时
  export function sjglfxhours(data) {
    return  request({
      url: `/case/numHours/${data}`,
      method:  "post",
      showloading: false,
      // params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //违法行为关联分析
  export function wfxwglfx(data) {
    return  request({
      url: "/fxyp/wfxwglfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
