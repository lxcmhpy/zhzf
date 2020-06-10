<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox toggleBox">
      <div class="handlePart" style="margin-left: 0px;">
        <div class="search">
          <el-form :inline="true" >
            <el-form-item label="批次编号">
              <el-input v-model="search.batchNo" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="searchData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-refresh-left" @click="resetSearch">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-plus" @click="add_openDialog">新增</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <!-- @row-click="handleNodeClick" -->
        <el-table :data="dataList" stripe resizable border style="width: 100%;height:100%;" row-key="id" >
          <el-table-column prop="batchName" label="批次名称" align="center"></el-table-column>
          <el-table-column prop="batchNo" label="批次编号" align="center"></el-table-column>
          <el-table-column prop="batchYear" label="批次所属年份"  align="center"></el-table-column>
          <el-table-column prop="khjs" label="案件考核基数" align="center"></el-table-column>
          <el-table-column prop="personNum" label="人员基数" align="center"></el-table-column>
<!--          <el-table-column label="操作" align="center" width="120">-->
<!--            <template  slot-scope="scope">-->
<!--              <el-button type="text" @click.stop @click="updatePykhConfig(scope.$index, scope.row)">修改</el-button>-->
<!--              <el-button type="text" @click.stop @click="deletePykhConfigById(scope.row)">删除</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
      <div class="paginationBox" >
        <div v-if="total/dataList.size > 1">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size="dataList.size"
            layout="prev, pager, next,sizes,jumper"
            :total="total"
          ></el-pagination>
        </div>
        <div class="noMore" v-else>没有更多了</div>
      </div>

      <el-dialog :visible.sync="visible" title="考核发起配置" width="480px" >
        <el-form :label-position="labelPosition" :model="form" ref="form" label-width="160px">
          <el-form-item label="批次名称" prop="operator" >
            <el-input placeholder="请输入批次名称" v-model.trim="form.batchName" ></el-input>
          </el-form-item>
          <el-form-item label="批次所属年份" prop="operator" >
            <el-input placeholder="请输入批次所属年份" v-model.trim="form.batchYear" ></el-input>
          </el-form-item>
<!--          <el-form-item label="考核机构数" prop="operator" >-->
<!--            <el-input placeholder="请输入考核机构数" v-model.trim="form.khjgs" ></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="案件考核基数" prop="operator" >
            <el-input placeholder="请输入案件考核基数" v-model.trim="form.khjs" ></el-input>
          </el-form-item>

          <el-form-item label="权重" prop="operator" >
            <el-input placeholder="请输入权重" v-model.trim="form.khjs" ></el-input>
          </el-form-item>

          <el-form-item label="人员基数" prop="operator" >
            <el-input placeholder="请输入人员基数" v-model.trim="form.personNum" ></el-input>
          </el-form-item>
          <el-form-item label="考核配置" prop="operator" >
            <el-input placeholder="请选择" v-model.trim="form.pykhConfigId" ></el-input>
          </el-form-item>

          <el-form-item label="发布日期" prop="operator" >
            <el-date-picker type="date" placeholder="选择日期" v-model="form.showBatchDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button @click="addPykhBatch"  type="primary" class="btn-custom" >
            <span>确 定</span>
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import {findPykhBatchByPage,addOrUpdatePykhBatch,findListVoByConfig} from "@/api/catsAppraisalStartUp.js";
  import iLocalStroage from '@/common/js/localStroage';
  export default {
    mixins: [mixinsCommon],
    data() {
      return {
        total:0,
        current:1,
        search:{},
        labelPosition: 'right',
        form:{
          batchName:'',
          batchYear:'',
          khjgs:'',
          khjs:'',
          organId:'',
          personNum:'',
          pykhConfigId:'',
          showBatchDate:''
        },
        dataList:[],
        visible:false
      };
    },
    methods: {
      fetchData(data){
        findPykhBatchByPage(data).then(res=>{
          console.log("res:",res)
          if(res.code==200){
            console.info("records:",res.data.records);
            this.dataList=res.data.records;
            this.total=res.data.total;
            this.current=res.data.current;
          }
        });
      },
      searchData(){
        let data={}
        data.current=this.current;
        data.size=5;
        data.batchNo=this.search.batchNo;
        this.fetchData(data);
      },
      addPykhBatch(){
        addOrUpdatePykhBatch(this.form).then(res=>{
          console.info("保存发起结果：",res)
          if(res.code==200){
            this.visible=false;
            let data={}
            data.current=this.current;
            data.size=5;
            this.fetchData(data);
          }
        })
      },
      add_openDialog(){
        this.visible=true;
        findListVoByConfig().then(res=>{
          console.info("参数配置：",res)
        });
      },

      resetSearch(){
        this.search={};
      },
      openDialog(){
        console.info("打开弹窗");
      }


    },
    mounted () {
      let data={}
      data.current=this.current;
      data.size=5;
      this.fetchData(data);
      // let userInfo = iLocalStroage.gets("userInfo");
      // this.pykhObj.organId = userInfo.organId;
      // this.pykhObj.organName = userInfo.organName;
    }
  };
</script>
