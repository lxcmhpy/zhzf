import { organTreeByCurrUser, getOrganTree, getZfjgLawSupervise } from "@/api/lawSupervise.js";
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
  }
}
