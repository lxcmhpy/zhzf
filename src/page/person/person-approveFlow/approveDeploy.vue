<template>
<div>
  <el-dialog
    :title="dialogTitle"
    custom-class="leftDialog"
    :visible.sync="visible"
    top=""
    width="30%"
    @close="closeDialog"
    :close-on-click-modal="false"
  >
    <el-form
      :model="addOrganForm"
      :rules="rules"
      ref="addOrganForm"
      label-width="30px"
      class="addOrganClass"
      :disabled="isDisabled"
    >
      <div class="part">
        <p class="titleP">审批流程</p>
        <el-form-item label="">
          <el-button type="primary"  icon="el-icon-plus" size="medium" @click="getStartList">初始化</el-button>
          <el-button type="primary"  icon="el-icon-plus" size="medium" @click="addOrg('','0')">添加节点</el-button>
        </el-form-item>
      </div>
      <div class="timeline-wrap">
        <el-form-item label=" " >
          <el-timeline >
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp">
              {{activity.oname}}
              <div style="float:right;margin-right: 15px;" v-if="index == '0' ? false:true">
                <el-button type="primary" icon="el-icon-edit" circle size="small" @click="addOrg(activity.id,'1')"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle size="small" v-on:click="deleteOrg(activity.id)"></el-button>
              </div>
            
            </el-timeline-item>
          </el-timeline>
          <!-- <div style="height: 400px;"></div> -->
          <!-- <div style="height: 400px;">
            <el-steps direction="vertical" :active="1">
              <el-step title="步骤 1">昂贵的三个</el-step>
              
              <el-step title="步骤 2"></el-step>
              <el-step title="步骤 3"></el-step>
              <el-step title="步骤 3"></el-step>
            </el-steps>
          </div> -->
        </el-form-item>
      </div>
    </el-form>
    <div class="wrap-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addOrgan()">确 定</el-button>
    </div>
  </el-dialog>
  <selWindow ref="selWindowRef" @getAllOrgan2="getAllOrgan1"></selWindow>
  </div>
</template>
<script>
import {BASIC_DATA_SYS} from '@/common/js/BASIC_DATA'
import selWindow from "./selWindow";
export default {
  data() {
    return {
      visible: false,
      reverse: true,
      addOrganForm: {
        name: "",
        pidName: "",
        code: "",
        organType: "",
        accessToAuthority: "",
        organNature: "",
        isIndependentEnforce: "",
        address: "",
        zipCode: "",
        telephone: "",
        contactor: "",
        fundingSource: "",
        legalBasis: "",
        mainPowers: ""
      },
      updateIndex:"",
      oid:"",
      activities: [],
      startActivities:[],
      returnActivities:[],
      paramList:[],
      selIndex:'',
      rules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }]
      },
      id:"",
      approveOrgs:"",
      parentNode: "", //新增机构时的上级机构
      dialogTitle: "", //弹出框title
      organId: "", //详情页id
      errorOrganName: false, //添加organname时的验证
      handelType:0,  //添加 0  修改2
      isDisabled:false,  //查看详情禁用form
      accessToAuthorityArray: [], // 职权取得方式
      organNatureArray: [], //机构性质
      organTypeArray: []
    };
  },
 components: {
    selWindow
  },
  methods: {
    //删除节点old
    deleteOrg1(index){
      let _this = this;
      for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].index == index){
          _this.activities.splice(i,1)
        }
      }
    },
   //删除节点
    deleteOrg(index){
      let _this = this;
      for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].id == index){
          _this.activities.splice(i,1)
        }
      }
    },
  //添加节点回调
    getAllOrgan11(date,type){
      let _this = this;
      let status = false;
      if(type == '0'){  //添加节点
        for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].index == date.index){
            this.$message({
               type: "error",
               message: "该节点已存在!"
            });
            return;
        }
      }
      for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].index > date.index){
              _this.activities.splice(i,0,date);
              status = true;
            break;
        }
      }
      if(!status){
         _this.activities.splice(_this.activities.length,0,date);
      }
      }else{ //修改节点
      // 判断节点是否存在--存在
         for(let i = 0;i<_this.activities.length;i++){
           if(_this.activities[i].index == date.index){
            this.$message({
               type: "error",
               message: "该节点已存在!"
            });
            return;
          }
      }
    // 节点不存在
        this.deleteOrg(this.selIndex);
        //添加替换的节点
        for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].index > date.index){
              _this.activities.splice(i,0,date);
              status = true;
            break;
        }
      }
      if(!status){
         _this.activities.splice(_this.activities.length,0,date);
      }
      }
    },
     //添加节点回调
    getAllOrgan1(date,type){
      let _this = this;
      if(type == '0'){
        _this.activities.splice(_this.activities.length,0,date);
      }else if(type=='1'){
         _this.activities.splice( _this.updateIndex,1,date);
      }
    
    },
    //添加节点
    addOrg(index,type){ // 0:添加  1：修改
       let _this = this;
      //获取修改节点的数组下标
      for(let i = 0;i<_this.activities.length;i++){
        if(_this.activities[i].id == index){
              _this.updateIndex=i;
        }
      }
      //若不存在节点则默认添加当前机构
      if(_this.activities.length==0){
        _this.activities.splice(0,1,_this.startActivities[0]);
      }
      this.$refs.selWindowRef.showModal(type);
    },
    //初始化列表
    getStartList(){
      let _this = this;
      _this.activities = _this.startActivities;
      //解决数组同源问题
      _this.startActivities = JSON.parse(JSON.stringify(_this.startActivities));
    },
    
    showModal1(data1,oid) {
      let _this = this;
      _this.oid = oid;
      _this.paramList=data1;
      let   approveidList = [];
      _this.startActivities = _this.paramList;
      _this.returnActivities = _this.startActivities;
      _this.returnActivities = JSON.parse(JSON.stringify(_this.returnActivities));
      let exist = false;
        let data =  {
            oid:oid,
        }
       this.$store.dispatch("queryByOidModul",data).then(
        res => {
          if(res.data != null){
             approveidList = res.data.approveOrgs.split(",");
             for(let i = 0;i<_this.returnActivities.length;i++){
               exist = false;
                for(let j = 0;j<approveidList.length;j++){
                  if(_this.returnActivities[i].id == approveidList[j]){
                      exist = true;
                  }  
                }
                if(!exist){
                  _this.returnActivities.splice(i,1,"");
                }
            }
           for(let k = 0;k<_this.returnActivities.length;k++){
             if(_this.returnActivities[k] == " " || _this.returnActivities[k] == null || typeof(_this.returnActivities[k]) == "undefined" || _this.returnActivities[k] == ""){  
                  _this.returnActivities.splice(k,1);  
                  k= k-1;
              }
           }
           
             _this.activities = _this.returnActivities;
          }
        },
        err => {
          console.log(err);
        }
      );
      this.visible = true;
      this.dialogTitle = "审批流程";  
    //  this.getBasicData()
    },
