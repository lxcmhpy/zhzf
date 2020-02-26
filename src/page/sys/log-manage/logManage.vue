<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchPage toggleBox">
    <div class="handlePart">
        <el-form :inline="true" :model="logForm" label-width="80px"  ref="logForm">
              <el-form-item label="机构名称" prop="organ">
                <el-input v-model="logForm.organ" placeholder="回车可直接查询" @keyup.enter.native="getLogList(1)"></el-input>
              </el-form-item>
              <el-form-item label="日志类型" prop="type">
                <!-- <el-input v-model="logForm.type" placeholder="回车可直接查询" @keyup.enter.native="getLogList(1)"></el-input> -->
                <el-select v-model="logForm.type" prop="type">
                    <el-option
                    v-for="item in logType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="操作名称" prop="operation">
                <el-input v-model="logForm.operation" placeholder="回车可直接查询" @keyup.enter.native="getLogList(1)"></el-input>
              </el-form-item>
              <el-form-item label=" " label-width="13px">
                <el-button size="medium" class="commonBtn searchBtn" title="搜索" icon="iconfont law-sousuo" @click="getLogList(1)"></el-button>
                <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="showSomeSearch" >
                </el-button>
              </el-form-item>
              <el-collapse-transition>
                <div v-show="isShow" :class="{'ransition-box':true}">
                    <el-form-item label="操作人" prop="username">
                        <el-input v-model="logForm.username" placeholder="回车可直接查询" @keyup.enter.native="getLogList(1)"></el-input>
                    </el-form-item>
                    <el-form-item label="操作日期" >
                                <!-- type="daterange" -->
                        <el-form-item prop="startTime">
                             <el-date-picker
                                v-model="logForm.dateArray"
                                type="daterange"
                                range-separator="—"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd"
                                :default-time="['00:00:00', '23:59:59']"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                            <!-- <el-date-picker
                                type="date"
                                placeholder="开始日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd"
                                range-separator="—"
                                v-model="logForm.startTime"
                            ></el-date-picker> -->
                            <!-- </el-form-item> -->
                            <!-- <el-form-item label="至" label-width="30px" prop="endTime">
                            <el-date-picker
                                placeholder="结束日期"
                                value-format="yyyy-MM-dd 23:59:59"
                                format="yyyy-MM-dd"
                                range-separator="—"
                                v-model="logForm.endTime"
                            ></el-date-picker> -->
                        </el-form-item>
                    </el-form-item>

                </div>
              </el-collapse-transition>
        </el-form>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" >
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="organ" label="机构名称" align="center"></el-table-column>
        <el-table-column prop="ip" label="IP地址" align="center"></el-table-column>
        <el-table-column prop="type" label="功能名称" align="center"></el-table-column>
        <el-table-column prop="operation" label="操作名称" align="center"></el-table-column>
        <el-table-column prop="username" label="操作人" align="center"></el-table-column>
        <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="paginationBox" v-show="totalPage">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            background
            :page-sizes="[10, 20, 30, 40]"
            layout="prev, pager, next,sizes,jumper"
            :total="totalPage"
        ></el-pagination>
        </div>
  </div>
</div>
</template>


<script>
export default {
  data() {
    return {
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
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
      logType:[{
            value: null,
            label:'全部'
          },
          {
            value:0,
            label:'操作日志'
          },
          {
            value:1,
            label:'登录日志'
      }],
    //   rules: {
    //     startTime: [
    //       {
    //         type: "date",
    //         required: true,
    //         message: "请选择日期",
    //         trigger: "change"
    //       }
    //     ],
    //     endTime: [
    //       {
    //         type: "date",
    //         required: true,
    //         message: "请选择时间",
    //         trigger: "change"
    //       }
    //     ]
    //   },
      isShow: false
    };
  },
  methods: {
    //表单筛选
    getLogList(val) {
      this.currentPage = val
      let data = {
        organ: this.logForm.organ,
        type: this.logForm.type,
        operation: this.logForm.operation,
        username: this.logForm.username,
        startTime: this.logForm.dateArray? this.logForm.dateArray[0] : '',
        endTime: this.logForm.dateArray? this.logForm.dateArray[1] : '',
        current: this.currentPage,
        size: this.pageSize
      };
      this.$store.dispatch("getloglist", data).then(res => {
        this.tableData = res.data.records;
         this.totalPage = res.data.total;
      });
      err => {
        console.log(err);
      };
    },
    //展开
    showSomeSearch() {
      this.isShow = !this.isShow;
    },
    // 日志重置
    reset() {
      this.$refs["logForm"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLogList(1);
    },
    //更换页码
    handleCurrentChange(val) {
      this.getLogList(val);
    }
  },
  mounted() {
    // this.setDepartTable(this.data)
  },
  created() {
    this.getLogList();
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
