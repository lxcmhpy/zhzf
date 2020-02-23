<template>
  <el-dialog
    :title="titleMap[dialogStatus]"
    custom-class="leftDialog"
    :visible.sync="visible"
    top="0"
    width="40%"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addUserForm"
      :rules="rules"
      ref="addUserForm"
      label-width="100px"
      class="addOrganClass"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <div class="part">
        <p class="titleP">登录信息</p>
        <div class="item">
          <el-form-item label="登录用户名" prop="username">
            <el-input
              ref="username"
              :disabled="dialogStatus === 'editEquipment'"
              v-model="addUserForm.username"
            ></el-input>
          </el-form-item>
        </div>
        <!-- <div class="item" v-if="dialogStatus === 'addEquipment'">
          <el-form-item label="初始密码" prop="password">
            <el-input ref="password" ></el-input>
          </el-form-item>
        </div>-->
      </div>
      <div class="part">
        <p class="titleP">基本信息</p>
        <div class="item">
          <el-form-item label="真实姓名">
            <el-input v-model="addUserForm.nickName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="身份证号码" prop="idNumber">
            <el-input ref="idNumber" v-model="addUserForm.idNumber"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="联系方式" prop="mobile">
            <el-input ref="mobile" v-model="addUserForm.mobile"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="执法门类">
            <el-input v-model="addUserForm.category"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="执法机构" prop="organId">
            <!-- <el-input v-model="addUserForm.organTitle"></el-input> -->
            <el-select v-model="addUserForm.organId" placeholder="请选择执法机构" @change="getDepartment">
              <el-option
                v-for="item in getOrganList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="所属部门" prop="departmentId">
            <el-select v-model="addUserForm.departmentId" placeholder="请选择">
              <el-option
                v-for="item in departments"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="part">
        <p class="titleP">证件信息</p>
        <div class="item">
          <el-form-item label="省级证件号">
            <el-input v-model="addUserForm.Provincial"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="部级证件号">
            <el-input v-model="addUserForm.Ministerial"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="海事证件号">
            <el-input v-model="addUserForm.Maritime"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="其他证件号">
            <el-input v-model="addUserForm.Other"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { validatePhone, validateIDNumber } from "@/common/js/validator";
