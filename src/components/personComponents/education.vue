<template>
    <div>
      <div>
        <div class="card-title">
          <font class="font" style="font-size:25px;"><span class="titleflag"></span>教育信息</font>
          <el-button
            v-if="params.type !== 'view'"
            type="primary"
            style="margin-right:25px;float:right;"
            icon="el-icon-plus"
            size="medium"
            @click="addEducation">新增学历</el-button>
        </div>
        <el-table
          style="margin-left:25px;width:97%;margin-bottom:35px;"
          :data="tableData"  stripe  resizable 
          @selection-change="handleSelectionChange" >
          <el-table-column prop="graduationDate" label="毕业时间" align="center"></el-table-column>
          <el-table-column prop="school" label="毕业学校" align="center"></el-table-column>
          <el-table-column prop="majorName" label="毕业专业" align="center"></el-table-column>
          <el-table-column prop="degree" v-if="false" label="学历id"></el-table-column>
          <el-table-column prop="degreeName" label="学历" align="center"></el-table-column>
          <el-table-column v-if="params.type !== 'view'" prop="opt" label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text"  @click="editEducation(scope.row)" >修改</el-button>
                <!--<el-button type="text"  @click="educationInfo(scope.row)">详情</el-button>-->
                <el-button type="text"  @click="deleteEducationById(scope.row)" >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="modifyId" label="操作人" v-if="flag" align="center"></el-table-column>
          <el-table-column prop="modifyTime" label="操作时间" v-if="flag" align="center"></el-table-column>
          <el-table-column prop="note" label="备注" v-if="flag" align="center"></el-table-column>
      </el-table>
      <div class="paginationBox" style="margin-top:-25px;margin-bottom:10px;text-align:center;">
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
    </div>
    <!-- 新增、修改、查看页面 -->
    <addEducationComp ref="addEducationCompRef" :params="params" @getEducationList="getEducation"></addEducationComp>
  </div>
</template>

<script>
import addEducationComp from '@/page/person/person-education/AddEducation';
import {mixinPerson} from '@/common/js/personComm';
export default {
  name: "education",//人员教育信息组件
  mixins:[mixinPerson],
  props: {
    params: {
      type: Object,
      default: () => {
        return { type: 'add', id: '' }
      },
      required: true
    }
  },
  data(){
    return{
      multipleSelection: [],//所选择项
      flag:false,
      personId: this.params.id,
      tableData: []
    }
  },
  components:{
    addEducationComp
  },
  methods:{
    //获取选中的数据
    handleSelectionChange(val) {
      let _this = this
      _this.multipleSelection = val;
      val.forEach((item,val) => {
            _this.multipleSelection.push(item.educationId);
        });
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      let _this = this
      _this.pageSize = val;
      this.getEducation();
    },
    //更换页码
    handleCurrentChange(val) {
      let _this = this
      _this.currentPage = val;
      _this.getEducation();
    },
    getEducation(){//初始化人员教育信息
      let _this = this
      let paramsData={
        current: _this.currentPage,
        size: _this.pageSize,
        personId: _this.personId,
      }
      if(_this.params.type == 'edit' || _this.params.type == 'view'){
          _this.getPageList("getEducationListMoudle", paramsData);
      }
    },
    //根据id删除单个人员信息
    deleteEducationById(row){
      let _this = this
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'el-icon-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch('deleteEducationByIdMoudle', row.educationId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            _this.getEducation(); //重新加载页面数据
          }
        }, err => {console.log(err);});
      }).catch(() => {});
    },
    deleteEducation(row){
        let _this = this
        _this.deleteByIds("deleteEducationMoudle", _this.multipleSelection);
        _this.getEducation();//重新加载页面数据
    },
    addEducation(){//添加  addEducationMoudle
      let _this=this
      _this.$refs.addEducationCompRef.showModal(1, '');
    },
    editEducation(row){//编辑 updateEducationMoudle
      let _this=this
      _this.$refs.addEducationCompRef.showModal(2, row);
    },
    educationInfo(row){//查看 deleteEducationMoudle
      let _this=this
      _this.$refs.addEducationCompRef.showModal(3, row);
    }
  },
  created(){
    let _this=this
    _this.getEducation();
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
