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
          <div class="item">
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
              <el-form
                :model="addpdf_form"
                :rules="rules"
                ref="addpdf_form"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="案号" prop="caseNumber">
                  <el-input v-model="addpdf_form.caseNumber" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="车/船号" prop="vehicleShipId">
                  <el-input v-model="addpdf_form.vehicleShipId" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="当事人单位" prop="party">
                  <el-input v-model="addpdf_form.party" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="违法行为" prop="illegalFacts">
                  <el-input v-model="addpdf_form.illegalFacts" style="width:350px;"></el-input>
                </el-form-item>
                <el-form-item label="受案时间">
                  <el-date-picker
                    style="width:350px;"
                    v-model="addpdf_form.acceptTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结案时间">
                  <el-date-picker
                    style="width:350px;"
                    v-model="addpdf_form.endTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="案件类型">
                  <el-input v-model="addpdf_form.caseType" style="width:350px;"></el-input>
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
              <el-button type="primary" @click="submitForm('addpdf_form')">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div :class="{hideSomeSearchClass:hideSomeSearch,lineTwoStyle:caseState == 'waitArchive'}">
          <div class="item">
            <el-form-item label="案件类型">
              <el-input v-model="caseSearchForm.caseType"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="违法行为">
              <el-input v-model="caseSearchForm.illegalFacts"></el-input>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="受案时间">
              <el-date-picker
                v-model="caseSearchForm.acceptTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="item">
            <el-form-item label="结案时间">
              <el-date-picker
                v-model="caseSearchForm.endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { uploadCommon } from "@/api/upload";
import { addofflinefile, getSelectoffline } from "@/api/offlinefiles";
import moment from "moment";
import iLocalStroage from "@/common/js/localStroage";
import {
  getQueryLinkListApi,
  getQueryCaseTypeByOrganIdApi,
} from "@/api/caseHandle";
import { getDictListDetailApi } from "@/api/system";
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalss: 0, //总页数
      fileList: [],
      valuetable: {
        tableData_offline: [],
        pageSize: 10,
        currentPage: 1,
        totalss: 0,
      },
      addpdf_form: {
        acceptTime: "",
        endTime: "",
        caseNumber: "",
        caseType: "",
        createTime: "",
        id: "",
        illegalFacts: "",
        isUploadCase: "",
        party: "",
        vehicleShipId: "",
      },
      rules: {
        caseNumber: [{ required: true, message: "请输入", trigger: "blur" }],
        vehicleShipId: [{ required: true, message: "请输入", trigger: "blur" }],
        party: [{ required: true, message: "请输入", trigger: "blur" }],
        illegalFacts: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addpdf_page: false,
      caseSearchForm: {
        acceptTime: "",
        endTime: "",
        caseNumber: "",
        caseType: "",
        illegalFacts: "",
        party: "",
        vehicleShipId: "",
      },
      acceptTimeArray: [],
      endCaseTimeArray: [],
      applyTimeArray: [],
      hideSomeSearch: true,
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
    //添加  确定
    submitForm(addpdf_form) {
      this.$refs[addpdf_form].validate((valid) => {
        if (valid) {
          let data = {
            acceptTime: this.addpdf_form.acceptTime,
            endTime: this.addpdf_form.endTime,
            caseNumber: this.addpdf_form.caseNumber,
            caseType: this.addpdf_form.caseType,
            createTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            illegalFacts: this.addpdf_form.illegalFacts,
            isUploadCase: this.fileList.length > 0 ? 0 : 1,
            party: this.addpdf_form.party,
            vehicleShipId: this.addpdf_form.vehicleShipId,
          };
          console.log(data);
          addofflinefile(data).then(
            (res) => {
              if (res.code === 200) {
                this.$parent.getArchiveCase();
                this.$message({ type: "success", message: "添加成功" });
                this.addpdf_form.acceptTime = "";
                this.addpdf_form.endTime = "";
                this.addpdf_form.caseNumber = "";
                this.addpdf_form.caseType = "";
                this.addpdf_form.illegalFacts = "";
                this.addpdf_form.party = "";
                this.addpdf_form.vehicleShipId = "";
                this.addpdf_page = false;
              }

              console.log("res", res);
            },
            (error) => {
              this.$message({ type: "error", message: "添加失败" });
              console.log(error);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //：http-request 文件上传
    uploadfile_offlinepdf(param) {
      console.log("param", param);
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "线下案卷");
      fd.append("fileName", param.file.name);
      fd.append("fileType", ".pdf");
      fd.append("status", "线下pdf卷宗"); //传记录id
      fd.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fd.append("docId", param.file.name + new Date().getTime()); //传记录id
      console.log("fd", fd);
      uploadCommon(fd).then(
        (res) => {
          this.$message({ type: "success", message: "上传成功" });
          console.log("res", res);
        },
        (error) => {
          this.$message({ type: "error", message: "上传失败" });
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
      this.pdf_title = "添加线下案卷";
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
          //console.log("类型", res);
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
      //this.$emit("searchCase", this.caseSearchForm);
      console.log("this.caseSearchForm", this.caseSearchForm);
      getSelectoffline(this.caseSearchForm).then(
        (res) => {
          let valuetable = {
            tableData_offline: res.data.records,
            pageSize: res.data.size,
            currentPage: res.data.current,
            totalss: res.data.total,
          };
          this.$emit("getinfobycondition", valuetable);
          console.log("this.caseSearchForm.res", res);
        },
        (error) => {
          this.$message({ type: "error", message: "添加失败" });
          console.log(error);
        }
      );
    },
    //查询案件状态
    getQueryCaseStateList() {
      getDictListDetailApi(this.dictId).then(
        (res) => {
          //console.log("状态", res);
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
