 <template>
    <div class="com_searchAndpageBoxPadding">
        <div class="searchAndpageBox toggleBox">
            <div class="handlePart" style="margin-left: 0px;">
                <el-button type="primary" size="medium" @click="addPykh">
                    <i class="iconfont law-submit-o f12"></i> 添加一级考核指标
                </el-button>
            </div>
            <div class="tablePart">
                 <!-- @row-click="handleNodeClick" -->
                <el-table :data="tableData" stripe resizable border style="width: 100%;height:100%;" @expand-change="load"
                row-key="id" :expand-row-keys="expandList" current-row-key="id">
                    <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                    <el-table-column type="expand" width="45">
                        <!-- <template slot="header" >
                            二级
                        </template> -->
                        <template slot-scope="scope">
                        <div style="padding:0px 0px 35px 45px;min-width:620px;min-height: 550px;">
                            <div class="handlePart" style="margin: 8px 0px 8px 0px;">
                                <el-button type="primary" size="medium" @click="addZbConfig(scope.row)">
                                    <i class="iconfont law-submit-o f12"></i> 添加二级考核指标
                                </el-button>
                            </div>
                            <div style="border: 1px solid #f4f4f4;" v-if="zbList.length>0">
                                <el-table class="xzList" :data="zbList" stripe resizable border style="height:100%;"
                                 @expand-change="loadXzList" row-key="id" :expand-row-keys="expandXzList" current-row-key="id">
                                     <el-table-column type="expand" width="45">
                                        <!-- <template slot="header" >
                                            考评细则
                                        </template> -->
                                        <template slot-scope="scope1">
                                        <div style="padding:0px 0px 35px 45px;min-width:620px;min-height: 550px;">
                                            <div class="handlePart" style="margin: 8px 0px 8px 0px;">
                                                <el-button type="primary" size="medium" @click="addXzConfig(scope1.row)">
                                                    <i class="iconfont law-submit-o f12"></i> 添加考评细则
                                                </el-button>
                                            </div>
                                            <div style="border: 1px solid #f4f4f4;" v-if="zbList.length>0">
                                                <el-table class="xzList" :data="xzList" stripe resizable border style="height:100%;" >
                                                    <!-- <el-table-column prop="reviewType" label="评查类别" align="center" ></el-table-column> -->
                                                    <el-table-column prop="nrxm" label="考评内容及评分标准" align="center" ></el-table-column>
                                                    <!-- <el-table-column prop="sore" label="分值" align="center" ></el-table-column> -->
                                                    <!-- <el-table-column prop="xsyq" label="评查形式/评查内容和要求" align="center" ></el-table-column> -->
                                                    <!-- <el-table-column prop="xdxz" label="评查要点/评分细则" align="center" ></el-table-column> -->
                                                    <el-table-column label="操作" align="center" width="150">
                                                        <template  slot-scope="scope2">
                                                            <el-button type="text" @click.stop @click="updateXzConfig(scope2.$index, scope2.row)">修改</el-button>
                                                            <el-button type="text" @click.stop @click="deletePykhMetricsById(scope2.$index,scope2.row)">删除</el-button>
                                                            <!-- <el-button type="text" @click.stop @click="addXzDialog(scope1.row)">配置考评细则</el-button> -->
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                                 <div class="paginationBox" >
                                                    <div v-if="total2/xzForm.size > 1">
                                                        <el-pagination
                                                            @size-change="(size)=>handleXzSizeChange(scope1.row.id,size)"
                                                            @current-change="(current)=>handleXzCurrentChange(scope1.row.id,current)"
                                                            :current-page="xzForm.current"
                                                            background
                                                            :page-sizes="[5, 10, 20, 30, 40]"
                                                            :page-size="xzForm.size"
                                                            layout="prev, pager, next,sizes,jumper"
                                                            :total="total2"
                                                        ></el-pagination>
                                                    </div>
                                                    <div class="noMore" v-else>没有更多了</div>
                                                </div>
                                            </div>
                                        </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="indexTwo" label="二级考核指标" align="center" ></el-table-column>
                                    <!-- <el-table-column prop="assessType" label="考核类别" align="center" width="100"></el-table-column> -->
                                    <el-table-column label="操作" align="center"  width="150">
                                        <template  slot-scope="scope1">
                                            <el-button type="text" @click.stop @click="updateZbConfig(scope1.$index, scope1.row)">修改</el-button>
                                            <el-button type="text" @click.stop @click="deletePykhMetricsById(scope.row,scope1.row)">删除</el-button>
                                            <!-- <el-button type="text" @click.stop @click="searchXzDialog(scope1.row)">配置考评细则</el-button> -->
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="paginationBox" >
                                    <div v-if="total1/zbForm.size > 1">
                                        <el-pagination
                                            @size-change="(size)=>handleZbSizeChange(scope.row.id,size)"
                                            @current-change="(current)=>handleZbCurrentChange(scope.row.id,current)"
                                            :current-page="zbForm.current"
                                            background
                                            :page-sizes="[5, 10, 20, 30, 40]"
                                            :page-size="zbForm.size"
                                            layout="prev, pager, next,sizes,jumper"
                                            :total="total1"
                                        ></el-pagination>
                                    </div>
                                    <div class="noMore" v-else>没有更多了</div>
                                </div>
                            </div>
                        </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="indexOne" label="一级考核指标" align="center" ></el-table-column>
                    <!-- <el-table-column prop="startTime" label="立案开始时间" align="center"></el-table-column> -->
                    <!-- <el-table-column prop="endTime" label="立案截止时间"  align="center"></el-table-column> -->
                    <el-table-column prop="oneType" label="指标类型配置" align="center" width="150"></el-table-column>
                    <el-table-column label="操作" align="center"  width="150">

                        <template  slot-scope="scope">
                            <el-button type="text" @click.stop @click="updatePykhConfig(scope.$index, scope.row)">修改</el-button>
                            <el-button type="text" @click.stop @click="deletePykhConfigById(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paginationBox" >
                <div v-if="total/form.size > 1">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="form.current"
                        background
                        :page-sizes="[5, 10, 20, 30, 40]"
                        :page-size="form.size"
                        layout="prev, pager, next,sizes,jumper"
                        :total="total"
                    ></el-pagination>
                </div>
                <div class="noMore" v-else>没有更多了</div>
            </div>
        </div>
        <el-drawer title="考核要求" modal-append-to-body direction="rtl" size="450px" customClass="amap-drawer" :modal="false" :visible.sync="drawer">
            <el-form :model="pykhObj" ref="pykhObj" :rules="rules" class="checkSearchForm" label-width="120px">
                <div style="width:400px">
                    <div class="item">
                        <el-form-item label="一级考核指标" prop="indexOne">
                            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}"  v-model="pykhObj.indexOne" class="w-120" placeholder="请输入一级考核指标"></el-input>

                        </el-form-item>
                    </div>
                    <!-- <div class="item">
                        <el-form-item label="立案开始时间" prop="startTime">
                              <el-date-picker
                              style='width:282px'
                                v-model="pykhObj.startTime"
                                type="date"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                placeholder="立案开始时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </div> -->
                    <!-- <div class="item">
                        <el-form-item label="立案截止时间" prop="endTime">
                            <el-date-picker
                              style='width:282px'
                                v-model="pykhObj.endTime"
                                type="date"
                                value-format="yyyy-MM-dd" format="yyyy-MM-dd"
                                placeholder="立案截止时间"
                                >
                            </el-date-picker>
                        </el-form-item>
                    </div> -->
                    <div class="item">
                        <el-form-item label="指标类型配置" prop="oneType">
                            <!-- <el-input v-model="pykhObj.oneType" placeholder="请输入指标类型配置"></el-input> -->
                            <el-select v-model="pykhObj.oneTypeId" class="w-220"  @change="changeOneType(pykhObj.oneTypeId)">
                                <el-option  v-for="(item,index) in oneZblxList.data" :key="index" :value="item.id" :label="item.name" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <br>
             <div class="demo-drawer__footer" style="text-align:center">
                <el-button type="primary" @click="addPykhConfig" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                <el-button @click="closeDraw">取 消</el-button>
            </div>
        </el-drawer>
        <el-drawer title="考核指标" modal-append-to-body direction="rtl" size="450px" customClass="amap-drawer" :modal="false" :visible.sync="drawer1">
            <el-form :model="zbObj" ref="zbObj" :rules="rules1" class="checkSearchForm" label-width="120px">
                <div v-if="zbObj" style="width:400px">
                    <div class="item">
                        <el-form-item label="二级考核指标" prop="indexTwo">
                            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="zbObj.indexTwo" placeholder="请输入二级考核指标"></el-input>
                        </el-form-item>
                    </div>
                    <!-- <div class="item">
                        <el-form-item label="考核指标类别" >
                            <el-select v-model="zbObj.assessTypeId" class="w-220"  @change="changeType(zbObj.assessTypeId)">
                                <el-option  v-for="(item,index) in khlbList.data" :key="index" :value="item.id" :label="item.name" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div> -->
                </div>
            </el-form>
            <br>
             <div class="demo-drawer__footer" style="text-align:center">
                <el-button type="primary" @click="addOrUpdatePykhMetrics" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                <el-button @click="closeDraw1">取 消</el-button>
            </div>
        </el-drawer>
        <el-drawer title="考核细则" modal-append-to-body direction="rtl" size="500px" customClass="amap-drawer" :modal="false" :visible.sync="drawer2">
            <div style="padding:0px 0px 35px 45px;min-width:620px;">
                  <el-form :model="xzObj" ref="xzObj" :rules="rules2" class="checkSearchForm" label-width="150px">
                <div v-if="xzObj" style="width:400px">
                    <!-- <div class="item">
                        <el-form-item label="评查类别" prop="indexTwo">
                            <el-input v-model="xzObj.reviewType" placeholder="请输入评查类别"></el-input>
                        </el-form-item>
                    </div> -->
                    <div class="item">
                        <el-form-item label="考评内容及评分标准" prop="nrxm">
                           <el-input :autosize="{ minRows: 5, maxRows: 10}"  type="textarea" v-model="xzObj.nrxm" placeholder="请输入考评内容及评分标准"></el-input>
                        </el-form-item>
                    </div>
                        <!-- <div class="item">
                        <el-form-item label="分值" >
                            <el-input v-model="xzObj.sore" placeholder="请输入评查内容/评查项目"></el-input>
                        </el-form-item>
                    </div>
                        <div class="item">
                        <el-form-item label="评查形式/评查内容和要求" >
                            <el-input v-model="xzObj.xsyq" placeholder="请输入评查内容/评查项目"></el-input>
                        </el-form-item>
                    </div>
                        <div class="item">
                        <el-form-item label="评查要点/评分细则" >
                          <el-input v-model="xzObj.xdxz" placeholder="请输入评查内容/评查项目"></el-input>
                        </el-form-item>
                    </div> -->
                </div>
                 <div class="demo-drawer__footer" style="text-align:center">
                <el-button type="primary" @click="addorUpdateDetailZp" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                <el-button @click="closeDraw1">取 消</el-button>
            </div>
            </el-form>
                </div>
        </el-drawer>

        <!-- <el-table-column prop="reviewType" label="评查类别" align="center" ></el-table-column>
                                                    <el-table-column prop="nrxm" label="评查内容/评查项目" align="center" ></el-table-column>
                                                    <el-table-column prop="sore" label="分值" align="center" ></el-table-column>
                                                    <el-table-column prop="xsyq" label="评查形式/评查内容和要求" align="center" ></el-table-column>
                                                    <el-table-column prop="xdxz" label="评查要点/评分细则" align="center" ></el-table-column> -->
        <!-- <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
        <el-table-column
        label="操作">
        <template>
            <el-button>添加</el-button>
            <el-button>修改</el-button>
        </template>
      </el-table-column>
    </el-table> -->
    </div>
