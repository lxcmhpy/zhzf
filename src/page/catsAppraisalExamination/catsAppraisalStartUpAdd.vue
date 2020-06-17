<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" :model="batchForm" :rules="rules" ref="batchForm">
            <el-form-item label="检查名称" prop="batchName">
              <el-input placeholder="请输入检查名称" v-model="batchForm.batchName" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="所属年份" prop="batchYear">
              <el-input placeholder="请输入所属年份" v-model="batchForm.batchYear" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="案件基数(省)" prop="khjs">
              <el-input placeholder="请输入案件基数" v-model="batchForm.khjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="抽取基数(省)" prop="cqjs">
              <el-input placeholder="请输入抽取基数" v-model="batchForm.cqjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="人员基数(省)" prop="personNum">
              <el-input placeholder="请输入人员基数" v-model="batchForm.personNum" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="人员抽取数(省)" prop="personCq">
              <el-input placeholder="请输入人员抽取数" v-model="batchForm.personCq" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="人员考试数(省)" prop="personKs">
              <el-input placeholder="请输入人员考试数" v-model="batchForm.personKs" :readonly="isView"></el-input>
            </el-form-item>
          </el-form>
          <div :hidden="isView">
            <el-button type="primary" icon="el-icon-plus" @click="addItem">新增指标</el-button>
            <el-button type="primary" @click="saveOrUpdate('batchForm')">保存</el-button>
          </div>
        </div>
      </div>
      <div class="tablePart">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="案卷评查配置" name="案卷评查">
            <el-table
              :data="dataList1"
              stripe
              resizable
              border
              style="width: 100%;height:100%;"
              row-key="id"
            >
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" :readonly="isView"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120" v-if="!isView">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="自查自评配置" name="自查自评">
            <el-table
              :data="dataList2"
              stripe
              resizable
              border
              style="width: 100%;height:100%;"
              row-key="id"
            >
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" :readonly="isView"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120" v-if="!isView">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="网上评查配置" name="网上评查">
            <el-table
              :data="dataList3"
              stripe
              resizable
              border
              style="width: 100%;height:100%;"
              row-key="id"
            >
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" :readonly="isView"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120" v-if="!isView">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="现场检查配置" name="执法考试">
            <el-table
              :data="dataList4"
              stripe
              resizable
              border
              style="width: 100%;height:100%;"
              row-key="id"
            >
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" :readonly="isView"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120" v-if="!isView">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog
        title="指标树"
        :visible.sync="visible"
        @close="closeDialog"
        :close-on-click-modal="false"
        width="50%"
      >
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="selectItems">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mixinsCommon } from "@/common/js/mixinsCommon";
import {
  addOrUpdatePykhBatch,
  getMetricsTreeData,
  findListVoByDetails
} from "@/api/catsAppraisalStartUp.js";
import iLocalStroage from "@/common/js/localStroage";
import { numType } from "@/common/js/validator";
export default {
  mixins: [mixinsCommon],
  data() {
    return {
      activeName: "案卷评查",
      isView: false,
      batchForm: {
        batchName: "",
        batchYear: "",
        khjs: "",
        cqjs: "",
        personNum: "",
        personCq: "",
        personKs: ""
      },
      rules: {
        batchName: [
          { required: true, message: "请输入检查名称", trigger: "blur" }
        ],
        khjs: [
          { required: true, message: "请输入案件基数", trigger: "blur" },
          { validator:numType , trigger: "blur"}
        ],
        cqjs: [
          { required: true, message: "请输入案件/抽取基数", trigger: "blur" },
          { validator:numType , trigger: "blur"}
        ],
        personNum: [
          { required: true, message: "请输入人员基数", trigger: "blur" },
          { validator:numType , trigger: "blur"}
        ],
        personCq: [
          { required: true, message: "请输入人员抽取数", trigger: "blur" },
          { validator:numType , trigger: "blur"}
        ],
        personKs: [
          { required: true, message: "请输入人员考试数", trigger: "blur" },
          { validator:numType , trigger: "blur"}
        ]
      },
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      visible: false,
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    addItem() {
      this.visible = true;
      this.data2 = []
      getMetricsTreeData(this.activeName).then(
        res => {
          this.data2 = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    closeDialog() {
      this.visible = false;
    },
    selectItems() {
      let datas = this.$refs.tree.getCheckedNodes();
      if (this.activeName === "案卷评查") {
        this.addItems(datas, this.dataList1);
      } else if (this.activeName === "自查自评") {
        this.addItems(datas, this.dataList2);
      } else if (this.activeName === "网上评查") {
        this.addItems(datas, this.dataList3);
      } else {
        this.addItems(datas, this.dataList4);
      }
      this.visible = false;
    },
    addItems(datas, dataList) {
      datas.forEach(item => {
        if (item.lev === 3) {
          let existsData = dataList.find(data => {
            if (data.indexThreeId === item.id) {
              return data;
            }
          });
          if (!existsData) {
            let selectData = {};
            selectData.indexOne = item.name1;
            selectData.indexOneId = item.id1;
            selectData.indexTwo = item.name2;
            selectData.indexTwoId = item.id2;
            selectData.nrxm = item.label;
            selectData.indexThreeId = item.id;
            selectData.assessType = this.activeName;
            dataList.push(selectData);
          }
        }
      });
    },
    saveOrUpdate(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tableData = [];
          if(_this.dataList1.length===0){
            _this.$message({
              type: "warning",
              message: "请填写案卷评查配置"
            });
            return;
          } 
          if(_this.dataList2.length===0){
            _this.$message({
              type: "warning",
              message: "请填写自查自评配置"
            });
            return;
          }
          if(_this.dataList3.length===0){
            _this.$message({
              type: "warning",
              message: "请填写网上评查配置"
            });
            return;
          }
          if(_this.dataList4.length===0){
            _this.$message({
              type: "warning",
              message: "请填写现场检查配置"
            });
            return;
          } 
          tableData = _this.dataList1
            .concat(_this.dataList2)
            .concat(_this.dataList3)
            .concat(_this.dataList4);
          let errorData =  tableData.filter(item=>{if(item.score==="" || item.score=== undefined){return item}});
          if(errorData.length > 0){
            _this.$message({
              type: "warning",
              message: "请输入子页签分数"
            });
            return;
          }
          _this.batchForm.listDetailsForm = tableData;
          addOrUpdatePykhBatch(_this.batchForm).then(
            res => {
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.$store.dispatch("deleteTabs", _this.$route.name);//关闭当前页签
              _this.$router.push({
                      name: this.$route.params.url
                  });
              },
            err => {
              console.log(err);
            }
          );
        }
      });
    },
    deletePykhBatchById(row) {
      if (row.assessType === "案卷评查") {
        this.dataList1 = this.dataList1.filter(
          item => item.indexThreeId !== row.indexThreeId
        );
      } else if (row.assessType === "自查自评") {
        this.dataList2 = this.dataList2.filter(
          item => item.indexThreeId !== row.indexThreeId
        );
      } else if (row.assessType === "网上评查") {
        this.dataList3 = this.dataList3.filter(
          item => item.indexThreeId !== row.indexThreeId
        );
      } else {
        this.dataList4 = this.dataList4.filter(
          item => item.indexThreeId !== row.indexThreeId
        );
      }
    },
    init() {
      console.log("this.$route.params", this.$route.params);
      if (this.$route.params.type === "0") {
        this.isView = false;
        let year = new Date().getFullYear();
        this.batchForm.batchYear = year;
      } else {
        this.isView = true;
        this.batchForm = this.$route.params;
        let _that = this;
        findListVoByDetails({ batchId: this.$route.params.id }).then(
          res => {
            res.data.forEach(item => {
              if (item.assessType === "案卷评查") {
                _that.dataList1.push(item);
              } else if (item.assessType === "自查自评") {
                _that.dataList2.push(item);
              } else if (item.assessType === "网上评查") {
                _that.dataList3.push(item);
              } else {
                _that.dataList4.push(item);
              }
            });
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
