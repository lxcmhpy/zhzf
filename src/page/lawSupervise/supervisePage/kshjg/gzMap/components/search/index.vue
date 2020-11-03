<template>
  <div class="gzMap-search">
    <div class="drawerBackground" @click="drawer = true" type="primary">
      <i class="el-icon-arrow-left" />
    </div>
    <el-drawer
       :direction="direction"
      :visible.sync="drawer"
      :with-header="false">
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
                        <i class="el-icon-plus"  @click="selectP(props.row.name)"></i>
                        <i class="el-icon-delete"></i>
                        <i class="el-icon-video-camera"></i>
                      </span>
                    </div>
                    <div class="openSel">
                      <span class="TreeWord">{{ props.row.name }}</span>
                      <span class="clickImg">
                        <i class="el-icon-plus" @click="selectP(props.row.name)"></i>
                        <i class="el-icon-delete"></i>
                        <i class="el-icon-video-camera"></i>
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
                  <i class="el-icon-delete"></i>
                  <i class="el-icon-video-camera"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="通讯录" name="second">
        通讯录
      </el-tab-pane>
      </el-tabs>
      <div>
        <p class="title">已选择人员</p>
        <div v-show="flag" v-for="(item,index) in selectedArrQ" :key="index+1" >
          {{item}}
          <span @click="delP(item)">
            <i class="el-icon-close"></i>
          </span>
        </div>
      </div>
    </el-drawer>
    

    <header class="input-with-select" @click="handleShowSearch">
      <el-input
        v-model="inputModel"
        :placeholder="placeholder">
        <div slot="suffix" class="closeBox" @click="handleClose">
          <i class="el-icon-close"></i>
        </div>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>
    </header>
    <div class="jiangXiMap-search-mainBox">
      <keep-alive>
        <component
          :is="showCom"
          :window1="config.window1"
          :window2="config.window2"
          :window3="config.window3"
          :window4="config.window4"
          :window5="config.window5"
          @handleNodeClick="handleNodeClick"
          @handlePerson="handlePerson"
          @clickImg="clickImg"
          @handleClickBtns="handleClickBtns"
        />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Window1 from "./window1.vue";
