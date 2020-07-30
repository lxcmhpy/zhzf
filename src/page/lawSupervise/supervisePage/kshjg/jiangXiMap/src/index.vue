<template>
  <div class="jiangXiMap">
    <JkControlsMap
      @init="init"
      @handleChange="handleChange"
      @handleSearch="handleSearch"
      :config="config"
      :center="center"
    />
    <keep-alive>
      <component
        :is="showComp"
        :class="showComp==='JkMapTree'?'jiangXiMap-tree':null"
        :config="showComp==='JkMapTree'?treeData:windowData"
        @handleNodeClick="handleNodeClick"
        @handleButton="handleButton"
        @handleClose="handleClose"
      />
    </keep-alive>
    <!-- <JkMapTree
      class="jiangXiMap-tree"
      :config="treeData"
      @handleNodeClick="handleNodeClick"
      @handleButton="handleButton"
    />
    <MapWinDow v-if="showWindow" @handleClose="handleClose" :config="windowData" /> -->
  </div>
</template>

<script>
import JkControlsMap from "@/components/jk-controlsMap";
import JkMapTree from "@/components/jk-mapTree"
import MapWinDow from "./mapWindow.vue";
import { organTreeByCurrUser } from "@/api/lawSupervise.js";
export default {
  components: {
    JkControlsMap,
    JkMapTree,
    MapWinDow
  },
  data() {
    return {
      showComp: "",
      page: null, // 地图组件的 this
      map: null,
      zoom: 8,
      center: [12118909.300259633, 4086043.1061670054],
      windowData: {},
      treeData: {
        buttons: [
          { name: "路线树查询" },
          { name: "条件查询" },
        ],
        option: [
          {
            label: '固原综合执法支队',
            children: [{
              label: '执法人员',
            },{
              label: '执法车辆',
            },{
              label: '执法船舶',
            },{
              label: '德隆综合执法大队',
              children: [{
                label: '执法人员',
              },{
                label: '执法车辆',
              },{
                label: '执法船舶',
              },]
            }]
          },
        ],
      },
      config: {
        searchData: {
          title: "专题查询",
          placeholder: "搜执法人员、执法机构",
          option: [
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
            { name: "执法部门", imgUrl: "http://111.75.227.156:18904/static/images/experience/basedata/zfbm.png"},
          ]
        },
        popoverData: {
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            },
            {
              title: "图层",
              imgUrl: "/static/images/img/lawSupervise/icon_changjing.png",
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            },
            {
              title: "全屏",
              imgUrl: "/static/images/img/lawSupervise/qp.png",
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
                  value: 'quanguo',
                  label: '全国',
                }
              ]
            }
          ]
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
        this.treeData.option = data
      })
    },

    /**
     * 点击当前专题图片，下钻到树形结构窗口
     */
    handleSearch(data) {
      this.showComp = "JkMapTree"
      console.log(data)
    },

    /**
     * 点击节点回调函数，调用打点函数
     */
    handleNodeClick(data) {
      if(data.propertyValue) {
        let latLng = data.propertyValue.split(',')
        // 调用地图组件中打点函数
        this.page.addPoint(data, latLng)
      } else {
        throw new Error("handleNodeClick(data) in jiangXiMap.vue:::::::::没有坐标")
      }
    },

    /**
     * 点击地图点位触发
     */
    handleClickPoint(data) {
      this.windowData = {
        title: data.label,
        info: {},
      }
      console.log(data)
    },

    /**
     * 关闭弹窗
     */
    handleClose() {

    },

    /**
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      console.log(value)
    },

    /**
     * 点击查询按钮触发
     */
    handleButton(data) {
      console.log(data)
    }
  },
  created() {
    // this.getTree()
  }
}
</script>

<style lang="scss">
.jiangXiMap {
  &-tree {
    position: absolute;
    top: 63px;
    left: 30px;
  }
}
</style>

<style lang="scss" scoped>
.jiangXiMap {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
