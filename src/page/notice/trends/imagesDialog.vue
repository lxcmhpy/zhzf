<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="visible = false"
    :close-on-click-modal="false"
    width="60%"
    class="images-dialog"
  >
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="轮播图片">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :http-request="saveImageFile"
          >
            <img v-if="form.storageId" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="轮播次序" prop="orderNo">
          <el-input-number v-model="form.orderNo" :min="1" size="small"></el-input-number>
        </el-form-item>
        <el-form-item label="关联动态">
          <el-input v-model="form.dtId" style="display:none"></el-input>
          <el-table ref="singleTable" :data="tableData" highlight-current-row height="200">
            <el-table-column prop="title" label="标题" align="center"></el-table-column>
            <el-table-column prop="source" label="来源" align="center"></el-table-column>
            <el-table-column prop="publishTime" label="发布日期" align="center"></el-table-column>
            <el-table-column prop="state" label="状态" align="center">
              <template slot-scope="scope">{{allStatus[scope.row.state]}}</template>
            </el-table-column>
            <el-table-column prop="op" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.id == form.dtId" type="text" style="color:#67c23a">当前选择</el-button>
                <el-button
                  v-else
                  type="text"
                  @click="handleCurrentChange(scope.row)"
                  :disabled="scope.row.organName && scope.row.id !== selected"
                >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
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
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleData()">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { findLBTNotice } from "@/api/notice/notice";
import { upload, deleteFileByIdApi } from "@/api/notice/upload";
import Util from "@/api/notice/util";
export default {
  data() {
    return {
      form: {},
      rules: {},
      visible: false,
      title: "",
      tableData: [],
      allStatus: { 1: "草稿", 2: "待审核", 3: "已通过", 4: "已退回" },
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      searchForm: {},
      imgUrl: "",
      selected: "",
    };
  },
  methods: {
    showModal(type, data) {
      this.title = type === 1 ? "新增" : "编辑";
      this.form = data;
      this.selected = this.form.dtId;
      if (this.form.storageId)
        Util.com_getFileStream(this.form.storageId).then((res) => {
          this.imgUrl = res;
        });
      //   this.current = data.dtId;
      this.visible = true;
      this.searchForm = {
        type: 0,
        state: 3,
      };
      this.getDataList(this.searchForm);
    },
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findLBTNotice(data).then(
        (res) => {
          _this.total = res.data.total;
          _this.tableData = res.data.records;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDataList(this.searchForm);
    },
    //更换页码
    handlePageSizeChange(val) {
      this.currentPage = val;
      this.getDataList(this.searchForm);
    },
    handleCurrentChange(row) {
      this.form.dtId = row.id;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },

    saveImageFile(param) {
      let _this = this;
      if (this.form.storageId) {
        this.deleteFile().then((res) => {
          _this.saveFile(param, "轮播图片");
        });
      } else {
        _this.saveFile(param, "轮播图片");
      }
    },
    saveFile(param, type) {
      var fd = new FormData();
      fd.append("file", param.file);
      fd.append("category", "公告系统");
      fd.append("fileName", param.file.name);
      fd.append("status", type); //传记录id
      fd.append("caseId", param.file.name + new Date().getTime()); //传记录id
      fd.append("docId", param.file.name + new Date().getTime()); //传记录id
      let _this = this;
      upload(fd).then(
        (res) => {
          _this.$set(_this.form, "storageId", res.data[0].storageId);
          Util.com_getFileStream(res.data[0].storageId).then((res) => {
            _this.imgUrl = res;
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //删除附件
    async deleteFile() {
      let res = await deleteFileByIdApi(this.form.storageId);
      this.form.storageId = "";
    },

    handleData() {
      this.$emit("handle-data", this.form);
      this.closeDialog();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.images-dialog {
  .avatar-uploader {
    >>> .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      border: 1px dashed #cccccc;
      margin-left: 0px;
    }
    .avatar {
      width: 150px;
      height: 80px;
      display: block;
    }
  }
}
</style>