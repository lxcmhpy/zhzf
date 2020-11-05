<template>
  <div class="search-window2">
    <el-tree
      :data="option"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :render-content="renderSlot"
    >
    </el-tree>
    <!-- 详情弹窗 -->
    <Dialog ref="dialog" />
    <!-- 指派弹窗 -->
    <DialogAssigned :config="config" ref="dialogAssigned" @handleOpen="handleOpen" @successDialogAssigned="successDialogAssigned" />
  </div>
</template>

<script>
import { findData, findById } from "@/api/eventManage";
import { getOrganTree, findUserByOrganId } from "@/api/lawSupervise.js";
import Dialog from "../topInfo/dialog.vue";
import DialogAssigned from "../../../../eventManage/src/dialogAssigned.vue";
export default {
  components: {
    Dialog,
    DialogAssigned
  },
  inject: ['page'],
  props: {
    window2: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      list: [],
      config: {
        treeOptions: [],
        peopleOptions: []
      },
    }
  },
  computed: {
    option() {
      return this.window2.option
    },
    defaultProps() {
      return this.window2.defaultProps
    },
  },
  methods: {
    /**
     * 自定义子节点图标
     */
    renderSlot(h,{ node, data, store }) {
      return (
        <div class="tree-slot-box">
          <div class="slot-left">
            <img
              class="itemImg"
              src={
                data.label === '执法人员' ?
                  '/static/images/img/lawSupervise/icon_jc11.png'
                  : data.label === '执法车辆' ?
                  '/static/images/img/lawSupervise/icon_cl11.png'
                  : data.label === '执法船舶' ?
                  '/static/images/img/lawSupervise/icon_cb11.png'
                  : '/static/images/img/lawSupervise/icon_jc1.png'
              }
            />
            <span class="itemLabel">{data.label}</span>
          </div>
          {
            this.window2.topicType === '事件' ?
              <span class="slot-right">
                <el-button size="mini" type="text" on-click={ () => this.handleDetails(data) }>详情</el-button>
                <el-button size="mini" type="text" on-click={ () => this.removeAssign(data) }>指派</el-button>
              </span> : null
          }
        </div>
      )
    },

    /**
     * 点击详情，弹出详情框
     */
    handleDetails(data) {
      // 打开弹窗
      this.$refs.dialog.dialogFormVisible = true
      // 获取详情数据
      this.getDetails(data.id)
    },

    /**
     * 获取详情信息
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

    /**
     * 指派成功时的回调
     */
    successDialogAssigned() {
      this.page.getDataSJ()
    },

    /**
     * 打开指派弹窗时的回调
     */
    handleOpen() {
      this.$store.dispatch("getAllOrgan").then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser()::::::数据错误")
        }
      }).then(data => {
        this.config.treeOptions = data
      })
    },

    /**
     * 点击指派
     */
    removeAssign(data) {
      // 打开指派弹窗
      this.$refs.dialogAssigned.dialogAssignedVisible = true
      this.$refs.dialogAssigned.form.state = data.state
      this.$refs.dialogAssigned.form.id = data.id
      if(data.disposeOrgan){
        findUserByOrganId(data.disposeOrgan).then(res => {
          if(res.code === 200) {
            return res.data
          } else {
            throw new Error("getOrganTree()::::::接口数据错误")
          }
        }).then(data => {
          data.forEach(item => {
            if(item.provincial || item.ministerial || item.maritime){
              item.label = item.nickName
              item.value = item.id
              this.config.peopleOptions.push(item)
            }
          })
        })
        this.$refs.dialogAssigned.form.disposeOrgan = data.disposeOrgan
        if(data.disposePerson){
          this.$refs.dialogAssigned.form.disposePerson = JSON.parse(data.disposePerson)
        }
      }
    },

    /**
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },
  }
}
</script>

<style lang="scss">
.search-window2 {
  height: 402px;
  overflow: auto;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 15px;
  .el-tree {
    border-radius: 4px;
    .tree-slot-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .slot-left {
        .itemImg {
          width: 13px;
          margin-right: 5px;
        }
        .itemLabel {
          font-size: 12px;
          color: #606266;
          font-family: Helvetica,Arial,sans-serif;
        }
      }
      .slot-right {
        margin-right: 12px;
      }
    }
  }
}
</style>
