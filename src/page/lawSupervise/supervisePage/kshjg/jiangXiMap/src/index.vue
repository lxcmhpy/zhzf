<template>
  <div class="jiangXiMap">
    <JkBaseHMap @init="init" :center="center" />
    <Search
      ref="Search"
      :config="searchWindowData"
      @handleNodeClick="handleNodeClick"
      @handlePerson="handlePerson"
    />
    <Select
      ref="Select"
      :config="selectData"
      @handleChange="handleChange"
      @handleItemCheck="handleItemCheck"
      @handleCheckAllChange="handleCheckAllChange"
    />
    <Drawer v-if="isShowDrawer" :config="drawerData" @handleEcforce="handleEcforce" />
  </div>
</template>

<script>
import JkBaseHMap from "@/components/jk-baseHMap";
import Search from "../components/search/index.vue";
import Select from "../components/select/index.vue";
import Drawer from "../components/drawer/index.vue";
import store from "../store.js";
export default {
  mixins: [store],
  provide() {
    return {
      indexPage: this
    }
  },
  components: {
    JkBaseHMap,
    Search,
    Select,
    Drawer
  },
  data() {
    return {
      organId: "", // 根节点的 ID
      isShowDrawer: false, // 是否显示抽屉组件
      imgUrl: new Map([
        [0, '/static/images/img/lawSupervise/map_renyuan.png'],
        [1, '/static/images/img/lawSupervise/map_jigou.png'],
        [2, '/static/images/img/lawSupervise/map_jingche.png'],
        [3, '/static/images/img/lawSupervise/map_cbo.png'],
        [4, '/static/images/img/lawSupervise/map_o_gud.png'],
      ]), // 各类型所对应的点位图标
      page: null, // 地图组件的 this
      map: null,
      zoom: 8,
      center: [115.871344, 28.710709],
      searchWindowData: {
        window1: {
          title: "专题查询",
          list: [
            { name: "执法机构", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法人员", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/ysgljg.png"},
          ]
        },
        window3: {
          title: "",
          info: {},
          option: []
        },
        window4: {
          title: '',
          info: {}
        },
        window5: {
          imgList: [],
          info: {},
          data: {}
        }
      },
      selectData: {
        option: [
          {
            title: "西安市",
            imgUrl: "/static/images/img/lawSupervise/area.png",
            options: [
              {
                value: 'xian',
                label: '西安市',
                children: [{
                  value: 'yanta',
                  label: '雁塔区',
                  children: [{
                    value: 'gaoxin',
                    label: '高新区',
                  }]
                }]
              },
              {
                value: ' ',
                label: '全国',
              }
            ]
          },
          {
            title: "图层",
            imgUrl: "/static/images/img/lawSupervise/icon_changjing.png",
            options: [
              {name: '执法人员', type: 0},
              {name: '执法机构', type: 1},
              {name: '执法车辆', type: 2},
              {name: '执法船舶', type: 3},
              {name: '非现场站点', type: 4},
            ]
          },
          {
            title: "全屏",
            imgUrl: "/static/images/img/lawSupervise/qp.png",
          }
        ]
      },
      drawerData: {
        // 告警车辆数据
        carData: {},
        // 非现场执法点数据
        noEnforceData: {
          option: []
        }
      }
    }
  },
  methods: {
    /**
     * 地图初始化事件
     */
    init(_map, _this) {
      this.map = _map
      this.page = _this
      _map.on('feature:onselect', event => {
        this.handleClickPoint(event.value.N.data)
      });
    },

    /**
     * 点击节点回调函数
     * 1.如果当前节点是路政局，则获取路政局数据、地图打点
     * 2.如果当前节点是自定义节点，发送请求获取子节点数据
     * 3.如果当前节点没有下级，则地图打点并打开信息窗口
     */
    handleNodeClick(data) {
      console.log(data)
      // 清空右侧复选框
      this.$refs.Select.checkedCities = []

      if(data.label === '执法人员') {
        this.getPeopleTree(data)
      } else if (data.label === '执法车辆' || data.label === '执法船舶') {
        this.getCarShipTree(data)
        // 当前节点为路政管理局和分局
      } else if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
        this.getLoad(data)
      } else {
        // 添加点位图标
        data.imgUrl = this.imgUrl.get(data.type)
        // 显示弹出框
        this.searchWindowData.window4.title = data.label
        this.searchWindowData.window4.info = {
          organName: data.organName || '',
          mobile: data.mobile || ''
        }
        this.$refs.Search.showCom = "Window4"
        // 如果有点位，则打点，否则抛出异常
        if(data.propertyValue) {
          // 打点之前先清除通过 addPoints 打的多个点位
          let pointsPlayer = ['执法人员','执法机构','执法车辆','执法船舶','非现场站点']
          pointsPlayer.map(item => {
            this.page.cleanPoints(item)
          })
          let latLng = data.propertyValue.split(',')
          this.page.addPoint(data, latLng)
        } else {
          throw new Error("handleNodeClick(data):::::::::没有坐标")
        }
      }
    },

    /**
     * 点击地图点位触发
     */
    handleClickPoint(data) {
      // 当前点位是路政局
      if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
        this.getTheOrganTree(data)
      } else if (data.type === 4) {
        this.$refs.Search.showCom = "Window5"
        this.getWindow5(data)
      } else {
        // 显示弹出框
        this.searchWindowData.window4.title = data.nickName
        this.searchWindowData.window4.info = {
          organName: data.organName || '',
          mobile: data.mobile || ''
        }
        this.$refs.Search.showCom = "Window4"
      }
      console.log(data)
    },

    /**
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      console.log(value)
    },

    /**
     * 点击人员在线情况头像
     */
    handlePerson(node) {
      this.personClick(node)
    },

    /**
     * 点击列表，地图打点
     */
    handleEcforce(data) {
      // 添加点位图标
      data.imgUrl = this.imgUrl.get(data.type)

      let latLng = data.propertyValue.split(',')
      this.page.addPoint(data, latLng)
    },

    /**
     * 点击全选, 获取全部点位数据并打点
     */
    handleCheckAllChange(val) {
      this.getAllPoints(val)
    },
  },
  activated() {
    this.getTree()
  }
}
</script>

<style lang="scss" scoped>
.jiangXiMap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
