<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage toggleBox">
      <el-row>
        <el-col :span="24">
          <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="100px" ref="logForm">

          <el-form-item label="起始年月" prop>
            <el-date-picker
              v-model="value1"
              type="monthrange"
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              value-format="yyyyMM"
               style="width:400px"
            ></el-date-picker>
          </el-form-item>
          
          <el-form-item label=" " label-width="13px">
            <el-button size="medium" icon="iconfont law-sousuo" @click="select()">查询</el-button>
          </el-form-item>

         

        </el-form>
      </div>
       <div class="tablePart">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe resizable border style="width: 100%;height:100%;">
          <el-table-column prop="xm" label="姓名" align="center"></el-table-column>
          <el-table-column prop="xb" label="性别" align="center"></el-table-column>
          <el-table-column prop="csrq" label="出生日期" align="center"></el-table-column>
          <el-table-column prop="zc" label="职称" align="center"></el-table-column>
          <el-table-column prop="byyx" label="毕业院校" align="center"></el-table-column>
          <el-table-column prop="zfly" label="执法领域" align="center"></el-table-column>
        </el-table>
         <el-pagination class="fy"
              layout="prev, pager, next"
              @current-change="current_change"
              :total="total"
              background
            >
          </el-pagination>
      </div>
        </el-col>
      </el-row>     
    </div>
  </div>
</template>


<script>
import {
      zfrytj
    } from '@/api/fxyp.js'

export default {
  data() {
    return {
      value1: "",
      total:0,//默认数据总数
      pagesize:10,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: [],
      logForm: {
        organ: "",
        type: "",
        operation: "",
        username: "",
        startTime: "",
        endTime: "",
        dateArray: ""
      },
    };
  },
  methods: {
     current_change:function(currentPage){
        this.currentPage = currentPage;
      },
  //查询-----------------------------------------------------------------------------------------------------------
  //执法人员统计
  search1(start,end){
    let data = {
       start:start,
       end:end
      };
      zfrytj(data).then(res => {   
          console.log(res);
          this.total=res.length;
         res.forEach(item =>{
             this.tableData.push(
               {
                xm: item[0],
                xb:item[1]=='0'?'男':'女',
                csrq:item[2],
                zc:item[3],
                byyx:item[4],
                zfly:item[5],
              }
        );
         });
       
       
    
      });
      err => {
        console.log(err);
      };
    },

    
    select(){
      if(this.value1!=''){
        var v=this.value1;
         this.tableData=[];
        this.search1(v[0],v[1]);

      }
      
    }
  },
  
  mounted() {
    this.search1(202001,202012);

  },
  created() {
 
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
