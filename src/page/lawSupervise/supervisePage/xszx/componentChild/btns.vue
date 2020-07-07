<template>
  <div class="superviseBtns">
    <div v-if="['0', '1'].indexOf(tabActiveValue) > -1">
        <el-button type="button" class="submitBtn grayBtn" @click="showInvalidCue" >
            <i class="el-icon-warning-outline"></i>
            <div>无效<br />信息</div>
        </el-button>
    </div>
    <!-- <div v-if="['1', '2', '3'].indexOf(tabActiveValue) > -1">
      <el-button type="button" class="submitBtn blueBtn" @click="prevRouter">
        <i class="iconfont law-xiayibu"></i>
        <div>上一步</div>
      </el-button>
    </div> -->
    <div v-if="['0', '1'].indexOf(tabActiveValue) > -1">
      <el-button type="button" class="submitBtn blueBtn" @click="nextRouter">
        <i class="iconfont law-xiayibu"></i>
        <div>下一步</div>
      </el-button>
    </div>
    <div v-if="tabActiveValue == '3'">
      <el-button type="button" class="submitBtn blueBtn"  @click="showZbDialog">
        <i class="iconfont law-xiayibu"></i>
        <div>转办</div>
      </el-button>
    </div>

    <div v-else>
      <el-button v-if="tabActiveValue ==='2' && $route.name!='law_supervise_invalidCueDetail'" type="button" class="submitBtn blueBtn" @click="showZbDialog">
        <div>转立案</div>
      </el-button>
    </div>
    <span :class="$route.name" v-if="statusObj[$route.params.status] === '待审核' || statusObj[$route.params.status] === '已审核'" style="right: 370px;">
         {{statusObj[$route.params.status]}}
    </span>
    <span :class="$route.name" v-else-if="$route.params.status === '2'" style="right: 370px;">
         {{statusObj[$route.params.status]}}
    </span>
    <span :class="$route.name" v-else-if="$route.name=='law_supervise_invalidCueDetail'" style="right: 370px;">
         无效
    </span>
    <span :class="$route.name" v-else>
         {{statusObj[$route.params.status]}}
    </span>

    <div>
        <el-dialog class="mini-dialog-title" title="无效信息" :visible.sync="visible" :show-close="false"
            :close-on-click-modal="false" width="420px"  append-to-body>
            <div class="error-message">
            <div class="">
                <img src="@/../static/images/img/cluesReview/icon_wuxiao.png"  alt="" />
            </div>
            <p>当前线索为无效信息</p>
            </div>
            <!-- <el-form :model="checkSearchForm" ref="checkSearchForm1" class="checkSearchForm" label-width="0"> -->
            <div class="invalidinfo">
                <el-select v-model="checkSearchForm.number" placeholder="无效类型">
                          <el-option
                        v-for="item in invalidList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                        ></el-option>
                </el-select>
                <p>备注说明</p>
                <el-input v-model="checkSearchForm.color" type="textarea" :autosize="{ minRows: 1}"></el-input>
            </div>
            <!-- </el-form> -->
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="routerOffSiteManage('无效信息')">确认</el-button>
            <el-button @click="visible = false">取消</el-button>
            </span>
        </el-dialog>
        <el-dialog class="mini-dialog-title" title="转办说明" :visible.sync="zbVisible" :show-close="false"
            :close-on-click-modal="false" width="600px" append-to-body>
            <el-form :model="checkSearchForm" ref="checkSearchForm" class="checkSearchForm" label-width="130px">
                <table style="line-height:50px;">
                    <tr>
                    <!-- <el-form-item label=""> -->
                        <td width="100px">立案机构：</td>
                        <td width="430px">
                            <el-popover
                                placement="bottom"
                                    trigger="click"
                                    style="z-index:3300"
                                    v-model="visiblePopover"
                                >
                                <div class="departOrUserTree" style="width:400px">
                                    <div class="treeBox">
                                        <el-tree
                                        class="filter-tree"
                                        :data="organData"
                                        :props="defaultProps"
                                        node-key="id"
                                        :filter-node-method="filterNode"
                                        :default-expanded-keys="defaultExpandedKeys"
                                        @node-expand="nodeExpand"
                                        ref="tree"
                                        @node-click="handleNodeClick1"
                                        >
                                        <span class="custom-tree-node" slot-scope="{ node,data }">
                                            <span>
                                            <i
                                                :class="data.children && data.children.length>0 ? 'iconfont law-icon_shou_bag' : ''"
                                            ></i>
                                            <span :class="data.children ? '' : 'hasMarginLeft'">{{ node.label }}</span>
                                            </span>
                                        </span>
                                        </el-tree>
                                    </div>
                                </div>
                                <el-input v-model="checkSearchForm.number" style="width:100%" slot="reference" placeholder="请选择执法机构"></el-input>
                            </el-popover>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            转办说明：
                        </td>
                        <td>
                            <el-input v-model="checkSearchForm.color" type="textarea"></el-input>
                        </td>
                    </tr>
                </table>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="routerOffSiteManage('转办')">确认</el-button>
                <el-button @click="zbVisible = false">取消</el-button>
            </span>
        </el-dialog>

        <el-dialog class="mini-dialog-title" title="转立案" :visible.sync="zlaVisible" :show-close="false"
            :close-on-click-modal="false" width="420px"  append-to-body>
            <div class="error-message">
            <div class="">
                <!-- <img src="@/../static/images/img/cluesReview/icon_wuxiao.png"  alt="" /> -->
            </div>
            <p>保存成功，点击 “确认” 页面将跳转到 “立案” 页面！</p>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="goZLA">确认</el-button>
            <el-button @click="zlaVisible = false">取消</el-button>
            </span>
        </el-dialog>
    </div>


  </div>
