<template>
  <el-dialog title="选择人员" :visible.sync="visible" @close="closeDialog" :close-on-click-modal="false" width="40%" append-to-body>
    <div class="chooseLawPer">
      <div class="choosed">
        <p>
          <span>已选人员</span>
          <span>{{this.checkedUser.length}}</span>
        </p>
        <div>
          <el-tag :key="tag.id" v-for="tag in checkedUser" :closable="tag.userId !=currentUserId" :disable-transitions="false" @close="deleteUser(tag)">{{tag.lawOfficerName}}</el-tag>
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
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedUserId" @change="handleCheckedUserChange">
            <el-checkbox v-for="(user,index) in userList" :label="user.id" :key="user.id">
              <span class="name">{{user.lawOfficerName}}</span>
              <el-select v-model="selectedNumber[index]" placeholder="请选择" @change="changeLawOfficerCards($event,user.lawOfficerCardsAndId)" @click.native.prevent>
                <el-option v-for="item in user.lawOfficerCardsAndId.lawOfficerCards" :key="item" :label="item" :value="item"></el-option>
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
      currentUserId: iLocalStroage.gets("userInfo").id, //当前登录用户的id
      currentUser: '', //登录用户的执法信息
      checkedUserId: [],
      staffNameOrCode: "",
      saveCheckedUserBeforSearch: [], //在搜索前保存选中的执法人员
      allUserList: [], //全部人员
    };
  },
  inject: ["reload"],
  methods: {
    findStallByCondition() {
      let data = {
        organId: iLocalStroage.gets("userInfo").organId,
        inputValue: this.staffNameOrCode
      };
      let _this = this
      findStaffListApi(data).then(res => {
        _this.userList = res.data;
        _this.userList.forEach(item => {
          //执法证号下拉框
          item.lawOfficerCardsAndId = {
            id: item.id,
            lawOfficerCards: item.lawOfficerCards.split(",")
          };
        });
        this.saveCheckedUserBeforSearch = this.checkedUser;
      }, err => {
        console.log(err);
      })

    },
    showModal(inforCollectLawPerson) {
      this.visible = true;
      this.searchLawPerson(inforCollectLawPerson);

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
          if (!this.checkedUserId.includes(item.id)) {
            //复选框存入id
            this.checkedUserId.push(item.id);
            //tag
            this.checkedUser.push(item);
          }

        });
      } else {
        this.userList.forEach(item => {
          this.checkedUserId.forEach((item2, index2) => {
            if (item2 == item.id && item2 != this.currentUser.id) {
              this.checkedUserId.splice(index2, 1);
              this.checkedUser.splice(index2, 1);

            }
          })
        })

      }
      this.isIndeterminate = false;
    },
    //更改选中的人员
    handleCheckedUserChange(val) {
      console.log(val);
      console.log(this.checkedUserId);
      // debugger
      let _this = this
      if (val) {
        this.checkedUser = [];
        val.forEach(item => {
          _this.allUserList.forEach(item2 => {
            if (item == item2.id) {
              //更新tag
              _this.checkedUser.push(item2);
              return;
            }
          });
        });
      }

      console.log('this.checkedUser', this.checkedUser)
    },
    //删掉已选中的人员
    deleteUser(tag) {
      console.log(tag);
      //当前用户不允许删除
      if (tag.userId == this.currentUserId) return;
      this.checkedUser.splice(this.checkedUser.indexOf(tag), 1);
      //更新复选框
      this.checkedUserId.splice(this.checkedUser.indexOf(tag.id), 1);
    },
    //更改执法证号
    changeLawOfficerCards(val, personData) {
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
    searchLawPerson(inforCollectLawPerson) {
      let _this = this
      this.$store
        .dispatch("findLawOfficerList", iLocalStroage.gets("userInfo").organId)
        .then(
          res => {
            _this.userList = res.data;
            _this.allUserList = res.data;
            _this.userList.forEach(item => {
              //查询当前用户的执行信息
              if (item.userId == this.currentUserId) this.currentUser = item;

              //执法证号下拉框
              item.lawOfficerCardsAndId = {
                id: item.id,
                lawOfficerCards: item.lawOfficerCards.split(",")
              };
              //执法证号默认选中 或 从信息采集页带入
              let hasChangeCard = false;
              let inforCollectLawPerson2 = '';
              inforCollectLawPerson.forEach(inforCollectLawPersonItem => {
                // console.log('inforCollectLawPersonItem', inforCollectLawPersonItem)
                //刚进入信息采集页面后获取执法人员数据，当前用户没有设置过selectLawOfficerCard ,需要设置一下
                inforCollectLawPersonItem.selectLawOfficerCard = !inforCollectLawPersonItem.selectLawOfficerCard ? inforCollectLawPersonItem.lawOfficerCards : inforCollectLawPersonItem.selectLawOfficerCard;
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
            if (this.alreadyChooseLawPerson) {
              this.checkedUser = this.alreadyChooseLawPerson;
            }
            _this.handleCheckedUserChange(this.checkedUserId);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss"></style>
