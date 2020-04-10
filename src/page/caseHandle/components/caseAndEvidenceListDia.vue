<template>
  <el-dialog
    title="选择已上传证据"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    top="60px"
    width="405px"
    append-to-body
    custom-class="caseAndEvidenceListDiaClass"
  >
    <div>
      <el-button-group>
        <el-button :type="primary1" @click="getCaseList">文书 ({{chooseNum1}}/{{totalNum1}})</el-button>
        <el-button :type="primary2" @click="getPicList(true)">照片 ({{chooseNum2}}/{{totalNum2}})</el-button>
      </el-button-group>
      <ul>
          <!-- 文书列表 -->
          <el-checkbox-group v-model="checkList" @change="changeCheck" v-show="primary1=='primary'">
            <li v-for="(item,index) in evidencesList" :key="index">
                <!-- <template v-if="item.name">
                    <el-checkbox :label="item.name" >{{item.name}}</el-checkbox>
                </template>
                <template v-else>
                    <el-checkbox :label="item.evName" >{{item.evName}}</el-checkbox>
                </template>     -->
                    <el-checkbox :label="item.name" >{{item.name}}</el-checkbox>

            </li>
          </el-checkbox-group>
          <!-- 照片列表 -->
          <el-checkbox-group v-model="checkListPic" @change="changeCheckPic" v-show="primary2=='primary'">
            <li v-for="(item,index) in picList" :key="index">
                <!-- <template v-if="item.name">
                    <el-checkbox :label="item.name" >{{item.name}}</el-checkbox>
                </template>
                <template v-else>
                    <el-checkbox :label="item.evName" >{{item.evName}}</el-checkbox>
                </template>     -->
                    <el-checkbox :label="item.evName" >{{item.evName}}</el-checkbox>

            </li>
          </el-checkbox-group>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="sendEvidence">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import { findByCaseBasicInfoIdApi,findEvidencePicApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      primary1: "primary",
      primary2: "",
      evidencesList: [], //已完成文书
      picList:[], //上传的图片证据
      checkList:[],
      checkListPic:[],
      chooseNum1:0,
      chooseNum2:0,
      totalNum1:0,
      totalNum2:0,
    };
  },
  mixins: [mixinGetCaseApiList],
  computed: { ...mapGetters(["caseId"]) },
  methods: {
    showModal(tableData) {
      this.visible = true;
      this.getCaseList();
      this.getPicList(false);
      console.log(tableData);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //获取已完成文书列表
    getCaseList() {
        this.primary1="primary";
        this.primary2="";
      let _this = this
      findByCaseBasicInfoIdApi(this.caseId).then(
        res => {
          console.log(res);
          _this.evidencesList = res.data;
          _this.totalNum1 = _this.evidencesList.length;
        },
        error => {
          console.log(error);
        }
      );
    },
    //获取证据图片
    getPicList(flag) {
        if(flag){
            this.primary1="";
            this.primary2="primary";
        }

        let data={
            caseId:this.caseId,
            evType:"视频"
        }
        let _this = this
        findEvidencePicApi(data).then(
        res => {
          console.log(res);
          _this.picList = res.data;
          _this.totalNum2 = _this.picList.length;
        },
        error => {
          console.log(error);
        }
      );
    },
    // 更改选中条数
    changeCheck(val){
        console.log(val);
        this.chooseNum1 = val.length;
    },
    changeCheckPic(val){
          this.chooseNum2 = val.length;
    },
    sendEvidence() {
        let allCheck = [...this.checkList,...this.checkListPic];
        this.visible = false;
        this.$emit('sendEvidenceEmit',allCheck)
    }
  }
};
</script>

