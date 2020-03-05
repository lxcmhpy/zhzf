<template>
  <div class="box">
    <div class="header">
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
          证据保存清单
        </div>
        <div class="border_blue"></div>
        <el-form ref="docForm" :model="docData" :rules="rules" label-width="135px">
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
            <!-- 个人 -->
            <div>
              <div class="row">
                <div class="col">
                  <el-form-item label="姓名">
                    <el-input ref="party" clearable class="w-120" v-model="docData.party" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="性别">
                    <el-input ref="partySex" clearable class="w-120" v-model="docData.partySex" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="年龄">
                    <el-input ref="partyAge" clearable class="w-120" v-model="docData.partyAge" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="所在单位">
                    <el-input ref="partyUnitPosition" clearable class="w-120" v-model="docData.partyUnitPosition" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="联系地址">
                    <el-input ref="partyAddress" clearable class="w-120" v-model="docData.partyAddress" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-form-item label="联系电话">
                    <el-input ref="partyTel" clearable class="w-120" v-model="docData.partyTel" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
                <div class="col">
                  <el-form-item label="邮编">
                    <el-input ref="partyZipCode" clearable class="w-120" v-model="docData.partyZipCode" :disabled="isParty ? false : true" size="small" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <!-- 企业 -->
            <div class="row">
              <div class="col">
                <el-form-item label="单位">
                  <el-input ref="partyName" clearable class="w-120" v-model="docData.partyName" :disabled="isParty ? true : false" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="地址">
                  <el-input ref="partyUnitAddress" clearable class="w-120" v-model="docData.partyUnitAddress" :disabled="isParty ? true : false" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="法定代表人">
                  <el-input ref="partyManager" clearable class="w-120" v-model="docData.partyManager" :disabled="isParty ? true : false" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
              <div class="col">
                <el-form-item label="职务">
                  <el-input ref="partyManagerPositions" clearable class="w-120" v-model="docData.partyManagerPositions" :disabled="isParty ? true : false" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <el-form-item label="统一社会信用代码" class="line-height13">
                  <el-input ref="partyManager" clearable class="w-120" v-model="docData.partyManager" :disabled="isParty ? true : false" size="small" placeholder="请输入"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="border_blue"></div>
          <div class="content_form bottom_form">
            <div class="content">
              <div class="row">
                <div class="col">
                  <el-form-item label="保存起止日期">
                    <el-date-picker v-model="docData.dataStart" type="date" placeholder="选择日期" @change="dataChange">
                    </el-date-picker>至
                    <el-date-picker v-model="docData.dataEnd" type="date" placeholder="选择日期" @change="dataChange">
                    </el-date-picker>
                    共 {{docData.datasTotal}}天
                  </el-form-item>
                </div>
              </div>
              <div class="table_form">
                <el-table :data="tableDatas" stripe border style="width: 100%">
                  <el-table-column prop="index" label="序号" align="center">
                  </el-table-column>
                  <el-table-column prop="name" label="证据名称" align="center">
                  </el-table-column>
                  <el-table-column prop="status" label="规格" align="center">
                    <template slot-scope="scope">
                      <!-- {{scope.row.value}} -->
                      <el-select v-model="scope.row.value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="数量" align="center">
                    <template slot-scope="scope">
                      <el-input-number size="mini" v-model="scope.row.value" :min="1" :max="10" label="描述文字"></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column prop="status" label="登记保存地点" align="center">
                  </el-table-column>
                </el-table>
              </div>
              <div class="row">
                <div class="col">
                  <center class="add_text" @click="addTable">
                    <i class="el-icon-circle-plus-outline"></i>
                    添加证据
                  </center>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 悬浮按钮 -->
      <!-- <div class="float-btns">
        <el-button type="primary" @click="addIllegalAction">
          <svg t="1577414377979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1726" width="16" height="16">
            <path d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z" p-id="1727" fill="#FFFFFF"></path>
          </svg><br>
          提交</el-button>
        <el-button type="success" @click="save">
          <svg t="1577415780823" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2584" width="16" height="16">
            <path d="M98 124.1V902c0 14.3 11.6 25.9 25.9 25.9h777.9c14.3 0 25.9-11.6 25.9-25.9V124.1c0-14.3-11.6-25.9-25.9-25.9H123.9c-14.3 0-25.9 11.6-25.9 25.9z m207.4 37.6h414.9v191.7H305.4V161.7z m558.8 702.7H162.6V161.7h104v230.6h492.7V161.7h105v702.7z" p-id="2585" fill="#FFFFFF"></path>
            <path d="M605.1 191.9h70v128h-70z" p-id="2586" fill="#FFFFFF"></path>
          </svg>
          <br>
          暂存</el-button>
      </div> -->

      <!-- 悬浮按钮 -->
    <casePageFloatBtns :pageDomId="'obtanEvidence_print'" :formOrDocData="formOrDocData" @submitData="submitData" @saveData="saveData" @backHuanjie="submitData"></casePageFloatBtns>
    
    </div>

  </div>
