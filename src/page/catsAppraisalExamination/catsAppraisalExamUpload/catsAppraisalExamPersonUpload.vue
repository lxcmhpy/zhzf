<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" >
            <el-form-item label="姓名">
              <el-input v-model="search.batchNo" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="search.batchNo" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="执法证号">
              <el-input v-model="search.batchNo" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="所属机构">
              <el-input v-model="search.batchNo" clearable placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus"  @click="add_openDialog">新增</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus">模板下载</el-button>
            </el-form-item>
            <el-form-item>
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

          </el-form>
        </div>

        <div class="tablePart">
          <!-- @row-click="handleNodeClick" -->
          <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
            <el-table-column prop="staffName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="enforcementCertificate" label="执法证号" align="center"></el-table-column>
            <el-table-column prop="maritimeNo" label="现持海事执法证号" align="center"></el-table-column>
            <el-table-column prop="ministerialNo" label="现持部级执法证号" align="center"></el-table-column>
            <el-table-column prop="provinceNo" label="现持省内执法证号" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template  slot-scope="scope">
                <el-button type="text" @click.stop @click="update_openDialog(scope.row)">修改</el-button>
                <el-button type="text" @click.stop @click="deletePykhBatchById(scope.row)">删除</el-button>
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
              :page-sizes="[this.size, 2*this.size, 3*this.size, 4*this.size]"
              :page-size=this.size
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
          <div class="noMore" v-else>没有更多了</div>
        </div>

        <el-dialog :visible.sync="visible" title="人员报送" width="480px" >
          <el-form :label-position="labelPosition" :model="form" ref="form" label-width="160px">
            <el-form-item label="选择批次" prop="operator" >
              <el-input placeholder="批次ID" v-model.trim="form.batchId" ></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="operator" >
              <el-input placeholder="请输入姓名" v-model.trim="form.staffName" ></el-input>
            </el-form-item>
            <el-form-item label="执法证号" prop="operator" >
              <el-input placeholder="请输入执法证号" v-model.trim="form.enforcementCertificate" ></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="operator" >
              <el-input placeholder="请输入身份证号" v-model.trim="form.idCard" ></el-input>
            </el-form-item>

            <el-form-item label="现持海事执法证号" prop="operator" >
              <el-input placeholder="请输入现持海事执法证号" v-model.trim="form.maritimeNo" ></el-input>
            </el-form-item>

            <el-form-item label="现持部级执法证号" prop="operator" >
              <el-input placeholder="请输入现持部级执法证号" v-model.trim="form.ministerialNo" ></el-input>
            </el-form-item>
            <el-form-item label="现持省内执法证号" prop="operator" >
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
    </div>
  </div>
</template>

<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhStaffByPage,importPerson} from "@/api/catsAppraisalExamPersonUpload.js";
  import iLocalStroage from '@/common/js/localStroage';

  export default {
    mixins: [mixinsCommon],
    data() {
      return {
        current:1,
        size:2,
        total:0,
        search:{},
        organId:'',
        dataList:[],
        visible:false,
        labelPosition: 'right',
        form:{
          batchId:'',
          enforcementCertificate:'',
          idCard:'',
          maritimeNo:'',
          ministerialNo:'',
          provinceNo:'',
          staffName:''
        },
        uploadHeaders: {
          'Authorization': ''
        },
        uploadUrl: '/pykh/excel/importPerson',
      }
    },

    methods: {
      fetchData(data){
        data.current=this.current;
        data.size=this.size;
        findPykhStaffByPage(data).then(res=>{
          console.info("根据条件分页查询人员列表:",res);
          if(res.code==200){
            this.dataList=res.data.records;
            this.total=res.data.total;
            this.current=res.data.current;
          }
        });
      },
      handleSizeChange(val) {
        var this_size=this.size;
        this.size=val;
        this.fetchData({});
        this.size=this_size;
      },
      handleCurrentChange(val) {
        this.current=val;
        this.fetchData({});
      },
      resetSearch(){
        this.search={};
      },
      searchData(){

      },
      uploadPerson(param) {
        console.log(param);
        var fd = new FormData();
        fd.append("file", param.file);
        importPerson(fd).then(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        );
      },
      add_openDialog() {
        this.visible = true;
        this.form = {
          batchId: '',
          enforcementCertificate: '',
          idCard: '',
          maritimeNo: '',
          ministerialNo: '',
          provinceNo: '',
          staffName: ''
        }
      },
      addOrUpdatePykhStaff(){

      },
    },
    mounted () {
      let userInfo = iLocalStroage.gets("userInfo");
      console.info("userinfo:",userInfo)
      this.organId = userInfo.organId;
      let data={}
      // data.OId=this.organId;
      this.fetchData(data);
    },

  }
</script>
