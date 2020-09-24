import { organTreeByCurrUser, getOrganTree, getZfjgLawSupervise, queryAlarmVehiclePage, findImageByCaseId,getPeVideoUrl } from "@/api/lawSupervise.js";
import { getOrganDetailApi } from "@/api/system.js";
import { findData } from "@/api/eventManage";
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
        this.organId = data[0].id
        this.searchWindowData.window2.option = data
      })
    },

    /**
     * 获取执法人员的下级数据
     */
    getPeopleTree(node) {
      let param = {
        organId: node.id,
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
        }
      }).then(data => {
        node.children = data.map(item => {
          item.type = node.type
          item.label = item.nickName
          item.parentLabel = node.label
          // 根据该点状态判断小图标颜色，peState为摄像头状态，padState为电话和视频状态; 0=离线 1=在线;
          if(item.peState && item.peState===1) {
            item.peStateColor = '#67C23A'
          }
          if (item.padState && item.padState === 1) {
            item.padStateColor = '#409EFF'
          }
          return item
        })
      })
    },

    /**
     * 获取执法车辆的下级数据
     */
    getCarShipTree(node) {
      let param = {
        organId: node.id,
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
        }
      }).then(data => {
        node.children = data.map(item => {
          item.type = node.type
          item.label = item.vehicleNumber || item.shipNumber
          item.parentLabel = node.label
          // 根据该点状态判断小图标颜色，peState为摄像头状态，padState为电话和视频状态; 0=离线 1=在线;
          if(item.peState && item.peState===1) {
            item.peStateColor = '#67C23A'
          }
          if (item.padState && item.padState === 1) {
            item.padStateColor = '#409EFF'
          }
          return item
        })
      })
    },

    /**
     * 获取路政管理局和分局的数据
     */
    getLoad(node) {
      // 获取当前路政局数据
      getOrganDetailApi({ id: node.id }).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("getOrganDetail():::::::接口数据错误")
        }
      }).then(data => {
        if(node.propertyValue) {
          data.propertyValue = node.propertyValue
          data.icon = '/static/images/img/lawSupervise/map_jigou.png'
          this.page.addPoint(data)
        } else {
          this.$message.error('没有坐标数据')
        }
      })
    },

    /**
     * 获取监管机构数据
     */
    getTheOrganTree(poiontData) {
      const param = {
        organId: poiontData.id,
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
      console.log(node)
      // 地图打点
      data.propertyValue = node.propertyValue
      node.icon = "/static/images/img/lawSupervise/icon_jc11.png"
      this.page.addPoint(node)
      // 显示弹出框
      this.searchWindowData.window4.title = node.nickName
      this.searchWindowData.window4.info = [
        { title: "姓名", value: node.nickName },
        { title: "联系方式", value: node.mobile },
        { title: "机构名称", value: node.organName },
      ]
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
        data.forEach(p=>{
            this.$util.com_getZfjgFileStream(p.storageId).then(res=>{
                p.url = res
                this.searchWindowData.window5.imgList.push(p)
            });
        })
      })
    },

    /**
     * 获取告警车辆数据
     */
    getCarData() {
      queryAlarmVehiclePage({current: 1}).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("queryAlarmVehiclePage::::::接口数据错误")
        }
      }).then(data => {
        this.drawerData.carData = data
      })
    },

    /**
     * 点击单个复选框
     */
    handleItemCheck({val, name}) {
      let typeMap = new Map([
        ['执法人员', 0],
        ['执法机构', 1],
        ['执法车辆', 2],
        ['执法船舶', 3],
        ['事件地点', 5],
        ['非现场站点', 4],
      ])
      let param = {}, type = typeMap.get(name)
      if (type === 5) {
        if(val) {
          findData({current: 1, size: 2000000}).then(res => {
            if(res.code === 200) {
              return res.data.records
            } else {
              throw new Error("findData()::::::接口数据错误")
            }
          }).then(data => {
            data.map(item => {
              item.type = 5
              item.propertyValue = item.eventCoordinate || []
              item.icon = this.imgUrl.get(type)
            })
            // 调用地图打点方法
            this.page.addPoints(data)
          })
        } else { // 当取消勾选时，清除对应图层点位
          this.page.cleanPoints(this.imgUrl.get(type))
        }
      } else {
        if(type === 4) {
          // 显示抽屉组件
          this.isShowDrawer = true
          param = {
            size: 10000,
            type: type
          }
          // 当单选框被勾选时
          if(val) {
            // 获取告警车辆数据以备用
            this.getCarData()
          }
        } else {
          param = {
            organId: this.organId,
            type: type
          }
        }
        // 当单选框被勾选时,获取图层数据
        if(val) {
          getZfjgLawSupervise(param).then(res => {
            if(res.code === 200) {
              this.$message({
                message: '查询到'+res.data.length+'条数据',
                type: 'success'
              });
              return res.data
            } else {
              this.$message.error('getZfjgLawSupervise()::::::::接口数据错误');
            }
          }).then(data => {
            // 手动给非现场站点添加type
            if(type === 4) {
              data.map(item => {
                item.type = type
                item.icon = this.imgUrl.get(type)
              })
              // 给抽屉弹窗里塞入数据
              this.drawerData.noEnforceData.option = data
            }
            // 调用地图打点方法
            this.page.addPoints(data)
          })
        } else { // 当取消勾选时，清除对应图层点位
          this.page.cleanPoints(this.imgUrl.get(type))
        }
      }
    },

    /**
     * 获取全部复选框点位数据
     */
    getAllPoints(val) {
      if(val) {
        let typeMap = [
          { name: '执法人员', type: 0 },
          { name: '执法机构', type: 1 },
          { name: '执法车辆', type: 2 },
          { name: '执法船舶', type: 3 },
          { name: '非现场站点', type: 4 },
          { name: '事件地点', type: 5 },
        ]
        let allPromise = typeMap.map(item => {
          if(item.type === 5) {
            return findData({current: 1, size: 2000000})
          } else {
            let param = {
              organId: this.organId,
              type: item.type
            }
            return getZfjgLawSupervise(param)
          }
        })

        // 显示抽屉组件
        this.isShowDrawer = true
        // 获取告警车辆数据以备用
        this.getCarData()

        Promise.all(allPromise).then(res => {
          console.log(res)
          res.map((item,index) => {
            if(index === 4) {
              // 手动给非现场站点添加type
              item.data.map(item => {
                item.type = 4
              })
              // 给抽屉弹窗里塞入数据
              this.drawerData.noEnforceData.option = item.data
            } else if (index === 5) {
              // 获取到点位信息
              let arr = item.data.records
              // 给点位数据添加 propertyValue 属性和 icon
              arr.map(arrItem => {
                arrItem.type = 5
                arrItem.propertyValue = arrItem.eventCoordinate
                arrItem.icon = this.imgUrl.get(typeMap[index].type)
              })
              // 调用地图打点方法
              this.page.addPoints(arr)
            } else {
              item.data.map(point => {
                point.icon = this.imgUrl.get(typeMap[index].type)
              })
              // 调用地图打点方法
              this.page.addPoints(item.data)
            }
          })
        })
      } else {
        this.page.cleanAll()
      }
    },
    async clickPeVideo(id){
        let res = await getPeVideoUrl(id);
        var test = window.location.href;
        var string = test.split("/");
        var path = string[0] + "//" + string[2] + "/";
        var ActivexURL = path + "/static/js/PeVideoInfo.html?videoUrl=" + res.data
        window.location.href ="alert:"+ActivexURL
    },
  }
}
