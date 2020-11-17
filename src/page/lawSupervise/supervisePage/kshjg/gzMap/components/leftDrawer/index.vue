<template>
  <div class="leftDrawer">
      <p class="title">选择参会人员</p>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="群组" name="first">
        <div class="input-with-select">
          <el-input placeholder="请输入群组名称" v-model="gropuName" clearable>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <div class="participants_table">
          <el-table
            v-loading = 'pictLoading'
            element-loading-spinner = "el-icon-loading"
             ref="multipleTable"
            :data="group_info"
            :header-cell-style="{'text-align':'center'}"
             @selection-change="handleSelectionChange"
             @expand-change="zydescription"
             border
             height="300"
            style="width: 100%">
             <el-table-column
                type="selection"
                width="55">
              </el-table-column>
            <el-table-column type="expand" align="right">
              <template slot-scope="props">
                <el-form label-position="center" inline class="demo-table-expand">
                  <div class="openSelBig">
                    <div class="openSel"  v-for="(item,index) in props.row.uids" :key="index+101">
                      <span class="TreeWord">{{item.display_name}}</span>
                      <span class="clickImg">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="" @click="videoPel(item)">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add2.jpg"  @click="selectP(item)" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/del2.jpg" @click="delNum(props.row,item)" alt="">
                      </span>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="名称"
              prop="tg_name">
              <template slot-scope="scope">
                <span>{{scope.row.tg_name}} ({{scope.row.uids.length}})</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
             >
              <template slot-scope="scope">
                <div class="operationImg">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="" @click="videoGroup(scope.row)">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/del.jpg" alt="" @click="delGroup(scope.row)">
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通讯录" name="second">
         <div class="input-with-select">
          <el-input placeholder="请输入人员或机构名称" v-model="gropuName" clearable>
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>
        <div class="treeT">
          <el-tree
            :data="handleTree"
            show-checkbox
            ref="tree"
            node-key="id"
            :render-content="renderSlot"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange"
            :props="defaultProps">
          </el-tree>
        </div>
        <div>
          <div class="bottomBtn1">
            <div>
              <el-button type="primary" size="mini"   @click="getCheckedKeys">确认</el-button>
            </div>
            <div class="lastBtn">
              <el-button type="primary" size="mini"  @click="resetChecked">重选</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      </el-tabs>
      <div>
        <p class="title">已选择人员</p>
        <div class="selectedBox">
          <div class="selected"  v-for="(item,index) in selectedArrQ" :key="index+1" >
            {{item.display_name}}
            <span @click="delPQ(item)">
                <img src="/static/images/img/lawSupervise/gzMapLeftD/del3.jpg" alt="">
            </span>
          </div>
        </div>
      </div>
      <div class="bottomBtn">
        <div>
          <el-button type="primary" plain  @click="addGroup">创建群组</el-button>
        </div>
        <div>
          <el-button type="primary" plain @click="speak">发起会商</el-button>
        </div>
      </div>
    <!-- </el-drawer> -->
    

    <info-order ref="orderInfo" :getLists='getLists' :creatGroupData='creatGroupData' :v-if="inforVisible" :visibles.sync="inforVisible"></info-order>
  </div>
</template>

<script>

