<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
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
                <!-- <object >
                    <embed class="print_info" style="padding:0px;width: 790px;margin:0 auto;height:1150px !important" name="plugin" id="plugin"
                    :src="mlList" type="application/pdf" internalinstanceid="29">
                </object> -->
                <iframe :src="'/static/pdf/web/viewer.html?file='+encodeURIComponent(pdfUrl)" frameborder="0" style="width:790px;height:1119px"></iframe>
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
import iLocalStroage from "@/common/js/localStroage";
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
                pdfUrl:'',
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
            async handleEdit(index, row) {

              let data = {
                    caseId:this.caseId,
                    docId: this.tableData[index].caseDoctypeId,
                };
              let _that = this
              let  thisStorageIdRes= await findByCaseIdAndDocIdApi(data)
              _that.pdfUrl = await this.$util.com_getFileStream(thisStorageIdRes.data[0].storageId)
              this.indexPdf = 0;
              this.pdfVisible = true

            },
            //表单筛选
            getDocList() {

                let data = {
                    caseBasicinfoId:this.caseId,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let _this = this
                this.$store.dispatch("getDocument", data).then(res => {
                    _this.tableData = res.data.records;
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
              console.log('row',row)
              let routerData = {
                hasApprovalBtn: false,
                docId: row.caseDoctypeId,
                approvalOver: false,
                hasBack: true,
                docDataId:row.id,
                status:2
              };
              this.$store.dispatch("deleteTabs", this.$route.name);
              this.$router.push({ name: "case_handle_myPDF", params: routerData });
            },
        },
        mounted() {
        },
        created() {
            this.getDocList();
        }
    };
</script>
<style lang="scss" src="@/assets/css/systemManage.scss" scoped></style>
<style lang="scss" scoped>
/*   @import "@/assets/css/systemManage.scss"; */
  .paginationF{
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;
    text-align: center;
  }
  .tablePartF{
    height: 90%;
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
