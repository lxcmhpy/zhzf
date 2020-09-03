<template>
  <!-- 关联排班 -->
  <el-dialog
    title="关联排班"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="32%"
    class="relation-scheduling-dialog"
  >
    <div class="scheduling-list-panel">
      <el-radio-group v-model="relationData" class="scheduling-group">
        <el-radio :label="1" class="scheduling-radio-item">
          <span class="radio-item-index">第一组</span>
          <p class="radio-cnt">
            <span class="item-label">执法班次</span>
            <span class="item-text">2010-09-12 09:00:00 至 2010-09-13 10:13:20</span>
          </p>
          <p class="radio-cnt">
            <span class="item-label">执法人员</span>
            <span class="item-text">李喵喵； 张三</span>
          </p>
          <p class="radio-cnt">
            <span class="item-label">巡查路线</span>
            <span class="item-text">请输入行驶证上车辆识别代号，字母请大些</span>
          </p>
        </el-radio>
      </el-radio-group>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submit">关 联</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      visible: false,
      relationData: "",
    };
  },
  computed: {},
  created() {},
  methods: {
    // 关联
    submit() {},
    showModal(type, data) {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.relation-scheduling-dialog {
  .scheduling-group {
    width: 100%;
    .scheduling-radio-item {
      display: block;
      margin: 0 0 20px;
      line-height: 30px;
      padding: 15px 20px;
      background: #e7efff;
      >>> .el-radio__input {
        line-height: 30px;
        .el-radio__inner {
          width: 16px;
          height: 16px;
        }
      }
      .radio-item-index {
        font-size: 16px;
        font-weight: 600;
        color: #20232b;
      }
      .radio-cnt {
        color: #20232b;
        .item-label {
          color: #7b7b7b;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
