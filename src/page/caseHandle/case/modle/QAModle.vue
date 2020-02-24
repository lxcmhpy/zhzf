<template>
  <el-dialog
    custom-class="questDialog"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="35%"
  >
    <el-form :model="addBannerForm" ref="addBannerForm" label-width="50px" class="addQuestForm">
      <el-form-item label="问：">你是否申请回避？</el-form-item>
      <el-form-item label="答：">
        <el-select v-model="region" placeholder="请选择">
          <el-option label="不认识执法人员，不需要回避" value="no"></el-option>
          <el-option label="认识执法人员，需要回避" value="yes"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择问答模板" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-select
              v-model="addBannerForm.templateType"
              placeholder="请选择"
              @change="changeChoose"
            >
              <el-option label="不使用" value="0"></el-option>
              <el-option label="标准模板" value="1"></el-option>
              <el-option label="通用模板" value="2"></el-option>
              <el-option label="自定义模板" value="3"></el-option>
            </el-select>
          </el-col>
          <el-col :span="16" v-if="chooseCustomTemplate">
            <el-select v-model="addBannerForm.template" placeholder="请选择">
              <el-option label="行业模版" value="1"></el-option>
              <el-option label="门类模版" value="2"></el-option>
              <!-- <option v-for="(item,index) in templateList" :key="index" :label="item" :value="item"></option> -->
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>

      <div v-for="(domain, index) in addBannerForm.domains" :key="domain.key" style="margin-right:50px">
        <el-form-item :label="'问' + (index +1)" :prop="'domains.' + index+ '.question'" class="domainsBox">
          <el-input type="textarea" :autosize="{ minRows: 2,}" v-model="domain.question" @focus="canEdit(index)"></el-input>
          <span class="handleBtn"><i class="el-icon-remove" type="primary" @click.prevent="removeDomain(domain)"></i><i type="primary" v-show="index == addBannerForm.domains.length-1" class="el-icon-circle-plus" @click="addDomain"></i></span>
        </el-form-item>
        <el-form-item
          :label="'答' + (index +1)"
          :prop="'domains.' + index + '.answer'"
          :rules="[{ required: true, message: '不能为空', trigger: 'blur'}]">
          <!-- <el-row :gutter="10">
            <el-col :span="21"> -->
              <el-input type="textarea" :autosize="{ minRows: 2,}" v-model="domain.answer"></el-input>
            <!-- </el-col> -->
            <!-- <el-col :span="1"> -->
              <!-- <el-button @click.prevent="removeDomain(domain)" size="medium">删除</el-button> -->
            <!-- </el-col> -->
          <!-- </el-row> -->
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取消</el-button>
      <!-- <el-button type="primary" @click="submitForm('addBannerForm')">提交</el-button> -->
      <el-button type="primary" @click="overFloeEdit()">确定</el-button>
    </span>
    <templatQuestList ref="templatQuestListRef" @chooseQues="chooseQues"></templatQuestList>

  </el-dialog>
</template>
<script>
import templatQuestList from "./templatQuestList";

export default {
  data() {
    return {
      visible: false,
      dialogTitle: "填写问答",
      region: "no",
      addBannerForm: {
        templateType: "0",
        template: "",
        domains: [
          {
            key: "",
            question: "",
            answer: ""
          }
        ],
        email: ""
      },
      pathData: [], //传值
      chooseCustomTemplate: false, //是否选则自定义模版
      templateList: ['行业模版','门类模版'],
      editQuestIndex:0,
    };
  },
  components: {
    templatQuestList
  },
  inject: ["reload"],
  methods: {
    showModal(data) {
      this.visible = true;
      this.dialogTitle = "问答编辑";
      console.log(data);
      this.addBannerForm.domains = data;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //确定
    overFloeEdit() {
      //将当前内容传到父组件
      this.$refs['addBannerForm'].validate((valid) => {
          if (valid) {
            console.log(this.addBannerForm.domains)
            this.$emit("QAModleInfo", JSON.stringify(this.addBannerForm.domains));
            this.visible = false;
          }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.addBannerForm.domains.indexOf(item);
      if (index !== -1) {
        this.addBannerForm.domains.splice(index, 1);
      }
      
    },
    //选择问答模版
    changeChoose(val) {
      if (val == "0" || val == "2") {
        //不使用 通用模版
        this.chooseCustomTemplate = false;
      }else {
        //标准模版 自定义模版
        this.chooseCustomTemplate = true;
      }
    },
    addDomain() {
      this.addBannerForm.domains.push({
        question: "",
        answer: "",
        key: Date.now()
      });
    },
    //如果不使用模版则可以编辑 使用模版不可以编辑
    canEdit(index){
      this.editQuestIndex = index
      if(this.addBannerForm.templateType == '0'){

      }else{
        this.$refs.templatQuestListRef.showModal();
      }
    },
    chooseQues(val){
      this.addBannerForm.domains[this.editQuestIndex].question = val;  
    }
  }
};
</script>

