<!-------长软------->
<template>
  <div class="com_searchAndpageBoxPadding hasBigMarginRight">
    <div class="searchAndpageBox">
      <div class="handlePart">
        <div class="search">
          <el-form :inline="true" :model="evidenceForm" ref="evidenceForm" label-width="80px">
            <el-form-item>
              <el-button type="primary" icon="add" size="medium" @click="handleAdd" v-show="isMyOrgan">上传备案材料</el-button>
            </el-form-item>
            <el-form-item label="材料名称" prop="evName">
              <el-input v-model="evidenceForm.evName"></el-input>
            </el-form-item>
            <el-form-item label="材料类型" prop="evType">
              <el-select v-model="evidenceForm.evType"  clearable>
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="材料状态" prop="status">
              <el-select v-model="evidenceForm.status" clearable>
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item>
              <el-button type="primary" size="medium" icon="el-icon-search" @click="getEviList">查询</el-button>
              <el-button type="primary" size="medium" @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="tablePartF">
        <el-table :data="tableData" stripe height="100%" >
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="evName" label="材料名称" align="center"></el-table-column>
          <el-table-column prop="evType" label="材料类型" align="center"></el-table-column>
          <el-table-column prop="evPath" label="附件" align="center">
            <template slot-scope="scope">
              <img
                v-if="scope.row.evType =='照片' || scope.row.evType =='音视频'"
                :src="scope.row.myFileUrl"
                width="40"
                height="40"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <!-- <template slot-scope="scope">
              <el-button
                type="text"
                icon="el-icon-edit"
                @click.stop="handleEdit(scope.$index, scope.row)"
                :disabled="caseApproval"
              >编辑
              </el-button>
            </template> -->
            <template slot-scope="scope">
              <el-button type="text" @click="getFileStream(scope.row,scope.row.evPath)">下载
               
              </el-button>
              <el-button @click="deleteEvFile(scope.row.id)" type="text" v-show="isMyOrgan">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paginationF">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          :page-sizes="[10, 20, 30, 40]"
          layout="prev, pager, next,sizes,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加弹出框 -->
    <el-dialog
      title="上传材料"
      :visible.sync="addVisible"
      width="60%"
      v-loading="addLoading"
      :before-close="handleClose"
    >
      <div>
        <div style="float: left;width: 45%;position:relative">
          <el-upload
            class="upload-demo"
            drag
            :http-request="saveFile"
            :file-list="fileList"
            action="https://jsonplaceholder.typicode.cmo/posts/"
            style="position: absolute;left: 0; top: 0;z-index:2"
            :on-change="handleChange"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em>点击上传附件</em>
            </div>
            <!-- <div
              class="el-upload__tip"
              slot="tip"
              style="text-align: center"
            >只能上传jpg/png文件，且不超过500kb
            </div> -->
          </el-upload>
          
           <!-- <video src="../../../../../static/images/压压.mp4" id="myVideo" style="position: absolute;left: 0; top: 0;" controls="controls" width="350px" height="330">your browser does not support the video tag</video> -->
           <video :src="myVideoSrc" id="myVideo" style="position: absolute;left: 0; top: 0;" controls="controls" width="350px" height="330">your browser does not support the video tag</video>
        
        </div>
        <div style="float: right;width: 55%">
          <el-form ref="form" :model="form" :rules="addrules">
            <el-form-item label="材料类型" prop="evType"  label-width="113px">
              <el-select v-model="form.evType" style="width: 100%" :disabled="true">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="材料名称" prop="evName" label-width="113px">
              <el-input v-model="form.evName" placeholder="请输入" disabled></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="userName" label-width="113px">
              <!-- <el-input v-model="form.userName" placeholder="请输入"></el-input> -->
              <el-select v-model="form.userName" prop="userName">
                <el-option v-for="(item,index) in userNameList" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="记录时间" prop="recordTime" label-width="113px">
              <el-date-picker
                v-model="form.recordTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="相关地点" prop="recordPlace" label-width="113px">
              <el-input v-model="form.recordPlace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status" label-width="113px">
              <el-radio-group v-model="form.status">
                <el-radio label="0">有效</el-radio>
                <el-radio label="1">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="note" label-width="113px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="form.note"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 42%">
          <el-button size="medium" type="primary" @click="submitForm('form')">提 交</el-button>
          <el-button size="medium" @click="addVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog
      title="编辑材料"
      :visible.sync="editVisible"
      width="60%"
      v-loading="editLoading"
      :before-close="handleClose"
    >
      <div>
        <div style="float: left;width: 45%">
          <el-form :model="uForm">
         
            <img
              v-if="uForm.evType =='照片'"
              :src="uForm.myFileUrl"
              width="350px"
              height="400"
              align="center"
            />
            <video
              v-if="uForm.evType =='音视频'"
              :src="uForm.videoStreamSrc"
              controls="controls"
              width="350px"
              height="400"
            >your browser does not support the video tag</video>
            <div v-if="uForm.evType=='其他附件'" style="text-align: center;margin-top:100px;">
                <div><i class="el-icon-document" style="font-size:45px;"></i></div>
                <div style="margin: 15px;line-height: 35px">{{uForm.evName}}</div>
            </div>
          </el-form>
        </div>
        <div style="float: right;width: 55%">
          <el-form ref="uForm" :model="uForm" :rules="addrules">
            <el-form-item label="材料类型" prop="evType" label-width="113px">
              <el-select v-model="uForm.evType" style="width: 100%">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="材料名称" prop="evName" label-width="113px">
              <el-input v-model="uForm.evName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="userName" label-width="113px">
              <el-input v-model="uForm.userName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记录时间" prop="recordTime" label-width="113px">
              <el-date-picker
                v-model="uForm.recordTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="相关地点" prop="recordPlace" label-width="113px">
              <el-input v-model="uForm.recordPlace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status" label-width="113px">
              <el-radio-group v-model="uForm.status">
                <el-radio :label="0">有效</el-radio>
                <el-radio :label="1">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="note" label-width="113px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="uForm.note"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 40%">
          <el-button size="medium" type="primary" @click="submitUForm('uForm')">提 交</el-button>
          <el-button size="medium" @click="editVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'lawEnforcementSupervision_caseFileList'"></caseSlideMenu>

    <!-- 材料目录 -->
    <!-- <evidenceCatalogue ref="evidenceCatalogueRef"></evidenceCatalogue> -->

    <!-- <evidenceDetail ref="evidenceDetailRef"></evidenceDetail> -->

    <!-- <evidenceImageDetail ref="evidenceImageDetailRef"></evidenceImageDetail> -->
  </div>