</template>
<script>
import { mixinsCommon } from "@/common/js/mixinsCommon";
import {findPykhConfigByPage,addOrUpdatePykhConfig,deletePykhConfigById,findPykhMetricsByPage,addOrUpdatePykhMetrics,deletePykhMetricsById,findPykhZpByPage,
addorUpdateDetailZp,deleteDetailZpById,findListVoByPykhZp} from "@/api/appraisalExam.js";
import iLocalStroage from '@/common/js/localStroage';
import {PYKH_DATA} from "@/common/js/BASIC_DATA.js";
import _ from "lodash";
  export default {
    mixins: [mixinsCommon],
    data() {
        let _this = this;
      return {
        xzList: [],
        expandXzList:[],
        expandList:null,
        timeList: ['', ''],
        rules: {
            indexOne: [{ required: true, message: '请输入一级考核指标', trigger: 'blur' }],
            oneType: [{ required: true, message: '请输入指标类型配置', trigger: 'change' }],
        },
        rules1: {
            indexTwo: [{ required: true, message: '请输入二级考核指标', trigger: 'blur' }],
            // assessTypeId: [{ required: true, message: '请输入考核指标类别', trigger: 'change' }]
        },
        rules2: {
            nrxm: [{ required: true, message: '请输入考评内容及评分标准', trigger: 'blur' }],
        },
        pickerOptions:  {
            onPick:  ({  maxDate,  minDate  })  =>  {
                if (minDate) {
                    _this.$set(_this.timeList,0,minDate);
                }
                let max = new Date(maxDate ? maxDate :minDate);
                max.setHours(23);
                max.setMinutes(59);
                max.setSeconds(59);
                _this.$set(_this.timeList,1,max);
            }
        },
        loading: false,
        drawer: false,
        form: {
            current: 1, //当前页
            size: 5, //每页显示条数
        },
        zbForm: {
            current: 1, //当前页
            size: 5, //每页显示条数
            pykhConfigId: ''
        },
        xzForm: {
            current: 1, //当前页
            size: 5, //每页显示条数
            metricsId: ''
        },
        total: 0,
        tableData: [],
        pykhObj: {
            id: "",
            note: "",
            createId: "",
            createName: "",
            createTime: "",
            modifyId: "",
            modifyTime: "",
            // startTime: "",
            // endTime: "",
            indexOne: "",
            organName: "",
            organId: "",
            oneType: "",
            oneTypeId: ""
        },
        zbList: [],
        zbObj: {
            "id": "",
			"note": "",
			"createId": "",
			"createName": "",
			"createTime": "",
			"modifyId": "",
			"modifyTime": "",
			"indexTwo": "",
			"assessType": "",
			"assessTypeId": "",
			"assessTypeName": "",
            "pykhConfigId": "",

        },
        xzObj: {
            reviewType: '',
            nrxm:'',
            sore: '',
            xsyq: '',
            xdxz:'',
            metricsId: ''
        },
        updateIndex: null,
        updateIndex1: null,
        drawer1: false,
        khlbList: [],
        oneZblxList: [],
        assessTypeObj: {
            name: '',
            id: ''
        },
        drawer2: false,
        total1: 0,
        total2: 0
      };
    },
    methods: {
    //   arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    //     if (rowIndex % 2 === 0) {
    //       if (columnIndex === 0) {
    //         return [1, 2];
    //       } else if (columnIndex === 1) {
    //         return [0, 0];
    //       }
    //     }
    //   },
    changeType (id) {
       let index =  _.findIndex(this.khlbList.data,(chr)=>{
            return id === chr.id;
        })
        if (index > -1) {
            // debugger;
            this.zbObj.assessType = this.khlbList.data[index].name;
            // this.zbObj.assessTypeId = this.khlbList.data[index].id;
            this.zbObj.assessTypeName = this.khlbList.data[index].name;
        }
    },
    changeOneType (id) {
       let index =  _.findIndex(this.oneZblxList.data,(chr)=>{
            return id === chr.id;
        })
        if (index > -1) {
            // debugger;
            this.pykhObj.oneType = this.oneZblxList.data[index].name;
            // this.zbObj.assessTypeId = this.khlbList.data[index].id;
            this.pykhObj.oneTypeId = this.oneZblxList.data[index].id;
        }
    },
    closeDraw () {
        this.drawer = false;
           this.$set(this, 'pykhObj', {
                    id: "",
                    note: "",
                    createId: "",
                    createName: "",
                    createTime: "",
                    modifyId: "",
                    modifyTime: "",
                    // startTime: "",
                    // endTime: "",
                    indexOne: "",
                    organName: "",
                    organId: "",
                    oneType: "",
                    oneTypeId: ""
                });
    },
    closeDraw1 () {
        this.drawer1 = false;
           this.$set(this, 'zbObj', {
            "id": "",
			"note": "",
			"createId": "",
			"createName": "",
			"createTime": "",
			"modifyId": "",
			"modifyTime": "",
			"indexTwo": "",
			"assessType": "",
			"assessTypeId": "",
			"assessTypeName": "",
			"pykhConfigId": ""
        });
    },
    rowKey() {
        return this.expandList.length>0?this.expandList[0].id: '';
    },
    load (row, expand){
        if(expand.length === 1) {
            this.findPykhMetricsByPage(row.id,1);
        } else if(expand.length === 1) {
            this.zbList = [];
             this.expandList.splice(0,1);
             this.findPykhMetricsByPage(row.id,1);
        } else {
             this.zbList = [];
             this.expandList= [];
        }
    },
    loadXzList (row,expand) {
        if(expand.length === 1) {
            this.findPykhZpByPage(row.id,1);
        } else if(expand.length === 1) {
            this.xzList = [];
             this.expandXzList.splice(0,1);
             this.findPykhZpByPage(row.id,1);
        } else {
             this.xzList = [];
             this.expandXzList= [];
        }
    },
    findPykhMetricsByPage(parentId,currentPage) {
        // let f = {pykhConfigId:item.id,current:1,size:5};
        this.zbForm.pykhConfigId = parentId;
        this.zbForm.current = currentPage;
        let _this = this;
        new Promise((resolve, reject) => {
            findPykhMetricsByPage(_this.zbForm).then(
                res => {
                    _this.zbList.splice(0,_this.zbList.length);
                    _this.zbList = res.data.records;
                    _this.total1 = res.data.total;
                    // _this.expandList= [item.id];
                },
                error => {
                     _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    searchXzDialog (row) {
        this.findPykhZpByPage(row);
    },
    addXzDialog(row) {
         this.$set(this, 'pykhObj', {
                    id: "",
                    note: "",
                    createId: "",
                    createName: "",
                    createTime: "",
                    modifyId: "",
                    modifyTime: "",
                    // startTime: "",
                    // endTime: "",
                    indexOne: "",
                    organName: "",
                    organId: "",
                    oneType: "",
                    oneTypeId: ""
                });

            this.updateIndex = null;
            this.drawer = true;
    },
    // 查询考核细则
    findPykhZpByPage (parentId, current) {
        debugger;
        this.xzForm.metricsId = parentId;
        this.xzForm.current = current;
        let _this = this;
        new Promise((resolve, reject) => {
            findPykhZpByPage(_this.xzForm).then(
                res => {
                    _this.xzList.splice(0,_this.xzList.length);
                    _this.xzList = res.data.records;
                    _this.total2 = res.data.total;
                    // _this.expandList= [item.id];
                },
                error => {
                     _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    deletePykhConfigById(item) {
        let _this = this;
        new Promise((resolve, reject) => {
            deletePykhConfigById(item.id).then(
                res => {
                    _this.errorMsg('删除成功', 'success');
                    _this.search(1);
                },
                error => {
                     _this.errorMsg(error.toString(), 'error')
                        return
                }
            )
        })
    },
    //查询列表
        search (val) {
            this.form.current = val;
            let _this = this;
            new Promise((resolve, reject) => {
                findPykhConfigByPage(_this.form).then(
                    res => {
                        resolve(res);
                        // _this.tableData.splice(0, _this.tableData.length);
                        _this.tableData = res.data.records;
                        _this.total = res.data.total;
                    },
                    error => {
                        //  _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })

        },
        async addPykh () {
            // this.pykhObj.startTime = "";
            // this.pykhObj.endTime = "";
            // this.pykhObj.oneType = "";
            // this.pykhObj.startTime = "";
            this.oneZblxList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.one_zblx);
            this.$set(this, 'pykhObj', {
                    id: "",
                    note: "",
                    createId: "",
                    createName: "",
                    createTime: "",
                    modifyId: "",
                    modifyTime: "",
                    // startTime: "",
                    // endTime: "",
                    indexOne: "",
                    organName: "",
                    organId: "",
                    oneType: "",
                    oneTypeId: ""
                });

            this.updateIndex = null;
            this.drawer = true;

        },
        async addZbConfig (row) {
            this.khlbList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.khlb);
            // this.assessTypeObj = this.khlbList.data?this.khlbList.data[0]: [];
            this.$set(this, 'zbObj', {
                "id": "",
                "note": "",
                "createId": "",
                "createName": "",
                "createTime": "",
                "modifyId": "",
                "modifyTime": "",
                "indexTwo": "",
                "assessType": "",
                "assessTypeId": "",
                "assessTypeName": "",
                "pykhConfigId": row.id
            });
            this.drawer1 = true;
            this.updateIndex1 = null;
        },
        async addXzConfig (row) {

            // this.khlbList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.khlb);
            // // this.assessTypeObj = this.khlbList.data?this.khlbList.data[0]: [];
            this.$set(this, 'xzObj', {
                                reviewType: '',
                                nrxm:'',
                                sore: '',
                                xsyq: '',
                                xdxz:'',
                                metricsId: row.id
                            });
            // this.drawer1 = true;
            this.drawer2 = true;
            this.updateIndex2 = null;
        },
        // async updateZbConfig () {
        //     this.khlbList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.khlb);
        //     // this.$set(this, 'zbObj', {

        //     //     });
        //     this.drawer1 = true;
        //     this.updateIndex1 = null;
        // },
        // searchKhlbList () {
        //     let _this = this;
        //     new Promise((resolve, reject) => {
        //         addOrUpdatePykhMetrics(PYKH_DATA.khlb).then(
        //             res => {
        //                 resolve(res);
        //                 // _this.tableData.splice(0, _this.tableData.length);
        //                 _this.tableData1 = res.data.records;
        //                 _this.total = res.data.total;
        //             },
        //             error => {
        //                 //  _this.errorMsg(error.toString(), 'error')
        //                     return
        //             }
        //         )
        //     })
        // },
        // 保存考核具体指标
        addOrUpdatePykhMetrics () {
            let _this = this;
            new Promise((resolve, reject) => {
                addOrUpdatePykhMetrics(_this.zbObj).then(
                    res => {
                        _this.errorMsg('保存成功', 'success');

                            if (_this.updateIndex1 === null) {
                                    //添加
                                    _this.findPykhMetricsByPage(_this.zbObj.pykhConfigId,1);
                                } else {
                                    // 更新
                                    _this.drawer1 = false;
                                    _this.$set(_this.zbList,_this.updateIndex1, _this.zbObj);
                                }
                                debugger;
                                 _this.$set(_this, 'zbObj', {
                                        "id": "",
                                        "note": "",
                                        "createId": "",
                                        "createName": "",
                                        "createTime": "",
                                        "modifyId": "",
                                        "modifyTime": "",
                                        "indexTwo": "",
                                        "assessType": "",
                                        "assessTypeId": "",
                                        "assessTypeName": "",
                                        "pykhConfigId": _this.zbObj.pykhConfigId
                                    });
                                _this.closeLoading();
                                 _this.errorMsg('保存成功', 'success')

                    },
                    error => {
                         _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        addorUpdateDetailZp () {
            let _this = this;
            new Promise((resolve, reject) => {
                addorUpdateDetailZp(_this.xzObj).then(
                    res => {
                        _this.errorMsg('保存成功', 'success');

                            if (_this.updateIndex2 === null) {
                                    //添加
                                    _this.findPykhZpByPage(_this.xzObj.metricsId,1);
                                } else {
                                    // 更新
                                    _this.drawer1 = false;
                                    _this.$set(_this.xzList,_this.updateIndex2, _this.xzObj);
                                }
                                 _this.$set(_this, 'xzObj', {
                                                        reviewType: '',
                                                        nrxm:'',
                                                        sore: '',
                                                        xsyq: '',
                                                        xdxz:'',
                                                        metricsId: _this.xzObj.metricsId
                                                    });
                                _this.closeLoading();
                                 _this.errorMsg('保存成功', 'success')

                    },
                    error => {
                         _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        // 删除考核具体指标
        deletePykhMetricsById (row,item) {
            let _this = this;
            new Promise((resolve, reject) => {
                deletePykhMetricsById(item.id).then(
                    res => {
                        _this.errorMsg('删除成功', 'success');
                        _this.findPykhMetricsByPage(row.id, 1);
                    },
                    error => {
                        _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        deleteDetailZpById (row,item) {
            let _this = this;
            new Promise((resolve, reject) => {
                deleteDetailZpById(item.id).then(
                    res => {
                        _this.errorMsg('删除成功', 'success');
                        _this.addorUpdateDetailZp(row.id, 1);
                    },
                    error => {
                        _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        findListVoByPykhZp () {
            new Promise((resolve, reject) => {
                findListVoByPykhZp(item.id).then(
                    res => {

                    },
                    error => {
                        _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        deleteXzById(row,item) {
            let _this = this;
            new Promise((resolve, reject) => {
                deletePykhMetricsById(item.id).then(
                    res => {
                        _this.errorMsg('删除成功', 'success');
                        _this.findPykhMetricsByPage(row);
                    },
                    error => {
                        _this.errorMsg(error.toString(), 'error')
                            return
                    }
                )
            })
        },
        reset (formName) {
            this.$refs[formName].resetFields();
        },
        async updatePykhConfig (index, row) {
            this.oneZblxList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.one_zblx);
            this.pykhObj = row;
            this.drawer = true;
            this.updateIndex = index;
        },
        async updateZbConfig (index, row) {
            // this.zbObj = row;
            this.khlbList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.khlb);
             this.$set(this, 'zbObj', row);
            this.drawer1 = true;
            this.updateIndex1 = index;
        },
        async updateXzConfig (index, row) {
            // this.zbObj = row;
            this.khlbList = await this.$store.dispatch("getDictListDetailTb", PYKH_DATA.khlb);
             this.$set(this, 'zbObj', row);
            this.drawer2 = true;
            this.updateIndex2 = index;
        },
        addPykhConfig () {
            if (this.loading) {
                return;
            }
            this.loading = true;
            let _this = this;
            this.$refs['pykhObj'].validate((valid) => {
                if (valid) {
                    new Promise((resolve, reject) => {
                        addOrUpdatePykhConfig(_this.pykhObj).then(
                            res => {
                                if (this.updateIndex === null) {
                                    //添加
                                    // _this.reset('pykhObj');
                                     _this.search(1);
                                } else {
                                    // 更新
                                    _this.drawer = false;
                                    _this.$set(_this.tableData,_this.updateIndex, _this.pykhObj);
                                }
                                 _this.$set(_this, 'pykhObj', {
                                            id: "",
                                            note: "",
                                            createId: "",
                                            createName: "",
                                            createTime: "",
                                            modifyId: "",
                                            modifyTime: "",
                                            // startTime: "",
                                            // endTime: "",
                                            indexOne: "",
                                            organName: "",
                                            organId: "",
                                            oneType: "",
                                            oneTypeId: ""
                                        });
                                _this.closeLoading();
                                 _this.errorMsg('保存成功', 'success')
                            },
                            error => {
                                 _this.errorMsg(error.toString(), 'error')
                                    return
                            }
                        )
                    })

                } else {
                    _this.errorMsg("您有必填字段未填写！", 'error')
                    _this.closeLoading();
                    return false;
                }

            });

        },
        closeLoading () {
            let _this = this;
             setTimeout(() => {
                _this.loading = false;
            }, 400);
        },
        cancelForm() {
            this.loading = false;
            this.dialog = false;
            // clearTimeout(this.timer);
        },
        handleCurrentChange(val) {
            debugger;
            this.search(val);
        },
        handleSizeChange(val) {
            this.form.size = val;
            this.search(1);
        },
        handleZbCurrentChange(parentId, val) {
            debugger;
            this.findPykhMetricsByPage(parentId, val);
        },
        handleZbSizeChange(parentId,val) {
            this.zbForm.size = val;
            this.findPykhMetricsByPage(parentId,1);
        },
          handleXzCurrentChange(parentId, val) {
            debugger;
            this.findPykhZpByPage(parentId, val);
        },
        handleXzSizeChange(parentId,val) {
            this.xzForm.size = val;
            this.findPykhZpByPage(parentId,1);
        },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 5 === 0) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        if (columnIndex === 1) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    created () {
        this.search(1);
        let userInfo = iLocalStroage.gets("userInfo");
        // this.pykhObj.organId = userInfo.organId;
        // this.pykhObj.organName = userInfo.organName;
    },
    mounted () {

    }
  };
</script>
