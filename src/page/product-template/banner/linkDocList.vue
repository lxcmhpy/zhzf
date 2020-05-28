<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="false"
    @close="closeDialog"
    width="75%"
    append-to-body
  >
    <div>
      <div style="width: 47%;float: left;">
        <el-form :inline="true" :model="searchLinkDocForm" class="demo-form-inline" size="mini">
          <el-form-item label="文书名称">
            <el-input v-model="searchLinkDocForm.name" clearable placeholder="请输入文书名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getLinkDocList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 52%; float: left; border-left:3px ;float: left;">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline" size="mini">
          <el-form-item label="文书名称">
            <el-input v-model="searchForm.name" clearable placeholder="请输入文书名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-search" @click="getDocList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" icon="el-icon-link" @click="saveLinkDoc">关联</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <div style="width: 47%; float: left;">
        <el-table :data="linkDocData" highlight-current-row style="width: 100%" height="480">
          <el-table-column label="已关联文书列表">
            <el-table-column type="index" width="60" align="center">
              <template slot="header">序号</template>
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="isRequired" width="80" label="是否必填" align="center">
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.isRequired===0 ? true : false"
                  active-color="#13ce66"
                  @change="editRequired(scope.$index,scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="sort" width="60" label="顺序" align="center"></el-table-column>
            <el-table-column label="操作" width="60" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="dellinkDoc(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-divider direction="vertical" style="height:100%"></el-divider> -->
      <div style="width: 52%; float: left; border-left:3px solid #e9edf6;">
        <el-table
          :data="docData"
          highlight-current-row
          @selection-change="getValues"
          style="width: 100%;"
          height="480"
        >
          <el-table-column label="可关联文书列表">
            <el-table-column type="selection" @selection-change="getValues" width="55"></el-table-column>
            <el-table-column type="index" width="60" align="center">
              <template slot="header">序号</template>
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="remark" label="案件类型" align="center"></el-table-column>
            <el-table-column prop="sort" width="60" label="顺序" align="center"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {
  getLinkDocListByLinkTypeIdApi,
  delLinkDocByIdApi,
  getDocListByLinkTypeIdApi,
  saveOrUpdateCaseLinkDocApi,
  updateIsRequiredByIdApi
} from "@/api/caseHandle";
export default {
  data() {
    return {
      docData: [],
      linkDocData: [],
      datas: [],
      currentPage: 1, //当前页
      pageSize: 10, //pagesize
      totalPage: 0, //总页数
      total: 0,
      visible: false,
      linkTypeId: "",
      searchForm: {
        name: ""
      },
      searchLinkDocForm: {
        name: ""
      }
    };
  },
  inject: ["reload"],
  methods: {
    //删除关联文书
    dellinkDoc(val) {
      delLinkDocByIdApi(val).then(
        res => {
          this.getLinkDocList();
          this.getDocList();
        },
        error => {
          console.log(error);
        }
      );
    },
    //改变关联文书必填状态
    editRequired(index, row) {
      let isRequired = row.isRequired === 0 ? 1 : 0;
      let linkData = {
        id: row.id,
        linkTypeId: row.linkTypeId,
        docId: row.docId,
        createTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
        processId: row.processId,
        isRequired: isRequired
      };
      updateIsRequiredByIdApi(linkData).then(
        res => {
          this.$set(this.linkDocData[index], "isRequired", linkData.isRequired);
        },
        error => {
          console.log(error);
        }
      );
    },
    getValues(val) {
      console.log("val", val);
      let _this = this;
      let arr = [];
      val.forEach(item => {
        arr.push({
          linkTypeId: _this.linkTypeId,
          docId: item.id,
          createTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
          processId: "",
          isRequired: 1
        });
      });
      this.datas = JSON.stringify(arr);
      console.log("arr", arr);
      console.log("this.datas", this.datas);
    },
    //关联文书
    saveLinkDoc() {
      let _this = this;
      saveOrUpdateCaseLinkDocApi(this.datas).then(
        res => {
          this.getLinkDocList();
          this.getDocList();
        },
        error => {
          console.log(error);
        }
      );
    },
    showModal(linkTypeId) {
      this.visible = true;
      this.linkTypeId = linkTypeId;
      console.log("linkTypeId", this.linkTypeId);
      this.getLinkDocList();
      this.getDocList();
    },
    getDocList() {
      let _this = this;
      let data = {
        linkTypeId: this.linkTypeId,
        name: this.searchForm.name
      };
      console.log("canshu", data);
      getDocListByLinkTypeIdApi(data).then(
        res => {
          _this.docData = res.data;
          console.log("docData", _this.docData);
        },
        error => {
          console.log(error);
        }
      );
    },
    getLinkDocList() {
      //根据模板Id查询模版问题
      let _this = this;
      let data = {
        linkTypeId: this.linkTypeId,
        name: this.searchLinkDocForm.name
      }
      getLinkDocListByLinkTypeIdApi(data).then(
        res => {
          _this.linkDocData = res.data;
          console.log("linkDocData", _this.linkDocData);
        },
        error => {
          console.log(error);
        }
      );
    },
    //删除
    deleteLinkDoc(id) {
      let _this = this;
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delLinkDocByIdApi(id).then(
            res => {
              _this.getDocList();
              _this.getLinkDocList();
              _this.$message({
                type: "success",
                message: "删除成功!"
              });
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {});
    },
    closeDialog() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" src="@/assets/css/systemManage.scss">
/* @import "@/assets/css/systemManage.scss"; */
</style>
