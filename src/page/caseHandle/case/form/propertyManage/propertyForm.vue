<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox searchAndpageBox2">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="150px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="16">
                <el-form-item label="财物名称" prop="propertyInvolvedForm.propertyName">
                  <el-input v-model="form.propertyInvolvedForm.propertyName" maxlength="40"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-col :span="16">
                  <el-form-item label="财物数量" prop="propertyInvolvedForm.propertyNum">
                    <el-input-number
                      v-model="form.propertyInvolvedForm.propertyNum"
                      :min="1"
                      placeholder="请输入数字"
                      :controls="false"
                      style="width:95%"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="0" prop="propertyInvolvedForm.propertyNumUnit">
                    <el-select
                      v-model="form.propertyInvolvedForm.propertyNumUnit"
                      placeholder="单位"
                      @focus="getUnits('涉案财物-单位','unitOptions')"
                    >
                      <el-option
                        v-for="value in unitOptions"
                        :key="value.id"
                        :label="value.name"
                        :value="value.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="财物归属人/单位" prop="propertyInvolvedForm.propertyBelonger">
                  <el-input v-model="form.propertyInvolvedForm.propertyBelonger" maxlength="40"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="财物状态">
                  <el-input v-model="form.propertyInvolvedForm.propertyState" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="保管单位" prop="propertyInvolvedForm.saveUnit">
                  <el-input v-model="form.propertyInvolvedForm.saveUnit" maxlength="40"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保管人员">
                  <el-input v-model="form.propertyInvolvedForm.savePerson" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="保存地点">
                  <el-input v-model="form.propertyInvolvedForm.savePlace" maxlength="40"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保管方式">
                  <el-input v-model="form.propertyInvolvedForm.saveWay" maxlength="20"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="登记时间">
                  <el-date-picker
                    v-model="form.propertyInvolvedForm.registrationTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%"
                    disabled
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记人">
                  <el-input v-model="form.propertyInvolvedForm.registrant" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保管期限">
                  <el-select
                    v-model="form.propertyInvolvedForm.storagePeriod"
                    placeholder="请选择"
                    style="width: 85%"
                  >
                    <el-option
                      v-for="(item,index) in syqxList"
                      :key="index"
                      :label="item + '天'"
                      :value="item"
                    ></el-option>
                  </el-select>
                  <el-tooltip content="温馨提示：若财物未关联案件，到期则自动删除" placement="top">
                    <el-button type="text" icon="el-icon-info"></el-button>
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="财物描述">
                  <el-input
                    type="textarea"
                    v-model="form.propertyInvolvedForm.propertyDescribe"
                    maxlength="200"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    v-model="form.propertyInvolvedForm.remarks"
                    maxlength="100"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <div class="deliver"></div>
        <fileUploadGrid ref="files" :files="form.accs" title="附件信息"></fileUploadGrid>
        <div class="deliver"></div>
        <caseBindGrid ref="cases" :datas="cases" title="案件信息"></caseBindGrid>
        <div class="deliver"></div>
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span>处理方式</span>
          </div>
          <div>
            <el-row>
              <el-col :span="24">
                <el-form-item label="处理方式" prop="dispose.disposeWay">
                  <el-radio-group v-model="form.dispose.disposeWay">
                    <el-radio
                      v-for="(item,index) in handleWayList"
                      :key="index"
                      :label="item"
                    >{{item}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.dispose.disposeWay=='其他'">
              <el-col :span="24">
                <el-form-item label="其他">
                  <el-input type="textarea" v-model="form.dispose.disposeRemark" maxlength="30"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <div style="margin:15px;text-align:center;">
          <el-button size="medium" type="primary" @click="submitForm()">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import fileUploadGrid from "./fileUploadGrid.vue";
import caseBindGrid from "./caseBindGrid.vue";
import {
  findPropertyById,
  savePropertyInvolved,
  updatePropertyInvolved,
} from "@/api/propertyManage";

export default {
  components: {
    fileUploadGrid,
    caseBindGrid,
  },
  data() {
    return {
      form: {
        propertyInvolvedForm: {
          propertyNumUnit: "",
          propertyName: "",
          propertyState: "",
          registrationTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
          propertyNum: "",
          saveUnit: iLocalStroage.gets("userInfo").organName,
          registrant: iLocalStroage.gets("userInfo").nickName,
          propertyBelonger: "",
          savePerson: "",
          storagePeriod: 90,
          propertyNo: "",
          saveWay: "",
          savePlace: "",
          remarks: "",
          propertyDescribe: "",
        },
        caseIds: [],
        accs: [],
        dispose: {
          disposeWay: "",
          disposeRemark: "",
          disposePersonId: iLocalStroage.gets("userInfo").id,
          disposePersonName: iLocalStroage.gets("userInfo").nickName,
        },
      },
      rules: {
        "propertyInvolvedForm.propertyName": [
          { required: true, message: "请输入财物名称", trigger: "blur" },
        ],
        "propertyInvolvedForm.propertyNum": [
          { required: true, message: "请输入财物数量", trigger: "blur" },
        ],
        "propertyInvolvedForm.propertyNumUnit": [
          { required: true, message: "请选择单位", trigger: "change" },
        ],
        "propertyInvolvedForm.propertyBelonger": [
          { required: true, message: "请输入财物归属人/单位", trigger: "blur" },
        ],
        "propertyInvolvedForm.saveUnit": [
          { required: true, message: "请输入保管单位", trigger: "blur" },
        ],
        "dispose.disposeWay": [
          { required: true, message: "请选择处理方式", trigger: "change" },
        ],
      },
      unitOptions: [],
      handleWayList: ["封存", "扣押", "退回当事人", "移交法院", "销毁", "其他"],
      syqxList: [30, 90, 180, 360],
      // files:[],
      cases: [],
      isEdit: false,
    };
  },
  methods: {
    setCaseIds() {
      let cases = this.$refs.cases.getCaseData();
      for (var i = 0; i < cases.length; i++) {
        this.form.caseIds.push(cases[i].id);
      }
    },
    submitForm() {
      let _this = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.setCaseIds();
          if (
            !_this.form.dispose.disposeWay ||
            _this.form.dispose.disposeWay === ""
          ) {
            _this.form.dispose = null;
          }
          savePropertyInvolved(_this.form).then(
            (res) => {
              _this.$message({ type: "success", message: "保存成功!" });
              _this.$store.dispatch("deleteTabs", _this.$route.name);
              _this.$router.push({
                name: "case_handle_viewProperty",
                params: { id: res.data },
              });
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },

    //点击下拉框的时候后头获取下拉框数据
    getUnits(name, codeName) {
      if (this.unitOptions.length === 0) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          //查询单位
          (res) => {
            if (res.code === 200) {
              this.unitOptions = res.data;
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },

    //获取已归档的数据
    async getData(id) {
      this.isEdit = true;
      this.rules["dispose.disposeWay"][0].required = false;
      let res = await findPropertyById(id);
      this.form.propertyInvolvedForm = res.data.propertyInvolved;
      this.cases = res.data.cases;
      this.form.accs = res.data.accs;
    },
  },
  mounted() {
    if (this.$route.params.id !== "add") {
      this.getData(this.$route.params.id);
    }
  },
  created() {},
};
</script>
<style scope>
.deliver {
  height: 15px;
}
</style>