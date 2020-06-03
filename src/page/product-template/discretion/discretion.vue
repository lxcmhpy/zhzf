<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" id="discretionBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="discretionSearchForm" ref="discretionSearchForm">
            <el-form-item label="违法行为" prop='causeName'>
              <el-input v-model="discretionSearchForm.causeName" placeholder="输入违法行为"></el-input>
            </el-form-item>
            <el-form-item label="违法程度" prop="drawerId">
              <el-select v-model="discretionSearchForm.drawerId" placeholder="请选择"  @change="getWfcdType"  style="width:260px;" >
                <el-option v-for="item in drawerList" 
                    :key="item.id" 
                    :label="item.name" 
                    :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getDiscretionListSearch(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                <el-button size="medium" class="commonBtn addBtn" title="新增自由裁量权" icon="iconfont law-adduser" @click="addDiscretion"></el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" stripe style="width: 100%" height="100%">
          <el-table-column prop="causeName" label="违法行为" align="left"></el-table-column>
          <el-table-column prop="drawerName" label="违法程度" align="left"></el-table-column>
          <el-table-column prop="wfqj" label="违法情节" align="center"></el-table-column>
          <el-table-column prop="upperLimit" label="上限" align="center"></el-table-column>
          <el-table-column prop="lawerLimit" label="下限" align="center"></el-table-column>
          <el-table-column prop="jycf" label="处罚标准" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editDiscretion(scope.row)">编辑</el-button>
              <el-button type="text" @click="deleteDiscretion(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
        <el-pagination @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" background 
                :page-sizes="[10, 20, 30, 40]" 
                layout="prev, pager, next,sizes,jumper" 
                :total="totalPage">
          </el-pagination>
      </div>
      <addDiscretion ref="addDiscretionRef" @uploadaaa="getDiscretionList()"></addDiscretion>
    </div>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
import addDiscretion from "./addDiscretion";
import {
  getDiscretionListApi, deleteDiscretionByIdApi,getDictListDetailByNameApi
} from "@/api/system";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName: "", //查询名称
      discretionSearchForm: {
        causeName: "",
        drawerId: '',
      },
      visible: false,
      dentailVisible: false,
      drawerList: [], //程度
    };
  },
  inject: ["reload"],
  components: {
    addDiscretion,
  },
  methods: {
    //新增自由裁量权界面
     addDiscretion(){
      let data={
            id:'',
            leng:this.tableData.length
      }
      this.$refs.addDiscretionRef.showModal(0, data);
    },
    //编辑自由裁量权
    editDiscretion(val){
      let data =JSON.parse(JSON.stringify(val));
      console.log("自由裁量权",data);
      this.$refs.addDiscretionRef.showModal(1, data);
    },
    //获取自由裁量权列表
    getDiscretionList() {
      let data = {
        current: this.currentPage,
        size: this.pageSize,
        causeName: this.discretionSearchForm.causeName,
        drawerId: this.discretionSearchForm.drawerId,
      };
      let _this = this;
      getDiscretionListApi(data).then(
        res => {
          console.log('类型', res);
          _this.tableData = res.data.records;
          _this.totalPage = res.data.total;
        },
        error => {
          console.log(error)
        }
      );
    },
    // 查询
    getDiscretionListSearch() {
      this.currentPage = 1;
      this.getDiscretionList()
    },
     // 重置
    reset() {
      this.$refs["discretionSearchForm"].resetFields();
      this.currentPage = 1;
      this.getDiscretionList()
    },
    //删除自由裁量权
    deleteDiscretion(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDiscretionByIdApi(id).then(
          res => {
            console.log('类型', res);
            if (res.code == 200) {
              this.getDiscretionList();
            } else {
              this.$message({
                type: 'info',
                message: '删除失败'
              });
            }
          },
          error => {
            console.log(error)
          }
        );
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getDiscretionList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDiscretionList();
    },
    //
    getWfcdType(){},
    // 抽屉表
    getDictType() {
       getDictListDetailByNameApi('违法程度').then(res => {
         console.log('违法程度',res)
          this.drawerList = res.data;
        }, err => {
          console.log(err);
        });
    },
  },
  created() {
    this.getDiscretionList();
    this.getDictType();
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss"></style>
