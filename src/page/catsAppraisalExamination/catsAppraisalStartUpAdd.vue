<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" :model="batchForm" :rules="rules" ref="batchForm">
            <el-form-item label="批次名称" prop="batchName">
              <el-input placeholder="请输入批次名称" v-model="batchForm.batchName"></el-input>
            </el-form-item>
            <el-form-item label="批次所属年份" prop="batchYear">
              <el-input placeholder="请输入批次所属年份" v-model="batchForm.batchYear" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="案件基数" prop="khjs">
              <el-input-number placeholder="请输入案件基数" v-model="batchForm.khjs"></el-input-number>
            </el-form-item>
            <el-form-item label="抽取基数" prop="cqjs">
              <el-input-number placeholder="请输入抽取基数" v-model="batchForm.cqjs"></el-input-number>
            </el-form-item>
            <el-form-item label="人员基数" prop="personNum">
              <el-input-number placeholder="请输入人员基数" v-model="batchForm.personNum"></el-input-number>
            </el-form-item>
            <el-form-item label="人员抽取数" prop="personCq">
              <el-input-number placeholder="请输入人员抽取数" v-model="batchForm.personCq"></el-input-number>
            </el-form-item>
            <el-form-item label="人员考试数" prop="personKs">
              <el-input-number placeholder="请输入人员考试数" v-model="batchForm.personKs"></el-input-number>
            </el-form-item>
            <el-form-item label="发布日期" prop="showBatchDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="batchForm.showBatchDate"></el-date-picker>
            </el-form-item>
          </el-form>
          <el-button type="primary" size="medium" icon="el-icon-plus" @click="addItem">新增指标</el-button>
        </div>
      </div>
      <div class="tablePart">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="案卷评查配置" name="case">
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
                  <el-input-number v-model="scope.row.score" placeholder="请输入数值"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="自查自评配置" name="self">
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
                  <el-input-number v-model="scope.row.score" placeholder="请输入数值"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="网上评查配置" name="onLine">
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
                  <el-input-number v-model="scope.row.score" placeholder="请输入数值"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="现场检查配置" name="offLine">
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
                  <el-input-number v-model="scope.row.score" placeholder="请输入数值"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="120">
                <template slot-scope="scope">
                  <el-button type="text" @click="deletePykhBatchById(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-button type="primary" @click="saveOrUpdate('batchForm')">保存</el-button>
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
  findListVoByConfig
} from "@/api/catsAppraisalStartUp.js";
import iLocalStroage from "@/common/js/localStroage";
export default {
  mixins: [mixinsCommon],
  data() {
    return {
      activeName: "case",
      batchForm: {
        batchName: "",
        batchYear: "",
        khjs: "",
        cqjs: "",
        personNum: "",
        personCq: "",
        personKs: "",
        showBatchDate: ""
      },
      rules: {
        batchName: [
          { required: true, message: '请输入批次名称', trigger: 'blur' }
        ],
        khjs: [
          { required: true, message: '请输入案件基数', trigger: 'blur' }
        ],
        cqjs: [
          { required: true, message: '请输入案件/抽取基数', trigger: 'blur' }
        ],
        personNum: [
          { required: true, message: '请输入人员基数', trigger: 'blur' }
        ],
        personCq: [
          { required: true, message: '请输入人员抽取数', trigger: 'blur' }
        ],
        personKs: [
          { required: true, message: '请输入人员考试数', trigger: 'blur' }
        ],
        showBatchDate: [
          { type: 'date', required: true, message: '请选择发布', trigger: 'change' }
        ]
      },
      dataList1: [],
      dataList2: [],
      dataList3: [],
      dataList4: [],
      visible: false,
      data2: [
        {
          id: 1,
          lev: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              lev: 2,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  lev: 3,
                  name1:"一级 1",
                  id1:1,
                  name2:"二级 1-1",
                  id2:4,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  lev: 3,
                  name1:"一级 1",
                  id1:1,
                  name2:"二级 1-1",
                  id2:4,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    addItem() {
      this.visible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    closeDialog() {
      this.visible = false;
    },
    selectItems() {
      let datas = this.$refs.tree.getCheckedNodes();
      if(this.activeName === "case"){
        this.addItems(datas,this.dataList1)
      }else if(this.activeName === "self"){
        this.addItems(datas,this.dataList2)
      }else if(this.activeName === "onLine"){
        this.addItems(datas,this.dataList3)
      }else{
        this.addItems(datas,this.dataList4)
      }
      this.visible = false
    },
    addItems(datas,dataList){
      datas.forEach(item => {
        if(item.lev===3){
          let existsData = dataList.find(data => {
            if(data.threeId === item.id){
              return data
            }
          })
          if(!existsData){
            let selectData = {};
            selectData.indexOne = item.name1
            selectData.indexOneId = item.id1
            selectData.indexTwo = item.name2
            selectData.indexTwoId = item.id2
            selectData.nrxm = item.label
            selectData.indexThreeId = item.id
            selectData.assessType = this.activeName
            dataList.push(selectData)
          }
        }
      });
    },
    saveOrUpdate(formName){
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tableData = []
          tableData = _this.dataList1.concat(_this.dataList2).concat(_this.dataList3).concat(_this.dataList4)
          _this.batchForm.listDetailsForm = tableData     
          addOrUpdatePykhBatch(_this.batchForm).then(
              res => {
                _this.$message({
                  type: "success",
                  message:"添加成功!"
                });
              },
              err => {
                console.log(err);
              }
            );
          }
      });
    },
    deletePykhBatchById(row){
      if(row.dataType === "case"){
         this.dataList1 = this.dataList1.filter(item => item.threeId!==row.threeId)
      }else if(row.dataType === "self"){
          this.dataList2 = this.dataList2.filter(item => item.threeId!==row.threeId)
      }else if(row.dataType === "onLine"){
          this.dataList3 = this.dataList3.filter(item => item.threeId!==row.threeId)
      }else{
          this.dataList4 = this.dataList4.filter(item => item.threeId!==row.threeId)
      }
    },
    init(){
      console.log('this.$route.params',this.$route.params)
      if(this.$route.params.type==="0"){
        let year = new Date().getFullYear()
        this.batchForm.batchYear=year
      }
    }
  },
  mounted () {
    this.init()
  },
};
</script>
