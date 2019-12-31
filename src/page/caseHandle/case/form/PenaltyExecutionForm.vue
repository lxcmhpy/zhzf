<template>
  <div class="box">
    <el-form ref="docForm" :model="docData" label-width="105px">

      <div class="header-case">
        <div class="header_left">
          <div class="triangle"></div>
          <div class="header_left_text">
            返回
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
          <div class="content_title">
            处罚执行
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="docData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="caseNumber" label="处罚类型">
                  <el-input ref="caseNumber" clearable class="w-120" v-model="docData.caseNumber" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="caseName" label="案由">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.处罚期限" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>           
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="处罚决定">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚金额">
                  <el-input ref="partyManager" clearable class="w-120" v-model="docData.partyManager" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="执行方式">
                    <el-radio-group>
                        <el-radio>线下缴费</el-radio>
                        <el-radio>电子缴纳</el-radio>
                    </el-radio-group>         
                    <el-checkbox></el-checkbox>责令改正
                  <!-- <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input> -->
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="已缴金额">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="caseName" label="待缴金额">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="执行情况">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item prop="checkbox" >
                    <el-checkbox></el-checkbox>分期（延期）缴纳
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="备注">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="缴纳凭证">
                  <el-input  type="file" ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="content_box">
        <div class="content">
          <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="name" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="isApproval" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="backName" label="状态" align="center">
              </el-table-column>
              <el-table-column prop="isAutoPdf" label="操作" align="center">
                <template>
                  <i type="primary" class="el-icon-circle-plus cell-icon"></i>
                  <i type="primary" class="el-icon-upload2 cell-icon"></i>
                  <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div class="float-btns btn-height63">
          <el-button type="primary" @click="addIllegalAction">
            <svg t="1577515608465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2285" width="24" height="24">
              <path d="M79.398558 436.464938c-25.231035 12.766337-56.032441 2.671394-68.800584-22.557835-12.775368-25.222004-2.682231-56.025216 22.548804-68.798778 244.424411-123.749296 539.711873-85.083624 744.047314 97.423694 33.059177-37.018403 66.118353-74.034999 99.179336-111.042564 26.072732-29.199292 74.302319-15.865804 81.689744 22.574091 20.740782 107.953934 41.486982 215.915094 62.229569 323.867222 5.884653 30.620785-18.981527 58.454577-50.071928 56.06134-109.610235-8.480185-219.211438-16.95134-328.812642-25.422494-39.021496-3.010963-57.692354-49.437946-31.610591-78.633625 33.060983-37.007565 66.116547-74.025968 99.175724-111.03534-172.88741-154.431492-422.746726-187.152906-629.574746-82.435711z" fill="#FFFFFF" p-id="2286"></path>
            </svg>
            <br>
            下一<br>环节
          </el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      docData: {
      },
      CaseDocDataForm: {
        caseBasicinfoId: "2c902ae66ae2acc4016ae376f6f1007f",
        caseDoctypeId: "123",
        //文书数据
        docData: "",
        status: "",
      },
      tableDatas: [{
        name: '立案',
        isApproval: '是',
        backName: '立案',
        isAutoPdf: '是',
        pdfType: '立案登记表',
        pdfType: '立案登记表',
        order: '1',
        adress: '../../jdfhu',
        discripe: '描述',
        workId: '11'
      }, {
        name: '调查类文书',
        isApproval: '否',
        backName: '调查',
        isAutoPdf: '否',
        pdfType: '',
        order: '2',
        adress: './kdsj',
        discripe: '描述',
        workId: '21',
      }],
      rules: {
        caseNumber: [
          { required: true, message: '案号必须填写', trigger: 'blur' }
        ],
        caseName: [
          { required: true, message: '案由必须填写', trigger: 'blur' }
        ],
        partyType: [
          { required: true, message: '当事人类型必须填写', trigger: 'blur' }
        ],
        closeResult: [
          { required: true, message: '处理结果必须填写', trigger: 'blur' }
        ],
        closeSituation: [
          { required: true, message: '执行情况必须填写', trigger: 'blur' }
        ],
      },
    }
  },
  methods: {
    // 获取带入信息
    getCaseBasicInfo() {
      this.$store.dispatch("getCaseBasicInfo", "1").then(
        res => {
          this.docData = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },

    // 提交表单
    addIllegalAction() {
      console.log(this.CaseDocDataForm);
      this.$refs["docForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("addDocData", this.CaseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              this.$message({
                type: "success",
                message: "保存成功"

              });
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }

      });
      // console.log(this.CaseDocDataForm.docData);

    },
    // 暂存
    save() {

    }
  },
  mounted() {
    this.getCaseBasicInfo();
  },
}
</script>

<style lang="less" scoped>
@import "../../../../css/documentForm.less";
</style>
