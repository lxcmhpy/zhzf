<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="deliverReForm" ref="deliverReForm">
            <el-form-item>
              <el-button type="primary" icon="add" size="medium" @click="handleAdd">新增送达回证</el-button>
            </el-form-item>
            <el-form-item label="送达文书名称" prop="docName">
              <el-input v-model="deliverReForm.docName"></el-input>
            </el-form-item>
            <el-form-item label="送达日期" prop="servedDate" label-width="113px">
              <el-date-picker v-model="deliverReForm.servedDate" type="date" placeholder="选择送达日期" style="width: 290px">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="送达方式" prop="servedType">
              <el-select v-model="deliverReForm.servedType">
                <el-option v-for="item in servedTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDeliverReList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart table_tr_overflow">
        <el-table :data="tableData" stripe style="width: 100%" highlight-current-row height="100%">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column prop="docName" label="送达文书" align="center" width="200"></el-table-column>
          <el-table-column prop="servedDate" label="送达日期" align="center"></el-table-column>
          <el-table-column prop="address" label="送达地点" align="center"></el-table-column>
          <el-table-column prop="servedType" label="送达方式" align="center"></el-table-column>
          <el-table-column prop="server" label="受/代送达人" align="center"></el-table-column>
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
        background :page-sizes="[10, 20, 30, 40]" 
        layout="prev, pager, next,sizes,jumper" 
        :total="total"></el-pagination>
      </div>
    </div>
    <!-- 添加弹出框 -->
    <!-- <el-dialog title="新增送达回证" :visible.sync="addVisible" width="60%" v-loading="addLoading" :before-close="handleClose">
      <div>
        <div>
          <el-form ref="form" :model="form" :rules="addrules">
            <el-form-item label="案号" prop="caseId" label-width="80px">
              <el-input v-model="form.caseId" disabled></el-input>
            </el-form-item>
            <el-form-item label="案由" prop="caseReason" label-width="80px">
              <el-input v-model="form.caseReason" disabled></el-input>
            </el-form-item>
            <el-form-item label="送达单位" prop="address" label-width="80px">
              <el-input v-model="form.address" disabled></el-input>
            </el-form-item>
            <el-form-item label="接收方式" prop="receiveType" label-width="80px">
              <el-select v-model="form.receiveType" style="width: 49%">
                <el-option
                  v-for="item in receiveTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input v-model="form.servedUser" disabled style="width: 50%"></el-input>
            </el-form-item>
            <el-table :data="changeableTable" border style="margin-left: 80px;width: 90.5%">
              <el-table-column label="送达文书名称、案号">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.docName"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="送达地点">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.address"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="送达日期">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.servedDate"
                    type="datetime"
                    placeholder="选择日期时间" style="width: 100%">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="送达方式">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.receiveType">
                    <el-option
                      v-for="item in servedTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column width="52%" >
                <template slot-scope="scope">
                  <el-button size="mini" icon="el-icon-circle-close" circle @click="handleRow(scope.$index, scope.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button icon="el-icon-circle-plus-outline" @click="addTableData" circle type="info" style="margin-left: 48%;margin-top: 10px"></el-button>
            <el-form-item label="文书备注" size="large" prop="remark" label-width="80px" style="margin-top:10px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 42%">
            <el-button size="medium" type="primary" @click="submitForm('form')">提  交</el-button>
            <el-button size="medium" @click="addVisible=false">取  消</el-button>
        </div>
      </div>
    </el-dialog> -->
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'deliverReceiptForm'" @showdeliverReceiptForm="showdeliverReceiptForm"></caseSlideMenu>

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
        </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mapGetters } from "vuex";
