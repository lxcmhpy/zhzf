<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
  >
    <el-form :model="addUserForm" :rules="rules" ref="addUserForm" class="errorTipForm" label-width="120px">
      <div class="item">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorName">该部门名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addUserForm.mobile"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属机构" prop="departmentId">
          <el-input v-model="addUserForm.departmentId"></el-input>
        </el-form-item>
      </div>
      <!-- <div class="item">
        <el-form-item label="邮箱" prop="sort">
          <el-input v-model="addUserForm.practRecordType"></el-input>
        </el-form-item>
      </div> -->
      <!-- <div class="item">
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addDictForm.status" active-color="#4573D0"></el-switch>
        </el-form-item>
      </div> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addPractRecord('addUserForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import  axios  from  "axios";
import  request  from  "@/common/js/request";
import  {setCancelSource}  from  "@/common/js/cancelToken";
import  Vue  from  "vue";

let  vm  =  new  Vue();
export default {
  data() {
    return {
      visible: false,
      addUserForm: {
        id: "",
        username: "",
        password: "123456",
        mobile:"",
        departmentId:""
      },
      rules: {
        // name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      // editId:'',
      // parentNode: "", //新增部门时的上级机构
      // departmentId: "" //部门id
      // dictData:"",
      // formType:'', //字典还是字典值新增
      // pid:'',  //字典id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      // this.dictData = data;
      // this.formType = formType;
      if (type == 0) {
        console.log(data);
        this.dialogTitle = "新增";
      } else if (type == 2) {
        // console.log(data);
        this.dialogTitle = "修改";
        this.handelType = type;
        this.addUserForm.id = data.id;
        this.addUserForm.username = data.username;
        // this.addUserForm.password = data.password;
        this.addUserForm.mobile = data.mobile;
        this.addUserForm.departmentId = data.departmentId;

      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addUserForm"].resetFields();
      // this.errorName = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //新增修改字典
    addPractRecord(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorName) {
            // this.departmentNameRepeat();
            _this.addOrEdit();
        }
      });
    },
    //新增 修改
    addOrEdit() {
      // debugger
      let _this = this;
      let user = vm.$qs.stringify(this.addUserForm);
      console.log(user);
      if(_this.handelType==="0"){
          return request({
            url: "/system/sys/user/addUser",
            method: "POST",
            data: user,
            showloading: false,
            cancelToken:  setCancelSource()
          }).then(
              res => {
                console.log("新增", res);
                _this.$message({
                    type: "success",
                    message: "添加成功"
                });
                _this.reload();
              },
              err => {
                console.log(err);
              }
        );
      }else{
        return request({
            url: "/system/sys/user/updateUser",
            method: "POST",
            data: user,
            showloading: false,
            cancelToken:  setCancelSource()
          }).then(
              res => {
                console.log("新增", res);
                _this.$message({
                    type: "success",
                    message: "修改成功"
                });
                _this.reload();
              },
              err => {
                console.log(err);
              }
        );
      }

    },
    edit(row){
      console.log(data);
      this.dialogTitle = "修改";
      this.addUserForm.username = data.row.username;
      this.addUserForm.password = data.row.password;
      this.addUserForm.mobile = data.row.mobile;
      this.addUserForm.departmentId = data.row.departmentId;
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/systemManage.scss";
</style>
