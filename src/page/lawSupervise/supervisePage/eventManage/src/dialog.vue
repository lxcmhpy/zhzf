<template>
    <div>
  <el-dialog class="eventManage-dialog" :title="title" :visible.sync="dialogFormVisible" top="0" @close="handleCloseDialog">
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-form ref="dialogForm" class="eventManage-dialog-dialogForm" :model="form" :disabled="disabled" :rules="rules">
      <el-form-item label="事件名称:" :label-width="formLabelWidth" prop="eventName">
        <el-input v-model="form.eventName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件描述:" :label-width="formLabelWidth" prop="eventDescribe">
        <el-input v-model="form.eventDescribe" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件时间:" :label-width="formLabelWidth" prop="eventDate">
        <el-date-picker
          style="width:100%"
          v-model="form.eventDate"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件坐标:" :label-width="formLabelWidth" class="eventLagLng" prop="eventAddress">
        <el-input v-model="form.eventAddress" readonly>
          <div
            class="handleLatLng"
            slot="append"
            @click="showMap"
            v-if="!hasLatitudeAndLongitude"
          ><i class="iconfont law-weizhi" />请获取坐标</div>
          <div
            v-else
            class="handleLatLng already"
            slot="append"
            @click="showMap"
          ><i class="iconfont law-weizhi" />已获取坐标</div>
        </el-input>
      </el-form-item>
      <el-form-item label="是否重点事件:" :label-width="formLabelWidth">
        <el-radio v-model="form.isemphasis" :label='1'>是</el-radio>
        <el-radio v-model="form.isemphasis" :label='0'>否</el-radio>
      </el-form-item>
      <el-form-item label="事件状态:" :label-width="formLabelWidth">
        <el-radio-group v-model="form.state" disabled>
          <el-radio :label="1">待上报</el-radio>
          <el-radio :label="2">待指派</el-radio>
          <el-radio :label="3">已指派待处理</el-radio>
          <el-radio :label="4">处理中</el-radio>
          <el-radio :label="5">处理完毕</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否需要协调:" :label-width="formLabelWidth">
        <el-radio v-model="form.iscoordinator" :label='1' @change="handleChangeRadio">是</el-radio>
        <el-radio v-model="form.iscoordinator" :label='0' @change="handleChangeRadio">否</el-radio>
      </el-form-item>
      <el-form-item label="机构:" :label-width="formLabelWidth" prop="disposeOrgan">
        <ElSelectTree
            ref="elSelectTree"
            @getValue="getValue"
            :options="treeOptions"
            :props="treeProps"
            :value="form.disposeOrgan"
        />
      </el-form-item>
      <el-form-item label="人员:" :label-width="formLabelWidth" prop="disposePerson">
        <el-select v-model="form.disposePerson" filterable multiple placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理意见:" :label-width="formLabelWidth" prop="note">
        <el-input v-model="form.note" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="事件附件:" :label-width="formLabelWidth">
        <el-upload
          action="#"
          accept=".jpg, .png"
          :limit="2"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :http-request="param => {uploadFile({param, type: 1})}"
          :file-list="eventFileDataUp"
          :disabled="disabled"
          :on-remove="(file,fileList) => {deleteFile({file,fileList,type:1})}">
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
          :http-request="param => {uploadFile({param, type: 2})}"
          :file-list="eventFileDataDown"
          :disabled="disabled"
          :on-remove="(file,fileList) => {deleteFile({file,fileList,type:2})}">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10M</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="disabled" type="primary" @click="dialogFormVisible = false">关 闭</el-button>
      <el-button v-if="!disabled" @click="dialogFormVisible = false">取 消</el-button>
      <el-button v-if="!disabled" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
    <mapDiag ref="mapDiagRef" @getLngLat="getLngLat"></mapDiag>
    </div>
</template>

