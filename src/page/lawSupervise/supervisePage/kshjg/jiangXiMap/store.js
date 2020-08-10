import { organTreeByCurrUser, getOrganTree, getZfjgLawSupervise, queryAlarmVehiclePage, findImageByCaseId } from "@/api/lawSupervise.js";
import { getOrganDetailApi, getOrganIdApi } from "@/api/system.js";
export default {
  methods: {
    /**
     * 获取数据
     */
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser() in jiangXiMap.vue::::::数据错误")
        }
      }).then(data => {
        this.selectData.organId = data[0].id
        this.searchWindowData.window2.option = this.addNode(data)
      })
    },

    /**
     * 获取执法人员的下级数据
     */
    getPeopleTree(node) {
      let param = {
        organId: node.pid,
        type: node.type
      }
      getOrganTree(param).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '查询到'+res.data.length+'条数据',
            type: 'success'
          });
          return res.data
        } else {
          this.$message.error('getOrganTree()::::::::接口数据错误');
          throw new Error("getOrganTree()::::::::接口数据错误")
        }
      }).then(data => {
        node.children = data.map(item => {
          item.type = node.type
          item.label = item.nickName
          item.parentLabel = node.label
          return item
        })
      })
    },

    /**
     * 获取执法车辆的下级数据
     */
    getCarShipTree(node) {
      let param = {
        organId: node.pid,
        type: node.type
      }
      getZfjgLawSupervise(param).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '查询到'+res.data.length+'条数据',
            type: 'success'
          });
          return res.data
        } else {
          this.$message.error('getZfjgLawSupervise()::::::::接口数据错误');
          throw new Error("getZfjgLawSupervise()::::::::接口数据错误")
        }
      }).then(data => {
        node.children = data.map(item => {
          item.type = node.type
          item.label = item.vehicleNumber || item.shipNumber
          item.parentLabel = node.label
          return item
        })
      })
    },

    /**
     * 获取路政管理局和分局的数据
     */
    getLoad(node) {
      // 如果有点位，则打点，否则抛出异常
      if(node.propertyValue) {
        let latLng = node.propertyValue.split(',')
        node.imgUrl = '/static/images/img/lawSupervise/map_jigou.png'
        this.page.addPoint(node, latLng)
      } else {
        throw new Error("handleNodeClick(data):::::::::没有坐标")
      }

      // 获取当前路政局数据
      getOrganDetailApi({ id: node.id }).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("getOrganDetail():::::::接口数据错误")
        }
      }).then(data => {
        this.searchWindowData.window3 = {
          title: node.label,
          info: {
            address: data.address,
            contactor: data.contactor,
            telephone: data.telephone
          },
        }
      })
    },

    /**
     * 获取监管机构数据
     */
    getTheOrganTree(data) {
      const param = {
        organId: data.id,
        type: 0
      }
      getOrganTree(param).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("getOrganTree()::::::接口数据错误")
        }
      }).then(data => {
        this.searchWindowData.window3.list = data
        // 打开弹框
        this.$refs.Search.showCom = "Window3"
      })
    },

    /**
     * 获取人员在线情况
     */
    personClick (node) {
      // 地图打点
      let latLng = (node && node.propertyValue && node.propertyValue.split(',')) || []
      node.imgUrl = "/static/images/img/lawSupervise/icon_jc11.png"
      this.page.addPoint(node, latLng)
      // 显示弹出框
      this.searchWindowData.window4.title = node.nickName
      this.searchWindowData.window4.info = {
        organName: node.organName,
        mobile: node.mobile
      }
      this.$refs.Search.showCom = "Window4"
    },

    /**
     * 获取非现场站点点位数据
     */
    getWindow5(data) {
      this.searchWindowData.window5.info = data
      const params = {
        current: 1,
        size: 5,
        siteName: data.name
      }
      // 获取 Window5 表格数据
      queryAlarmVehiclePage(params).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("queryAlarmVehiclePage:::::接口错误")
        }
      }).then(data => {
        this.searchWindowData.window5.data = data
      })
      // 获取图片数据
      findImageByCaseId(data.id).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findImageByCaseId:::::接口错误")
        }
      }).then(data => {
        this.searchWindowData.window5.imgList = data
      })
    },

    /**
     * 图层下拉项的回调，获取各下拉项的点位数据
     */
    handleCommand(type) {
      let param = {}
      if(type === 4) {
        param = {
          size: 20,
          type: type
        }
      } else {
        param = {
          organId: this.selectData.organId,
          type: type
        }
      }
      getZfjgLawSupervise(param).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '查询到'+res.data.length+'条数据',
            type: 'success'
          });
          return res.data
        } else {
          this.$message.error('getZfjgLawSupervise()::::::::接口数据错误');
          throw new Error("getZfjgLawSupervise()::::::::接口数据错误")
        }
      }).then(data => {
        // 手动给非现场站点添加type
        if(type === 4) {
          data.map(item => {
            item.type = type
          })
        }
        // 添加点位图片
        data.imgUrl = this.imgUrl.get(type)
        this.page.addPoints(data)
      })
    },
  }
}
