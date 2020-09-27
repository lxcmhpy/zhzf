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
                <el-form-item label="巡查时间" prop="checkTime">
                  <el-date-picker
                    v-model="inspectRecordForm.checkTime"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    @change="checkTimeChange"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查门类" prop="checkCategory">
                  <el-select
                    v-model="inspectRecordForm.checkCategory"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in checkCategoryList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查类型" prop="checkType">
                  <el-select
                    v-model="inspectRecordForm.checkType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in checkTypeList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="填报地点" prop="address">
                  <el-input
                    v-model="inspectRecordForm.address"
                    placeholder="请输入"
                  >
                    <i slot="suffix" class="el-icon-location-outline"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="执法人员" prop="lawPersonListIndex">
                  <el-select
                    v-model="inspectRecordForm.lawPersonListIndex"
                    multiple
                  >
                    <el-option
                      v-for="(item, index) in lawPersonList"
                      :key="item.id"
                      :label="item.lawOfficerName"
                      :value="index"
                    ></el-option>
                  </el-select>
                  <!-- <el-input v-model="inspectRecordForm.lawOfficials" placeholder="请输入">
                    <template slot="append">
                      <el-button type="text">查验</el-button>
                    </template>
                  </el-input>-->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <h3 class="form-tab-title">检查内容</h3>
              <el-col :span="12">
                <el-form-item label="路段情况" prop="roadCondition">
                  <el-select
                    v-model="inspectRecordForm.roadCondition"
                    placeholder="请选择"
                    @change="roadConditionChange"
                  >
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路线编号" prop="roadNum">
                  <el-select
                    v-model="inspectRecordForm.roadNum"
                    @change="routeChange()"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in routeList"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="路段名称" prop="sectionIndex">
                  <el-select
                    v-model="inspectRecordForm.sectionIndex"
                    @change="sectionChange"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="(item, index) in sectionList"
                      :key="item.id"
                      :label="item.sectionName"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行驶方向" prop="drivingDirection">
                  <el-select
                    v-model="inspectRecordForm.drivingDirection"
                    placeholder="请选择"
                  >
                    <el-option label="上行" value="1"></el-option>
                    <el-option label="下行" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item
                  label="路段信息"
                  prop="roadInfo"
                  class="road-info-input"
                >
                  <el-input
                    v-model="inspectRecordForm.startKilometer"
                    placeholder="请输入"
                  >
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input
                    v-model="inspectRecordForm.startMeter"
                    placeholder="请输入"
                  >
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                  <span class="road-info-split">至</span>
                  <el-input
                    v-model="inspectRecordForm.endKilometer"
                    placeholder="请输入"
                  >
                    <i slot="prefix" class="input-tips">K</i>
                  </el-input>
                  <span class="road-info-join">+</span>
                  <el-input
                    v-model="inspectRecordForm.endMeter"
                    placeholder="请输入"
                  >
                    <i slot="suffix" class="input-tips">M</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <!-- 路段信息正常时显示 -->
              <el-col v-if="inspectRecordForm.roadCondition === '1'" :span="24">
                <el-form-item
                  label="描述"
                  prop="describes"
                  class="problem-abstract-panel"
                >
                  <div class="abstract-top-handle">
                    <el-select
                      v-model="inspectRecordForm.desTemplateId"
                      placeholder="模板选择"
                    >
                      <el-option
                        v-for="item in normalRecordTemp"
                        :key="item.templateId"
                        :label="item.name"
                        :value="item.templateId"
                      ></el-option>
                    </el-select>
                    <el-button type="text" @click="generateDescribes"
                      >自动生成</el-button
                    >
                  </div>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6 }"
                    placeholder="请输入内容"
                    v-model="inspectRecordForm.describes"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 路段信息为异常时显示 -->
            <template v-if="inspectRecordForm.roadCondition === '2'">
              <el-row
                class="abnormal-situation-info"
                v-for="(abnormal, index) in inspectRecordForm.listAbn"
                :key="index"
              >
                <h4 class="abnormal-title">
                  异常情况{{ index + 1 }}
                  <el-button
                    type="text"
                    class="del-abnormal-btn"
                    @click="deleteAbnormal(index)"
                  >
                    <i class="el-icon-delete"></i>删除
                  </el-button>
                </h4>
                <el-col :span="12">
                  <el-form-item label="一级分类" prop="firstProcessType">
                    <el-select
                      v-model="abnormal.firstProcessType"
                      @change="processTypeChange(index, 1)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in cheProcesTypeTree"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="
                    abnormal.firstType !== undefined &&
                    abnormal.firstType !== null &&
                    cheProcesTypeTree[abnormal.firstType]['children'].length > 0
                  "
                  :span="12"
                >
                  <el-form-item label="二级分类" prop="secondProcessType">
                    <el-select
                      v-model="abnormal.secondProcessType"
                      @change="processTypeChange(index, 2)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in cheProcesTypeTree[abnormal.firstType][
                          'children'
                        ]"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!-- 三级分类根据分级配置判断是否显示 -->
                <el-col
                  v-if="
                    abnormal.firstType !== undefined &&
                    abnormal.firstType !== null &&
                    abnormal.secondType !== undefined &&
                    abnormal.secondType !== null &&
                    cheProcesTypeTree[abnormal.firstType]['children'][
                      abnormal.secondType
                    ] &&
                    cheProcesTypeTree[abnormal.firstType]['children'][
                      abnormal.secondType
                    ]['children'] &&
                    cheProcesTypeTree[abnormal.firstType]['children'][
                      abnormal.secondType
                    ]['children'].length > 0
                  "
                  :span="12"
                >
                  <el-form-item label="三级分类" prop="thirdProcessType">
                    <el-select
                      v-model="abnormal.thirdProcessType"
                      @change="processTypeChange(index, 3)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in cheProcesTypeTree[abnormal.firstType][
                          'children'
                        ][abnormal.secondType]['children']"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="处理情况" prop="process">
                    <el-select
                      v-model="abnormal.process"
                      @change="processChange(index, 1)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in abnormal.processList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="
                    abnormal.processList &&
                    abnormal.process &&
                    abnormal.processModeList &&
                    abnormal.processModeList.length > 0
                  "
                  :span="12"
                >
                  <el-form-item label="处理方式" prop="processMode">
                    <el-select
                      v-model="abnormal.processMode"
                      @change="processChange(index, 2)"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in abnormal.processModeList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col
                  v-if="
                    abnormal.processList &&
                    abnormal.process &&
                    abnormal.process &&
                    abnormal.processResultsList &&
                    abnormal.processResultsList.length > 0
                  "
                  :span="12"
                >
                  <el-form-item label="处理结果" prop="processResults">
                    <el-select
                      v-model="abnormal.processResults"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in abnormal.processResultsList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否立案" prop="isCase">
                    <el-select v-model="abnormal.isCase" placeholder="请选择">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="问题摘要"
                    prop="templateId"
                    class="problem-abstract-panel"
                  >
                    <div class="abstract-top-handle">
                      <el-select
                        v-model="abnormal.templateId"
                        placeholder="模板选择"
                      >
                        <el-option
                          v-for="item in abnormalRecordTemp"
                          :key="item.templateId"
                          :label="item.name"
                          :value="item.templateId"
                        ></el-option>
                      </el-select>
                      <el-button
                        type="text"
                        @click="problemAbstractGenerate(index)"
                        >自动生成</el-button
                      >
                    </div>
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 6 }"
                      placeholder="请输入内容"
                      v-model="abnormal.problemAbstract"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <template v-if="abnormal.isCase === '1'">
                  <el-col :span="12">
                    <el-form-item
                      label="程序类型"
                      :rules="[
                        {
                          required: true,
                          message: '请选择程序类型',
                          trigger: 'change',
                        },
                      ]"
                      :prop="'listAbn.' + index + '.programType'"
                    >
                      <el-select
                        v-model="abnormal.programType"
                        placeholder="请选择"
                        @change="programTypeChange(index)"
                      >
                        <el-option label="一般程序" value="0"></el-option>
                        <el-option label="简易程序" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="案件类型"
                      :rules="[
                        {
                          required: true,
                          message: '请选择案件类型',
                          trigger: 'change',
                        },
                      ]"
                      :prop="'listAbn.' + index + '.caseTypeId'"
                    >
                      <el-select
                        v-model="abnormal.caseTypeId"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, index) in caseTypeList"
                          :key="index"
                          :label="item.caseTypeName"
                          :value="item.caseTypeId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item
                      label="违法行为"
                      prop="caseCauseName"
                      class="case-abnormal-input"
                    >
                      <el-input
                        v-model="abnormal.caseCauseName"
                        @click="chooseIllegalAct(index)"
                      >
                        <el-button
                          slot="append"
                          @click="chooseIllegalAct(index)"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </template>
              </el-row>
            </template>
            <!-- 新增异常情况 -->
            <div
              v-if="inspectRecordForm.roadCondition === '2'"
              class="abnormal-add-btn"
            >
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="medium"
                @click="addAbnormal"
                >新增</el-button
              >
            </div>
          </el-form>
        </el-card>
        <el-card shadow="never" style="margin-top: 20px">
          <div class="enclosure-file-table">
            <h3 class="form-tab-title">
              附件信息
              <el-button
                v-if="PageType !== 'view'"
                type="text"
                class="add-enclosure-file"
                @click="addEnclosure('0')"
              >
                <i class="add-file-type-icon">+</i>添加
              </el-button>
            </h3>
            <el-table
              v-if="PageType !== 'view'"
              :data="listAtt"
              style="width: 100%"
            >
              <el-table-column type="expand">
                <template slot-scope="scope">
                  <div v-if="scope.row.children && scope.row.children.length">
                    <ul
                      v-for="(attach, index) in scope.row.children"
                      :key="attach.id"
                      class="file-children-table"
                    >
                      <li style="width: 60px">
                        {{ `${scope.$index + 1}.${index + 1}` }}
                      </li>
                      <li style="width: calc(100% - 220px); color: #7b7b7b">
                        {{ attach.name }}
                      </li>
                      <li style="width: 160px">
                        <el-button type="text" @click="previewFile(attach)"
                          >查看</el-button
                        >
                        <el-button type="text" @click="download(attach)"
                          >下载</el-button
                        >
                        <el-button
                          type="text"
                          @click="removeAttach(attach, scope.row)"
                          >删除</el-button
                        >
                      </li>
                    </ul>
                  </div>
                  <div v-else class="no-enclose-file">暂无数据</div>
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                prop="index"
                width="60px"
                align="center"
              >
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="材料名称"
                prop="name"
                align="center"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="160px"
                fixed="right"
                align="center"
              >
                <template slot-scope="scope">
                  <el-button type="text" @click="addEnclosure('1', scope.row)"
                    >添加</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 查看附件信息 -->
            <AbnormalFile
              v-if="PageType === 'view'"
              :abnormalFileList="abnormalFileList"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" style="height: 100%">
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
          <el-checkbox-group
            v-model="checkedOffical"
            @change="handleCheckedOffical"
          >
            <ul class="offical-list-panel">
              <template v-if="activeOffical === '1'">
                <li v-for="offical in finishedDocs" :key="offical.label">
                  <el-checkbox :label="offical.label">
                    <img :src="acOfficalUrl" />
                    <span>{{ offical.name }}</span>
                  </el-checkbox>
                </li>
                <li
                  v-if="this.finishedDocs.length == 0"
                  class="offical-list-panel-none"
                >
                  暂无文书
                </li>
              </template>
              <template v-else>
                <li v-for="offical in nofinishedDocs" :key="offical.label">
                  <div class="el-checkbox" @click="editDoc(offical)">
                    <span class="el-checkbox__label">
                      <img :src="dsOfficalUrl" />
                      <span>{{ offical.name }}</span>
                    </span>
                  </div>
                </li>
              </template>
            </ul>
          </el-checkbox-group>
          <div
            v-if="activeOffical === '1' && this.finishedDocs.length > 0"
            class="print-offical-btn"
          >
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAllOffical"
              @change="handleCheckAllChange"
            ></el-checkbox>
            <el-button type="primary" icon="el-icon-printer" @click="docClick()"
              >打印文书</el-button
            >
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
    <AddRecordFile ref="AddRecordFileRef" @addAttach="addAttach" />
    <!-- 查看附件 -->
    <ReviewAbnormalFile ref="ReviewAbnormalFileRef" />
    <!-- 违规行为 -->
    <chooseillegalAct
      ref="chooseillegalActRef"
      @setIllegaAct="setIllegaAct"
    ></chooseillegalAct>

    <el-dialog
      :visible.sync="docVisible"
      @close="closeDialog"
      :close-on-click-modal="false"
      width="840px"
      append-to-body
    >
      <div>
        <div style="height: auto">
          <object>
            <embed
              style="
                padding: 0px;
                width: 790px;
                margin: 0 auto;
                height: 1150px !important;
              "
              name="plugin"
              id="plugin"
              :src="docSrc"
              type="application/pdf"
              internalinstanceid="29"
            />
          </object>
        </div>
        <div
          style="position: absolute; bottom: 150px; right: 20px; width: 100px"
        >
          <el-button
            @click="showNext('last')"
            :disabled="!nowShowPdfIndex ? true : false"
            >上一张</el-button
          >
          <br /><br />
          <el-button
            @click="showNext('next')"
            :disabled="
              nowShowPdfIndex == this.checkedDocId.length - 1 ? true : false
            "
            >下一张
          </el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 编辑文书 -->
    <EditDocDialog ref="editDocDialogRef" />
  </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import AddRecordFile from "@/page/inspection/dutyManage/components/addRecordFile.vue";
