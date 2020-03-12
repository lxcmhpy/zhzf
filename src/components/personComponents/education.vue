<template>
    <div>
      <div>
        <div style="margin-top:35px;margin-bottom:25px;margin-left:25px;">
          <font style="font-size:25px;"><span class="titleflag"></span>教育信息</font>
          <el-button type="primary" @click="addEducation"  round style="margin-right:25px;float:right;" icon="el-icon-plus" size="medium">新增学历</el-button>
        </div>
        <el-table
          style="margin-left:25px;width:97%;margin-bottom:35px;"
          :data="tableData"
          stripe
          resizable 
          @selection-change="handleSelectionChange" >
          <el-table-column prop="educationId" type="selection" width="55"></el-table-column>
          <el-table-column prop="graduationDate" label="毕业时间"></el-table-column>
          <el-table-column prop="school" label="毕业学校"></el-table-column>
          <el-table-column prop="major" label="毕业专业"></el-table-column>
          <el-table-column prop="degree" label="学历"></el-table-column>
          <el-table-column prop="opt" label="操作">
            <template slot-scope="scope">
                <el-button type="text"  @click="editEducation(scope.row)" >修改</el-button>
                <!--<el-button type="text"  @click="educationInfo(scope.row)">详情</el-button>-->
                <el-button type="text"  @click="deleteEducation(scope.row)" >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="modifyId" label="操作人" v-if="flag"></el-table-column>
          <el-table-column prop="modifyTime" label="操作时间" v-if="flag"></el-table-column>
          <el-table-column prop="note" label="备注" v-if="flag"></el-table-column>
      </el-table>
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
            let _this = this
            val.forEach((item,val) => {
                  _this.multipleSelection.push(item.educationId);
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
            let _this = this
            this.$store.dispatch("getEducationListMoudle",paramsData)
              .then(res=>{
                  _this.tableData = res.data.records;
                  _this.totalPage = res.data.total;
            });
            error=>{
              console.info(error);
            };
          },
          deleteEducation(row){
              let _this = this
              this.$confirm("确定要删除所选的教育信息吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
              _this.$store.dispatch("deleteEducationMoudle", _this.multipleSelection).then(
                    res => {
                        _this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        //重新加载页面数据
                        _this.getPersonList();
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
  .titleflag {
                width      : 4px;
                height     : 22px;
                margin-right: 8px;
                display    : inline-block;
                background : #4573D0;
            }
</style>
