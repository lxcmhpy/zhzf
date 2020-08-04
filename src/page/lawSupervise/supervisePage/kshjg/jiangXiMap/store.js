import { organTreeByCurrUser, getOrganTree, getZfjgLawSupervise } from "@/api/lawSupervise.js";
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
        this.config.popoverData.organId = data[0].id
        this.treeData.option = this.addNode(data)
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
          return res.data
        } else {
          throw new Error("getOrganTree()::::::::接口数据错误")
        }
      }).then(data => {
        node.children = data.map(item => {
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
          return res.data
        } else {
          throw new Error("getZfjgLawSupervise()::::::::接口数据错误")
        }
      }).then(data => {
        node.children = data.map(item => {
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
        this.windowData = {
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
        this.windowData.option = data
        this.showComp = "MapWinDow"
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
      this.personData.title = node.nickName
      this.personData.info = {
        organName: node.organName,
        mobile: node.mobile
      }
      this.showComp = "PersonWindow"
    },

    /**
     * 图层下拉项的回调，获取执法人员所有点位
     */
    handleCommand(type) {
      console.log(type)
      let param = {
        organId: this.config.popoverData.organId,
        type: type
      }
      if(type === 0) {
        getZfjgLawSupervise(param).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("getZfjgLawSupervise()::::::::接口数据错误")
          }
        }).then(data => {
          // 添加点位图片
          data.imgUrl = "/static/images/img/lawSupervise/map_renyuan.png"
          this.page.addPoints(data)
        })
      }
    },
  }
}