showModal(data1,oid){
  let _this = this;
      _this.oid = oid;
      _this.paramList=data1;
      let approveidList = [];
      _this.startActivities = _this.paramList;
      // _this.returnActivities = _this.startActivities;
      // _this.returnActivities = JSON.parse(JSON.stringify(_this.returnActivities));
      let  dataList = [];
      let approveOrgsList = [];
      let approveOrgNamesList = [];
        let data =  {
            oid:oid,
        }
       this.$store.dispatch("queryByOidModul",data).then(
        res => {
          if(res.data != null){
           approveOrgsList = res.data.approveOrgs.split(",");
           approveOrgNamesList = res.data.approveOrgNames.split(",")
            for(let j = 0;j<approveOrgsList.length;j++){
                  dataList.push({"id":approveOrgsList[j],"oname":approveOrgNamesList[j]})
                }
              _this.activities = dataList;
          }
        },
      );
      this.visible = true;
      this.dialogTitle = "审批流程"; 
},
    //初始化数据
    doaApploy(id){
      let _this = this;
      _this.index = -1;
      this.paramList=[]
      let data = [];
      if(_this.startActivities.length>0){
       _this.getOrgPid(_this.startActivities,id);
      }
     // data = _this.paramList;
     //  this.$refs.approveDeployRef.showModal(data,id);
    },
    //根据点击机构的id查找pid
    getOrgPid(arr,id){
       let _this = this;
       if(arr != undefined){
       if(arr.length>0){
        arr.forEach(item=>{
          if(item.id == id){
            _this.index = _this.index + 1;
           this.paramList.push({"id":item.id,"oname":item.label,"index":_this.index});
           if(item.pid != 0){
             _this.getOrgPid(_this.startActivities,item.pid)
           }
           return;
          }
        })
        if(arr != undefined){
          for(let i = 0;i<arr.length;i++){
                 _this.getOrgPid(arr[i].children,id)
            }
        }
        
        }
      }
    },

  searchTable() {//查询所属机构
            let _this = this
            _this.$store.dispatch("getAllOrgan").then(
                res => {
                _this.startActivities = res.data;
            },
            err => {
                console.log(err);
            });
        },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.activities = [];
      this.startActivities=[];
      this.returnActivities=[];
      //this.$emit("getAllOrgan2");
      this.visible = false;
      this.$refs["addOrganForm"].resetFields();
      this.errorOrganName = false;
    },
    //提交审批流程
    addOrgan() {
        let _this = this;
        let list = '';
        for(let i = 0;i<_this.activities.length;i++){
           list = list + _this.activities[i].id + ",";
        }
        let data =  {
            oid:_this.oid,
            approveOrgs:list.substring(0,list.length-1),

        }
          _this.$store.dispatch("updateApModul", data).then(
            res => {
              if(res.code == '200'){
                this.$message({
                type: "success",
                message: "提交成功!"
               });
                this.$emit("getAllOrgan2",this.oid);
              }else{
                this.$message({
                type: "error",
                message: "提交失败!"
               });
              }
              this.closeDialog();
            },
            err => {
              console.log(err);
            }
          );
    },
  },
};
</script>
<style lang="scss" scoped>
.leftDialog{
  .wrap-footer{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 30px 20px;
    border-top: 1px solid #e9edf6;
    text-align: right;
    background: #fff;
  }
}
.timeline-wrap{
  min-height: 200px;
  overflow-y: scroll;
  >>>.el-button i{
    margin-right: 0;
  }
}
>>>.el-timeline-item__content{
  line-height: 22px;
}
.addOrganClass{
  height: calc(100% - 80px);
}
</style>

