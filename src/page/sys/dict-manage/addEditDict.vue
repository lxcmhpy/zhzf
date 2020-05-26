<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
    append-to-body
  >
    <el-form :model="addDictForm" :rules="rules" ref="addDictForm" class="errorTipForm" label-width="80px">
      <div class="item">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDictForm.name" @focus="focusName"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorName">该部门名称已存在</span> -->
      </div>
      <div class="item">
        <el-form-item label="字典描述" prop="notes">
            <el-input v-model="addDictForm.notes"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="序号" prop="sort">
          <el-input v-model="addDictForm.sort" disabled></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="状态" prop="status">
          <el-switch v-model="addDictForm.status" active-color="#4573D0"></el-switch>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditDict('addDictForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      addDictForm: {
        name: "",
        sort: "",
        notes:"",
        status: true
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      editId:'',
      // parentNode: "", //新增部门时的上级机构
      // departmentId: "" //部门id
      dictData:"",
      formType:'', //字典还是字典值新增
      pid:'',  //字典id
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data,formType) {
      this.visible = true;
      this.handelType = type;
      this.dictData = data;
      this.formType = formType;
      if (type == 0) {
        console.log(data);
        this.dialogTitle = "新增";
        // this.parentNode = data;
        // this.addDepartmentForm.pidName = data.parentNodeName;
        this.addDictForm.id = this.dictData.id;
        this.addDictForm.pid = this.dictData.pid;
        this.addDictForm.sort = data.leng + 1;
        this.pid = this.dictData.pid;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改";
        // this.parentNode = data.parentNode;
        // this.departmentId = data.row.id;
        this.editId = data.row.id;
        this.addDictForm.pid = data.pid;
        this.addDictForm.name = data.row.name;
        this.addDictForm.status = data.row.status == 0 ? true : false;
        this.addDictForm.notes = data.row.notes;
        this.addDictForm.sort = data.row.sort;
        this.pid = data.pid;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addDictForm"].resetFields();
      // this.errorName = false;
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //新增修改字典
    addOrEditDict(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid && !_this.errorName) {
            // this.departmentNameRepeat();
            _this.addOrEditDictSure();
        }
      });
    },
    //查询名称是否重复
    // departmentNameRepeat() {
    //   let data = {
    //     oid: this.parentNode.parentNodeId,
    //     name: this.addDepartmentForm.name
    //   };
    //   this.$store.dispatch("hasDepartmentName", data).then(
    //     res => {
    //       console.log(res);
    //       if(res.data.id){
    //         this.errorName = true;
    //       }else{
    //         this.addOrEditDepartmentSure();
    //       }

    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // },
    //新增 修改
    addOrEditDictSure() {
      // this.addDepartmentForm.oid = this.parentNode.parentNodeId;
      // this.addDepartmentForm.id = this.handelType == 0 ? "" : this.departmentId;
      // console.log("数据", this.addOrganForm);
      // console.log(this.addDepartmentForm);
      this.addDictForm.id = this.handelType == 0 ? "" : this.editId;
      let _this = this
      this.$store.dispatch("addDict", this.addDictForm).then(
        res => {
          console.log("新增字典", res);
          if(!res.data){
            _this.$message({
              type: "error",
              message: _this.handelType == 0 ? "添加失败,名称不能重复!" : "修改失败,名称不能重复!"
            });
            return
          }
            //  this.reload();
            console.log(this.$refs)
            if(_this.formType == 'list'){
            _this.reload();
            }else{
            console.log(this.pid)
            _this.$emit('getDetail',{id:this.pid})
            }
            _this.$message({
                type: "success",
                message: this.handelType == 0 ? "添加成功!" : "修改成功"
            });
            _this.visible = false;
        },
        err => {
          console.log(err);
        }
      );
    },
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
