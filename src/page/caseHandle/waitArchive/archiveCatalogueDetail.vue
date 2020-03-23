<template>
  <div class="containerBox box searchPage">
    <div class="back" @click="router">
      <i class="el-icon-arrow-left"></i>返回
    </div>
    <div class="tablePart">
      <el-table :data="caseList" border stripe highlight-current-row style="width: 100%">
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="文书名称" align="center"></el-table-column>
        <el-table-column prop="page" label="起止页数" align="center"></el-table-column>
        <el-table-column label="顺序调整" align="center">
          <template>
            <div>
              <span @click="byDesc" class="iconfont law-desc blueC"></span>
              <span @click="byAsc" class="iconfont law-asc blueC"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="附件关联" align="center">
          <template slot-scope="scope">
            <span @click="showDialog(scope.row)" class="iconfont law-add blueC"></span>
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
        <div style="float: left;width: 370px">
          <el-upload
            class="upload-demo"
            drag
            :http-request="saveFile"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em>点击上传附件</em>
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
              style="text-align: center"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div style="float:left;width:300px">
          <el-form ref="evidenceForm" :model="formUpload" :rules="addrules" label-width="100px">
            <el-form-item label="证据类型" prop="enType">
              <el-select v-model="formUpload.enType">
                <el-option
                  v-for="item in evTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证据名称" prop="evName">
              <el-input v-model="formUpload.evName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="记 录 人" prop="recordName">
              <el-input v-model="formUpload.recordName" placeholder="请输入"></el-input>
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
            <el-form-item label="取证地点" prop="evPlace">
              <el-input v-model="formUpload.evPlace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="状  态" prop="status">
              <el-radio-group v-model="formUpload.status">
                <el-radio label="0">有效</el-radio>
                <el-radio label="1">无效</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备  注" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入"
                v-model="formUpload.remark"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="clear:both;text-align:center">
          <el-button size="medium" type="primary" @click="submitForm('evidenceForm')">提 交</el-button>
          <el-button size="medium" @click="addEvidenceVisible=false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="附件关联"
      :visible.sync="relationFileVisible"
      @close="closeDialog1"
      custom-class="dialog1 fullscreen"
      :close-on-click-modal="false"
      width="1000px"
      append-to-body
    >
      <div style="position:relative;">
        <div class>
          <el-table
            :data="evidenceList"
            border
            stripe
            highlight-current-row
            @selection-change="handleSelectionChange"
            style="width: 100%"
          >
            <el-table-column width="55" type="selection" label="选择" align="center"></el-table-column>
            <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="evName" label="证据名称" align="center"></el-table-column>
            <el-table-column prop="evType" label="证据类型" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center"></el-table-column>
            <el-table-column label="详情" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.evPath}}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" align="center"></el-table-column>
          </el-table>
        </div>
        <div style="text-align:right;margin-top:17px">
          <el-button size="medium" type="primary" @click="relationFileVisible=false">取消</el-button>
          <el-button size="medium" class="greenBg2" @click="next">确认</el-button>
        </div>
      </div>
    </el-dialog>
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
          <img :src="'./static/images/img/temp/tempImg.jpg'" />
          <div class="evidenceName">{{item.evName}}</div>
          <div>
            <span>
              <i class="el-icon-user"></i>
              {{item.userId}}
            </span>
            <span>
              <i class="el-icon-time"></i>
              {{item.createTime}}
            </span>
          </div>
          <div>
            <i class="el-icon-location-outline"></i>
            {{item.evPath}}
          </div>
        </li>
      </ul>
      <div class="archiveCataloguebottom">
        <el-button size="medium" type="primary" @click="enclosureVisible=false">继续添加</el-button>
        <el-button size="medium" class="greenBg2" @click="addEnclosure">确认</el-button>
      </div>
    </el-drawer>
    <!--快速入口 -->
    <caseSlideMenu :activeIndex="'archiveCatalogue'" @showArchiveCatalogue="showArchiveCatalogue"></caseSlideMenu>
    <!-- 卷宗目录 -->
    <archiveCatalogue ref="archiveCatalogueRef"></archiveCatalogue>
  </div>
