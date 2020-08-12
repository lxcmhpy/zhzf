<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <div>
          <el-form :model="searchForm" ref="searchForm" label-width="80px" size="small">
            <el-row>
              <el-col :span="6">
                <el-form-item label="单位名称" prop="organizationName">
                  <el-input v-model="searchForm.organizationName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label-width="10px">
                  <el-button type="primary" size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                  <el-button
                    type="primary"
                    size="medium"
                    icon="el-icon-refresh-left"
                    @click="reset"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-row style="margin-left:15px;">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="onAdd">新增</el-button>
        <el-button type="warning" size="medium" icon="el-icon-delete" @click="onDelete">删除</el-button>
      </el-row>
      <div class="tablePart">
        <el-table
          ref="singleTable"
          :data="tableData"
          style="width: 100%"
          height="100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="organizationName" label="机构名称" align="center" width="150"></el-table-column>
          <el-table-column prop="startNumber" label="号段起" align="center"></el-table-column>
          <el-table-column prop="endNumber" label="号段止" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center" width="180"></el-table-column>
          <el-table-column prop="op" label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="onEdit(scope.row)"
              >修改</el-button>
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

    <el-dialog
      title="新增/编辑"
      :visible.sync="visible"
      @close="visible = false"
      :close-on-click-modal="false"
      width="45%"
    >
      <div>
        <el-form ref="handleForm" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构名称" prop="organizationName">
                <el-input v-model="form.organizationName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="号段起" prop="startNumber">
                <el-input v-model="form.startNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="号段止" prop="endNumber">
                <el-input v-model="form.endNumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="form.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitData()">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import {
  queryNumberList,
  saveOrUpdateNumber,
  findNumberById,
  deleteNumberById,
  deleteNumberByIds,
} from "@/api/device/number.js";

export default {
  data() {
    return {
      searchForm: {
        organizationName: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      visible: false,
      form: {},
      rules: {
        organizationName: [
          { required: true, message: "请选择机构 ", trigger: "change" },
        ],
        startNumber: [
          { required: true, message: "请输入号段起始值", trigger: "blur" },
        ],
        endNumber: [
          { required: true, message: "请输入号段终止值", trigger: "change" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onAdd() {
      this.form = {};
      this.visible = true;
    },
    onEdit(row) {
      this.form = row;
      this.visible = true;
    },
    submitData() {
      let _this = this;
      this.$refs["handleForm"].validate((valid) => {
        if (valid) {
          debugger;
          saveOrUpdateNumber(_this.form).then(
            (res) => {
              _this.$message({ type: "success", message: "操作成功!" });
              _this.visible = false;
              _this.getDataList({});
            },
            (err) => {
              console.log(err);
            }
          );
        }
      });
    },
    onDelete() {
      let ids = [];
      this.multipleSelection.forEach((item) => {
        ids.push(item.id);
      });
      let _this = this;
      deleteNumberByIds(ids).then(
        (res) => {
          _this.$message({ type: "success", message: "删除成功!" });
          _this.getDataList({});
        },
        (error) => {
          console.log(error);
        }
      );
    },
    reset() {
      this.$refs["searchForm"].resetFields();
    },
    //获取已归档的数据
    getDataList(searchData) {
      let data = searchData;
      data.current = this.currentPage;
      data.size = this.pageSize;
      let _this = this;
      queryNumberList(data).then(
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
  },
  created() {
    this.getDataList({});
  },
};
</script>
