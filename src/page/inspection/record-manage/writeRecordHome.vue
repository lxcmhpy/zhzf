<template>
  <div class="com_searchAndpageBoxPadding write-record-home-wrapper">
    <div class="out-box">
      <div class="search-input-left-box">
        <span class="mould-name"> 模板名称 </span>
        <span class="search-input-right">
          <el-input v-model="searchModleName"></el-input>
        </span>
        <el-button
          class="search-btn"
          icon="el-icon-search"
          type="primary"
          size="medium"
          @click="handleSearch"
        ></el-button>
      </div>
      <!-- 收藏 -->
      <div class="content-box">
        <div class="menu-box" v-show="showMenu">
          <el-menu
            :default-active="currentMenu"
            class="mould-left-menu"
            @open="handleOpen"
            @close="handleClose"
            @select="handleMenuChange"
            background-color="rgb(236, 242, 255)"
            text-color="#667589"
            active-text-color="rgb(69, 115, 208)"
          >
            <el-menu-item
              :index="item.domain"
              v-for="item in menuList"
              :key="item.id"
            >
              <div slot="title">
                <!-- <span class="menu-item-img"></span> -->
                <span :class="item.iconClass"></span>
                <span class="menu-item-text">
                  {{ item.domain }}
                </span>

                <span class="count-text" v-if="item.templateList"
                  >({{ item.templateList.length }})</span
                >
              </div>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="mould-list-box" v-show="showMenu">
          <ul>
            <li class="mould-item" v-for="item in currentList" :key="item.id">
              <div :class="item.bgcName" @click="writeRecord(item)">
                <span :class="{ star: item.isCollect == 1 }"></span>
                <span class="text" :title="item.title">
                  {{ item.title }}
                </span>
                <span class="bottom-img"></span>
                <div class="btns-box">
                  <span
                    style="color: blue; font-size: 14px"
                    @click.stop="editModle(item)"
                    >修改</span
                  >&emsp;
                  <span
                    style="color: blue; font-size: 14px"
                    @click.stop="delModle(item)"
                    >删除</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mould-list-box" v-show="!showMenu">
          <div class="search-title">
            <span class="back-btn" @click="handleSearchBack">
              <i class="icon el-icon-arrow-left"></i>返回
            </span>
            <!-- <el-button type="primary" icon="el-icon-arrow-left" @click="handleSearchBack">返回</el-button> -->
            <span>搜索结果({{ searchList.length }})</span>
          </div>
          <ul>
            <li class="mould-item" v-for="item in searchList" :key="item.id">
              <div :class="item.bgcName" @click="writeRecord(item)">
                <span :class="{ star: item.isCollect == 1 }"></span>
                <span class="text" :title="item.title">
                  {{ item.title }}
                </span>
                <span class="bottom-img"></span>
                <div class="btns-box">
                  <span
                    style="color: blue; font-size: 14px"
                    @click.stop="editModle(item)"
                    >修改</span
                  >&emsp;
                  <span
                    style="color: blue; font-size: 14px"
                    @click.stop="delModle(item)"
                    >删除</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <preview ref="previewRef" @userList="getPreviewList"></preview>
    <addModle ref="addModleRef" @getAddModle="getAddModle"></addModle>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";
