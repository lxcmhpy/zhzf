import { findData } from "@/api/eventManage";

export default {
  methods: {
    /**
     * 查询
     * 查询全部: {current:1, size:5}
     * 带条件查询: {endDate:'2020-05-08 10:10:10', startDate:'2020-05-04 10:10:10', eventName:'大', isemphasis:1}
     */
    getData(params) {
      this.tableData = []
      findData(params).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findData()::::::接口数据错误")
        }
      }).then(data => {
        this.total = data.records.length
        this.tableData = data.records
      })
    }
  }
}
