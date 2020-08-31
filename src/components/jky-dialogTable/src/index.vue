<template>
  <el-dialog
    :width="width"
    class="jky-dialogTable"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed">
    <div slot="title" class="dialog-title">
      <span>{{title}}</span>
      <i class="el-icon-close" @click="onClose" />
    </div>
    <JkyBaseTable
      ref="JkyBaseTable"
      :inputList="inputList"
      :columns="columns"
      :buttons="buttons"
      :height="height"
      :isSelection="isSelection"
      :isRadio="isRadio"
      :isNumber="isNumber"
      :url="url"
      :baseUrlType="baseUrlType"
      :reqAttr="reqAttr"
      :isPagination="isPagination"
      @handleClick="handleClick"
      @handleChange="handleChange" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import JkyBaseTable from '@/components/jky-baseTable';
export default {
  components: {
    JkyBaseTable
  },
  props: {
    width: {
      type: String,
      default: '1000px'
    },
    title: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    reqAttr: {
      type: Object,
      default: {}
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    inputList: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    buttons: {
      type: Object,
      default: null
    },
    height: {
      type: String,
      default: '299'
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    isNumber: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    baseUrlType: {
      type: String,
      default: ''
    }
  },
  watch: {
    dialogVisible: {
      handler(val) {
        console.log(val)
        if(val) {
          if(this.$refs && this.$refs.JkyBaseTable) {
            this.$refs.JkyBaseTable.init()
          }
        }
      }
    }
  },
  methods: {
    /**
     * 点击表格按钮
     */
    handleClick(index, row, name) {
      this.$emit('handleClick', index, row, name)
    },

    /**
     * 点击单选框或者复选框
     */
    handleChange(val) {
      this.$emit('handleChange', val)
    },

    /**
     * 点击确定
     */
    onSubmit() {
      this.$emit('handleSubmit')
    },

    /**
     * 点击取消
     */
    onClose() {
      this.$emit('handleClose')
    },

    /**
     * Dialog 打开的回调
     */
    open() {
      this.$emit('open')
    },

    /**
     * Dialog 打开动画结束时的回调
     */
    opened() {
      this.$emit('opened')
    },

    /**
     * Dialog 关闭的回调
     */
    close() {
      this.$emit('close')
    },

    /**
     * Dialog 关闭动画结束时的回调
     */
    closed() {
      this.$emit('closed')
    },
  }
}
</script>

<style lang="scss">
.jky-dialogTable {
  .el-dialog__header {
    padding: 15px 20px;
    .dialog-title {
      display: flex;
      justify-content: space-between;
      span {
        color: #303133;
      }
      .el-icon-close {
        cursor: pointer;
      }
    }
  }
}
</style>
