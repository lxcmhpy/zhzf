<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;">
                <el-button type="primary" size="medium" >
                    <i class="iconfont law-submit-o f12"></i> 添加
                </el-button>
            </div>
            <div class="tablePart">
                 <!-- @row-click="handleNodeClick" -->
                <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;">
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column prop="checkTime" label="考核要求名称" align="center" width="100"></el-table-column>
                    <el-table-column prop="siteName" label="立案开始时间" align="center"></el-table-column>
                    <el-table-column prop="lane" label="立案截止时间"  width="50"  align="center"></el-table-column>
                    <el-table-column prop="totalWeight" label="案件基数" width="140" align="center"></el-table-column>
                    <el-table-column label="操作" align="center">
                        <template  slot-scope="scope">
                            <el-button type="text" @click.stop @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                            <el-button type="text" @click.stop @click="handleDelete(scope.row)">删除</el-button>
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
import {findPykhConfigByPage} from "@/api/appraisalExam.js";
  export default {
    data() {
      return {
        form: {
            current: 1, //当前页
            size: 10, //每页显示条数
        },
        total: 0,
        tableData: []
        // tableData: [{
        //   id: '12987122',
        //   name: '王小虎',
        //   amount1: '234',
        //   amount2: '3.2',
        //   amount3: 10
        // }, {
        //   id: '12987123',
        //   name: '王小虎',
        //   amount1: '165',
        //   amount2: '4.43',
        //   amount3: 12
        // }, {
        //   id: '12987124',
        //   name: '王小虎',
        //   amount1: '324',
        //   amount2: '1.9',
        //   amount3: 9
        // }, {
        //   id: '12987125',
        //   name: '王小虎',
        //   amount1: '621',
        //   amount2: '2.2',
        //   amount3: 17
        // }, {
        //   id: '12987126',
        //   name: '王小虎',
        //   amount1: '539',
        //   amount2: '4.1',
        //   amount3: 15
        // }]
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
    //更换页码
        search (val) {
            let _this = this;
            new Promise((resolve, reject) => {
                findPykhConfigByPage(_this.form).then(
                    res => {
                        resolve(res)
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
    }
  };
</script>
