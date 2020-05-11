<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="50%"
  >
    <div class="header">
      <div class="top">
        <span>考场</span>
        <div>考场1 00/50 删除</div>
        <div>考场2 00/50 删除</div>
        <div>
          <el-button type="text" @click="addRoomInfo">添加考场</el-button>
        </div>
      </div>
      <table  style="height:100%;border-color:000000;border-left-style:solid;border-width:1px"><tr><td valign="top"></td></tr></table>
      <div  class="top1">
        <div  class="item">
          <el-form el-form ref="roomDispathFormRef" :model="roomDispathForm" label-width="120px">
            <el-row>
              <div style="float:left;">
                <span>考生</span>
              </div>
              <div style="float:right;">
                <el-button type="primary" @click="autoDispath">自动分配</el-button>
              </div>
            </el-row>

            <el-row>
              <el-form-item prop="personName" label="姓名">
                <el-input v-model="roomDispathForm.perosnName"></el-input>
              </el-form-item>
              <el-form-item prop="idNo" label="身份证号">
                <el-input v-model="roomDispathForm.idNo"></el-input>
              </el-form-item>
              <el-form-item prop="oname" label="所属机构">
                <el-input v-model="roomDispathForm.oname"></el-input>
              </el-form-item>
              <el-form-item style="margin-left:20px;">
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="getRoomDispathList"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetLog"
                ></el-button>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  size="medium"
                  @click="addPersonInfo('','1')"
                >新增人员</el-button>
                <el-button
                  style="background-color:#4aafa7;color:white"
                  icon="el-icon-delete-solid"
                  size="medium"
                  @click="deletePersonInfo"
                >移除人员</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </div>
        <div>
          <el-table :data="tableDate" resizable stripe>
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column prop="personName" label="姓名" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" align="center" :formatter="sexFormat"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" align="center"></el-table-column>
            <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="postName" label="职务" align="center"></el-table-column>
            <el-table-column prop="area" label="执法领域" align="center"></el-table-column>
          </el-table>
        </div>

        <div class="item" style="text-align:right">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
            <el-button @click="visible = false">取 消</el-button>
          </span>
        </div>
      </div>

      <addRoomComp ref="addRoomCompRef" @getRoomDispathInfo="getRoomDispathList"></addRoomComp>
    </div>
  </el-dialog>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addRoomComp from "./addRoom";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      roomDispathForm: {
        roomDispathFormRef: "",
        idNo: "",
        oname: ""
      },
      tableDate:[],
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2  查看3
      isDisabled: true,
      visible: false
    };
  },
  components: {
    addRoomComp
  },
  methods: {
    showModal(type, data) {
      let _this = this;
      _this.visible = true;
      _this.dialogtitle = "考场分配";
    },
    selectData() {},
    submit() {},
    getRoomDispathList() {},
    addRoomInfo() {
      let data = {};
      this.$refs.addRoomCompRef.showModal(1, data);
    },
    autoDispath() {
      console.info("自动分配");
    },
    addPersonInfo() {},
    deletePersonInfo() {},
    resetLog() {},
    closeDialog() {
      this.visible = false;
      //this.$refs["addExamBatchFormRef"].resetFields();
      this.errorName = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/personManageTitle.scss";
.top {
  margin: 4% 4% 4% 2%;
  width: 20%;
  height: 100%;
  font-size: 18px;
  font-weight: 900;
  line-height: 200%;
  float: left;
}

.top1 {
  margin: 4% 4% 4% 2%;
  width: 60%;
  line-height: 110%;
  
  // height: 100%;
  float: left;
}
.header {
  //  width: 100%;
  height: 500px;
  //  background-color:;
}
</style>
