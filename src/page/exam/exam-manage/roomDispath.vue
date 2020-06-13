<template>
  <el-dialog
    class="room-dispath"
    :title="dialogTitle"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="100%"
  >
    <el-row type="flex">
      <el-col :span="7">
        <div class="room-wrap">
          <div class="room-wrap-title">
            <span class="wrap-title">考场</span>
          </div>
          <div class="room-wrap-cnt">
            <div
              class="room-list"
              :class="{'active': nowRoom === item.roomId}"
              v-for="item in roomList"
              :key="item.roomId"
              @click="getNowRoom(item.roomId)"
            >
              <span class="room-name" style="width: 40%;" :title="item.roomName">{{item.roomName}}</span>
              <span style="width: 40%;">{{item.alreadyNum}}/{{item.roomSum}}</span>
              <span>
                <el-button type="text" @click.stop="deleteRoom(item.roomId)">删除</el-button>
              </span>
            </div>
            <el-button class="add-room" icon="el-icon-plus" @click="addRoomInfo">添加考场</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="17" style="border-left: 1px solid #D6DBE3;">
        <div class="room-wrap">
          <div class="room-wrap-title">
            <span class="wrap-title">考生</span>
            <div class="top-handle">
              <span class="assign-total">尚有{{unDispachNum}}人未分配</span>
              <el-button type="primary" size="medium" @click="autoDispath">自动分配</el-button>
            </div>
          </div>
          <!-- 主体内容 -->
          <div class="search-panel">
            <el-form
              :inline="true"
              ref="roomDispathFormRef"
              :model="roomDispathForm"
              label-width="68px"
            >
              <el-form-item prop="personName" label="姓名">
                <el-input v-model="roomDispathForm.personName" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item prop="idNo" label="身份证号">
                <el-input v-model="roomDispathForm.idNo" placeholder="请输入身份证号码"></el-input>
              </el-form-item>
              <el-form-item prop="oname" label="所属机构">
                <el-input v-model="roomDispathForm.oname" placeholder="请输入所属机构"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  title="搜索"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-sousuo"
                  @click="currentPage = 1;getNowRoomPerson();"
                ></el-button>
                <el-button
                  title="重置"
                  class="commonBtn searchBtn"
                  size="medium"
                  icon="iconfont law-zhongzhi"
                  @click="resetLog"
                ></el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-plus" size="medium" @click="addPerson">新增人员</el-button>
                <el-button
                  type="info"
                  icon="el-icon-delete-solid"
                  size="medium"
                  @click="removePerson"
                >移除人员</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              resizable
              stripe
              @selection-change="selectUser"
              v-loading="tableLoading"
              element-loading-spinner="car-loading"
              element-loading-text="加载中..."
              :max-height="320"
            >
              <el-table-column type="selection" align="center" width="40px"></el-table-column>
              <el-table-column prop="personName" label="姓名" min-width="100px" align="left"></el-table-column>
              <el-table-column
                prop="sex"
                label="性别"
                width="60px"
                align="center"
                :formatter="sexFormat"
              ></el-table-column>
              <el-table-column prop="idNo" label="身份证号" width="174px" align="center"></el-table-column>
              <el-table-column prop="oname" label="所属机构" align="center"></el-table-column>
              <el-table-column prop="postName" label="职务" width="100px" align="center"></el-table-column>
              <el-table-column prop="area" label="执法领域" align="left"></el-table-column>
            </el-table>
            <div class="dialog-pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 30, 40, 50]"
                layout="prev, pager, next,sizes,jumper"
                :total="totalPage"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="closeDialog">取 消</el-button> -->
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </div>
    <!-- 添加考场 -->
    <addRoomComp ref="addRoomCompRef" @getRoomDispathInfo="getRoomList"></addRoomComp>
    <addExamPersonComp ref="addExamPersonCompRef" @getExamPersonInfo="getPageAllInfo"></addExamPersonComp>
  </el-dialog>
