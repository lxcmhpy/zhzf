<template>
  <div class="handlePart caseHandleSearchPart">
    <div v-if="caseState == 'unRecordCase'">
      <el-button type="primary" size="medium" icon="el-icon-plus" @click="caseRecordEmit">立案登记</el-button>
    </div>
    <div :class="caseState != 'unRecordCase' ? 'fullWid' : '' ">
      <el-form
        :model="caseSearchForm"
        ref="caseSearchForm"
        class="caseSearchForm"
        label-width="100px"
      >
        <div :class="lineSearchSty">
          <div class="item" v-if="caseState != 'unRecordCase'">
            <el-form-item label="案号">
              <el-input v-model="caseSearchForm.caseNumber"></el-input>
            </el-form-item>
          </div>

          <div class="item">
            <el-form-item label="当事人/单位">
              <el-input v-model="caseSearchForm.party"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="车船号">
              <el-input v-model="caseSearchForm.vehicleShipId"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            &nbsp;
            <el-button type="primary" size="medium" icon="el-icon-search" @click="searchCaseEmit"></el-button>
            <el-button
              type
              size="medium"
              :icon="hideSomeSearch ? 'el-icon-arrow-down':'el-icon-arrow-up'"
              @click="showSomeSearchEmit"
            ></el-button>
            <el-button
              size="small"
              class="addpdfs"
              style="background-color: #4573d0;color: #FFFFFF;"
              icon="el-icon-plus"
              @click="addpdffile"
            >添加线下案卷</el-button>
          </div>
        </div>
        <div v-if="addpdf_page">
          <el-dialog title="添加线下案卷" :visible.sync="addpdf_page" width="32%">
            <div>
              <el-form ref="addpdf_form" :model="addpdf_form" label-width="100px">
                <el-form-item label="案号">
                  <el-input v-model="addpdf_form.name" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="车/船号">
                  <el-input v-model="addpdf_form.name" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="当事人单位">
                  <el-input v-model="addpdf_form.name" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="违法行为">
                  <el-input v-model="addpdf_form.name" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="受案时间">
                  <el-date-picker
                    style="width:350px;"
                    v-model="addpdf_form.data1"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结案时间">
                  <el-date-picker
                    style="width:350px;"
                    v-model="addpdf_form.data2"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="案件类型">
                  <el-input v-model="addpdf_form.name" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="案卷上传">
                  <el-upload
                    class="upload-demo"
                    action
                    :http-request="uploadfile_offlinepdf"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-remove="beforeRemove"
                    :before-upload="beforeuploadpdf"
                    :on-success="uploadsuccesspdf"
                    multiple
                    accept=".pdf"
                    :limit="30"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button @click="addpdf_page = false">取 消</el-button>
              <el-button type="primary" @click="addpdf_page = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>

        <!-- <div v-if="caseState == 'waitDeal'">
          <div class="item item2">
            <el-form-item label="当事人/单位">
              <el-input v-model="caseSearchForm.caseId"></el-input>
            </el-form-item>
          </div>
        </div>-->
        <div :class="{hideSomeSearchClass:hideSomeSearch,lineTwoStyle:caseState == 'waitArchive'}">
          <div class="item">
            <el-form-item label="案件类型">
              <el-select v-model="caseSearchForm.caseType" placeholder="请选择">
                <el-option
                  v-for="item in caseTypeList"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.typeName"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState == 'unRecordCase' || caseState == 'waitDeal'">
            <el-form-item label="案件状态">
              <!-- <el-input v-model="caseSearchForm.caseStatus"></el-input> -->
              <el-select v-model="caseSearchForm.caseStatus" placeholder="请选择">
                <el-option
                  v-for="item in caseStateList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="item" v-if="caseState == 'waitDeal' || caseState == 'approveIng'">
            <el-form-item label="当前环节" v-if="caseState == 'waitDeal'">
              <el-select v-model="caseSearchForm.currentLinkName" placeholder="请选择">
                <el-option
                  v-for="item in linkList"
                  :key="item.id"
                  :label="item.linkName"
                  :value="item.linkName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前环节" v-if="caseState == 'approveIng'">
              <el-select v-model="caseSearchForm.currentLinkName" placeholder="请选择">
                <el-option
                  v-for="(item,index) in approvalInglinkList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="item" v-if="caseState == 'myApproval'">
            <el-form-item label="申请人">
              <el-input v-model="caseSearchForm.applicant"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="违法行为">
              <el-input v-model="caseSearchForm.caseCauseName"></el-input>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState != 'myApproval'">
            <el-form-item label="受案时间">
              <el-date-picker
                v-model="acceptTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState == 'waitArchive'">
            <el-form-item label="结案时间">
              <el-date-picker
                v-model="endCaseTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="item" v-if="caseState == 'myApproval'">
            <el-form-item label="申请时间">
              <el-date-picker
                v-model="applyTimeArray"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  getQueryLinkListApi,
  getQueryCaseTypeByOrganIdApi,
} from "@/api/caseHandle";
import { getDictListDetailApi } from "@/api/system";
export default {
  data() {
    return {
      fileList: [],
      addpdf_form: {
        name: "",
        data1: "",
        data2: "",
      },
      addpdf_page: false,
      caseSearchForm: {
        caseNumber: "",
        party: "",
        vehicleShipId: "",
        caseType: "",
        caseCauseName: "",
        caseStatus: "",
        currentLinkName: "",
        acceptStartTime: "",
        acceptEndTime: "",
        applicant: "",
        applyStartTime: "",
        applyEndTime: "",
        endCaseStartTime: "",
        endCaseEndTime: "",
      },
      acceptTimeArray: [],
      endCaseTimeArray: [],
      applyTimeArray: [],
      hideSomeSearch: true,
      linkList: [], //环节
      caseTypeList: [], //类型
      caseStateList: [], //状态
      dictId:
        this.caseState == "waitDeal"
          ? "ef38274ddea12be26e9a8c1bf23cd401"
          : "324701f1633dd65ca79a28fbc79c1628",
      approvalInglinkList: ["立案登记", "案件调查报告", "结案报告"],
    };
  },
  computed: {
    lineSearchSty() {
      if (this.caseState == "unRecordCase") {
        return "unRecordCaseStyle";
      } else if (this.caseState == "waitDeal") {
        return "waitDealStyle";
      } else if (this.caseState == "approveIng") {
        return "approveIngStyle";
      }
    },
  },
  props: ["caseState"],
  methods: {
    //：http-request 文件上传
    uploadfile_offlinepdf() {
      console.log("param", param);
      let fd = {
        file: param.file,
        category: "线下档案",
        fileName: param.file.name,
        status: "pdf卷宗", //传记录id
        caseId: "fet43g445y56hwgv34g", //传记录id
        docId: "cew43y3gyy6hu76rjki78t", //传文书id
      };
      console.log("fd", fd);
      uploadCommon(fd).then(
        (res) => {
          console.log("res", res);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //文件上传成功后
    uploadsuccesspdf(file, fileList) {},
    beforeuploadpdf(file) {
      console.log("file.type", file.type);
      const isJPG = file.name.lastIndexOf(".pdf") != -1;
      if (!isJPG) {
        this.handleRemove(file);
        this.$message.error("上传文件只能是 pdf 格式!");
      }
      return isJPG;
    },
    //文件移除列表
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    //上传后页面预览
    handlePreview(file) {
      //console.log(file);
    },
    //文件移除前
    beforeRemove(file, fileList) {
      //return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //点击添加按钮
    addpdffile() {
      this.addpdf_page = true;
    },
    caseRecord() {},
    //展开
    showSomeSearchEmit() {
      this.$emit("showSomeSearch");
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    caseRecordEmit() {
      this.$emit("caseRecord");
    },
    //查询所有环节
    getAllLinkList() {
      getQueryLinkListApi().then(
        (res) => {
          this.linkList = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //查询所有案件类型
    getQueryCaseTypeList() {
      let organId = iLocalStroage.gets("userInfo").organId;
      getQueryCaseTypeByOrganIdApi(organId).then(
        (res) => {
          console.log("类型", res);
          this.caseTypeList = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //搜索
    searchCaseEmit() {
      console.log("点击");
      this.caseSearchForm.applyStartTime = this.applyTimeArray[0];
      this.caseSearchForm.applyEndTime = this.applyTimeArray[1];

      this.caseSearchForm.acceptStartTime = this.acceptTimeArray[0];
      this.caseSearchForm.acceptEndTime = this.acceptTimeArray[1];

      this.caseSearchForm.endCaseStartTime = this.endCaseTimeArray[0];
      this.caseSearchForm.endCaseEndTime = this.endCaseTimeArray[1];

      this.$emit("searchCase", this.caseSearchForm);
    },
    //查询案件状态
    getQueryCaseStateList() {
      getDictListDetailApi(this.dictId).then(
        (res) => {
          console.log("状态", res);
          // this.options = res.data;
          this.caseStateList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  created() {
    this.getAllLinkList();
    this.getQueryCaseTypeList();
    this.getQueryCaseStateList();
  },
};
</script>
<style>
.addpdfs:hover {
  background-color: #4d82ec;
}
</style>
