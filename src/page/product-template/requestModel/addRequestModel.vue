<template>
  <el-dialog
      :title="dialogTitle"
      :visible.sync="visible"
      :close-on-click-modal="false"
      @close="closeDialog"
      width="35%"
    >
      <el-form
        :model="addRequest"
        :rules="rules"
        ref="addRequest"
        class="errorTipForm"
        label-width="100px"
      >
        <div class="item">
          <el-form-item label="模版名称" prop="modelName">
            <el-input v-model="addRequest.modelName"></el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="模板类型" prop="modelTypeId">
            <el-select
              v-model="addRequest.modelTypeId"
              placeholder="请选择模板类型"
            >
              <el-option label="标准模板" value="11"></el-option>
              <el-option label="通用模板" value="22"></el-option>
              <el-option label="自定义模板" value="33"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="执法机构" prop="zfjg">
            <!-- <el-input v-if="showSelectTree" @focus="showTree" v-model="addRequest.organName"></el-input> -->
            <elSelectTree
              v-if="showSelectTree"
              :value="addRequest.zfjg"
              ref="elSelectTreeObjTwo"
              :options="getOrganList"
              :accordion="true"
              :props="props"
              @getValue="handleChanged">
            </elSelectTree>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="业务领域" prop="zfml">
            <el-select v-model="addRequest.zfml" clearable placeholder="请选择业务领域">
              <el-option
                v-for="item in zfmlList"
                :key="item.cateName"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addRequestModel('addRequest')">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import { saveOrUpdateRequestModelApi } from "@/api/caseHandle";
import { queryLawCateByOrganIdApi} from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import elSelectTree from '@/components/elSelectTree/elSelectTree';
export default {
  data() {
    return {
      visible: false,
      addRequest: {
        id: "",
        modelName: "",
        organName: "",
        createTime:"",
        modelTypeId: "",
        zfjg:"",
        zfml:""
      },
      props: {
          label: "label",
          value: "id"
      },
      rules: {
         modelName: [
          { required: true, message: "模板名称不能为空", trigger: "blur" },
          { max: 85, message: "最多输入85个字符", trigger: "blur" },
         ],
         modelTypeId: [{ required: true, message: "模板类型不能为空", trigger: "blur" }],
         zfjg: [{ required: true, message: "执法机构不能为空", trigger: "blur" }],
         zfml: [{ required: true, message: "执法门类不能为空", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2
      getOrganList: [],
      zfmlList:[],
      organId:iLocalStroage.gets('userInfo').organId,
      showSelectTree: true,
    };
  },
  components: {
      elSelectTree
  },
  inject: ["reload"],
  methods: {
    showModal(type, data ,orgList) {
      this.visible = true;
      this.handelType = type;
      let data1={
          organId:this.organId
      };
      queryLawCateByOrganIdApi(data1).then(
          res => {
              this.zfmlList = res.data;
          },
          err => {
              console.log(err);
          }
      );
      if (type == 0) {
        this.dialogTitle = "新增";
        this.addRequest = {
          createTime:new Date().format('yyyy-MM-dd HH:mm:ss')
        };
      } else if (type == 2) {
        this.dialogTitle = "修改";
        this.handelType = type;
        this.addRequest.id = data.id;
        this.addRequest.zfjg = data.zfjg;
        this.addRequest.zfml = data.zfml;
        this.addRequest.modelName = data.modelName;
        this.addRequest.modelTypeId = data.modelTypeId;
      }
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.addRequest={};
    },
    //新增验证
    addRequestModel(formName) {
      let _this = this
      this.$refs[formName].validate((valid, noPass) => {
        if (valid) {
            _this.addOrEdit();
        }else {
          let a = Object.values(noPass)[0];
          this.$message({
            showClose: true,
            message: a[0].message,
            type: 'error',
            offset: 100,
            customClass: 'validateErrorTip'
          });
          return false;
        }
      });
    },
    //新增 修改
    addOrEdit() {
      let _this = this;
      _this.addRequest.url = _this.addRequest.path;
      if(_this.handelType=="0"){
          saveOrUpdateRequestModelApi(_this.addRequest).then(
              res => {
                if(res.data == true){
                  _this.$message({
                    type: "success",
                    message: "添加成功"
                  });
                  _this.reload();
                }else{
                  _this.$message({
                      type: "error",
                      message: "模板名称重复,请修改"
                  });
                }
              },
              err => {
                console.log(err);
              }
        );
      }else{
        saveOrUpdateRequestModelApi(_this.addRequest).then(
              res => {
                if(res.data == true){
                  _this.$message({
                    type: "success",
                    message: "修改成功"
                  });
                  _this.reload();
                }else{
                  _this.$message({
                      type: "error",
                      message: "模板名称重复,请修改"
                  });
                }
              },
              err => {
                console.log(err);
              }
        );
      }

    },
    handleChanged(val){
        console.log("elSelectTreeObjTwo",this.$refs.elSelectTreeObjTwo.valueId)
        this.$refs.elSelectTreeObjTwo.$children[0].handleClose();
        this.addRequest.zfjg = val
    },
    showTree(){
      console.log("aaaa")
      this.showSelectTree = false;
    },
    //获取当前机构及其子机构
    getCurrentOrganAndChild() {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.getOrganList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
  },
  mounted(){
    this.getCurrentOrganAndChild();
  }
};
</script>
<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
