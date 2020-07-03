<template>
  <el-dialog
    class="add-question-dialog"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="55%"
  >
    <el-form
      :inline="true"
      :model="addMaintainQuestionForm"
      :rules="rules"
      label-position="right"
      label-width="100px"
      ref="addMaintainQuestionFormRef"
      v-loading="tableLoading"
      element-loading-spinner="car-loading"
      element-loading-text="正在获取试题信息"
    >
      <el-row>
        <el-form-item label="题型" label-width="55px" prop="questionType">
          <el-select
            v-model="addMaintainQuestionForm.questionType"
            placeholder="选择题型"
            remote
            @change="changeType($event)"
          >
            <el-option
              v-for="value in questionTypeList"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="难度" prop="questionLevel">
          <el-select
            v-model="addMaintainQuestionForm.questionLevel"
            placeholder="选择难度"
            @change="selectVal($event)"
          >
            <el-option
              v-for="value in levelList"
              :key="value.id"
              :label="value.name"
              :value="value.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label class="form-class">
          <span class="pop-title">题干</span>
          <span>请在下方输入题目描述</span>
        </el-form-item>
      </el-row>
      <div class="problem-title">
        <div
          class="title-cnt w-60"
          :class="{'discuss': questionTypeName === '简答题' || questionTypeName === '论述题'}"
        >
          <el-form-item prop="questionName">
            <el-input
              type="textarea"
              :rows="5"
              cols="100%"
              placeholder="请输入内容"
              v-model="addMaintainQuestionForm.questionName"
            ></el-input>
          </el-form-item>
        </div>
        <div
          v-if="questionTypeName !== '简答题' && questionTypeName !== '论述题'"
          class="title-cnt"
          :class="{'w-40': questionTypeName !== '简答题' && questionTypeName !== '论述题'}"
        >
          <el-form-item>
            <div v-if="descImages.length" class="upload-question-img stem">
              <ul class="el-upload-list el-upload-list--picture-card">
                <li
                  v-for="item in descImages"
                  :key="item.uid"
                  tabindex="0"
                  class="el-upload-list__item is-ready"
                >
                  <img :src="item.url" class="el-upload-list__item-thumbnail" />
                  <span class="el-upload-list__item-actions">
                    <span
                      class="el-upload-list__item-preview"
                      @click="handlePictureCardPreview(item.url)"
                    >
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span class="el-upload-list__item-delete" @click="deleteDescImg">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <el-upload
              v-else
              action
              class="upload-question-img stem"
              list-type="picture-card"
              accept=".jpg, .png"
              :auto-upload="false"
              :file-list="descImages"
              :on-change="handleDescImgChange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </div>
      </div>
      <el-row
        v-if="questionTypeName !== '' && questionTypeName !== '简答题' && questionTypeName !== '论述题'"
      >
        <!-- 单选||多选||判断题，添加选项 -->
        <el-row>
          <el-form-item label class="form-class">
            <span class="pop-title">选项</span>
            <span>{{ questionTypeDesc }}</span>
          </el-form-item>
        </el-row>
        <el-table class="option-table" :data="addMaintainQuestionForm.pqoList" key="0">
          <el-table-column min-width="12%" prop="optionNum">
            <template slot-scope="scope">
              <el-radio
                v-if="questionTypeName === '单选题' || questionTypeName === '判断题'"
                name="redorName"
                v-model="radioChecked"
                :label="scope.$index"
                @change="changeSelect(scope.row,'1')"
              >答案：{{ addMaintainQuestionForm.pqoList[scope.$index].optionNum }}</el-radio>
              <el-checkbox
                v-if="questionTypeName === '多选题'"
                v-model="scope.row.checked"
                @change="changeSelect(scope.row,'2')"
              >答案：{{ addMaintainQuestionForm.pqoList[scope.$index].optionNum }}</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column id="ceshiId" min-width="48%" prop="optionName">
            <template slot-scope="scope">
              <el-input
                type="textarea"
                :rows="4"
                placeholder
                v-model="addMaintainQuestionForm.pqoList[scope.$index].optionName"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column min-width="22%">
            <template slot-scope="scope">
              <div
                v-if="scope.row.optionPicture"
                class="upload-question-img stem"
                :key="scope.$index"
              >
                <ul class="el-upload-list el-upload-list--picture-card" style="display:block;">
                  <li class="el-upload-list__item is-ready">
                    <img :src="scope.row.optionPicture" class="el-upload-list__item-thumbnail" />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(scope.row.optionPicture)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        class="el-upload-list__item-delete"
                        @click="deleteOptionImg(scope.$index)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              <el-upload
                v-if="!scope.row.optionPicture"
                action
                class="upload-question-img stem"
                list-type="picture-card"
                accept=".jpg, .png"
                :auto-upload="false"
                :on-change="(file, fileList) => {handleOptionImgChange(file, fileList, scope.$index)}"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </template>
          </el-table-column>

          <el-table-column min-width="18%">
            <template slot-scope="scope">
              <el-button
                type="text"
                :disabled="scope.$index === 0"
                @click="upRemove(scope.$index,scope.row)"
              >上移</el-button>
              <el-button
                type="text"
                :disabled="scope.$index === (addMaintainQuestionForm.pqoList.length - 1)"
                @click="downRemove(scope.$index)"
              >下移</el-button>
              <el-button type="text" @click="delet(scope.row, scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin-bottom: 20px;text-align:center;">
          <el-button type="button" @click="add" icon="el-icon-plus" style="width:200px;">添加选项</el-button>
        </el-row>
      </el-row>
      <div v-if="questionTypeName === '简答题' || questionTypeName === '论述题'">
        <el-row id="answerId">
          <el-form-item label class="form-class">
            <span class="pop-title">答案</span>
            <span>下方填写该问题对应的答案解释</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="question-analy" prop="answer">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入答案"
              v-model="addMaintainQuestionForm.answer"
            ></el-input>
          </el-form-item>
        </el-row>
      </div>
      <el-row id="answerId">
        <el-form-item label class="form-class">
          <span class="pop-title">解析</span>
          <span>下方填写该问题对应的答案解释</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item class="question-analy">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addMaintainQuestionForm.questionAnalysis"
          ></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="checkForm">保 存</el-button>
    </div>
    <el-dialog title="预览图片" :visible.sync="dialogVisible" append-to-body>
      <img width="10%" :src="dialogImageUrl" alt :span="4" />
    </el-dialog>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
      // data: [],
      checked: true,
      relyonTable: [],
      isDisabled: true,
      visible: false,
      addMaintainQuestionForm: {
        pqoList: [],
        outlineId: "",
        outlineName: "",
        questionId: "",
        questionName: "",
        questionAnalysis: "",
        questionType: "",
        questionLevel: "",
        answer: ""
      },
      rules: {
        questionType: [
          { required: true, message: "请选择题型", trigger: "change" }
        ],
        questionLevel: [
          { required: true, message: "请选择难度", trigger: "change" }
        ],
        questionName: [
          { required: true, message: "请输入题干", trigger: "blur" }
        ],
        questionAnalysis: [
          { required: true, message: "请输入答案解析", trigger: "blur" }
        ],
        answer: [{ required: true, message: "请输入答案", trigger: "blur" }]
      },
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: "0", //添加 0  修改2  查看3
      questionTypeName: "", //题型名称
      questionTypeList: [], //问题类型列表
      levelList: [], //题目难度列表
      dialogImageUrl: "",
      dialogVisible: false,
      radioChecked: null,
      descImages: [], // 问题描述图片
      questionTypeMap: ["单选题", "多选题", "判断题", "简答题", "论述题"], // 试题类型集合
      tableLoading: false,
      optionImages: [] // 问题选项图片
    };
  },
  computed: {
    questionTypeDesc() {
      let desc = "";
      switch (this.questionTypeName) {
        case "单选题":
          desc = "单选题的选项范围从2到20,并在左侧选择一个为正确答案";
          break;
        case "多选题":
          desc = "多选题的选项范围从2到20,并在左侧选择多个为正确答案";
          break;
        case "判断题":
          desc = "判断题的选项范围为两个,并在左侧选择一个为正确答案";
          break;
      }
      return desc;
    },
    baseUrl() {
      return iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST;
    }
  },
  created() {
    this.getDictInfo("考试-试题类型", "questionTypeList");
    this.getDictInfo("考试-试题难度", "levelList");
  },
  methods: {
    selectVal(event) {
      this.addMaintainQuestionForm.questionLevel = event;
    },
    changeSelect(row, type) {
      let _this = this;
      _this.showType = type;
      if (type == "1") {
        _this.addMaintainQuestionForm.pqoList.forEach((item, index) => {
          item.optionKey = index === this.radioChecked ? "1" : "0";
          item.checked = index === this.radioChecked;
        });
      } else {
        _this.addMaintainQuestionForm.pqoList.forEach(item => {
          if (item.optionNum == row.optionNum) {
            if (item.optionKey == undefined || item.optionKey == "0") {
              item.optionKey = "1";
              item.checked = true;
            } else if (item.optionKey == "1") {
              item.optionKey = "0";
              item.checked = false;
            }
          }
        });
      }
    },
    // 图片预览
    handlePictureCardPreview(fileUrl) {
      this.dialogImageUrl = fileUrl;
      this.dialogVisible = true;
    },
    // 删除题目图片
    deleteDescImg() {
      this.descImages.splice(0, 1);
    },
    // 问题描述图片上传
    handleDescImgChange(file, fileList) {
      const isGt2M = this.checkImageSize(file);
      if (isGt2M) {
        fileList.splice(0, 1);
        this.descImages.splice(0, 1);
      } else {
        fileList.splice(0, fileList.length);
        this.descImages.splice(0, 1, file);
      }
    },
    // 问题选项图片上传
    handleOptionImgChange(file, fileList, index) {
      const isGt2M = this.checkImageSize(file);
      const fileIndex = this.optionImages.findIndex(
        item => item.uid === file.uid
      );
      const row = JSON.parse(
        JSON.stringify(this.addMaintainQuestionForm.pqoList[index])
      );
      fileList.splice(0, fileList.length);
      if (isGt2M) {
        fileList.splice(fileIndex, 1);
      } else {
        row.optionPicture = file.url;
        row["file"] = file;
        this.$set(this.addMaintainQuestionForm.pqoList, index, row);
      }
    },
    // 删除选项图片
    deleteOptionImg(index) {
      const item = this.addMaintainQuestionForm.pqoList[index];
      if(item.file){
        if(item.file.status === 'success'){
          const imgId = item.file.url.replace(this.baseUrl, '');
          this.deleteImage(imgId, 'option', index, 'isUpload');
        }else{
          this.addMaintainQuestionForm.pqoList[index].optionPicture = "";
          this.addMaintainQuestionForm.pqoList[index]["file"] = null;
        }
      }
    },
    // 图片大小校验
    checkImageSize(img) {
      const isGt2M = img.size / 1024 / 1024 > 2;
      if (isGt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning"
        });
        return true;
      } else {
        return false;
      }
    },
    // 选择题型
    changeType(clearPqoList) {
      let id = this.addMaintainQuestionForm.questionType;
      const currentIndex = this.questionTypeList.findIndex(
        item => item.id === id
      );
      this.questionTypeName = this.questionTypeList[currentIndex].name;
      const pqoListLen = this.addMaintainQuestionForm.pqoList.length;
      if (pqoListLen && !clearPqoList) {
        this.radioChecked = null;
        this.addMaintainQuestionForm.pqoList.splice(0, pqoListLen);
      }
      if (this.questionTypeMap.indexOf(this.questionTypeName) < 3) {
        this.addMaintainQuestionForm.answer = "";
      }
    },
    // 查询字典-获取试题类型&试题难度
    getDictInfo(name, codeName) {
      if (!this[codeName].length) {
        this.$store.dispatch("findAllDrawerByName", name).then(
          //查询执法领域
          res => {
            if (res.code === 200) {
              this[codeName] = res.data;
            } else {
              console.info("没有查询到数据");
            }
          }
        );
      }
    },
    // 添加选项
    add() {
      let id = this.addMaintainQuestionForm.questionType;
      if (this.questionTypeName == "判断题") {
        if (this.addMaintainQuestionForm.pqoList.length > 1) {
          this.$message({ type: "warning", message: "您不能添加更多的选项！" });
        } else {
          let name = this.getChecked(
            this.addMaintainQuestionForm.pqoList.length
          );
          this.addMaintainQuestionForm.pqoList.push({
            optionNum: name,
            questionId: this.addMaintainQuestionForm.questionId,
            checked: false
          });
        }
      } else {
        if (this.addMaintainQuestionForm.pqoList.length > 7) {
          this.$message({ type: "warning", message: "您不能添加更多的选项！" });
        } else {
          let name = this.getChecked(
            this.addMaintainQuestionForm.pqoList.length
          );
          this.addMaintainQuestionForm.pqoList.push({
            optionNum: name,
            questionId: this.addMaintainQuestionForm.questionId,
            checked: false
          });
        }
      }
    },
    //获取选项
    getChecked(val) {
      const optionVal = ["A", "B", "C", "D", "E", "F", "G", "H"];
      return optionVal[val];
    },
    //删除
    delet(row, index) {
      this.addMaintainQuestionForm.pqoList.splice(index, 1);
      this.updatChecked();
      if(row.optionPicture && row.optionPicture.indexOf(this.baseUrl) > -1){
        const deleteId = row.optionPicture.replace(this.baseUrl, '');
        this.deleteImage(deleteId, 'option', index, 'upload');
      }
    },
    //修改选项
    updatChecked() {
      for (let i = 0; i < this.addMaintainQuestionForm.pqoList.length; i++) {
        this.addMaintainQuestionForm.pqoList[i].optionNum = this.getChecked(i);
      }
    },
    //上移
    upRemove(index, row) {
      let _this = this;
      if (index > 0) {
        let rowDate = _this.addMaintainQuestionForm.pqoList[index - 1];
        _this.addMaintainQuestionForm.pqoList.splice(index - 1, 1);
        _this.addMaintainQuestionForm.pqoList.splice(index, 0, rowDate);
      } else {
        _this.$message({
          type: "warning",
          message: "已经是第一条了，不可以上移"
        });
      }
      this.updatChecked();
    },
    //下移
    downRemove(index, row) {
      let _this = this;
      if (index + 1 === _this.addMaintainQuestionForm.pqoList.length) {
        _this.$message({
          type: "warning",
          message: "已经是最后一条了，不可以下移"
        });
      } else {
        let rowDate = _this.addMaintainQuestionForm.pqoList[index + 1];
        _this.addMaintainQuestionForm.pqoList.splice(index + 1, 1);
        _this.addMaintainQuestionForm.pqoList.splice(index, 0, rowDate);
      }
      this.updatChecked();
    },
    // 新增试题表单校验
    checkForm() {
      this.$refs.addMaintainQuestionFormRef.validate(valid => {
        if (valid) {
          let warningMsg = "";
          // 单选，多选，判断必须添加选项并选择正确答案
          if (this.questionTypeMap.indexOf(this.questionTypeName) < 3) {
            if (this.addMaintainQuestionForm.pqoList.length === 0) {
              warningMsg = "请添加题目选项";
            } else {
              const answer = this.addMaintainQuestionForm.pqoList.filter(
                item => item.optionKey == 1
              );
              if (answer.length === 0) {
                warningMsg = "请选择正确答案";
              }
            }
          }
          if (warningMsg) {
            this.$message({ type: "warning", message: warningMsg });
            return false;
          } else {
            this.submit();
          }
        } else {
          return false;
        }
      });
    },
    // 保存试题信息
    saveQuestionInfo(loading, deleteImg) {
      let saveData = {
        questionId: this.addMaintainQuestionForm.questionId,
        pqoList: JSON.stringify(this.addMaintainQuestionForm.pqoList),
        outlineId: this.addMaintainQuestionForm.outlineId,
        outlineName: this.addMaintainQuestionForm.outlineName,
        questionName: this.addMaintainQuestionForm.questionName,
        questionAnalysis: this.addMaintainQuestionForm.questionAnalysis,
        questionType: this.addMaintainQuestionForm.questionType,
        questionLevel: this.addMaintainQuestionForm.questionLevel,
        answer: this.addMaintainQuestionForm.answer
      };
      if(this.addMaintainQuestionForm.questionPicture){
        saveData.questionPicture = this.addMaintainQuestionForm.questionPicture.replace(this.baseUrl, '');
      }
      let dispatchType = "addExamQuestionInfo",
        successMsg = "添加成功!";
      if (this.handelType == "1") {
        dispatchType = "addExamQuestionInfo";
        successMsg = "添加成功!";
      } else if (this.handelType == "2") {
        dispatchType = "updateExamQuestionInfo";
        successMsg = "修改成功!";
      }
      // 发起ajax请求
      if (dispatchType) {
        this.$store.dispatch(dispatchType, saveData).then(
          res => {
            loading.close();
            this.$message({ type: "success", message: successMsg });
            if(!deleteImg){
              this.$emit("getAllQuestion");
              this.closeDialog();
            }
          },
          err => {
            loading.close();
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
      }
    },
    // 提交
    submit() {
      const loading = this.$loading({
        lock: true,
        text: "正在保存",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      const formData = new FormData();
      const changeIndex = [];
      const hasQuestionPic = this.descImages.length && this.descImages[0].status === 'ready';
      if (
        this.addMaintainQuestionForm.pqoList &&
        this.addMaintainQuestionForm.pqoList.length
      ) {
        this.addMaintainQuestionForm.pqoList.forEach((item, index) => {
          if (item.file && item.file.status === "ready") {
            formData.append("file", item.file.raw);
            changeIndex.push(index);
          }
          if(item.optionPicture){
            item.optionPicture = item.optionPicture.replace(this.baseUrl, '');
          }
        });
        if(hasQuestionPic){
          formData.append("file", this.descImages[0].raw);
        }
      }
      if (changeIndex.length || hasQuestionPic) {
        this.$store.dispatch("uploadMaterial", formData).then(
          res => {
            if (res.code === 200) {
              changeIndex.forEach((item, index) => {
                this.addMaintainQuestionForm.pqoList[item].optionPicture = res.data[index].storageId;
                delete this.addMaintainQuestionForm.pqoList[item].file;
              })
            }
            if(hasQuestionPic){
              this.addMaintainQuestionForm.questionPicture = res.data[res.data.length - 1].storageId;
            }
            this.saveQuestionInfo(loading);
          },
          err => {
            loading.close();
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
      }else{
        this.saveQuestionInfo(loading);
      }
    },
    showModal(row, type) {
      this.visible = true;
      this.handelType = type;
      this.tableLoading = false;
      this.radioChecked = null;
      this.descImages.splice(0, this.descImages.length);
      if (type == "1") {
        // 新增
        this.addMaintainQuestionForm.outlineId = row.currentOutlineId;
        this.addMaintainQuestionForm.outlineName = row.selectCurrentTreeName;
        this.dialogTitle = "新增试题";
      } else if (type == "2") {
        // 修改
        this.tableLoading = true;
        this.dialogTitle = "修改试题";
        this.addMaintainQuestionForm.questionId = row;
        //查询所修改的试题数据
        this.$store.dispatch("selectExamQuestionInfo", row).then(
          res => {
            this.tableLoading = false;
            if (res.code === 200) {
              if (res.data.pqoList && res.data.pqoList.length) {
                res.data.pqoList.forEach((item, index) => {
                  item.checked = item.optionKey === "1";
                  if (
                    res.data.questionTypeName === "单选题" ||
                    res.data.questionTypeName === "判断题"
                  ) {
                    if (item.optionKey === "1") {
                      this.radioChecked = index;
                    }
                  }
                });
              }
              this.setDefaultImage(res.data);
              for (const key in this.addMaintainQuestionForm) {
                if (key !== "questionId") {
                  this.addMaintainQuestionForm[key] = res.data[key];
                }
              }
              this.changeType(true);
            }
          },
          err => {
            this.tableLoading = false;
            this.$message({ type: "error", message: err.msg || "" });
          }
        );
      }
    },
    // 处理选项图片回显
    setDefaultImage(data) {
      if (data.questionPicture) {
        data.questionPicture = this.baseUrl + data.questionPicture;
        this.descImages.push({ url: data.questionPicture, status: "success" });
      }
      if (data.pqoList && data.pqoList.length) {
        data.pqoList.forEach(item => {
          if(item.optionPicture){
            if(item.optionPicture.indexOf(this.baseUrl) === -1){
              item.optionPicture = this.baseUrl + item.optionPicture
            }
          }
          item.file = { url: item.optionPicture, status: 'success' }
        });
      }
    },
    // 删除已上传的图片
    deleteImage(id, type, index, isUpload){
      const loading = this.$loading({
        lock: true,
        text: "正在删除",
        spinner: "car-loading",
        customClass: "loading-box",
        background: "rgba(234,237,244, 0.8)"
      });
      this.$store.dispatch('deleteQuestionImage', { storageId: id }).then(res => {
        if(!isUpload){ loading.close(); }
        if(res.code === 200){
          if(type === 'title'){
            this.deleteDescImg();
            this.$message({ type: 'success', message: '删除成功' });
            return
          }
          if(type === 'option' && this.addMaintainQuestionForm.pqoList[index]){
            this.addMaintainQuestionForm.pqoList[index].optionPicture = "";
            this.addMaintainQuestionForm.pqoList[index]["file"] = null;
            this.$message({ type: 'success', message: '删除成功' });
          }
          if(isUpload){
            this.saveQuestionInfo(loading, 'deleteImg');
          }
        }
      }, err => {
        loading.close();
        this.$message({ type: 'error', message: err.msg || '' });
      });
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.$refs["addMaintainQuestionFormRef"].resetFields();
      this.questionTypeName = "";
      const pqoListLen = this.addMaintainQuestionForm["pqoList"].length;
      for (const key in this.addMaintainQuestionForm) {
        if (key !== "pqoList") {
          this.addMaintainQuestionForm[key] = "";
        } else if (pqoListLen) {
          this.addMaintainQuestionForm["pqoList"].splice(0, pqoListLen);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-question-dialog {
  .problem-title {
    .title-cnt {
      display: inline-block;
      &.w-60 {
        padding-right: 14px;
        box-sizing: border-box;
        width: 60%;
      }
      &.w-40 {
        width: 38%;
      }
      &.discuss {
        padding-right: 0;
        width: 100%;
      }
      >>> .el-form-item,
      >>> .el-form-item__content {
        width: 100%;
      }
    }
  }
  .el-upload-list {
    line-height: 0;
    display: inline-block;
    .el-upload-list__item {
      margin-bottom: 0;
      line-height: 0;
    }
  }
}
.el-textarea__inner {
  display: block;
  resize: vertical;
  padding: 5px 15px;
  line-height: 1.5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 500px;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.pop-title {
  display: inline-block;
  line-height: 1;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  font-weight: 500;
  padding: 7px 14px;
  font-size: 14px;
  background: #4aafa7;
  border-color: #4aafa7;
  color: #fff;
}
.option-table {
  &::before {
    background: none;
  }
  .upload-question-img {
    .el-upload-list {
      line-height: inherit;
      .el-upload-list__item {
        margin-bottom: 0;
      }
    }
    >>> .el-upload--picture-card,
    >>> .el-upload-list__item {
      width: 100%;
      height: 96px;
    }
  }
  >>> .el-table__header-wrapper {
    display: none;
  }
  >>> .el-table__row {
    td {
      border: none;
      padding: 10px 0;
    }
  }
  >>> .el-radio {
    .el-radio__inner {
      border: 5px solid #ddd;
    }
    &.is-checked .el-radio__inner {
      border-color: #409eff;
    }
  }
}
.question-analy {
  width: 100%;
  >>> .el-form-item__content {
    width: 100%;
  }
}
</style>
<style lang="scss">
.upload-question-img {
  .el-upload--picture-card {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 200px;
    height: 96px;
    line-height: 96px;
    vertical-align: top;
  }
  .el-upload-list__item {
    width: 200px;
    height: 96px;
  }
  &.stem {
    .el-upload--picture-card {
      width: 228px;
      height: 116px;
      line-height: 116px;
    }
    .el-upload-list__item {
      width: 228px;
      height: 116px;
    }
  }
}
</style>
