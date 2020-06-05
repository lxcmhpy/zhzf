<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;">
                <el-button type="primary" size="medium" @click="addPykh">
                    <i class="iconfont law-submit-o f12"></i> 添加
                </el-button>
            </div>
            <div class="tablePart">
                 <!-- @row-click="handleNodeClick" -->
                <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" @expand-change="load"
                row-key="id" :expand-row-keys="expandList">
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="pykhConfigName" label="考核要求名称" align="center"></el-table-column>
                    <el-table-column prop="startTime" label="立案开始时间" align="center"></el-table-column>
                    <el-table-column prop="endTime" label="立案截止时间"  align="center"></el-table-column>
                    <el-table-column prop="caseNum" label="案件基数" align="center"></el-table-column>
                    <el-table-column type="expand" >
                        <template  >
                            {{zbList}}ddd
                            <!-- -->
                            <el-form label-position="left"  inline class="demo-table-expand">
                                查看指标项
                            <!-- <el-form-item label="商品名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                            <el-form-item label="所属店铺">
                                <span>{{ props.row.shop }}</span>
                            </el-form-item>
                            <el-form-item label="商品 ID">
                                <span>{{ props.row.id }}</span>
                            </el-form-item>
                            <el-form-item label="店铺 ID">
                                <span>{{ props.row.shopId }}</span>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <span>{{ props.row.category }}</span>
                            </el-form-item>
                            <el-form-item label="店铺地址">
                                <span>{{ props.row.address }}</span>
                            </el-form-item>
                            <el-form-item label="商品描述">
                                <span>{{ props.row.desc }}</span>
                            </el-form-item>-->
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120">
                        <template  slot-scope="scope">
                            <el-button type="text" @click.stop @click="updatePykhConfig(scope.$index, scope.row)">修改</el-button>
                            <el-button type="text" @click.stop @click="deletePykhConfigById(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationBox" >
                <div v-if="total/form.size > 1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="form.current"
                        background
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="form.size"
                        layout="prev, pager, next,sizes,jumper"
                        :total="total"
                    ></el-pagination>
                </div>
                <div class="noMore" v-else>没有更多了</div>
            </div>
        </div>
        <el-drawer modal-append-to-body direction="rtl" size="450px" customClass="amap-drawer" :modal="false" :visible.sync="drawer">
            <el-form :model="pykhObj" ref="pykhObj" :rules="rules" class="checkSearchForm" label-width="120px">
                <div style="width:400px">
                    <div class="item">
                        <el-form-item label="考核要求名称" prop="pykhConfigName">
                            <el-input v-model="pykhObj.pykhConfigName" class="w-120" placeholder="请输入考核要求名称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="立案开始时间" prop="startTime">
                              <el-date-picker
                              style='width:282px'
                                v-model="pykhObj.startTime"
                                type="date"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                placeholder="立案开始时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="立案截止时间" prop="endTime">
                            <el-date-picker
                              style='width:282px'
                                v-model="pykhObj.endTime"
                                type="date"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                placeholder="立案截止时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <el-form-item label="案件基数" prop="caseNum">
                            <el-input v-model="pykhObj.caseNum" placeholder="请输入案件基数"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <br>
             <div class="demo-drawer__footer" style="text-align:center">
                <el-button type="primary" @click="addPykhConfig" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                <el-button @click="closeDraw">取 消</el-button>
            </div>
        </el-drawer>
        <!-- <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
        <el-table-column
        label="操作">
        <template>
            <el-button>添加</el-button>
            <el-button>修改</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    </div>
