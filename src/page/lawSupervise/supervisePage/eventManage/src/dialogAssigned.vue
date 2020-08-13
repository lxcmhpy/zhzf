<template>
  <el-dialog class="eventManage-dialogAssigned" title="选择指派人员" :visible.sync="dialogAssignedVisible">
    <el-form :model="form">
      <el-form-item label="机构">
        <el-select v-model="form.region" placeholder="请选择机构">
          <el-option label="本级机构" value="benji"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="avatarsItem">
          <div
            class="avatars"
            v-for="tag in tags"
            :key="tag.name">
            <span>{{tag.name}}</span>
            <i @click="handleCloseAvatar(tag)" class="el-icon-error"></i>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogAssignedVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogAssignedVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogAssignedVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tags: [
        { name: '标签一' },
        { name: '标签二' },
        { name: '标签三' },
        { name: '标签四' },
        { name: '标签五' }
      ]
    }
  },
  methods: {
    /**
     * 关闭头像
     */
    handleCloseAvatar(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
.eventManage-dialogAssigned {
  overflow: hidden;
  .avatarsItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .avatars {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #409EFF;
      margin-right: 20px;
      position: relative;
      text-align: center;
      span {
        line-height: 50px;
        color: #FFFFFF;
        font-size: 14px;
      }
      .el-icon-error {
        position: absolute;
        top: -3px;
        right: -7px;
        cursor: pointer;
      }
    }
  }
}
</style>
