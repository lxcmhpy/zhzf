<template>
  <el-dialog
    :visible.sync="visible"
    :title= "title"
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
            <el-button type="primary" size="medium" icon="el-icon-link" @click="saveOrUpdataLinkDoc">关联</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <div style="width: 47%; float: left;">
        <el-table :data="linkDocData" stripe style="width: 100%" height="480">
          <el-table-column label="已关联文书列表">
            <el-table-column type="index" width="60" align="center">
              <template slot="header">序号</template>
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center"></el-table-column>
            <el-table-column prop="status" width="80" label="状态" align="center">
              <template slot-scope="scope">
                <el-switch
                  :value="scope.row.status===0 ? true : false"
                  active-color="#13ce66"
                  @change="editRequired(scope.$index,scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="sort" width="60" label="顺序" align="center">
              <template slot-scope="scope">
                <div>
                  <span
                    v-show="scope.$index != linkDocData.length-1"
                    @click="goDown(scope.row,scope.$index)"
                    class="iconfont law-asc blueC"
                  ></span>
                  <span
                    v-show="scope.$index"
                    @click="goUp(scope.row,scope.$index)"
                    class="iconfont law-desc blueC"
                  ></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sort" width="60" label="顺序" align="center"></el-table-column>
            <el-table-column label="操作" width="60" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="dellinkDoc(scope.row.id,scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 52%; float: left; border-left:3px solid #e9edf6;">
        <el-table
          :data="docData"
          stripe
          @selection-change="getValues"
          style="width: 100%;"
          height="480"
        >
          <el-table-column label="可关联文书列表">
            <el-table-column type="selection" width="55"></el-table-column>
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
  getLinkDocListByTemplateIdApi,
  deleteCatalogLinkDocByIdApi,
  getDocListByTemplateIdApi,
  saveOrUpdateCataLogLinkDocApi,
  updateIsRequiredByIdApi
} from "@/api/caseHandle";
export default {
  data() {
    return {
      docData: [],
      linkDocData: [],
      datas: [],
      title: "",
      total: 0,
      visible: false,
      templateId: "",
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
    dellinkDoc(id, a) {
      let arr = [];
      this.datas = JSON.stringify(arr);
      this.linkDocData.forEach((item, index) => {
        if (index > a) {
          arr.push({
            id: item.id,
            templateId: item.templateId,
            docId: item.docId,
            createTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
            sort: this.linkDocData[index - 1].sort,
            status: item.status
          });
        }
      });
      this.datas = JSON.stringify(arr);
      deleteCatalogLinkDocByIdApi(id).then(
        res => {
          if (arr.length > 0) {
            this.saveOrUpdataLinkDoc();
          } else {
            this.getDocList();
            this.getLinkDocList();
          }
        },
        error => {
          console.log(error);
        }
      );
    },
    //改变关联文书状态
    editRequired(index, row) {
      let status = row.status === 0 ? 1 : 0;
      let linkData = {
        id: row.id,
        templateId: row.templateId,
        docId: row.docId,
        createTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
        sort: row.sort,
        status: status
      };
      updateIsRequiredByIdApi(linkData).then(
        res => {
          this.$set(this.linkDocData[index], "status", linkData.status);
        },
        error => {
          console.log(error);
        }
      );
    },
    getValues(val) {
      let _this = this;
      let length = this.total + 1;
      let arr = [];
      val.forEach(item => {
        arr.push({
          templateId: _this.templateId,
          docId: item.id,
          createTime: new Date().format("yyyy-MM-dd HH:mm:ss"),
          sort: length++,
          status: 0
        });
      });
      this.datas = JSON.stringify(arr);
    },
    //关联文书
    saveOrUpdataLinkDoc() {
      saveOrUpdateCataLogLinkDocApi(this.datas).then(
        res => {
          this.getLinkDocList();
          this.getDocList();
        },
        error => {
          console.log(error);
        }
      );
    },
    showModal(data) {
      this.visible = true;
      this.templateId = data.id;
      this.title = data.name;
      console.log("this",this.title)
      this.getLinkDocList();
      this.getDocList();
    },
    getDocList() {
      let _this = this;
      let data = {
        id: this.templateId,
        name: this.searchForm.name
      };
      getDocListByTemplateIdApi(data).then(
        res => {
          _this.docData = res.data;
        },
        error => {
          console.log(error);
        }
      );
    },
    getLinkDocList() {
      let _this = this;
      let data = {
        templateId: this.templateId,
        name: this.searchLinkDocForm.name
      };
      getLinkDocListByTemplateIdApi(data).then(
        res => {
          _this.linkDocData = res.data;
          _this.total = res.data.length;
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
    //向上排序
    goDown(row, index) {
      let sort = row.sort;
      this.linkDocData[index].sort = this.linkDocData[index + 1].sort;
      this.linkDocData[index + 1].sort = sort;
      this.datas = JSON.stringify(this.linkDocData);
      this.saveOrUpdataLinkDoc();
    },
    //向下排序
    goUp(row, index) {
      let sort = row.sort;
      this.linkDocData[index].sort = this.linkDocData[index - 1].sort;
      this.linkDocData[index - 1].sort = sort;
      this.datas = JSON.stringify(this.linkDocData);
      this.saveOrUpdataLinkDoc();
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
<style lang="scss" src="@/assets/css/basicStyles/common.scss">
</style>
