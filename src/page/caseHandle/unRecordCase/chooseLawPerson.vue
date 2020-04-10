<template>
  <el-dialog
    title="选择人员"
    :visible.sync="visible"
    @close="closeDialog"
    :close-on-click-modal="false"
    width="40%"
    append-to-body
  >
    <div class="chooseLawPer">
      <div class="choosed">
        <p>
          <span>已选人员</span>
          <span>{{this.checkedUser.length}}</span>
        </p>
        <div>
          <el-tag
            :key="tag.id"
            v-for="tag in checkedUser"
            closable
            :disable-transitions="false"
            @close="deleteUser(tag)"
          >{{tag.lawOfficerName}}</el-tag>
        </div>
      </div>
      <div class="choose">
        <p>
          <span>本机构人员</span>
          <span>{{this.userList.length}}</span>
        </p>
        <el-input placeholder="请输入姓名或执法证号" class="input-with-select" v-model="staffNameOrCode">
          <el-button slot="append" icon="el-icon-search" @click="findStallByCondition()"></el-button>
        </el-input>
        <div class="userList">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedUserId" @change="handleCheckedUserChange" >
            <el-checkbox
              v-for="(user,index) in userList"
              :label="user.id"
              :key="user.id"
              :disabled="user.lawOfficerName == currentUserName ? true : false"
            >
              <span class="name">{{user.lawOfficerName}}</span>
              <el-select
                v-model="selectedNumber[index]"
                placeholder="请选择"
                @change="changeLawOfficerCards($event,user.lawOfficerCardsAndId)"
                @click.native.prevent
              >
                <el-option
                  v-for="item in user.lawOfficerCardsAndId.lawOfficerCards"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="addUserToForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { findStaffListApi } from "@/api/caseHandle";
export default {
  data() {
    return {
      visible: false,
      isIndeterminate: true,
      checkAll: false,
      checkedUser: [], //选中的人员
      userList: [], //全部人员
      selectedNumber: [],
      alreadyChooseLawPerson: [], //信息采集页传来的
      currentUserName: iLocalStroage.gets("userInfo").username, //当前登录用户的username
      checkedUserId: [],
      staffNameOrCode: "",
    };
  },
  inject: ["reload"],
  methods: {
    findStallByCondition(){
        // findStaffListApi(this.staffNameOrCode);
        let _this = this
        findStaffListApi(this.staffNameOrCode).then(res=>{
            _this.userList = res.data;
            _this.userList.forEach(item => {
              //执法证号下拉框
              item.lawOfficerCardsAndId = {
                id: item.id,
                lawOfficerCards: item.lawOfficerCards.split(",")
              };
            });
      },err=>{
        console.log(err);
      })

    },
    showModal(alreadyChooseLawPersonId, inforCollectLawPerson) {
      this.visible = true;
      // this.alreadyChooseLawPerson = alreadyChooseLawPerson;
      // console.log(this.alreadyChooseLawPerson)
      this.checkedUserId = alreadyChooseLawPersonId;
      console.log("alreadyChooseLawPersonId", alreadyChooseLawPersonId);
      this.searchLawPerson(alreadyChooseLawPersonId, inforCollectLawPerson);
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
      this.staffNameOrCode = "";
    },
    //全选
    handleCheckAllChange(val) {
      console.log(val);
      if (val) {
        this.userList.forEach(item => {
          //复选框存入id
          this.checkedUserId.push(item.id);
          //tag
          this.checkedUser.push(item);
        });
      } else {
        this.checkedUserId = [];
        this.checkedUser = [];
      }
      this.isIndeterminate = false;
    },
    //更改选中的人员
    handleCheckedUserChange(val) {
      console.log(val);
      this.checkedUser = [];
       let _this = this
      val.forEach(item => {
        _this.userList.forEach(item2 => {
          if (item == item2.id) {
            //更新tag
            console.log('更新tag',item2);
            _this.checkedUser.push(item2);
            return;
          }
        });
      });
    },
    // getSelectNumber() {
    //   this.userList.forEach(item => {
    //     this.selectedNumber.push("");
    //   });
    // },
    //删掉已选中的人员
    deleteUser(tag) {
      console.log(tag);
      //当前用户不允许删除
      if (tag.lawOfficerName == this.currentUserName) return;
      this.checkedUser.splice(this.checkedUser.indexOf(tag), 1);
      //更新复选框
      this.checkedUserId.splice(this.checkedUser.indexOf(tag.id), 1);
    },
    //更改执法证号
    changeLawOfficerCards(val, personData) {
      console.log(val);
      console.log(personData);
      //更新选中的执法证号
      this.userList.forEach(item => {
        if (item.id == personData.id) {
          item.selectLawOfficerCard = val;
        }
      });
    },
    //点击确定关闭弹窗 添加用户到信息采集页
    addUserToForm() {
      this.visible = false;
      this.$emit("setLawPer", this.checkedUser);
      console.log("this.checkedUser", this.checkedUser);
      this.$emit("userList", this.userList);
    },
    //查询执法人员
    searchLawPerson(alreadyChooseLawPersonId, inforCollectLawPerson) {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            _this.userList = res.data;
            _this.userList.forEach(item => {
              //执法证号下拉框
              item.lawOfficerCardsAndId = {
                id: item.id,
                lawOfficerCards: item.lawOfficerCards.split(",")
              };
              //执法证号默认选中 或 从信息采集页带入
              //  this.selectedNumber.push(item.lawOfficerCardsAndId.lawOfficerCards[0]);
              let hasChangeCard = false;
              let inforCollectLawPerson2 = '';
              inforCollectLawPerson.forEach(inforCollectLawPersonItem => {
                if (item.id == inforCollectLawPersonItem.id) {
                  hasChangeCard = true;
                  inforCollectLawPerson2 = inforCollectLawPersonItem;
                }
              });
              if (hasChangeCard) {
                _this.selectedNumber.push(
                  inforCollectLawPerson2.selectLawOfficerCard
                );
                //userList新增字段 选中的执法证号
                item.selectLawOfficerCard =
                  inforCollectLawPerson2.selectLawOfficerCard;
              } else {
                _this.selectedNumber.push(
                  item.lawOfficerCardsAndId.lawOfficerCards[0]
                );
                //userList新增字段 选中的执法证号
                item.selectLawOfficerCard =
                  item.lawOfficerCardsAndId.lawOfficerCards[0];
              }
            });
            //  this.checkedUser = this.alreadyChooseLawPerson;
            _this.handleCheckedUserChange(alreadyChooseLawPersonId);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
  // mounted() {
  //   this.getSelectNumber();
  // }
};
</script>
<style lang="scss">
@import "@/assets/css/caseHandle/index.scss";
</style>
