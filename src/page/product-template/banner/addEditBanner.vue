<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addBannerForm" :rules="rules" ref="addBannerForm" label-width="130px">
      <div class="item">
        <el-form-item label="环节名称" prop="linkName">
          <el-input v-model="addBannerForm.linkName"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="所属大环节" prop="mainLinkName">
          <el-select
            v-model="addBannerForm.mainLinkName"
            @change="setmainLinkId($event)"
            @focus="getMainLink('大环节','mainLinkList')"
            placeholder="请选择"
          >
            <el-option
              v-for="item in mainLinkList"
              :key="item.id"
              :label="item.notes"
              :value="item.notes"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
          <el-form-item label="案件类型" prop="remark">
            <el-select
              v-model="addBannerForm.remark"
              filterable
              placeholder="请选择"
            >
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
        <el-form-item label="是否有审批流程">
          <el-select v-model="addBannerForm.isApproval" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
          <el-select v-model="addBannerForm.isPdf" @change="selectIsShow" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item" v-if="isShow">
        <el-form-item label="生成文书">
          <el-select v-model="addBannerForm.docTypeId" filterable placeholder="请选择">
            <el-option
              v-for="item in docTypeList"
              :key="item.id"
              :label="item.name + '('+item.remark+')'"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否是立案">
          <el-select v-model="addBannerForm.isFiling" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否是归档">
          <el-select v-model="addBannerForm.isFile" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="是否生成案件编号">
          <el-select v-model="addBannerForm.isCaseNumber"  placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="页面地址">
          <el-input v-model="addBannerForm.linkUrl"></el-input>
        </el-form-item>
      </div>
      <div class="item">
        <el-form-item label="排序">
          <el-input v-model="addBannerForm.sort" disabled></el-input>
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
import { getDocListApi} from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      isShow: true,
      addBannerForm: {
        linkName: "",
        mainLinkName: "",
        isApproval: "",
        activitiId: "",
        isPdf: "",
        docTypeId: "",
        docTypeName: "",
        remark: "",
        sort: "",
        isFiling: "",
        isFile: "",
        linkUrl: "",
        mainLinkId: "",
        isCaseNumber: ""
      },
      mainLinkList: [],
      docTypeList: [],
      caseTypeList:[],
      rules: {
         linkName: [{ required: true, message: "环节名称不能为空", trigger: "blur" }],
         mainLinkName: [{ required: true, message: "所属大环节不能为空", trigger: "blur" }],
         remark: [{ required: true, message: "所属案件类型名称不能为空", trigger: "blur" }],
      },
      dialogTitle: "", //弹出框title
      handelType: 0, //添加 0  修改2
      editBannerId: "",
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
        this.dialogTitle = "新增环节";
        this.addBannerForm = {
          linkName: "",
          mainLinkName: "",
          isApproval: "",
          activitiId: "",
          isPdf: "",
          docTypeId: "",
          docTypeName: "",
          remark: "",
          sort: data + 1,
          isFiling: "",
          isFile: "",
          linkUrl: "",
          mainLinkId: "",
          isCaseNumber: ""
        };
      } else if (type == 2) {
        this.dialogTitle = "修改环节";
        this.addBannerForm = data;
        this.addBannerForm.createTime = "";
        this.editBannerId = data.id;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addBannerForm"].resetFields();
    },
    //是否生成PDF
    selectIsShow(val){
      console.log(val)
      if(val === 0){
        this.isShow = true;
      }else{
        this.isShow = false;
        this.addBannerForm.docTypeId = '';
      }
    },
    //新增环节 修改环节
    addOrEditBanner(formName) {
      let _this = this;
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
    getOrganDetail(id) {},

    //给主环节ID赋值
    setmainLinkId(notes) {
      let obj = {};
      let _this=this;
      let mainLinkList = this.mainLinkList;
      mainLinkList.forEach((item) => {
        if(item.notes == notes){
          _this.addBannerForm.mainLinkName = item.notes;
        }
      });
      console.log("name",this.addBannerForm.mainLinkName)
    },
    //获取文书列表
    getDocList() {
      let data = {}
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
    getCaseType(){
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
