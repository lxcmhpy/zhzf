<template>
  <div class="inspect-record-detail">
    <el-row :gutter="20" type="flex">
      <el-col :span="17">
        <el-card shadow="never">
          <el-form
            :model="inspectRecordForm"
            :rules="rules"
            label-position="right"
            label-width="120px"
            ref="inspectRecordFormRef"
            class="inspect-record-from"
          >
            <h3 class="form-tab-title">基本信息</h3>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="巡查时间" prop="inspectionTime">
                  <el-date-picker
                    v-model="inspectRecordForm.inspectionTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查门类" prop="category">
                  <el-select v-model="inspectRecordForm.category" placeholder="请选择">
                    <el-option label="公路巡查" value="1"></el-option>
                    <el-option label="服务去巡查" value="2"></el-option>
                    <el-option label="其他" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查类型" prop="checkType">
                  <el-select v-model="inspectRecordForm.checkType" placeholder="请选择">
                    <el-option label="安全检查" value="1"></el-option>
                    <el-option label="日常巡查" value="2"></el-option>
                    <el-option label="整改督办" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="填报地点" prop="filingPlace">
                  <el-input v-model="inspectRecordForm.filingPlace" placeholder="请输入">
                    <i slot="suffix" class="el-icon-location-outline"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执法人员" prop="lawOfficials">
                  <el-input v-model="inspectRecordForm.lawOfficials" placeholder="请输入">
                    <template slot="append">
                      <el-button type="text">查验</el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h3 class="form-tab-title">检查内容</h3>
              <el-col :span="12">
                <el-form-item label="路段情况" prop="roadSituation">
                  <el-select v-model="inspectRecordForm.roadSituation" placeholder="请选择">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路线编号" prop="roadNumber">
                  <el-select v-model="inspectRecordForm.roadNumber" placeholder="请选择">
                    <el-option label="S10" value="1"></el-option>
                    <el-option label="S20" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路段名称" prop="roadName">
                  <el-select v-model="inspectRecordForm.roadName" placeholder="请选择">
                    <el-option label="路段1" value="1"></el-option>
                    <el-option label="路段2" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行驶方向" prop="travelDirection">
                  <el-select v-model="inspectRecordForm.travelDirection" placeholder="请选择">
                    <el-option label="上行" value="1"></el-option>
                    <el-option label="下行" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="路段信息" prop="roadInfo" class="road-info-input">
                  <el-input v-model="inspectRecordForm.startKm" placeholder="请输入">
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input v-model="inspectRecordForm.startMm" placeholder="请输入">
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                  <span class="road-info-split">至</span>
                  <el-input v-model="inspectRecordForm.endKm" placeholder="请输入">
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input v-model="inspectRecordForm.endMm" placeholder="请输入">
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- 路段信息正常时显示 -->
              <el-col v-if="inspectRecordForm.roadSituation === '1'" :span="24">
                <el-form-item label="问题摘要" prop="problemAbstract" class="problem-abstract-panel">
                  <div class="abstract-top-handle">
                    <el-select v-model="inspectRecordForm.abstractTemplate" placeholder="模板选择">
                      <el-option label="模板1" value="1"></el-option>
                      <el-option label="模板2" value="2"></el-option>
                    </el-select>
                    <el-button type="text">自动生成</el-button>
                  </div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="inspectRecordForm.problemAbstract"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 路段信息为异常时显示 -->
            <template v-if="inspectRecordForm.roadSituation === '0'">
              <el-row
                class="abnormal-situation-info"
                v-for="(abnormal, index) in inspectRecordForm.abnormalSituation"
                :key="index"
              >
                <h4 class="abnormal-title">
                  异常情况{{ index + 1 }}
                  <el-button type="text" class="del-abnormal-btn" @click="deleteAbnormal(index)">
                    <i class="el-icon-delete"></i>删除
                  </el-button>
                </h4>
                <el-col :span="12">
                  <el-form-item label="一级分类" prop="firstLevel">
                    <el-select v-model="abnormal.firstLevel" placeholder="请选择">
                      <el-option label="路产情况" value="1"></el-option>
                      <el-option label="路面情况" value="2"></el-option>
                      <el-option label="建筑控制区情况" value="3"></el-option>
                      <el-option label="其他" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="二级分类" prop="secondLevel">
                    <el-select v-model="abnormal.secondLevel" placeholder="请选择">
                      <el-option label="二级分类1" value="1"></el-option>
                      <el-option label="二级分类2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 三级分类根据分级配置判断是否显示 -->
                <el-col v-if="false" :span="12">
                  <el-form-item label="三级分类" prop="threeLevel">
                    <el-select v-model="abnormal.threeLevel" placeholder="请选择">
                      <el-option label="三级分类1" value="1"></el-option>
                      <el-option label="三级分类2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理情况" prop="handleSituation">
                    <el-select v-model="abnormal.handleSituation" placeholder="请选择">
                      <el-option label="现场处理" value="1"></el-option>
                      <el-option label="电话通知" value="2"></el-option>
                      <el-option label="信息推送" value="3"></el-option>
                      <el-option label="送达处理" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理方式" prop="handleType">
                    <el-select v-model="abnormal.handleType" placeholder="请选择">
                      <el-option label="方式1" value="1"></el-option>
                      <el-option label="方式2" value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理结果" prop="handleResult">
                    <el-select v-model="abnormal.handleResult" placeholder="请选择">
                      <el-option label="处理完成" value="1"></el-option>
                      <el-option label="处理中" value="2"></el-option>
                      <el-option label="待处理" value="3"></el-option>
                      <el-option label="立案" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否立案" prop="isFilingCase">
                    <el-select v-model="abnormal.isFilingCase" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="问题摘要" prop="problemAbstract" class="problem-abstract-panel">
                    <div class="abstract-top-handle">
                      <el-select v-model="inspectRecordForm.abstractTemplate" placeholder="模板选择">
                        <el-option label="模板1" value="1"></el-option>
                        <el-option label="模板2" value="2"></el-option>
                      </el-select>
                      <el-button type="text">自动生成</el-button>
                    </div>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6}"
                      placeholder="请输入内容"
                      v-model="inspectRecordForm.problemAbstract"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <template v-if="abnormal.isFilingCase === '1'">
                  <el-col :span="12">
                    <el-form-item
                      label="程序类型"
                      prop="programType"
                      :rules="[{ required: true, message: '请选择程序类型', trigger: 'change' }]"
                    >
                      <el-select v-model="abnormal.programType" placeholder="请选择">
                        <el-option label="一般程序" value="1"></el-option>
                        <el-option label="简易程序" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="案件类型"
                      prop="caseType"
                      :rules="[{ required: true, message: '请选择案件类型', trigger: 'change' }]"
                    >
                      <el-select v-model="abnormal.caseType" placeholder="请选择">
                        <el-option label="处罚" value="1"></el-option>
                        <el-option label="赔补偿" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="违法行为" prop="illegalActivities">
                      <el-input v-model="abnormal.illegalActivities"></el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
            <!-- 新增异常情况 -->
            <div v-if="inspectRecordForm.roadSituation === '0'" class="abnormal-add-btn">
              <el-button type="primary" icon="el-icon-plus" size="medium" @click="addAbnormal">新增</el-button>
            </div>
          </el-form>
        </el-card>
        <el-card shadow="never" style="margin-top: 20px;">
          <div class="enclosure-file-table">
            <h3 class="form-tab-title">
              附件信息
              <el-button v-if="PageType !== 'view'" type="text" class="add-enclosure-file" @click="addEnclosure('type')">
                <i class="add-file-type-icon">+</i>添加
              </el-button>
            </h3>
            <el-table v-if="PageType !== 'view'" :data="tableData" style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-if="scope.row.files && scope.row.files.length">
                    <ul v-for="file in scope.row.files" :key="file.id" class="file-children-table">
                      <li style="width: 60px;">{{ file.index }}</li>
                      <li style="width: calc(100% - 220px);color: #7b7b7b;">{{ file.name }}</li>
                      <li style="width: 160px;">
                        <el-button type="text">查看</el-button>
                        <el-button type="text">下载</el-button>
                        <el-button type="text">删除</el-button>
                      </li>
                    </ul>
                  </div>
                  <div v-else class="no-enclose-file">暂无数据</div>
                </template>
              </el-table-column>
              <el-table-column label="序号" prop="index" width="60px" align="center"></el-table-column>
              <el-table-column label="材料名称" prop="materialName" align="center"></el-table-column>
              <el-table-column label="操作" width="160px" fixed="right" align="center">
                <el-button type="text" @click="addEnclosure('file')">添加</el-button>
              </el-table-column>
            </el-table>
            <!-- 查看附件信息 -->
            <AbnormalFile v-if="PageType === 'view'" :abnormalFileList="abnormalFileList" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" style="height: 100%;">
          <h3 class="form-tab-title">文书列表</h3>
          <el-tabs
            v-model="activeOffical"
            class="offical-top-tab"
            :stretch="true"
            @tab-click="officalTabClick"
          >
            <el-tab-pane label="已做文书" name="1"></el-tab-pane>
            <el-tab-pane label="未做文书" name="0"></el-tab-pane>
          </el-tabs>
          <el-checkbox-group v-model="checkedOffical" @change="handleCheckedOffical">
            <ul class="offical-list-panel">
              <li v-for="offical in officialList" :key="offical.label">
                <el-checkbox :label="offical.label">
                  <img :src="activeOffical === '1' ? acOfficalUrl: dsOfficalUrl" />
                  {{ offical.name }}
                </el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>
          <div class="print-offical-btn">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAllOffical"
              @change="handleCheckAllChange"
            ></el-checkbox>
            <el-button type="primary" icon="el-icon-printer">打印文书</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 添加或修改时保存 -->
    <div class="float-btns">
      <el-button class="edit_btn" type="primary" @click="saveRecordInfo">
        <i class="iconfont law-save"></i>
        <br />保存
      </el-button>
    </div>
    <!-- 添加附件 -->
    <AddRecordFile ref="AddRecordFileRef" />
    <!-- 查看附件 -->
    <ReviewAbnormalFile ref="ReviewAbnormalFileRef" />
  </div>
