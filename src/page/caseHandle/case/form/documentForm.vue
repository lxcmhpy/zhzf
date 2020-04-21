<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <!--<div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="evidenceForm"  ref="evidenceForm">
            <el-form-item>
              <el-button type="primary" icon="add" size="medium"  @click="handleAdd">上传证据</el-button>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName">
              <el-input v-model="evidenceForm.evName"></el-input>
            </el-form-item>
            <el-form-item label="证据类型" prop="evType">
              <el-select v-model="evidenceForm.evType">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据状态" prop="status">
              <el-select v-model="value">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDocList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>-->
      <div class="tablePartF">
        <el-table :data="tableData" stripe height="100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="文书名称" align="center"></el-table-column>
          <el-table-column prop="createTime" label="保存日期" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
              <el-button type="text" @click="viewDocPdf(scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">打印</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'documentForm'" @showdocumentForm="showdocumentForm"></caseSlideMenu>
    <!-- 文书列表 -->
    <!-- <documentFormRef ref="documentFormRef"></documentFormRef> -->
     <el-dialog
        :visible.sync="pdfVisible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="1000px"
         >
        <div >
        <div style="height:auto;">
        <!-- <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image> -->
            <div lazy>
                <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList" type="application/pdf" internalinstanceid="29">
                </object>
            </div>
            <!-- <div style="position:absolute;bottom:150px;right: 20px;width:100px;">
            <el-button @click="updatePDF1">上一张</el-button><br><br>
            <el-button @click="updatePDF2">下一张</el-button>
            </div> -->
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import documentFormRef from "./documentFormRef";
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mapGetters } from "vuex";
import {
  findByCaseIdAndDocIdApi
} from "@/api/caseHandle";
    export default {
        data() {
            return {
                pdfVisible: false,
                closeDialog: false,
                value: "",
                //activeName: '1',
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                total: 0, //总数
                tableData: [],
                evidenceForm: {
                    evName: "",
                    evType: "",
                    status: ""
                },
                form: {},
                uForm: {},
                addVisible:false,
                editVisible: false,
                mlList: "",
                indexPdf: 0,
                host:"",
            };
        },
        components: {
          caseSlideMenu,
          // documentFormRef
        },
        computed: { ...mapGetters(['caseId']) },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            //查看  打印方法
            handleEdit(index, row) {
              debugger
              let data = {
                    caseId:this.caseId,
                    docId: this.tableData[index].caseDoctypeId,
                };
                let _that = this
              findByCaseIdAndDocIdApi(data).then(res=>{
                debugger
                _that.mlList = _that.host + res.data[0].storageId;
                // _that.mlList.push(_that.host + res.data[0].storageId)
                //   res.data.forEach((v)=>{
                //     debugger
                //   _that.mlList.push(_that.host + v.storageId)
                // })
              },err=>{
                console.log(err);
              })
               debugger
               console.log(_that.mlList);
              this.indexPdf = 0;
              this.pdfVisible = true

            },
            //表单筛选
            getDocList() {
              debugger
                let data = {
                    caseBasicinfoId:this.caseId,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let _this = this
                this.$store.dispatch("getDocument", data).then(res => {
                    _this.tableData = res.data.records;
                    debugger
                    _this.total = res.data.total;
                });
            },

            // 重置
            resetSearch() {
                this.$refs["evidenceForm"].resetFields();
            },

            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getDocList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getDocList();
            },
            //点击卷宗目录后 显示卷宗目录
            showdocumentForm() {
              this.$refs.documentFormRef.showModal();
            },
            viewDocPdf(row) {
              debugger
              console.log('row',row) 
              let routerData = {
                hasApprovalBtn: false,
                docId: row.caseDoctypeId,
                approvalOver: false,
                hasBack: true,
                docDataId:row.id
              };
              debugger
              this.$store.dispatch("deleteTabs", this.$route.name);
              this.$router.push({ name: "case_handle_myPDF", params: routerData });
            },
        },
        mounted() {
            // this.setDepartTable(this.data)
            this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
        },
        created() {
            this.getDocList();
        }
    };
</script>
<style lang="scss" scoped>
  @import "@/assets/css/systemManage.scss";
  .paginationF{
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;
    text-align: center;
  }
  .tablePartF{
    height: 100%;
    overflow: auto;
    padding-top: 0px;
    box-sizing: border-box;
  }
  .searchAndpageBox {
    padding: 5px 20px 50px 20px;
  }
  .fullscreen {
    .hasBigMarginRight{
      margin-right: 65px;
    }
  }
</style>
