<template>
  <el-dialog
    title="添加询问笔录"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="400px"
  >
    <div>
      <p>请选择被询问人类型，系统将会根据选项，自动 填写被询问人信息：</p>
      <el-form ref="askPeopleForm" :model="formData" :rules="rules">
        <el-form-item>
          <p>请选择被询问人及其与案件关系</p>
          <el-radio-group v-model="formData.peopleType">
            <div class="peopleTypeListBox">
                <div v-for="(item,index) in peopleTypeList" :key="index"><el-radio :label="item.value">{{item.label}}</el-radio></div>
            </div>
          </el-radio-group>
        </el-form-item>
        <el-form-item  label="与案件关系" label-width="115px" v-if="formData.peopleType == '3'" prop="otherPeopleRelation">  
          <el-select placeholder="请选择" v-model="formData.otherPeopleRelation">
          </el-select>
        </el-form-item>
        <el-form-item  label="询问次数" label-width="105px" prop="askNum">    
            <span class="askNumBox">第  <el-input v-model="formData.askNum" size="small"></el-input> 次询问</span>
        </el-form-item>
      </el-form>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="showAskDoc">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    var isOther = (rule, value, callback) => {
      if (this.formData.peopleType == 4) {
        return callback(new Error("请选择"));
      }
      callback();
    };
    return {
      visible: false,
      docData:"",
      formData:{
        peopleType:0,
        otherPeopleRelation:"",
        askNum:""
      },
      peopleTypeList:[
          {
              value:0,
              label:'当事人'
          },
          {
              value:1,
              label:'与案件的关系是'
          },
          {
              value:2,
              label:'代理人'
          },
          {
              value:3,
              label:'以上均不是'
          }
      ],
      rules:{
        askNum:[
          { required: true, message: '请填写询问次数', trigger: 'blur' }
        ],
        otherPeopleRelation:[
          { required: true, validator: isOther, trigger: "change" }
        ],
      },
      handleType:"",
    };
    
  },
  mixins: [mixinGetCaseApiList],
  computed:{
  
  },
  methods: {
    showModal(data,isSaveLink,handleType) {
      this.visible = true;
      this.isSaveLink = isSaveLink;
      this.docData = data;
      this.handleType = handleType
      
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    showAskDoc(){
       this.com_viewDoc(this.docData,'isAddMore');
    }
  }
};
</script>
<style lang="scss" scope>
    .peopleTypeListBox{
        margin-top: 15px;
        display: flex;
        flex-wrap:wrap;
        &>div{
            width: 50%;
            margin-bottom: 10px;
        }
    }
    .askNumBox{
      &>div{
        width: 100px;
        display: inline-block;
      }
    }

</style>
