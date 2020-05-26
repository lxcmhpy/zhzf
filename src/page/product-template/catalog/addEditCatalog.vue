<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addCatalogForm" :rules="rules" ref="addCatalogForm" class="errorTipForm" label-width="130px">
      <div class="item">
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="addCatalogForm.name"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="案件类型" prop="caseType">
          <el-select v-model="addCatalogForm.caseType" filterable placeholder="请选择">
            <el-option
              v-for="(res) in caseTypeList"
              :key="res.id"
              :label="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
              :value="res.programType==='0' ?'一般程序'+'：'+res.typeName:'简易程序'+'：'+res.typeName"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="描述">
          <el-input v-model="addCatalogForm.remark"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="顺序">
          <el-input v-model="addCatalogForm.sort" disabled></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addOrEditCatalog('addCatalogForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDocListApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      isShow: true,
      addCatalogForm: {
        name: "",
        caseType: "",
        remark: "",
        sort: "",
        createTime: "",
        status: 0
      },
      mainLinkList: [],
      docTypeList: [],
      caseTypeList: [],
      rules: {
         name: [{ required: true, message: "模板名称不能为空", trigger: "blur" }],
         caseType: [{ required: true, message: "所属案件类型名称不能为空", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editCatalogId: "",
      options: [
        {
          value: 0,
          label: "是"
        },
        {
          value: 1,
          label: "否"
        }
      ]
    };
  },
  inject: ["reload"],
  methods: {
    showModal(type, data) {
      this.visible = true;
      this.handelType = type;
      if (type == 0) {
        this.dialogTitle = "新增模板";
        this.addCatalogForm = {
          name: "",
          caseType: "",
          remark: "",
          sort: data+1,
          createTime: new Date().format("yyyy-MM-dd"),
          status: 0
        };
      } else if (type == 2) {
        this.dialogTitle = "修改模板";
        this.addCatalogForm = data;
        this.editCatalogId = data.id;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addCatalogForm"].resetFields();
    },
    //是否生成PDF
    selectIsShow(val) {
      console.log(val);
      if (val === 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
        this.addCatalogForm.docTypeId = "";
      }
    },
    //新增环节 修改环节
    addOrEditCatalog(formName) {
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (_this.handelType) {
          //修改
          _this.addCatalogForm.id = _this.editCatalogId;
          _this.$store.dispatch("addOrEditCatalog", _this.addCatalogForm).then(
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
          _this.$store.dispatch("addOrEditCatalog", _this.addCatalogForm).then(
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
    getOrganDetail(id) {},

    //给主环节ID赋值
    setmainLinkId(notes) {
      let obj = {};
      let _this = this;
      let mainLinkList = this.mainLinkList;
      mainLinkList.forEach(item => {
        if (item.notes == notes) {
          _this.addCatalogForm.mainLinkName = item.notes;
        }
      });
      console.log("name", this.addCatalogForm.mainLinkName);
    },
    //获取文书列表
    getDocList() {
      let data = {};
      getDocListApi(data).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            this.docTypeList = res.data;
          } else {
            console.info("没有查询到数据");
          }
        }
      );
    },
    //通过数据字典获取大环节下拉
    getMainLink(name, codeName) {
      this.$store.dispatch("findAllDrawerByName", name).then(
        //查询执法领域
        res => {
          if (res.code === 200) {
            if (codeName === "mainLinkList") {
              this.mainLinkList = res.data;
            }
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
    this.getDocList();
    this.getCaseType();
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