</template>
<script>
import casePageFloatBtns from "@/components/casePageFloatBtns/casePageFloatBtns.vue";
import { mixinGetCaseApiList } from "@/common/js/mixins";
export default {
  data() {
    return {
      docData: {
        partyType: '个人',
        dataEnd: '',
        dataStart: '',
        datasTotal: '0',
      },
      CaseDocDataForm: {
        caseBasicinfoId: "2c902ae66ae2acc4016ae376f6f1007f",
        caseDoctypeId: "123",
        //文书数据
        docData: "",
        status: "",
      },
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
      tableDatas: [{
        index: '1',
        name: '四川',
        status: '-',
        option: '1',
        value: '1',
      }, {
        index: '2',
        name: '四川',
        status: '完成',
        option: '2',
        value: '2',
      }, {
        index: '3',
        name: '四川',
        status: '暂存',
        option: '3',
        value: '3',
      }],
      options: [{
        value: '1',
        label: '件'
      }, {
        value: '2',
        label: '份'
      }, {
        value: '3',
        label: '套'
      },],
      value: ''
    }
  },
  methods: {
    // 获取带入信息
    getCaseBasicInfo() {
      let data = {
        id: "2c902ae66ae2acc4016ae376f6f1007f"
      };
      let _this = this
      this.$store.dispatch("getCaseBasicInfo", data).then(
        res => {
          _this.docData = res.data;
          _this.docData.datasTotal = 0;

        },
        err => {
          console.log(err);
        }
      );
    },

    // 提交表单
    saveData() {
      console.log(this.CaseDocDataForm);
      console.log('11')
      let _this = this
      this.$refs["docForm"].validate(valid => {
        if (valid) {
          _this.$store.dispatch("addDocData", _this.CaseDocDataForm).then(
            res => {
              console.log("保存文书", res);
              // this.$emit("getAllOrgan2", this.addDepartmentForm.oid);
              _this.$message({
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
    // 日期变化
    dataChange() {
      this.docData.datasTotal = 0;
      console.log(this.docData.dataStart, this.docData.dataEnd)
      if (this.docData.dataEnd && this.docData.dataStart) {
        console.log("不为空")
        if (this.docData.dataEnd >= this.docData.dataStart) {
          console.log(this.docData.dataEnd)
          this.docData.datasTotal = this.docData.dataEnd - this.docData.dataStart;
          this.docData.datasTotal = Math.abs(this.docData.datasTotal)
          // 除以一天的毫秒数（默认时间戳是到毫秒的，就算取到秒级的时间戳后面也带了3个0）
          this.docData.datasTotal = this.docData.datasTotal / (24 * 3600 * 1000);
          // 取整
          this.docData.datasTotal = Math.floor(this.docData.datasTotal) + 1;
          // 有问题，第一次点击不回显
          console.log("timestamp", this.docData.datasTotal)
        }
        else {
          this.$message.error('开始日期不能晚于结束日期');
          this.docData.dataEnd = this.docData.dataStart = undefined;
        }

      }
    },
    addTable() {
      console.log(this.tableDatas)
      let length = this.tableDatas.length;
      this.tableDatas.push({'index': Number(this.tableDatas[length - 1].index) + 1});
    }
  },
  components: {
    casePageFloatBtns
  },
  mounted() {
    this.getCaseBasicInfo();
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
</style>
