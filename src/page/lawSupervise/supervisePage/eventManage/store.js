import { findData, deleteById, findById } from "@/api/eventManage";
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
     * 查看详情
     */
    getDetails(id) {
      findById(id).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findById()::::::::接口数据错误")
        }
      }).then(data => {
        this.$nextTick(() => {
          this.$refs.dialog.setValue(data.disposeOrganName)
        })
        // 给详情页赋值
        Object.keys(this.$refs.dialog.form).map(key => {
          this.$refs.dialog.form[key] = data[key]
        })
        data.eventFileDataUp.map(item => {
          this.$refs.dialog.eventFileDataUp.push({
            url: 'http://124.192.215.10:9332/'+item.storageId,
            storageId: item.storageId,
            name: item.name
          })
        })
        data.eventFileDataDown.map(item => {
          this.$refs.dialog.eventFileDataDown.push({
            url: 'http://124.192.215.10:9332/'+item.storageId,
            storageId: item.storageId,
            name: item.name
          })
        })
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
    },
  }
}