<script>
import ElSelectTree from "@/components/elSelectTree/elSelectTree.vue";
import { addUpdate } from "@/api/eventManage";
import { upload, deleteFileByIdApi } from "@/api/lawSupervise.js";
import iLocalStroage from '@/common/js/localStroage';
import mapDiag from "@/page/caseHandle/case/form/inforCollectionPage/diag/mapDiag";
import store from "../store.js";
export default {
  inject: ['page'],
  mixins: [store],
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
    ElSelectTree,
    mapDiag,
  },
  data() {
    return {
      eventFileDataUp: [], // 事件附件
      eventFileDataDown: [], // 处理结果附件
      treeProps: {
        value: "id", // ID字段名
        label: "label", // 显示名称
        children: "children", // 子级字段名
      },
      disabled: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        id: "", // 当前行 id，为空则新增，否则为编辑
        eventName: '',
        eventDescribe: '',
        eventDate: '',
        isemphasis: 1,
        iscoordinator: 1,
        state: 2,
        disposeOrgan: '', // 选择的机构 id
        disposePerson: '', // 选择的人员 id
        storageIds: [], // 附件 id 列表
        eventAddress:'',
        eventCoordinate:'',
        note:''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      hasLatitudeAndLongitude: false, //案发坐标是否已经获取
      rules:{
          eventName:[{required: true, message: "请输入事件名称", trigger: "blur"}],
          eventDescribe:[{required: true, message: "请输入事件描述", trigger: "blur"}],
          eventDate:[{required: true, message: "请输入事件时间", trigger: "blur"}],
          eventAddress:[{required: true, message: "请输入事件坐标", trigger: "blur"}]
      }
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
      this.$refs.elSelectTree.valueTitle = ''
      Object.keys(this.form).map(key => {
        if(key === 'isemphasis' || key === 'iscoordinator' || key === 'state') {
          this.form[key] = 1
        } else if (key === 'storageIds') {
          this.form[key] = []
        } else {
          this.form[key] = ''
        }
      })
    },

    /**
     * 选中是否需要协调
     * 不需要协调(0)传处理中，需要协调(1)传待指派
     */
    handleChangeRadio(val) {
      if(val === 1) {
        this.form.state = 2
      } else if (val === 0) {
        this.form.state = 4
      }
    },

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
      this.$refs.elSelectTree.$children[0].handleClose();
      this.form.disposeOrgan = val
      this.$set(this.form,'disposePerson','')
      this.getPerson(val)
    },

    /**
     * 上传图片
     */
    uploadFile({param, type}) {
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("category", type);
      fd.append("fileName", param.file.name);
      fd.append('caseId', param.file.name+new Date().getTime())//传记录id
      fd.append('docId', param.file.name+new Date().getTime())//传记录id
      upload(fd).then(res => {
        if(res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
          return res.data
        } else {
          this.$message.error(res.msg)
        }
      }).then(data => {
        data.map(item => {
          if(item.category === '1') {
            this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                item.url = res
                this.eventFileDataUp.push(item)
            });
          } else {
            this.$util.com_getZfjgFileStream(item.storageId).then(res=>{
                item.url = res
                this.eventFileDataDown.push(item)
            });
          }
        })
      })
    },

    /**
     * 删除附件
     */
    deleteFile({ file, fileList, type }){
      console.log(file)
      deleteFileByIdApi(file.storageId).then(res=>{
        if(res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
          if(type === 1){
            this.eventFileDataUp.splice(this.eventFileDataUp.findIndex(item => item.storageId === file.storageId), 1)
          }else{
            this.eventFileDataDown.splice(this.eventFileDataDown.findIndex(item => item.storageId === file.storageId), 1)
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
        this.$refs['dialogForm'].validate(valid => {
            if (valid) {
                let upList = [], downList = [];
                if(this.eventFileDataUp.length > 0) {
                    upList = this.eventFileDataUp.map(item=>{
                        return item.storageId
                    })
                }
                if(this.eventFileDataDown.length > 0) {
                    downList = this.eventFileDataDown.map(item=>{
                        return item.storageId
                        this.form.storageIds.push(item.storageId)
                    })
                }
                this.form.storageIds = upList.concat(downList)
                this.form.disposePerson = JSON.stringify(this.form.disposePerson)
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
            }
        })
    },

    /**
     * 给 elSelectTree 组件赋值
     */
    setValue(val) {
      this.$refs.elSelectTree.valueTitle = val
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
    },
    //显示地图
    showMap() {
      this.$refs.mapDiagRef.showModal();
    },
    //获取坐标
    getLngLat(lngLatStr, address) {
      this.form.eventCoordinate = lngLatStr;
      this.form.eventAddress = address;
      this.hasLatitudeAndLongitude = true;
    },
  },
  mounted(){

  }
}
</script>

<style lang="scss">
.eventManage-dialog {
  overflow: hidden;
  &-dialogForm {
    .eventLagLng {
      .el-input {
        .el-input-group__append {
          cursor: pointer;
          width: 130px;
          height: 30px;
          padding: 0;
          border: 0;
          .handleLatLng {
            background: #409EFF;
            width: 100%;
            height: 100%;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            i {
              margin-right: 3px;
            }
          }
          .handleLatLng.already {
            background: #F2F6FC;
            color: #606266;
            border: 1px solid #DCDFE6;
            margin-left: -1px;
          }
        }
      }
    }
  }
}
</style>
