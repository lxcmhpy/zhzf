<template>
<div class="com_searchAndpageBoxPadding">
  <div class="searchAndpageBox" id="dictBox">
    <div class="handlePart">
      <div class="search">
        <el-form :inline="true" ref="userForm" :model="formInline" label-width="70px">
                    <el-form-item label="用户名">
                        <el-input v-model="formInline.username" placeholder="回车可直接查询"></el-input>
                    </el-form-item>
                    <el-form-item label=" " label-width="13px">
                        <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-sousuo" title="搜索" @click="getUserList(1)"></el-button>
                        <!-- <el-button size="medium" class="commonBtn searchBtn" title="重置" icon="iconfont law-zhongzhi" @click="reset"></el-button>
                        <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-adduser" title="添加用户" @click="addUser"></el-button>
                        <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-link" title="绑定权限" @click="bindRole"></el-button>
                        <el-button size="medium" class="commonBtn toogleBtn" :title="isShow? '点击收缩':'点击展开'" :icon="isShow? 'iconfont law-top': 'iconfont law-down'" @click="showSomeSearch" ></el-button> -->
                        <el-button size="medium" class="commonBtn searchBtn" icon="iconfont law-adduser" title="添加用户" @click="addUser"></el-button>
                        
                    </el-form-item>
                    <!-- <el-collapse-transition>
                         <div v-show="isShow" :class="{'ransition-box':true}">
                            <el-form-item label="姓名">
                                <el-input v-model="formInline.nickName" placeholder="回车可直接查询"></el-input>
                            </el-form-item>
                            <el-form-item label="证件号">
                            <el-input v-model="formInline.enforceNo" placeholder="回车可直接查询"></el-input>
                            </el-form-item>
                            
                            
                            <el-form-item label="联系电话">
                                <el-input v-model="formInline.mobile" placeholder="回车可直接查询"></el-input>
                            </el-form-item>
                         </div>
                    </el-collapse-transition> -->
            </el-form>
      </div>
    </div>
    <div class="tablePart">
      <el-table :data="tableData" stripe style="width: 100%" height="100%">
        <el-table-column type="selection" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nickName" label="姓名"></el-table-column>
                <el-table-column prop="enforceNo" label="执法证号"></el-table-column>
                <el-table-column prop="mobile" label="联系电话"></el-table-column>
                <el-table-column prop="roleNames" label="角色"></el-table-column>
                <el-table-column prop="userOrgan" label="所属机构"></el-table-column>
                <el-table-column prop="userDeparment" label="所属部门"></el-table-column>
                <el-table-column width="50" prop="status" label="状态">
                    <template slot-scope="scope">
                        <div>{{scope.row.status === 0?'正常':scope.row.status === -1?'拉黑':'待激活'}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160">
                <template slot-scope="scope" >
                    <div style="width:160px">
                    <el-button type="text" @click="edit(scope.$index, scope.row)">修改</el-button>
                    <el-button type="text" @click="deleteuser(scope.row)">删除</el-button>
                    <!-- <el-button type="text" @click="Initialization(scope.row)">初始化</el-button> -->
                    </div>
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
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="totalPage"
        ></el-pagination>
    </div>
    <addEditDict ref="addEditDictRef"></addEditDict>
    <showDictKey ref="showDictKeyRef"></showDictKey>
  </div>
</div>
</template>
<script>
import addEditDict from "./addEditDict";
// import showDictKey from "./showDictKey";
import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
export default {
  data() {
    return {
      tableData: [], //表格数据
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      searchName:'', //查询名称
      formInline: {
        nickName: "",
        enforceNo: "",
        username: "",
        mobile: "",
        selectValue: "",
        region: ""
      },
    };
  },
  components: {
    addEditDict,
    showDictKey
  },
  inject:['reload'],
  methods: {
    //获取字典列表
    getUserList() {
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
      let _this = this
      return request({
          url: "/sys/user/list",
          method: "get",
          params: data,
          showloading: false,
          cancelToken: setCancelSource()
        }).then(
        res => {
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
      },
        err => {
          console.log(err);
        }
      );
    },

    //删除
    deleteuser(row){
        let _this = this
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          return request({
              url: "/sys/user/delete/" + row.id,
              method: "get",
              showloading: false,
              cancelToken: setCancelSource()
          }).then(
            res => {
              _this.reload();
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
        .catch(() => {});
    },
    //添加
    addUser(){
      this.$refs.addEditDictRef.showModal("0");
    },
    //编辑
    edit(index,row){
      this.$refs.addEditDictRef.showModal("2",row);
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getUserList();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
