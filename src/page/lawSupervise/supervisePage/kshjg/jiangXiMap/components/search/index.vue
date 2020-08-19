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
          :window2="window2"
          :window3="config.window3"
          :window4="config.window4"
          :window5="config.window5"
          @handleNodeClick="handleNodeClick"
          @handlePerson="handlePerson"
          @clickImg="clickImg"
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
      window2: {
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        option: []
      },
      placeholder: "",
    }
  },
  methods: {
    /**
     * 给获取到的每个节点的 children 添加 执法人员、执法车辆、执法船舶子节点
     */
    addNode(arr) {
      let myNode = [
        { label: '执法人员', type: 0, children: [] },
        { label: '执法车辆', type: 2, children: [] },
        { label: '执法船舶', type: 3, children: [] },
      ]
      arr.map(item => {
        if(item.hasOwnProperty('children') && item.type!=0 && item.type!=2 && item.type!=3) {
          myNode.map(myNodeItem => {
            // 给自定义节点添加 pid 属性， 值为父节点的 id
            myNodeItem.pid = item.id
          })
          // 在 children 里添加自定义节点
          item.children = myNode.concat(item.children)
          // 递归调用
          this.addNode(item.children)
        }
      })
      return arr
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
        this.window2.option = this.addNode(data)
      })
    },

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
        this.window2.option = data.map(item => {
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
          this.window2.option = data.map(item => {
            item.type = 0
            item.label = item.nickName
            return item
          })
        })
      } else if (this.projectName === "执法机构") {

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
     * 点击专题图片，获取树形数据，下钻到树形窗口
     */
    clickImg(name) {
      this.projectName = name
      this.window2.option = []
      if(name === "执法机构") {
        this.placeholder = '搜索执法机构'
        this.getTree()
      } else if (name === "执法人员") {
        this.placeholder = '搜索执法人员'
        this.getPeople()
      }
    },
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
