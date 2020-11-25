<template>
  <el-dialog
    :title="titleMap[dialogStatus]"
    custom-class="leftDialog"
    :visible.sync="visible"
    top="0"
    width="40%"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addUserForm"
      :rules="rules"
      ref="addUserForm"
      label-width="100px"
      class="addOrganClass"
      :disabled="isDisabled"
    >
      <div class="part">
        <p class="titleP">登录信息</p>
        <div class="item">
          <el-form-item label="登录用户名" prop="username">
            <el-input
              ref="username"
              :disabled="dialogStatus === 'editEquipment'"
              maxlength="20"
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
          <el-form-item label="真实姓名" prop="nickName">
            <el-input v-model="addUserForm.nickName" ref="nickName" maxlength="20"></el-input>
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
            <!-- <el-select v-model="addUserForm.organId" placeholder="请选择执法机构" @change="getDepartment">
              <el-option
                v-for="item in getOrganList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select> -->
            <elSelectTree
                  ref="elSelectTreeObj"
                  :options="getOrganList"
                  :accordion="true"
                  :props="myprops"
                  @getValue="handleOrgan"
                ></elSelectTree>
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
        <div class="item">
          <el-form-item label="状态" prop="status">
            <el-switch v-model="addUserForm.status" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </div>
      </div>
      <div class="part">
        <p class="titleP">证件信息</p>
        <div class="item">
          <el-form-item label="省级证件号">
            <el-input v-model="addUserForm.provincial"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="部级证件号">
            <el-input v-model="addUserForm.ministerial"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="海事证件号">
            <el-input v-model="addUserForm.maritime"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="其他证件号">
            <el-input v-model="addUserForm.other"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { validatePhone, validateIDNumber } from "@/common/js/validator";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
import { getAllOrganApi } from "@/api/system";

