<template>
  <div class="fullBox departBox" id="userBox">
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
    <div class="departTable">
      <el-form :model="formInline" label-width="70px">
        <div class="userSearchPart">
          <div>
            <el-form-item label="查询方法">
              <el-select v-model="formInline.searchType1" placeholder="请选择">
                <el-option
                  v-for="item in searchType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="用户名">
              <el-input v-model="formInline.username"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="姓名">
              <el-input v-model="formInline.nickName"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="证件号">
              <el-input v-model="formInline.enforceNo"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="账户状态">
              <el-select v-model="formInline.region" style="width:120px;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <!-- <el-form-item> -->
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getUserList">查询</el-button>
            <!-- </el-form-item> -->
          </div>
        </div>
        <div class="userSearchPart">
          <div>
            <el-button type="primary" size="medium" @click="addUser">新增用户</el-button>
            <el-button type="primary" size="medium" @click="bindRole">角色绑定</el-button>
          </div>
          <div>
            <el-form-item label="联系电话">
              <el-input v-model="formInline.mobile"></el-input>
            </el-form-item>
          </div>
          <!-- <p>{{selectCurrentTreeName}}</p> -->
          <p>人员列表</p>
        </div>
      </el-form>

      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        height="70%"
        @selection-change="selectUser"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="nickName" label="姓名"></el-table-column>
        <el-table-column prop="enforceNo" label="执法证号"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column prop="roleNames" label="角色"></el-table-column>
        <el-table-column prop="userOrgan" label="所属机构"></el-table-column>
        <el-table-column prop="userDeparment" label="所属部门"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>{{scope.row.status === 0?'正常':scope.row.status === -1?'拉黑':'待激活'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="230" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" @click="Initialization(scope.row)">初始化</el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <addUser ref="addUserRef" @uploadaaa="getUserList()"></addUser>
    <bindRole ref="bindRoleRef"></bindRole>
  </div>
</template>

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
      formInline: {
        nickName: "",
        enforceNo: "",
        username: "",
        mobile: ""
      },
      searchType:[{value:0,label:'本机构'},{value:1,label:'本机构及子机构'}],
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

    //点击树事件
    handleNodeClick(data) {
      console.log(data);
      this.selectCurrentTreeName = data.label;
      this.tableData = [];
      this.currentOrganId = data.id;
      console.log(this.currentOrganId);
      this.getUserList();
      // this.getDepartment();
    },
    //获取机构
    getAllOrgan() {
      this.$store.dispatch("getAllOrgan").then(
        res => {
          console.log("机构", res);

          this.defaultExpandedKeys.push(res.data[0].id);
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              this.defaultExpandedKeys.push(item.id);
            });
          }
          this.organData = res.data;
          console.log(this.defaultExpandedKeys);
          console.log(this.organData);
          this.currentOrganId = res.data[0].id;
          this.selectCurrentTreeName = res.data[0].label;
          this.getUserList();
          //this.getDepartment();
        },
        err => {
          console.log(err);
        }
      );
    },
    //表单筛选
    getUserList() {
      this.currentPage = 1;
      let data = {
        mobile: this.formInline.mobile,
        username: this.formInline.username,
        nickName: this.formInline.nickName,
        enforceNo: this.formInline.enforceNo,
        organId: this.currentOrganId,
        current: this.currentPage,
        size: this.pageSize,
        status: this.formInline.region
      };
      console.log("用户", data);
      this.$store.dispatch("getUserList", data).then(res => {
        console.log(res);
        this.totalPage = res.data.ipageList.total;
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
        this.tableData = userData1;
      });
      err => {
        console.log(err);
      };
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      console.log("每页显示的条数", val);
      this.pageSize = val;
      this.getUserList();
    },
    //更换页码
    handleCurrentChange(val) {
      console.log("当前页", val);
      this.currentPage = val;
      this.getUserList();
    },
    // 表格编辑
    handleEdit(index, row) {
      this.$refs.addUserRef.handelEdit(row);
      // this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row));
    },
    // 表格id删除
    handleDelete(row) {
      this.$confirm("确认删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("getUserdelete", row.id).then(
            res => {
              this.getAllOrgan(this.$refs.addUserRef.id);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },

    // 密码初始化
    Initialization(row) {
      this.$confirm("确认初始化密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("getUserreset", row.id).then(
            res => {
              this.getAllOrgan(this.$refs.addUserRef.id);
              this.$message({
                type: "success",
                message: "密码初始化成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
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
    //获取选中的user
    selectUser(val) {
      console.log(val);
      this.selectUserIdList = [];
      val.forEach(item => {
        this.selectUserIdList.push(item.id);
        console.log(this.selectUserIdList);
      });
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

<style lang="less">
@import "../../../css/systemManage.less";
</style>