import ReviewAbnormalFile from "@/page/inspection/dutyManage/components/reviewAbnormalFile.vue";
import AbnormalFile from "@/page/inspection/dutyManage/components/abnormalFileList.vue";
import chooseillegalAct from "@/page/chooseIllegegaDialog.vue";
import EditDocDialog from "@/page/inspection/dutyManage/recordDoc/editDocDialog.vue";
import {
  getCheRecordTempPageListApi,
  addCheRecordApi,
  getCheRecordDetailApi,
  getCheProcessTypeTreeApi,
  getProcessTypeApi,
  getProcessApi,
  getProcessTypeTreeApi,
} from "@/api/supervision";
import { findRouteManageByOrganIdApi, getSectionListApi } from "@/api/system";
import { deleteFileByIdApi, downLoadCommon } from "@/api/upload";

export default {
  components: {
    AddRecordFile,
    AbnormalFile,
    ReviewAbnormalFile,
    chooseillegalAct,
    EditDocDialog,
  },
  data() {
    return {
      inspectRecordForm: {
        checkTime: "",
        checkCategory: "",
        checkType: "",
        roadCondition: "1",
        lawPersonListIndex: [],
        listAbn: [
          {
            firstProcessType: "",
            secondProcessType: "",
            thirdProcessType: "",
            process: "",
            processMode: "",
            processResults: "",
            isCase: "",
            problemAbstract: "",
            programType: "",
            caseType: "",
            caseCauseId: "",
          },
        ],
      },
      //默认业务领域
      cate: {
        zfmlId: "1002000100000000",
        zfml: "公路路政",
      },
      rules: {
        checkTime: [
          { required: true, message: "巡查时间不能为空", trigger: "blur" },
        ],
        checkCategory: [
          { required: true, message: "请选择检查门类", trigger: "change" },
        ],
        checkType: [
          { required: true, message: "请选择检查类型", trigger: "change" },
        ],
        roadCondition: [
          { required: true, message: "请选择路段情况", trigger: "change" },
        ],
        roadNum: [
          { required: true, message: "请选择路线编号", trigger: "change" },
        ],
        sectionIndex: [
          { required: true, message: "请选择路段", trigger: "change" },
        ],
      },
      tipsUrl: "@/../static/images/img/personInfo/form_item_tips.svg",
      acOfficalUrl: "@/../static/images/img/personInfo/icon_ac_wenshu.svg",
      dsOfficalUrl: "@/../static/images/img/personInfo/icon_dis_wenshu.svg",
      musicFileUrl: "@/../static/images/img/personInfo/icon_music.svg",
      listAtt: [],
      officialList: [
        {
          label: "92531b11586dab1eba850aea1c415a4f",
          name: "《公路安全隐患告知函》",
          caseDoctypeId: "92531b11586dab1eba850aea1c415a4f",
          id: '1'
        },
        {
          label: "98499c305c6447988343c33d92f0f23c",
          name: "《路政巡查监督责令整改通知书》",
          caseDoctypeId: "98499c305c6447988343c33d92f0f23c",
          id: '2'
        },
      ],
      finishedDocs: [], //已做文书
      nofinishedDocs: [], //未作文书
      activeOffical: "0",
      checkedOffical: [],
      checkAllOffical: false,
      isIndeterminate: false,
      abnormalFileList: [
        {
          type: "img",
          src: "http://124.192.215.10:9332/14,27fefbdd30ab",
          name: "图片文件.png",
        },
        {
          type: "audio",
          src: "@/../static/sounds/ringtone.wav",
          name: "音频文件.wav",
        },
        {
          type: "video",
          src: "http://124.192.215.10:9332/11,2804579f39a3",
          name: "视频文件.mp4",
        },
      ],
      normalRecordTemp: [], //正常记录模板list
      abnormalRecordTemp: [], //异常
      curParentAttach: {}, //当前所选附件分类
      curAbnormalIndex: {}, //当前所选记录异常索引
      lawPersonList: [], //执法人员列表
      caseTypeList: [], //案件类型
      routeList: [], //路线
      sectionList: [], //路段
      cheProcesTypeTree: [], //处理等级树
      secondProcesTypeTree: [], //二级处理等级
      thirdProcesTypeTree: [], //三级树
      processList: [], //处理情况list
      processModeList: [], //处理方式list
      processResultsList: [], //处理结果list
      docSrc: undefined, //文书路径
      docVisible: false, //文书dialog
      checkedDocId: [],
      nowShowPdfIndex: 0,
    };
  },
  computed: {
    PageType() {
      return this.$route.params.page;
    },
    checkTypeList() {
      return this.$route.params.checkTypeList;
    },
    checkCategoryList() {
      return this.$route.params.checkCategoryList;
    },
    rowData() {
      return this.$route.params.cheRecord;
    },
    UserInfo() {
      return iLocalStroage.gets("userInfo");
    },
  },
  created() {
    console.log(this.PageType);
    this.getCheRecordTempPageList();
    if (this.PageType === "edit") {
      this.activeOffical = "1";
      this.getCheRecordDetail(this.rowData);
    } else {
      this.nofinishedDocs = this.officialList;
    }
    this.searchLawPerson();
    this.findRouteManageByOrganId();
    this.getCheProcessTypeTree();
  },
  methods: {
    // 添加附件
    addEnclosure(levels, parent) {
      this.curParentAttach = parent;
      const type = parent ? parent.type : "1";
      this.$refs.AddRecordFileRef.showModal(levels, type);
    },
    // 新增异常情况
    addAbnormal() {
      let abnormal = {
        firstProcessType: "",
        secondProcessType: "",
        thirdProcessType: "",
        process: "",
        processMode: "",
        processResults: "",
        isCase: "",
        problemAbstract: "",
        programType: "",
        caseType: "",
        caseCauseId: "",
      };
      this.inspectRecordForm.listAbn.push(abnormal);
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
          this.inspectRecordForm.listAbn.splice(index, 1);
          if (this.inspectRecordForm.listAbn == 0) {
            this.inspectRecordForm.roadCondition = "1";
          }
        })
        .catch(() => {});
    },
    // 切换文书tab
    officalTabClick() {
      this.checkedOffical.splice(0, this.checkedOffical.length);
    },
    // 选择文书
    handleCheckedOffical(value) {
      this.inspectRecordForm.caseDoctypeId = this.checkedOffical.toString();
      console.log(this.inspectRecordForm.caseDoctypeId, "checkedOffical");

      let checkedCount = value.length;
      this.checkAllOffical = checkedCount === this.officialList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.officialList.length;
    },
    // 全选文书
    handleCheckAllChange(val) {
      this.checkedCities = val
        ? [
            "92531b11586dab1eba850aea1c415a4f",
            "98499c305c6447988343c33d92f0f23c",
          ]
        : [];
      this.isIndeterminate = false;
    },
    //巡查时间变化
    checkTimeChange() {
      this.inspectRecordForm.checkStartTime = this.inspectRecordForm.checkTime[0];
      this.inspectRecordForm.checkEndTime = this.inspectRecordForm.checkTime[1];
    },
    // 保存
    saveRecordInfo() {
      console.log("保存记录", this.inspectRecordForm);
      this.$refs.inspectRecordFormRef.validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "正在保存",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)",
          });

          this.inspectRecordForm.cateId = this.cate.zfmlId;
          this.inspectRecordForm.cateName = this.cate.zfml;
          this.inspectRecordForm.listAbn.forEach((a) => {
            a.programTypeName =
              a.programTypeName == "0" ? "一般程序" : "简易程序";
          });
          const lawPersonListIndex = this.inspectRecordForm.lawPersonListIndex;
          let listPer = [];
          this.inspectRecordForm.personIds = "";
          this.inspectRecordForm.personName = "";
          this.inspectRecordForm.certificateId = "";
          this.inspectRecordForm.lawPersonListIndex.forEach((i) => {
            let per = {
              personId: this.lawPersonList[i].userId,
              personName: this.lawPersonList[i].lawOfficerName,
              createId: this.UserInfo.id,
            };
            listPer.push(per);

            this.inspectRecordForm.personIds += `${per.personId},`;
            this.inspectRecordForm.personName += `${per.personName},`;
            this.inspectRecordForm.certificateId += `${this.lawPersonList[i].lawOfficerCards},`;
          });
          this.inspectRecordForm.listPer = listPer;

          //添加附件
          this.inspectRecordForm.listAtt = this.listAtt;

          addCheRecordApi(this.inspectRecordForm).then(
            (res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                this.$router.go(-1);
                this.$store.dispatch("deleteTabs", this.$route.name);
              }
            },
            (err) => {
              console.error(err);
            }
          );
          loading.close();
        } else {
          return false;
        }
      });
    },
    //模板查询
    getCheRecordTempPageList() {
      const params = { size: -1 };
      getCheRecordTempPageListApi(params).then(
        (res) => {
          if (res.code == 200) {
            this.normalRecordTemp = res.data.records.filter(
              (t) => t.roadCondition == "1"
            );
            this.abnormalRecordTemp = res.data.records.filter(
              (t) => t.roadCondition == "2"
            );
          } else {
            console.error(res);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //道路情况
    roadConditionChange(value) {
      if (value == "1") {
        //正常
        this.inspectRecordForm.listAbn = [];
      } else {
        //异常
        if (this.inspectRecordForm.listAbn.length == 0) {
          this.inspectRecordForm.describes = "";
          this.inspectRecordForm.desTemplateId = "";
          this.addAbnormal();
        }
      }
    },
    //获取记录详情
    getCheRecordDetail(cheRecord) {
      const { recordId } = cheRecord;
      getCheRecordDetailApi({ recordId }).then(
        (res) => {
          if (res.code == 200) {
            let formData = {};
            formData = res.data;
            formData.checkTime = [
              res.data.checkStartTime,
              res.data.checkEndTime,
            ];
            this.listAtt = formData.listAtt;
            //回填执法人员
            const listPer = formData.listPer;
            const lawPersonListIndex = [];
            listPer &&
              listPer.forEach((p) => {
                this.lawPersonList.map((lp, index) => {
                  if (lp.userId == p.personId) {
                    lawPersonListIndex.push(index);
                  }
                });
              });
            formData.lawPersonListIndex = lawPersonListIndex;

            this.inspectRecordForm = formData;
            if (this.inspectRecordForm.roadNum) {
              this.routeChange(this.inspectRecordForm.roadNum);
            }

            formData.listAbn &&
              formData.listAbn.forEach((a, index) => {
                if (a.firstProcessType) {
                  a["firstType"] = this.cheProcesTypeTree.findIndex(
                    (t) => t.id === a.firstProcessType
                  );
                }
                if (a.secondProcessType && a.firstProcessType) {
                  console.log(a["firstType"]);
                  console.log(this.cheProcesTypeTree[a["firstType"]]);
                  a["secondType"] = this.cheProcesTypeTree[a["firstType"]][
                    "children"
                  ].findIndex((t) => t.id === a.secondProcessType);
                }

                this.getProcessType(
                  index,
                  a.thirdProcessType
                    ? a.thirdProcessType
                    : a.secondProcessType
                    ? a.secondProcessType
                    : a.firstProcessType
                );

                this.programTypeChange(index);
              });
            this.inspectRecordForm = formData;

            if (res.data.listCaseDocs && res.data.listCaseDocs.length > 0) {
              this.officialList.forEach((o) => {
                const caseDoc = res.data.listCaseDocs.find(
                  (d) => d.caseDocTypeId == o.caseDoctypeId
                );
                this.finishedDocs.push(Object.assign(o, caseDoc));
              });
            } else {
              this.nofinishedDocs = this.officialList;
            }
          } else {
            console.error(res);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    //添加删除附件
    addAttach(attach) {
      if (attach.levels === "0") {
        attach.children = [];
        this.listAtt.push(attach);
      } else {
        this.curParentAttach.children.push(attach);
      }
    },
    //删除附件
    removeAttach(attach, parentAttach) {
      if (attach.storageId) {
        this.deleteFile(attach.storageId);
      }
      parentAttach.children.splice(parentAttach.children.indexOf(attach), 1);
    },
    //删除附件
    deleteFile(storageId) {
      let _this = this;
      deleteFileByIdApi(storageId).then(
        (res) => {
          _this.$message({
            type: "success",
            message: "操作成功!",
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //下载附件
    download(attach) {
      let _this = this;
      if (attach && attach.storageId) {
        this.$util.com_getFileStream(attach.storageId).then((res) => {
          const a = document.createElement("a");
          a.style.display = "none";
          a.download = attach.name;
          a.href = res;
          a.click();
          document.body.removeChild(a);
        });
      }
    },
    //查看文件
    previewFile(attach) {
      this.$refs.ReviewAbnormalFileRef.showModal(attach);
    },
    //模板生成描述
    generateDescribes() {
      const from = this.inspectRecordForm;
      const tmp = this.normalRecordTemp.find(
        (t) => t.templateId == from.desTemplateId
      );
      from.describes = this.generateContent(tmp.content);
      this.inspectRecordForm = JSON.parse(JSON.stringify(from));
    },
    //异常摘要生成
    problemAbstractGenerate(listAbnIndex) {
      const curAbn = this.inspectRecordForm.listAbn[listAbnIndex];
      const tmp = this.abnormalRecordTemp.find(
        (t) => t.templateId == curAbn.templateId
      );
      console.log(this.generateContent(tmp.content));
      this.inspectRecordForm.listAbn[
        listAbnIndex
      ].problemAbstract = this.generateContent(tmp.content);
    },
    generateContent(content) {
      console.log(this.inspectRecordForm);
      for (const key in this.inspectRecordForm) {
        switch (key) {
          case "checkCategory":
            content = content.replace(
              `{${key}}`,
              this.checkCategoryList.find(
                (c) => c.id == this.inspectRecordForm[key]
              ).name
            );
            break;
          case "checkType":
            content = content.replace(
              `{${key}}`,
              this.checkTypeList.find(
                (c) => c.id == this.inspectRecordForm[key]
              ).name
            );
            break;
          default:
            content = content.replace(`{${key}}`, this.inspectRecordForm[key]);
            break;
        }
      }
      return content;
    },
    // 查询执法人员
    searchLawPerson() {
      this.$store.dispatch("findLawOfficerList", this.UserInfo.organId).then(
        (res) => {
          this.lawPersonList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //程序类型选择
    programTypeChange(abnormalIndex) {
      this.curAbnormalIndex = abnormalIndex;
      this.inspectRecordForm.listAbn[abnormalIndex].caseType = "";

      this.caseTypeList = [];
      let data = {
        programType: this.inspectRecordForm.listAbn[abnormalIndex].programType,
        cateId: this.cate.zfmlId,
        organId: this.UserInfo.organId,
      };
      let _this = this;
      this.$store.dispatch("getCaseType", data).then(
        (res) => {
          console.log("案件类型", res);
          _this.caseTypeList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    //选择违法行为弹窗
    chooseIllegalAct(abnormalIndex) {
      this.curAbnormalIndex = abnormalIndex;
      if (this.cate.zfmlId) {
        let lawCate = {
          cateId: this.cate.zfmlId,
          cateName: this.cate.zfml,
          hyTypeId: "",
          resourse: "establish",
        };
        this.$refs.chooseillegalActRef.showModal(lawCate);
      }
    },
    //设置违法行为
    setIllegaAct(val) {
      const abnormal = this.inspectRecordForm.listAbn[this.curAbnormalIndex];
      let curAbnormal = {};
      Object.assign(curAbnormal, abnormal, {
        caseCauseId: val.id,
        caseCauseName: val.strContent,
      });
      this.inspectRecordForm.listAbn.splice(
        this.curAbnormalIndex,
        1,
        curAbnormal
      );
    },
    //查找路线
    findRouteManageByOrganId() {
      let data = { organId: this.UserInfo.organId };
      findRouteManageByOrganIdApi(data).then(
        (res) => {
          this.routeList = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    },
    routeChange(routeName) {
      routeName = routeName ? routeName : this.inspectRecordForm.roadNum;
      const params = { size: -1, routeName };
      getSectionListApi(params).then(
        (res) => {
          if (res.code == 200) {
            this.sectionList = res.data.records;
            if (this.inspectRecordForm.roadName) {
              this.inspectRecordForm.sectionIndex = this.sectionList.findIndex(
                (s) => s.sectionName == this.inspectRecordForm.roadName
              );
            }
          }
        },
        (error) => {
          console.log(err);
        }
      );
    },
    //选择路段
    sectionChange() {
      const curSection = this.sectionList[this.inspectRecordForm.sectionIndex];
      this.inspectRecordForm.roadName = curSection.sectionName;
      this.inspectRecordForm.startKilometer = curSection.startingPileK;
      this.inspectRecordForm.startMeter = curSection.startingPileM;
      this.inspectRecordForm.endKilometer = curSection.enddingPileK;
      this.inspectRecordForm.endMeter = curSection.enddingPileM;
    },
    //获取处理等级树
    getCheProcessTypeTree() {
      getCheProcessTypeTreeApi().then(
        (res) => {
          this.cheProcesTypeTree = res.data.filter((t) => t.levels === "1");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    processTypeChange(abnormalIndex, levels) {
      let typeAttr = "";
      let typeIndex = null;
      let processType = "";

      this.inspectRecordForm.listAbn[abnormalIndex].process = "";
      this.inspectRecordForm.listAbn[abnormalIndex].processMode = "";
      this.inspectRecordForm.listAbn[abnormalIndex].processResults = "";
      switch (levels) {
        case 1:
          typeAttr = "firstType";
          typeIndex = this.cheProcesTypeTree.findIndex(
            (item) =>
              item.id ===
              this.inspectRecordForm.listAbn[abnormalIndex]["firstProcessType"]
          );
          this.inspectRecordForm.listAbn[abnormalIndex]["secondProcessType"] =
            "";
          this.inspectRecordForm.listAbn[abnormalIndex]["thirdProcessType"] =
            "";
          processType = this.inspectRecordForm.listAbn[abnormalIndex][
            "firstProcessType"
          ];
          break;
        case 2:
          typeAttr = "secondType";
          let perIndex = this.inspectRecordForm.listAbn[abnormalIndex][
            "firstType"
          ];
          if (
            this.cheProcesTypeTree[perIndex]["children"] &&
            this.cheProcesTypeTree[perIndex]["children"].length
          ) {
            typeIndex = this.cheProcesTypeTree[perIndex]["children"].findIndex(
              (item) =>
                item.id ===
                this.inspectRecordForm.listAbn[abnormalIndex][
                  "secondProcessType"
                ]
            );
          }
          this.inspectRecordForm.listAbn[abnormalIndex]["thirdProcessType"] =
            "";
          processType = this.inspectRecordForm.listAbn[abnormalIndex][
            "secondProcessType"
          ];
          break;
        case 3:
          processType = this.inspectRecordForm.listAbn[abnormalIndex][
            "thirdProcessType"
          ];
          break;
      }
      if (typeAttr) {
        this.inspectRecordForm.listAbn[abnormalIndex][typeAttr] = typeIndex;
      }
      this.getProcessType(abnormalIndex, processType);
    },
    //获取处理情况
    getProcessType(abnormalIndex, processTypeId) {
      getProcessTypeTreeApi(processTypeId).then(
        (res) => {
          const abnormal = this.inspectRecordForm.listAbn[abnormalIndex];
          let curAbnormal = {};
          Object.assign(curAbnormal, abnormal, { processList: res.data });

          if (curAbnormal.process) {
            curAbnormal.processModeList = curAbnormal.processList.find(
              (p) => p.id === curAbnormal.process
            )["children"];
          }

          if (curAbnormal.processMode) {
            curAbnormal.processResultsList = curAbnormal.processList
              .find((p) => p.id === curAbnormal.process)
              ["children"].find((p) => p.id === curAbnormal.processMode)[
              "children"
            ];
          }
          const list = this.inspectRecordForm.listAbn;
          list.splice(abnormalIndex, 1, curAbnormal);
          this.$set(this.inspectRecordForm, abnormalIndex, list);
        },
        (err) => {
          console.error(err);
        }
      );
    },
    processChange(abnormalIndex, processType) {
      const curAbnormal = this.inspectRecordForm.listAbn[abnormalIndex];
      let index = "";
      let processAttr = "";
      curAbnormal.processResults = "";
      curAbnormal.processResultsList = [];
      switch (processType) {
        case 1:
          curAbnormal.processMode = "";
          curAbnormal.processRes = "";
          index = curAbnormal.processList.findIndex(
            (p) => p.id === curAbnormal.process
          );
          curAbnormal.processModeList =
            curAbnormal.processList[index]["children"];
          break;
        case 2:
          curAbnormal.processRes = "";
          index = curAbnormal.processModeList.findIndex(
            (p) => p.id === curAbnormal.processMode
          );
          curAbnormal.processResultsList =
            curAbnormal.processModeList[index]["children"];
          break;
      }
      this.inspectRecordForm.listAbn[abnormalIndex][processAttr] = index;
    },
    //打印文书
    docClick() {
      this.checkedDocId = this.finishedDocs
        .filter((f) => this.checkedOffical.indexOf(f.caseDoctypeId) != -1)
        .map((f) => f.caseDocStorageId);
      if (this.checkedDocId.length > 0) {
        this.docVisible = true;
        this.$util.com_getFileStream(this.checkedDocId[0]).then((res) => {
          this.docSrc = res;
        });
      } else {
        this.$messageOne.info({showClose: true, message: '请选择需要打印的文书'});
      }
    },
    //文书dialog
    closeDialog() {
      this.docVisible = false;
    },
    //上下翻页显示pdf
    showNext(flag) {
      this.docVisible = true;
      if (flag == "last") {
        if (this.nowShowPdfIndex) {
          this.nowShowPdfIndex--;
          this.$util
            .com_getFileStream(this.checkedDocId[this.nowShowPdfIndex])
            .then((res) => {
              this.docSrc = res;
            });
        }
      } else {
        if (this.nowShowPdfIndex != this.checkedDocId.length - 1) {
          this.nowShowPdfIndex++;
          this.$util
            .com_getFileStream(this.checkedDocId[this.nowShowPdfIndex])
            .then((res) => {
              this.docSrc = res;
            });
        }
      }
    },

    // 编辑文书
    editDoc(doc){
      this.$refs.editDocDialogRef.showModal(doc);
    }
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

    &-none {
      line-height: 60px;
      color: #909399 !important;
      text-align: center;
      font-size: 14px !important;
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
  .case-abnormal-input {
    >>> .el-input-group__append {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 0;
      opacity: 0;
      height: 100%;
      cursor: pointer;

      button {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
      }
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