</template>
<script>
import { mixinPerson } from "@/common/js/personComm";
import addRoomComp from "./addRoom";
import addExamPersonComp from "./addExamPerson";
export default {
  mixins: [mixinPerson],
  data() {
    return {
      roomDispathForm: {
        personName: "",
        idNo: "",
        oname: ""
      },
      unDispachNum: "",
      nowRoom: "",
      roomList: [],
      middleDate: {},
      tableData: [],
      selectUserIdList: [],
      dialogTitle: "", //弹出框title
      errorName: false, //添加name时的验证
      handelType: 0, //添加 0  修改2  查看3
      isDisabled: true,
      visible: false,
      tableLoading: false,
      currentPage: 1,
      pageSize: 10
    };
  },
  components: {
    addRoomComp,
    addExamPersonComp
  },
  methods: {
    getNowRoom(roomId) {
      let _this = this;
      _this.nowRoom = roomId;
      _this.getNowRoomPerson();
    },
    //获取当前考场下的考生
    getNowRoomPerson() {
      let _this = this;
      let data = {
        examId: _this.middleDate.examId,
        roomId: _this.nowRoom,
        personName:_this.roomDispathForm.personName,
        idNo:_this.roomDispathForm.idNo,
        oname:_this.roomDispathForm.oname,
        current: _this.currentPage,
        size: _this.pageSize
      };
      _this.getPageList("getDispatchPersonByRoomId", data);
    },
    //添加参考人
    addPerson() {
      let _this = this;
      if (_this.nowRoom == "" || _this.nowRoom == null) {
        _this.$message({
          type: "warning",
          message: "请选择考场"
        });
      } else {
        let data = {
          examId: _this.middleDate.examId,
          roomId: _this.nowRoom
        };
        this.$refs.addExamPersonCompRef.showModal('3', data);
      }
    },
    //移除参考人
    removePerson() {
      let _this = this;
      if (_this.selectUserIdList.length < 1) {
        _this.$message({
          type: "warning",
          message: "请选择一个考生"
        });
      } else if (_this.selectUserIdList.length > 1) {
        _this.$message({
          type: "warning",
          message: "只能选择一个考生"
        });
      } else {
        let data = {
          dispatchId: _this.selectUserIdList[0]
        };
        _this.$store.dispatch("removeDispatch", data).then(
          res => {
            if (res.code === 200) {
              _this.$message({
                type: "success",
                message: "移除成功！"
              });
              _this.getRoomList();
              _this.getNowRoomPerson();
              _this.getunDispachNum();
            } else {
              _this.$message({
                type: "warning",
                message: "移除失败！"
              });
            }
          },
          err => {
            _this.$message({ type: "error", message: err.msg || "" });
          }
        );
      }
    },
    getPageAllInfo() {
      let _this = this;
      _this.getRoomList();
      _this.getNowRoomPerson();
      _this.getunDispachNum();
    },
    showModal(row, type) {
      let _this = this;
      _this.visible = true;
      _this.middleDate = row;
      _this.dialogTitle = "考场分配";
      _this.getRoomList();
      _this.getunDispachNum();
    },
    //更改每页显示的条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNowRoomPerson();
    },
    //更换页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNowRoomPerson();
    },
    //查询未分配总人数
    getunDispachNum() {
      let _this = this;
      let data = {
        examId: _this.middleDate.examId,
        roomId: _this.nowRoom
      };
      _this.$store.dispatch("getUnDispatchCount", data).then(
        res => {
          if (res.code === 200) {
            _this.unDispachNum = res.data;
          }
        },
        err => {
          _this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //获取考场list
    getRoomList() {
      let _this = this;
      let data = {
        examId: _this.middleDate.examId
      };
      _this.$store.dispatch("roomManageList", data).then(
        res => {
          if (res.code === 200) {
            _this.roomList = res.data;
          }
        },
        err => {
          _this.$message({ type: "error", message: err.msg || "" });
        }
      );
    },
    //删除考场
    deleteRoom(roomId) {
      this.$confirm("确定删除该考场吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        iconClass: 'custom-question',
        customClass: 'custom-confirm'
      }).then(() => {
        this.$store.dispatch("deleteRoomManageById", roomId).then(res => {
          if(res.code === 200){
            this.$message({ type: "success", message: "删除成功!"});
            this.getRoomList(); //重新加载页面数据
          }
        },
          err => {
            this.$message({ type:'error', message: err.msg || '' });
          }
        );
      }).catch(() => {});
    },
    // 添加考场
    addRoomInfo() {
      this.$refs.addRoomCompRef.showModal(this.middleDate, 1);
    },
    //获取选中的user
    selectUser(val) {
      let _this = this;
      _this.selectUserIdList = [];
      val.forEach((item, index) => {
        _this.selectUserIdList.push(item.dispatchId);
      });
    },
    //自动分配考场
    autoDispath() {
      let _this = this;
      let data = {
        examId: _this.middleDate.examId
      };
      _this
        .$confirm("是否确认自动分配考场", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          iconClass: "custom-question",
          customClass: "custom-confirm"
        })
        .then(() => {
          const loading = _this.$loading({
            lock: true,
            text: "正在分配",
            spinner: "car-loading",
            customClass: "loading-box",
            background: "rgba(234,237,244, 0.8)"
          });
          _this.$store.dispatch("autoDispatch", data).then(
            res => {
              loading.close();
              if (res.code === 200) {
                _this.$message({
                  type: "success",
                  message: "自动分配成功"
                });
                _this.getRoomList();
                _this.getunDispachNum();
              }
            },
            err => {
              loading.close();
              _this.$message({ type: "error", message: err.msg || "" });
            }
          );
        }).catch(() => {});
    },
    resetLog() {
      this.$refs["roomDispathFormRef"].resetFields();
    },
    // 提交
    submit(){},
    closeDialog() {
      this.roomList && this.roomList.splice(0, this.roomList.length);
      this.tableData && this.tableData.splice(0, this.tableData.length);
      this.selectUserIdList && this.selectUserIdList.splice(0, this.selectUserIdList.length);
      this.visible = false;
      this.$refs["roomDispathFormRef"].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.room-dispath {
  width: 78%;
  min-width: 1056px;
  max-width: 1256px;
  margin: 0 auto;
  >>> .el-dialog__body {
    padding: 0;
  }
}
.room-wrap {
  padding: 20px;
  .room-wrap-title {
    display: flex;
    justify-content: space-between;
    height: 34px;
    line-height: 34px;
    margin-bottom: 15px;
    .wrap-title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(159, 163, 175, 1);
    }
    .top-handle {
      .assign-total {
        font-size: 12px;
        color: rgba(232, 66, 65, 1);
        display: inline-table;
        vertical-align: text-top;
      }
    }
  }
  .room-wrap-cnt {
    .room-list {
      height: 40px;
      line-height: 40px;
      margin-bottom: 15px;
      padding: 0 10px;
      border: 1px solid rgba(221, 221, 221, 1);
      > span {
        display: inline-block;
        color: #20232b;
      }
      .room-name{
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        float: left;
        padding-right: 4px;
      }
      &:hover,
      &.active{
        background:rgba(69,115,208,0.1);
      }
    }
    .add-room {
      width: 100%;
      color: #4573d0;
    }
  }
  .search-panel {
    >>> .el-form-item {
      margin-right: 8px;
      margin-bottom: 10px;
    }
    >>> .el-input__inner {
      width: 160px;
      padding: 0 8px;
    }
    .searchBtn {
      background: #eee;
    }
  }
  .dialog-pagination {
    margin-top: 10px;
    text-align: center;
    >>> .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }
}
</style>
