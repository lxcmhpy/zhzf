<template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox toggleBox">
        <div class="handlePart" style="margin-left: 0px;">
        <viewNotice ref="viewNoticeRef"></viewNotice>
        <div class="search">
          <el-form :inline="true" :model="form" ref="form">
            <el-form-item label="案卷编号">
              <el-input v-model="form.caseNo" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="执法类型">
              <el-input v-model="form.caseType" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="立案机构">
              <el-input v-model="form.orgName" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="初评总分">
              <el-input v-model="form.oneScoreSum" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="复评总分">
              <el-input v-model="form.twoScoreSum" :readonly="true"></el-input>
            </el-form-item>
            <div v-if="form.pfStatus==='1'">
                <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="commitData">提交</el-button>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" size="medium" icon="el-icon-search" @click="viewFile">查看附件</el-button>
                </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <div class="tablePart">
                 <!--  -->
        <!-- :span-method="tree" -->
         <!-- default-expand-all -->
        <el-table
        :data="tree"
        border
        style="width: 100%;">
            <el-table-column type="expand">
                <template slot-scope="scope1">
                    <div style="margin-left: 47px">
                        <!-- {{scope1.children}} -->
                        <el-table
                            :data="scope1.row.children"
                            border
                            style="width: 100%;">
                             <el-table-column type="expand">
                                <template slot-scope="scope">
                                    <div style="margin-left: 47px">
                                        <el-table
                                            :data="scope.row.children"
                                            border
                                            style="width: 100%;">
                                            <el-table-column
                                                prop="nrxm"
                                                label="评查内容">
                                            </el-table-column>
                                            <el-table-column
                                                prop="score"
                                                label="单项分值">
                                            </el-table-column>
                                            <el-table-column
                                                prop="oneSore"
                                                label="初评得分">
                                            </el-table-column>
                                            <el-table-column
                                                v-if="form.pfStatus==='1'"
                                                prop="twoSore"
                                                label="得分">
                                                <template slot-scope="scope" >
                                                    <el-input v-model="scope.row.twoSore" @blur="saveRecord(scope.row,'twoSore')" @focus="getOldValue(scope.row.twoSore)" ></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                v-else
                                                prop="twoSore"
                                                label="得分">
                                            </el-table-column>
                                            <el-table-column
                                                v-if="form.pfStatus==='1'"
                                                prop="season"
                                                label="扣分原因">
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.season" @blur="saveRecord(scope.row,'season')"  @focus="getOldValue(scope.row.season)"></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                v-else
                                                prop="season"
                                                label="扣分原因">
                                            </el-table-column>

                                        </el-table>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="indexTwo"
                                >
                            </el-table-column>
                        </el-table>
                     </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="indexOne"
                >
            </el-table-column>
             <!-- <el-table-column lable="二级1">
                  <template slot-scope="scope1">
                      <div>
                        <el-table-column
                            prop="indexTwo"
                            label="二级指标">
                        </el-table-column>

                    </div>
                  </template>
             </el-table-column> -->
            <!-- <el-table-column
                prop="indexTwo"
                label="二级指标">
            </el-table-column>
            <el-table-column
                prop="nrxm"
                label="评查内容">
            </el-table-column>
            <el-table-column
                prop="score"
                label="单项分值">
            </el-table-column>
            <el-table-column
                v-if="form.pfStatus==='0'"
                prop="twoSore"
                label="得分">
                <template slot-scope="scope" >
                    <el-input v-model="scope.row.twoSore" @blur="saveRecord(scope.row,'twoSore')" @focus="getOldValue(scope.row.twoSore)" ></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                prop="twoSore"
                label="得分">
            </el-table-column>
            <el-table-column
                v-if="form.pfStatus==='0'"
                prop="season"
                label="扣分原因">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.season" @blur="saveRecord(scope.row,'season')"  @focus="getOldValue(scope.row.season)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                prop="season"
                label="扣分原因">
            </el-table-column> -->
        </el-table>
        <!-- <el-table
        :data="form.pykhScoreDetailsVos"
        border
        :span-method="objectSpanMethod"
        style="width: 100%;">
            <el-table-column
                prop="indexOne"
                label="一级指标">
            </el-table-column>
            <el-table-column
                prop="indexTwo"
                label="二级指标">
            </el-table-column>
            <el-table-column
                prop="nrxm"
                label="评查内容">
            </el-table-column>
            <el-table-column
                prop="score"
                label="单项分值">
            </el-table-column>
            <el-table-column
                prop="oneSore"
                label="初评得分">
            </el-table-column>
            <el-table-column
                v-if="form.pfStatus==='1'"
                prop="twoSore"
                label="得分">
                <template slot-scope="scope" >
                    <el-input v-model="scope.row.twoSore" @blur="saveRecord(scope.row,'twoSore')" @focus="getOldValue(scope.row.twoSore)" ></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                prop="twoSore"
                label="得分">
            </el-table-column>
            <el-table-column
                v-if="form.pfStatus==='1'"
                prop="season"
                label="扣分原因">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.season" @blur="saveRecord(scope.row,'season')"  @focus="getOldValue(scope.row.season)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                v-else
                prop="season"
                label="扣分原因">
            </el-table-column>
        </el-table> -->
      </div>
    </div>
    </div>
