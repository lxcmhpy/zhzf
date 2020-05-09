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
          <el-radio-group v-model="formData.peopleAndRelationType" class="peopleTypeRadio" @change="changeType">
            <div class="peopleTypeListBox">
                <div v-for="(item,index) in peopleTypeList" :key="index"><el-radio :label="item.all">{{item.all}}</el-radio></div>
            </div>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item  label="与案件关系" label-width="115px" v-if="formData.peopleAndRelationType == '以上均不是'" prop="otherPeopleRelation">  
          <el-select placeholder="请选择" v-model="formData.otherPeopleRelation">
              <el-option v-for="item in allRelationWithCase" :key="item.value" :label="item.label" :value="item.label"></el-option>  
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
import { findPersonAndRelationByCaseIdApi,findAskNumApi,
    } from "@/api/caseHandle";
import { mapGetters } from "vuex";
export default {
  data() {
    var isOther = (rule, value, callback) => {
      if (this.formData.peopleAndRelationType == '以上均不是' && !value) {
        return callback(new Error("请选择"));
      }
      callback();
    };
    return {
      visible: false,
      docData:"",
      formData:{
        peopleType:'',
        otherPeopleRelation:"",
        askNum:"",
        peopleAndRelationType:'',
      },
      peopleTypeList:[],
      rules:{
        askNum:[
          { required: true, message: '请填写询问次数', trigger: 'blur' }
        ],
        otherPeopleRelation:[
          { required: true, validator: isOther, trigger: "change" }
        ],
      },
      allRelationWithCase: [
        //与案件关系下拉框
        { value: "0", label: "当事人" },
        { value: "1", label: "驾驶人" },
        { value: "2", label: "实际所有者" },
        { value: "3", label: "证人" },
        { value: "4", label: "承运人" },
        { value: "5", label: "代理人" }
      ],
      handleType:"",
    };
    
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(['caseId']) },
  methods: {
    showModal(data,isSaveLink,handleType) {
      this.visible = true;
      this.isSaveLink = isSaveLink;
      this.docData = data;
      this.handleType = handleType
      this.findPersonAndRelationByCaseId();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    showAskDoc(){
      console.log('与案件关系',this.formData.peopleAndRelationType)
      this.$refs["askPeopleForm"].validate(valid => {
        if (valid) {
          let addMoreData ={
            handelType:'isAddMore',
            askData:{
              peopleType:this.formData.peopleType,
              askNum:this.formData.askNum,
              peopleAndRelationType:this.formData.peopleAndRelationType,
              otherPeopleRelation:this.formData.otherPeopleRelation
            }
          }
          if(addMoreData.askData.otherPeopleRelation==''){
            addMoreData.askData.otherPeopleRelation='当事人'
          }
          console.log('addMoreData',addMoreData);
          this.com_viewDoc(this.docData,addMoreData);
        }
      })
      
    },
    //通过案件id获取询问笔录被询问人及其与案件关系
    findPersonAndRelationByCaseId(){
      let data ={
        caseBasicInfoId:this.caseId
      }
      findPersonAndRelationByCaseIdApi(data).then(res=>{
        console.log('ren',res);
        this.peopleTypeList = res.data;
        this.peopleTypeList.forEach(item => {
          // item.relation = this.switchRelate(item.relation);
          item.all = item.name+ '-' +item.relation;
        });
        this.peopleTypeList.push({name:'',relation:'none',all:'以上均不是'})
        console.log('peopleTypeList',this.peopleTypeList);
        //设置默认值
        this.formData.peopleType = this.peopleTypeList[0].relation;
        this.formData.peopleAndRelationType = this.peopleTypeList[0].all;
        this.findAskNum(this.peopleTypeList[0].name);
      },err=>{
        console.log(err)
      })
    },
    switchRelate(relation){
      let realRelation = '';
      switch (relation) {
        case "0":
          realRelation = '当事人'
          break;
        case "1":
          realRelation = '驾驶人'
          break;
        case "2":
          realRelation = '实际所有者'
          break;
        case "3":
          realRelation = '证人'
          break;
        case "4":
          realRelation = '承运人'
          break;
        case "5":
          realRelation = '代理人'
          break;
        default:
          break;
      }
      return realRelation;
    },
    //通过案件id和被询问人姓名查询询问次数
    findAskNum(name){
      let data = {
        caseId:this.caseId,
        name:name
      }
      console.log('询询问次数',data)
      findAskNumApi(data).then(res=>{
        console.log(res);
        this.formData.askNum =res.data;
      },err=>{
        console.log(err);
      })
    },
    //更改询问人及与案件关系
    changeType(val){
      console.log(val);
      if(val !='以上均不是'){
        let name = this.peopleTypeList.find(item => item.all === val).name;
        this.formData.peopleType = this.peopleTypeList.find(item => item.all === val).relation;
        this.findAskNum(name);
      }else{
        this.formData.askNum =1;
      }
    }

  }
};
</script>
<style lang="scss" scope>
  .peopleTypeRadio{
    width: 100%;
  }
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
