<template>
<el-dialog
    :visible.sync="visible"
    :title = "title"
    :close-on-click-modal="false"
    @close="closeDialog"
    width="75%"
    append-to-body
  >
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="searchPage toggleBox">
        <div class="handlePart">
          <el-form :inline="true" ref="userForm" :model="formInline" label-width="70px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formInline.username" placeholder="回车可直接查询"
                        @keyup.enter.native="getUserList(1)"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="nickName">
                  <el-input v-model="formInline.nickName" placeholder="回车可直接查询"
                            @keyup.enter.native="getUserList(1)"></el-input>
                </el-form-item>
            <el-form-item label=" " label-width="13px">
              <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-sousuo" title="搜索"
                         @click="getUserList(1)"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi"
                         @click="reset"></el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            resizable
            border
            style="width: 100%;height:100%"
            @row-click="showUserDetail"
          >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="nickName" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"></el-table-column>
            <el-table-column prop="roleNames" label="角色"></el-table-column>
            <el-table-column prop="userOrgan" label="所属机构"></el-table-column>
            <el-table-column width="50" prop="status" label="状态">
              <template slot-scope="scope">
                <div>{{scope.row.status === 0?'正常':scope.row.status === -1?'拉黑':'待激活'}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <div style="width:160px">
                  <el-button type="text" @click.stop @click="bindLawOfficer(scope.row.id)">绑定</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paginationBox" v-if="tableData.length > 0">
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
  </div>
</el-dialog>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
  export default {
    data() {
      return {
        visible: false,
        formInline: {
          nickName: "",
          username: ""
        },
        addLawOfficer: {
          id: "",
          lawOfficerName: "",
          lawOfficerCards: "",
          userId: "",
          organId: "",
          createTime: ""
        },
        tableData: [], //表格数据
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        totalPage: 0, //总数
        currentOrganId: ""
      };
    },
    methods: {
      showModal(data) {
      this.visible = true;
      this.addLawOfficer.id = data.id;
      this.addLawOfficer.lawOfficerName = data.lawOfficerName;
      this.addLawOfficer.lawOfficerCards = data.lawOfficerCards;
      this.addLawOfficer.organId = data.organId;
    },
      //重置
      reset() {
        this.$refs["userForm"].resetFields();
        this.getUserList();
      },
      //表单筛选
      getUserList(val) {
        this.currentPage = val
        let data = {
          mobile: this.formInline.mobile,
          username: this.formInline.username,
          nickName: this.formInline.nickName,
          current: this.currentPage,
          size: this.pageSize
        };
        let _this = this
        this.$store.dispatch("getUserList", data).then(res => {
          console.log(res);
          _this.totalPage = res.data.ipageList.total;
          let userData1 = res.data.ipageList.records;
          let userRoleData = res.data.userOtherInfoList;
          userData1.forEach(item => {
            let userItemRoles = []; //用户下的角色
            let userDeparment = ""; //用户所在的部门
            let userOrgan = ""; //用户所在的机构
            userRoleData.forEach(item2 => {
              if (item.id == item2.userId) {
                userItemRoles.push(item2.roleName);
                userDeparment = item2.departmentTitle;
                userOrgan = item2.organTitle;
              }
            });
            item.roleNames = userItemRoles.join(",");
            item.userDeparment = userDeparment;
            item.userOrgan = userOrgan;
          });
          _this.tableData = userData1;
        });
        err => {
          console.log(err);
        };
      },
      //更改每页显示的条数
      handleSizeChange(val) {
        console.log("每页显示的条数", val);
        this.pageSize = val;
        this.getUserList(1);
      },
      //更换页码
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUserList(val);
      },
      // 表格编辑
      bindLawOfficer(userId) {
        this.addLawOfficer.userId = userId;
        this.$store.dispatch("bindUser", this.addLawOfficer).then(res => {
        })
      },
    },
    mounted() {
    },
    created() {
      this.getUserList();
    }
  };
</script>
<!--
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
-->
