<template>
  <div class="jiangXiMap-search">
    <header class="input-with-select" @click="handleShowSearch">
      <el-input
        v-model="inputModel"
        placeholder="搜执法人员、执法机构">
        <div slot="suffix" class="closeBox" @click="handleClose">
          <i class="el-icon-close"></i>
        </div>
        <el-button slot="append" icon="el-icon-search"></el-button>
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
          @handleNodeClick="handleNodeClick"
          @handlePerson="handlePerson"
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
export default {
  provide() {
    return {
      page: this
    }
  },
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
    Window4
  },
  data() {
    return {
      inputModel: "",
      showCom: "",
    }
  },
  methods: {
    /**
     * 点击头部输入栏触发
     */
    handleShowSearch() {
      this.showCom = "Window1"
      this.$emit('handleShowSearch')
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
  }
}
</script>

<style lang="scss">
.jiangXiMap-search {
  position: absolute;
  top: 20px;
  left: 30px;
  width: 369px;
  box-sizing: border-box;
  .input-with-select {
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