</template>

<script>
import AddRecordFile from "@/page/inspection/dutyManage/components/addRecordFile.vue";
import ReviewAbnormalFile from "@/page/inspection/dutyManage/components/reviewAbnormalFile.vue";
import AbnormalFile from "@/page/inspection/dutyManage/components/abnormalFileList.vue";

export default {
  components: { AddRecordFile, AbnormalFile, ReviewAbnormalFile },
  data() {
    return {
      inspectRecordForm: {
        inspectionTime: "",
        category: "",
        checkType: "",
        roadSituation: "1",
        abnormalSituation: [
          {
            firstLevel: "",
            secondLevel: "",
            threeLevel: "",
            handleSituation: "",
            handleType: "",
            handleResult: "",
            isFilingCase: "",
            problemAbstract: "",
            programType: "",
            caseType: "",
            illegalActivities: "",
          },
        ],
      },
      rules: {
        inspectionTime: [
          { required: true, message: "巡查时间不能为空", trigger: "blur" },
        ],
        category: [
          { required: true, message: "请选择检查门类", trigger: "change" },
        ],
        checkType: [
          { required: true, message: "请选择检查类型", trigger: "change" },
        ],
        roadSituation: [
          { required: true, message: "请选择路段情况", trigger: "change" },
        ],
      },
      tipsUrl: "@/../static/images/img/personInfo/form_item_tips.svg",
      acOfficalUrl: "@/../static/images/img/personInfo/icon_ac_wenshu.svg",
      dsOfficalUrl: "@/../static/images/img/personInfo/icon_dis_wenshu.svg",
      musicFileUrl: "@/../static/images/img/personInfo/icon_music.svg",
      tableData: [
        {
          id: "1",
          index: "1",
          materialName: "图像",
          files: [
            { id: "1", index: "1.1", name: "现场图片1" },
            { id: "2", index: "1.2", name: "现场图片2" },
            { id: "3", index: "1.3", name: "现场图片3" },
          ],
        },
        {
          id: "2",
          index: "2",
          materialName: "音频",
          files: [],
        },
        {
          id: "3",
          index: "3",
          materialName: "视频",
          files: [],
        },
      ],
      officialList: [
        { label: "1", name: "《责令整改通知书》" },
        { label: "2", name: "《安全隐患告知函》" },
      ],
      activeOffical: "1",
      checkedOffical: [],
      checkAllOffical: false,
      isIndeterminate: false,
      abnormalFileList: [
        { type: "img", src: "http://124.192.215.10:9332/14,27fefbdd30ab", name: '图片文件.png' },
        { type: "audio", src: "@/../static/sounds/ringtone.wav", name: '音频文件.wav' },
        { type: "video", src: "http://124.192.215.10:9332/11,2804579f39a3", name: '视频文件.mp4' },
      ],
    };
  },
  computed: {
    PageType() {
      return this.$route.params.page;
    },
  },
  created() {
    console.log(this.PageType);
  },
  methods: {
    // 添加附件
    addEnclosure(type) {
      this.$refs.AddRecordFileRef.showModal(type);
    },
    // 新增异常情况
    addAbnormal() {
      let abnormal = {
        firstLevel: "",
        secondLevel: "",
        threeLevel: "",
        handleSituation: "",
        handleType: "",
        handleResult: "",
        isFilingCase: "",
        problemAbstract: "",
        programType: "",
        caseType: "",
        illegalActivities: "",
      };
      this.inspectRecordForm.abnormalSituation.push(abnormal);
    },
    // 删除异常情况
    deleteAbnormal(index) {
      this.$confirm(`确定删除异常情况${index + 1}吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: "custom-question",
        customClass: "custom-confirm",
      })
        .then(() => {
          this.inspectRecordForm.abnormalSituation.splice(index, 1);
        })
        .catch(() => {});
    },
    // 切换文书tab
    officalTabClick() {
      this.checkedOffical.splice(0, this.checkedOffical.length);
    },
    // 选择文书
    handleCheckedOffical(value) {
      let checkedCount = value.length;
      this.checkAllOffical = checkedCount === this.officialList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.officialList.length;
    },
    // 全选文书
    handleCheckAllChange(val) {
      this.checkedCities = val ? ["1", "2"] : [];
      this.isIndeterminate = false;
    },
    // 保存
    saveRecordInfo() {
      console.log("保存记录");
    },
    // 查看附件
    viewAbnormalFile(file) {
      this.$refs.ReviewAbnormalFileRef.showModal(file.type, file.src);
    },
  },
};
</script>

<style lang="scss" scoped>
.inspect-record-detail {
  position: relative;
  padding: 20px;
  .inspect-record-from {
    >>> .el-select {
      display: block;
    }
    >>> .el-date-editor {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      padding-top: 0;
    }
    >>> .el-date-editor.el-input,
    >>> .el-date-editor.el-input__inner {
      width: 100%;
    }
    .device-form-item-tips {
      display: inline-block;
      position: absolute;
      width: 30px;
      height: 30px;
      top: 4px;
      right: -40px;
      cursor: pointer;
    }
    .abnormal-situation-info {
      padding: 30px 20px;
      margin: 0 -20px;
      background: #f6f8fc;
      border-bottom: 1px dashed #979797;
      .abnormal-title {
        font-size: 14px;
        font-weight: 600;
        color: #e84241;
        line-height: 38px;
        padding-left: 30px;
        .del-abnormal-btn {
          float: right;
          color: #7b7b7b;
        }
      }
    }
    .abnormal-add-btn {
      padding: 30px 20px;
      margin: 0 -20px -20px;
      background: #f6f8fc;
      text-align: center;
    }
  }
  .road-info-input {
    >>> .el-input {
      width: 21%;
    }
    .input-tips {
      font-style: inherit;
      font-weight: bold;
      color: #20232b;
    }
    .road-info-join,
    .road-info-split {
      display: inline-block;
      font-size: 24px;
      font-weight: 600;
      color: #7b7b7b;
      line-height: 32px;
      text-align: center;
      width: 3%;
    }
    .road-info-split {
      font-size: 14px;
      color: #7b7b7b;
      width: 7%;
      margin: 0 2px;
    }
  }
  .problem-abstract-panel {
    position: relative;
    .abstract-top-handle {
      height: 24px;
      line-height: 24px;
      background: #ecf1fa;
      text-align: right;
      padding-right: 20px;
      position: absolute;
      z-index: 100;
      right: 1px;
      left: 1px;
      top: 1px;
    }
    >>> .el-select {
      display: inline-block;
      width: 108px;
      line-height: 24px;
      .el-input__inner {
        border: none;
        background: none;
        height: 24px;
      }
      .el-input__icon {
        line-height: 24px;
      }
    }
    >>> .el-button {
      padding: 0 15px;
    }
    >>> .el-textarea__inner {
      padding-top: 30px;
    }
  }
  .form-tab-title {
    font-size: 18px;
    font-weight: bold;
    color: #20232b;
    padding-left: 10px;
    margin-bottom: 18px;
    border-left: 4px solid #4573d0;
  }
  .enclosure-file-table {
    padding-bottom: 30px;
    .add-enclosure-file {
      padding: 0 16px;
      float: right;
      .add-file-type-icon {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 15px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        background: #4573d0;
        color: #fff;
        margin-right: 6px;
      }
    }
    .file-children-table {
      padding-left: 48px;
      height: 40px;
      line-height: 40px;
      > li {
        text-align: center;
        float: left;
      }
    }
    .no-enclose-file {
      width: 96%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #7b7b7b;
    }
  }
  .offical-top-tab {
    >>> .el-tabs__header {
      display: flex;
      justify-content: center;
      border-bottom: 2px solid #e4e7ed;
    }
    >>> .el-tabs__nav-wrap::after {
      display: none;
    }
    >>> .el-tabs__item {
      font-size: 16px;
      font-weight: 600;
    }
    >>> .el-tabs__active-bar {
      height: 4px;
    }
  }
  .offical-list-panel {
    border: 1px solid #d1d5de;
    border-bottom: none;
    margin-top: 15px;
    > li {
      padding: 16px;
      border-bottom: 1px solid #d1d5de;
      font-size: 16px;
      color: #7b7b7b;
      >>> .el-checkbox {
        display: block;
        .el-checkbox__label {
          font-size: 16px;
          line-height: 36px;
          > img {
            display: block;
            width: 36px;
            height: 36px;
            float: left;
          }
        }
      }
    }
  }
  .print-offical-btn {
    height: 40px;
    line-height: 40px;
    margin: 20px 0;
    >>> .el-checkbox {
      width: 10%;
      text-align: center;
    }
    >>> .el-button {
      width: 88%;
      padding: 15px;
    }
  }
  .float-btns {
    width: 48px;
    height: 100px;
    position: fixed;
    right: 50px;
    bottom: 70px;
    z-index: 100;

    &.float-btns .el-button {
      border-radius: 1px;
      width: 48px;
      height: 48px;
      padding: 0;
      text-align: center;
    }

    .iconfont {
      display: inline-block;
      margin-bottom: 4px;
      margin-left: 4px;
    }
  }

}
</style>
<style lang="scss">
.form-tips-popper.el-popover {
  background: #303133;
  color: #fff;
  .popper__arrow::after {
    border-top-color: #303133;
  }
}
</style>