import addGroupA from "./addGroup"
import { organTreeByCurrUser, getOrganTree,getZfjgLawSupervise } from "@/api/lawSupervise.js";
export default {
  props: ['config','allUsers'],
  components: {
    'info-order': addGroupA,
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      pictLoading:true,
      inforVisible: false,
      direction: 'ltr',
      activeName: 'first',
      gropuName:'',
      selectedArrQ:[],
      selectedArrT:[],
      group_info:[],
      user_info:[],
      groupCopy:[],
      newGroup:'',
      handleTree:[],
    }
  },
  watch: {
    config(o, n){
      this.group_info = o.group_info
      this.groupCopy = o.group_info
      this.pictLoading = false
      console.log('group_info',this.group_info)
    },
    allUsers(o,n){
      this.user_info = o.user_info
      console.log('user_info',this.user_info)
    },
  },
  created(){

  },
  mounted(){
  },
  methods: {
    //获取群组
    getLists(){
      this.getListData()
    },
    // 搜索
    handleSearch(){
      if(this.gropuName){
        var reg = new RegExp(this.gropuName)
        var arr = []
        for (let i = 0; i < this.groupCopy.length; i++) {
            if(reg.test(this.groupCopy[i].tg_name)){
                arr.push(this.groupCopy[i])
            }
        }
        this.group_info = arr
      }else{
         this.getListData()
      }
    },
    getListData(){
      this.$parent.req_user_profile()
    },
    // 群组视频
    videoGroup(val){
      websdk.view.showGroupModal(val.tgid, function (result) {
            console.log('showGroupModal result:{}', result);
      });
    },
    videoPel(val){
      websdk.view.showUserModal(val.uid, null, function (result) {
            console.log('showUserModal result:{}', result);
      });
    },
    // 获取群组下的人员
    getGroupPeople(data){
        var users = []
        let uidArr = data.uids
        for (let i = 0; i < this.user_info.length; i++) {
          for (let j = 0; j < uidArr.length; j++) {
            if(this.user_info[i].uid == uidArr[j]){
              users.push(this.user_info[i])
            }
          }
        }
        if(users.length > this.group_info.length && users.length !== 0){
           for (let z = 0; z < users.length; z++) {
              if(data.tgid == this.group_info[z].tgid){
                this.group_info[z].uids = users
              }
            }
        }else if(users.length < this.group_info.length && users.length !== 0) {
          for (let z = 0; z <this.group_info.length; z++) {
              if(data.tgid == this.group_info[z].tgid){
                this.group_info[z].uids = users
              }
            }
        }
    },
    zydescription(data){
       let _this = this
       setTimeout(function()  {
          _this.getGroupPeople(data)
        }, 100);
    },
    // 删除群组
    req_delete_group(tgid) {
        websdk.request.groupRequest.deleteGroup(tgid, null, function (rsp) {
            console.log('demo_req_delete_group result:{}', rsp);
        }, 'demo_req_delete_group');
    },
    delGroup(row){
        this.$confirm('确认删除该群组吗?', '删除群组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.req_delete_group(row.tgid)
          this.getListData()
        }).catch(() => {

        });
    },
    // 删除组成员
    req_remove_group_member(tgid,uid) {
        websdk.request.groupRequest.removeGroupMember(tgid, uid, null, function (rsp) {
            console.log('demo_req_remove_group_member result:{}', rsp);
            //api_demo.req_grp_profile([global_data.param_tgid1]);
        }, 'demo_req_remove_group_member');
    },
    delNum(row,item){
      var uidArr = []
      uidArr.push(item.uid)
      this.req_remove_group_member(row.tgid,uidArr)
       this.getListData()
    },
    
    //添加人员
    selectP(val){
      this.selectedArrQ.push(val)
      this.selectedArrQ = this.unique(this.selectedArrQ)
    },
    //删除人员
    delPQ(val){
        this.$alert('操作成功', '提示信息', {
          confirmButtonText: '确定',
          callback: action => {
            for (let i = 0; i <  this.selectedArrQ.length; i++) {
              if(val.uid == this.selectedArrQ[i].uid){
                this.selectedArrQ.splice(i,1)
              }
            }
            for (let j = 0; j < this.selectedArrT.length; j++) {
              if(val.uid == this.selectedArrT[j].uid){
                this.selectedArrT.splice(j,1)
              }
            }
          }
        });
    },
    creatGroupData(data){
      this.newGroup = data.tgid
    },
    // 创建群组
    addGroup(){
      if(this.selectedArrQ.length > 0){
        this.inforVisible = true
        this.$refs.orderInfo.getGruops(this.selectedArrQ)
      }else{
         this.$message({
          message: '请先添加群组人员',
          type: 'warning'
        });
      }
    },
    // 发起会商
    speak(){
      if(this.newGroup){
        websdk.view.showGroupModal(this.newGroup, function (result) {
             console.log('showGroupModal result:{}', result);
       });
      }else{
        this.$message({
          message: '请先创建群组',
          type: 'warning'
        });
      }
    },
    handleClick(tab, event) {
      if(tab.name == "second")
      this.getTree()
    },
    // 获取树形数据 
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          console.log(1,res.data)
          this.treeData = res.data
          this.handleData()
        } else {
          throw new Error("organTreeByCurrUser() in jiangXiMap.vue::::::数据错误")
        }
      }).then(data => {
        console.log(2,data)
      })
    },
    // tree 图标
    renderSlot(h,{ node, data, store }) {
      return (
        <div class="tree-slot-box">
          <img class='img1'
            src={
              data.label === '执法人员' ?'/static/images/img/lawSupervise/icon_jc11.png': '/static/images/img/lawSupervise/icon_jc1.png'
            }
          />
          <span >{data.label}</span>
           <img class='img2' on-click={ () => this.addPeople(data) }
            src={
              // (data.organId || data.label == "执法人员")?'/static/images/img/lawSupervise/gzMapLeftD/add2.jpg':''
              data.organId?'/static/images/img/lawSupervise/gzMapLeftD/add2.jpg':''
            }
          />
        </div>
      )
    },
    //处理数据
    handleData(){
      this.handleTree = this.deleteChildren(this.treeData)
    },
    deleteChildren(arr){
      let childs = arr
      for (let i = childs.length; i--; i > 0) {
        if (childs[i].children) {
          if (childs[i].children.length) {
            this.deleteChildren(childs[i].children)
          } else if(childs[i].label == "执法车辆" || childs[i].label == "执法船舶"){
               childs.splice(i,1) 
          }
        }
      }
      return arr
      console.log(arr)
    },
    // 获取执法人员数据
    handleNodeClick(data) {
        if(data.label === "执法人员") {
          this.$emit('getPeople',data)
        } 
    },
    // 添加通讯录人员
    addPeople(obj){
      var tempObj = {uid:(obj.sn)-0,display_name:obj.label} 
      if(obj.sn){
        this.selectedArrT.push(tempObj)
        this.uniqueObj(this.selectedArrT)
        this.$message.success('已选中');
      }else{
        this.$message.error('该用户没有uid');
      }
      console.log(this.selectedArrT)
    },
    // 确认
    getCheckedKeys(){
      console.log(this.selectedArrT)
       this.selectedArrQ = this.selectedArrQ.concat(this.selectedArrT)
       this.uniqueObj(this.selectedArrQ)
      // this.selectedArrT = this.selectedArrT.map((v)=>{
      //   return {uid:v.sn,display_name:v.label}
      // })
      // for (let i = 0; i < this.selectedArrT.length; i++) {
      //     if(this.selectedArrT[i].uid){
      //         this.selectedArrQ = this.selectedArrQ.concat(this.selectedArrT)
      //     }
      // }
      // this.selectedArrQ = this.unique(this.selectedArrQ)
      console.log(this.selectedArrQ)
    //  console.log(this.selectedArrQ)
      // this.selectedArrT = this.$refs.tree.getCheckedKeys()
      // console.log(this.$refs.tree.getCheckedKeys())
      // for (let i = 0; i < this.selectedArrT.length; i++) {
      //   this.selectedArrQ.push(this.selectedArrT[i])
      // }
      // this.selectedArrQ = this.unique(this.selectedArrQ)
      
    },
    // 重选
    resetChecked(){
      console.log(this.selectedArrQ)
      console.log(this.selectedArrT)
      for (var i = 0; i < this.selectedArrT.length; i++) {
        for (var j = 0; j < this.selectedArrQ.length; j++) {
            if (this.selectedArrT[i].uid == this.selectedArrQ[j].uid) {
                this.selectedArrQ.splice(j, 1);
            }
        }
      }
      this.selectedArrT = []
      this.$refs.tree.setCheckedKeys([]);
    },
    handleCheckChange(val){
       this.addPeople(val)
    },
    handleSelectionChange(val){
      console.log(val)
    //  this.addPeople(val)
        // for (let i = 0; i < val.length; i++) {
        //   this.selectedArrQ.push(val[i].name)
        // }
        // this.selectedArrQ = this.unique(this.selectedArrQ)
    },
    // 去重
    uniqueObj(arr){
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].uid === arr[j].uid) {
            arr.splice(j, 1);
            j = j - 1;
          }
        }
      }
    },
    unique(arr) {
        return Array.from(new Set(arr));
    },
},

}
</script>

