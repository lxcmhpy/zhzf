<template>
  <el-dialog
    title="选泽人员"
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
          <span>4</span>
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
          <span>本机构人员</span>
          <span>20</span>
        </p>
        <el-input placeholder="请输入姓名或执法证号" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="userList">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedUser" @change="handleCheckedUserChange">
            <el-checkbox v-for="(user,index) in userList" :label="user.name" :key="user.id">
              <span class="name">{{user.name}}</span>
              <el-select v-model="selectedNumber[index]" placeholder="请选择">
                <el-option v-for="item in user.number" :key="item" :label="item" :value="item"></el-option>
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
export default {
  data() {
    return {
      visible: false,
      isIndeterminate: true,
      checkAll: false,
      checkedUser: [], //选中的人员
      userList: [
        { id: 1, name: "zhangsan", number: ["1232433", "21321324324"] },
        { id: 2, name: "zhangsan2", number: ["1232433", "21321324324"] },
        { id: 3, name: "zhangsan3", number: ["1232433", "21321324324"] }
      ], //全部人员
      selectedNumber: []
    };
  },
  inject: ["reload"],
  methods: {
    showModal() {
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    //全选
    handleCheckAllChange(val) {
      console.log(val);
      if (val) {
        this.userList.forEach(item => {
          this.checkedUser.push(item.name);
        });
      } else {
        this.checkedUser = [];
      }
      //   this.checkedUser = val ? this.userList : [];
      console.log(this.checkedUser);
      this.isIndeterminate = false;
    },
    //更改选中的人员
    handleCheckedUserChange(val) {
      console.log(val);
    },
    getSelectNumber() {
      this.userList.forEach(item => {
        this.selectedNumber.push("");
      });
    },
    //删掉已选中的人员
    deleteUser(tag){
        console.log(tag);
    },
    //点击确定关闭弹窗 添加用户到信息采集页
    addUserToForm(){
      this.visible = false;
      this.$emit('setLawPer',this.checkedUser);
    }
  },
  mounted() {
    this.getSelectNumber();
  }
};
</script>
<style lang="less">
@import "../../../css/caseHandle/index.less";
</style>
