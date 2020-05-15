<template>
  <el-dialog :title="dialogTitle" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="35%">
    <el-form :model="addBannerForm" :rules="rules" ref="addBannerForm" label-width="130px">
      <div class="item">
        <el-form-item label="环节名称" prop="linkName">
          <el-input v-model="addBannerForm.linkName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属环节">
          <el-select v-model="addBannerForm.mainLinkName" placeholder="请选择">
            <el-option label="立案" value="立案"></el-option>
            <el-option label="调查" value="调查"></el-option>
            <el-option label="处罚" value="处罚"></el-option>
            <el-option label="结案" value="结案"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否有审批流程">
          <el-select v-model="addBannerForm.isApproval" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="绑定工作流">
          <el-input v-model="addBannerForm.activitiId"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否自动生成PDF">
          <el-select v-model="addBannerForm.isPdf" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="生成文书">
          <el-input v-model="addBannerForm.docTypeId"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否是立案">
          <el-select v-model="addBannerForm.isFiling" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否是归档">
          <el-select v-model="addBannerForm.isFile" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否生成案件编号">
          <el-select v-model="addBannerForm.isCaseNumber" placeholder="请选择">
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="页面地址">
          <el-input v-model="addBannerForm.linkUrl"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="描述">
          <el-input v-model="addBannerForm.remark"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序">
          <el-input v-model="addBannerForm.sort"></el-input>
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
                    linkName: "",
                    mainLinkName: "",
                    isApproval: '',
                    activitiId:'',
                    isPdf: '',
                    docTypeId: '',
                    docTypeName: '',
                    remark: '',
                    sort: '',
                    isFiling: '',
                    isFile: '',
                    linkUrl:'',
                    isCaseNumber:''
                },
                rules: {
                    name: [{ required: true, message: "请输入环节名称", trigger: "blur" }]
                },
                dialogTitle: "", //弹出框title
                handelType: 0, //添加 0  修改2
                editBannerId: '',
            };
        },
        inject: ["reload"],
        methods: {
            showModal(type, data) {
                this.visible = true;
                this.handelType = type;
                if (type == 0) {
                    this.dialogTitle = "新增环节";
                } else if (type == 2) {
                    console.log(data);
                    this.dialogTitle = "修改环节";
                    this.addBannerForm = data;
                    this.addBannerForm.createTime='';
                    // this.addBannerForm.description = data.description;
                    this.editBannerId = data.id;
                }
            },
            //关闭弹窗的时候清除数据
            closeDialog() {
                this.visible = false;
                this.$refs["addBannerForm"].resetFields();
            },
            //新增环节 修改环节
            addOrEditBanner(formName) {
                let _this = this
                this.$refs[formName].validate(valid => {
                    if (_this.handelType) {
                        //修改
                        _this.addBannerForm.id = _this.editBannerId;
                        _this.$store.dispatch("addOrEditBanner", _this.addBannerForm).then(
                            res => {
                                console.log("环节", res);
                                _this.$message({
                                    type: "success",
                                    message: "修改成功"
                                });
                                _this.visible = false;
                                _this.reload();
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    } else {
                        _this.$store.dispatch("addOrEditBanner", _this.addBannerForm).then(
                            res => {
                                console.log("环节", res);
                                _this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                _this.visible = false;
                                _this.reload();
                            },
                            err => {
                                console.log(err);
                            }
                        );
                    }
                });
            },
            //获取机构详情
            getOrganDetail(id) { }
        }
    };
</script>
