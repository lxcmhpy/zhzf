<template>
  <div class="height100" id="inspectorBox">
    <div style="width:calc(50% - 20px);" class="height100 inspector-left">
      <div class="handlePart el-form-bottom0">
        <div class="search toggleBox search-mini" style="width:100%">
          <div
            class="handlePart caseHandleSearchPart"
            :class="isShow?'autoHeight':'aaa'"
            style="margin:0;"
          >
            <el-form :inline="true" :model="searchForm" class ref="searchForm">
              <el-form-item>执法人员库</el-form-item>
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="searchForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="在岗情况" prop="stationStatusName">
                <el-select v-model="searchForm.stationStatusName" placeholder="请选择">
                  <el-option label="在岗" value="在岗"></el-option>
                  <el-option label="调岗中" value="调岗中"></el-option>
                  <el-option label="退休" value="退休"></el-option>
                  <el-option label="调离" value="调离"></el-option>
                  <el-option label="自然人" value="自然人"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item></el-form-item>
            </el-form>
            <div class="search-btns">
              <el-button
                size="medium"
                title="搜索"
                icon="iconfont law-sousuo"
                @click="searchTableData()"
              ></el-button>
              <el-button
                size="medium"
                :title="isShow? '点击收缩':'点击展开'"
                :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                @click="isShow = !isShow"
              ></el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="handlePart el-form-bottom0">
        <div class="search" style="width:100%">
          <el-form :inline="true">
            <div style="width:auto;float:right">
              <el-form-item>
                <el-button
                  size="medium"
                  type="primary"
                  @click="exportMethod('exportPerson','执法人员表.xls')"
                >导出所有人员</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          height="100%"
          @row-click="openDetails"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
          <el-table-column prop="stationName" label="岗位" align="center"></el-table-column>
          <el-table-column prop="stationStatusName" label="状态" align="center"></el-table-column>
          <el-table-column prop="staffingName" label="编制" align="center"></el-table-column>
          <el-table-column prop="postName" label="职务" align="center"></el-table-column>
          <el-table-column prop="oname" label="单位" align="center"></el-table-column>
        </el-table>
      </div>
      <div class="paginationBox">
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
    <div class="height100 inspector-left inspector-center">
      <div class="inspection-center-btn" @click="copyMethod">
        <i class="el-icon-d-arrow-right"></i>
        <br />复制
      </div>
    </div>
    <div style="width:calc(50% - 20px);" class="height100 inspector-left">
      <publicInspectors :freshFlag="freshFlag"></publicInspectors>
    </div>
    <el-dialog title="人员详情" :close-on-click-modal="false" :visible.sync="dialogFormVisible" style="width:auto">
      <el-form ref="form" :model="personInfoDetailForm" label-width="155px">
        <!--基本信息 -->
        <div class="info_box">
          <div class="info_content">
            <div class="info_body">
              <el-row :span="24">
                <el-form-item label="执法人员照片：">
                  <img
                    v-if="personInfoDetailForm.photoUrl"
                    :src="baseUrl + personInfoDetailForm.photoUrl"
                    onerror="@/../static/images/img/personInfo/upload_bg.png"
                  />
                  <img v-else :src="personImg" alt />
                </el-form-item>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名：">{{personInfoDetailForm.personName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号：">{{personInfoDetailForm.idNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别：">{{personInfoDetailForm.sexName}}</el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="民族：">{{personInfoDetailForm.nationName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="所学专业：">{{personInfoDetailForm.majorName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="文化程度：">{{personInfoDetailForm.degreeName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="政治面貌：">{{personInfoDetailForm.politicalStatusName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用户职务：">{{personInfoDetailForm.postName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="出生日期：">{{personInfoDetailForm.birthDate}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="参加工作日期：">{{personInfoDetailForm.workDate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="入党日期：">{{personInfoDetailForm.admissionDate}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="参加执法工作日期：">{{personInfoDetailForm.enfoceDate}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="毕业学校：">{{personInfoDetailForm.school}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="毕业证书编号：">{{personInfoDetailForm.graduationNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="分配渠道：">{{personInfoDetailForm.disChannelName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="人员编制：">{{personInfoDetailForm.staffingName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执法区域：">{{personInfoDetailForm.area}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="执法领域：">{{personInfoDetailForm.branchName}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="资格证书编号：">{{personInfoDetailForm.qualificationNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="现持省内执法证号：">{{personInfoDetailForm.provinceNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="现持部级执法证号：">{{personInfoDetailForm.ministerialNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="现持海事执法证号：">{{personInfoDetailForm.maritimeNo}}</el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="执法岗位：">{{personInfoDetailForm.stationName}}</el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  findRecordListApi,
  getAllPersonApi,
  getDictListDetailByNameApi,
  addMorePublicPersonApi,
  exportAllPersonApi,
} from "@/api/inspection";
// import { getAllPersonApi, } from "@/api/person";
import iLocalStroage from "@/common/js/localStroage";
import publicInspectors from "./publicInspectors.vue";
import { mixinPerson } from "@/common/js/personComm";
import { mixinInspection } from "@/common/js/inspectionComm";
export default {
  mixins: [mixinPerson, mixinInspection],
  components: {
    publicInspectors,
  },
  data() {
    return {
      tableData: [], //表格数据
      multipleSelection: [],
      searchForm: {
        domain: "",
        status: "",
        createUser: iLocalStroage.gets("userInfo").nickName,
        otherUser: "",
        title: "",
        defaultDisplay: true,
        name: "",
      },
      personImg: "@/../static/images/img/personInfo/upload_bg.png",
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      isShow: false,
      dialogFormVisible: false,
      personInfoDetailForm: {},
      formLabelWidth: "100px",
      rules: {
        pass: [{ required: true, message: "必填项", trigger: "change" }],
        checkPass: [{ required: true, message: "必填项", trigger: "change" }],
        age: [{ required: true, message: "必填项", trigger: "change" }],
      },
      zzmmList: [],
      zcList: [],
      workStatusList: [],
      options: [],
      freshFlag: 1,
    };
  },
  methods: {
    // 查询列表时
    getTableData() {
      let data = {
        // oName: iLocalStroage.gets("userInfo").organName,
        personName: this.searchForm.personName,
        organId: iLocalStroage.gets("userInfo").organId,
        // personName: '11',
        stationStatusName: this.searchForm.stationStatusName,
        // stationStatusName: '在岗',
        // oName: '固原综合执法支队',
        current: this.currentPage,
        size: this.pageSize,
      };
      getAllPersonApi(data).then(
        (res) => {
          console.log(res);
          this.tableData = res.data.records;
          this.totalPage = res.data.total;
        },
        (error) => {
          // reject(error);
        }
      );
    },
    // 选择数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("multipleSelection", this.multipleSelection);
    },
    openDetails(row) {
      console.log(row);
      // this.$store.dispatch("getPersonDetailInfo", row.personId).then(res => {
      //   if (res.code === 200) {
      //     console.log(res)
      //     this.openPersonTag("setPersonInfo", res.data, 0);
      //   }
      // });
      this.dialogFormVisible = true;
      this.personInfoDetailForm = row;
    },
    resetSearchData(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.defaultDisplay = true;
      this.getTableData();
    },
    // 导出
    exportMethod(methodName, fileName) {
      let data = {
        organId: iLocalStroage.gets("userInfo").organId,
      };
      exportAllPersonApi(data)
        .then((res) => {
          //浏览器兼容，Google和火狐支持a标签的download，IE不支持
          //其他浏览器
          let link = document.createElement("a"); // 创建a标签
          link.style.display = "none";
          link.setAttribute("download", fileName); //必须要重命名
          let objectUrl = URL.createObjectURL(res);
          link.href = objectUrl;
          link.click();
          URL.revokeObjectURL(objectUrl);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    importModle() {},
    downloadModle() {},
    getDrawerList(data) {
      let _this = this;
      getDictListDetailByNameApi(data).then(
        (res) => {
          _this.options = res.data;
        },
        (error) => {
          // reject(error);
        }
      );
    },
    copyMethod() {
      // 走公开人员的添加接口
      let _this = this;
      if (this.multipleSelection.length > 0) {
        this.multipleSelection.forEach((element) => {
          element.organName = iLocalStroage.gets("userInfo").organName;
          // 删除是否在岗
          if (element.stationStatusName) {
            this.$delete(element, "stationStatusName");
          }
        });
        addMorePublicPersonApi(this.multipleSelection).then(
          (res) => {
            if (res.code == 200) {
              _this.freshFlag += JSON.parse(JSON.stringify(_this.freshFlag));
              _this.toggleSelection();
              _this.$message({ type: "success", message: res.msg });
            }
          },
          (error) => {
            // reject(error);
          }
        );
      } else {
        this.$message({ type: "warning", message: "请选择至少一条数据" });
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
  mounted() {
    this.getTableData();
    // 获取抽屉
    this.getDrawerList("在岗情况");
  },
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss" src="@/assets/css/searchPage.scss"></style>
<style lang="scss" >
#inspectorBox {
  .inspector-left {
    float: left;
    border-right: 1px solid #e4e7ed;
    box-sizing: border-box;
  }
  .inspector-center {
    width: 40px;
    text-align: center;
  }
  .inspection-center-btn {
    position: relative;
    top: 47%;
    cursor: pointer;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>