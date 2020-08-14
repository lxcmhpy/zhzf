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
        <el-date-picker
          v-model="form.eventDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否重点事件" :label-width="formLabelWidth">
        <el-radio v-model="form.isemphasis" :label='1'>是</el-radio>
        <el-radio v-model="form.isemphasis" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="事件状态" :label-width="formLabelWidth">
        <el-radio-group v-model="form.state">
          <el-radio :label="1">待处理</el-radio>
          <el-radio :label="2">处理中</el-radio>
          <el-radio :label="3">处理完毕</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否需要协调" :label-width="formLabelWidth">
        <el-radio v-model="form.iscoordinator" :label='1'>是</el-radio>
        <el-radio v-model="form.iscoordinator" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="机构" label-width="60px">
        <ElSelectTree @getValue="getValue" :options="treeOptions" :props="treeProps" />
      </el-form-item>
      <el-form-item label="人员" label-width="60px">
        <el-select @change="handlePeopleChange" v-model="form.disposePerson" placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
          accept=".jpg, .png"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :http-request="uploadFile"
          :file-list="imageList"
          :disabled="disabled"
          :on-remove="deleteFile">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="disabled" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      <el-button v-if="!disabled" @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-if="!disabled" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>addUpdate
import ElSelectTree from "@/components/elSelectTree/elSelectTree.vue";
import { addUpdate } from "@/api/eventManage";
import { upload, deleteFileByIdApi } from "@/api/lawSupervise.js"
export default {
  inject: ['page'],
  props: {
    title: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // 机构数据
    treeOptions() {
      return this.config.treeOptions
    },
    // 人员数据
    peopleOptions() {
      return this.config.peopleOptions
    }
  },
  components: {
    ElSelectTree
  },
  data() {
    return {
      imageList: [], // 文件列表
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
      disabled: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        eventName: '',
        eventDescribe: '',
        eventDate: '',
        isemphasis: 1,
        iscoordinator: 1,
        state: 1,
        disposeOrgan: '', // 选择的机构 id
        disposePerson: '', // 选择的人员 id
        storageIds: [], // 附件 id 列表
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    /**
     * 获取选择到的人员
     */
    handlePeopleChange(val) {
      console.log(val)
    },

    /**
     * 获取选择到的机构
     */
    getValue(val) {
      this.form.disposeOrgan = val
      console.log(val)
    },

    /**
     * 上传图片
     */
    uploadFile(param) {
      let type = '图片'
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", '事件管理');
      fd.append("fileName", param.file.name);
      fd.append('status', type)//传记录id
      fd.append('caseId', param.file.name+new Date().getTime())//传记录id
      fd.append('docId', param.file.name+new Date().getTime())//传记录id
      let _this = this
      upload(fd).then(
        res => {
          console.log(res)
          if(type==="图片"){
            _this.imageList.push({
              url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
              storageId:res.data[0].storageId,
              name:res.data[0].fileName
            });
          }else{
            _this.attachList.push({
              url:iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST+'/'+res.data[0].storageId,
              storageId:res.data[0].storageId,
              name:res.data[0].fileName
            });
          }
        },
        error => {
          console.log(error)
        }
      );
    },

    /**
     * 删除附件
     */
    deleteFile(file, fileList){
      let type = '图片'
      let _this = this
      deleteFileByIdApi(file.storageId).then(res=>{
        if(res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
          if(type=="图片"){
            _this.imageList.splice(_this.imageList.findIndex(item => item.storageId === file.storageId), 1)
          }else{
            _this.attachList.splice(_this.attachList.findIndex(item => item.storageId === file.storageId), 1)
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },

    /**
     * 提交表单
     */
    handleSubmit() {
      this.imageList.forEach(item=>{
        this.form.storageIds.push(item.storageId)
      })
      addUpdate(this.form).then(res => {
        if(res.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            message: res.msg,
            type: "success"
          })
          this.page.initPage()
        } else {
          this.$message.error(res.msg)
        }
      })
    },

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
