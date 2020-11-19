<template>
  <div class="search-window4">
    <header class="search-window4-header">
      {{window4.title}}
      <span class="personGoBack" @click="handlePersonGoBack">返回</span>
    </header>
    <div class="search-window4-info">
      <p v-for="item in list" :key="item.value">
        {{item.title}}: {{item.value}}
      </p>
      <div class="btns">
        <div class="btnsBox" v-for="(item,index) of window4.btnList" :key="index" @click="handleClickBtns(index)">
          <i :class="item.class" :style="(index===0 || index===1)?{color:window4.info.padStateColor} : index===2 ? {color:window4.info.peStateColor} : null" />
        </div>
      </div>
    </div>
    <!-- 轨迹图选择框 -->
    <div class="search-window4-selectTrack" v-if="showTrack">
      <div class="header">
        <span>选择模式</span>
        <i class="el-icon-close" @click="clickTrackWindow"></i>
      </div>
      <div class="track" @click="handleShowTrack(1)">实时轨迹</div>
      <div class="track" @click="handleShowTrack(2)">历史轨迹</div>
      <!-- 实时轨迹输入框 -->
      <div class="window" v-if="showTheTime">
        <el-radio v-model="radio" label="1">当前位置</el-radio>
        <el-radio v-model="radio" label="2">从本时间开始</el-radio>
        <div class="theTimeInput">
          <el-input class="input" v-model="theTime"></el-input>
          <span class="text">分钟前</span>
        </div>
        <div class="submitBtns">
          <el-button type="primary" plain @click="submitTrack(1)">确认</el-button>
          <el-button plain @click="showTheTime=false">取消</el-button>
        </div>
      </div>
      <!-- 历史轨迹输入框 -->
      <div class="window" v-if="showHistory">
        <el-date-picker
          class="selectTime"
          v-model="historyTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        <div class="submitBtns">
          <el-button type="primary" plain @click="submitTrack(2)">确认</el-button>
          <el-button plain @click="showHistory=false">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGpsTraceList } from "@/api/lawSupervise.js"
export default {
  inject: ['page', 'indexPage'],
  props: {
    window4: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showTrack: false,
      showTheTime: false,
      showHistory: false,
      theTime: '',
      historyTime: '',
      radio: ''
    }
  },
  computed: {
    list() {
      return (this.window4 && this.window4.info) || []
    }
  },
  methods: {
    /**
     * 点击轨迹选项
     */
    handleShowTrack(val) {
      console.log(val)
      if(val === 1) {
        this.showHistory = false
        this.showTheTime = true
        this.indexPage.page.removeFeatureById()
      } else if (val === 2) {
        this.showTheTime = false
        this.showHistory = true
        this.indexPage.page.removeFeatureById()
      }
    },

    /**
     * 提交轨迹表单
     */
    submitTrack(val) {
      if(val === 1) { // 实时轨迹表单
        this.showTheTime = false
        let params = {
          deviceId: this.window4.info.padSn,
          deviceType: 0
        }
        let layerName = "ssgj"
        this.getTrackPoints(params, layerName)
      } else if (val === 2) { // 历史轨迹表单
        this.showHistory = false
        let params = {
          startTime: this.historyTime[0],
          endTime: this.historyTime[1]
        }
        let layerName = "lsgj"
        this.getTrackPoints(params, layerName)
      }
    },

    /**
     * 添加轨迹动画
     */
    addTrackAction(points) {
      let data = {
        id: 'trackAction',
        imgUrl: '/static/images/img/lawSupervise/map_renyuan.png'
      }
      this.indexPage.page.addTrackAction(data, points)
    },

    /**
     * 获取轨迹数据
     */
    getTrackPoints(params, layerName) {
      getGpsTraceList(params).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error('getGpsTraceList:::::接口数据错误')
        }
      }).then(data => {
        let points = data.map(item => {
          return [Number(item.x), Number(item.y)]
        })
        this.indexPage.page.addLine(points, this.window4.info.id, layerName)
        this.addTrackAction(points)
      })
    },

    /**
     * 关闭轨迹框
     */
    clickTrackWindow() {
      this.showTrack = false
      this.indexPage.page.removeFeatureById()
    },

    /**
     * 点击返回
     */
    handlePersonGoBack() {
      this.page.showCom = "Window2"
    },

    /**
     * 点击底部小图标
     */
    handleClickBtns(index) {
      if(index === 4) {
        this.showTrack = true
      }
      this.$emit('handleClickBtns', index, this.window4.info)
    }
  },
}
</script>

<style lang="scss">
.search-window4 {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  position: relative;
  &-selectTrack {
    position: absolute;
    width: 130px;
    top: 0;
    left: 380px;
    .header {
      background: #909399;
      height: 46px;
      text-align: center;
      position: relative;
      line-height: 46px;
      span {
        color: #FFFFFF;
        font-size: 14px;
        font-weight: 400;
      }
      .el-icon-close {
        color: #FFFFFF;
        position: absolute;
        line-height: 46px;
        right: 10px;
        cursor: pointer;
      }
    }
    .track {
      background: #DCDFE6;
      height: 46px;
      line-height: 46px;
      color:#606266;
      font-size: 14px;
      font-weight: 400;
      text-align: center;
      cursor: pointer;
    }
    .track:hover {
      background: #409EFF;
      color: #FFFFFF;
    }
    .window {
      position: absolute;
      height: 207px;
      width: 300px;
      border-radius: 4px;
      top: 0;
      left: 133px;
      background: #FFFFFF;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      box-sizing: border-box;
      padding: 40px 10px 20px 10px;
      .selectTime {
        width: 100%;
        .el-range-separator {
          width: 8%;
          height: unset;
        }
        .el-input__inner {
          padding: unset;
        }
      }
      .theTimeInput {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        .input {
          flex: 2;
        }
        .text {
          flex: 1;
          color:#606266;
          font-size: 14px;
          font-weight: 400;
          text-align: center;
        }
      }
      .submitBtns {
        position: absolute;
        width: 100%;
        bottom: 20px;
        text-align: center;
      }
    }
  }
  &-header {
    background: #00adb5;
    height: 46px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    font-family: Helvetica,Arial,sans-serif;
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px 4px 0 0;
    .personGoBack {
      font-size: 13px;
      cursor: pointer;
    }
  }
  &-info {
    box-sizing: border-box;
    padding: 15px;
    color: #7b7b7b;
    font-size: 14px;
    p {
      line-height: 30px;
    }
    .btns {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
      .btnsBox {
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: #EEEEEE;
        border-radius: 50%;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }
}
</style>
