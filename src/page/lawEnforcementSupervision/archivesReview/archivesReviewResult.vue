<template>
  <div class="com_searchAndpageBoxPadding" id="archivesReviewResultBox">
    <div class="searchAndpageBox">
      <h2>案卷评查</h2>
      <el-form
        :model="archivesReviewManageForm"
        ref="archivesReviewManageForm"
        class="caseSearchForm"
        label-width="80px"
        :disabled="!canSave"
      >
        <div class="itemBox">
          <div class="item">
            <el-form-item label="案件编号" >
              <el-input v-model="archivesReviewManageForm.caseNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="案由">
              <el-input v-model="archivesReviewManageForm.caseName" disabled></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="考评时间">
              <!-- <el-input v-model="archivesReviewManageForm.num" ></el-input> -->
              <el-date-picker
                v-model="archivesReviewManageForm.createTime"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="得分">
              <el-input v-model="archivesReviewManageForm.sumSort"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="评查人">
              <el-input v-model="archivesReviewManageForm.reviewer"></el-input>
            </el-form-item>
          </div>
        </div>
        <table>
          <tr>
            <th>序号</th>
            <th>考评内容</th>
            <th>评分标准</th>
            <th>考评分</th>
            <th>扣分原因</th>
          </tr>
          <tr v-for="(item,index) in archivesReviewManageForm.caseSortFormList" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.content}}</td>
            <td>{{item.standard}}</td>
            <td>
              <el-form-item
                label-width="0"
                :prop="'caseSortFormList.' + index + '.grade'"
                :rules="{required:true,message:'考评分不能为空',trigger:'blur'}"
              >
                <el-input
                  v-model="item.grade"
                  type="textarea"
                  :rows="2"
                  @keyup.native="deuncode()"
                ></el-input>
              </el-form-item>
            </td>
            <td>
              <el-form-item
                label-width="0"
                :prop="'caseSortFormList.' + index + '.reason'"
                :rules="{required:true,message:'扣分原因不能为空',trigger:'blur'}"
              >
                <el-input v-model="item.reason" type="textarea" :rows="2"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="saveBtn">
          <el-button type="primary" @click="saveReview()" v-if="canSave">保存</el-button>
        </div>
      </el-form>
    </div>
     <!--快速入口 -->
    <caseSlideMenu :activeIndex="'lawEnforcementSupervision_archivesReviewResult'"></caseSlideMenu>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage"; 
import {
  queryCaseEvaluationManageApi,
  addCaseEvaluationSortApi,
  caseEvaluationSortByCaseIdApi,
} from "@/api/lawEnforcementSupervision";
  import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";

export default {
  data() {
    return {
      archivesReviewManageForm: {
        id: "",
        caseBasicinfoId: "",
        caseNumber: "",
        caseName: "",
        createTime: new Date().format("yyyy-MM-dd HH:mm"),
        reviewer: iLocalStroage.gets("userInfo").nickName,
        sumSort: 0,
        caseSortFormList: [],
        pcStatue: "已评查",
      },
      canSave: true,
    };
  },
  components: {
      caseSlideMenu,
  },
  methods: {
    //保存
    saveReview() {
      if (this.archivesReviewManageForm.caseSortFormList.length == 0) {
        this.$message("至少填写一条");
        return;
      }
      this.$refs["archivesReviewManageForm"].validate((valid, noPass) => {
        if (valid) {
          addCaseEvaluationSortApi(this.archivesReviewManageForm)
            .then((res) => {
              console.log(res);
              this.$message({
                type: "success",
                message: "保存成功",
              });
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          let a = Object.values(noPass)[0];
          this.$message({
            showClose: true,
            message: a[0].message,
            type: "error",
            offset: 100,
            customClass: "validateErrorTip",
          });
          return false;
        }
      });
    },
    getCaseEvaluationManage() {
      queryCaseEvaluationManageApi()
        .then((res) => {
          console.log(res);
          this.archivesReviewManageForm.caseSortFormList = res.data.sort((a,b)=> a.sort-b.sort);
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    //自动计算总分
    getSumSort() {
      let sum = 0;
      for (let item of this.archivesReviewManageForm.caseSortFormList) {
        if(item.grade)
        sum += Number(item.grade);
      }
      console.log('sum'.sum)
      this.archivesReviewManageForm.sumSort = sum;
    },
    //防抖函数
    deuncode() {
      var time1;
      clearTimeout(time1);
      time1 = setTimeout(this.getSumSort,500)
      // var time1;
      // return function () {
      //   clearTimeout(time1);
      //   console.log("this", this);
      //   time1 = setTimeout(function () {
      //     console.log("time");
      //     this.getSumSort();
      //   }, 500);
      // };
    },
    getcaseEvaluationResult(id) {
      caseEvaluationSortByCaseIdApi(id)
        .then((res) => {
          console.log(res);
          this.archivesReviewManageForm = res.data;
          this.archivesReviewManageForm.caseSortFormList =
            res.data.caseSortVoList.sort((a,b)=> a.sort-b.sort);
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
  },
  mounted() {
    let archivesReviewCaseData = JSON.parse(
      sessionStorage.getItem("archivesReviewCaseData")
    );
    //查看
    if (archivesReviewCaseData.pcStatue == "已评查") {
      this.canSave = false;
      this.getcaseEvaluationResult(archivesReviewCaseData.id);
    } else {
      //添加
      this.canSave = true;
      this.archivesReviewManageForm.caseBasicinfoId = archivesReviewCaseData.id;
      this.archivesReviewManageForm.caseNumber = archivesReviewCaseData.caseNumber;
      this.archivesReviewManageForm.caseName = archivesReviewCaseData.caseName;
      this.getCaseEvaluationManage();
    }
  },
  created() {
    // getSumSortSomeSecondAfter = this.deuncode(this.getSumSort)
  },
};
</script>
<style lang="scss">
#archivesReviewResultBox {
  .itemBox {
    display: inline-block;
  }
  .item {
    display: flex;
    .el-form-item {
      width: 400px;
    }
  }
  .searchAndpageBox {
    text-align: center;
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
  h2 {
    line-height: 60px;
  }
  table {
    width: 1000px;
    margin: auto;
    border-collapse: collapse;
    .el-form-item {
      margin-bottom: 0;
      .el-form-item__error {
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
      th:nth-child(1),
      td:nth-child(1),
      th:nth-child(2),
      td:nth-child(2) {
        width: 15%;
      }
      th:nth-child(3),
      td:nth-child(3) {
        width: 30%;
      }
      th:nth-child(4),
      td:nth-child(5),
      th:nth-child(5),
      td:nth-child(5) {
        width: 20%;
      }
    }
  }
  .saveBtn {
    margin-top: 20px;
  }
}
</style>