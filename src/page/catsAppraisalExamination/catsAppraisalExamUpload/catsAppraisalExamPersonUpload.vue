<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <viewNotice ref="viewNoticeRef"></viewNotice>
        <div class="search">
          <el-form :label-position="labelPosition" :model="search" ref="form" label-width="160px" :inline="true" >
            <el-form-item label="姓名">
              <el-input v-model="search.staffName" clearable placeholder="请输入"></el-input>
            </el-form-item>
<!--            <el-form-item label="所属机构">-->
<!--              <el-input v-model="search.OId" clearable placeholder="请选择"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
              <el-form-item v-if="baosongStatus">
                <el-button type="primary" size="medium" icon="el-icon-plus"  @click="add_openDialog">新增</el-button>
              </el-form-item>
              <el-form-item v-if="baosongStatus">
                <el-link href="./static/excel/人员表.xlsx">
                  <el-button type="primary" size="medium" icon="el-icon-plus" >模板下载</el-button>
                </el-link>

              </el-form-item>
              <el-form-item v-if="baosongStatus">
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="uploadPerson"
                  :show-file-list="false"
                  accept=".xlsx"
                >
                  <el-button type="primary" size="medium" icon="el-icon-plus">批量导入</el-button>
                </el-upload>
              </el-form-item>
            <el-form-item v-if="baosongStatus">
              <el-button type="primary" size="medium" @click="clickBaosong">报送</el-button>
            </el-form-item>

          </el-form>
        </div>

        <div class="tablePart">
          <!-- @row-click="handleNodeClick" -->
          <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
            <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
<!--            <el-table-column prop="enforcementCertificate" label="执法证号" align="center"></el-table-column>-->
            <el-table-column prop="maritimeNo" label="现持海事执法证号" align="center"></el-table-column>
            <el-table-column prop="ministerialNo" label="现持部级执法证号" align="center"></el-table-column>
            <el-table-column prop="provinceNo" label="现持省内执法证号" align="center"></el-table-column>
            <el-table-column  label="状态" align="center">
              <template slot-scope="scope">
                <el-tag type="success" v-show="scope.row.bsStatus==1">已报送</el-tag>
                <el-tag type="warning" v-show="scope.row.bsStatus==0">未报送</el-tag>
                <el-tag type="success" v-show="scope.row.staffStatus==1">已抽取</el-tag>
                <el-tag type="warning"  v-show="scope.row.staffStatus==0">未抽取</el-tag>
              </template>
            </el-table-column>
              <el-table-column label="操作" align="center" width="120" v-if="baosongStatus">
                <template  slot-scope="scope">
                  <el-button type="text" @click.stop @click="update_openDialog(scope.row)" v-show="scope.row.staffStatus==0">修改</el-button>
                  <el-button type="text" @click.stop @click="deleteStaff(scope.row)" v-show="scope.row.staffStatus==0">删除</el-button>
                  <el-upload
                    class="upload-demo"
                    accept=".jpg, .png"
                    :show-file-list="false"
                    v-show="scope.row.staffStatus==1"
                    :http-request="(params)=>saveFile(params,scope.row)"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :limit="1">
                    <el-button size="small" type="primary">上传照片</el-button>
                  </el-upload>
                  <el-button type="text" @click.stop @click="view(scope.row)" v-show="scope.row.staffStatus==1 && scope.row.fjStatus==1">查看照片</el-button>
                </template>
              </el-table-column>
          </el-table>
        </div>

        <div class="paginationBox" >
          <div v-if="total/dataList.length > 1">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="current"
              :page-sizes="[20, 40, 60, 80,100]"
              :page-size=this.size
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div>

        <el-dialog :visible.sync="visible" title="人员报送" width="480px" >
          <el-form :label-position="labelPosition" :model="form" :rules="rules" ref="formRY" label-width="160px">
            <!-- <el-form-item label="选择检查名称">
              <el-select v-model="form.batchId" placeholder="请选择" >
                <el-option v-for="(item,index) in batchList" :key="index" :label="item.batchName" :value="item.id"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="姓名" prop="staffName">
              <el-input placeholder="请输入姓名" v-model.trim="form.staffName" ></el-input>
            </el-form-item>