<style lang="scss">
.leftDrawer {
  width: 25%;
  background:white;
  box-sizing: border-box;
  margin-top: 29px;
  height: 100%;
  overflow: auto;
  .title{
    font-size: 18px;
    margin: 10px 0;
    font-weight: bold;
    background: #f6f5fa;
    font-size: 24px;
    padding: 5px;
  }
  .selectedBox{
    overflow: auto;
    height: 255px;
  }
  .treeT{
    height: 197px;
    overflow: auto;
    margin-top: 10px;
  }
  .input-with-select {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 5px;
    .el-input__inner {
      height: 40px;
      border-radius: 4px 0 0 4px;
    }
    .el-input-group__append {
      .el-button {
        .el-icon-search {
          color: #409EFF;
        }
      }
    }
    .closeBox {
      height: 40px;
      line-height: 40px;
      cursor: pointer;
    }
  }
  .bottomBtn{
    display: flex;
    justify-content:space-around;
    margin-bottom: 60px;
    margin-top: 20px;
  }
  .bottomBtn1{
     display: flex;
     justify-content: center;
     .lastBtn{
        margin-left: 20px;
     }
  }
    .participants_table{
      margin: 12px 0px;
        .openSel{
            margin: 11px 0px;
        }
        .clickImg{
          img{
            margin-right: 5px;
          }
        }
        .TreeWord{
          width: 248px;
          padding-left: 120px;
          display: inline-block;
        }
        .operationImg{
          img{
            margin-right: 10px;
          }
        }
        .el-loading-spinner{
          font-size: 30px;
        }
    }
    .videoImg img{
        width: 8%;
    }
    .selected{
      margin: 15px 0 15px 30px;
      img{
        margin-left: 25px;
        width: 5%;
      }
    }
    .treeWord{
      font-size: 15px;
      margin-right: 15px;
    }
    .lastImg{
      img{
        vertical-align: bottom;
      }
    }
    .headImg{
      img{
        width: 10%;
      }
    }
   .el-tree {
    border-radius: 4px;
    .tree-slot-box {
      .img1 {
        width: 13px;
        margin-right: 5px;
      }
      span {
        font-size: 12px;
        font-family: Helvetica,Arial,sans-serif;
      }
      .img2{
        margin-left: 5px;
        width: 13px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
