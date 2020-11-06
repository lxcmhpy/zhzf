import  request  from  "@/common/js/request";
import { setCancelSource } from "@/common/js/cancelToken";

/**
 * 查询
 */
export function findData (data) {
  return request({
    url: "/zfjg/event/manage/list",
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    params: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 查看详情
 */
export function findById (id) {
  return request({
    url: `/zfjg/event/manage/findById/${id}`,
    method: "get",
    showloading: true,
    loadingType: 'loadPart',
    cancelToken: setCancelSource()
  })
}

/**
 * 指派
 */
export function assigned (data) {
  return request({
    url: "/zfjg/event/manage/zhipai",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 指派多个事件
 */
export function assignedMore (data) {
  return request({
    url: "/zfjg/event/manage/zhipaiduo",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 新增、编辑
 */
export function addUpdate (data) {
  return request({
    url: "/zfjg/event/manage/saveOrUpdate",
    method: "post",
    showloading: false,
    data: data,
    cancelToken: setCancelSource()
  })
}

/**
 * 删除
 */
export function deleteById (data) {
  return request({
    url: "/zfjg/event/manage/deleteById",
    method: "get",
    showloading: false,
    params: data,
    cancelToken: setCancelSource()
  })
}
