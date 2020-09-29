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
      url: "/case/numYear",
      params: data,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  月
   export function sjglfxmonth(data) {
    return  request({
      url: "/case/numMonth",
      params: data,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  日
   export function sjglfxday(data) {
    return  request({
      url: "/case/numDay",
      params: data,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  //时间关联分析  时
  export function sjglfxhours(data) {
    return  request({
      url: "/case/numHours",
      params: data,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  // 执法门类
  export function zfml() {
    return  request({
      url: "/organdzfml/zfml",
      method:  "get",
      showloading: false,
      // loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  // 案件当事人特征分析
  export function casepPeople({year1, year2}) {
    return  request({
      url: `/case/people/${year1}/${year2}`,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  // 法律法规分析研判
  export function flfgfxyp({ startTime, endTime }) {
    return  request({
      url: `/judge/analysis/list/${startTime}/${endTime}`,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  // 监管治理分析研判
  export function jgzlfxyp({ startTime, endTime }) {
    return  request({
      url: `/judge/analysis/JGZLlist/${startTime}/${endTime}`,
      method:  "get",
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
      cancelToken:  setCancelSource(),
    });
  }
  // 电子化办案分析
  export function dzhbafx(data) {
    return  request({
      url: "/electronization/electronization",
      method:  "get",
      params: data,
      showloading: true,
      loadingType: 'loadPart',
      baseUrlType:  'FXYP_HOST',
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
