import { organTreeByCurrUser, getOrganTree, getZfjgLawSupervise } from "@/api/lawSupervise.js";
import { getOrganDetailApi } from "@/api/system.js";
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
  }
}
