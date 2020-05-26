<template>
  <div class="searchAndpageBox" id="roleBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" :model="dicSearchForm" class="demo-form-inline" size="mini">
          <el-form-item label="环节名称">
            <el-input v-model="dicSearchForm.name" placeholder="请输入环节名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getBanner">查询</el-button>
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addBanner">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="index" width="60" align="center">
          <template slot="header">序号</template>
        </el-table-column>
        <el-table-column prop="linkName" label="环节名称" align="center">
        </el-table-column>
        <el-table-column prop="mainLinkName" label="所属大环节名称" align="center">
        </el-table-column>
        <el-table-column prop="isApproval" label="是否有审批流程" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.isApproval == 0 ? '是': '否'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="isPdf" label="是否自动生成pdf" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.isPdf == 0 ? '是': '否'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="docTypeName" label="生成PDF的对应文书类型" align="center">
        </el-table-column>
        <el-table-column prop="isFiling" label="是否是立案" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.isFiling == 0 ? '是': '否'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="isFile" label="是否是归档" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.isFile == 0 ? '是': '否'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="isCaseNumber" label="是否生成案件编号" align="center">
          <span slot-scope="scope">
            <span>{{scope.row.isCaseNumber == 0 ? '是': '否'}}</span>
          </span>
        </el-table-column>
        <el-table-column prop="linkUrl" label="页面地址" align="center">
        </el-table-column>
        <el-table-column prop="activitiId" label="工作流Id" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="描述" align="center">
        </el-table-column>
        <el-table-column prop="sort" label="排序" align="center">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <div style="width:160px">
              <el-button type="text" @click.stop @click="editBanner(scope.row)">修改</el-button>
              <el-button type="text" @click.stop @click="deleteBanner(scope.row)">删除</el-button>
              <el-button type="text" @click.stop @click="bindDoc(scope.row)">绑定文书</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" background :page-sizes="[10, 20, 30, 40]" layout="prev, pager, next,sizes,jumper" :total="totalPage"></el-pagination>
    </div>
    <addEditBanner ref="addEditBannerRef"></addEditBanner>
  </div>
</template>
<script>
    import addEditBanner from "./addEditBanner";
    export default {
        data() {
            return {
                tableData: [], //表格数据
                dicSearchForm: {
                    name: ''
                },
                currentPage: 1, //当前页
                pageSize: 10, //pagesize
                totalPage: 0, //总页数
                formInline: {
                    user: '',
                    region: ''
                },
            };
        },
        components: {
            addEditBanner,
        },
        inject: ['reload'],
        methods: {
            //编辑环节
            editBanner(row) {
                this.$refs.addEditBannerRef.showModal(2, row);
            },
            //删除环节
            deleteBanner(row) {
                this.$confirm("确认删除该环节?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.$store.dispatch("deleteBanner", row.id).then(
                      res => {
                        this.$message({
                          type: "success",
                          message: "删除成功!"
                        });
                        this.reload();
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  })
                  .catch(() => { });
            },
            //更改每页显示的条数
            handleSizeChange(val) {
                this.pageSize = val;
                this.currentPage = 1;
                this.getBanner();
            },
            //更换页码
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getBanner();
            },
            //获取环节
            getBanner() {
                let data = {
                    current: this.currentPage,
                    size: this.pageSize,
                    linkName: this.dicSearchForm.name
                };
                let _this = this
                this.$store.dispatch("getBannerList", data).then(
                    res => {
                        console.log("环节列表", res);
                        _this.tableData = res.data.records;
                        _this.totalPage = res.data.total;

                    },
                    err => {
                        console.log(err);
                    }
                );
            },
            //添加环节
            addBanner() {
                this.$refs.addEditBannerRef.showModal(0, '');
            },
        },
        created() {
            this.getBanner();
        }
    };
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
  /* @import "@/assets/css/systemManage.scss"; */
</style>