import preview from "./previewDialog.vue";
import addModle from "./addModle.vue";
import cloneDeep from "lodash";
import {
  findRecordlModleByNameApi,
  findRecordModleByIdApi,
  removeMoleByIdApi,
  findRecordModleByNameIdApi,
  findRecordModleByPersonApi,
  findUserCollectTemplateApi,
  removeMoleCollectByIdApi,
} from "@/api/inspection";
import Vue from "vue";
import { mapGetters } from "vuex";
const strMap = {
  常用模板: "bgc0",
  公路路政: "bgc1",
  水路运政: "bgc2",
  道路运政: "bgc3",
  海事行政: "bgc4",
  // 运政通用型检查记录:'bgc4',
  航道行政: "bgc5",
  港口行政: "bgc6",
  工程质量监督: "bgc7",
  其他: "bgc8",
};
export default {
  components: {
    preview,
    addModle,
  },
  data() {
    return {
      delTag: "",
      searchList: [],
      showMenu: true,
      menuList: [],
      listMap: {},
      currentList: [], //右侧当前展示的模板列表
      currentMenu: "",
      isHome: true,
      searchModleName: "",
      compData: [],
      viewFlag: [],
      modleList: [],
      modleSaveList: [], //收藏列表
      modleSaveListDefaut: [], //收藏列表
      currentUserLawId: "",
      modleSaveListFlag: true,
      showSave: true,
    };
  },
  methods: {
    //   getCurrentMenu () {
    // 	// 获取当前页面 菜单刷新后能自动选中
    // 	let currentUrl = window.location.href
    // 	let currentPage = currentUrl.split('/')[3].replace('#', '')
    // 	this.currentMenu = currentPage
    // },
    handleSearchBack() {
      this.searchModleName = "";
      this.handleSearch();
    },
    handleOpen() {},
    handleClose() {},
    handleMenuChange(val) {
      console.log("handleMenuChange -> val", val);
      this.currentMenu = val;
      this.currentList = this.listMap[val];
      console.log(" -> this.currentList", this.currentList);
    },
    addNewModle() {
      this.$refs.addModleRef.showModal();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    //改变模块背景色
    addClassName(arr) {
      arr.forEach((item) => {
        item.iconClass = strMap[item.domain] + " menu-item-img";
        item.templateList.forEach((it) => {
          it.bgcName = strMap[it.domain];
        });
      });
    },

    //搜索结果添加类名
    addClassNameSearch(arr) {
      arr.forEach((item) => {
        item.bgcName = strMap[item.domain];
      });
    },
    //查询
    getAddModle(list) {
      console.log("getAddModle", list);
      this.getOtherMouldList();
    },
    //查询
    getPreviewList(list) {
      console.log("getPreviewList", list);
      setTimeout(() => {}, 100);
    },
    // 选择模板
    writeRecord(item) {
      // 写记录
      this.$router.push({
        name: "inspection_writeInfoRecord",
        // params: item
        // query: { id: item.id, addOrEiditFlag: 'add' }
        params: {
          id: item.id,
          addOrEiditFlag: "add",
        },
      });

      // this.$store.commit("set_inspection_orderId", item.id);
    },
    // 修改模板
    editModle(item) {
      console.log("选中的模板", item);
      this.$refs.addModleRef.showModal(item);
    },
    // 删除模板
    delModle(item) {
      this.delTag = this.currentMenu;
      // console.log("caidan", this.currentMenu);
      // console.log("选中的模板", item);
      // console.log("menuList", this.menuList);
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("删除", item.id);
        let data = {
          id: item.id,
          userId: iLocalStroage.gets("userInfo").id,
        };

        removeMoleByIdApi(data).then(
          (res) => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getMenuList().then((res) => {
                this.currentMenu = this.delTag;
                this.menuList.forEach((item) => {
                  if (item.domain == this.currentMenu) {
                    this.currentList = item.templateList;
                  }
                });
              });
            }
          },
          (error) => {
            // reject(error);
          }
        );
      });
    },
    // 预览
    preview() {
      this.$refs.previewRef.showModal(this.compData);
    },
    handleChange(val) {
      console.log(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //获取收藏模板列表（常用列表）
    getUserCollectMouldList() {
      let  data={userId:iLocalStroage.gets("userInfo").id};
      return new Promise((resolve, reject) => {
        findUserCollectTemplateApi(data).then(
          (res) => {
            if (res.data) {
              this.modleSaveList = res.data;
              this.modleSaveListDefaut = JSON.parse(JSON.stringify(res.data));
              resolve(res);
            }
          },
          (error) => {
            // reject(error);
          }
        );
      });
    },

    // 获取模板列表（常用列表除外）
    getOtherMouldList() {
      let data = {
        organId: iLocalStroage.gets("userInfo").organId,
        // templateUserId: this.currentUserLawId
        templateUserId: iLocalStroage.gets("userInfo").id,
      };
      return new Promise((resolve, reject) => {
        findRecordModleByPersonApi(data).then(
          (res) => {
            if (res.data) {
              this.modleList = res.data;

              resolve(res);
            }
          },
          (error) => {}
        );
      });
    },

    //点击搜索
    handleSearch() {
      if (this.searchModleName == "") {
        this.showMenu = true;
      } else {
        this.showMenu = false;
        this.modleSaveList = [];
        let data = {
          title: this.searchModleName,
          templateUserId: iLocalStroage.gets("userInfo").id,
          organId: iLocalStroage.gets("userInfo").organId,
        };
        findRecordModleByNameIdApi(data).then(
          (res) => {
            if (res.code == 200) {
              if (res.data && res.data.length) {
                this.showMenu = false;
                this.addClassNameSearch(res.data);
                this.searchList = res.data;
              } else {
                this.searchList = [];
                this.$message({ message: "暂无内容", type: "warning" });
              }
            }
          },
          (error) => {}
        );
      }
    },
    //默认设置执法人员为当前用户 需要用用户的id去拿他作为执法人员的id
    // setLawPersonCurrentP() {
    //   let _this = this
    //   this.$store
    //     .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
    //     .then(
    //       res => {
    //         console.log('执法人员列表', res)
    //         let currentUserData = {};
    //         res.data.forEach(item => {
    //           if (
    //             item.userId == iLocalStroage.gets("userInfo").id
    //           ) {
    //             _this.currentUserLawId = item.id;
    //             _this.getOtherMouldList()
    //           }
    //         });
    //       },
    //       err => {
    //         console.log(err);
    //       }
    //     );
    // },

    //获取列表数据后拼凑数据
    async getMenuList() {
      await Promise.all([
        this.getUserCollectMouldList(),
        this.getOtherMouldList(),
      ]).then((res) => {
        let arr = [
          {
            domain: "常用模板",
            templateList: this.modleSaveList,
          },
          ...this.modleList,
        ];
        arr.forEach((item) => {
          this.listMap[item.domain] = item.templateList;
        });
        this.menuList = arr;
        this.addClassName(this.menuList);

        this.currentMenu = "常用模板";
        this.currentList = this.modleSaveList;
      });
    },
  },
  created() {
    this.getMenuList();
  },
};
</script>
<style lang="scss" src="@/assets/css/card.scss"></style>
<style lang="scss">
.write-record-home-wrapper {
  & > .out-box {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 22px;
    padding: 20px;
    height: 100%;
    background: #fff;
    -webkit-box-shadow: 0px 6px 4px 0px rgba(94, 137, 181, 0.1);
    box-shadow: 0px 6px 4px 0px rgba(94, 137, 181, 0.1);
  }
  .searchAndpageBox {
    height: 100%;
  }
  .search-input-left-box {
    .mould-name {
      color: #7b7b7b;
    }
    .search-btn {
      margin-left: 10px;
    }
  }
  .content-box {
    border: 1px solid #bec5d4;
    margin-top: 15px;
    height: calc(100% - 49px);
    display: flex;
    .menu-box {
      width: 200px;
      height: 100%;
      background: rgb(236, 242, 255);
      overflow: auto;

      .el-menu-item {
        padding-left: 65px;
        &.is-active {
          .bgc0 {
            background-image: url("../../../../static/images/img/record/0-80@2x.png");
          }
          .bgc1 {
            background-image: url("../../../../static/images/img/record/0-81@2x.png");
          }
          .bgc2 {
            background-image: url("../../../../static/images/img/record/0-82@2x.png");
          }
          .bgc3 {
            background-image: url("../../../../static/images/img/record/0-83@2x.png");
          }
          .bgc4 {
            background-image: url("../../../../static/images/img/record/0-84@2x.png");
          }
          .bgc5 {
            background-image: url("../../../../static/images/img/record/0-85@2x.png");
          }
          .bgc6 {
            background-image: url("../../../../static/images/img/record/0-86@2x.png");
          }
          .bgc7 {
            background-image: url("../../../../static/images/img/record/0-87@2x.png");
          }
          .bgc8 {
            background-image: url("../../../../static/images/img/record/0-88@2x.png");
          }
        }
        & > div {
          position: relative;
          .menu-item-img {
            display: inline-block;
            width: 25px;
            height: 25px;
            // background: url("../../../../static/images/img/record/icon_gl.png")
            // no-repeat;
            background-size: 25px;
          }
          .bgc0 {
            background-image: url("../../../../static/images/img/record/80@2x.png");
          }
          .bgc1 {
            background-image: url("../../../../static/images/img/record/81@2x.png");
          }
          .bgc2 {
            background-image: url("../../../../static/images/img/record/82@2x.png");
          }
          .bgc3 {
            background-image: url("../../../../static/images/img/record/83@2x.png");
          }
          .bgc4 {
            background-image: url("../../../../static/images/img/record/84@2x.png");
          }
          .bgc5 {
            background-image: url("../../../../static/images/img/record/85@2x.png");
          }
          .bgc6 {
            background-image: url("../../../../static/images/img/record/86@2x.png");
          }
          .bgc7 {
            background-image: url("../../../../static/images/img/record/87@2x.png");
          }
          .bgc8 {
            background-image: url("../../../../static/images/img/record/88@2x.png");
          }
        }

        .count-text {
        }
      }
      .is-active {
        background-color: #fff !important;
      }
      .mould-left-menu {
      }
    }
    // .cl-right {
    // height: 100%;
    .mould-list-box {
      height: 100%;
      flex: 1;
      overflow-y: auto;
      .search-title {
        margin: 0 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #979797;
        height: 38px;
        line-height: 38px;
        .back-btn {
          color: #646974;
          font-size: 14px;
          cursor: pointer;
        }
      }
      & > ul {
        display: flex;
        flex-wrap: wrap;
        .mould-item {
          padding: 7px;
          margin: 20px;
          width: 103px;
          height: 113px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0px 2px 5px 0px rgba(30, 50, 92, 0.16);
          & > div:hover {
            .btns-box {
              display: block;
            }
          }
          & > div {
            height: 100%;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            cursor: pointer;

            .text {
              width: 77px;
              line-height: 16px;
              color: #20232b;
              word-wrap: break-word;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .bottom-img {
              width: 27px;
              height: 27px;
              position: absolute;
              bottom: 0;
              background-image: url("../../../../static/images/img/record/mould-foot.png");
              background-size: 27px;
              background-repeat: no-repeat;
            }
            .star {
              position: absolute;
              top: 0;
              right: 0;
              width: 25px;
              height: 25px;
              background-image: url("../../../../static/images/img/record/star.png");
              background-size: 25px;
              background-repeat: no-repeat;
            }

            .btns-box {
              margin-bottom: 0px;
              position: absolute;
              display: none;
              bottom: 0px;
              height: 20px;
              text-align: center;
            }
          }
          .bgc1 {
            background: linear-gradient(45deg, #cdddf1, #f4faff);
          }
          .bgc2 {
            background: linear-gradient(45deg, #f1dbcd, #fbf4ef);
          }
          .bgc3 {
            background: linear-gradient(45deg, #c9bbe1, #fbf0fd);
          }
          .bgc4 {
            background: linear-gradient(45deg, #eef1cd, #f7f8ec);
          }
          .bgc5 {
            background: linear-gradient(45deg, #cecdf1, #efeef9);
          }
          .bgc6 {
            background: linear-gradient(45deg, #bedfc0, #f1f9f1);
          }
          .bgc7 {
            background: linear-gradient(45deg, #f1cdcd, #fdf2f2);
          }
          .bgc8 {
            background: linear-gradient(45deg, #e6e6e6, #fafafa);
          }
        }
      }
    }
    // }
  }
}
</style>
