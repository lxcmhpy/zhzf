<template>
  <div class="qsfTest">
    <JkyBaseAmap ref="baseAmap" :zoom="8" @handleClickPoint="handleClickPoint" />
    <el-button class="mybuttom" type="primary" @click="test">打点</el-button>
    <el-button class="mybuttomMore" type="primary" @click="testMore">打多个点</el-button>
    <el-button class="mybuttomDelet" type="primary" @click="clean">删除</el-button>
    <el-button class="mybuttomDeletMore" type="primary" @click="cleanMore">删除多个</el-button>
  </div>
</template>

<script>
import JkyBaseAmap from "@/components/jky-baseAMap";
export default {
  components: {
    JkyBaseAmap
  },
  methods: {
    /**
     * 打单个点
     */
    test() {
      let data = {
        title: "qsf",
        position: [108.964171,34.218269],
        icon: '/static/images/img/lawSupervise/map_renyuan.png'
      }
      this.$refs.baseAmap.addPoint(data)
    },

    /**
     * 打多个点
     */
    testMore() {
      let options = [
        {
          title: "111",
          position: [108.964246,34.214219],
          icon: '/static/images/img/lawSupervise/map_renyuan.png'
        },
        {
          title: "111",
          position: [108.964246,34.222647],
          icon: '/static/images/img/lawSupervise/map_renyuan.png'
        },
        {
          title: "111",
          position: [108.977571,34.214059],
          icon: '/static/images/img/lawSupervise/map_renyuan.png'
        },
        {
          title: "444",
          position: [108.970855,34.20925],
          icon: '/static/images/img/lawSupervise/map_renyuan.png'
        },
        {
          title: "555",
          position: [108.964109,34.214147],
          icon: '/static/images/img/lawSupervise/map_renyuan.png'
        },
      ]
      this.$refs.baseAmap.addPoints(options)
    },

    /**
     * 点击点位触发
     */
    handleClickPoint(data) {
      let content = "aaaaa"
      // 打开信息窗体
      this.$refs.baseAmap.addOverlay(data, content)
      console.log(data)
    },

    /**
     * 删除单个点位
     */
    clean() {
      this.$refs.baseAmap.cleanPoint()
    },

    /**
     * 删除多个点位
     */
    cleanMore() {
      this.$refs.baseAmap.cleanPoints()
    }
  },
}
</script>

<style lang="scss">
.qsfTest {
  width: 100%;
  height: 100%;
  position: relative;
  .mybuttom {
    position: absolute;
    top: 0;
    left: 0;
  }
  .mybuttomMore {
    position: absolute;
    top: 0;
    left: 100px;
  }
  .mybuttomDelet {
    position: absolute;
    left: 0;
    top: 100px;
  }
  .mybuttomDeletMore {
    position: absolute;
    left: 100px;
    top: 100px;
  }
}
</style>
