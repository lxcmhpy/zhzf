<template>
  <div class="com_searchAndpageBoxPadding" id="archivesReviewManageBox">
    <div class="searchAndpageBox">
      <h2>案卷评查后台管理</h2>
      <el-form
        :model="archivesReviewManageForm"
        ref="archivesReviewManageForm"
        class="caseSearchForm"
      >
        <table>
          <tr>
            <th>序号</th>
            <th>考评内容</th>
            <th>评分标准</th>
            <th>考评分</th>
            <th>扣分原因</th>
            <th></th>
          </tr>
          <tr v-for="(item,index) in archivesReviewManageForm.tableData" :key="index">
            <td>{{index+1}}</td>
            <td>
              <el-form-item
                label
                :prop="'tableData.' + index + '.content'"
                :rules="{required:true,message:'考评内容不能为空',trigger:'blur'}"
              >
                <el-input v-model="item.content" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item
                label
                :prop="'tableData.' + index + '.standard'"
                :rules="{required:true,message:'评分标准不能为空',trigger:'blur'}"
              >
                <el-input v-model="item.standard" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </td>
            <td></td>
            <td></td>
            <td>
              <span class="removeBtn">
                <i class="el-icon-remove" @click="deleteReview(item.id)"></i>
              </span>
            </td>
          </tr>
        </table>
        <div>
            <span class="addBtn">
                <i class="el-icon-circle-plus" @click="addReview"></i>
                </span>
        </div>
        <div class="saveBtn">
            <el-button type="primary" @click="saveReview()">保存</el-button>

        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {queryCaseEvaluationManageApi,addCaseEvaluationApi,deleteCaseEvaluationManageApi} from '@/api/lawEnforcementSupervision'

export default {
  data() {
    return {
      archivesReviewManageForm: {
        tableData: [],
      },
    };
  },
  methods: {
    //保存
    saveReview() {
        if( this.archivesReviewManageForm.tableData.length == 0 ){
            this.$message('至少填写一条');
            return;
        } 
        this.$refs['archivesReviewManageForm'].validate((valid, noPass) => {
          if (valid) {
              console.log('提交');
              console.log(this.archivesReviewManageForm.tableData)
              addCaseEvaluationApi(JSON.stringify(this.archivesReviewManageForm.tableData)).then(res=>{
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.getCaseEvaluationManage();
              }).catch(err => {throw new Error(err)})
          }else {
            let a = Object.values(noPass)[0];
            this.$message({
              showClose: true,
              message: a[0].message,
              type: 'error',
              offset: 100,
              customClass: 'validateErrorTip'
            });
            return false;
          }
        })
    },
    //添加
    addReview(){
        this.archivesReviewManageForm.tableData.push({content:'',standard:''})
    },
    //删除
    deleteReview(id){
      // this.archivesReviewManageForm.tableData.splice(index,1)
      this.$message({
        type: "success",
        message: "删除成功"
      });
      deleteCaseEvaluationManageApi(id).then(res=>{
        console.log(res);
        this.getCaseEvaluationManage();
      }).catch(err => {throw new Error(err)})
    },
    getCaseEvaluationManage(){
      queryCaseEvaluationManageApi().then(res=>{
        console.log(res);
        this.archivesReviewManageForm.tableData = res.data;
      }).catch(err => {throw new Error(err)})
    }
    
  },
  created(){
    this.getCaseEvaluationManage();
  }
};
</script>
<style lang="scss">
#archivesReviewManageBox {
  .searchAndpageBox {
    text-align: center;
  }
  h2{
      line-height: 60px;
  }
  table {
    width: 1000px;
    margin: auto;
    border-collapse: collapse;
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error{
          display: none;
      }
    }
    th,
    td {
      border: 1px solid #000;
      vertical-align: middle;
    }
    th {
      line-height: 40px;
    }
    td {
      height: 56px;
    }
    tr {
      th:last-child,
      td:last-child {
        border: none;
      }
    }
  }
  .removeBtn,
  .addBtn {
    color: #4573d0;
    font-size: 25px;
    cursor: pointer;
  }
  .saveBtn{
      margin-top: 20px;
  }
}
</style>