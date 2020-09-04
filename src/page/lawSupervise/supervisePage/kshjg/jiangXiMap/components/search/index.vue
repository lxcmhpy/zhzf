<template>
  <div class="jiangXiMap-search">
    <header class="input-with-select" @click="handleShowSearch">
      <el-input
        v-model="inputModel"
        :placeholder="placeholder">
        <div slot="suffix" class="closeBox" @click="handleClose">
          <i class="el-icon-close"></i>
        </div>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </header>
    <div class="jiangXiMap-search-mainBox">
      <keep-alive>
        <component
          :is="showCom"
          :window1="config.window1"
          :window2="config.window2"
          :window3="config.window3"
          :window4="config.window4"
          :window5="config.window5"
          @handleNodeClick="handleNodeClick"
          @handlePerson="handlePerson"
          @clickImg="clickImg"
          @handleClickBtns="handleClickBtns"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Window1 from "./window1.vue";
import Window2 from "./window2.vue";
import Window3 from "./window3.vue";
import Window4 from "./window4.vue";
import Window5 from "./window5.vue";
import { organTreeByCurrUser, getOrganTree } from "@/api/lawSupervise.js";
import { findData } from "@/api/eventManage";
export default {
  provide() {
    return {
      page: this
    }
  },
  inject: ['indexPage'],
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Window1,
    Window2,
    Window3,
    Window4,
    Window5
  },
  data() {
    return {
      inputModel: "",
      showCom: "",
      projectName: "",
      placeholder: "",
    }
  },
  methods: {
    /**
     * 单独获取执法人员的数据，为了在执法人员专题下单独显示
     */
    getPeople() {
      let param = {
        organId: this.indexPage.organId,
        type: 0
      }
      getOrganTree(param).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '查询到'+res.data.length+'条数据',
            type: 'success'
          });
          return res.data
        } else {
          this.$message.error('getWindow2People()::::::::接口数据错误');
        }
      }).then(data => {
        this.config.window2.option = data.map(item => {
          item.type = 0
          item.label = item.nickName
          return item
        })
      })
    },

    /**
     * 点击头部输入栏触发
     */
    handleShowSearch() {
      if(this.showCom === "") {
        this.showCom = "Window1"
      }
      this.$emit('handleShowSearch')
    },

    /**
     * 点击搜索按钮，获取数据
     */
    handleSearch() {
      if(this.projectName === "执法人员") {
        let param = {
          key: this.inputModel,
          organId: this.indexPage.organId,
          type: 0
        }
        // 搜索执法人员数据
        getOrganTree(param).then(res => {
          if(res.code === 200) {
            this.$message({
              message: '查询到'+res.data.length+'条数据',
              type: 'success'
            });
            return res.data
          } else {
            this.$message.error('getOrganTree()::::::::接口数据错误');
          }
        }).then(data => {
          this.config.window2.option = data.map(item => {
            item.type = 0
            item.label = item.nickName
            return item
          })
        })
      } else if (this.projectName === "执法机构") {
        let params = {
          key: this.inputModel,
          organId: this.indexPage.organId,
          type: 1
        }
        let _this = this;
        getOrganTree(params).then(res => {
            if(res.code === 200) {
                this.$message({
                    message: '查询到'+res.data.length+'条数据',
                    type: 'success'
                });
                return res.data
            } else {
                this.$message.error('getOrganTree()::::::::接口数据错误');
            }
        }).then(data => {
          this.config.window2.option = data.map(item => {
            item.type = 1
            item.label = item.name
            return item
          })
        })
      }
    },

    /**
     * 点击关闭图标触发
     */
    handleClose() {
      event.stopPropagation()
      this.showCom = ""
      this.inputModel=''
      this.$emit('handleClose')
    },

    /**
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },

    /**
     * 点击人员在线头像
     */
    handlePerson(node) {
      this.$emit("handlePerson", node)
    },

    /**
     * 获取树形数据
     */
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser() in jiangXiMap.vue::::::数据错误")
        }
      }).then(data => {
        this.config.window2.option = data
      })
    },

    /**
     * 点击专题图片，获取树形数据，下钻到树形窗口
     */
    clickImg(name) {
      this.projectName = name
      this.config.window2.option = []
      if(name === "执法机构") {
        this.placeholder = '搜索执法机构'
        this.getTree()
      } else if (name === "执法人员") {
        this.placeholder = '搜索执法人员'
        this.getPeople()
      } else if (name === "事件") {
        this.placeholder = '搜索事件'
        this.getEventData()
      } else if (name === "非现场站点") {
        this.placeholder = '搜索非现场站点'
        this.getPeople()
      }
    },

    getEventData() {
      findData({current: 1, size: 2000000}).then(res => {
            if(res.code === 200) {
              return res.data.records
            } else {
              throw new Error("findData()::::::接口数据错误")
            }
          }).then(data => {
            this.config.window2.option = data.map(item => {
              item.type = 5
              item.label = item.eventName
              item.propertyValue = item.eventCoordinate
            })
          })
    },


    /**
     * 点击底部小图标
     */
    handleClickBtns(index, data) {
      this.$emit('handleClickBtns', index, data)
    }
  }
}
</script>

<style lang="scss">
.jiangXiMap-search {
  position: absolute;
  top: 40px;
  left: 30px;
  width: 369px;
  box-sizing: border-box;
  .input-with-select {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 5px;
    .el-input__inner {
      width: 311px;
      height: 40px;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      .el-button {
        .el-icon-search {
          color: #409EFF;
        }
      }
    }
    .closeBox {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
