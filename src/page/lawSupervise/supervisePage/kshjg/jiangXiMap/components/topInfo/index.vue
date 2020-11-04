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
import { getOrganTree } from "@/api/lawSupervise.js";
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
        if(data.disposePerson){
          data.disposePerson = JSON.parse(data.disposePerson)
        }
        Object.keys(this.$refs.dialog.form).map(key => {
          this.$refs.dialog.form[key] = data[key]
        })
        if(data.disposeOrgan){
          this.getPerson(data.disposeOrgan)
        }
        if(data.eventFileDataUp.length > 0) {
          data.eventFileDataUp.map(item => {
            this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
              item.url = res
              this.$refs.dialog.eventFileDataUp.push(item)
            });
          })
        }
        if(data.eventFileDataDown.length > 0) {
          data.eventFileDataDown.map(item => {
            this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
              item.url = res
              this.$refs.dialog.eventFileDataDown.push(item)
            });
          })
        }
      })
    },
    getPerson(organId){
      let param = {
        organId: organId,
        type: 0
      }
      getOrganTree(param).then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("getOrganTree()::::::接口数据错误")
        }
      }).then(data => {
        this.$refs.dialog.peopleOptions = data.map(item => {
          item.label = item.nickName
          item.value = item.id
          return item
        })
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