export default {
  data() {
    // 判断用户名是否已存在
    var validateUsername = (rule, value, callback) => {
      this.$store
        .dispatch("hasUsername", value)
        .then(response => {
          callback();
        })
        .catch(error => {
          callback('用户名重复');
        });
    };
    return {
      depss: [], //数据部门数据
      visible: false,
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "新增用户",
        editEquipment: "编辑用户"
      },
      //新增和编辑弹框标题
      dialogStatus: "",
      parentNode: "", //新增用户时默认的上级机构
      getOrganList: [], //获取机构级下级机构
      departments: [], //切换机构获取部门
      addUserForm: {
        id: "",
        username: "",
        password: "123456",
        mobile: "",
        nickName: "",
        idNumber: "",
        category: "",
        organId: "",
        organTitle: "",
        departmentId: "",
        departmentTitle: "",
        Provincial: "",
        Ministerial: "",
        Maritime: "",
        Other: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          { min: 6, message: "长度大于6个字符", trigger: "blur" },
          // { validator: validateUsername, trigger: "blur" },
        ],
        mobile: [{ validator: validatePhone, trigger: "blur" }],
        organId: [{ required: true, message: "请选择机构", trigger: "change" }],
        // departmentId: [
        //   { required: true, message: "请选择部门", trigger: "change" }
        // ],
        idNumber: [{ validator: validateIDNumber, trigger: "blur" }]
      },
      rowData:'',
    };
  },
  mounted() {},

  methods: {
    //新增
    showModal(data) {
      //显示弹框
      this.visible = true;
      this.dialogStatus = "addEquipment";
      //新增弹框标题
      this.$nextTick(() => {
        this.$refs["addUserForm"].resetFields();
      });
      this.parentNode = data;
      this.getCurrentOrganAndChild();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      // this.$nextTick(() => {
      //   this.$refs["addUserForm"].resetFields();
      // });
      this.$refs["addUserForm"].resetFields();
    },
    //编辑
    handelEdit(data) {
      console.log(data);
      //显示弹框
      this.visible = true;
      //编辑弹框标题
      this.dialogStatus = "editEquipment";
      this.parentNode={
        parentNodeId:data.organId,
        parentNodeName:data.userDeparment
      };
      this.getCurrentOrganAndChild();
      // this.rowData = data;
      this.addUserForm = data;
    },
    //获取当前机构及其子机构
    getCurrentOrganAndChild() {
      this.$store.dispatch("getCurrentAndNextOrgan",this.parentNode.parentNodeId).then(
        res => {

          console.log(res);
          this.getOrganList = res.data;
          // this.addUserForm = this.rowData;
          //this.addUserForm.organId  = this.rowData.organId;
        },
        err => {
          console.log(err);
        }
      );
    },
    //获取选中的机构下的部门
    getDepartment(data1) {
      console.log(data1);
      let data = {
        organId: data1
      };
      console.log("获取选中的机构下的部门", data);
      this.$store.dispatch("getDepartmentsNoPage", data).then(
        res => {
          console.log("部门数据", res);
          this.departments = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 弹框保存
    save() {
      this.$refs["addUserForm"].validate(valid => {
        if (valid) {
          if (this.dialogStatus === "addEquipment") {
            console.log("this.addUserForm", this.addUserForm);
            this.$store
              .dispatch("addUser", this.addUserForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: "新增用户成功",
                  type: "success"
                });
                this.visible = false;
                this.$emit("uploadaaa", "1");
              })
              .catch(err => {
                this.$message({
                  showClose: true,
                  message: err,
                  type: "error"
                });
              });
          } else if (this.dialogStatus === "editEquipment") {
            console.log(this.addUserForm);
            let data = {
              id: this.addUserForm.id,
              username: this.addUserForm.username,
              mobile: this.addUserForm.mobile,
              nickName: this.addUserForm.nickName,
              idNumber: this.addUserForm.idNumber,
              category: this.addUserForm.category,
              organId: this.addUserForm.organId,
              organTitle: this.addUserForm.organTitle,
              departmentId: this.addUserForm.departmentId,
              departmentTitle: this.addUserForm.departmentTitle,
              Provincial: this.addUserForm.Provincial,
              Ministerial: this.addUserForm.Ministerial,
              Maritime: this.addUserForm.Maritime,
              Other: this.addUserForm.Other
            };
            this.$store
              .dispatch("updateUser", this.addUserForm)
              .then(res => {
                this.$message({
                  showClose: true,
                  message: "修改用户成功",
                  type: "success"
                });
                this.$emit("uploadaaa");
                this.visible = false;
              })
              .catch(err => {
                this.$message({
                  showClose: true,
                  message: err,
                  type: "error"
                });
              });
          }
        }
      });
    },
    // 弹框取消按钮
    resetForm() {
      this.visible = false;
      this.$nextTick(() => {
        this.$refs["addUserForm"].resetFields();
      });
    },
    //失去焦点请求 名称是否重复
    // blurName() {
    //   if(this.addUserForm.name){
    //     this.$store.dispatch("hasUsername", this.addUserForm.name).then(
    //     res => {
    //       console.log(res);
    //       if(res.data.id){
    //         this.errorOrganName = true;
    //       }else{
    //         this.errorOrganName = false;
    //       }
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

    //   }
    // },
  },
  watch: {
    visible(val) {
      if (val === false) {
        this.addUserForm = {
          id: "",
          username: "",
          password: "",
          mobile: "",
          nickName: "",
          idNumber: "",
          category: "",
          organId: "",
          organTitle: "",
          departmentId: "",
          departmentTitle: "",
          Provincial: "",
          Ministerial: "",
          Maritime: "",
          Other: ""
        };
      }
    }
  }
};
</script>




