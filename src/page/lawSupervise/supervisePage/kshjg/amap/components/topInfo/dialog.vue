<template>
  <el-dialog class="eventManage-dialog" title="事件详情" :visible.sync="dialogFormVisible" top="0" @close="handleCloseDialog">
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="dialogForm" :model="form" :disabled="disabled">
      <el-form-item label="事件名称:" :label-width="formLabelWidth">
        <el-input v-model="form.eventName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件描述:" :label-width="formLabelWidth">
        <el-input v-model="form.eventDescribe" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件时间:" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.eventDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件坐标:" :label-width="formLabelWidth">
        <el-input v-model="form.eventAddress" readonly>
        </el-input>
      </el-form-item>
      <el-form-item label="是否重点事件:" :label-width="formLabelWidth">
        <el-radio v-model="form.isemphasis" :label='1'>是</el-radio>
        <el-radio v-model="form.isemphasis" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="事件状态:" :label-width="formLabelWidth">
        <el-radio-group v-model="form.state">
          <el-radio :label="1">待处理</el-radio>
          <el-radio :label="2">处理中</el-radio>
          <el-radio :label="3">处理完毕</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否需要协调:" :label-width="formLabelWidth">
        <el-radio v-model="form.iscoordinator" :label='1'>是</el-radio>
        <el-radio v-model="form.iscoordinator" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="机构:" :label-width="formLabelWidth">
        <el-input v-model="form.disposeOrganName"></el-input>
      </el-form-item>
      <el-form-item label="人员:" :label-width="formLabelWidth">
        <el-select v-model="form.disposePerson" filterable multiple>
            <el-option
                v-for="item in peopleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件附件:" :label-width="formLabelWidth">
        <el-upload
          action="#"
          accept=".jpg, .png"
          :limit="2"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :file-list="eventFileDataUp"
          :disabled="disabled">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="处理结果附件:" :label-width="formLabelWidth">
        <el-upload
          action="#"
          :limit="2"
          accept=".jpg, .png"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :file-list="eventFileDataDown"
          :disabled="disabled">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import localStroage from '@/common/js/localStroage';
export default {
  data() {
    return {
      eventFileDataUp: [], // 事件附件
      eventFileDataDown: [], // 处理结果附件
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
      disabled: true,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        id: "", // 当前行 id，为空则新增，否则为编辑
        eventName: '',
        eventDescribe: '',
        eventAddress:'',
        eventDate: '',
        isemphasis: 1,
        iscoordinator: 1,
        state: 1,
        disposeOrganName: '',
        disposePerson:''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      peopleOptions:[],
    }
  },
  methods: {
    /**
     * 弹窗关闭时的回调
     * 弹窗关闭时清空表单
     */
    handleCloseDialog() {
      this.eventFileDataUp = []
      this.eventFileDataDown = []
      Object.keys(this.form).map(key => {
        if(key === 'isemphasis' || key === 'iscoordinator' || key === 'state') {
          this.form[key] = 1
        } else {
          this.form[key] = ''
        }
      })
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
}
</script>

<style lang="scss">
.eventManage-dialog {
  overflow: hidden;
}
</style>
