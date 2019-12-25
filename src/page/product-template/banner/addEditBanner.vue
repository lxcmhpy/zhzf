<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="35%">
    <el-form :model="addBannerForm" :rules="rules" ref="addBannerForm" label-width="130px">
      <div class="item">
        <el-form-item label="环节名称" prop="name">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
        <!-- <span class="errorInput" v-if="errorOrganName">该机构名称已存在</span> -->
      </div>

      <div class="item">
        <el-form-item label="是否有审批流程">
          <el-select v-model="addBannerForm.isJudge" placeholder="请选择">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="绑定工作流">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否自动生成PDF">
          <el-select v-model="addBannerForm.region" placeholder="请选择">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="生成文书">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属环节">
          <el-select v-model="addBannerForm.region" placeholder="请选择">
            <el-option label="立案" value="shanghai"></el-option>
            <el-option label="调查" value="beijing"></el-option>
            <el-option label="处罚" value="shanghai"></el-option>
            <el-option label="结案" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="页面地址">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="描述">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序">
          <el-input v-model="addBannerForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="环节介绍" prop="description">
          <el-input v-model="addBannerForm.description"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditBanner('addBannerForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      addBannerForm: {
        name: "",
        description: "",
        isJudge: '',
        name:'',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: "请输入环节名称", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorOrganName: false, //添加organname时的验证
      handelType: 0, //添加 0  修改2
      editRoleId: '',
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增环节";

        // this.parentNode = data;
        // this.addOrganForm.pidName = data.parentNodeName;
        // this.isDisabled = false;
      } else if (type == 2) {
        console.log(data);
        this.dialogTitle = "修改环节";
        this.addBannerForm.name = data.name;
        this.addBannerForm.description = data.description;
        this.editRoleId = data.id;
        // this.organId = data.id;
        // this.parentNode = data.parentNode;
        // this.getOrganDetail(data.id);
        // this.isDisabled = false;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addBannerForm"].resetFields();
      //this.errorOrganName = false;
    },
    //聚焦清除错误信息
    focusOrganName() {
      this.errorOrganName = false;
    },
    //失去焦点请求 名称是否重复
    blurOrganName() {
      if (this.addOrganForm.name) {
        this.$store.dispatch("hasOrganName", this.addOrganForm.name).then(
          res => {
            console.log(res);
            if (res.data.id) {
              this.errorOrganName = true;
            } else {
              this.errorOrganName = false;
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //新增环节 修改环节
    addOrEditBanner(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && !this.errorOrganName) {
          // this.addOrganForm.pid = this.parentNode.parentNodeId;
          // this.addOrganForm.id = this.handelType == 0 ? "" : this.organId;
          // console.log("数据", this.addOrganForm);
          if (this.handelType) {
            //修改
            this.addBannerForm.id = this.editRoleId;
            this.$store.dispatch("editRole", this.addBannerForm).then(
              res => {
                console.log("环节", res);
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
                this.visible = false;
                this.reload();
              },
              err => {
                console.log(err);
              }
            );
          } else {
            this.$store.dispatch("addRole", this.addBannerForm).then(
              res => {
                console.log("环节", res);
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                this.visible = false;
                this.reload();
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      });
    },
    //获取机构详情
    getOrganDetail(id) { }
  }
};
</script>