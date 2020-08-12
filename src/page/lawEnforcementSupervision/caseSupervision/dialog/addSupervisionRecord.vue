<template>
  <el-dialog
    title
    :visible.sync="visible"
    @close="closeDialog"
    :modal="false"
    width="570px"
    custom-class="addSupervisionRecord"
  >
    <el-form
      :model="checkSearchForm"
      ref="checkSearchForm"
      class="checkSearchForm"
      label-width="80px"
      :disabled="!canEdit"
    >
      <h3>督办记录</h3>
      <div>
        <div class="item">
          <el-form-item label="督办人">
            <el-input v-model="checkSearchForm.userName" disabled></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="督办时间">
            <el-input v-model="checkSearchForm.supTime" disabled></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="item">
          <el-form-item label="所在机构">
            <el-input v-model="checkSearchForm.organ" disabled></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系电话">
            <el-input v-model="checkSearchForm.telPhone" disabled></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="textareaBox">
        <!-- <div class="item"> -->
        <el-form-item label="督办意见">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="checkSearchForm.supOpinion"
            disabled
          ></el-input>
        </el-form-item>
        <!-- </div> -->
      </div>
      <h3>督办反馈</h3>
      <div>
        <div class="item">
          <el-form-item label="反馈人">
            <el-input v-model="checkSearchForm.updateName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="反馈时间">
            <el-input v-model="checkSearchForm.feedTime"></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="item">
          <el-form-item label="所在机构">
            <el-input v-model="checkSearchForm.feedOrgan"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系电话">
            <el-input v-model="checkSearchForm.feedPhone"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="textareaBox">
        <!-- <div class="item"> -->
        <el-form-item label="督办意见反馈">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="checkSearchForm.feedContent"
          ></el-input>
        </el-form-item>
        <!-- </div> -->
      </div>
    </el-form>
    <!-- </div> -->
    <div class="el-dialog__footer">
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addfeedData()" v-show="canEdit">提交</el-button>
      </span>
    </div>
  </el-dialog>
  <!-- </div> -->
</template>
<script>
import {findSupervisionRecoredByIdApi,caseSuperviseSaveOrUpdateApi} from '@/api/lawEnforcementSupervision'
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      visible: false,
      checkSearchForm: {
        caseBasicinfoId:'',
        id:'',
        userName: '',
        supTime: "",
        organ: "",
        telPhone:"",
        supOpinion: "",
        updateName:"",
        feedTime:"",
        feedOrgan:"",
        feedPhone:"",
        feedContent:""
      },
      canEdit:true,
    };
  },
  methods: {
    showModel(id,flag) {
      this.visible = true;
      this.canEdit = flag ? false : true;
      findSupervisionRecoredByIdApi(id).then(res=>{
            console.log(res);
            this.checkSearchForm = res.data;
            let userData = iLocalStroage.gets('userInfo');
            this.checkSearchForm.updateName = userData.nickName;
            this.checkSearchForm.feedOrgan = userData.organName;
            this.checkSearchForm.feedPhone = userData.mobile;
            this.checkSearchForm.feedTime = new Date().format('yyyy-MM-dd HH:mm');
        }).catch(err=>{throw new Error(err)})
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //
    addfeedData() {
        this.$refs['checkSearchForm'].validate((valid, noPass) => {
          if (valid) {
            caseSuperviseSaveOrUpdateApi(this.checkSearchForm).then(res=>{
              console.log(res);
              this.$message({
                  type: "success",
                  message: "反馈成功"
              });
              this.visible = false;
              this.$emit('getNewData');
            }).catch(err=>{throw new Error(err)})
          }
      })
    },
  },
  mounted() {},
};
</script>
<style lang="scss" >
.addSupervisionRecord{
    .el-dialog__header{
        background: #fff;
    }
    .el-dialog__body{
        padding-top: 10px;
    }
}
.checkSearchForm {
  padding-right: 25px;
  h3{
    line-height: 30px;
    font-weight: bold;
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div.textareaBox{
    flex: 1;
    .el-form-item {
      width: 100%;
      .el-form-item__label{
          line-height: 20px;
      }
      .el-date-editor{
          width:100%
      }
    }
  }
}
</style>