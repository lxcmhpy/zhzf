<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="recordForm"  ref="recordForm">
            <el-form-item label="环节名称" prop="linkName">
              <el-select v-model="recordForm.linkName" clearable>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作人" prop="operator">
              <el-select v-model="recordForm.operator" clearable>
                <el-option
                  v-for="item in operatorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作名称" prop="operationl">
              <el-select v-model="recordForm.operationl" clearable>
                <el-option
                  v-for="item in operationlOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作内容" prop="operationContent">
              <el-input v-model="recordForm.operationContent"></el-input>
            </el-form-item>
            <el-form-item label="操作日期" >
              <el-form-item prop="createTime1">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="recordForm.operateStartTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              ——
              <el-form-item prop="createTime2">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期"
                  v-model="recordForm.operateEndTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getRecordList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePartF">
        <el-table :data="tableData" stripe height="100%">
          <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <!--<el-table-column prop="id" label="序号" align="center"></el-table-column>-->
          <el-table-column prop="createTime" label="操作时间" align="center"></el-table-column>
          <el-table-column prop="linkName" label="环节名称" align="center"></el-table-column>
          <el-table-column prop="operator" label="操作人" align="center"></el-table-column>
          <el-table-column prop="operationl" label="操作名称" align="center"></el-table-column>
          <el-table-column prop="operationContent" label="操作内容" align="center"></el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationF">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'evidenceForm'" ></caseSlideMenu>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                options : [{
                    value: '信息采集',
                    label: '信息采集'
                }, {
                    value: '立案登记',
                    label: '立案登记'

                }, {
                    value: '调查类文书',
                    label: '调查类文书'

                }, {
                    value: '当事人权利登记',
                    label: '当事人权利登记'

                }],
                operatorOptions : [{
                  value: 'test2',
                  label: 'test2'
                }, {
                  value: 'ceshiyixia',
                  label: 'ceshiyixia'

                }],
                operationlOptions : [{
                  value: '保存',
                  label: '保存'
                }, {
                  value: '提交审批',
                  label: '提交审批'

                }, {
                  value: '提交',
                  label: '提交'

                }, {
                  value: '审批',
                  label: '审批'

                }],
                value: '',
                //activeName: '1',
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                total: 0, //总数
                tableData: [],
                recordForm: {
                    linkName: "",
                    operator: "",
                    operationl: "",
                    operationContent: "",
                    createTime1: "",
                    createTime2: ""
                },
                rules: {
                    createTime1: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择日期",
                            trigger: "change"
                        }
                    ],
                    createTime2: [
                        {
                            type: "date",
                            required: true,
                            message: "请选择时间",
                            trigger: "change"
                        }
                    ]
                }
            };
        },
        computed: { ...mapGetters(['caseId']) },
        components: {
          caseSlideMenu
        },
        methods: {
            //表单筛选
            getRecordList() {
                let data = {
                    /*organ: this.recordForm.organ,
                    type: this.recordForm.type,
                    operation: this.recordForm.operation,
                    username: this.recordForm.username,
                    // createTime: this.recordForm.createTime1 + " " +this.recordForm.createTime2,
                    // createTime: this.recordForm.createTime2,
                    current: this.currentPage,
                    size: this.pageSize*/
                    caseBasicInfoId:this.caseId,
                    linkName:this.recordForm.linkName,
                    operator:this.recordForm.operator,
                    operationl:this.recordForm.operationl,
                    operationContent:this.recordForm.operationContent,
                    operateStartTime:this.formatDateStr(this.recordForm.operateStartTime),
                    operateEndTime:this.formatDateStr(this.recordForm.operateEndTime),
                    current: this.currentPage,
                    size: this.pageSize
                };
                let _this = this
                this.$store.dispatch("getHandleRecord", data).then(res => {
                    _this.tableData = res.data.records;
                    _this.total = res.data.total;
                });
            },

            // 日志重置
            resetSearch() {
                this.$refs["recordForm"].resetFields();
            },

            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getRecordList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getRecordList();
            },
            formatDateStr(val) {
              if(val == null){
                return null;
              }
              let date = new Date(val);
              let Y = date.getFullYear() + '-';
              let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
              let D = date.getDate() < 10 ? '0' + date.getDate() + ' ': date.getDate() + ' ';
              let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
              let m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
              let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
              return Y + M + D + h + m + s;
            },
        },
        mounted() {
            // this.setDepartTable(this.data)
        },
        created() {
            this.getRecordList();
        }
    };
</script>
<style lang="scss">
  @import "@/assets/css/systemManage.scss";
  .paginationF{
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;
    text-align: center;
  }
  .tablePartF{
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 4%;
  }
  .fullscreen {
  .hasBigMarginRight{
      margin-right: 65px;
    }
  }
</style>