import Window2 from "./window2.vue";
import Window3 from "./window3.vue";
import Window4 from "./window4.vue";
import Window5 from "./window5.vue";
import { organTreeByCurrUser, getOrganTree,getZfjgLawSupervise } from "@/api/lawSupervise.js";
import { findData } from "@/api/eventManage";
export default {
  provide() {
    return {
      page: this
    }
  },
  inject: ['indexPage'],
  props: {
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    Window1,
    Window2,
    Window3,
    Window4,
    Window5,
  },
  data() {
    return {
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
    selectP(val){
      this.selectedArrQ.push(val)
    },
    delP(val){
      for (let i = 0; i <  this.selectedArrQ.length; i++) {
         if(val == this.selectedArrQ[i]){
           this.selectedArrQ.splice(i)
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
      if(val){
        for (let i = 0; i < val.length; i++) {
          this.selectedArrQ.push(val[i].name)
        }
      }else{
         this.selectedArrQ.splice(val[i].name)
      }
    },
    /**
     * 单独获取执法人员的数据，为了在执法人员专题下单独显示
     */
    getPeople() {
      let param = {
        organId: this.indexPage.organId,
        type: 0
      }
      getOrganTree(param).then(res => {
        if(res.code === 200) {
          this.$message({
            message: '查询到'+res.data.length+'条数据',
            type: 'success'
          });
          return res.data
        } else {
          this.$message.error('getWindow2People()::::::::接口数据错误');
        }
      }).then(data => {
        this.config.window2.option = data.map(item => {
          item.type = 0
          item.label = item.nickName
          // 根据该点状态判断小图标颜色，peState为摄像头状态，padState为电话和视频状态; 0=离线 1=在线;
          if(item.peState && item.peState===1) {
            item.peStateColor = '#67C23A'
          } 
          if (item.padState && item.padState === 1) {
            item.padStateColor = '#409EFF'
          }
          return item
        })
      })
    },

    /**
     * 点击头部输入栏触发
     */
    handleShowSearch() {
      if(this.showCom === "") {
        this.showCom = "Window1"
      }
      this.$emit('handleShowSearch')
    },

    /**
     * 点击搜索按钮，获取数据
     */
    handleSearch() {
      if(this.projectName === "执法人员") {
        let param = {
          key: this.inputModel,
          organId: this.indexPage.organId,
          type: 0
        }
        // 搜索执法人员数据
        getOrganTree(param).then(res => {
          if(res.code === 200) {
            this.$message({
              message: '查询到'+res.data.length+'条数据',
              type: 'success'
            });
            return res.data
          } else {
            this.$message.error('getOrganTree()::::::::接口数据错误');
          }
        }).then(data => {
          this.config.window2.option = data.map(item => {
            item.type = 0
            item.label = item.nickName
            // 根据该点状态判断小图标颜色，peState为摄像头状态，padState为电话和视频状态; 0=离线 1=在线;
            if(item.peState && item.peState===1) {
                item.peStateColor = '#67C23A'
            } 
            if (item.padState && item.padState === 1) {
                item.padStateColor = '#409EFF'
            }
            return item
          })
        })
      } else if (this.projectName === "执法机构") {
        let params = {
          key: this.inputModel,
          organId: this.indexPage.organId,
          type: 1
        }
        let _this = this;
        getOrganTree(params).then(res => {
            if(res.code === 200) {
                this.$message({
                    message: '查询到'+res.data.length+'条数据',
                    type: 'success'
                });
                return res.data
            } else {
                this.$message.error('getOrganTree()::::::::接口数据错误');
            }
        }).then(data => {
          this.config.window2.option = data.map(item => {
            item.type = 1
            item.label = item.name
            return item
          })
        })
      }else if (this.projectName === "事件") {
        let params = {
          eventName: this.inputModel
        }
        let _this = this;
        findData(params).then(res => {
            if(res.code === 200) {
                this.$message({
                    message: '查询到'+res.data.records.length+'条数据',
                    type: 'success'
                });
                return res.data.records
            } else {
                this.$message.error('getOrganTree()::::::::接口数据错误');
            }
        }).then(data => {
          this.config.window2.option = data.map(item => {
              item.type = 5
              item.label = item.eventName
              item.propertyValue = item.eventCoordinate
              return item
          })
        })
      }else if (this.projectName === "非现场站点") {
        let params = {
          key: this.inputModel,
          type: 4
        }
        let _this = this;
        getZfjgLawSupervise(params).then(res => {
            if(res.code === 200) {
                this.$message({
                    message: '查询到'+res.data.length+'条数据',
                    type: 'success'
                });
                return res.data
            } else {
                this.$message.error('getZfjgLawSupervise()::::::::接口数据错误');
            }
        }).then(data => {
          this.config.window2.option = data.map(item => {
              item.type = 4
              item.label = item.name
              return item
          })
        })
      }
    },

    /**
     * 点击关闭图标触发
     */
    handleClose() {
      event.stopPropagation()
      this.showCom = ""
      this.inputModel=''
      this.$emit('handleClose')
    },

    /**
     * 节点被点击时的回调
     */
    handleNodeClick(data) {
      this.$emit('handleNodeClick', data)
    },

    /**
     * 点击人员在线头像
     */
    handlePerson(node) {
      this.$emit("handlePerson", node)
    },

    /**
     * 获取树形数据
     */
    getTree() {
      organTreeByCurrUser().then(res => {
        if(res.code === 200) {
          return res.data
        } else {
          throw new Error("organTreeByCurrUser() in jiangXiMap.vue::::::数据错误")
        }
      }).then(data => {
        this.config.window2.option = data
      })
    },

    /**
     * 点击专题图片，获取树形数据，下钻到树形窗口
     */
    clickImg(name) {
      this.projectName = name
      this.config.window2.option = []
      if(name === "执法机构") {
        this.placeholder = '搜索执法机构'
        this.getTree()
      } else if (name === "执法人员") {
        this.placeholder = '搜索执法人员'
        this.getPeople()
      } else if (name === "事件") {
        this.placeholder = '搜索事件'
        this.getEventData()
      } else if (name === "非现场站点") {
        this.placeholder = '搜索非现场站点'
        this.getSite()
      }
    },

    getEventData() {
      findData({current: 1, size: 2000000}).then(res => {
            if(res.code === 200) {
              return res.data.records
            } else {
              throw new Error("findData()::::::接口数据错误")
            }
          }).then(data => {
            this.config.window2.option = data.map(item => {
              item.type = 5
              item.label = item.eventName
              item.propertyValue = item.eventCoordinate
              return item
            })
          })
    },

    getSite() {
      let param = {
        type: 4
      }
      getZfjgLawSupervise(param).then(res => {
        if(res.code === 200) {
          return res.data
        }
      }).then(data => {
        this.config.window2.option = data.map(item => {
          item.type = 4
          item.label = item.name
          return item
        })
      })
    },


    /**
     * 点击底部小图标
     */
    handleClickBtns(index, data) {
      this.$emit('handleClickBtns', index, data)
    }
  }
}
</script>

<style lang="scss">
.participants_table{
  .openSel{
    display: flex;
    margin-top: 5px;
    justify-content: space-around;
  }
  // .clickImg{
  //   margin-left: 45px;
  // }
  .TreeWord{
    margin-left: 90px;
  }
}
.gzMap-search {
  position: absolute;
  top: 20px;
  width: 369px;
  box-sizing: border-box;
  .title{
    font-size: 18px;
    margin: 10px 0;
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
  .input-with-select {
    display: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    margin-bottom: 5px;
    .el-input__inner {
      width: 311px;
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
}
</style>
