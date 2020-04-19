<template>
  <div class="add_dialog">
    <div class="add_dialog_content">
      <div class="step_content">
        <el-steps :active="1" finish-status="success" class="steps">
          <el-step title="选择案件"></el-step>
          <el-step title="移送详情"></el-step>
        </el-steps>
      </div>

      <div class="border_blue"></div>
      <el-form :model="caseData" :rules="rules" ref="caseData" label-width="100px" class="demo-ruleForm">
        <div class="content_bg">

          <el-form-item label="案号">
            {{caseData.caseNumber || '-'}}
            <el-button class="re_select" size="small" @click="reSelect" plain>重新选择</el-button>
          </el-form-item>
          <el-form-item label="案由">
            {{(caseData.party || caseData.partyName) + (caseData.caseCauseName || '-')}}
          </el-form-item>
        </div>
        <el-form-item label="目标机构" class="is-required">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="organType">
                <el-select @change="changOrganType" v-model="caseData.organType" placeholder="机构类型">
                  <el-option label="执法机构" value="执法机构"></el-option>
                  <el-option label="公安机关" value="公安机关"></el-option>
                  <el-option label="司法机关" value="司法机关"></el-option>
                  <el-option label="其他部门" value="其他部门"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="17">
              <el-form-item prop="organMb">
                <el-input :disabled=" caseData.organType ? false : true " v-model="caseData.organMb"
                          v-if="caseData.organType!='执法机构'"></el-input>
                <div v-if="caseData.organType=='执法机构'" @click="visibleOrgan = true">
                  <el-input disabled v-model="caseData.organMb"
                            placeholder="选择目标机构"
                            style="cursor: pointer!important;" class="pointer"></el-input>
                </div>
                <el-dialog
                  title="选择目标机构"
                  :visible.sync="visibleOrgan"
                  @close="visibleOrgan = false"
                  :close-on-click-modal="false"
                  width="40%"
                  append-to-body
                >
                  <div class="chooseLawPer">
                    <div class="choosed">
                      <p>
                        <span>已选</span>
                      </p>
                      <div>
                        <el-tag v-if="checkedOrgan !== ''" closable
                                :disable-transitions="false" @close="deleteUser()">{{checkedOrgan}}
                        </el-tag>
                      </div>
                    </div>
                    <div class="choose">
                      <p>
                        <span>全部</span>
                      </p>
                      <el-input class="input-with-select" v-model="filterText">
                        <el-button slot="append" icon="el-icon-search" @click="findOrgan()"></el-button>
                      </el-input>
                      <div class="organList">
                        <!--<el-checkbox-->
                        <!--:indeterminate="isIndeterminate"-->
                        <!--v-model="checkAll"-->
                        <!--@change="handleCheckAllChange"-->
                        <!--&gt;全选-->
                        <!--</el-checkbox>-->
                        <div style="margin: 15px 0;"></div>
                        <el-tree
                          :data="organList"
                          show-checkbox
                          check-strictly
                          node-key="id"
                          ref="organTree"
                          :filter-node-method="filterNode"
                          @check-change="handleCheckChange">
                        </el-tree>

                      </div>
                    </div>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="visibleOrgan = false">取 消</el-button>
                    <el-button type="primary" @click="submitOrgan()">确 定</el-button>
                  </span>
                </el-dialog>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="移送原因" prop="copyReason" class="is-required">
          <el-form-item>
            <el-radio v-model="caseData.copyReason" label="重大、疑难案件" @change="changeReason"></el-radio>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="caseData.copyReason" label="违法行为涉嫌犯罪" @change="changeReason"></el-radio>
          </el-form-item>
          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="3">
                <el-form-item>
                  <el-radio v-model="caseData.copyReason" label="其他原因" @change="changeReason"></el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="19">
                <el-form-item :prop="caseData.copyReason == '其他原因' ? 'otherReason' :''">
                  <el-input v-model="caseData.otherReason"
                            :disabled="caseData.copyReason == '其他原因' ? false :true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

        </el-form-item>

        <el-form-item label="附件">
          <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :http-request="uploadPaymentVoucher" :show-file-list="false">
            <el-button size="small" type="primary">选取文件</el-button>
            <ul>
              <li v-for="item in fileListArr" :key="item.id">{{item.fileName}}
                <span ><i @click="deleteFile(item)" class="el-icon-circle-close"></i></span>
              </li>
            </ul>
          </el-upload> -->
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                     :http-request="uploadPaymentVoucher" :show-file-list="false">
            <el-button size="small" type="primary">选取文件</el-button>
          </el-upload>
          <ul>
            <li v-for="item in fileListArr" :key="item.id">{{item.fileName}}
              <span><i @click="deleteFile(item)" class="el-icon-circle-close"></i></span>
            </li>
          </ul>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="caseData.notes"></el-input>
        </el-form-item>
        <div class="send_message">
          <div class="left margin_right_66">
            <div class="title">
              <div class="list_icon"><img src="../../../../static/images/img/personInfo/icon_wenshu.svg" alt=""></div>
              <center class="list_name">文书（{{checkedFiles.length}}/{{fileList.length}}）</center>
              <!-- docs -->
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedFiles" @change="handleCheckedFilesChange">
                <el-checkbox v-for="(item,index) in fileList" :label="item" :key="index">{{item.docName}}
                  <!-- {{item.docNote}}
                  <span v-if="item.docNote==''">{{item.docName}}</span> -->
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="left">
            <div class="title">
              <div class="list_icon"><img src="../../../../static/images/img/personInfo/icon_zhengju.svg" alt=""></div>
              <center class="list_name">证据附件（0/9）</center>
              <!-- zjfj -->
            </div>
            <div class="list">
              <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="handleCheckAllChange2">全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedFiles2" @change="handleCheckedFilesChange2">
                <el-checkbox v-for="(item,index) in evdenceList" :label="item.storageId" :key="index">{{item.fileName}}
                  <!-- {{item.docNote}}
                  <span v-if="item.docNote==''">{{item.docName}}</span> -->
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
        <center>
          <el-button type="primary" @click="submitForm('caseData')"
                     style="width:174px;margin-bottom:74px;margin-top:70px">提交
          </el-button>
        </center>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="visible" @close="visible = false" :close-on-click-modal="false" width="420px">
      <div>
        <el-row>
          <el-col :span="2">
            <!-- <i class="el-icon-question" style="color:red;"></i> -->
            <img src="../../../../static/images/img/tip_wenhao.png" alt="" style="margin-top:5px">
          </el-col>
          <el-col :span="22">
            <p style="line-height:28px">
              提交成功后，案件将移送至目标机构。<br/>
              是否确认提交?
            </p>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goSubmit('caseData')">确认</el-button>
        <el-button @click="visible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import iLocalStroage from "@/common/js/localStroage";
  import {AddEditTransferCaseApi, getFinishDocByIdApi, getFinishEvdenceByIdApi} from "@/api/caseHandle";
  import {uploadEvApi, findFileByIdApi, deleteFileByIdApi, getFile} from "@/api/upload";
  // const fileOptions = ['上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊上海啊啊啊啊啊啊啊啊啊', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        caseData: {
          person: 'ceshiyixia',
          caseNumber: '',
          caseCauseName: '',
          organType: '',
          organMb: '',
          appendix: '',
          copyReason: '',
          otherReason: '',
          docs: '',
          zjfj: '',
          notes: '',
          // createTime: new Date()
        },
        checkAll: false,
        checkAll2: false,
        checkedFiles: [],
        checkedFiles2: [],
        files: [],
        fileOptions: [],
        evdenceOptions: [],
        isIndeterminate: true,
        isIndeterminate2: true,
        uploadFileList: [],
        fileList: [],
        evdenceList: [],
        userInfo: iLocalStroage.gets('userInfo'),
        fileListArr: [], //已上传的附件
        visible: false,
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          organType: [
            {required: true, message: '请选择机构类型', trigger: 'blur'}
          ],
          organMb: [
            {required: true, message: '请输入目标机构', trigger: 'blur'}
          ],
          copyReason: [
            {required: true, message: '请选择移送原因', trigger: 'blur'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ],
          otherReason: [
            {required: true, message: '请填写原因', trigger: 'blur'}
          ]
        },
        visibleOrgan: false,
        checkedOrgan: '',
        organList: [],
        checkedOrganName: '',
        filterText: ''
      };
    },
    methods: {
      reSelect() {
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.replace({
          name: "addSelect",
        });
      },
      changOrganType() {
        this.caseData.organMb = "";
      },
      submitForm(formName) {
        this.visible = true;
      },
      goSubmit(formName) {
        console.log(this.caseData)
        // 附件
        let appendixList = []
        this.fileListArr.forEach(element => {
          appendixList.push(element.fileName)
        });
        this.caseData.appendix = appendixList.join(',')
        console.log(this.caseData)

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.caseData.docs = '';
            this.caseData.zjfj = '';
            // 文书列表
            let docsList = [];
            this.checkedFiles.forEach(element => {
              docsList.push(element.id);
            });
            this.caseData.docs = docsList.join('@');
            // 证据列表
            let zjfjList = [];
            this.checkedFiles.forEach(element => {
              zjfjList.push(element.id);
            });
            this.caseData.zjfj = zjfjList.join('@');
            AddEditTransferCaseApi(this.caseData).then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "sucess",
                  message: "提交成功"
                });
                this.$store.dispatch("deleteTabs", this.$route.name);
                this.$router.replace({
                  name: "caseTransfer",
                });
              }
              else {
                this.$message({
                  type: "error",
                  message: "添加失败"
                });
              }
            }, err => {
              console.log(err);
            })
          } else {
            this.$message({
              type: "error",
              message: "请完善表单信息"
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //获取机构
      getAllOrgan(organId) {
        let _this = this
        this.$store.dispatch("getAllOrgan").then(
          res => {

            _this.organList = res.data
          },
          err => {
            console.log(err);
          }
        );
      },
      handleCheckChange(data, checked, node) {
        if (checked) {
          this.$refs.organTree.setCheckedNodes([data]);
          this.checkedOrgan = data.label
        } else {
          if (this.checkedOrgan === data.label) {
            this.checkedOrgan = ''
          }
        }
      },
      deleteUser() {
        this.checkedOrgan = ''
        this.$refs.organTree.setCheckedNodes([]);
      },
      changeLawOfficerCards(val, personData) {
        this.organList.forEach(item => {
          if (item.id === personData.id) {
            item.selectLawOfficerCard = val;
          }
        });
      },
      submitOrgan() {
        this.caseData.organMb = this.checkedOrgan
        this.visibleOrgan = false
      },
      findOrgan() {
        this.$refs.organTree.filter(this.filterText)
      },
      filterNode(value, data, node) {
        if (!value) {
          return true
        }
        let level = node.level
        let _array = [] //这里使用数组存储 只是为了存储值。
        this.getReturnNode(node, _array, value)
        let result = false
        _array.forEach(item => {
          result = result || item
        })
        return result
      },
      getReturnNode(node, _array, value) {
        let isPass = node.data && node.data.label && node.data.label.indexOf(value) !== -1
        isPass ? _array.push(isPass) : ''
        this.index++
        if (!isPass && node.level !== 1 && node.parent) {
          this.getReturnNode(node.parent, _array, value)
        }
      },
      handleCheckAllChange(val) {
        this.checkedFiles = val ? this.fileOptions : [];
        this.isIndeterminate = false;
        console.log('checkedFiles', this.checkedFiles)

      },
      handleCheckAllChange2(val) {
        this.checkedFiles2 = val ? this.evdenceOptions : [];
        this.isIndeterminate2 = false;
        console.log('checkedFiles2', this.checkedFiles2)
      },
      handleCheckedFilesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length;
        console.log('checkedFiles', this.checkedFiles)

      },
      handleCheckedFilesChange2(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.evdenceList.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.evdenceList.length;
        console.log('checkedFiles2', this.checkedFiles2)

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      //上传附件
      uploadPaymentVoucher(param) {
        console.log(param);
        if (this.fileListArr.length >= 3) {
          this.$message.warning('最多选择3个文件！');
          return;
        }
        const isLt2M = param.file.size / 1024 / 1024 < 10     //这里做文件大小限制
        if (!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
          return;
        }
        for (let i = 0; i < this.fileListArr.length; i++) {
          if (param.file.name == this.fileListArr[i].fileName) {
            this.$message.warning('不能上传同一个文件');
            return;
          }
        }
        var fd = new FormData()
        fd.append("file", param.file);
        fd.append('caseId', this.caseData.caseId)
        fd.append('docId', '2c9029e16c753a19016c755fe1340001');
        uploadEvApi(fd).then(
          res => {
            console.log(res);
            this.findFileList(res.data, true);
          },
          error => {
            console.log(error)

          }
        );
      },
      //删除附件
      deleteFile(data) {
        console.log('删除', data);
        deleteFileByIdApi(data.storageId).then(res => {
          console.log(res);
          this.findFileList();
        }, err => {
          console.log(err)
        })
      },
      //通过缴费凭证id 查询缴费凭证file
      findPaymentVoucher(id, isAdd) {
        findFileByIdApi(id).then(
          res => {
            console.log(res);
            this.fileListArr.push(res.data);
          },
          error => {
            console.log(error)
          }
        );
      },
      //通过案件ID和文书ID查询附件
      findFileList() {
        let data = {
          caseId: this.caseData.caseId,
          docId: "2c9029e16c753a19016c755fe1340001"
        }
        console.log(data);
        getFile(data).then(
          res => {
            console.log("附件列表", res);
            this.fileListArr = res.data;

          },
          error => {
            console.log(error);
          }
        )
      },
      // 原因变化
      changeReason() {
        console.log('reson')
        this.caseData.otherReason = "";
      },
    },
    created() {
      this.findFileList();
      this.getAllOrgan("root");
    },
    mounted() {
      console.log('选择的案件', this.$route.params)
      this.caseData = this.$route.params.caseData
      this.caseData.caseNumber = this.$route.params.caseData.caseNumber || this.$route.params.caseData.tempNo
      // this.caseData.caseCauseName = this.$route.params.caseData.caseCauseName
      this.caseData.caseId = this.$route.params.caseData.id
      // this.caseData.createTime = this.$route.params.caseData.createTime
      // this.caseData.acceptTime = this.$route.params.caseData.acceptTime
      // this.caseData.caseStatus = this.$route.params.caseData.caseStatus
      // this.caseData.vehicleShipId = this.$route.params.caseData.vehicleShipId
      // this.caseData.caseType = this.$route.params.caseData.caseType
      this.caseData.wfxw = this.$route.params.caseData.caseCauseName
      this.caseData.person = this.userInfo.nickName;
      console.log('表单', this.caseData)
      getFinishDocByIdApi(this.caseData.caseId).then(res => {
        console.log('文书列表', res.data);
        this.fileList = res.data;
        this.fileOptions = res.data;
        // this.files=res.data;

        // let hash = {};
        // res.data.forEach(curVal => {
        //    hash[curVal.docName] ? '' : hash[curVal.docName] = true && this.fileList.push(curVal);
        //     console.log(' this.fileList', this.fileList)
        // });
        // let flag = 1;
        // this.fileList.forEach(element => {
        //   element.flag = flag
        //   flag += 1;
        //   console.log(' this.fileList', this.fileList)
        // });

      }, err => {
        console.log(err);
      })
      getFinishEvdenceByIdApi(this.caseData.caseId).then(res => {
        console.log('zhengju', res);
        this.evdenceList = res.data
        this.evdenceOptions = res.data

      }, err => {
        console.log(err);
      })
      console.log('userInfo', this.userInfo)
    }
  }
</script>
<style lang="scss" scoped>
  /* @import "@/assets/css/caseHandle/index.scss"; */
  @import "@/assets/css/documentForm.scss";
</style>

<style scoped>
  .steps /deep/ .el-step__icon {
    font-size: 18px;
    width: 42px !important;
    height: 42px;
  }

  .steps /deep/ .is-process /deep/ .el-step__icon {
    background: #4573d0;
    color: #ffffff;
    border-color: #4573d0;
  }

  .steps /deep/ .el-step__head.is-success {
    color: #4573d0;
    border-color: #4573d0;
  }

  .steps /deep/ .el-step__title.is-success {
    color: #b2b2b2;
  }

  .steps /deep/ .el-step__icon /deep/ .el-step__icon-inner {
    font-weight: 400;
  }

  .steps /deep/ .el-step__main {
    white-space: normal;
    text-align: left;
    margin-top: -42px;
    margin-left: 42px;
    padding-left: 11px;
    width: 66px;
    z-index: 1;
    position: relative;
  }

  .steps /deep/ .el-step.is-horizontal .el-step__line {
    height: 2px;
    top: 21px;
    left: 128px;
    right: 26px;
  }

  .list /deep/ .el-checkbox__input {
    vertical-align: middle;
    position: absolute;
    top: 3px;
  }

  .list /deep/ .el-checkbox__label {
    width: calc(100% - 22px);
    padding-left: 22px;
    line-height: 20px;
    font-size: 14px;
    color: #20232b;
    font-weight: 600;
  }

  .pointer /deep/ .el-input__inner {
    cursor: pointer !important;
  }
</style>
