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
  //年度业务分析---年度案件类型罚没款比重统计
  export function ndajlxfmkbztj(data) {
    return  request({
      url: "/fxyp/ndajlxfmkbztj",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //年度业务分析---年度案件罚没款同比统计
  export function ndajfmktbtj(data) {
    return  request({
      url: "/fxyp/ndajfmktbtj",
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
  //案件分析---案件案发数量同比分析
  export function ajfasltbfx(data) {
    return  request({
      url: "/fxyp/ajfasltbfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件分析---案件罚没款比重分析
  export function ajfmkbzfx(data) {
    return  request({
      url: "/fxyp/ajfmkbzfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件当事人特征分析  法人
  export function ajdsrtzfx(data) {
    return  request({
      url: "/fxyp/ajdsrtzfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案件当事人特征分析  年龄
  export function ajdsrtzfxAge(data) {
    return  request({
      url: "/fxyp/ajdsrtzfxAge",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案发原因分析
  export function getFayyfx(data) {
    return  request({
      url: "/fxyp/fayyfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //案发地点分布
  export function afddfb(data) {
    return  request({
      url: "/fxyp/afddfb",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //人员关联分析  年龄
  export function ryglfx(data) {
    return  request({
      url: "/fxyp/ryglfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //人员关联分析  性别
  export function ryglfxXb(data) {
    return  request({
      url: "/fxyp/ryglfxXb",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //人员关联分析  学历
  export function ryglfxXl(data) {
    return  request({
      url: "/fxyp/ryglfxXl",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //人员关联分析  职称
  export function ryglfxZc(data) {
    return  request({
      url: "/fxyp/ryglfxZc",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  年
  export function sjglfx(data) {
    return  request({
      url: "/fxyp/sjglfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  月
   export function sjglfxmonth(data) {
    return  request({
      url: "/fxyp/sjglfxmonth",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //时间关联分析  日
   export function sjglfxday(data) {
    return  request({
      url: "/fxyp/sjglfxday",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //时间关联分析  时
  export function sjglfxhour(data) {
    return  request({
      url: "/fxyp/sjglfxhour",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  //空间关联分析
  export function kjglfx(data) {
    return  request({
      url: "/fxyp/kjglfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
   //趋势关联分析
   export function qsglfx(data) {
    return  request({
      url: "/fxyp/qsglfx",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  // 电子化办案分析
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
  // 法律法规分析研判
  export function flfgfxyp(data) {
    return  request({
      url: "/fxyp/flfgfxyp",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  // 监管治理分析研判
  export function jgzlfxyp(data) {
    return  request({
      url: "/fxyp/jgzlfxyp",
      method:  "post",
      showloading: false,
      params:data,
      cancelToken:  setCancelSource(),
    });
  }
  
//执法案件   案件类型
export function ajlx(data) {
  return  request({
    url: "/fxyp/ajlx",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//执法案件   案件状态  
export function ajzt(data) {
  return  request({
    url: "/fxyp/ajzt",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}

//执法案件   执法机构案件数量
export function zfjgajsl(data) {
  return  request({
    url: "/fxyp/zfjgajsl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}

//执法案件  罚没款项
export function fmkx(data) {
  return  request({
    url: "/fxyp/fmkx",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//执法案件  涉案本地车辆
export function bdcl(data) {
  return  request({
    url: "/fxyp/bdcl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//执法案件  涉案外地车辆
export function wdcl(data) {
  return  request({
    url: "/fxyp/wdcl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//执法案件  地图
export function map(data) {
  return  request({
    url: "/fxyp/map",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备   执法人员岗位分布
export function gwfb(data) {
  return  request({
    url: "/fxyp/gwfb",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备   执法人员编制分布
export function bzfb(data) {
  return  request({
    url: "/fxyp/bzfb",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备   执法机构人员数量
export function rysl(data) {
  return  request({
    url: "/fxyp/rysl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备   执法人员
export function zfry(data) {
  return  request({
    url: "/fxyp/zfry",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备    执法装备
export function zfzb(data) {
  return  request({
    url: "/fxyp/zfzb",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备    执法机构装备数量
export function zbsl(data) {
  return  request({
    url: "/fxyp/zbsl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备    装备类型
export function zblx(data) {
  return  request({
    url: "/fxyp/zblx",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//人员装备    执法人员增长同比
export function zztb(data) {
  return  request({
    url: "/fxyp/zztb",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//案件统计报表   总案件量
export function zajl(data) {
  return  request({
    url: "/fxyp/zajl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//案件统计报表   总结案量
export function zjal(data) {
  return  request({
    url: "/fxyp/zjal",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}
//案件统计报表   执法门类案件数量
export function zfmlajsl(data) {
  return  request({
    url: "/fxyp/zfmlajsl",
    method:  "post",
    showloading: false,
    params:data,
    cancelToken:  setCancelSource(),
  });
}