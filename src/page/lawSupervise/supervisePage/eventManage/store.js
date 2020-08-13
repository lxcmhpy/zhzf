import { findData, deleteById, upload } from "@/api/eventManage";
import { organTreeByCurrUser, getOrganTree } from "@/api/lawSupervise.js";

export default {
  methods: {
    /**
     * 获取机构和人员数据
     */
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser()::::::数据错误")
        }
      }).then(data => {
        this.config.treeOptions = data

        /**
         * 单独获取执法人员的数据
         */
        let param = {
          organId: data[0].id,
          type: 0
        }
        getOrganTree(param).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("getOrganTree()::::::接口数据错误")
          }
        }).then(data => {
          this.config.peopleOptions = data.map(item => {
            item.label = item.nickName
            item.value = item.id
            return item
          })
        })
      })
    },

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
    },

    /**
     * 删除
     */
    deleteEvent(params) {
      this.$confirm('您正在进行删除操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteById(params).then(res => {
          if(res.code === 200) {
            this.$message({
              message: res.msg,
              type: "success"
            })
            this.initPage()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}