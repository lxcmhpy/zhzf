<template>
  <div class="containerBox box searchPage">
    <div class="back" >
      <span @click="router"><i class="el-icon-arrow-left"></i>前往归档页面</span>
      <el-button type="primary" size="small" @click="editOrder">确认</el-button>
    </div>
    <div class="tablePart">
      <el-table :data="caseList" border stripe highlight-current-row style="width: 100%">
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="材料名称" align="center"></el-table-column>
        <el-table-column prop="page" label="起止页数" align="center">
          <!-- <template slot-scope="scope">
              <span>{{currentPages(scope)}}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="顺序调整" align="center" >
          <template slot-scope="scope">
            <div>
                <span v-show="!scope.$index" class="iconfont law-desc"></span>
                <span v-show="scope.$index" @click="byAsc(scope.row,scope.$index)" class="iconfont law-desc blueC"></span>
                <span v-show="scope.$index == caseList.length-1" class="iconfont law-asc"></span>
                <span v-show="scope.$index != caseList.length-1" @click="byDesc(scope.row,scope.$index)" class="iconfont law-asc blueC"></span>
                <!-- 删除 -->
                <span v-if="scope.row.category == '证据'" @click="deleteEvidence(scope.row,scope.$index)" class="iconfont law-delete blueC"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附件关联" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.category == '文书'" @click="showDialog(scope.row,scope.$index)" class="iconfont law-add blueC"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="附件关联"
      :visible.sync="operateVisible"
      custom-class="dialog1"
      @close="closeDialog"
      append-to-body
      :close-on-click-modal="false"
      width="500px"
    >
      <div class="alignCenter">
        <el-button
          :class="{'btn-1':true, 'blueBg': relationFileVisible}"
          @click="bindEvidence"
        >绑定已有证据材料</el-button>
        <br />
        <br />
        <br />
        <el-button :class="{'btn-1':true}" @click="showAddEvidence">新增证据材料附件</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="上传证据"
      :visible.sync="addEvidenceVisible"
      custom-class="dialog1"
      @close="closeDialog"
      append-to-body
      width="740px"
      :close-on-click-modal="false"
    >
      <div>
        <div style="float: left;width: 370px;">
          <el-upload
            class="upload-demo"
            id="catalogueUpload"
            ref="uploadEvidenceRef"
            drag
            :http-request="saveFile"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemoveFile"
            :on-exceed="handleExceed"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em>点击上传附件</em>
            </div>
            <!-- <div
              class="el-upload__tip"
              slot="tip"
              style="text-align: center"
            >只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
        <div style="float:left;width:300px">
          <el-form ref="evidenceForm" :model="formUpload" :rules="addrules" label-width="100px">
            <el-form-item label="证据类型" prop="evType">
              <el-select v-model="formUpload.evType">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName">
              <el-input v-model="formUpload.evName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="userName">
              <el-input v-model="formUpload.userName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间" prop="createTime">
              <el-date-picker
                style="width: 200px"
                v-model="formUpload.createTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="—"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="取证地点" prop="recordPlace">
              <el-input v-model="formUpload.recordPlace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status">
              <el-radio-group v-model="formUpload.status">
                <el-radio label="0">有效</el-radio>
                <el-radio label="1">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="note">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="formUpload.note"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="clear:both;text-align:center">
          <el-button size="medium" type="primary" @click="submitForm('evidenceForm')">提 交</el-button>
          <el-button size="medium" @click="closeAddEvidenceDialog">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-drawer
      title="附件关联"
      :visible.sync="relationFileVisible"
      custom-class="dialog1 fullscreen"
      size="900px"

    >
      <div style="height:100%">
        <div class="relationFileVisibleBox">
          <el-table
            :data="evidenceList"
            border
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange"
            style="width: 100%;height:100%"
          >
            <el-table-column width="55" type="selection" label="选择" align="center" :selectable="selectable"></el-table-column>
            <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="evName" label="证据名称" align="center"></el-table-column>
            <el-table-column prop="evType" label="证据类型" align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.evType == '照片'"><img src="../../../../static/images/img/icon_tupian.png"></span>
                  <span v-if="scope.row.evType == '文件'"><img src="../../../../static/images/img/icon_qita.png"></span>
                  <span v-if="scope.row.evType == '视频'"><img src="../../../../static/images/img/icon_shipin.png"></span>
                  <span v-if="scope.row.evType == '音频'"><img src="../../../../static/images/img/icon_yinpin.png"></span>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
              <template slot-scope="scope">
                <span v-if="!scope.row.status">有效</span>
                <span v-else>无效</span>
              </template>
            </el-table-column>
            <el-table-column label="详情" align="center">
              <template slot-scope="scope">
                <img v-if="scope.row.evType == '照片'" :src="host+scope.row.evPath" style="height:50px;">
                <el-link type="primary" v-if="scope.row.evType != '照片'" :href="host+scope.row.evPath">下载</el-link>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center" prop="note"></el-table-column>
          </el-table>
        </div>
        <div style="text-align:right;margin-top:17px">
          <el-button size="medium" type="primary" @click="relationFileVisible=false">取消</el-button>
          <el-button size="medium" class="greenBg2" @click="next">确认</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- :direction="direction" -->
    <!-- :before-close="handleClose" -->
    <el-drawer
      title="附件关联"
      :visible.sync="enclosureVisible"
      custion-class="archiveCatalogueBox"
      size="900"
    >
      <ul class="catalogueDrawerList">
        <li v-for="(item, i) in multipleSelection" :key="i">
          <img :src="host+item.evPath" >
          <div class="evidenceName">{{item.evName}}</div>
          <div>
            <span>
              <i class="el-icon-user"></i>
              {{item.userName}}
            </span>
            <span>
              <i class="el-icon-time"></i>
              {{item.createTime}}
            </span>
          </div>
          <div>
            <i class="el-icon-location-outline"></i>
            {{item.recordPlace}}
          </div>
        </li>
      </ul>
      <div class="archiveCataloguebottom">
        <el-button size="medium" type="primary" @click="enclosureVisible=false">继续添加</el-button>
        <el-button size="medium" class="greenBg2" @click="addEnclosure">确认</el-button>
      </div>
    </el-drawer>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <!-- <archiveCatalogue ref="archiveCatalogueRef"></archiveCatalogue> -->
  </div>