</template>
<script>
  import {getCaseInfoDetailByPid,updateScore,updateScoreState} from "@/api/appraisalExam.js";
  import { mixinsCommon } from "@/common/js/mixinsCommon";
  import viewNotice from "./noticeManage/viewNotice";
  import _ from "lodash";
export default {
    mixins: [mixinsCommon],
    components: {
      viewNotice
    },
    data () {
        return {
            form:{},
            pykhScoreDetailsVos:[],
            oldValue:"",
	        tree: []
        }
    },
    methods: {
        // (row，column,第行数，第列数)
       objectSpanMethod({ row, column, rowIndex, columnIndex }) {
           // 第一列合并规则
            if (columnIndex === 0) {
                // 当前行数 % 需要合并的行数
                if (row.rowspan === 0) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                } else {
                    return {
                        rowspan: row.rowspan,
                        colspan: 1
                    };
                }
            }
            if (columnIndex === 1) {
                if (row.rowspan1 === 0) {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                } else {
                    return {
                        rowspan: row.rowspan,
                        colspan: 1
                    };
                }
            }
      },
      viewFile(){
        let routerData = {
              id:this.form.storageId
          }
          this.$router.push({ name: "catsAppraisalPDF", params: routerData });
      },
      commitData(){
        var re = /^[0-9]([0-9])*$/;
        let validata = this.pykhScoreDetailsVos.find(value=>value.twoSore===null || !re.test(value.twoSore))
        if(validata){
            this.$message({type: "warning",message: "全部评分之后才能提交"});
            return
        }
        const data = {
            id:this.form.id,
            assessType:"案卷评查",
            pfstatus:this.form.pfStatus
        }
        let _this = this
        updateScoreState(data).then(
            res => {
                _this.$message({type: "success",message: "提交成功!"});
                _this.$store.dispatch("deleteTabs", _this.$route.name);//关闭当前页签
                _this.$router.push({
                    name: this.$route.params.url
                });
            },
            err => {
                console.log(err);
            }
        );
      },
      saveRecord(row,key){
          if(this.oldValue !== row[key]){
            if(key === "twoSore" || key === "oneSore"){
                var re = /^[0-9]([0-9])*$/;
                if (!re.test(row[key])) {
                    row[key]=''
                    this.$message({type: "error",message: "请输入整数"});
                    return
                }
                if(parseInt(row[key])>row.score){
                    row[key]=''
                    this.$message({type: "error",message: "得分不能高于单项分值"});
                    return
                }
            }
            updateScore(row).then(
                res => {
                    
                },
                err => {
                    console.log(err);
                }
            );
          }
      },
      getOldValue(val){
          this.oldValue=val
      },
      load() {

      },
      fetchData(){
        this.form = this.$route.params
	    let _this = this
        getCaseInfoDetailByPid(this.$route.params.id).then(
            res => {
                _this.pykhScoreDetailsVos = res.data;
                // let tree = [];
                let firstIdList = filterId(_this.pykhScoreDetailsVos, 'indexOneId');

                // this.form.pykhScoreDetailsVos.forEach((v,i)=>{
                //     firstIdList.push(v.indexOneId);
                // })
                // firstIdList = new Set(firstIdList);

                firstIdList.forEach((v,i)=>{
                    let obj = {
                        children: []
                    }
                    let index = _.findIndex(_this.pykhScoreDetailsVos,(chr)=>{
                        return chr.indexOneId === v;
                    })
                    if (index > -1) {
                        obj.indexOne = _this.pykhScoreDetailsVos[index].indexOne;
                        obj.indexOneId = _this.pykhScoreDetailsVos[index].indexOneId;
                        // obj.nrxm = _this.pykhScoreDetailsVos[index].nrxm;
                    }

                    let secondList = _.filter(_this.pykhScoreDetailsVos, function(o) { return o.indexOneId === v; });

                    let secondIdList = filterId(secondList,'indexTwoId');



                    secondIdList.forEach((v2,i)=>{
                        let obj2 = {

                        }
                        let index2 = _.findIndex(_this.pykhScoreDetailsVos,(chr)=>{
                            return chr.indexTwoId === v2 && chr.indexOneId === v;
                        })
                        if (index2 > -1) {
                            obj2.indexTwo = _this.pykhScoreDetailsVos[index2].indexTwo;
                            obj2.indexTwoId = _this.pykhScoreDetailsVos[index2].indexTwoId;
                            let thirdList = _.filter(_this.pykhScoreDetailsVos, function(o) { return o.indexOneId === v&&o.indexTwoId === v2; });
                            obj2.children = thirdList;
                            // let thirdIdList = [];
                            // filterId(thirdIdList,_this.pykhScoreDetailsVos, 'indexThirdId');
                            obj.children.push(obj2);
                        }

                    })
                    _this.tree.push(obj);
                })

                function filterId (oldList ,filedName) {
                    let newList = [];
                    oldList.forEach((v,i)=>{
                        newList.push(v[filedName]);
                    })
                    return new Set(newList);
                }
            },
            err => {
                console.log(err);
            }
        );
      }
    },
    mounted () {
      if(this.$route.params.id !== undefined){
            this.fetchData();
        }
    }
}
</script>