</template>
<script>
import archiveCatalogue from "./archiveCatalogue";
import caseSlideMenu from "@/page/caseHandle/components/caseSlideMenu";
import { uploadEvApi, findFileByIdApi, uploadEvdence } from "@/api/upload";
import iLocalStroage from "@/common/js/localStroage.js";
import { validateRequire } from "@/common/js/validator.js";
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import { mapGetters } from "vuex";
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
        recordName: [
          { required: true, message: "记录人不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "记录时间不能为空", trigger: "blur" }
        ],
        evPlace: [
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
        remark: "",
        file: null,
        docId: "",
        category: "",
        userId: ""
      }
      // isTrue: false
    };
  },
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    router() {
      this.$router.push({
        name: "archiveCover"
      });
    },
    byDesc() {
      this.$message({
        type: "error",
        message: "该功能暂未实现！"
      });
    },
    byAsc() {
      this.$message({
        type: "success",
        message: "该功能暂未实现！"
      });
    },
    handleSelectionChange(val) {
      // debugger
      this.multipleSelection = val;
    },
    showAddEvidence() {
      this.addEvidenceVisible = !this.addEvidenceVisible;
      if (this.addEvidenceVisible) {
        let _that = this;
        this.$store.dispatch("getDictListDetail", BASIC_DATA_SYS.enTypeId).then(
          res => {
            _that.evTypeOptions = res.data;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    next() {
      this.enclosureVisible = true;
      this.addEvidenceVisible = false;
      // this.operateVisible = false
    },
    addEnclosure() {
      if (this.multipleSelection.length > 0) {
        let _that = this;
        this.$store
          .dispatch("saveOrUpdateDocCatalogList", this.multipleSelection)
          .then(
            res => {
              _that.archiveCatalogueBox = false;
              _that.$message({
                type: "success",
                message: "绑定成功！"
              });
            },
            error => {
              _that.$message({
                type: "error",
                message: "绑定失败！"
              });
            }
          );
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          // _that.addEvidence(_that.uploadForm);
          var fd = new FormData();
          fd.append("file", _that.formUpload.file);
          fd.append("caseId", _that.formUpload.caseId);
          fd.append("docId", _that.formUpload.docId);
          fd.append("category", _that.formUpload.category);
          fd.append("userId", _that.formUpload.userId);
          fd.append("evName", _that.formUpload.evName);
          fd.append("evType", _that.formUpload.evType);
          fd.append("status", _that.formUpload.status);
          fd.append("remark", _that.formUpload.remark);
          fd.append("fileId", _that.formUpload.fileId);
          fd.append("id", _that.formUpload.id);

          uploadEvdence(fd).then(
            res => {
              _that.addEvidenceVisible = false;
              _that.$refs[formName].reset();
              // this.addEvidence(res.data, param, category, 0)
              // this.formData.payEvidence = res.data;
              // this.formData.payEvidence.push(res.data);
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
    showArchiveCatalogue() {
      this.$refs.archiveCatalogueRef.showModal();
    },
    // 绑定已有证据材料
    bindEvidence(row) {
      this.relationFileVisible = true;

      this.$store
        .dispatch("getByCondition", {
          caseId: this.currentDocObj.caseId
        })
        .then(
          res => {
            this.evidenceList = res.data.records;
            // debugger
          },
          err => {
            console.log(err);
          }
        );
    },
    showDialog(row) {
      this.operateVisible = true;
      this.currentDocObj = row;
    },
    closeDialog() {
      this.operateVisible = false;
    },
    closeDialog1() {
      this.relationFileVisible = false;
    },
    getByMlCaseId(caseId) {
      this.$store.dispatch("getByMlCaseIdNew", caseId).then(
        res => {
          this.caseList = res.data;
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    // console.log(this.caseList);
    this.getByMlCaseId(this.caseId);
  },
  components: {
    caseSlideMenu,
    archiveCatalogue
  }
};
</script>
<style src="@/assets/css/searchPage.scss" lang="scss" scoped></style>
<style lang="scss" scoped>
@import "@/assets/css/documentForm.scss";
@import "@/assets/css/basicStyles/common.scss";
</style>
<style lang="scss" >
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
</style>
