<template>
  <div class="cats-layout-page-content">
    <div class="searchAndpageBox toggleBox" style="overflow-y:auto;">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" :model="batchForm" :rules="rules" ref="batchForm" label-width="140px">
            <el-form-item label="检查名称" prop="batchName">
              <el-input placeholder="请输入检查名称" v-model="batchForm.batchName" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="所属年份" prop="batchYear">
              <el-input placeholder="请输入所属年份" v-model="batchForm.batchYear" :readonly="isView"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="案卷基数" prop="ajBsjs">
              <el-input placeholder="请输入案卷基数" v-model="batchForm.ajBsjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="案卷抽取基数" prop="ajCqjs">
              <el-input placeholder="请输入抽取基数" v-model="batchForm.ajCqjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="结案开始时间" prop="ajJaDate">
              <el-date-picker v-model="batchForm.ajJaDate" type="date" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd" :readonly="isView"></el-date-picker>
            </el-form-item>
            <br>
            <el-form-item label="处罚或强制" prop="ajCfBsjs">
              <el-input v-model="batchForm.ajCfBsjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="抽取" prop="ajCfCqjs">
              <el-input v-model="batchForm.ajCfCqjs" :readonly="isView"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="行政审批" prop="ajQzBsjs">
              <el-input v-model="batchForm.ajQzBsjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="抽取" prop="ajQzCqjs">
              <el-input v-model="batchForm.ajQzCqjs" :readonly="isView"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="执法人员基数" prop="ryBsjs">
              <el-input v-model="batchForm.ryBsjs" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item class="ryZjProtion" label="各级机构领导班子成员最低比例" prop="ryZjProtion">
              <el-input v-model="batchForm.ryZjProtion" :readonly="isView"></el-input>
            </el-form-item>
            <el-form-item label="抽取考试人员基数" prop="ryCqjs">
              <el-input v-model="batchForm.ryCqjs" :readonly="isView"></el-input>
            </el-form-item>
          </el-form>
          <div :hidden="isView" style="margin-bottom: 10px;">
            <el-button type="primary" icon="el-icon-plus" @click="addItem">新增指标</el-button>
            <el-button type="primary" @click="saveOrUpdate('batchForm')">保存</el-button>
          </div>
        </div>
      </div>
      <div class="tablePart" style="height:auto !important;overflow-y:hidden;">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="案卷评查配置" name="案卷评查">
            <el-table :data="dataList1" stripe resizable border style="width: 100%;height:100%;" row-key="id">
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" @blur="validateScore(scope.row)" :readonly="isView"></el-input>
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
            <el-table :data="dataList2" stripe resizable border style="width: 100%;height:100%;" row-key="id">
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" @blur="validateScore(scope.row)" :readonly="isView"></el-input>
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
            <el-table :data="dataList3" stripe resizable border style="width: 100%;height:100%;" row-key="id">
              <el-table-column prop="indexOne" label="一级指标" align="center"></el-table-column>
              <el-table-column prop="indexTwo" label="二级指标" align="center"></el-table-column>
              <el-table-column prop="nrxm" label="三级指标" align="center"></el-table-column>
              <el-table-column prop="score" label="分数" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.score" placeholder="请输入数值" @blur="validateScore(scope.row)" :readonly="isView"></el-input>
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
      <el-dialog title="指标树" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="50%">
        <el-tree :data="data2" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps">
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="selectItems">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  addOrUpdatePykhBatch,
  getMetricsTreeData,
  findListVoByDetails
} from '@/api/pykh/catsAppraisalStartUp.js'
import iLocalStroage from '@/common/js/localStroage'
import { numType1, numCompareList } from '@/common/js/validator'
export default {
  data() {
    let _this = this
    return {
      activeName: '案卷评查',
      isView: false,
      batchForm: {},
      rules: {
        batchName: [
          {
            required: true,
            message: '请输入检查名称',
            trigger: 'blur'
          }
        ],
        ajBsjs: [
          {
            required: true,
            message: '请输入案卷基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [parseInt(this.batchForm.ajCfBsjs) + parseInt(this.batchForm.ajQzBsjs)],
                ['='],
                rule,
                value,
                callback
              ),
            trigger: 'blur'
          }
        ],
        ajCfBsjs: [
          {
            required: true,
            message: '请输入行政处罚案卷基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [this.batchForm.ajBsjs],
                ['='],
                rule,
                parseInt(value) + parseInt(this.batchForm.ajQzBsjs ? this.batchForm.ajQzBsjs : 0),
                callback
              ),
            trigger: 'blur'
          }
        ],
        ajQzBsjs: [
          {
            required: true,
            message: '请输入行政强制案卷基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [this.batchForm.ajBsjs],
                ['='],
                rule,
                parseInt(value) + parseInt(this.batchForm.ajCfBsjs ? this.batchForm.ajCfBsjs : 0),
                callback
              ),
            trigger: 'blur'
          }
        ],
        ajCqjs: [
          {
            required: true,
            message: '请输入案卷抽取基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [
                  parseInt(this.batchForm.ajBsjs ? this.batchForm.ajBsjs : 0),
                  parseInt(this.batchForm.ajCfCqjs ? this.batchForm.ajCfCqjs : 0) +
                    parseInt(this.batchForm.ajQzCqjs ? this.batchForm.ajQzCqjs : 0)
                ],
                ['>=', '='],
                rule,
                value,
                callback
              ),
            trigger: 'blur'
          }
        ],
        ajCfCqjs: [
          {
            required: true,
            message: '请输入行政处罚案卷抽取基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [
                  parseInt(this.batchForm.ajCqjs ? this.batchForm.ajCqjs : 0) -
                    parseInt(this.batchForm.ajQzCqjs ? this.batchForm.ajQzCqjs : 0),
                  parseInt(this.batchForm.ajCfBsjs ? this.batchForm.ajCfBsjs : 0)
                ],
                ['=', '>='],
                rule,
                value,
                callback
              ),
            trigger: 'blur'
          }
        ],

        ajQzCqjs: [
          {
            required: true,
            message: '请输入行政强制案卷抽取基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [
                  parseInt(this.batchForm.ajCqjs ? this.batchForm.ajCqjs : 0) -
                    parseInt(this.batchForm.ajCfCqjs ? this.batchForm.ajCfCqjs : 0),
                  parseInt(this.batchForm.ajQzBsjs ? this.batchForm.ajQzBsjs : 0)
                ],
                ['=', '>='],
                rule,
                value,
                callback
              ),
            trigger: 'blur'
          }
        ],

        ryBsjs: [
          {
            required: true,
            message: '请输入执法人员基数',
            trigger: 'blur'
          },
          {
            validator: numType1,
            trigger: 'blur'
          }
        ],
        ryCqjs: [
          {
            required: true,
            message: '请输入执法人员抽取基数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) =>
              numCompareList(
                [parseInt(this.batchForm.ryBsjs ? this.batchForm.ryBsjs : 0)],
                ['>='],
                rule,
                value,
                callback
              ),
            trigger: 'blur'
          }
        ],
        ryZjProtion: [
          {
            required: true,
            message: '请输入领导班子成员比例',
            trigger: 'blur'
          },
          {
            validator: numType1,
            trigger: 'blur'
          }
        ]
      },
      dataList1: [],
      dataList2: [],
      dataList3: [],
      visible: false,
      data2: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    addItem() {
      this.visible = true
      this.data2 = []
      getMetricsTreeData(this.activeName).then(
        res => {
          this.data2 = res.data
        },
        err => {
          console.log(err)
        }
      )
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    closeDialog() {
      this.visible = false
    },
    selectItems() {
      let datas = this.$refs.tree.getCheckedNodes()
      if (this.activeName === '案卷评查') {
        this.addItems(datas, this.dataList1)
      } else if (this.activeName === '自查自评') {
        this.addItems(datas, this.dataList2)
      } else if (this.activeName === '网上评查') {
        this.addItems(datas, this.dataList3)
      }
      this.visible = false
    },
    addItems(datas, dataList) {
      datas.forEach(item => {
        if (item.lev === 3) {
          let existsData = dataList.find(data => {
            if (data.indexThreeId === item.id) {
              return data
            }
          })
          if (!existsData) {
            let selectData = {}
            selectData.indexOne = item.name1
            selectData.indexOneId = item.id1
            selectData.indexTwo = item.name2
            selectData.indexTwoId = item.id2
            selectData.nrxm = item.label
            selectData.score = ''
            selectData.indexThreeId = item.id
            selectData.assessType = this.activeName
            selectData.score = ''
            dataList.push(selectData)
          }
        }
      })
    },
    validateScore(row) {
      var re = /^[0-9]([0-9])*$/
      if (!re.test(row.score)) {
        row.score = ''
        this.catsMessage({
          type: 'error',
          message: '请输入整数'
        })
        return
      }
    },
    saveOrUpdate(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let tableData = []
          if (_this.dataList1.length === 0) {
            _this.catsMessage({
              type: 'warning',
              message: '请填写案卷评查配置'
            })
            return
          }
          if (_this.dataList2.length === 0) {
            _this.catsMessage({
              type: 'warning',
              message: '请填写自查自评配置'
            })
            return
          }
          if (_this.dataList3.length === 0) {
            _this.catsMessage({
              type: 'warning',
              message: '请填写网上评查配置'
            })
            return
          }
          tableData = _this.dataList1
            .concat(_this.dataList2)
            .concat(_this.dataList3)
          let errorData = tableData.filter(item => {
            if (item.score === '' || item.score === undefined) {
              return item
            }
          })
          if (errorData.length > 0) {
            _this.catsMessage({
              type: 'warning',
              message: '请输入子页签分数'
            })
            return
          }
          _this.batchForm.listDetailsForm = tableData
          addOrUpdatePykhBatch(_this.batchForm).then(
            res => {
              _this.catsMessage({
                type: 'success',
                message: '添加成功!'
              })
              _this.$store.dispatch('deleteTabs', _this.$route.name) //关闭当前页签
              _this.$router.push({
                name: this.$route.params.url
              })
            },
            err => {
              console.log(err)
            }
          )
        }
      })
    },
    deletePykhBatchById(row) {
      if (row.assessType === '案卷评查') {
        this.dataList1 = this.dataList1.filter(item => item.indexThreeId !== row.indexThreeId)
      } else if (row.assessType === '自查自评') {
        this.dataList2 = this.dataList2.filter(item => item.indexThreeId !== row.indexThreeId)
      } else if (row.assessType === '网上评查') {
        this.dataList3 = this.dataList3.filter(item => item.indexThreeId !== row.indexThreeId)
      }
    },
    init() {
      console.log('this.$route.params', this.$route.params)
      if (this.$route.params.type === '0') {
        this.isView = false
        let year = new Date().getFullYear()
        this.batchForm.batchYear = year
      } else {
        this.isView = true
        this.batchForm = this.$route.params
        let _that = this
        findListVoByDetails({
          batchId: this.$route.params.id
        }).then(
          res => {
            res.data.forEach(item => {
              if (item.assessType === '案卷评查') {
                _that.dataList1.push(item)
              } else if (item.assessType === '自查自评') {
                _that.dataList2.push(item)
              } else if (item.assessType === '网上评查') {
                _that.dataList3.push(item)
              }
            })
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  },
  mounted() {
    if (this.$route.params.type !== undefined) {
      this.init()
    }
  }
}
</script>
<style>
  .ryZjProtion .el-form-item__label{
    line-height: 20px !important;
  }
</style>
