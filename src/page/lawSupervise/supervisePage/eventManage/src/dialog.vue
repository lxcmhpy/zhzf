<template>
  <el-dialog class="eventManage-dialog" :title="title" :visible.sync="dialogFormVisible" top="0">
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form :model="form" :disabled="disabled">
      <el-form-item label="事件名称" :label-width="formLabelWidth">
        <el-input v-model="form.eventName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件描述" :label-width="formLabelWidth">
        <el-input v-model="form.eventDescribe" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件时间" :label-width="formLabelWidth">
        <el-input v-model="form.eventDate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否重点事件" :label-width="formLabelWidth">
        <el-radio v-model="form.isemphasis" :label='1'>是</el-radio>
        <el-radio v-model="form.isemphasis" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="是否需要协调" :label-width="formLabelWidth">
        <el-radio v-model="form.iscoordinator" :label='1'>是</el-radio>
        <el-radio v-model="form.iscoordinator" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="事件附件" :label-width="formLabelWidth">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="处理结果附件" :label-width="formLabelWidth">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="disabled" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      <el-button v-if="!disabled" @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-if="!disabled" type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      disabled: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        eventName: '',
        eventDescribe: '',
        eventDate: '',
        isemphasis: 1,
        iscoordinator: 1,

      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
}
</script>

<style lang="scss">
.eventManage-dialog {
  overflow: hidden;
}
</style>
