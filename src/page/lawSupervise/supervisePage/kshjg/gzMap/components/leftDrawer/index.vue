<template>
  <div class="leftDrawer">
    <!-- <div class="drawerBackground" @click="drawer = true" type="primary">
      <i class="el-icon-arrow-left" />
    </div> -->
    <!-- <el-drawer
       :direction="direction"
      :visible.sync="drawer"
      :with-header="false"> -->
      <p class="title">选择参会人员</p>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="群组" name="first">
        <div class="input-with-select">
          <el-input placeholder="请输入群组名称" v-model="input" clearable>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <div class="participants_table">
          <el-table
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
                    <div class="openSel"  v-for="(item,index) in props.row.uids" :key="index+11">
                      <span class="TreeWord">{{item.display_name}}</span>
                      <span class="clickImg">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/tel.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add1.jpg"  alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add2.jpg"  @click="selectP(item)" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/del2.jpg" @click="delNum( props.row,item)" alt="">
                      </span>
                    </div>
                    <!-- <div class="openSel">
                      <span class="TreeWord">{{ props.row.name }}</span>
                      <span class="clickImg">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/tel.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add1.jpg"  @click="selectP(props.row.name)" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add2.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/del2.jpg" alt="">
                      </span>
                    </div> -->
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
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/audio.jpg" alt="">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/del.jpg" alt="" @click="delGroup(scope.row)">
                </div>
               
                <!-- <span class="videoImg">
                    <img src="http://127.0.0.1:32767/09.39.34/images/%E8%A7%86%E9%A2%91%E4%BC%9A%E5%95%86/u152.svg" alt="">
                </span>
                <span class="videoImg">
                    <img src="http://127.0.0.1:32767/09.39.34/images/%E8%A7%86%E9%A2%91%E4%BC%9A%E5%95%86/u147.png" alt="">
                </span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通讯录" name="second">
         <div class="input-with-select">
          <el-input placeholder="请输入人员或机构名称" v-model="input" clearable>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
        <div class="treeT">
          <el-tree
            :data="data"
            show-checkbox
            node-key="label"
            ref="tree"
            highlight-current
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
          <el-button type="primary" plain>发起会商</el-button>
        </div>
      </div>
    <!-- </el-drawer> -->
    

    <info-order ref="orderInfo" :getLists='getLists' :v-if="inforVisible" :visibles.sync="inforVisible"></info-order>
  </div>
</template>

<script>

import addGroupA from "./addGroup"
export default {
  props: ['config','allUsers'],
  components: {
    'info-order': addGroupA,
  },
  data() {
    return {
      data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      inforVisible: false,
      direction: 'ltr',
      activeName: 'first',
      input:'',
      inputModel: "",
      showCom: "",
      projectName: "",
      placeholder: "",
      group_info: [],
      selectedArrQ:[],
      selectedArrT:[],
      group_info:[],
      user_info:[],
    }
  },
  watch: {
    config(o, n){
      this.group_info = o.group_info
      console.log('group_info',this.group_info)
    },
    allUsers(o,n){
      this.user_info = o.user_info
      console.log('user_info',this.user_info)
    }
  },
  created(){

  },
  mounted(){
  },
  methods: {
    // 搜索
    //获取群组
    getLists(){
      this.getListData()
      this.selectedArrQ = []
    },
    handleSearch(){

    },
    getListData(){
      this.$parent.req_user_profile()
    },
    // 获取群组下的人员
    zydescription(data){
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
    // 确认
    getCheckedKeys(){
      this.selectedArrT = this.$refs.tree.getCheckedKeys()
      // this.selectedArrT = this.$refs.tree.getCheckedKeys()
      console.log(this.$refs.tree.getCheckedKeys())
      for (let i = 0; i < this.selectedArrT.length; i++) {
        this.selectedArrQ.push(this.selectedArrT[i])
      }
      this.selectedArrQ = this.unique(this.selectedArrQ)
    },
    // 重选
    resetChecked(){
        for (let j = 0; j < this.selectedArrQ.length; j++) {
          for (let i = 0; i < this.selectedArrT.length; i++) {
            if(this.selectedArrQ[j] == this.selectedArrT[i]){
              this.selectedArrQ.splice(j,1)
            }
          }
        }
       this.$refs.tree.setCheckedKeys([]);
    },
    addGroup(){
        this.inforVisible = true
        this.$refs.orderInfo.getGruops(this.selectedArrQ)
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
          }
        });
    },
    handleClick(tab, event) {
        console.log(tab, event);
    },
    handleSelectionChange(val){
      console.log(val)
        // for (let i = 0; i < val.length; i++) {
        //   this.selectedArrQ.push(val[i].name)
        // }
        // this.selectedArrQ = this.unique(this.selectedArrQ)
    },
    // 去重
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
  .drawerBackground{
    transform: rotate(180deg); 
    width: 26px;
    height: 89px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('/static/images/img/lawSupervise/btn_norshouqi2.png') no-repeat;
    background-size:cover;
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
            display: flex;
            margin: 11px 0px;
            justify-content: space-around;
        }
        .clickImg{
          img{
            margin-right: 5px;
          }
          margin-left: 45px;
        }
        .TreeWord{
            margin-left: 110px;
        }
        .operationImg{
          img{
            margin-right: 10px;
          }
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
}
</style>
