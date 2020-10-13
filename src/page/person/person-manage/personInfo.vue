<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPage">
      <div class="handlePart">
        <el-form
          class="search-form"
          :inline="true"
          :model="personForm"
          label-width="68px"
          ref="personFormRef"
        >
          <div>
            <div class="item">
              <el-form-item label="id" v-show="false" prop="personId">
                <el-input v-model="personForm.personId"></el-input>
              </el-form-item>
              <el-form-item label="姓名" prop="personName">
                <el-input v-model="personForm.personName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNo">
                <el-input v-model="personForm.idNo" class="card-input"></el-input>
              </el-form-item>
              <el-form-item label="执法证号" prop="ministerialNo">
                <el-input v-model="personForm.ministerialNo"></el-input>
              </el-form-item>
              <el-form-item style="margin-top:1px; margin-left: 15px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1 ;getPersonList()"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetLog"
                ></el-button>
                <el-button
                  size="medium"
                  class="commonBtn toogleBtn"
                  :title="isShow? '点击收缩':'点击展开'"
                  :icon="isShow? 'iconfont law-top': 'iconfont law-down'"
                  @click="isShow = !isShow"
                ></el-button>
              </el-form-item>
            </div>
            <div class="item" v-show="isShow">
              <el-form-item label="所属机构" prop="oname">
                <el-input v-model="personForm.oname"></el-input>
              </el-form-item>
              <el-form-item label="执法领域" prop="branchId">
                <el-select
                  v-model="personForm.branchId"
                  placeholder="执法领域"
                  remote
                  @focus="getDepatements('执法门类','branchIdsInfo')"
                >
                  <el-option
                    v-for="value in branchIdsInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位" prop="stationId">
                <el-select
                  v-model="personForm.stationId"
                  placeholder="选择岗位"
                  remote
                  @focus="getStationInfo('人员信息-岗位','stationInfo')"
                >
                  <el-option
                    v-for="value in stationInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位状态" prop="stationStatus">
                <el-select
                  v-model="personForm.stationStatus"
                  placeholder="选择岗位状态"
                  remote
                  @focus="getDepatements('人员信息-岗位状态','stationStatusInfo')"
                >
                  <el-option
                    v-for="value in stationStatusInfo"
                    :key="value.id"
                    :label="value.name"
                    :value="value.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="tableHandle">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="medium"
          @click="getDetailInfo('','1')"
        >新增人员</el-button>
        <el-button type="info" icon="el-icon-delete-solid" size="medium" @click="deletePerson">删除人员</el-button>
        <el-button plain size="medium" @click="applyDd">申请调动</el-button>
        <el-button plain size="medium" @click="applyTx">申请退休</el-button>
        <el-button plain size="medium" @click="applyDl">申请调离</el-button>
        <el-button plain size="medium" @click="applyApprove">申请审批</el-button>
        <el-button plain size="medium" @click="exportExcel">导出人员列表</el-button>
        <el-button plain size="medium" @click="exportExcel1">导出人员头像</el-button>
      </div>
      <div class="tablePart">
        <el-table
          ref="psersonTable"
          :data="tableData"
          resizable
          stripe
          class="person-table"
          v-loading="tableLoading"
          element-loading-spinner="car-loading"
          element-loading-text="加载中..."
          style="width: 100%;height:100%;"
          @selection-change="selectUser"
          @row-click="rowClick"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
          <el-table-column prop="idNo" label="身份证号" align="center" width="170px;"></el-table-column>
          <el-table-column prop="birthDate" label="出生日期" align="center"></el-table-column>
          <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
          <el-table-column prop="postName" label="职务" align="center"></el-table-column>
          <el-table-column prop="stationName" label="岗位" align="center"></el-table-column>
          <el-table-column prop="stationStatusName" label="岗位状态" align="center">
            <template slot-scope="scope">
              <span
                v-if="scope.row.stationStatusName === '调动中'"
                style="color: #0074F5;"
              >{{scope.row.stationStatusName}}</span>
              <span
                v-else-if="scope.row.stationStatusName === '退休'"
                style="color: #999;"
              >{{scope.row.stationStatusName}}</span>
              <span
                v-else-if="scope.row.stationStatusName === '调离'"
                style="color: #E84241;"
              >{{scope.row.stationStatusName}}</span>
              <span v-else>{{scope.row.stationStatusName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ministerialNo" label="执法证号" align="center"></el-table-column>
          <!--<el-table-column prop="branchName" label="执法领域" align="center"></el-table-column>-->
          <el-table-column prop="certStatusName" label="证件办理状态" align="center"></el-table-column>
          <el-table-column prop="opt" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getDetailInfo(scope.row,'0')">
                <i class="iconfont law-eye" />
              </el-button>
            </template>
          </el-table-column>
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
    </div>
    <!-- 申请调动的时候弹出框 -->
    <addApplyDdComp ref="addApplyDdCompRef" @getAddApplyDdComp="getPersonList"></addApplyDdComp>
  </div>
</template>
<script>
import addApplyDdComp from "@/page/person/person-apply/addApplyDd";
import { mixinPerson } from "@/common/js/personComm";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
import { exportPersonInfoApi,personPictureApi } from '@/api/person';
import { downLoadFile } from '@/api/joinExam';
export default {
  mixins: [mixinPerson],
  name: "personInfo",
  data() {
    return {
      branchIdsInfo: [{ id: "", name: "全部" }], //执法领域列表
      oidsInfo: [{ id: "", name: "全部" }], //所属机构列表
      stationInfo: [{ id: "", name: "全部" }], //岗位列表
      stationStatusInfo: [{ id: "", name: "全部" }], //岗位状态
      isShow: false,
      personForm: {
        branchName: "", //执法领域名称
        branchId: "", //执法领域id
        personTypeName: "",
        sex: "",
        sexName: "",
        personsId: "", //id
        idNo: "", //身份证号
        personName: "", //执法人名
        birthDate: "", //出生日期
        nation: "", //民族
        degree: "", //学历
        politicalStatus: "", //政治面貌
        admissionDate: "", //入党日期
        school: "", //毕业学校
        major: "", //专业
        graduationNo: "", //
        oname: "", //所属机构
        post: "", //职务
        postName: "", //职务名称
        disChannel: "", //分配渠道
        staffing: "", //人员编制
        workDate: "", //参加工作时间
        photo: "", //照片
        branchId: "", //执法门类=执法领域
        enfoceDate: "", //从事执法日期
        ministerialNo: "", //执法证号
        qualificationNo: "", //资格证书编号
        provinceNo: "", //现持省内执法证号 现持省内执法证号
        ministerialNo: "", //现持部级执法证号 现持部级执法证号
        maritimeNo: "", //现持海事执法证号 现持海事执法证号
        note: "", //备注
        certStatusName: "", //证件状态
        personStatus: "", //人员状态
        attachedUrl: "", //附件路径
        attached: "", //附件
        photoUrl: "", //照片路径
        personType: "", //人员类型
        nationName: "",
        stationId: "", //岗位id
        stationName: "", //岗位名称
        stationStatus: "", //岗位状态
        stationStatusName: "", //岗位状态名称
        lawCertNo: "", //法律资格证书编号
        currentCertStatusName: "" //证件办理状态
      },
      selectUserIdList: [], //选中执法人员id
      selectList: [], //选中执法人员信息
      props: { label: "label", value: "id" },
      tableDataTree: []
      // tableData: [{ personName: '页面跳转', personId: '123' }, { personName: '跳转1', personId: '234' }]
    };
  },
  components: { addApplyDdComp, elSelectTree },
  methods: {
    exportExcel(type) {
    let _this = this;
      let data = {
        personName: _this.personForm.personName,
        idNo: _this.personForm.idNo,
        ministerialNo: _this.personForm.ministerialNo,
        branchId: _this.personForm.branchId,
        oName: _this.personForm.oname,
        certStatus: _this.personForm.certStatus,
        personType: _this.personForm.personType,
        post: _this.personForm.post,
        stationId: _this.personForm.stationId,
        stationStatus: _this.personForm.stationStatus,
        current: _this.currentPage,
        size: _this.pageSize
      };
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
      //导出excel
       exportPersonInfoApi(data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
      
    },

     exportExcel1(type) {
    let _this = this;
      let data = {
        personName: _this.personForm.personName,
        idNo: _this.personForm.idNo,
        ministerialNo: _this.personForm.ministerialNo,
        branchId: _this.personForm.branchId,
        oName: _this.personForm.oname,
        certStatus: _this.personForm.certStatus,
        personType: _this.personForm.personType,
        post: _this.personForm.post,
        stationId: _this.personForm.stationId,
        stationStatus: _this.personForm.stationStatus,
        current: _this.currentPage,
        size: _this.pageSize
      };
      const loading = this.$loading({
        lock: true,
        text: '正在导出',
        spinner: 'car-loading',
        customClass: 'loading-box',
        background: 'rgba(234,237,244, 0.8)'
      });
     
      //导出照片
      personPictureApi(data).then(res => {
        loading.close()
        downLoadFile(res.data, res.fileName);
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    applyTx() {
      //申请退休
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({ type: "warning", message: "请选择申请退休人员信息" });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message.warning("每次只能选择1人申请退休");
        return;
      } else {
        let ssn = _this.selectList[0];
        if (ssn === "调动中" || ssn === "退休" || ssn === "调离") {
          _this.$message({
            type: "warning",
            message: "当前岗位状态为" + ssn + "，不允许退休"
          });
          return;
        }
        if (ssn === "在岗") {
          _this
            .$confirm("确认申请退休吗？退休后执法证号将被注销！", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              iconClass: "el-icon-question",
              customClass: "custom-confirm"
            })
            .then(() => {
              _this.$store.dispatch("applyTx", _this.selectUserIdList).then(
                res => {
                  if (res.code === 200) {
                    _this.$message({
                      type: "success",
                      message: "申请退休成功!"
                    });
                    //重新加载页面数据
                    _this.getPersonList();
                  } else {
                    _this.$message({ type: "error", message: "申请退休失败!" });
                  }
                },
                err => {
                  _this.$message({ type: "error", message: err.msg || "" });
                }
              );
            });
        }
      }
    },
    applyDl() {
      //申请调离
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({ type: "warning", message: "请选择申请调离人员信息" });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message.warning("每次只能选择1人申请调离");
        return;
      } else {
        let ssn = _this.selectList[0];
        if (ssn === "调动中" || ssn === "退休" || ssn === "调离") {
          _this.$message({
            type: "warning",
            message: "当前岗位状态为" + ssn + "，不允许调离"
          });
          return;
        }
        if (ssn === "在岗") {
          _this
            .$confirm("确认申请调离吗？调离后执法证号将被注销！", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              iconClass: "el-icon-question",
              customClass: "custom-confirm"
            })
            .then(() => {
              _this.$store.dispatch("applyDl", _this.selectUserIdList).then(
                res => {
                  if (res.code === 200) {
                    _this.$message({ type: "success", message: "调离成功!" });
                    //重新加载页面数据
                    _this.getPersonList();
                  } else {
                    _this.$message({ type: "error", message: "调离失败!" });
                  }
                },
                err => {
                  _this.$message({ type: "error", message: err.msg || "" });
                }
              );
            })
            .catch(() => {});
        }
      }
    },
    applyDd() {
      //申请调动
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({
          type: "warning",
          message: "请选择申请调动人员信息"
        });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message.warning("每次只能选择一名人员申请调动");
      } else {
        let ssn = _this.selectList[0];
        if (ssn === "调岗中" || ssn === "退休" || ssn === "调离") {
          _this.$message({
            type: "warning",
            message: "当前岗位状态为" + ssn + "，不允许调岗"
          });
          return;
        }
        _this.$refs.addApplyDdCompRef.showModal(_this.selectUserIdList[0]);
      }
    },
    applyApprove() {
      //申请审批
      let _this = this;
      if (
        _this.selectUserIdList == undefined ||
        _this.selectUserIdList.length == 0
      ) {
        _this.$message({ type: "warning", message: "请选择申请审批人员信息" });
      } else {
        _this
          .$confirm("确认申请审批吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            iconClass: "el-icon-question",
            customClass: "custom-confirm"
          })
          .then(() => {
            _this.$store.dispatch("applyApprove", _this.selectUserIdList).then(
              res => {
                if (res.code === 200) {
                  _this.$message({ type: "success", message: "申请审批成功!" });
                  //重新加载页面数据
                  _this.getPersonList();
                }
              },
              err => {
                _this.$message({ type: "error", message: err.msg || "" });
              }
            );
          })
          .catch(() => {});
      }
    },

    //点击添加tab标签，查看人员详情信息
    getDetailInfo(row, param) {
      let _this = this;
      if (param === "0") {
        //详情
        if(row.certStatusName === '审批未通过'){
          _this.openPersonDetail(row, "view");
        }else{
          _this.openPersonDetail(row, "edit");
        }
      } else {
        localStorage.removeItem("AddPerson");
        _this.openPersonTag("setPersonInfo", "", param);
      }
    },
    //点击下拉框的时候后头获取下拉框数据
    getDepatements(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (codeName === "branchIdsInfo") {
              this.branchIdsInfo = res.data;
              this.branchIdsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "stationIdsInfo") {
              this.stationIdsInfo = res.data;
              this.stationIdsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "oidsInfo") {
              this.oidsInfo = res.data;
              this.oidsInfo.unshift({ id: "", name: "全部" });
            }
            if (codeName === "stationStatusInfo") {
              this.stationStatusInfo = res.data;
              this.stationStatusInfo.unshift({ id: "", name: "全部" });
            }
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    //修改人员信息
    editPerson(row) {
      this.$refs.addPersonCompRef.showModal(2, row);
    },
    addPersonPersonComPage() {
      this.$refs.addPersonCompRef.showModal(1, "");
    },
    //根据查询条件查询人员基本信息
    getPersonList() {
      let _this = this;
      let data = {
        personName: _this.personForm.personName,
        idNo: _this.personForm.idNo,
        ministerialNo: _this.personForm.ministerialNo,
        branchId: _this.personForm.branchId,
        oName: _this.personForm.oname,
        certStatus: _this.personForm.certStatus,
        personType: _this.personForm.personType,
        post: _this.personForm.post,
        stationId: _this.personForm.stationId,
        stationStatus: _this.personForm.stationStatus,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getAllPerson", data);
    },
    //删除所选择的用户信息
    deletePerson() {
      let _this = this;
      if (!_this.selectUserIdList.length) {
        this.$message.warning("请选择删除人员");
        return false;
      } else if (_this.selectUserIdList.length > 1) {
        this.$message.warning("每次只能删除1名人员");
        return false;
      } else {
        this.$confirm("确定要删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "el-icon-question",
          customClass: "custom-confirm"
        })
          .then(() => {
            this.$store
              .dispatch("deletePersonInfoById", this.selectUserIdList[0])
              .then(
                res => {
                  if (res.code === 200) {
                    this.$message.success("删除成功");
                    this.getPersonList();
                  } else {
                    this.$alert(res.message, "提示", {
                      confirmButtonText: "确定"
                    });
                  }
                },
                err => {
                  this.$message({ type: "warning", message: err.msg || "" });
                }
              );
          })
          .catch(() => {});
      }
    },
    // 日志重置
    resetLog() {
      this.$refs["personFormRef"].resetFields();
      this.currentPage = 1;
      this.getPersonList();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPersonList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPersonList();
    },
    // 获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectUserIdList = [];
      _this.selectList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.personId);
        _this.selectList.push(item.stationStatusName);
      });
    },

    // 点击行
    rowClick(row, column, event) {
      if (column.property !== "opt") {
        this.$refs.psersonTable.clearSelection();
        this.$refs.psersonTable.toggleRowSelection(row);
        this.selectUserIdList.splice(0, this.selectUserIdList.length);
        this.selectList.splice(0, this.selectList.length);
        this.selectUserIdList.push(row.personId);
        this.selectList.push(row.stationStatusName);
      }
    }
  },
  created() {
    this.getPersonList();
    this.searchTable();
  }
};
</script>

<style  lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/personManage.scss";
.search-form {
  >>> .el-input,
  >>> .el-select {
    width: 180px;
    margin-right: 0;
  }
}
>>> .el-select {
  margin-right: 0;
}
.person-table {
  >>> .el-table__body-wrapper {
    padding-bottom: 0;
  }
}
.tableHandle {
  margin-bottom: 10px;
}
</style>
