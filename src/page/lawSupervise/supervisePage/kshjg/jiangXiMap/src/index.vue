<template>
  <fullscreen ref="fullscreen" @change="fullscreenChange">
    <div class="jiangXiMap">
      <JkyBaseHMap @init="init" :center="center" :layerUrl="layerUrl" />
      <TopInFo />
      <Search
        ref="Search"
        :config="searchWindowData"
        @handleNodeClick="handleNodeClick"
        @handlePerson="handlePerson"
        @handleClickBtns="handleClickBtns"
      />
      <Select
        ref="Select"
        :config="selectData"
        @handleChange="handleChange"
        @handleItemCheck="handleItemCheck"
        @handleCheckAllChange="handleCheckAllChange"
        @handleFullScreen="handleFullScreen"
      />
      <Drawer v-if="isShowDrawer" :config="drawerData" @handleEcforce="handleEcforce" />
      <EventDialogList ref="EventDialogList" :personId="personId" :organId="organId" />
    </div>
  </fullscreen>
</template>

<script>
import { mapGetters } from "vuex";
import JkyBaseHMap from "@/components/jky-baseHMap";
import Search from "../components/search/index.vue";
import Select from "../components/select/index.vue";
import Drawer from "../components/drawer/index.vue";
import TopInFo from "../components/topInfo/index.vue";
import EventDialogList from "../components/dialog/eventDialogList.vue";
import store from "../store.js";
import iLocalStroage from '@/common/js/localStroage';
export default {
  mixins: [store],
  provide() {
    return {
      indexPage: this
    }
  },
  components: {
    JkyBaseHMap,
    Search,
    Select,
    Drawer,
    TopInFo,
    EventDialogList
  },
  watch: {
    makePhoneStatus (val, oldVal) {
      this.videoDoing = null;
    },

  },
  computed: {
    ...mapGetters(["makePhoneStatus", "doing"])
  },
  data() {
    return {
      personId: '', // 人员 id
      organId: '', // 机构 id
      layerUrl: '',
      organId: "", // 根节点的 ID
      isShowDrawer: false, // 是否显示抽屉组件
      imgUrl: new Map([
        [0, '/static/images/img/lawSupervise/map_renyuan.png'],
        [1, '/static/images/img/lawSupervise/map_jigou.png'],
        [2, '/static/images/img/lawSupervise/map_jingche.png'],
        [3, '/static/images/img/lawSupervise/map_cbo.png'],
        [4, '/static/images/img/lawSupervise/map_o_gud.png'],
        [5, '/static/images/img/lawSupervise/map_didian.png']
      ]), // 各类型所对应的点位图标
      c: null, // 地图组件的 this
      map: null,
      center: [115.871344, 28.710709],
      searchWindowData: {
        window1: {
          title: "专题查询",
          list: [
            { name: "执法机构", imgUrl: "/static/images/img/lawSupervise/zfbm.png"},
            { name: "执法人员", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
            { name: "事件", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
            { name: "非现场站点", imgUrl: "/static/images/img/lawSupervise/ysgljg.png"},
          ]
        },
        window2: {
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          option: [],
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
              {name: '事件地点', type: 5},
              {name: '非现场站点', type: 4},
              {name: '交通管制', type: 6},
              {name: '道路施工', type: 6},
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
      },
      fullscreen: false
    }
  },
  methods: {
    handleFullScreen () {
      this.$refs['fullscreen'].toggle() // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },

    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
    },

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
     * 1.如果当前节点是执法人员、执法车辆、执法船舶，则发送请求获取子节点数据
     * 2.当前节点没有子节点时打点
     * 3.当前节点有子节点时获取当前节点信息并打点
     */
    handleNodeClick(data) {
      console.log(data)
      // 清空右侧复选框
      this.$refs.Select.checkedCities = []
      // 删除轨迹图
      this.page.removeFeatureById()

      if(data.label === "执法人员") {
        this.getPeopleTree(data)
      } else if (data.label === "执法车辆" || data.label === "执法船舶") { // 当前节点执法人员、执法车辆、执法船舶
        this.getCarShipTree(data)
        // 当前节点没有子节点时
      } else if (!data.hasOwnProperty('children') || data.children.length === 0) {
        if(data.propertyValue) {
          let latLng = data.propertyValue.split(',')
          data.imgUrl = this.imgUrl.get(data.type)
          // 手动给点位添加图层标识属性
          data.layerName = data.label
          this.page.addPoint(data, latLng)
          this.handleOverLay(data)
        } else {
          this.$message.error('没有坐标数据')
        }
      } else { // 机构节点
        this.getLoad(data)
      }
      // else if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
      //   this.getLoad(data)
      // } else {
      //   // 添加点位图标
      //   data.imgUrl = this.imgUrl.get(data.type)
      //   // 显示弹出框
      //   this.searchWindowData.window4.title = data.label
      //   this.searchWindowData.window4.info = {
      //     organName: data.organName || '',
      //     mobile: data.mobile || '',
      //     padStateColor: data.padStateColor || '',
      //     peStateColor: data.peStateColor || ''
      //   }
      //   this.$refs.Search.showCom = "Window4"
      //   // 如果有点位，则打点，否则抛出异常
      //   if(data.propertyValue) {
      //     let latLng = data.propertyValue.split(',')
      //     // 手动给点位添加图层标识属性（希望后期能由后端添加）
      //     data.layerName = data.label
      //     this.page.addPoint(data, latLng)
      //   } else {
      //     throw new Error("handleNodeClick(data):::::::::没有坐标")
      //   }
      // }
    },

    /**
     * 显示信息窗体
     */
    handleOverLay(data) {
      let content = data.vehicleNumber || data.label || data.name || data.shipNumber || data.nickName || data.eventName
      this.page.addOverlay(data, content)
    },

    /**
     * 点击地图点位触发
     */
    handleClickPoint(data) {
      console.log(data)
      // 显示信息窗体
      this.handleOverLay(data)
      // 如果点位属于执法人员，执法车辆或者执法人员
      if(data.type === 0) {
        this.personId = data.id
        this.organId = data.organId
        // 显示弹出框
        this.searchWindowData.window4.title = data.nickName
        this.searchWindowData.window4.info = [
          { title: "姓名", value: data.nickName },
          { title: "联系方式", value: data.mobile },
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.info.peStateColor = data.peStateColor || ''
        this.searchWindowData.window4.info.padStateColor = data.padStateColor || ''
        this.searchWindowData.window4.info.sn = data.sn || ''
        this.searchWindowData.window4.info.padSn = data.padSn || ''
        this.searchWindowData.window4.info.id = data.id
        this.searchWindowData.window4.btnList= [
            { class: 'el-icon-phone' },
            { class: 'iconfont law-shipin' },
            { class: 'iconfont law-jiankong' },
            { class: 'iconfont law-msg-box' },
            { class: 'iconfont law-xianlu' },
            { class: 'el-icon-circle-plus' }
        ]
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 2) {
        this.searchWindowData.window4.title = data.vehicleNumber
        this.searchWindowData.window4.info = [
          { title: "车牌号", value: data.vehicleNumber },
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 3) {
        this.searchWindowData.window4.title = data.shipNumber
        this.searchWindowData.window4.info = [
          { title: "机构名称", value: data.organName },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 5) {
        this.searchWindowData.window4.title = data.eventName
        this.searchWindowData.window4.info = [
          { title: "事件名称", value: data.eventName },
          { title: "时间", value: data.eventDate },
          { title: "地点", value: data.eventAddress },
        ]
        this.searchWindowData.window4.btnList= []
        this.$refs.Search.showCom = "Window4"
      } else if (data.type === 4) { // 如果是非现场站点
        this.$refs.Search.showCom = "Window5"
        this.getWindow5(data)
      } else {
        this.searchWindowData.window3.title = data.name
        this.searchWindowData.window3.info = {
          address: data.address || '',
          contactor: data.contactor || '',
          telephone: data.telephone || ''
        }
        this.getTheOrganTree(data)
      }
      // 当前点位是路政局
      // if(data.id === "03b7c79d442eb0d66b364a6242adb7f5" || data.id === "d56d4294b546fc7fe94ec56b0ce45a6a") {
      //   this.searchWindowData.window3.title = data.name
      //   this.searchWindowData.window3.info = {
      //     address: data.address || '',
      //     contactor: data.contactor || '',
      //     telephone: data.telephone || ''
      //   }
      //   this.getTheOrganTree(data)
      // } else if (data.type === 4) {
      //   this.$refs.Search.showCom = "Window5"
      //   this.getWindow5(data)
      // } else {
      //   // 显示弹出框
      //   this.searchWindowData.window4.title = data.vehicleNumber || data.label || data.shipNumber || data.nickName
      //   this.searchWindowData.window4.info = data
      //   this.$refs.Search.showCom = "Window4"
      // }
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
      this.handleOverLay(data)
    },

    /**
     * 点击全选, 获取全部点位数据并打点
     */
    handleCheckAllChange(val) {
      this.getAllPoints(val)
    },

    /**
     * 点击 window4 底部小图标
     */
    handleClickBtns(index, data) {
      if(index === 0) {
        // 如果状态为在线（图标颜色为蓝色），则打开语音通话窗口
        if(data.padStateColor) {
          this.$store.commit('setDoing', '1');
          this.$store.commit('setMakePhoneStatus', !this.makePhoneStatus);
          window.PhoneCallModule.sipAudioCall(data.padSn,"test");
        }
      } else if (index === 1) {
        // 如果状态为在线（图标颜色为蓝色），则打开视频通话窗口
        if(data.padStateColor) {
          this.$store.commit('setDoing', '2');
          this.$store.commit('setMakePhoneStatus', !this.makePhoneStatus);
          window.PhoneCallModule.sipVideoCall(data.padSn,"test");
        }
      } else if (index === 2) {
        // 如果状态为在线（图标颜色为绿色），则打开视频窗口
        if(data.peStateColor) {
          this.clickPeVideo(data.sn)
        }
      } else if (index === 5) {
        // 不管状态如何，打开事件列表选择事件就是
        this.$refs.EventDialogList.dialogVisible = true
        console.log('打开事件列表')
      }
    },

  },
  activated() {
    this.getTree()
  },
  mounted(){
      this.layerUrl = iLocalStroage.gets('CURRENT_BASE_URL').MAP_HOST+'/{z}/{y}/{x}';
      this.organId = iLocalStroage.gets("userInfo").organId;
      this.$nextTick(() => {
          this.initWxPhone(iLocalStroage.gets("userInfo").id)
      })
  }
}
</script>

<style lang="scss">
.jiangXiMap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
