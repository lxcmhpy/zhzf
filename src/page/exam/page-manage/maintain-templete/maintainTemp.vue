<template>
  <div class="com_searchAndpageBoxPadding temp">
    <div class="searchPage toggleBox">
      <div class="handlePart">
        <el-form :inline="true" :model="templeteForm" label-width="120px;" ref="templeteFormRef">
          <div>
            <div class="item">
              <el-row>
                <el-form-item label="模板名称" prop="templeteName" >
                  <el-input v-model="templeteName" placeholder="模板名称"></el-input>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button
                    title="搜索"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-sousuo"
                    @click="currentPage = 1;getTempleteList();"
                  ></el-button>
                  <el-button
                    title="重置"
                    class="commonBtn searchBtn"
                    size="medium"
                    icon="iconfont law-zhongzhi"
                    @click="resetLog"
                  ></el-button>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="medium"
                    @click="addTempleteInfo('','1')"
                  >新增模板</el-button>
                </el-form-item>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tablePart">
        <el-table :data="tableData" resizable stripe style="width: 100%;height:100%;"  v-loading="tableLoading"
            element-loading-spinner="car-loading"
            element-loading-text="加载中...">
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="templeteId" label align="center" v-if="false"></el-table-column>
          <el-table-column prop="templeteName" label="模板名称" align="center"></el-table-column>
          <el-table-column prop="createName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="isUse" label="是否启用" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="`已${scope.row.isUse === '0' ? '启用' : '停用'}`" placement="top">
                <el-switch
                  :value="scope.row.isUse"
                  active-color="#13ce66"
                  inactive-color="#7E828C"
                  :active-value="'0'"
                  :inactive-value="'1'"
                  @change="change($event, scope.row)"
                ></el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="updateTempleteInfo(scope.row,'2')">修改</el-button>
              <el-button type="text" @click="deleteTempleteInfo(scope.row.templeteId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-box">
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
    <!-- 申请调动的时候弹出框 -->
    <addTempleteComp ref="addTempleteCompRef" @getTempleteComp="getTempleteList"></addTempleteComp>
  </div>
</template>
<script>
import addTempleteComp from "./addTemplete";
import { mixinPerson } from "@/common/js/personComm";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      templeteName: "", //模板名称
      templeteForm: {
        templeteName: "",
        createName: "",
        createId: "",
        createTime: "",
        isUse: "",
        code: "",
        paragraphNum: "",
        paragraphSum: "",
        paragraphType: "",
       
      },
      // tableLoading: false,
      updateStatus: false,
      value: false, //是否启用
      // tableData:[{"templeteName":"测试模板","createId":"张三","createTime":"2020-2-21","isUse":"0","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
      // {"templeteName":"测试模板2","createId":"李四","createTime":"2020-2-21","isUse":"1","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
      // {"templeteName":"测试模板3","createId":"王五","createTime":"2020-2-21","isUse":"0","data":[{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"},{"paragraphNum":"20","paragraphType":"单选题","paragraphSum":"30"}]},
      // ],
      tableData: []
    };
  },
  components: {
    addTempleteComp
  },
  methods: {
    //修改启用状态
    change(event, row) {
      this.$confirm(`请确认是否${event === '0' ? '启用' : '停用'}试题？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm"
      })
      .then(() => {
        let data = {
          templeteId: row.templeteId,
          status: event
        };
        this.$store.dispatch("updateStatus", data).then(res => {
          if (res.code === 200) {
            row.isUse = event;
          }
        }, err => {
          this.$message({ type: 'error', message: err.msg || '' });
        });
      })
      .catch(() => {});
    },
    //点击添加tab标签，查看人员详情信息
    getTempleteInfo(row, param) {
      let _this = this;
      if (param === "0") {
        //详情
        _this.$store.dispatch("getPersonDetailInfo", row.personId).then(res => {
          if (res.code === 200) {
            _this.openPersonTag("setPersonInfo", res.data, param);
          }
        });
      } else {
        _this.openPersonTag("setPersonInfo", "", param);
      }
    },
    addTempleteInfo() {
      this.$refs.addTempleteCompRef.showModal("", 1);
    },

    //修改模板信息
    updateTempleteInfo(row) {
      let _this = this;
      _this.$store.dispatch("isCanUpdateTemplete", row.templeteId).then(res => {
        console.info(res.data.isCanUpdate);
        if (res.code == "200" && res.data.isCanUpdate == "true") {
          this.$refs.addTempleteCompRef.showModal(row, 2);
        } else {
          _this.$message({
            type: "error",
            message: "该模板已被引用，不能修改!"
          });
        }
      });
      err => {
        this.tableData.splice(0, this.tableData.length);
        this.dataSources = [];
        console.log(err);
      };
    },
    //根据查询条件
    getTempleteList() {
      let _this = this;
     // _this.tableLoading = true;
      let data = {
        templeteName: _this.templeteName,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("pageTempletePageList", data);
    },
    //删除所选择的用户信息
    deleteTempleteInfo(templeteId) {
      this.$confirm("确定要删除该模板吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'custom-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch('deletePageTempleteById', templeteId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            this.getTempleteList(); //重新加载页面数据
          }
        },
          err => {console.log(err);}
        );
      }).catch(() => {});
    },
    // 日志重置
    resetLog() {
      this.$refs["templeteFormRef"].resetFields();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTempleteList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTempleteList();
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectUserIdList = [];
      _this.selectList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.personId);
        _this.selectList.push(item.stationStatusName);
      });
    }
  },
  created() {
    this.getTempleteList();
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.temp{
  .pagination-box{
    height: 40px;
    text-align: center;
    margin: 15px;
  }
}
</style>