export default {
  data() {
    // 判断用户名是否已存在
    var validateUsername = (rule, value, callback) => {
      this.$store.dispatch("hasUsername", value).then(res => {
        if(res.id && this.dialogStatus == "addEquipment"){
          callback('当前用户名已被使用');
        }else{
          callback();
        } 
      },err => {
        this.$message({ type: "error", message: err.msg || '' });
      });
    };
    return {
      depss: [], //数据部门数据
      visible: false,
      //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
      titleMap: {
        addEquipment: "新增用户",
        editEquipment: "编辑用户",
        userDetail: "用户详情"
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
        userOrgan: "",
        organTitle: "",
        departmentId: "",
        departmentTitle: "",
        provincial: "",
        ministerial: "",
        maritime: "",
        other: "",
        status:true,
      },
      rules: {
          username: [
          { required: true, message: "请输入登录用户名", trigger: "blur" },
          { min: 2, message: "填入字符长度需要大于等于2个字符", trigger: "blur" },
          { validator: validateUsername, trigger: "blur" },
        ],
        nickName: [
            { required: true, message: "请输入真实姓名", trigger: "blur" },
        ],
        mobile: [{ validator: validatePhone, trigger: "blur" }],
        organId: [{ required: true, message: "请选择机构", trigger: "change" }],
        // departmentId: [
        //   { required: true, message: "请选择部门", trigger: "change" }
        // ],
        idNumber: [{ validator: validateIDNumber, trigger: "blur" }]
      },
      rowData:'',
      isDisabled:false,
      myprops: {
          label: "label",
          value: "id",
      },
      selectOrganId: "", //默认选中机构的id

    };
  },
  mounted() {},
  components: {
        elSelectTree,
  },
  methods: {
    //新增
    showModal(data) {
      //显示弹框
      this.visible = true;
      this.isDisabled = false;
      this.dialogStatus = "addEquipment";
      this.addUserForm = {
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
          provincial: "",
          ministerial: "",
          maritime: "",
          other: "",
          status:true
        };
      this.parentNode = data;
      this.getCurrentOrganAndChild();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.$refs["addUserForm"].resetFields();
      this.visible = false;
    },
    //编辑
    handelEdit(data) {
      console.log(data);
      //显示弹框
      this.visible = true;
      this.isDisabled = false;
      //编辑弹框标题
      this.dialogStatus = "editEquipment";
      this.parentNode={
        parentNodeId:data.organId,
        parentNodeName:data.userDeparment
      };
      this.getCurrentOrganAndChild();
      this.getDepartment(data.organId)
      // this.rowData = data;
      this.addUserForm = data;
      this.addUserForm.status = this.addUserForm.status === 0  ? true : false;

    },
    //用户详情，不可编辑
    showUserDetail(row){
      console.log(row);
      //显示弹框
      this.visible = true;
      this.dialogStatus = "userDetail";
      // this.addUserForm.id = row.id;
      // this.addUserForm.username = row.username;
      // this.addUserForm.nickName = row.nickName;
      // this.addUserForm.idNumber = row.idNumber;
      // this.addUserForm.mobile = row.mobile;
      // this.addUserForm.category = row.category;
      // this.addUserForm.organId = row.organId;
      // this.addUserForm.departmentId = row.departmentId;
      // this.addUserForm.provincial = row.provincial;
      // this.addUserForm.ministerial = row.ministerial;
      // this.addUserForm.maritime = row.maritime;
      // this.addUserForm.other = row.other;
      this.parentNode={
        parentNodeId:row.organId,
        parentNodeName:row.userDeparment
      };
      this.getCurrentOrganAndChild();
      this.getDepartment(row.organId)
      this.addUserForm = row;
      this.isDisabled = true;
    },
    //获取当前机构及其子机构
    getCurrentOrganAndChild() {  
      let _this = this
      getAllOrganApi().then((res) => {
        console.log("获取机构树", res);
        _this.getOrganList = res.data;
        _this.$refs.elSelectTreeObj.valueTitle = _this.addUserForm.userOrgan ?_this.addUserForm.userOrgan :"";
        _this.$refs.elSelectTreeObj.valueId = _this.addUserForm.organId ?_this.addUserForm.organId:"";
      })
      .catch((err) => {
          throw new Error(err);
      });
    },
    //获取选中的机构
    handleOrgan(val) {
        this.$refs.elSelectTreeObj.$children[0].handleClose();
        this.addUserForm.organId = val ? val : "";
        this.getDepartment(val)
    },
    //获取选中的机构下的部门
    getDepartment(data1) {
      console.log('11111111',data1);
      this.addUserForm.departmentId = "";
      let data = {
        organId: data1 ? data1 : ""
      };
      let _this = this
      console.log("获取选中的机构下的部门", data);
      this.$store.dispatch("getDepartmentsNoPage", data).then(
        res => {
          console.log("部门数据", res);
          _this.departments = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    // 弹框保存
    save() {
      let _this = this
      this.$refs["addUserForm"].validate(valid => {
        if (valid) {
          this.addUserForm.status = this.addUserForm.status  ? 0 : -1;
          if (_this.dialogStatus === "addEquipment") {
            console.log("this.addUserForm", _this.addUserForm);
            _this.$store
              .dispatch("addUser", _this.addUserForm)
              .then(res => {
                _this.$message({
                  showClose: true,
                  message: "新增用户成功",
                  type: "success"
                });
                _this.visible = false;
                _this.$emit("getUserList", "1");
              })
              .catch(err => {
                _this.$message({
                  showClose: true,
                  message: err,
                  type: "error"
                });
              });
          } else if (_this.dialogStatus === "editEquipment") {
            console.log(_this.addUserForm);
            let data = {
              id: _this.addUserForm.id,
              username: _this.addUserForm.username,
              mobile: _this.addUserForm.mobile,
              nickName: _this.addUserForm.nickName,
              idNumber: _this.addUserForm.idNumber,
              category: _this.addUserForm.category,
              organId: _this.addUserForm.organId,
              organTitle: _this.addUserForm.organTitle,
              departmentId: _this.addUserForm.departmentId,
              departmentTitle: _this.addUserForm.departmentTitle,
              provincial: _this.addUserForm.provincial,
              ministerial: _this.addUserForm.ministerial,
              maritime: _this.addUserForm.maritime,
              other: _this.addUserForm.other
            };
            _this.$store
              .dispatch("updateUser", _this.addUserForm)
              .then(res => {
                _this.$message({
                  showClose: true,
                  message: "修改用户成功",
                  type: "success"
                });
                _this.$emit("getUserList");
                _this.visible = false;
              })
              .catch(err => {
                _this.$message({
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
      let _this = this
      this.$nextTick(() => {
        _this.$refs["addUserForm"].resetFields();
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
};
</script>




