<template>
  <el-dialog
    title="立案登记"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
  >
    <div>
      <el-form
        :model="caseRegisterForm"
        :rules="rules"
        ref="caseRegisterForm"
        class="caseRegisterForm"
        label-width="100px"
      >
        <div class="item">
          <el-form-item label="执法门类" prop="name">
            <el-select v-model="caseRegisterForm.cateId" placeholder="请选择" @change="changeLawCate">
              <el-option
                v-for="item in lawCateList"
                :key="item.cateId"
                :label="item.cateName"
                :value="item.cateId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="程序类型" prop="type">
            <el-radio-group v-model="caseRegisterForm.programType" @change="changeType">
              <el-radio :label="0">一般程序</el-radio>
              <el-radio :label="1">简易程序</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div class="item" id="illegalActBox">
          <el-form-item label="违法行为" prop="yy">
            <el-input v-model="caseRegisterForm.yy" @click="chooseIllegalAct">
              <el-button slot="append" @click="chooseIllegalAct"></el-button>
            </el-input>
          </el-form-item>
        </div>
        <div class="item">
          <el-form-item label="案件类型" prop="name2">
            <el-select v-model="caseRegisterForm.name2" placeholder="请选择">
              <el-option
                v-for="item in caseTypeList"
                :key="item.caseTypeId"
                :label="item.caseTypeName"
                :value="item.caseTypeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="goToInforCollect">确 定</el-button>
    </span>

    <chooseillegalAct ref="chooseillegalActRef"></chooseillegalAct>
  </el-dialog>
</template>
<script>
import chooseillegalAct from "./chooseillegalAct";
import MainContent from "@/components/mainContent";
import Layout from "@/page/lagout/mainLagout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
export default {
  data() {
    return {
      visible: false,
      caseRegisterForm: {
        cateId: "",
        programType: 0,
        name2: "",
        yy: ""
      },
      rules: {
        name: [{ required: true, message: "请选择", trigger: "blur" }],
        type: [{ required: true, message: "请选择", trigger: "blur" }],
        name2: [{ required: true, message: "请选择", trigger: "blur" }],
        yy: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      allName: [{ value: "0", label: "公路" }, { value: "1", label: "公路2" }],
      allName2: [{ value: "0", label: "公路" }, { value: "1", label: "公路2" }],
      lawCateList:[],  //执法门类列表
      caseTypeList:[], //案件类型列表
      
    };
  },
  inject: ["reload"],
  components: {
    chooseillegalAct
  },
  methods: {
    showModal() {
      this.visible = true;
      this.getEnforceLawType();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    changeType() {
        this.getCaseType();
    },
    //选择违法行为弹窗
    chooseIllegalAct() {
        if(this.caseRegisterForm.cateId){
            let cateName = '';
            this.lawCateList.forEach(item=>{
                if(item.cateId==this.caseRegisterForm.cateId){
                    name = item.cateName;
                    return;
                }
            })
            let lawCate={
                cateId:this.caseRegisterForm.cateId,
                cateName:cateName
            }
            this.$refs.chooseillegalActRef.showModal(lawCate);
        }else{
            this.$message("请选择执法门类")
        }
    },
    //获取执法门类
    getEnforceLawType() {
        console.log('获取执法门类')
      this.$store.dispatch("getEnforceLawType","1").then(
        res => {
          this.lawCateList = res.data;

        },
        err => {
          console.log(err);
        }
      );
    },
    //获取案件类型
    getCaseType() {
        let data={
            programType:this.caseRegisterForm.programType,
            cateId:this.caseRegisterForm.cateId
        }
      this.$store.dispatch("getCaseType",data).then(
        res => {
          console.log("案件类型", res);
          this.caseTypeList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //选择门类
    changeLawCate(val){
        this.getCaseType();
    },
    goToInforCollect() {
      this.makeRoute(
        "/inforCollect",
        "/inforCollect2",
        "/inforCollect3",
        "inforCollect",
        "inforCollect2",
        "inforCollect3",
        "信息采集",
        "caseHandle/unRecordCase/inforCollection.vue"
      );
    },
    makeRoute(path1, path2, path3, name1, name2, name3, title, componentName) {
      //path不可以重复  name也不可以重复
      this.$router.addRoutes([
        {
          path: path1,
          name: name1,
          component: Layout,
          children: [
            {
              path: path2,
              name: name2,
              component: MainContent,
              children: [
                {
                  path: path3,
                  name: name3,
                  meta: {
                    title: title
                  },
                  component: () => import("@/page/" + componentName)
                }
              ]
            }
          ]
        }
      ]);
      this.$router.push({ name: name3 });
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>