</template>
<script>
// import archiveCatalogue from "./archiveCatalogue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { uploadEvApi, findFileByIdApi, uploadEvdence } from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage.js";
import { validateRequire } from "@/common/js/validator.js";
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
import {
  saveOrUpdateDocCatalogList,findEvidencePicApi,deleteDocCatalogEvidenApi,
} from "@/api/caseHandle";
export default {
  data() {
    return {
      caseList: [],
      operateVisible: false,
      relationFileVisible: false,
      evidenceList: [],
      currentDocObj: [],
      addEvidenceVisible: false,
      addrules: {
        category: [
          {
            required: true,
            message: "证据类型不能为空",
            trigger: "blur",
            validator: validateRequire
          },
          {
            required: true,
            message: "证据类型不能为空",
            trigger: "change",
            validator: validateRequire
          }
        ],
        evName: [
          { required: true, message: "证据名称不能为空", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "记录人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "记录时间不能为空", trigger: "blur" }
        ],
        recordPlace: [
          { required: true, message: "取证地点不能为空", trigger: "blur" }
        ],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      },
      evTypeOptions: [], //'文书',
      enclosureVisible: false,
      multipleSelection: [],
      formUpload: {
        id: "",
        caseId: "",
        evName: "",
        evType: "",
        status: "",
        fileId: "",
        note: "", //备注
        file: null,
        docId: "",
        category: "",
        userId: "",
        userName:"",//记录人
        recordPlace:"", //取证地址
      },
      handleIndex:0,//附件关联的行
      host:"",
      alreadyAddEvi:[], //已经添加的证据
      // isTrue: false
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  inject: ['reload'],
  methods: {
    router() {
      this.$router.push({
        name: "case_handle_archiveCover"
      });
    },
    byDesc(row,rowIndx) {
        console.log(row);
        let a = JSON.parse(JSON.stringify(this.caseList))
        let temp =  a[rowIndx];
        a[rowIndx] = a[rowIndx+1]
        a[rowIndx+1] = temp;
        this.caseList = a;
        console.log('this.caseList',this.caseList)
    },
    byAsc(row,rowIndx) {
        console.log(row);
        let a = JSON.parse(JSON.stringify(this.caseList))
        let temp =  a[rowIndx];
        a[rowIndx] = a[rowIndx-1]
        a[rowIndx-1] = temp;
        this.caseList = a;
        console.log('this.caseList',this.caseList)
    },
    handleSelectionChange(val) {
      // debugger
      console.log('handleSelectionChange',val);
      this.multipleSelection = val;
    },
    showAddEvidence() {
      this.addEvidenceVisible = !this.addEvidenceVisible;
      if (this.addEvidenceVisible) {
        let _that = this;
        this.$store.dispatch("getDictListDetail", BASIC_DATA_SYS.enTypeId).then(
          res => {
            console.log('证据类型',res.data)
            _that.evTypeOptions = res.data;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    next() {
      if (this.multipleSelection.length > 0) {
        this.enclosureVisible = true;
        this.addEvidenceVisible = false;
      }else{
        this.$message('请选择要关联的附件')
      }
    },
    addEnclosure() {
      if (this.multipleSelection.length > 0) {
        let _that = this;
         let a = JSON.parse(JSON.stringify(this.caseList));
          a.forEach(item=>{
            if(item.num > this.handleIndex+1){
              item.num+this.multipleSelection.length+1
            }
          });
         this.multipleSelection.forEach((item,index)=>{
           let addEviData = {
                 caseBasicInfoId:item.caseId,
                 fid:item.fileId,
                 num:this.handleIndex+index+1,
                 page:1
            }
            a.splice(this.handleIndex+index+1,0,addEviData);
         })


              //  a.splice(this.handleIndex+1,0,addEviData);
               this.caseList = a;
                console.log('this.caseList',this.caseList);
              this.editOrder();
        // this.$store
        //   .dispatch("saveOrUpdateDocCatalogList", this.multipleSelection)
        //   .then(
        //     res => {
        //       _that.archiveCatalogueBox = false;
        //       _that.$message({
        //         type: "success",
        //         message: "绑定成功！"
        //       });
        //     },
        //     error => {
        //       _that.$message({
        //         type: "error",
        //         message: "绑定失败！"
        //       });
        //     }
        //   );
      }
    },
    saveFile(param) {
      console.log(param);
      // this.formUpload = {
      (this.formUpload.file = param.file),
        (this.formUpload.caseId = this.caseId),
        (this.formUpload.docId = BASIC_DATA_SYS.archiveId),
        (this.formUpload.category = "证据"),
        (this.formUpload.userId = iLocalStroage.gets("userInfo").id),
        (this.formUpload.evName = param.file.name);
      // }
    },
    submitForm(formName) {
      let _that = this;
      console.log('_that.formUpload.file',_that.formUpload.file)
      if(!_that.formUpload.file){
        this.$message('请上传附件');
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // _that.addEvidence(_that.uploadForm);
          var fd = new FormData();
          fd.append("file", _that.formUpload.file);
          fd.append("caseId", _that.formUpload.caseId);
          fd.append("docId", _that.formUpload.docId);
          // fd.append("category", _that.formUpload.category);
          fd.append("userId", _that.formUpload.userId);
          fd.append("evName", _that.formUpload.evName);
          fd.append("evType", _that.formUpload.evType);
          fd.append("status", _that.formUpload.status);
          fd.append("note", _that.formUpload.note);
          fd.append("fileId", _that.formUpload.fileId);
          fd.append("id", _that.formUpload.id);
          fd.append("userName", _that.formUpload.userName);
          fd.append("recordPlace", _that.formUpload.recordPlace);

          console.log('上传证据参数recordPlace',fd.get('recordPlace'));
          console.log('上传证据参数userName',fd.get('userName'));

          uploadEvdence(fd).then(
            res => {
              console.log('上传证据',res);
               console.log('上传证据2',res.data);
               let eviData = res.data;
              _that.addEvidenceVisible = false;
              // _that.$refs[formName].reset();
              // this.addEvidence(res.data, param, category, 0)
              // this.formData.payEvidence = res.data;
              // this.formData.payEvidence.push(res.data);
               let a = JSON.parse(JSON.stringify(this.caseList))
               let addEviData = {
                 caseBasicInfoId:eviData.caseId,
                 fid:eviData.id,
                 num:this.handleIndex+2,
                 page:1
               }
               a.forEach(item=>{
                 if(item.num > this.handleIndex){
                   item.num++
                 }
               });
               a.splice(this.handleIndex+1,0,addEviData);
               this.caseList = a;
                console.log('this.caseList',this.caseList);
              this.editOrder();
            },
            error => {
              console.log(error);
            }
          );
        }
      });
    },
    // 添加证据
    addEvidence(data) {
      this.$store.dispatch("saveOrUpdateEvidence", data).then(
        res => {},
        error => {
          console.log(error);
        }
      );
    },
    //点击卷宗目录后 显示卷宗目录
    // showArchiveCatalogue() {
    //   this.$refs.archiveCatalogueRef.showModal(true);
    // },
    // 绑定已有证据材料
    bindEvidence(row) {
      this.relationFileVisible = true;

      // this.$store
      //   .dispatch("getByCondition", {
      //     caseId: this.caseId
      //   })
        findEvidencePicApi({caseId:this.caseId})
        .then(
          res => {
              console.log('证据',res);
            this.evidenceList = res.data;
            // debugger
          },
          err => {
            console.log(err);
          }
        );
    },
    showDialog(row,handleIndex) {
      this.operateVisible = true;
      this.currentDocObj = row;
      this.handleIndex = handleIndex;
    },
    closeDialog() {
      this.operateVisible = false;
    },
    closeDialog1() {
      this.relationFileVisible = false;
    },
    closeAddEvidenceDialog(){
      console.log('清空form')
      this.$refs.evidenceForm.resetFields();
      //清空文件
      this.$refs.uploadEvidenceRef.clearFiles();
      this.addEvidenceVisible = false;
    },
    getByMlCaseId(caseId) {
      this.$store.dispatch("getByMlCaseIdNew", caseId).then(
        res => {
            console.log('文书列表',res)
          res.data = res.data.sort(function(a,b){
            return a.num - b.num;
          });
          res.data.forEach(item=>{
            if(!item.name){
              item.name = item.evName;
            }
          })
          this.caseList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    //修改目录排序
    editOrder(){
        console.log(this.caseList);
        let data = [];
        this.caseList.forEach((item,index)=>{
            let param={
                caseBasicInfoId:item.caseBasicInfoId,
                fid:item.fid,
                id:item.id,
                num:index+1,
                page:item.page
            }
            data.push(param)
        })
        data = data.sort(function(a,b){
          return a.num - b.num;
        });
        let data2={docCatalogFormList:data}
        console.log(data);
        saveOrUpdateDocCatalogList(data).then(res=>{
            console.log(res);
            this.$message( {type: "success",message:'操作成功'})
            this.reload();
        },err=>{
            console.log(err)
        })
    },
    //是否可以选择
    selectable(row,index){
      let alreadyAddEvi = [];
      let disAbleRow = true;
      this.caseList.forEach((item,index)=>{
        if(item.category == '证据') alreadyAddEvi.push(item)
      })
      alreadyAddEvi.forEach(item=>{
        if(item.fid == row.fileId){
          disAbleRow = false;
          return;
        }
      })
      return disAbleRow
    },
    //处理页码
    // currentPages(scope){
    //   let rowIndex = scope.$index;
    //   let tempPage = '';
    //   let qianPage = 0;
    //   let pageStart=0;
    //   let pageEnd=0;
    //   this.caseList.forEach((item,index)=>{
    //     if(rowIndex > index){
    //       qianPage = qianPage + Number(item.page);
    //     }
    //   })
    //   if(scope.row.page>1){
    //     pageStart = qianPage+1;
    //     pageEnd = qianPage+ Number(scope.row.page);
    //     tempPage = pageStart + '~' + pageEnd
    //   }else{
    //     pageStart = qianPage+1;
    //     tempPage = pageStart;
    //   }
    //   return tempPage
    // },

    //删除绑定的证据
    deleteEvidence(row,index){
      console.log('删除绑定的证据',row,index);
      // this.editOrder();
      deleteDocCatalogEvidenApi(row.id).then(res=>{
        this.$message( {type: "success",message:'删除成功'})
        this.reload();
      },err=>{
        console.log(err)
      })
    },
    //新增证据 删除选择的文件
    handleRemoveFile(file,fileList){
      this.formUpload.file = '';
      this.formUpload.evName = '';
    },
    handleExceed(file,fileList){
      this.$message('只能上传一个附件')
    },
  },
  mounted() {
    // console.log(this.caseList);
    this.host = JSON.parse(sessionStorage.getItem("CURRENT_BASE_URL")).PDF_HOST
    this.getByMlCaseId(this.caseId);
  },
  components: {
    caseSlideMenu,
    // archiveCatalogue
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/searchPage.scss";
@import "@/assets/css/documentForm.scss";
@import "@/assets/css/basicStyles/common.scss";

.containerBox{
    .back{
        display: flex;
        cursor: default;
        justify-content: space-between;
        &>span{
            display: inline-block;
            height: 100%;
            width: 100px;
            cursor: pointer;
        }
        &>button{
          height: 30px;
          margin-top: 12px;
        }
    }
}
.archiveCataloguebottom {
  width: 100%;
  background: #f9f9f9;
  height: 85px;
  line-height: 50px;
  text-align: right;
  position: absolute;
  bottom: 0px;
  padding: 20px;
}
.el-drawer__body {
  background: #f5f5f5;
  overflow-y: auto;
}
.el-drawer__header {
  span {
    outline: none;
  }
}
.catalogueDrawerList {
  width: 920px;
  overflow-y: auto;
  height: calc(100%-80px) !important;
  margin: 20px 0px;
  display: block;
  li {
    float: left;
    margin: 20px;
    background: white;
    box-shadow: 0px 1px 5px #f0eff2;
    padding: 20px;
    color: #556281;
    font-size: 14px;
    line-height: 30px;
    img {
      display: block;
      width: 372px;
      height: 200px;
      margin-bottom: 22px;
    }
    .evidenceName {
      font-size: 16px;
      color: #2b313e;
      font-weight: bolder;
    }
    div {
      span {
        width: 170px;
        display: inline-block;
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
.upload-demo .el-upload-dragger {
  height: 360px;
  .el-icon-upload {
    margin: 40% 16px 30px 16px;
  }
}
.el-upload-dragger{
  height: 360px;
}
.relationFileVisibleBox{
  overflow: auto;
  height: calc(100% - 280px);
}
</style>