</template>
<script>
import { mixinsCommon } from "@/common/js/mixinsCommon";
import {findPykhConfigByPage,addOrUpdatePykhConfig,deletePykhConfigById,findPykhMetricsByPage,addOrUpdatePykhMetrics,deletePykhMetricsById} from "@/api/appraisalExam.js";
import iLocalStroage from '@/common/js/localStroage';
  export default {
    mixins: [mixinsCommon],
    data() {
        let _this = this;
      return {
        expandList:null,
        timeList: ['', ''],
        rules: {
            pykhConfigName: [{ required: true, message: '请输入考核要求名称', trigger: 'blur' }]
        },
        pickerOptions:  {
            onPick:  ({  maxDate,  minDate  })  =>  {
                if (minDate) {
                    _this.$set(_this.timeList,0,minDate);
                }
                let max = new Date(maxDate ? maxDate :minDate);
                max.setHours(23);
                max.setMinutes(59);
                max.setSeconds(59);
                _this.$set(_this.timeList,1,max);
            }
        },
        loading: false,
        drawer: false,
        form: {
            current: 1, //当前页
            size: 5, //每页显示条数
        },
        total: 0,
        tableData: null,
        pykhObj: {
            id: "",
            note: "",
            createId: "",
            createName: "",
            createTime: "",
            modifyId: "",
            modifyTime: "",
            startTime: "",
            endTime: "",
            pykhConfigName: "",
            organName: "",
            organId: "",
            caseNum: ""
        },
        zbList: null
      };
    },
    methods: {
    //   arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //     if (rowIndex % 2 === 0) {
    //       if (columnIndex === 0) {
    //         return [1, 2];
    //       } else if (columnIndex === 1) {
    //         return [0, 0];
    //       }
    //     }
    //   },
    closeDraw () {
        this.drawer = false;
           this.$set(this, 'pykhObj', {
                    id: "",
                    note: "",
                    createId: "",
                    createName: "",
                    createTime: "",
                    modifyId: "",
                    modifyTime: "",
                    startTime: "",
                    endTime: "",
                    pykhConfigName: "",
                    organName: "",
                    organId: "",
                    caseNum: ""
                });
    },
    rowKey() {
        return this.expandList.length>0?this.expandList[0].id: '';
    },
    load (row, expand){
        // this.rowKey = row.id;
        // this.expandList.splice(0,this.expandList.length);
        this.findPykhMetricsByPage(row);
        this.expandList= [row.id];
        debugger;
    },
    findPykhMetricsByPage(item) {
        let _this = this;
        new Promise((resolve, reject) => {
            findPykhMetricsByPage(item.id).then(
                res => {
                    debugger;
                    _this.zbList = res.data
                },
                error => {
                     _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    deletePykhConfigById(item) {
        let _this = this;
        new Promise((resolve, reject) => {
            deletePykhConfigById(item.id).then(
                res => {
                    _this.errorMsg('删除成功', 'success');
                    _this.search(1);
                },
                error => {
                     _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    //查询列表
        search (val) {
            let _this = this;
            new Promise((resolve, reject) => {
                findPykhConfigByPage(_this.form).then(
                    res => {
                        resolve(res);
                        // _this.tableData.splice(0, _this.tableData.length);
                        _this.tableData = res.data.records;
                        _this.total = res.data.total;
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })

        },
        addPykh () {
            // this.pykhObj.startTime = "";
            // this.pykhObj.endTime = "";
            // this.pykhObj.caseNum = "";
            // this.pykhObj.startTime = "";
            this.$set(this, 'pykhObj', {
                    id: "",
                    note: "",
                    createId: "",
                    createName: "",
                    createTime: "",
                    modifyId: "",
                    modifyTime: "",
                    startTime: "",
                    endTime: "",
                    pykhConfigName: "",
                    organName: "",
                    organId: "",
                    caseNum: ""
                });

            this.updateIndex = null;
            this.drawer = true;

        },
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        updatePykhConfig (index, row) {
            this.pykhObj = row;
            this.drawer = true;
            this.updateIndex = index;
        },
        addPykhConfig () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            let _this = this;
            this.$refs['pykhObj'].validate((valid) => {
                if (valid) {
                    new Promise((resolve, reject) => {
                        addOrUpdatePykhConfig(_this.pykhObj).then(
                            res => {
                                if (this.updateIndex === null) {
                                    //添加
                                    // _this.reset('pykhObj');
                                     _this.search(1);
                                } else {
                                    // 更新
                                    _this.drawer = false;
                                    _this.$set(_this.tableData,_this.updateIndex, _this.pykhObj);
                                }
                                 _this.$set(_this, 'pykhObj', {
                                            id: "",
                                            note: "",
                                            createId: "",
                                            createName: "",
                                            createTime: "",
                                            modifyId: "",
                                            modifyTime: "",
                                            startTime: "",
                                            endTime: "",
                                            pykhConfigName: "",
                                            organName: "",
                                            organId: "",
                                            caseNum: ""
                                        });
                                _this.closeLoading();
                                 _this.errorMsg('保存成功', 'success')
                            },
                            error => {
                                 _this.errorMsg(error.toString(), 'error')
                                    return
                            }
                        )
                    })

                } else {
                    _this.errorMsg("您有必填字段未填写！", 'error')
                    _this.closeLoading();
                    return false;
                }

            });

        },
        closeLoading () {
            let _this = this;
             setTimeout(() => {
                _this.loading = false;
            }, 400);
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            // clearTimeout(this.timer);
        },
        handleCurrentChange(val) {
            this.search(val);
        },
        handleSizeChange(val) {
            this.form.size = val;
            this.search(1);
        },
        handleEdit (row) {

        },
        handleDelete(row) {
        let _this = this
            this.$confirm("确认删除该用户?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            })
            .then(() => {
                _this.$store.dispatch("getUserdelete", row.id).then(
                res => {
                    _this.getAllOrgan(_this.$refs.addUserRef.id);
                    _this.$message({
                    type: "success",
                    message: "删除成功!"
                    });
                },
                err => {
                    console.log(err);
                }
                );
            })
            .catch(() => {
            });
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 5 === 0) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    mounted () {
        this.search(1);
        let userInfo = iLocalStroage.gets("userInfo");
        this.pykhObj.organId = userInfo.organId;
        this.pykhObj.organName = userInfo.organName;
    }
  };
</script>
