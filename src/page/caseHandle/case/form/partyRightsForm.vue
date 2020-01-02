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
            当事人权利
          </div>
          <div class="border_blue"></div>

          <div class="content_form">
            <div class="row">
              <div class="col">
                <el-form-item prop="caseNumber" label="案号">
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
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseCauseNameCopy" label="违法事实">
                  <el-input type="textarea" ref="caseCauseNameCopy" clearable class="height106" v-model="docData.caseCauseNameCopy" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="违法条款">
                  <el-input ref="illegalLaw" clearable class="w-120" v-model="docData.illegalLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="处罚条款">
                  <el-input ref="punishLaw" clearable class="w-120" v-model="docData.punishLaw" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="tempPunishAmount" label="拟处罚决定" class="line-height13">
                  <el-input ref="tempPunishAmount" clearable class="w-120" v-model="docData.tempPunishAmount" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
              <div class="row">
                    <div class="col">
                      <el-form-item label="执行方式">
                          <el-checkbox-group v-model="docData.checkList">
                              <el-row>
                                <el-col :span="4">
                                    <el-checkbox label="是否重大案件" name="isImportant"></el-checkbox>
                                </el-col>
                              </el-row>
                          </el-checkbox-group>
                      </el-form-item>  
                    </div>
                    <div class="col">
                        <el-col :span="20">
                            <div align="right">
                                <el-button type="primary" size="small">上传记录</el-button>
                                <el-button type="success" size="small">线上记录</el-button>
                            </div>
                        </el-col>
                    </div>
              </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
            <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                执法文书
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="材料名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="状态" align="center">
              </el-table-column>
              <el-table-column  label="操作" align="center">
                <template slot-scope="scope">
                  <!-- {{scope.row.option}} -->
                  <span v-if="scope.row.status == '-'">
                    <i type="primary" class="el-icon-circle-plus cell-icon" @click="addDoc"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                  <span  v-if="scope.row.status == '完成'">
                    <i type="primary" class="el-icon-view cell-icon"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                  <span  v-if="scope.row.status == '暂存'">
                     <i type="primary" class="el-icon-edit cell-icon"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="content">
            <el-row :gutter="20">
            <el-col :span="16">
              <div class="second_title">
                当事人提交的证据材料
              </div>
            </el-col>
            <el-col :span="8">
              <div class="second_title_btns">
                <el-button type="primary" size="small">上传附件</el-button>
              </div>
            </el-col>
          </el-row>
          <div class="table_form">
            <el-table :data="tableDatas" stripe border style="width: 100%" height="100%">
              <el-table-column prop="index" label="序号" align="center">
              </el-table-column>
              <el-table-column prop="name" label="证据名称" align="center">
              </el-table-column>
              <el-table-column prop="status" label="时间" align="center">
              </el-table-column>
              <el-table-column  label="操作" align="center">
                <template slot-scope="scope">
                  <!-- {{scope.row.option}} -->
                  <span v-if="scope.row.status == '-'">
                    <i type="primary" class="el-icon-circle-plus cell-icon" @click="addDoc"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                  <span  v-if="scope.row.status == '完成'">
                    <i type="primary" class="el-icon-view cell-icon"></i>
                    <i type="primary" class="el-icon-printer cell-icon"></i>
                  </span>
                  <span  v-if="scope.row.status == '暂存'">
                     <i type="primary" class="el-icon-edit cell-icon"></i>
                    <i type="primary" class="el-icon-upload2 cell-icon"></i>
                    <i type="primary" class="el-icon-delete-solid cell-icon"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 悬浮按钮 -->
        <div class="float-btns">
        <el-button type="primary">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
          </svg><br>
          提交</el-button>
        <el-button type="success">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存
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
          checkList:"",
          isImportant:""
      },
      CaseDocDataForm: {
        caseBasicinfoId: "2c902ae66ae2acc4016ae376f6f1007f",
        caseDoctypeId: "123",
        //文书数据
        docData: "",
        status: "",
      },
      tableDatas: [{
        index: '1',
        name: '四川',
        status: '-',
        option: '1',
      }, {
        index: '2',
        name: '四川',
        status: '完成',
        option: '2',
      }, {
        index: '3',
        name: '四川',
        status: '暂存',
        option: '3',
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
      let data = {

        id: "12345666666666",
        caseId: "12345666666666",
        docId: "1234"
      };
      this.$store.dispatch("getCaseBasicInfo", data).then(
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

    },
    // 添加
    addDoc(){

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