import {
  findByCaseIdAndDocIdApi
} from "@/api/caseHandle";
import iLocalStroage from "@/common/js/localStroage";
export default {
  data() {
    const isSelect = (rule, value, callback) => {
      if (value == undefined) {
        return callback(new Error("请选择"));
      } else {
        callback();
      }
    };
    return {
      pdfVisible: false,
      closeDialog: false,
      mlList: "",
      host:'',
      servedTypeOptions: [],//送达方式
      receiveTypeOptions: [],//接收方式
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总数
      tableData: [],
      deliverReForm: {
        docName: "",
        servedDate: "",
        servedType: "",
      },
      form: {},
      uForm: {},
      addVisible: false,
      editVisible: false,
      addLoading: false,
      addrules: {
        receiveType: [
          { required: true, message: '接收方式不能为空', trigger: 'blur', validator: isSelect },
          { required: true, message: '接收方式不能为空', trigger: 'change', validator: isSelect },
        ]
      }
    };
  },
  computed: { ...mapGetters(['caseId']) },
  components: {
    caseSlideMenu,
  },
  methods: {
    handleRow(index, row) {
      this.changeableTable.splice(index, 1)
    },
    addTableData() {
      let addData = { tab1: '111', tab2: '2222', show: true };
      this.changeableTable.push({ tab1: '111', tab2: '2222', show: true })
    },
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.insertDeliverR();
        }
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    handleAdd(index, row) {
      //带入表单值
      this.form = {};
      this.changeableTable = [
        { docName: '', address: '', servedDate: '', receiveType: '' },
        { docName: '', address: '', servedDate: '', receiveType: '' },
      ];
      // this.addVisible = true;
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({name:'case_handle_deliveryCertificate'});
    },
    handleEdit(index, row) {
    debugger
        let data = {
            caseId:row.caseId,
            // docId: row.caseSerProofId,
            docId:'2c9029cf6931aa5c01693381ac690018'
        };
        let _that = this
        findByCaseIdAndDocIdApi(data).then(res=>{
            debugger
            _that.mlList = _that.host + res.data[0].storageId;

        },err=>{
            console.log(err);
        })
        this.indexPdf = 0;
        this.pdfVisible = true
    },
    //表单筛选
    getDeliverReList(val) {
      debugger
      console.log('caseId=',this.caseId)
      this.currentPage = val;
      let data = {
        caseId: this.caseId,
        docName: this.deliverReForm.docName,
        servedDate: this.deliverReForm.servedDate == "" ? "" : this.formatDateStr(this.deliverReForm.servedDate),
        //servedDate : "2019-11-11 00:00:00",
        servedType: this.deliverReForm.servedType,
        current: this.currentPage,
        size: this.pageSize
      };      
      console.log('data',data)
      let _this = this
      this.$store.dispatch("getDeliverReceipt", data).then(res => {
        console.log("111",res.data.records);
        _this.tableData = res.data.records;
        _this.total = res.data.total;
      });
    },
    //插入证据
    insertDeliverR() {
      console.log(this.changeableTable)
      console.log(this.form)
      let datetime = this.changeableTable[0].servedDate;
      let data = {
        id: this.randomString(32),
        caseId: this.randomString(32),
        servedDate: datetime == "" ? "2020-02-02 10:00:00" : this.formatDateStr(datetime)
      };
      let _this = this
      this.$store.dispatch("saveOrUpdateDeliverReceipt", data).then(res => {
        if (res.code == 200) {
          _this.$message({
            message: '添加成功！',
            type: 'success'
          });
          _this.addVisible = false;
          _this.currentPage = 1;
          _this.getDeliverReList();
        } else {
          _this.$message.error('出现异常，添加失败！');
        }
      });
    },
    // 重置
    resetSearch() {
      this.$refs["deliverReForm"].resetFields();
    },

    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDeliverReList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getDeliverReList(val);
    },
    randomString(e) {
      e = e || 32;
      const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length;
      let res = "";
      for (let i = 0; i < e; i++) {
        res += t.charAt(Math.floor(Math.random() * a));
      }
      return res;
    },
    formatDateStr(val) {
      if (val == null) {
        return null;
      }
      let date = new Date(val);
      let Y = date.getFullYear() + '-';
      let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate();
      // let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      // let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      // let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      // let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      // return Y + M + D + h + m + s;
       return Y + M + D;
    },
    //点击送达回证列表，显示弹框
    showdeliverReceiptForm() {
      this.$refs.deliverReceiptFormRef.showModal();
    },
    viewDocPdf(row) {
        debugger
        console.log('row',row)
        let routerData = {
          hasApprovalBtn: false,
          // docId: row.caseSerProofId,
          docId: '2c9029cf6931aa5c01693381ac690018',
          approvalOver: false,
          hasBack: true,
          docDataId:row.caseSerProofId,
        };
        debugger
        this.$store.dispatch("deleteTabs", this.$route.name);
        this.$router.push({ name: "case_handle_myPDF", params: routerData });
      },
  },
  mounted() {
    // this.setDepartTable(this.data)
    this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST
  },
  created() {
    this.getDeliverReList();
    let _this = this
    //初始化代码集
    this.$store.dispatch("getDictionary", "61ac9ded9e0fab4a6626963e59e7ae6d").then(res => {
      for (let item of res.data) {
        _this.servedTypeOptions.push({ value: item.name, label: item.notes });
      }
    });
    this.$store.dispatch("getDictionary", "aae6cdcab4962c49752305ad1124fae2").then(res => {
      for (let item of res.data) {
        _this.receiveTypeOptions.push({ value: item.name, label: item.notes });
      }
    });

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
    box-sizing: border-box;
    padding-top: 0px;
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
