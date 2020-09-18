<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox inspection-info" id="roleBox" style="height:calc(100% - 22px)">
      <div class="handlePart">
        <div class="search toggleBox">
          <div class="handlePart caseHandleSearchPart" :class="isShow?'autoHeight':'aaa'">
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item label="任务名称" prop='taskName'>
                <el-input v-model="searchForm.taskName"></el-input>
              </el-form-item>
              <el-form-item label="抽查主体" prop='checkSubject'>
                <el-input v-model="searchForm.checkSubject"></el-input>
              </el-form-item>
              <el-form-item label="检查类型" prop='checkType' v-if="searchForm.taskArea=='省交通运输厅领域'">
                <el-input v-model="searchForm.checkType"></el-input>
              </el-form-item>
            </el-form>
            <div class="search-btns">
              <!-- <el-button type="primary" size="medium" icon="el-icon-search" @click="searchTableData">查询</el-button> -->
              <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="searchTableData()"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="resetSearchData('searchForm')"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="isShow = !isShow">
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="handlePart">
        <div class="search" style="width:100%">
          <el-form :inline="true">
            <el-form-item label="任务领域" prop='taskArea'>
              <el-select v-model="searchForm.taskArea" placeholder="请选择" @change="resetSearchData('searchForm')">
                <el-option label="省交通运输厅领域" value="省交通运输厅领域"></el-option>
                <el-option label="省市场监管领域" value="省市场监管领域"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart" v-if="searchForm.taskArea=='省交通运输厅领域'">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
          <el-table-column prop="objectName" label="对象名称" align="center"></el-table-column>
          <el-table-column prop="projectName" label="项目名称" align="center"></el-table-column>
          <el-table-column prop="checkSubject" label="抽查主体" align="center"></el-table-column>
          <el-table-column prop="checkType" label="检查类型" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="抽查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkItem" label="抽查内容" align="center"></el-table-column>
          <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkStatus" label="检查状态" align="center">
            <template slot-scope="scope">
              {{scope.row.checkStatus==0?'未检查':'已检查'}}
            </template>
          </el-table-column>
          <el-table-column prop="checkEvaluate" label="检查评价" align="center"></el-table-column>
          <el-table-column prop="checkResult" label="检查结果" align="center">
            <template slot-scope="scope">
              {{scope.row.checkResult}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="editMethod2(scope.row)" type="text" :disabled="!scope.row.objectName">附件管理</el-button>
              <el-button @click="checkMethod(scope.row)" type="text" :disabled="!scope.row.objectName">检查</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tablePart" v-if="searchForm.taskArea=='省市场监管领域'">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="taskName" label="抽查类别" align="center"></el-table-column>
          <el-table-column prop="checkItem" label="抽查事项" align="center"></el-table-column>
          <el-table-column prop="itemType" label="事项类别" align="center"></el-table-column>
          <el-table-column prop="checkObject" label="检查对象" align="center"></el-table-column>
          <el-table-column prop="checkSubject" label="检查主体" align="center"></el-table-column>
          <el-table-column prop="checkMode" label="检查方式" align="center"></el-table-column><!-- 显示模板标题 -->
          <el-table-column prop="checkBasis" label="抽查依据" align="center"></el-table-column>
          <el-table-column label="任务周期" align="center">
            <template slot-scope="scope">
              {{scope.row.taskStartTime}}-{{scope.row.taskEndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="checkStatus" label="检查状态" align="center">
            <template slot-scope="scope">
              {{scope.row.checkStatus==0?'未检查':'已检查'}}
            </template>
          </el-table-column>
          <el-table-column prop="checkEvaluate" label="检查评价" align="center">
            <template slot-scope="scope">
              {{scope.row.checkEvaluate}}
            </template>
          </el-table-column>
          <el-table-column prop="checkResult" label="检查结果" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="editMethod2(scope.row)" type="text" :disabled="!scope.row.objectName">附件管理</el-button>
              <el-button @click="checkMethod(scope.row)" type="text" :disabled="!scope.row.objectName">检查</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
      </div>
      <el-dialog title="上传附件" :close-on-click-modal="false" :visible.sync="dialogFormVisible" @close="resetFileForm()">
        <div class="search-btns" style="margin-bottom:20px">
          <el-upload :show-file-list="false" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :http-request="saveFile" multiple :limit="3" :file-list="fileList">
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
        </div>
        <div class="random-table-title">
          已上传文件列表
        </div>
        <el-table :data="fileList" stripe style="width: 100%" height="100%">
          <caption></caption>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
          <el-table-column prop="userId" label="上传者" align="center"></el-table-column>
          <el-table-column prop="fileSize" label="大小" align="center">
            <template slot-scope="scope">
              {{scope.row.fileSize}}K
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="getFileStream(scope.row.storageId)" type="text">查看</el-button>
              <el-button @click="delFileMethod(scope.row.storageId)" type="text">删除</el-button>
              <el-button @click="downLoadMethod(scope.row.storageId)" type="text">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm',0)">暂存</el-button>
          <el-button type="primary" @click="submitForm('addForm',1)">保存</el-button>
        </div> -->
      </el-dialog>
      <el-dialog title="检查" :close-on-click-modal="false" :visible.sync="dialogFormVisible2" @close="resetForm('addForm2')">
        <el-form :model="addForm2" :label-width="formLabelWidth" :rules="rules2" ref="addForm2">
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查人员" prop="matchPerson">
                <el-input v-model="addForm2.matchPerson" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查专家" prop="matchExpert">
                <el-input v-model="addForm2.matchExpert" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查评价" prop="checkEvaluate">
                <!-- <el-input v-model="addForm2.checkEvaluate"></el-input> -->
                <el-select v-model="addForm2.checkEvaluate" placeholder="请选择">
                  <el-option v-for="item in optionsJCPJ" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="抽查结果" prop="checkResult">
                <el-select v-model="addForm2.checkResult" placeholder="请选择">
                  <el-option label="合格" value="合格"></el-option>
                  <el-option label="不合格" value="不合格"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="检查开始时间" prop="checkStartTime">
                <el-date-picker v-model="addForm2.checkStartTime" type="date" value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="检查结束时间" prop="checkEndTime">
                <el-date-picker v-model="addForm2.checkEndTime" type="date" value-format="yyyy-MM-dd" @blur="handleTimestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="评价内容" prop="evaluateContent">
            <el-input v-model="addForm2.evaluateContent"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="fileList" stripe style="width: 100%" height="100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="fileName" label="文件名称" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
              <el-button @click="getFileStream(scope.row.storageId)" type="text">查看</el-button>
              <el-button @click="downLoadMethod(scope.row.storageId)" type="text">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm2('addForm2',1)">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="pdfVisible" :close-on-click-modal="false" width="800px" append-to-body>
        <div>
          <div style="height:auto;">
            <div lazy id="myPdfBOx">
              <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(pdfUrl)" frameborder="0" style="width:790px;height:1119px"></iframe>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  addTaskApi, getDictListDetailByNameApi, getTemplateDocList, getDocListById, getRandomResultByPage,
  addCheckResultApi, getCheckResultByIdApi, getCheckResultByTwoIdApi, getCheckResultByIdsApi
} from "@/api/inspection";
import iLocalStroage from "@/common/js/localStroage";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
import { getFileStreamByStorageIdApi } from "@/api/caseHandle";
import { downLoadCommon, deleteFileByIdApi, uploadCommon, getFile } from "@/api/upload.js";
export default {
  mixins: [mixinPerson, mixinInspection],
  data() {
    return {
      multipleSelection: [],
      searchForm: {
        checkSubject: "",
        taskName: '',
        taskArea: '省交通运输厅领域'
      },
      isShow: false,
      addForm: {
        name: '',
        sex: '',
        expertNum: '',
        company: '',
        politicalStatus: '',
        birthDate: '',
        unitAddress: '',
        jobTitle: '',
        job: '',
        evaluationTime: '',
        graduateSchool: '',
        email: '',
        domain: '',
        fixedTelephone: '',
        graduateTime: '',
        practiceQualification: '',
        qualificationTime: '',
        contactType: '',
        baseInfo: '',
        remark: '',
        status: '',
      },
      addForm2: {},
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '100px',
      dialogStatus: '',
      dialogStatus2: '',
      rules: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
      },
      rules2: {
        pass: [
          { required: true, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, trigger: 'blur' }
        ],
        age: [
          { required: true, trigger: 'blur' }
        ]
      },
      optionsJCPJ: [],
      fileList: [],
      pdfVisible: false,
      pdfUrl: '',
      currentData: ''
    }
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        taskName: this.searchForm.taskName,
        checkSubject: this.searchForm.checkSubject,
        checkType: this.searchForm.checkType,
        taskArea: this.searchForm.taskArea,
        organName : iLocalStroage.gets("userInfo").organName,//机构名称
        current: this.currentPage,
        size: this.pageSize,
      };
      this.getPageList("getCheckResultByPage", data);
      // this.tableData = [{}]
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log('multipleSelection', this.multipleSelection)
    },

    resetFileForm() {
      this.fileList = []
    },
    resetForm(formName) {
      //   this.$refs[formName].resetFields();
      //   this.searchForm.defaultDisplay = true
      //   this.getTableData()
    },

    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true
      this.getTableData()
    },
    submitForm(formName, type) {
      this.addForm.taskArea = '省交通运输厅领域'
      if (this.addForm.checkEndTime < this.addForm.checkStartTime) {
        this.$message({ type: "error", message: '开始时间必须小于结束时间' });
        return
      }
      if (type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addForm.taskStatus = '保存'
            addCheckResultApi(this.addForm).then(
              res => {
                console.log(res)
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.dialogFormVisible = false
                  this.currentPage = 1;
                  this.getTableData()
                }
              },
              error => {
                // reject(error);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        this.addForm.taskStatus = '暂存'
        addTaskApi(this.addForm).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.dialogFormVisible = false
              this.currentPage = 1;
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })
      }

    },
    submitForm2(formName, type) {
      // this.addForm2.taskId = this.addForm2.id
      // this.addForm2.id = ''
      console.log('task', this.addForm2)
      console.log('checkResult', this.addForm2.checkResult)
      if (this.addForm2.checkEndTime < this.addForm2.checkStartTime) {
        this.$message({ type: "error", message: '开始时间必须小于结束时间' });
        return
      }
      let data = {
        checkEndTime: this.addForm2.checkEndTime,
        checkEvaluate: this.addForm2.checkEvaluate,
        checkResult: this.addForm2.checkResult,
        checkStartTime: this.addForm2.checkStartTime,
        evaluateContent: this.addForm2.evaluateContent,
        extractResultId: this.addForm2.extractResultId,
        taskId: this.addForm2.id,
        id: this.addForm2.checkResultId
      }
      if (type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            data.taskStatus = '保存'

            addCheckResultApi(data).then(
              res => {
                console.log(res)
                if (res.code == 200) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.dialogFormVisible2 = false
                  this.currentPage = 1;
                  this.getTableData()
                } else {
                  this.$message({ type: "error", message: res.msg });
                }
              },
              error => {
                // reject(error);
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        data.taskStatus = '暂存'
        addTaskApi(data).then(
          res => {
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.dialogFormVisible = false
              this.currentPage = 1;
              this.getTableData()
            }
          },
          error => {
            // reject(error);
          })
      }

    },
    delMethod(id) {
      this.deleteById("delTask", id);
    },
    // 添加-弹窗
    addMethod1() {
      this.addForm.checkDomain = this.searchForm.taskArea
      this.addMethod()
    },
    // 添加-弹窗
    addMethod2() {
      this.addForm.checkDomain = this.searchForm.taskArea
      this.dialogFormVisible2 = true
    },
    // 修改
    editMethod2(row) {
      this.currentData = row
      this.getByMlCaseId(row)
      this.dialogFormVisible = true
    },
    checkMethod(row) {
      let _this = this
      this.addForm2 = JSON.parse(JSON.stringify(row))
      console.log(this.addForm2)
      if (this.addForm2.checkResultId) {
        getCheckResultByIdApi(this.addForm2.checkResultId).then(
          // upload(fd).then(
          res => {
            if (res.code == 200) {
              // _this.addForm2.evaluateContent=res.data.evaluateContent||''
              this.$set(_this.addForm2, 'evaluateContent', res.data.evaluateContent)
              this.$set(_this.addForm2, 'checkEndTime', res.data.checkEndTime)
              this.$set(_this.addForm2, 'checkStartTime', res.data.checkStartTime)
              this.fileList = res.data.fileList || ''
            }
          },
          error => {
            console.log(error)
          }
        )
      } else {
        _this.getByMlCaseId(row)
      }
      this.dialogFormVisible2 = true
    },
    viewMethod() { },
    delFileMethod(storageId) {
      let _this = this
      this.$confirm('确认删除？', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteFileByIdApi(storageId).then(
          res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
              });
              _this.getByMlCaseId(_this.currentData)
            }
          },
          error => {
            console.log(error)
          }
        );
      })

    },
    downLoadMethod(storageId) {
      // 这里传fileStorageid
      getFileStreamByStorageIdApi(storageId).then(
        res => {
          // 接收数据需未blob格式
          //其他浏览器
          let link = document.createElement('a'); // 创建a标签
          link.style.display = 'none';
          link.setAttribute('download', '附件.pdf')//必须要重命名
          let objectUrl = URL.createObjectURL(res);
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        },
      ).catch(err => { console.log(err) });
    },
    //根据stroagId请求文件流
    getFileStream(storageId) {
      //设置地址
      getFileStreamByStorageIdApi(storageId).then(res => {
        // getFileStreamByStorageIdApi('12,13ac7d04e13f').then(res=>{

        this.getObjectURL(res);
      }).catch(err => {
        console.log(err);
      })
    },
    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {

        }
      } else if (window.URL != undefined) { // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {

        }
      }

      this.pdfUrl = url;
      this.pdfVisible = true
    },
    handleChange(file, fileList) {
      const fileIndex = fileList.findIndex((item) => item.uid === file.uid);
      const isGt2M = file.size / 1024 > 10;
      if (isGt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning",
        });
        fileList.splice(fileIndex, 1);
      }
      // if (file.raw.type != 'application/pdf') {
      //   this.$message({
      //     message: "请选择pdf文件!",
      //     type: "warning",
      //   });
      //   fileList.splice(fileIndex, 1);
      // }

    },
    saveFile(param) {
      let _this = this
      const isGt2M = param.file.size / 1024 / 1024 > 10;
      if (isGt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning",
        });
        return
      }
      // if (param.file.type != 'application/pdf') {
      //   this.$message({
      //     message: "请选择pdf文件!",
      //     type: "warning",
      //   });
      //   // fileList.splice(fileIndex, 1);
      //   return
      // }
      var fd = new FormData()
      fd.append("file", param.file);
      fd.append("userId", iLocalStroage.gets("userInfo").nickName);
      fd.append("fileName", param.file.name);
      fd.append('caseId', this.currentData.id)//传任务id
      fd.append('docId', this.currentData.extractResultId)//传extractResultId
      uploadCommon(fd).then(
        // upload(fd).then(
        res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            _this.getByMlCaseId(_this.currentData)
          }
        },
        error => {
          console.log(error)
        }
      )
    },
    //获取文书列表
    getByMlCaseId(currentData) {
      let _this = this
      let data = {
        caseId: currentData.id,
        docId: currentData.extractResultId
      }
      getFile(data).then(
        res => {
          console.log(res);
          _this.fileList = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    handleTimestamp() {
      this.$set(this.addForm2, 'checkEndTime', this.addForm2.checkEndTime)
    },
    getDrawerList(data) {
      let _this = this
      data.forEach(element => {
        getDictListDetailByNameApi(element.name).then(
          res => {
            switch (element.option) {
              case 1: _this.optionsJCPJ = res.data; break;//检查评价
            }
          },
          error => {
            // reject(error);
          })
      });
    },
  },
  mounted() {
    this.getTableData()
    // 获取抽屉
    this.getDrawerList([
      { name: '检查评价', option: 1 }
    ])
  }
}
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>