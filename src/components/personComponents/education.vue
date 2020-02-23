<template>
  <div>
    <div>
      <el-row>
        <el-button type="primary" icon="el-icon-plus"  @click="addEducation" size="mini" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteEducation" size="mini" round>删除</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;height:582px"
        @selection-change="handleSelectionChange">
        <el-table-column prop="educationId" type="selection" width="55"></el-table-column>
        <el-table-column prop="personName" label="姓名"></el-table-column>
        <el-table-column prop="degree" label="学历"></el-table-column>
        <el-table-column prop="school" label="毕业学校"></el-table-column>
        <el-table-column prop="major" label="毕业专业"></el-table-column>
        <el-table-column prop="graduationDate" label="毕业时间"></el-table-column>
        <el-table-column prop="opt" label="操作项">
          <template slot-scope="scope">
              <el-button type="text"  @click="editEducation(scope.row)" >修改</el-button>
              <el-button type="text"  @click="educationInfo(scope.row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="modifyId" label="操作人" v-if="flag"></el-table-column>
        <el-table-column prop="modifyTime" label="操作时间" v-if="flag"></el-table-column>
        <el-table-column prop="note" label="备注" v-if="flag"></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
      ></el-pagination>
    </div>

    <!-- 新增、修改、查看页面 -->
    <addEducationComp ref="addEducationCompRef" @getAllEducation="getEducation"></addEducationComp>
  </div>
</template>

<script>
    import addEducationComp from './../../page/person/person-education/AddEducation'
    export default {
        name: "education",//人员教育信息组件
        data(){
          return{
            currentPage: 1, //当前页
            pageSize: 10,   //pagesize
            totalPage: 0,   //总页数
            tableData: [],
            multipleSelection: [],//所选择项
            flag:false,
          }
        },
        components:{
          addEducationComp
        },
        methods:{
          //获取选中的数据
          handleSelectionChange(val) {
            this.multipleSelection = val;
            val.forEach((item,val) => {
                  this.multipleSelection.push(item.educationId);
              });
          },
          //更改每页显示的条数
          handleSizeChange(val) {
              this.pageSize = val;
              //this.getPersonList();
          },
          //更换页码
          handleCurrentChange(val) {
              this.currentPage = val;
              //this.getPersonList();
          },
          getEducation(){//初始化人员教育信息
            let paramsData={
              current: this.currentPage,
              size: this.pageSize,
              personId: this.$route.params.personInfo.personId,
            }
            this.$store.dispatch("getEducationListMoudle",paramsData)
              .then(res=>{
                  this.tableData = res.data.records;
                  this.totalPage = res.data.total;
            });
            error=>{
              console.info(error);
            };
          },
          deleteEducation(row){
             this.$confirm("确定要删除所选的教育信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.$store.dispatch("deleteEducationMoudle", this.multipleSelection).then(
                    res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        this.getPersonList();
                    },
                    err => {
                    console.log(err);
                    }
                );
              })
              .catch(() => {});
          },
          addEducation(){//添加  addEducationMoudle
            this.$refs.addEducationCompRef.showModal(1, '');
          },
          editEducation(row){//编辑 updateEducationMoudle
            this.$refs.addEducationCompRef.showModal(2, row);
          },
          educationInfo(row){//查看 deleteEducationMoudle
            this.$refs.addEducationCompRef.showModal(3, row);
          }
        },
        created(){
          this.getEducation();
        }
    }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/personManage.scss";
</style>
