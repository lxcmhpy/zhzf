<template>
  <div class="com_searchAndpageBoxPadding images-management">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <el-form
          :model="searchForm"
          ref="searchForm"
          style="width:100%"
          label-width="50px"
          size="small"
        >
          <el-row>
            <el-col :span="7">
              <el-form-item label="标题" prop="title">
                <el-input v-model="searchForm.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="10px">
                <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:10px;">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button type="primary" size="medium" icon="el-icon-delete" @click="onDeleteBatch">删除</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%"
          height="100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" align="center"></el-table-column>
          <el-table-column prop="图片" label="来源" align="center">
            <template slot-scope="scope">
              <el-image
                style="width: 80px; height: 80px"
                :src="host+scope.row.storageId"
                fit="fill"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="orderNo" label="轮播次序" align="center"></el-table-column>
          <el-table-column prop="state" label="启用状态" align="center">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="changeState(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="op" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onEdit(scope.row)" :disabled="scope.row.state===1">修改</el-button>
              <el-button type="text" @click="onDelete(scope.row)" :disabled="scope.row.state===1">删除</el-button>
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
    <imagesDialog ref="imagesDialog" @handle-data="onSubmit"></imagesDialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  findImages,
  saveOrUpdate,
  deleteById,
  deleteByIds,
} from "@/api/notice/turnImages";
import imagesDialog from "@/page/notice/trends/imagesDialog";

export default {
  components: { imagesDialog },
  data() {
    return {
      searchForm: {
        title: "",
        state: "",
        type: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      host: iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST,
      multipleSelection: [],
    };
  },
  methods: {
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      findImages(data).then(
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
    searchEmit() {
      this.getDataList(this.searchForm);
    },
    reset() {
      this.$refs["searchForm"].resetFields();
      debugger;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    changeState(row) {
      let res = saveOrUpdate(row);
      this.$message({ type: "success", message: "操作成功!" });
    },
    onAdd() {
      this.form = {
        id: "",
        title: "",
        orderNo: "",
        state: "",
        dtId: "",
      };
      this.$refs.imagesDialog.showModal(1, this.form);
    },
    async onDeleteBatch() {
      let ids = [];
      if (this.multipleSelection.length < 1) {
        this.$message({ type: "warning", message: "请选择记录!" });
        return;
      }
      let flag = false; //标记是否有不满足提交的记录，如不满足，则返回，不允许操作
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let item = this.multipleSelection[i];
        if (item.state === 1) {
          flag = true;
          break;
        }
        ids.push(item.id);
      }
      if (flag) {
        this.$message({
          type: "error",
          message: "只允许删除未启用状态的记录!",
        });
        return;
      }
      let res = await deleteByIds(ids);
      this.$message({ type: "success", message: "操作成功!" });
      this.load();
    },
    onEdit(row) {
      this.$refs.imagesDialog.showModal(2, row);
    },
    async onSubmit(data) {
      debugger;
      let res = saveOrUpdate(data);
      this.$message({ type: "success", message: "保存成功!" });
      debugger;
      this.load();
    },

    async onDelete(row) {
      let _this = this;
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "el-icon-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          deleteById(row.id).then(
            (res) => {
              _this.$message({ type: "success", message: "删除成功!" });
              _this.load();
            },
            (error) => {
              console.log(error);
            }
          );
        })
        .catch(() => {});
    },

    load() {
      this.getDataList({});
    },
  },
  created() {},
  mounted() {
    this.load();
  },
};
</script>

