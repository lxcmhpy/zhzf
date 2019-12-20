<template>
  <div class="fullBox departBox">
    <div class="departOrUserTree">
      <p>机构列表</p>
      <el-input placeholder="输入机构名" v-model="filterText">
        <el-button slot="append" size="mini" icon="el-icon-search"></el-button>
      </el-input>
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
    <div class="departTable">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="查询方法" size="mini">
            <el-input   style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item label="用户名" size="mini">
            <el-input v-model="formInline.username"  style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item label="姓名" size="mini">
            <el-input v-model="formInline.nickName"  style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item label="证件号" size="mini">
            <el-input v-model="formInline.enforceNo"  style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item label="账户状态" size="mini">
            <el-select v-model="formInline.region"  style="width:120px;"> 
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="getUserList">查询</el-button>
          </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="联系电话" size="mini">
            <el-input v-model="formInline.mobile"  style="width:120px;"></el-input>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" @click="addUser">新增用户</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" >角色绑定</el-button>
          </el-form-item>
      </el-form>

      <p>{{selectCurrentTreeName}}</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="nickName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="enforceNo" label="执法证号"></el-table-column>
        <el-table-column prop="mobile" label="联系电话"></el-table-column>
        <el-table-column prop="type" label="角色">
            <template slot-scope="scope">
              <div>
                {{scope.row.type === 0?'普通用户':'管理员'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column prop="organTitle" label="所属机构"></el-table-column>
        <el-table-column prop="departmentTitle" label="所属部门"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
              <div>
                {{scope.row.status === 0?'正常':scope.row.status === -1?'拉黑':'待激活'}}
              </div>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="230">
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
  </div>
</template>

 <script>
 import addUser from "./addUser";  
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
        username:"",
        mobile:"",
      },
     
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
      totalPage: 0, //总页数
     
    };
  },
  components: {
    addUser
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
      console.log(this.currentOrganId)
      this.getUserList();
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
          this.getUserList();
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
        status: this.formInline.region,
      };
      console.log("用户", data);
      this.$store.dispatch("getUserList", data).then(res => {
          this.tableData = res.data.records;
          console.log(res);
        })
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
      this.$refs.addUserRef.handelEdit();
      this.$refs.addUserRef.addUserForm = JSON.parse(JSON.stringify(row))
      this.$refs.addUserRef.addUserForm.organTitle = this.selectCurrentTreeName
      this.$refs.addUserRef.addUserForm.organId = this.currentOrganId
    },
    // 表格id删除
    handleDelete(row) {
       this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("getUserdelete", row.id).then(
            res => {
                this.getAllOrgan(this.$refs.addUserRef.id);
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            },
            err => {
              console.log(err);
            }
          );

        }).catch(() => {
                
        });
     
    },
   
    // 密码初始化
    Initialization(row) {
       this.$confirm('确认初始化密码?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("getUserreset", row.id).then(
            res => {
                this.getAllOrgan(this.$refs.addUserRef.id);
                this.$message({
                  type: 'success',
                  message: '密码初始化成功!'
                });
            },
            err => {
              console.log(err);
            }
          );

        }).catch(() => {
                
        });
     
    },
    
    //新增机构
    addUser() {
      this.$refs.addUserRef.addEquipment()
      this.$refs.addUserRef.addUserForm.organTitle = this.selectCurrentTreeName
      this.$refs.addUserRef.addUserForm.organId = this.currentOrganId
    },
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