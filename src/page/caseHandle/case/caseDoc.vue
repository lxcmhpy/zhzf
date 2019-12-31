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
            调查类文书
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
                <el-form-item label="单位">
                  <el-input ref="partyName" clearable class="w-120" v-model="docData.partyName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址">
                  <el-input ref="partyUnitAddress" clearable class="w-120" v-model="docData.partyUnitAddress" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="法定代表人">
                  <el-input ref="partyManager" clearable class="w-120" v-model="docData.partyManager" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="职务：">
                  <el-input ref="partyManagerPositions" clearable class="w-120" v-model="docData.partyManagerPositions" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item prop="caseName" label="统一社会信用代码" class="line-height13">
                  <el-input ref="caseName" clearable class="w-120" v-model="docData.caseName" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="车牌号码">
                  <el-input ref="partyManager" clearable class="w-120" v-model="docData.partyManager" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="车辆类型">
                  <el-input ref="partyManagerPositions" clearable class="w-120" v-model="docData.partyManagerPositions" size="small" placeholder="请输入"></el-input>
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
@import "../../../css/documentForm.less";
</style>
