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
            :data="tableData"
            :header-cell-style="{'text-align':'center'}"
             @selection-change="handleSelectionChange"
             border
             height="200"
            style="width: 100%">
             <el-table-column
                type="selection"
                width="55">
              </el-table-column>
            <el-table-column type="expand" align="right">
              <template slot-scope="props">
                <el-form label-position="center" inline class="demo-table-expand">
                  <div class="openSelBig">
                    <div class="openSel">
                      <span class="TreeWord">{{ props.row.name }}</span>
                      <span class="clickImg">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/tel.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add1.jpg"  @click="selectP(props.row.name)" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add2.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/del2.jpg" alt="">
                      </span>
                    </div>
                    <div class="openSel">
                      <span class="TreeWord">{{ props.row.name }}</span>
                      <span class="clickImg">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/tel.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add1.jpg"  @click="selectP(props.row.name)" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/add2.jpg" alt="">
                        <img src="/static/images/img/lawSupervise/gzMapLeftD/del2.jpg" alt="">
                      </span>
                    </div>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="名称"
              prop="name">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
             >
              <template slot-scope="scope">
                <div class="operationImg">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/video.jpg" alt="">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/audio.jpg" alt="">
                  <img src="/static/images/img/lawSupervise/gzMapLeftD/del.jpg" alt="">
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
          <div class="bottomBtn">
            <div>
              <el-button type="primary" plain  @click="getCheckedKeys">确认</el-button>
            </div>
            <div>
              <el-button type="primary" plain  @click="resetChecked">重选</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      </el-tabs>
      <div>
        <p class="title">已选择人员</p>
        <div class="selectedBox">
          <div class="selected" v-show="flag" v-for="(item,index) in selectedArrQ" :key="index+1" >
            {{item}}
            <span @click="delPQ(item)">
                <img src="/static/images/img/lawSupervise/gzMapLeftD/del3.jpg" alt="">
            </span>
          </div>
          <div class="selected" v-show="!flag" v-for="(item,index) in selectedArrT" :key="index+12" >
            {{item}}
            <span @click="delPT(item)">
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
    

    <info-order ref="orderInfo" :v-if="inforVisible" :visibles.sync="inforVisible"></info-order>
  </div>
</template>

<script>
import addGroup from "./addGroup"
export default {
  components: {
    'info-order': addGroup,
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
      drawer: false,
      flag:true,
      activeName: 'first',
      input:'',
      inputModel: "",
      showCom: "",
      projectName: "",
      placeholder: "",
      tableData: [{
          name: '测试1',
        }, {
          name: '测试2',
        }, {
          name: '测试3',
        }, {
          name: '测试4',
        }],
      selectedArrQ:[],
      selectedArrT:[],
    }
  },
  methods: {
    // 搜索
    handleSearch(){

    },
    // 确认
    getCheckedKeys(){
      this.selectedArrT = this.$refs.tree.getCheckedKeys()
    },
    // 重选
    resetChecked(){
      this.selectedArrT = []
      this.$refs.tree.setCheckedKeys([]);
    },
    //创建群组
    addGroup(){
        this.inforVisible = true
      //  this.$refs.orderInfo.getAll(this.infoData.tagIds)
    },
    //添加人员
    selectP(val){
      this.selectedArrQ.push(val)
    },
    //删除人员
    delPQ(val){
      for (let i = 0; i <  this.selectedArrQ.length; i++) {
         if(val == this.selectedArrQ[i]){
           this.selectedArrQ.splice(i,1)
        }
      }
    },
    delPT(val){
      for (let i = 0; i <  this.selectedArrT.length; i++) {
         if(val == this.selectedArrT[i]){
           this.selectedArrT.splice(i,1)
        }
      }
    },
    handleClick(tab, event) {
      if(tab.label == "通讯录"){
        this.flag = false
      }else{
        this.flag = true
      }
        console.log(tab, event);
    },
    handleSelectionChange(val){
        for (let i = 0; i < val.length; i++) {
          this.selectedArrQ.push(val[i].name)
        }
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
    height: 155px;
  }
  .treeT{
    height: 150px;
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
    margin: 12px 0px;
  }
    .participants_table{
      margin: 12px 0px;
        .openSel{
            display: flex;
            margin-top: 5px 0px;
            justify-content: space-around;
        }
        .clickImg{
          img{
            margin-right: 5px;
          }
          margin-left: 45px;
        }
        .TreeWord{
            margin-left: 55px;
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
