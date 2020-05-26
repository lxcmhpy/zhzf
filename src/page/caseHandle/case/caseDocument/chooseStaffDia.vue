<template>
  <el-dialog
    title="选择执法人员"
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
            :key="tag"
            v-for="tag in checkedUser"
            closable
            :disable-transitions="false"
            @close="deleteUser(tag)"
          >{{tag}}</el-tag>
        </div>
      </div>
      <div class="choose">
        <p>
          <span>本案人员</span>
          <span>{{this.userList.length}}</span>
        </p>
        <el-input placeholder="请输入姓名或执法证号" class="input-with-select" v-model="staffNameOrCode">
          <el-button slot="append" icon="el-icon-search"></el-button>
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
              :label="user"
              :key="user"             
            >
              <span class="name">{{user}}</span>
              <el-input
                v-model="userIdList[index]"
                placeholder="请选择"
                @change="changeLawOfficerCards($event,user.lawOfficerCardsAndId)"
                @click.native.prevent
                style="width:100px;"
              >
                <!-- <el-option
                  v-for="item in userIdList[index]"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option> -->
              </el-input>
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
import { findStaffListApi,getCaseBasicInfoApi } from "@/api/caseHandle";
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(['caseId']) },
  data() {
    return {
      visible: false,
      isIndeterminate: true,
      checkAll: false,
      checkedUser: [], //选中的人员
      userList: [], //全部人员
      userIdList: [],//执法人员ID
      selectedNumber: [],
      alreadyChooseLawPerson: [], //信息采集页传来的
      currentUserName: iLocalStroage.gets("userInfo").username, //当前登录用户的username
      checkedUserId: [],
      staffNameOrCode: "",
    };
  },
  inject: ["reload"],
  methods: {
    // findStallByCondition(){
    //     // findStaffListApi(this.staffNameOrCode);
    //     let data = {
    //     organId: iLocalStroage.gets("userInfo").organId,
    //     inputValue: this.staffNameOrCode
    //   };
    //     let _this = this
    //     findStaffListApi(data).then(res=>{
    //         _this.userList = res.data;
    //         _this.userList.forEach(item => {
    //           //执法证号下拉框
    //           item.lawOfficerCardsAndId = {
    //             id: item.id,
    //             lawOfficerCards: item.lawOfficerCards.split(",")
    //           };
    //         });
    //   },err=>{
    //     console.log(err);
    //   })

    // },
    //查询本案人员
    findUserNameList(){
      let data = {
        id : this.caseId
      }
      getCaseBasicInfoApi(data).then(res => {
        if (res.code == 200) {
          console.log("1456",res);
          this.userList = res.data.staff.split(',');
          this.userIdList = res.data.staffId.split(',');
          console.log("this.userNameList",this.userNameList);
        } else {
          console.log("fail");
        }
      });
    },
    showModel(row) {
      this.visible = true;
      // this.alreadyChooseLawPerson = alreadyChooseLawPerson;
      console.log("这一行的数据",row);
    //   this.checkedUserId = alreadyChooseLawPersonId;
    //   console.log("alreadyChooseLawPersonId", alreadyChooseLawPersonId);
    //   console.log("inforCollectLawPerson", inforCollectLawPerson);
    //   this.searchLawPerson(alreadyChooseLawPersonId, inforCollectLawPerson);
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
          if (item == item2) {
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
      this.$emit("setDeliveryMasterEmit", this.checkedUser);
    //   console.log("this.checkedUser", this.checkedUser);
    //   this.$emit("userList", this.userList);
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
  },
  mounted() {
    this.findUserNameList();
  }
};
</script>
<style lang="scss" src="@/assets/css/caseHandle/index.scss">
/* @import "@/assets/css/caseHandle/index.scss"; */
</style>
