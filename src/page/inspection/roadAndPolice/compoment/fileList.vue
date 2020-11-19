<template>
  <div class="com_searchAndpageBoxPadding">
    <div class="searchAndpageBox" style="overflow: hidden">
      <el-button type="primary" size="medium" @click="goBack">返回</el-button>
      <div class="search-input-right-box" style="margin-bottom: 24px">
        文书名称
        <span class="search-input-right">
          <el-input v-model="searchValue"></el-input>
        </span>
        <el-button
          icon="el-icon-search"
          type="primary"
          size="medium"
          @click="handleSearch"
        ></el-button>
      </div>

      <!-- ································列表部分 ································-->
      <div class="tablePart" style="clear: both">
        <el-table
          :data="tableList"
          stripe
          style="width: 100%"
          height="100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="55"
          ></el-table-column>
          <el-table-column
            prop="docName"
            label="记录文书"
            align="center"
          ></el-table-column>
          <el-table-column label="信息填报情况" align="center">
            <template slot-scope>
              <span
                v-for="(item, index) in statusList"
                :key="index"
                :style="item.value == 0 ? 'color:gray' : 'color:#039ADF'"
                style="margin-right: 10px"
                >{{ item.name }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center"
          ></el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.status == '完成'"
                @click="viewDocument(scope.row)"
                type="text"
                >查看</el-button
              >
              <el-button
                v-show="scope.row.status !== '完成'"
                @click="editDocument(scope.row)"
                type="text"
                >编辑</el-button
              >
              <!-- <el-tooltip class="item" effect="dark" content="暂未开发" placement="top-start">
                  

                <span v-if="scope.row.status=='完成'">
                  <el-button @click="viewDocument(scope.row)" type="text">查看</el-button>
                  <el-button :disabled="!inspectionFileEdit" type="text" @click="revokeDocument(scope.row.id)">撤销</el-button>
                </span>
                <span v-else>
                  <el-button :disabled="true" @click="editDocument(scope.row)" type="text">编辑</el-button>
                  
                </span>
              </el-tooltip> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import {
  getDocListById,
  changeFileStatus,
  getDocListByName,
  delDocumentById,
  updatePicPath,
  findCarInfoByIdApi,
  findCarInfoFileByIdApi,
} from "@/api/inspection";
import { deleteFileByIdApi, uploadCommon } from "@/api/upload.js";
import Vue from "vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      searchValue: "",
      tableList: [], //文书列表数据
      statusList: [],
    };
  },
  computed: {
    ...mapGetters([
      "inspectionFileEdit",
      "penaltyDecisionId",
      "inspectionOverWeightId",
    ]),
  },
  methods: {
    
    // 编辑文书
    editDocument(item) {
      debugger
      console.log(" -> item", item)
      if (this.validateAllCompeleted()) {
        alert('暂未开发完成')
        // this.$router.push({
        //   name: "inspection_myPDF",
        //   params: { id: item.id, storagePath: item.pdfStorageId },
        // });
        return
      } else {
        this.$message.warning('请将信息填写完整后再试！')
        return
      }
      // debugger
      // if (item.pdfStorageId && item.status != "暂存") {
      //   this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      //   this.$router.push({
      //     name: "inspection_myPDF",
      //     params: { id: item.id, storagePath: item.pdfStorageId },
      //   });
      // } else {
      //   this.$store.commit("set_inspection_fileId", item.id);
      //   this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      //   this.$router.push({
      //     name: item.path,
      //     params: { id: item.id, addOrEiditFlag: "add" },
      //   });
      //   // 写表单
      //   this.$emit("changeModleId", item);
      // }
    },
    // 查看文书
    viewDocument(item) {
      this.$store.commit("set_inspection_fileId", item.id);
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.push({
        name: "inspection_myPDF",
        params: {
          id: item.id,
          storagePath: item.pdfStorageId || item.picStorageId,
        },
      });
    },

    // 撤销文书
    revokeDocument(item) {
      this.$confirm("确认删除当前记录文书？", "删除记录文书", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        delDocumentById(item).then(
          (res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getTableData();
            }
          },
          (error) => {}
        );
      });
    },

    //验证是否都填写完成
    validateAllCompeleted() {
      return this.statusList.every((item) => {
        return item.value === "1";
      });
    },

    // 构建信息填报情况数据
    setOverList(res) {
      this.statusList = [
        { name: "车辆", lable: "", value: res.data.required },
        {
          name: "驾驶人/企业",
          lable: "",
          value: res.data.drivePerson.required,
        },
        {
          name: "初检数据",
          lable: "",
          value: res.data.firstCheck.required,
        },
        {
          name: "卸货/复检",
          lable: "",
          value: res.data.secondCheck.required,
        },
      ];
    },

    //获取列表数据
    getTableData() {
      findCarInfoByIdApi(this.inspectionOverWeightId).then(
        (res) => {
          this.setOverList(res);
          findCarInfoFileByIdApi(res.data.penaltyDecision.id).then(
            (res2) => {
              if (res2.code == 200) {
                this.tableList = res2.data;
                console.log(" -> this.tableList", this.tableList);
              }
            },
            (error) => {}
          );
        },
        (error) => {}
      );
    },

    //点击搜索
    handleSearch() {
      let _this = this;
      if (this.searchValue == "") {
        this.getTableData();
      } else {
        let data = {
          docName: _this.searchValue,
          orderId: _this.penaltyDecisionId,
        };
        getDocListByName(data).then(
          (res) => {
            console.log(res);
            if (res.code == 200) {
              _this.tableList = res.data || [];
            }
          },
          (error) => {}
        );
      }
    },

    handleSelectionChange(item) {},

    // 点击返回
    goBack() {
      this.$store.dispatch("deleteTabs", this.$route.name); //关闭当前页签
      this.$router.go(-1)
      // this.$router.push({
      //   name: "inspection_overWeightForm",
      // });
    },
  },
  created() {
    this.getTableData();
  },
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>