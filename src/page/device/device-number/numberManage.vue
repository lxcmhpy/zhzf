<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox searchAndpageBox2">
      <div class="handlePart caseHandleSearchPart">
        <div>
          <el-form :model="searchForm" ref="searchForm" label-width="80px" size="small">
            <el-row>
              <el-col :span="6">
                <el-form-item label="单位名称" prop="organizationName">
                  <el-input style="display:none" v-model="searchForm.organizationName"></el-input>
                  <elSelectTree
                    ref="elSelectTreeObj1"
                    :options="tableDataTree"
                    :accordion="true"
                    :props="{label: 'label', value: 'id'}"
                    @getValue="hindleChanged1"
                  ></elSelectTree>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label-width="10px">
                  <el-button size="medium" icon="el-icon-search" @click="searchEmit"></el-button>
                  <el-button size="medium" icon="el-icon-refresh-left" @click="reset"></el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <el-row style="margin-left:15px;">
        <el-button type="primary" size="medium" icon="el-icon-plus" @click="onAdd">新增</el-button>
        <el-button type="success" size="medium" icon="el-icon-delete" @click="onDelete">删除</el-button>
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
              <el-form-item label="机构名称" prop="organizationId">
                <elSelectTree
                  ref="elSelectTreeObj"
                  :options="tableDataTree"
                  :accordion="true"
                  :props="{label: 'label', value: 'id'}"
                  :value="form.organizationId"
                  @getValue="hindleChanged"
                ></elSelectTree>
                <el-input style="display:none" v-model="form.organizationId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="号段起" prop="startNumber">
                <el-input
                  v-model="form.startNumber"
                  maxlength="8"
                  @input="setionChange('startNumber')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="号段止" prop="endNumber">
                <el-input v-model="form.endNumber" maxlength="8" @input="setionChange('endNumber')"></el-input>
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
import elSelectTree from "@/components/elSelectTree/elSelectTree";

export default {
  components: { elSelectTree },
  data() {
    const NumReg = /^[0-9]*$/;
    const validateSectionBegin = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入号段起"));
      } else {
        if (!NumReg.test(value)) {
          callback(new Error("号段起只能输入数字"));
        } else if (this.form.endNumber) {
          const diffVal = value - this.form.endNumber;
          if (diffVal > -1) {
            callback(new Error("号段起必须小于号段止"));
          } else {
            this.$refs.handleForm.clearValidate("endNumber");
            callback();
          }
        } else {
          callback();
          this.$refs.handleForm.validateField("endNumber");
        }
      }
    };
    const validateSectionEnd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入号段止"));
      } else {
        if (!NumReg.test(value)) {
          callback(new Error("号段止只能输入数字"));
        } else if (this.form.startNumber) {
          const diffVal = value - this.form.startNumber;
          if (diffVal <= 0) {
            callback(new Error("号段止必须大于号段起"));
          } else {
            this.$refs.handleForm.clearValidate("startNumber");
            callback();
          }
        }
      }
    };
    return {
      searchForm: {
        organizationName: "",
        organizationId: "",
      },
      tableData: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      total: 0, //总页数
      visible: false,
      form: {
        organizationId: "",
        startNumber: "",
        endNumber: "",
        remark: "",
      },
      rules: {
        organizationId: [
          { required: true, message: "请选择机构 ", trigger: "change" },
        ],
        startNumber: [
          { required: true, validator: validateSectionBegin, trigger: "blur" },
        ],
        endNumber: [
          { required: true, validator: validateSectionEnd, trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
      },
      multipleSelection: [],
      tableDataTree: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取机构树
    getOidTreeData() {
      let _this = this;
      _this.$store.dispatch("findOrganTreeByCurrUser").then(
        (res) => {
          _this.tableDataTree = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    // 所属机构切换
    hindleChanged(val) {
      this.form.organizationId = val;
      this.$refs.elSelectTreeObj.$children[0].handleClose();
    },
    hindleChanged1(val) {
      this.searchForm.organizationId = val;
      this.$refs.elSelectTreeObj1.$children[0].handleClose();
    },
    onAdd() {
      this.form = {};
      this.visible = true;
    },
    onEdit(row) {
      this.form = row;
      this.visible = true;
    },
    // 号段只能输入数字
    setionChange(name) {
      this.form[name] = this.form[name].replace(/[^\d]/g, "");
    },
    submitData() {
      let _this = this;
      this.$refs["handleForm"].validate((valid) => {
        if (valid) {
          debugger;
          _this.form.startNumber = prefixIntrger(_this.form.startNumber, 8);
          _this.form.endNumber = prefixIntrger(_this.form.endNumber, 8);
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
    this.getOidTreeData();
  },
};

function prefixIntrger(num, length) {
  return (Array(length).join("0") + num).slice(-length);
}
</script>
<style>
.el-button--success {
  color: #fff;
  background-color: #1aa08e;
  border-color: #1aa08e;
}
.el-button--success:focus,
.el-button--success:hover {
  background: #30b8a5;
  border-color: #30b8a5;
  color: #fff;
}
</style>
