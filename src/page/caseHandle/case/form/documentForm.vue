<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <!--<div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="evidenceForm"  ref="evidenceForm">
            <el-form-item>
              <el-button type="primary" icon="add" size="medium"  @click="handleAdd">上传证据</el-button>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName">
              <el-input v-model="evidenceForm.evName"></el-input>
            </el-form-item>
            <el-form-item label="证据类型" prop="evType">
              <el-select v-model="evidenceForm.evType">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据状态" prop="status">
              <el-select v-model="value">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getDocList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>-->
      <div class="tablePartF">
        <el-table :data="tableData" stripe height="100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="文书名称" align="center"></el-table-column>
          <el-table-column prop="createTime" label="保存日期" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              <el-button type="text" @click="handleEdit(scope.$index, scope.row)">打印</el-button>
            </template>
          </el-table-column>
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
    <caseSlideMenu :activeIndex="'documentForm'" ></caseSlideMenu>
  </div>
</template>
<script>
import caseSlideMenu from '@/page/caseHandle/components/caseSlideMenu'
import { mapGetters } from "vuex";
    export default {
        data() {
            return {
                evTypeOptions : [{
                    value: '123',
                    label: '123'
                }, {
                    value: '照片',
                    label: '照片'

                }],
                statusOptions : [{
                    value: '1',
                    label: '有效'
                }, {
                    value: '2',
                    label: '无效'

                }],
                value: '',
                //activeName: '1',
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                total: 0, //总数
                tableData: [],
                evidenceForm: {
                    evName: "",
                    evType: "",
                    status: ""
                },
                form: {},
                uForm: {},
                addVisible:false,
                editVisible: false
            };
        },
        components: {
          caseSlideMenu
        },
        computed: { ...mapGetters(['caseId']) },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleEdit(index, row) {
                const item = this.tableData[index];
                this.uForm = {
                    evName: item.evName,
                    evType: item.evType,
                    status: item.status
                };
                this.editVisible = true;
            },
            //表单筛选
            getDocList() {
                let data = {
                    caseBasicinfoId:this.caseId,
                    current: this.currentPage,
                    size: this.pageSize
                };
                let _this = this
                this.$store.dispatch("getDocument", data).then(res => {
                    _this.tableData = res.data.records;
                    _this.total = res.data.total;
                });
            },

            // 重置
            resetSearch() {
                this.$refs["evidenceForm"].resetFields();
            },

            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.getDocList();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getDocList();
            }
        },
        mounted() {
            // this.setDepartTable(this.data)
        },
        created() {
            this.getDocList();
        }
    };
</script>
<style lang="scss" scoped>
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
    padding-top: 0px;
    box-sizing: border-box;
  }
  .searchAndpageBox {
    padding: 5px 20px 50px 20px;
  }
  .fullscreen {
    .hasBigMarginRight{
      margin-right: 65px;
    }
  }
</style>