</template>
<script>
  import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
  import {mapGetters} from "vuex";
  // import evidenceCatalogue from "./evidenceCatalogue";
  import {uploadEvApi, findFileByIdApi, uploadEvdence} from "@/api/upload";

  import {getCaseBasicInfoApi,getFileStreamByStorageIdApi,deleteEvFileApi,getEvidenceApi} from "@/api/caseHandle";
  import iLocalStroage from "@/common/js/localStroage.js";
  
  import {uploadLawSupervisionFile,queryFileUploadConditionApi} from "@/api/lawEnforcementSupervision";
  // import evidenceDetail from "./evidenceDetail";
  // import evidenceImageDetail from "./evidenceImageDetail";
  // import {saveOrUpdateEvdencenApi2, } from "@/api/caseHandle";
  // import { getEviByCaseIdApi } from "@api/caseHandle";
  export default {
    data() {
      const isSelect = (rule, value, callback) => {
        if (value == undefined) {
          return callback(new Error("请选择"));
        } else {
          callback();
        }
      };
      return {
        fileList: [],
        evfile: "",
        evTypeOptions: [],
        statusOptions: [],
        value: "",
        //activeName: '1',
        currentPage: 1, //当前页
        pageSize: 10, //pagesize
        total: 0, //总数
        tableData: [],
        srcImgList: [],
        userNameList: [],
        evidenceForm: {
          evName: "",
          evType: "",
          status: ""
        },
        form: {
          id: "",
          caseId: "",
          evName: "",
          evType: "",
          status: "",
          fileId: "",
          remark: "",
          file: null,
          docId: "",
          category: "",
          userId: "",
          recordPlace:'',
          userName:'',
          note:'',
        },
        uForm: {},
        addVisible: false,
        editVisible: false,
        addLoading: false,
        editLoading: false,
        addrules: {
          evType: [
            {
              required: true,
              message: "材料类型不能为空",
              trigger: "change",
              // validator: isSelect
            },
            // {
            //   required: true,
            //   message: "材料类型不能为空",
            //   trigger: "change",
            //   validator: isSelect
            // }
          ],
          status: [{required: true, message: "状态不能为空", trigger: "blur"}]
        },
        videoImgSrc:'',
        myVideoSrc:'',
        isMyOrgan: true,
      };
    },
    computed: {...mapGetters(["caseId",'caseApproval','lawEnforcementSupervisionType'])},
    components: {
      caseSlideMenu,
      // evidenceCatalogue,
      // evidenceDetail,
      // evidenceImageDetail
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            _this.insertEvi();
          }
        });
      },
      submitUForm(formName) {
        let _this = this;
        this.$refs[formName].validate(valid => {
          if (valid) {
            _this.updateEvi();
          }
        });
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
            this.$nextTick(() => {
              this.$refs['form'].resetFields();
              this.fileList = [];
            })
          })
          .catch(_ => {
          });
      },
      handleAdd(index, row) {
        this.form = {};
        this.fileList = [];
        this.addVisible = true;
      },
      handleEdit(index, row) {
        const item = this.tableData[index];
        console.log("编辑材料", item);
        this.uForm = {
          id: item.id,
          caseId: item.caseId,
          evName: item.evName,
          evPath: item.evPath,
          evType: item.evType,
          userName: item.userName,
          recordTime: item.recordTime,
          recordPlace: item.recordPlace,
          status: item.status,
          note: item.note,
        };
        this.editVisible = true;
      },
      //表单筛选
      async getEviList() {
        let data = {
          caseId: this.caseId,
          category:this.lawEnforcementSupervisionType, 
          evName: this.evidenceForm.evName,
          evType: this.evidenceForm.evType,
          status: this.evidenceForm.status,
          current: this.currentPage,
          size: this.pageSize
        };
        console.log("材料目录参数", data);
        // let _this = this;
        // this.$store.dispatch("getEvidence", data).then(res => {
        //   console.log('res',res)
        //   _this.tableData = res.data.records;
        // });
        let getEvidenceRes = await getEvidenceApi(data);
        for(let eviListItem of getEvidenceRes.data.records){
            let getFileStreamRes = '';
            if(eviListItem.evType == '照片'){
                getFileStreamRes = await this.$util.com_getFileStream(eviListItem.evPath)
            }else if(eviListItem.evType == '音视频'){
                getFileStreamRes = await this.$util.com_getFileStream(eviListItem.thumbnailsStoragePath);
                // eviListItem.videoStreamSrc = await this.$util.com_getFileStream(eviListItem.evPath)
            } 
            eviListItem.myFileUrl = getFileStreamRes
        }
        this.tableData = getEvidenceRes.data.records;
      },
      saveFile(param) {
        console.log(param);
        // this.fileList = this.fileList.slice(this.fileList.length-1);
        console.log(this.fileList);
        // this.formUpload = {
        (this.form.file = param.file),
          (this.form.caseId = this.caseId),
          (this.form.docId = "000"),
          (this.form.category = this.lawEnforcementSupervisionType),
          (this.form.userId = iLocalStroage.gets("userInfo").id),
          (this.form.evName = param.file.name);
        // }

        //给材料类型赋值
        let fileType= this.$util.getFileType(param.file.name);
        console.log('给材料类型赋值',fileType);
        this.$set(this.form,'evType')
        if(fileType == 'image'){ //图片
          console.log('是图片呀')
          this.form.evType = '照片'
        }else if(fileType == 'video' || fileType == 'radio'){
          this.form.evType = '音视频'
        }else{
          this.form.evType = '其他附件'
        }
        //生成缩略图
       let  videoURL = null;
       let windowURL = window.URL || window.webkitURL;
       if (param.file && fileType == 'video') {
         videoURL = windowURL.createObjectURL(param.file);
         this.myVideoSrc = videoURL;
         let _this = this;
         setTimeout(function() {
          _this.makeVideoImg();
          }, 500);
       }
      },
      //插入材料表
      insertEvi() {
        var fd = new FormData();
        console.log('this.form',this.form)
        fd.append("file", this.form.file);
        fd.append("caseId", this.form.caseId);
        fd.append("objectId", this.form.docId);
        fd.append("category", this.lawEnforcementSupervisionType);
        fd.append("userId", this.form.userId);
        fd.append("evName", this.form.evName);
        fd.append("evType", this.form.evType);
        fd.append("status", this.form.status);
        fd.append("note", this.form.note ? this.form.note : '');
        fd.append("thumbnail", this.form.thumbnail);
        console.log('fd.get',fd.get('thumbnail'))
        if (!this.form.fileId) {
          this.form.fileId = ''
        }
        fd.append("fileId", this.form.fileId);
        fd.append("userName", this.form.userName ? this.form.userName : '');
        fd.append("recordPlace", this.form.recordPlace ? this.form.recordPlace : '');
        fd.append("recordTime", this.form.recordTime ? this.form.recordTime : '');
        // fd.append("id", this.form.id);

        let _this = this;
        // this.$store.dispatch("saveOrUpdateEvidence", data).then(res => {
        uploadLawSupervisionFile(fd).then(res => {
          console.log("1111111", res);
          if (res.code == 200) {
            _this.$message({
              message: "添加成功！",
              type: "success"
            });
            _this.addVisible = false;
            _this.currentPage = 1;
            _this.getEviList();
          } else {
            _this.$message.error("出现异常，添加失败！");
          }
        });
      },
      //通过switch开关修改状态
      updateEviBySwitch(row) {
        console.log("data", row);
        let data = {
          id: row.id,
          caseId: row.caseId,
          evName: row.evName,
          evType: row.evType,
          userName: row.userName,
          recordTime: row.recordTime ? row.recordTime : '',
          recordPlace: row.recordPlace,
          status: row.status,
          note: row.note
        };
        let _this = this;
        this.$store.dispatch("saveOrUpdateEvidence", data).then(res => {
          if (res.code == 200) {
            // _this.$message({
            //   message: "编辑成功！",
            //   type: "success"
            // });
            _this.editVisible = false;
            _this.currentPage = 1;
            _this.getEviList();
          } else {
            _this.$message.error("出现异常，添加失败！");
          }
        });
      },
      //修改材料
      updateEvi() {
        let data = {
          id: this.uForm.id,
          caseId: this.uForm.caseId,
          evName: this.uForm.evName,
          evType: this.uForm.evType,
          userName: this.uForm.userName,
          recordTime: this.uForm.recordTime ? this.uForm.recordTime : '',
          recordPlace: this.uForm.recordPlace,
          status: this.uForm.status,
          note: this.uForm.note
        };
        let _this = this;
        this.$store.dispatch("saveOrUpdateEvidence", data).then(res => {
          if (res.code == 200) {
            _this.$message({
              message: "编辑成功！",
              type: "success"
            });
            _this.editVisible = false;
            _this.currentPage = 1;
            _this.getEviList();
          } else {
            _this.$message.error("出现异常，添加失败！");
          }
        });
      },
      // 重置
      resetSearch() {
        this.$refs["evidenceForm"].resetFields();
        this.getEviList();
      },

      //更改每页显示的条数
      handleSizeChange(val) {
        this.pageSize = val;
        this.getEviList();
      },
      //更换页码
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getEviList();
      },
      randomString(e) {
        e = e || 32;
        const t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
          a = t.length;
        let res = "";
        for (let i = 0; i < e; i++) {
          res += t.charAt(Math.floor(Math.random() * a));
        }
        return res;
      },
      formatDateStr(val) {
        if (val == null) {
          return null;
        }
        let date = new Date(val);
        let Y = date.getFullYear() + "-";
        let M =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1) + "-"
            : date.getMonth() + 1 + "-";
        let D =
          date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
        // let h =
        //   date.getHours() < 10
        //     ? "0" + date.getHours() + ":"
        //     : date.getHours() + ":";
        // let m =
        //   date.getMinutes() < 10
        //     ? "0" + date.getMinutes() + ":"
        //     : date.getMinutes() + ":";
        // let s =
        //   date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // return Y + M + D + h + m + s;
        return Y + M + D;
      },
      //鼠标hover材料目录后 显示材料目录
      showEvidenceCatalogue() {
        this.$refs.evidenceCatalogueRef.showModal();
      },
      fileChange(file) {
        console.log(file);
        this.evfile = file.raw;
      },
      //显示材料详情
      // evidenceDetail(row) {
      //   console.log("材料详情", row)
      //   this.$refs.evidenceDetailRef.showModal(row);
      // },
      imgDetail(row) {
        this.$refs.evidenceImageDetailRef.showModal(row);
      },
      //查询记录人列表
      findUserNameList() {
        let data = {
          id: this.caseId
        }
        getCaseBasicInfoApi(data).then(res => {
          if (res.code == 200) {
            console.log("1456", res);
            this.userNameList = res.data.staff.split(',');
            console.log("this.userNameList", this.userNameList);
            //上级机构查询时，不可以上传和删除
            if(res.data.organId != iLocalStroage.gets('userInfo').organId){
              this.isMyOrgan = false
            }
          } else {
            console.log("fail");
          }
        });
      },
      //生成视频缩略图
      makeVideoImg(){
        const video = document.getElementById('myVideo');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const imgHeight = video.videoHeight;
        const imgWidth = video.videoWidth;
        ctx.drawImage(video, 0, 0, imgWidth*0.2, imgHeight*0.2);
        let imgSrc = canvas.toDataURL('image/png');
        console.log('缩略图',imgSrc);
        let blob = this.dataURLtoBlob(imgSrc, "image/png");
        let file = new File([blob], "video_image.png", { type: "image/png", lastModified: Date.now() })//blob转file
        this.videoImgSrc = imgSrc;
        this.form.thumbnail = file;
      },
      dataURLtoBlob(dataURI,type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type:type});
      },
      //根据stroagId请求文件流
    getFileStream(data,storageId) {
      //设置地址
      // this.$store.commit("setDocPdfStorageId", storageId);
      getFileStreamByStorageIdApi(storageId)
        .then((res) => {
          console.log(res);
          this.getObjectURL(data,res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 将返回的流数据转换为url
    getObjectURL(data,file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {}
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {}
      }
      console.log(url);
      // this.pdfUrl = url; 
      // return url;
      this.downFile(data,url);
    },
      //下载
      downFile(data,url){
        var eleLink = document.createElement('a');
        eleLink.download = data.evName;
        eleLink.style.display = 'none';
        eleLink.href = url;
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
      },
      //删除
      deleteEvFile(id){
        deleteEvFileApi(id).then(res=>{
          this.$message({ type: "success", message: "删除成功!"});
          this.getEviList();
        }).catch(err=>{throw new Error(err)})
      },
      handleChange(file, fileList) {
          if (fileList.length > 0) {
              this.fileList = [fileList[fileList.length - 1]]  
          }
      },
    },
    created() {
      this.getEviList();
      this.findUserNameList();
      let _this = this;
      //初始化代码集
      this.$store
        .dispatch("getDictionary", "574a5a05d004e32fe5d7f73c4b6a22ef")
        .then(res => {
          for (let item of res.data) {
            _this.evTypeOptions.push({value: item.name, label: item.notes});
          }
          console.log(' _this.evTypeOptions', _this.evTypeOptions)
        });
      this.$store
        .dispatch("getDictionary", "02204fe639c86edbae51e3dfccad36d9")
        .then(res => {
          for (let item of res.data) {
            _this.statusOptions.push({value: item.name, label: item.notes});
          }
        });
    }
  };
</script>
<style lang="scss" src="@/assets/css/systemManage.scss"></style>
<style lang="scss">
 /*  @import "@/assets/css/systemManage.scss"; */

  .paginationF {
    position: absolute;
    bottom: 10px;
    right: 20px;
    margin: auto;
    text-align: center;
  }

  .tablePartF {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 4%;
  }

  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 360px;
    height: 330px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .fullscreen {
    .hasBigMarginRight {
      margin-right: 65px;
    }
  }
</style>
