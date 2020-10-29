import { findData, deleteById, findById } from "@/api/eventManage";
import { findUserByOrganId } from "@/api/lawSupervise";

export default {
  methods: {
    /**
     * 获取机构和人员数据
     */
    getTree() {
        this.$store.dispatch("getAllOrgan").then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser()::::::数据错误")
        }
      }).then(data => {
        this.config.treeOptions = data
      })
    },
    getPerson(organId){
        findUserByOrganId(organId).then(res => {
            if(res.code === 200) {
              return res.data
            } else {
              throw new Error("getOrganTree()::::::接口数据错误")
            }
          }).then(data => {
            data.forEach(item => {
                if(item.provincial || item.ministerial || item.maritime){
                    item.label = item.nickName
                    item.value = item.id
                    this.config.peopleOptions.push(item)
                }
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
        this.total = data.total
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
        if(data.disposePerson){
          data.disposePerson = JSON.parse(data.disposePerson)
        }
        // 给详情页赋值
        Object.keys(this.$refs.dialog.form).map(key => {
          this.$refs.dialog.form[key] = data[key]
        })
        if(data.eventCoordinate){
            this.$refs.dialog.hasLatitudeAndLongitude=true
        }else{
            this.$refs.dialog.hasLatitudeAndLongitude=false
        }
        if(data.disposeOrgan){
            this.getPerson(data.disposeOrgan)
        }
        if(data.eventFileDataUp.length > 0) {
          data.eventFileDataUp.map(item => {
            this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                item.url = res
                this.$refs.dialog.eventFileDataUp.push(item)
            });
          })
        }
        if(data.eventFileDataDown.length > 0) {
            data.eventFileDataDown.map(item => {
                this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                    item.url = res
                    this.$refs.dialog.eventFileDataDown.push(item)
                });
            })
        }
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
