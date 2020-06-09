<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="closeDialog"
    width="40%"
  >
    <el-form
      :model="addDocType"
      :rules="rules"
      ref="addDocType"
      class="errorTipForm"
      label-width="100px"
    >
      <div class="item">
        <el-form-item label="文书名称" prop="name">
          <el-input ref="name" v-model="addDocType.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属环节名称" prop="linkName">
          <el-select
            v-model="addDocType.linkName"
            @focus="getMainLink('大环节')"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="(item) in mainLinkList"
              :key="item.id"
              :label="item.notes"
              :value="item.notes"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="模板名称" prop="templateName">
          <el-input ref="name" v-model="addDocType.templateName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="文书地址" prop="path">
          <el-input v-model="addDocType.path"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="文书说明" prop="remark">
          <el-input v-model="addDocType.remark" clearable placeholder="请输入"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序" prop="sort">
          <el-input v-model="addDocType.sort" disabled></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addDocTypeValid('addDocType')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { saveOrUpdateDocTypeApi, getDocListApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      addDocType: {
        id: "",
        name: "",
        linkName: "",
        templateName: "",
        remark: "",
        path: "",
        sort: 0
      },
      rules: {
        name: [
          { required: true, message: "文书类型名称不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "文书类型地址不能为空", trigger: "blur" }
        ],
        linkName: [
          { required: true, message: "所属环节不能为空", trigger: "blur" }
        ],
        templateName: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ],
        remark: [
          {
            required: true,
            message: "文书说明不能为空",
            trigger: "blur"
          }
        ]
      },
      mainLinkList: [],
      caseTypeList: [],
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0 //添加 0  修改2
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增";
        this.addDocType = {
          sort: data.leng + 1
        };
      } else if (type == 2) {
        this.dialogTitle = "修改";
        this.handelType = type;
        this.addDocType.id = data.id;
        this.addDocType.name = data.name;
        this.addDocType.linkName = data.linkName;
        this.addDocType.templateName = data.templateName;
        this.addDocType.remark = data.remark;
        this.addDocType.path = data.path;
        this.addDocType.sort = data.sort;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs.addDocType.resetFields();
    },
    //聚焦清除错误信息
    focusName() {
      this.errorName = false;
    },
    //新增
    addDocTypeValid(formName) {
      let _this = this;
      this.$refs[formName].validate((valid, noPass) => {
        if (valid) {
          _this.addOrEdit();
        } else {
          let a = Object.values(noPass)[0];
          this.$message({
            showClose: true,
            message: a[0].message,
            type: "error",
            offset: 100,
            customClass: "validateErrorTip"
          });
          return false;
        }
      });
    },
    //新增 修改
    addOrEdit() {
      let _this = this;
      if (_this.handelType == "0") {
        saveOrUpdateDocTypeApi(_this.addDocType).then(
          res => {
            if (res.data == true) {
              _this.$message({
                type: "success",
                message: "添加成功"
              });
              _this.reload();
            } else {
              _this.$message({
                type: "error",
                message: "文书名称重复,请修改"
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      } else {
        saveOrUpdateDocTypeApi(_this.addDocType).then(
          res => {
            if (res.data == true) {
              _this.$message({
                type: "success",
                message: "修改成功"
              });
              _this.reload();
            } else {
              _this.$message({
                type: "error",
                message: "文书名称重复,请修改"
              });
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    //通过数据字典获取大环节下拉
    getMainLink(name) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            this.mainLinkList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    //查询案件类型列表
    getCaseType() {
      this.$store.dispatch("getCaseTypeList", 0).then(
        //查询案件类型列表(启用)
        res => {
          if (res.code === 200) {
            this.caseTypeList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    }
  },
  mounted() {
    this.getCaseType();
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
