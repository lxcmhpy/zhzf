<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchPageLayout" id="userBox">
      <div class="departOrUserTree">
        <p>机构列表</p>
        <el-input placeholder="输入机构名" v-model="filterText">
          <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
        </el-input>
        <div class="treeBox">
          <el-tree
            class="filter-tree"
            :data="organData"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node='false'
            :filter-node-method="filterNode"
            ref="tree"
            @node-click="handleNodeClick"
          >
          <span class="custom-tree-node" slot-scope="{ node,data }">
            <span>
              <i :class="data.children ? 'iconfont law-icon_zhan_bag' : ''"></i>
              {{ node.label }}
            </span>
          </span>
          </el-tree>
        </div>
      </div>
      <div class="searchPage toggleBox">
        <div class="handlePart">
          <el-form :inline="true" ref="userForm" :model="formInline" label-width="70px">
            <el-form-item label="查询范围" prop="selectValue">
              <el-select v-model="formInline.selectValue">
                <el-option
                  v-for="item in searchType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formInline.username" placeholder="回车可直接查询"
                        @keyup.enter.native="getUserList(1)"></el-input>
            </el-form-item>
            <el-form-item label=" " label-width="13px">
              <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-sousuo" title="搜索"
                         @click="getUserList(1)"></el-button>
              <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi"
                         @click="reset"></el-button>
              <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'"
                         :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="showSomeSearch"></el-button>
               <el-button size="medium"  type="primary"
                         @click="addUser">添加用户</el-button>
              <el-button size="medium" class="" type="primary"
                         @click="bindRole">绑定角色</el-button>
              <el-button size="medium" class="" type="primary"
                         @click="saveLawOfficel">转执法人员</el-button>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="isShow" :class="{'ransition-box':true}">
                <el-form-item label="姓名" prop="nickName">
                  <el-input v-model="formInline.nickName" placeholder="回车可直接查询"
                            @keyup.enter.native="getUserList(1)"></el-input>
                </el-form-item>
                <el-form-item label="证件号" prop="enforceNo">
                  <el-input v-model="formInline.enforceNo" placeholder="回车可直接查询"
                            @keyup.enter.native="getUserList(1)"></el-input>
                </el-form-item>
                <el-form-item label="账户状态" prop="region">
                  <el-select v-model="formInline.region">
                    <el-option
                      v-for="item in region"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-button type="primary" size="medium" @click="addUser">新增用户</el-button>
                <el-button type="primary" size="medium" @click="bindRole">角色绑定</el-button> -->
                <el-form-item label="联系电话" prop="mobile">
                  <el-input v-model="formInline.mobile" placeholder="回车可直接查询"
                            @keyup.enter.native="getUserList(1)"></el-input>
                </el-form-item>
              </div>
            </el-collapse-transition>
          </el-form>
        </div>
        <div class="tablePart">
          <el-table
            :data="tableData"
            stripe
            resizable
            border
            style="width: 100%;height:100%"
            @selection-change="selectUser"
          >
            <!-- @row-click="showUserDetail" -->
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名">
              <template slot-scope="scope">
                <div>
                  <el-button type="text" @click.stop="showUserDetail(scope.$index, scope.row)">{{scope.row.username}}</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="nickName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="ministerial" label="执法证号" align="center"></el-table-column>
            <el-table-column prop="mobile" label="联系电话" align="center"></el-table-column>
            <el-table-column prop="roleNames" label="角色" align="center"></el-table-column>
            <el-table-column prop="userOrgan" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="userDeparment" label="所属部门" align="center"></el-table-column>
            <el-table-column width="50" prop="status" label="状态" align="center">
              <template slot-scope="scope">
                <!-- <div>{{scope.row.status === 0?'正常':scope.row.status === -1?'拉黑':'待激活'}}</div> -->
                <div>
                  <span v-if="scope.row.status === 0">正常</span>
                  <span v-else style="color:red">停用</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template slot-scope="scope">
                <div style="width:180px">
                  <el-button type="text" size="small"  @click.stop="handleEdit(scope.$index, scope.row)">修改</el-button>
                  <el-button type="text" size="small" @click.stop="handleDelete(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click.stop="Initialization(scope.row)">初始化密码</el-button>
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

      <addUser ref="addUserRef" @uploadaaa="getUserList()"></addUser>
      <bindRole ref="bindRoleRef"></bindRole>
    </div>
  </div>