<!--            <el-form-item label="执法证号" prop="operator" >-->
<!--              <el-input placeholder="请输入执法证号" v-model.trim="form.enforcementCertificate" ></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="身份证号" prop="idCard" >
              <el-input placeholder="请输入身份证号" v-model.trim="form.idCard" ></el-input>
            </el-form-item>

            <el-form-item label="现持海事执法证号" prop="maritimeNo" >
              <el-input placeholder="请输入现持海事执法证号" v-model.trim="form.maritimeNo" ></el-input>
            </el-form-item>

            <el-form-item label="现持部级执法证号" prop="ministerialNo" >
              <el-input placeholder="请输入现持部级执法证号" v-model.trim="form.ministerialNo" ></el-input>
            </el-form-item>
            <el-form-item label="现持省内执法证号" >
              <el-input placeholder="请输入现持省内执法证号" v-model.trim="form.provinceNo" ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button @click="addOrUpdatePykhStaff"  type="primary" class="btn-custom" >
              <span>确 定</span>
            </el-button>
          </div>
        </el-dialog>

      </div>
      <el-dialog title="查看" :visible.sync="dialogVisible" style="width:430px;height:640px;">
        <img width="413px" height="626px" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhStaffByPage,importPerson,addOrUpdatePykhStaff,findAllDepartment,confirmSubmissionStaff,deletePykhStaff} from "@/api/catsAppraisalExamPersonUpload.js";
  import {StaffAndCaseFile } from "@/api/catsAppraisalExamCaseUpload.js";
  import iLocalStroage from '@/common/js/localStroage';
  import viewNotice from "../noticeManage/viewNotice";
  import {validateIDNumber,isInteger_8_10,isInteger_10} from '@/common/js/validator';

  export default {
    mixins: [mixinsCommon],
    components: {
      viewNotice
    },
    data() {
      return {
        current:1,
        size:20,
        total:0,
        search:{
          staffName:"",
          OId:""
        },
        organList:[],
        organId:'',
        dataList:[],
        visible:false,
        labelPosition: 'right',
        form:{
          Oid: '',
          enforcementCertificate:'',
          idCard:'',
          maritimeNo:'',
          ministerialNo:'',
          provinceNo:'',
          staffName:''
        },
        baosongStatus:true,
        dialogImageUrl:'',
        dialogVisible: false,
        uploadHeaders: {
          'Authorization': ''
        },
        rules: {
            staffName: [
                {required: true, message: "请输入姓名", trigger: "blur"}
            ],
            idCard: [
                { required: true, message: "身份证号不能为空", trigger: "blur" },
                { validator: validateIDNumber, trigger: "blur" }
            ],
            ministerialNo:[{ validator: isInteger_8_10, trigger: "blur" }],
            maritimeNo: [{ validator: isInteger_10, trigger: "blur" }],
        }
      }
    },

    methods: {
      saveFile(param, row) {
        var fd = new FormData();
        fd.append("file", param.file);
        fd.append("userId", iLocalStroage.gets("userInfo").id);
        fd.append("category", "人员报送");
        fd.append("docId", row.staffId);
        fd.append("storageId", row.storageId===null?'':row.storageId);
        let _this = this
        StaffAndCaseFile(fd).then(res => {
          if (res.code == 200){
            row.storageId = res.data
            row.fjStatus = '1'
          }else{
            _this.$message.error('出现异常，添加失败！');
          }
        });
      },
      view(row){
        this.dialogImageUrl = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST +row.storageId;
        this.dialogVisible = true;
      },
      fetchData(data){
        data.current=this.current;
        data.size=this.size;
        data.OId=this.organId;
        findPykhStaffByPage(data).then(res=>{
          console.info("根据条件分页查询人员列表:",res);
          if(res.code==200){
            this.dataList=res.data.records;
            this.total=res.data.total;
            this.current=res.data.current;
          }
        });
      },
      download_excel(){
      },
      handleSizeChange(val) {
        this.size=val;
        this.fetchData({});
      },
      handleCurrentChange(val) {
        this.current=val;
        this.fetchData({});
      },
      resetSearch(){
        this.search={
          staffName:"",
            OId:""
        }
      },
      searchData(){
        let data={};
        data.staffName=this.search.staffName;
        data.OId=this.search.OId;
        this.fetchData(data);
      },
      uploadPerson(param) {
        console.log(param);
        var fd = new FormData();
        fd.append("file", param.file);
        fd.append("oId",this.organId)
        importPerson(fd).then(
          res => {
            console.log(res);
            if(res.code==200){
                this.$message({type: "success",message: res.msg});
                this.fetchData({})
            }else{
              this.$message({type: "error",message:res.msg});
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      add_openDialog() {
        this.visible = true;
        this.form = {
          batchId:'',
          OId: this.organId,
          enforcementCertificate: '',
          idCard: '',
          maritimeNo: '',
          ministerialNo: '',
          provinceNo: '',
          staffName: ''
        }
      },
      update_openDialog(data){
        this.form=data;
        this.visible=true;
      },
      addOrUpdatePykhStaff(){
          let _this =this;
          this.$refs['formRY'].validate((valid) => {
              if (valid) {
                    addOrUpdatePykhStaff(this.form).then(res=>{
                        console.info("保存报送人员结果：",res)
                        if(res.code==200){
                            this.visible=false;
                            this.fetchData({});
                        }
                    })
               } else {
                    _this.errorMsg("信息填写错误！", 'error');
                    _this.closeLoading();
                    return false;
                }
        })
      },
      deleteStaff(data){
        var that =this;
        let staffId=data.staffId;
        console.info(staffId)
        deletePykhStaff(staffId).then(res=>{
          if(res.code==200){
            that.errorMsg(res.msg,"success")
            this.fetchData({});
          }else{
            that.errorMsg(res.msg,"error")
          }
        });
      },
      findPersonBsStatus(){
        let data={}
        data.OId=this.organId;
        data.bsStatus=1;
        findPykhStaffByPage(data).then(res=>{
          if(res.code==200){
            if(res.data.total>0){
              this.baosongStatus=false;
            }
          }
        });

      },
      clickBaosong(){
        confirmSubmissionStaff(this.organId).then(res=>{
          if(res.code==200){
            this.$message({type: "success",message: res.msg});
            this.findPersonBsStatus();
            this.fetchData({});
          }else{
            this.$message({type: "error",message: res.msg});
          }
        });
      }

    },
    mounted () {
      let userInfo = iLocalStroage.gets("userInfo");
      console.info("userinfo:",userInfo)
      this.organId = userInfo.organId;
      let data={}
      // data.OId=this.organId;
      this.findPersonBsStatus();
      this.fetchData(data);

      // findAllDepartment(this.organId).then(res=>{
      //   console.info("组织机构：",res);
      //   if(res.code=200){
      //     this.organList=res.data
      //   }
      // });
    },

  }
</script>
