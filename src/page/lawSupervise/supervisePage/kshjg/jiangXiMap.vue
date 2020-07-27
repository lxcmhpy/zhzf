<template>
  <div class="jiangXiMap">
    <JkControlsMap
      @handleNodeClick="handleNodeClick"
      @handleChange="handleChange"
      :config="config" />
  </div>
</template>

<script>
import JkControlsMap from "@/components/jk-controlsMap";
import { organTreeByCurrUser } from "@/api/lawSupervise.js";
export default {
  components: {
    JkControlsMap
  },
  data() {
    return {
      config: {
        treeData: {
          title: "搜执法人员、执法机构",
          imgUrl: "/static/images/img/lawSupervise/icon_renyuan.png",
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
    getTree() {
      organTreeByCurrUser().then(res => {
        console.log(res)
      })
    },
    /**
     *
     * 点击节点回调函数
     */
    handleNodeClick(data) {
      console.log(data)
    },

    /**
     *
     * 选中级联选择器节点时触发
     */
    handleChange(value) {
      console.log(value)
    }
  },
  created() {
    this.getTree()
  }
}
</script>

<style lang="scss" scoped>
.jiangXiMap {
  width: 100%;
  height: 100%;
}
</style>