</template>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<script>
  import addUser from "./addUser";
  import bindRole from "./bindRole";

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    data() {
      return {
        isShow: false,
        region: [
          {label: '全部', value: ''},
          {label: '启用', value: '0'},
          {label: '停用', value: '1'},
          {label: '待激活', value: '2'}
        ],
        formInline: {
          nickName: "",
          enforceNo: "",
          username: "",
          mobile: "",
          selectValue: 1,
          region: ""
        },
        searchType: [{value: 1, label: '本机构'}, {value: 0, label: '本机构及子机构'}],
        filterText: "",
        selectCurrentTreeName: "机构人员列表",
        organData: [],
        defaultProps: {
          children: "children",
          label: "label"
        },
        tableData: [], //表格数据
        departLevel: 0, //级别
        defaultExpandedKeys: [], //默认展开的key
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        totalPage: 0, //总数
        departments: [], //机构下的部门
        currentOrganId: "",
        selectUserIdList: [] //选中的userid
      };
    },
    components: {
      addUser,
      bindRole
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      reset() {
        this.$refs["userForm"].resetFields();
        this.getUserList();
      },
      //展开
      showSomeSearch() {
        this.isShow = !this.isShow;
      },
      //点击树事件
      handleNodeClick(data) {
        console.log(data);
        this.selectCurrentTreeName = data.label;
        this.tableData = [];
        this.currentOrganId = data.id;
        console.log(this.currentOrganId);
        this.getUserList(1);
        // this.getDepartment();
      },
      //获取机构
      getAllOrgan() {
        let _this = this
        this.$store.dispatch("getAllOrgan").then(
          res => {
            console.log("机构", res);

            _this.defaultExpandedKeys.push(res.data[0].id);
            if (res.data[0].children && res.data[0].children.length > 0) {
              res.data[0].children.forEach(item => {
                _this.defaultExpandedKeys.push(item.id);
              });
            }
            _this.organData = res.data;
            console.log(_this.defaultExpandedKeys);
            console.log(_this.organData);
            _this.currentOrganId = res.data[0].id;
            _this.selectCurrentTreeName = res.data[0].label;
            _this.getUserList(1);
            //this.getDepartment();
          },
          err => {
            console.log(err);
          }
        );
      },
      //表单筛选
      getUserList(val) {
        this.currentPage = val
        let data = {
          mobile: this.formInline.mobile,
          username: this.formInline.username,
          nickName: this.formInline.nickName,
          enforceNo: this.formInline.enforceNo,
          selectValue: this.formInline.selectValue,
          organId: this.currentOrganId,
          current: this.currentPage,
          size: this.pageSize,
          status: this.formInline.region
        };
        console.log("用户", data);
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
          console.log("userData1", userData1);
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
        console.log("当前页", val);
        this.currentPage = val;
        this.getUserList(val);
      },
      // 表格编辑
      handleEdit(index, row) {
        let newRow =JSON.parse(JSON.stringify(row));
        this.$refs.addUserRef.handelEdit(newRow);
        // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
      },
      // 表格id删除
      handleDelete(row) {
        let _this = this
        this.$confirm("确认删除该用户?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            _this.$store.dispatch("getUserdelete", row.id).then(
              res => {
                _this.getAllOrgan(_this.$refs.addUserRef.id);
                _this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              },
              err => {
                console.log(err);
              }
            );
          })
          .catch(() => {
          });
      },

      // 密码初始化
      Initialization(row) {
        let _this = this
        this.$confirm("确认初始化密码?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log('row,',row)
            _this.$store.dispatch("getUserreset", row).then(
              res => {
                _this.getAllOrgan(_this.$refs.addUserRef.id);
                _this.$message({
                  type: "success",
                  message: "密码初始化成功!"
                });
              },
              err => {
                console.log(err);
              }
            );
          })
          .catch(() => {
          });
      },

      //新增机构
      addUser() {
        let parentNode = {
          parentNodeId: this.currentOrganId,
          parentNodeName: this.selectCurrentTreeName
        };
        this.$refs.addUserRef.showModal(parentNode);
      },

      //角色绑定
      bindRole() {
        if (this.selectUserIdList.length) {
          let data = {
            userIdList: this.selectUserIdList,
            organId: this.currentOrganId
          };
          this.$refs.bindRoleRef.showModal(data);
        } else {
          this.$message("请选择用户");
        }
      },
      //转执法人员
      saveLawOfficel() {
      if (this.selectUserIdList.length) {
          let _this = this;
          let data = {
              userId: this.selectUserIdList.join(','),
          };
        _this.$store.dispatch("saveLawOfficel", data).then(
            res => {
                _this.getAllOrgan(_this.$refs.addUserRef.id);
                _this.$message({
                    type: "success",
                    message: "转执法人员成功!"
                });
            },
            err => {
                console.log(err);
            }
        );
      } else {
        this.$message("请选择用户");
      }
    },
      //获取选中的user
      selectUser(val) {
        console.log(val);
        this.selectUserIdList = [];
        let _this = this
        val.forEach(item => {
          _this.selectUserIdList.push(item.id);
          console.log(_this.selectUserIdList);
        });
      },
      //查看用户详情
      showUserDetail(v,row){
        console.log(" -> v,row", v,row)
        let newRow =JSON.parse(JSON.stringify(row))
        this.$refs.addUserRef.showUserDetail(newRow);
      }
    },
    mounted() {
      // this.setDepartTable(this.data)
    },
    created() {
      this.getAllOrgan();
    }
  };
</script>
<!--
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
-->
