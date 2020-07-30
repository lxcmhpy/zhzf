<template>
    <div class="propery-dialog">

        <el-dialog title="案件信息" :visible.sync="caseVisible" @close="caseVisible = false" :close-on-click-modal="false" width="60%">
            <el-row style="height:32px;line-height:32px;"><span style="font-size:16px;">关联案件：</span>
                <el-tag v-for="tag in multipleSelection" :key="tag.caseNumber" closable @close="toggleSelection([tag])">
                    {{tag.caseNumber}}
                </el-tag>
            </el-row>
            <!-- <el-divider></el-divider> -->
            <div>
                <div>
                    <el-form :model="searchForm" ref="searchForm" class="caseSearchForm">
                        <el-row>
                            <el-col :span="3">
                                <el-form-item label-width="0">
                                    <span style="font-size:16px;">选择案件：</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="案号" label-width="60px">
                                    <el-input v-model="searchForm.caseNumber"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="当事人/单位" label-width="110px">
                                    <el-input v-model="searchForm.party"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="违法行为" label-width="90px">
                                    <el-input v-model="searchForm.caseCauseName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="1">
                                <el-form-item label-width="0">
                                    <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="tablePart table_tr_overflow">
                    <el-table ref="caseTable" :data="tableData" stripe style="width: 100%" highlight-current-row  height="300px" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"> </el-table-column>
                        <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
                        <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
                        <el-table-column prop="caseCauseName" label="违法行为" align="center">
                            <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" placement="top-start">
                                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                                <span>{{scope.row.caseCauseName}}</span>
                            </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
                    </el-table>
                </div>
                <div class="paginationBox">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="total"></el-pagination>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="caseVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleCaseData()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="财物处理" :visible.sync="propertyVisible" @close="propertyVisible = false" :close-on-click-modal="false" width="50%">
            <div>
                <el-form ref="handleForm" :model="handleForm" label-width="90px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="处理方式">
                                <el-radio-group v-model="handleForm.handleWay">
                                    <el-radio 
                                    v-for="(item,index) in handleWayList"
                                    :key="index"
                                    :label="item">
                                        {{item}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="其他">
                                <el-input type="textarea" v-model="handleForm.other"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propertyVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveHandleWayData()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
        searchForm:{
            caseNumber:"",
            party:"",
            caseCauseName:""
        },
        tableData: [],
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        total: 0, //总数
        hideSomeSearch: true,
        caseVisible: false,
        propertyVisible: false,
        handleForm: {
            ids: "",
            caseIds: "",
            handleWay:"",
            other:""
        },
        caseData: "",
        isSaveLink: '',
        caseLinktypeId:'',
        handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
        multipleSelection:[]
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取机构下数据
    getCaseList2(searchData) {
      let data = searchData;
    //   data.flag = 0;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
      //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCaseList2({});
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseList2({});
    },
    toggleSelection(rows) {
        if (rows.length > 0 ) {
            rows.forEach(row => {
                this.$refs.caseTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.caseTable.clearSelection();
        }
    },
    showModal(type,data,caseLinktypeId,isSaveLink) {
      console.log(data);
      if(type === 'case'){
          this.caseVisible = true;
          this.getCaseList2({});
      }else{
          this.propertyVisible = true;
      }
      
      this.caseData = data;
      this.isSaveLink = isSaveLink;
      this.caseLinktypeId = caseLinktypeId;

    },
    //关闭弹窗的时候清除数据
    closeDialog(type) {
        if(type === 'case'){
            this.caseVisible = false;
        }else{
            this.propertyVisible = false;
        }
    },
    searchEmit(){
      this.getCaseList2(this.searchForm);
    },
    handleCaseData(){
        this.$emit("handle-case-data", this.multipleSelection);
        this.closeDialog("case");
    },
    // 获取绑定的数据
    // getCaseData () {
    //     return $util.clone(this.table.multipleSelection, true);
    // },
    saveHandleWayData() {
      
    }

  },
  mounted() { }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
<style lang="scss" scoped src="@/assets/css/propertyManage.scss"></style>