</template>
<style lang="scss" src="@/assets/css/cluesReview.scss" scoped></style>
<style scoped lang="scss" scoped>
.el-popover {
    z-index: 3300;
}
</style>
<script>
import {mapGetters} from "vuex";
import { BASIC_DATA_SYS } from "@/common/js/BASIC_DATA.js";
import {findAllDrawerById, saveAndUpdate,transerCase} from '@/api/lawSupervise.js';
export default {
  //tabActiveValue: 1检测数据核对,2违法超限复核,3生成证据包
  props: ['tabActiveValue', 'obj'],
  data() {
    return {
        statusObj: {
            '0': '待审核',
            '1': '审核中',
            '2': '审核中',
            '3': '已审核'
        },
        zlaVisible:false,
        selectCurrentTreeName: "",
        defaultExpandedKeys: [],
        organData: [],
        defaultProps: {
            children: "children",
            label: "label"
        },
      visible: false,
      zbVisible: false,
      checkSearchForm: {
        number: '',
        color: ''
      },
      icon: [''],
      invalidList: [],
      visiblePopover: false
    };
  },
  methods: {
    showZbDialog () {
        // this.getAllOrgan('root');
        // this.zbVisible = true;
        this.obj.status='已审核'
        let _this = this;
        new Promise((resolve, reject) => {
            saveAndUpdate(_this.obj).then(
                res => {
                    _this.zlaVisible = true;
                },
                error => {
                    return
                }
            )
        })

    },
    goZLA () {
        let _this = this;
        new Promise((resolve, reject) => {
            transerCase(_this.obj.id).then(
                res => {
                    debugger;
                    _this.zlaVisible = true;
                    // _this.$store.commit('setCaseId','f205736182a36d9fd0574fa75eb30a30');
                    _this.$store.commit('setCaseId',res.data.id);
                    _this.$store.commit('setCaseApproval',false);
                    // _this.$store.commit('setCaseNumber','吐临〔2020〕第00320号');;
                     _this.$store.commit('setCaseNumber',res.data.caseNumber);
                    _this.$router.push({
                        name: 'case_handle_establish'
                    });
                },
                error => {
                    return
                }
            )
        })
    },
    handleNodeClick1(data) {
      this.checkSearchForm.number = data.label;
      this.visiblePopover = false;
    },
    getAllOrgan(organId) {
      let _this = this
      this.$store.dispatch("getAllOrgan").then(
        res => {
          _this.defaultExpandedKeys.push(res.data[0].id);
          _this.selectCurrentTreeName = _this.selectCurrentTreeName
            ? _this.selectCurrentTreeName
            : res.data[0].label;
          if (res.data[0].children && res.data[0].children.length > 0) {
            res.data[0].children.forEach(item => {
              _this.defaultExpandedKeys.push(item.id);
            });
          }
          _this.organData = res.data;
          console.log(_this.defaultExpandedKeys);
          console.log(_this.organData);
          if (organId == "root") {
            _this.currentOrganId = res.data[0].id;
          } else {
            _this.currentOrganId = organId;
          }
        //   _this.getSelectOrgan();
        },
        err => {
          console.log(err);
        }
      );
    },
    nodeExpand(data, node, jq) {
      console.log(data);
      console.log(node);
      console.log(jq);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    showInvalidCue(data) {
      console.log(data);
      this.findAllDrawerById(BASIC_DATA_SYS.invalidCode, 'invalidList');
      this.visible = true;
    },
    //关闭弹窗的时候清除数据
    closeDialog() {
      this.visible = false;
    },
    gotoCoerciveMeasureDoc() {
      this.$store.dispatch("deleteTabs", this.$route.name);
      this.$router.push({ name: 'law_supervise_removeOrPrelong' })
    },
    routerOffSiteManage (status) {
      if(status === '无效信息'){
        if(this.checkSearchForm.number===''){
          this.$message({type: "warning",message: "无效类型不能为空!"});
          return
        }
        /* if(this.checkSearchForm.color===''){
          this.$message({type: "warning",message: "备注说明不能为空!"});
          return
        } */
        this.obj.status=status
        this.obj.invalidInfo = JSON.stringify(this.checkSearchForm)
        let _this = this;
        new Promise((resolve, reject) => {
            saveAndUpdate(_this.obj).then(
                res => {
                  _this.$store.dispatch("deleteTabs", _this.$route.name);
                  _this.$router.push({
                      name: 'law_supervise_offSiteManage'
                  })
                },
                error => {
                    return
                }
            )
        })
      }
    },
    dialogInvalidCue() {

    },
    goToInforCollect() {

      this.$store.commit('setCaseId','f205736182a36d9fd0574fa75eb30a30');
      this.$store.commit('setCaseApproval',false);
      this.$store.commit('setCaseNumber','吐临〔2020〕第00320号');
      this.$router.push({
        name: 'case_handle_establish'
      });
      // let someCaseInfo = {"illageAct":"从事水路运输经营的船舶未随船携带船舶营运证件","illageActId":"206e7cbe53ff4a1dad5a7607fdbe9b28","programType":"一般程序","caseType":"标准案件","caseTypeId":"c82372d6b571a5b5691451a477bd58bc","cateId":"1002000300000000","cateName":"水路运政"}
      // iLocalStroage.sets("someCaseInfo", someCaseInfo);
      // this.$router.push({
      //     name: 'inforCollect',
      // });
    },
    nextRouter() {
        if (this.$route.params.status == '0') {
            this.obj.status='审核中'
            let _this = this;
            new Promise((resolve, reject) => {
              debugger
                saveAndUpdate(_this.obj).then(
                    res => {
                        debugger;
                    },
                    error => {
                            return
                    }
                )
            })
            // return
        }

      let nextStatus=parseInt(this.$route.params.status)+1
      this.$router.push({
        name: 'law_supervise_examineDoingDetail',
        params: {
          status: nextStatus.toString(),
          //tabTitle: '【监管】'+this.statusObj[nextStatus.toString()],
          tabTitle:'线索详情',
          offSiteManageId: this.$route.params.offSiteManageId
        }
      });
    },
    /* prevRouter() {
      let prevStatus=parseInt(this.$route.params.status)-1;
      this.$router.push({
        name: 'law_supervise_examineDoingDetail',
        params: {
          status: prevStatus.toString(),
          tabTitle: '【线索详情】'+this.statusObj[prevStatus.toString()],
          offSiteManageId: this.$route.params.offSiteManageId
        }
      });
    }, */
    findAllDrawerById (data, obj) {
        let _this = this
        new Promise((resolve, reject) => {
            findAllDrawerById(data).then(
                res => {
                    // resolve(res)
                    _this[obj] = res.data
                },
                error => {
                    //  _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
  },
  mounted() {

  },
  computed: {
  },
}
</script>
