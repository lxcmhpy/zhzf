<template>
  <div class="jiangXiMap-topInfo">
    <el-carousel trigger="click" height="28px" :autoplay="false">
      <el-carousel-item v-for="(item,index) in list" :key="index">
        <p @click="handleDialog(item.id)">
          <span>时间：{{ item.eventDate }}</span>
          <span>事件名称：{{ item.eventName }}</span>
        </p>
      </el-carousel-item>
    </el-carousel>
    <Dialog ref="dialog" />
  </div>
</template>

<script>
import Dialog from "./dialog.vue";
import { findData, findById } from "@/api/eventManage";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    /**
     * 点击消息框，弹出详情
     */
    handleDialog(id) {
      event.stopPropagation()
      console.log('askdnklansdjanskj')
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 获取详情数据
      this.getDetails(id)
    },

    /**
     * 获取顶部最新数据
     */
    getData() {
      let params = { current:1, size:10000,isemphasis:1 }
      findData(params).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findData()::::::接口数据错误")
        }
      }).then(data => {
        this.list = data.records
      })
    },

    /**
     * 查看详情
     */
    getDetails(id) {
      findById(id).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("findById()::::::::接口数据错误")
        }
      }).then(data => {
        // 给详情页赋值
        Object.keys(this.$refs.dialog.form).map(key => {
          this.$refs.dialog.form[key] = data[key]
        })
        if(data.eventFileDataUp.length > 0) {
          data.eventFileDataUp.map(item => {
            this.$refs.dialog.eventFileDataUp.push({
              url: 'http://124.192.215.10:9332/'+item.storageId,
              storageId: item.storageId,
              name: item.name
            })
          })
        }
        if(data.eventFileDataDown.length > 0) {
          data.eventFileDataDown.map(item => {
            this.$refs.dialog.eventFileDataDown.push({
              url: 'http://124.192.215.10:9332/'+item.storageId,
              storageId: item.storageId,
              name: item.name
            })
          })
        }
      })
    },
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="scss">
.jiangXiMap-topInfo {
  position: absolute;
  width: 100%;
  top: 0;
  background: rgb(249, 218, 172);
  .el-carousel__arrow {
    width: 23px;
    height: 23px;
  }
  .el-carousel__indicators {
    display: none;
  }
  .el-carousel__item {
    p {
      width: 100%;
      height: 100%;
      line-height: 28px;
      color: #303133;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      span {
        margin-left: 10px;
      }
      span:nth-child(1) {
        margin-left: 50px;
      }
    }
  }
}
</style>
