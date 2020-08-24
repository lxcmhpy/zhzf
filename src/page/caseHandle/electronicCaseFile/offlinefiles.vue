<template>
  <div class="com_searchAndpageBoxPadding">
    <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
      <caseListSearch
        ref="archiveCaseSearch"
        @showSomeSearch="showSomeSearch"
        @searchCase="getArchiveCase"
        :caseState="'waitArchive'"
      ></caseListSearch>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%" highlight-current-row>
          <el-table-column prop="caseNumber" label="案号" align="center" width="200"></el-table-column>
          <el-table-column prop="vehicleShipId" label="车/船号" align="center" width="100"></el-table-column>
          <el-table-column prop="name" label="当事人/单位" align="center" width="150"></el-table-column>
          <el-table-column prop="caseCauseName" label="违法行为" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" placement="top-start">
                <div slot="content" style="max-width:200px">{{scope.row.caseCauseName}}</div>
                <span>{{scope.row.caseCauseName}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="acceptTime" label="是否上传卷宗" align="center" width="150"></el-table-column>
          <el-table-column prop="acceptTime" label="受案时间" align="center" width="150"></el-table-column>
          <el-table-column prop="closeDate" label="结案时间" align="center" width="100"></el-table-column>
          <el-table-column prop="caseType" label="案件类型" align="center" width="100"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" width="150">
              <el-button
                size="small"
                type="text"
                style="float:left;"
                @click="Edit_linepdf(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="small"
                type="text"
                style="float:left;"
                @click="Delete_linepdf(scope.$index, scope.row)"
              >删除</el-button>
              <el-upload
                class="upload-demo"
                action
                :http-request="saveFile_pdf"
                :on-remove="handleRemove_linepdf"
                :before-remove="beforeRemovepdf"
                :before-upload="beforeupload_linepdf"
                :on-success="uploadsuccess_linepdf"
                :show-file-list="false"
                accept=".pdf"
                multiple
                :limit="30"
                :file-list="fileList_pdf"
              >
                <el-button size="small" style="margin-left:5px;float:left;" type="text">上传</el-button>
              </el-upload>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox" v-if="tableData.length > 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageSizeChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadCommon } from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearchofflinefiles";
export default {
  data() {
    return {
      fileList_pdf: [],
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      hideSomeSearch: true,
    };
  },
  mixins: [mixinGetCaseApiList],
  components: {
    caseListSearch,
  },
  methods: {
    Edit_linepdf() {},
    Delete_linepdf() {},
    //：http-request 上传文件
    saveFile_pdf(param) {
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
    //pdf文件上传成功后
    uploadsuccess_linepdf(file, fileList) {
      console.log(file, fileList);
    },
    //上传文件前
    beforeupload_linepdf(file) {
      console.log("file.type", file.type);
      const isJPG = file.name.lastIndexOf(".pdf") != -1;
      if (!isJPG) {
        this.handleRemove_linepdf(file);
        this.$message.error("上传文件只能是 pdf 格式!");
      }
      return isJPG;
    },
    //移除文件
    handleRemove_linepdf(file, fileList) {
      //console.log(file, fileList);
    },
    //移除文件之前
    beforeRemovepdf(file, fileList) {
      //return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //获取已归档的数据
    getArchiveCase(searchData) {
      let data = searchData;
      data.flag = 5;
      data.userId = iLocalStroage.gets("userInfo").id;
      data.current = this.currentPage;
      data.size = this.pageSize;
      this.getCaseList(data);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getArchiveCase(this.$refs.archiveCaseSearch.caseSearchForm);
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getArchiveCase(this.$refs.archiveCaseSearch.caseSearchForm);
    },
    //展开
    showSomeSearch() {
      this.hideSomeSearch = !this.hideSomeSearch;
    },
    clickCase(row) {
      console.log(row);
      this.$store.commit("setCaseId", row.id);
      //设置案件状态不为审批中
      //   this.$store.commit("setCaseApproval", false);
      this.$router.push({
        name: "case_handle_electronicFileDetail",
      });
    },
  },
  created() {
    this.getArchiveCase({});
  },
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>

