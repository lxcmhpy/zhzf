<template>
<div>
  <el-dialog
    custom-class="leftDialog uploadEvidenceDia"
    :visible.sync="visible"
    @close="closeDialog"
    top="60px"
    right="0px"
    width="405px"
    :modal="false"
    :show-close="false"
  >
    <template slot="title">
        <div class="catalogueTitle">
            选择证据
            <!-- <el-button size="small" type="primary" @click="saveFile">上传证据</el-button> -->

            <el-upload
              class="uploadEvidence"
              :http-request="saveFile"
              action=""
              multiple
              :show-file-list="false"
              >
              <el-button size="small" type="primary">上传证据</el-button>
            </el-upload>
        </div>
    </template>
    <div class="a">
        <el-table bordercolor="black" ref="myTable" width="100%" cellspacing="0" :data="eviList" :show-header="false"  @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                :selectable="selectable"
                width="55">
            </el-table-column>
            <el-table-column prop="evPath" align="center">
              <template slot-scope="scope">
          　　　　<img :src="host+scope.row.evPath" width="200" height="120"/>
          　　</template>
            </el-table-column>
        </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
       <el-button size="small"  @click="visible=false">取消</el-button>
       <el-button size="small" type="primary" @click="chooseSure">确定</el-button>
    </span>
  </el-dialog>
  <!-- <evidenceDetail ref="evidenceDetailRef"></evidenceDetail> -->

  <!-- <evidenceUploadSuccess ref="evidenceUploadSuccessRef" @getEvidenceEmit="getEviList"></evidenceUploadSuccess> -->
</div>
</template>
<script>
import { mapGetters } from "vuex";
// import evidenceDetail from "./evidenceDetail";
// import evidenceUploadSuccess from "./evidenceUploadSuccess";
import iLocalStroage from "@/common/js/localStroage.js";
import {
 uploadEvApi,
 findFileByIdApi,
 uploadEvdence
} from "@/api/upload";
export default {
  data() {
    return {
      host:"",
      visible: false,
      eviList:[],
      evfile:"",
      form: {
        id: "",
        caseId: "",
        evName: "",
        evType: "照片",
        status: 0,//默认为有效证据
        fileId: "",
        remark: "",
        file: null,
        docId: "",
        category: "",
        userId: ""
      },
      multipleSelection: [],
      alreadySelect:'',
      pageType:'',
      currentPicData:'', //页面显示的图片的相关信息

    };
  },
  inject: ["reload"],
  // props: ["caseInfo"],
  computed: { ...mapGetters(["caseId"]) },
//   components: {
//         evidenceDetail, 
//         evidenceUploadSuccess       
//     },
  methods: {
    hidden(){
      this.visible = false;
    },
    showModal(currentPicData) {
      console.log('show');
      this.currentPicData = currentPicData;
      this.visible = true;
      this.getEviList();
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //查询证据列表
    getEviList() {
        let data = {
            caseId:this.caseId,
            // evName:this.evidenceForm.evName,
            evType:'照片',
            status:'0',  //查询有效的证据
        };
        console.log("证据目录参数",data);
        let _this = this
        this.$store.dispatch("getEvidence", data).then(res => {
            _this.eviList = res.data.records;
            console.log('this.currentPicData',this.currentPicData)
            if(this.currentPicData.picSrc){
                this.eviList.forEach(item=>{
                  if(this.currentPicData.picSrc==item.evPath){
                    console.log('选中');
                    this.$nextTick(function(){
                      this.$refs.myTable.toggleRowSelection(item,true);
                    })
                  }
                })
            }
              // if (picData) {
              //   this.eviList.forEach(item=>{
              //     if(picData.id==item.id){
              //       console.log('选中');
              //       this.$nextTick(function(){
              //         this.$refs.myTable.toggleRowSelection(item,true);
              //       })
              //     }
              //   })
              // } 
           

            
            console.log("111",_this.eviList);
        });

    },
    //显示证据详情
    // evidenceDetail(data){
    //     console.log("证据详情",data)        
    //     this.$refs.evidenceDetailRef.showModal(data); 
    // },
    saveFile(param) {
      console.log(param);
      (this.form.file = param.file),
      (this.form.caseId = this.caseId),
      (this.form.docId = "000"),
      (this.form.category = "证据"),
      (this.form.userId = iLocalStroage.gets("userInfo").id),
      (this.form.evName = param.file.name);
      if(param.file.type == 'image/png' || param.file.type == 'image/jpeg' || param.file.type == 'image/jpg'){
          this.form.evType = '照片'
      }else{
          this.form.evType = param.file.type
      }
      this.insertEvi();      
    },
    //插入证据
    insertEvi(id){
      var fd = new FormData();
      fd.append("file", this.form.file);
      fd.append("caseId", this.form.caseId);
      fd.append("objectId", this.form.docId);
      fd.append("category", this.form.category);
      fd.append("userId", this.form.userId);
      fd.append("evName", this.form.evName);
      fd.append("evType", this.form.evType);
      fd.append("status", this.form.status);
      fd.append("remark", this.form.remark);
      fd.append("fileId", this.form.fileId);
      // fd.append("id", this.form.id);
      let _this = this
      uploadEvdence(fd).then(res => {
        console.log("1111111",res);
        if (res.code == 200){
          // this.$refs.evidenceUploadSuccessRef.showModal();
          _this.addVisible = false;
          // _this.currentPage = 1;
          _this.getEviList();
        }else{
          _this.$message.error('出现异常，添加失败！');
        }
      });
    },
    handleSelectionChange(val) {
        console.log('handleSelectionChange',val)
        if (val.length > 1) {
            this.$refs.myTable.clearSelection()
            this.$refs.myTable.toggleRowSelection(val.pop());
        }else{
          this.multipleSelection = val;
        }
        
    },
    //是否可选
    selectable(row,index){
      return !this.currentPicData.selectAllPicPath.includes(row.evPath) || row.evPath == this.currentPicData.picSrc
    },

    //确认
    chooseSure(){
      let data = '';
      // if( this.currentPicData.pageType == 'evidencePastePage' ){ //粘贴照片页
      //   this.currentPicData.picData = this.multipleSelection[0];
      // }else{
      //   data = this.multipleSelection[0];
      // }
       this.currentPicData.picData = this.multipleSelection[0];
        this.$emit('choosePic',this.currentPicData);
        this.visible = false;
    }
  },
  mounted () {
      this.host = iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
  }
};
</script>
<style lang="scss">
.fullscreen .uploadEvidenceDia{
  height: calc(100% - 60px);
}
  .uploadEvidence{
    display: inline-block;
    margin-left: 20px;
  }
</style>
