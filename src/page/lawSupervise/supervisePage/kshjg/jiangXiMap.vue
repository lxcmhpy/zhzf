<template>
  <div class="jiangXiMap">
    <JkControlsMap @handleNodeClick="handleNodeClick" :config="config" />
  </div>
</template>

<script>
import JkControlsMap from "@/components/jk-controlsMap";
export default {
  components: {
    JkControlsMap
  },
  data() {
    return {
      config: {
        treeData: {
          title: "搜执法人员、执法机构",
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
        }
      }
    }
  },
  methods: {
    /**
     *
     * 点击节点回调函数
     */
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.jiangXiMap {
  width: 100%;
  height: 100%;
}
</style>
