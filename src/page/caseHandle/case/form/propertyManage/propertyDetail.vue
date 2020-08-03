<!-------长软------->
<template>
    <div class="com_searchAndpageBoxPadding hasBigMarginRight">
        <div class="searchAndpageBox searchAndpageBox2">
        <el-form ref="form" :model="form"  size="small" label-width="150px">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                    <router-link :to="{ name: 'case_handle_addProperty', params: { id: form.propertyInvolved.id }}">
                        <el-button type="primary" size="mini" icon="el-icon-edit" style="float:right;">编辑</el-button>
                    </router-link>
                </div>
                <div>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财务名称" prop="propertyName">
                                {{form.propertyInvolved.propertyName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财务数量" prop="propertyNum">
                              {{form.propertyInvolved.propertyNum + form.propertyInvolved.propertyNumUnit}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财物归属人/单位" prop="propertyBelonger">
                              {{form.propertyInvolved.propertyBelonger}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财物状态">
                              {{form.propertyInvolved.propertyState}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保管单位" prop="saveUnit">
                              {{form.propertyInvolved.saveUnit}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管人员">
                              {{form.propertyInvolved.savePerson}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保存地点">
                              {{form.propertyInvolved.savePlace}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管方式">
                              {{form.propertyInvolved.saveWay}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="登记时间">
                              {{form.propertyInvolved.registrationTime}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="登记人">
                              {{form.propertyInvolved.registrant}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管期限">
                              {{form.propertyInvolved.storagePeriod}}天
                              &nbsp;(剩余天数：{{form.propertyInvolved.storageDump}}天)
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="财物描述">
                              <div v-html="form.propertyInvolved.propertyDescribe"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                              <div v-html="form.propertyInvolved.remarks"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

            <div class="deliver"></div>
            <fileUploadGrid ref="files" :files="form.accs" title="附件信息" :isDetail="true"></fileUploadGrid>
            <div class="deliver"></div>
            <caseBindGrid ref="cases" :datas="form.cases" title="案件信息" :isDetail="true"></caseBindGrid>
            <div class="deliver"></div>
            <el-card class="box-card u-my-card" shadow="naver">
                <div slot="header" class="clearfix">
                    <span>处理记录</span>
                </div>
                <el-table :data="form.disposes" stripe style="width: 100%" highlight-current-row >
                    <el-table-column type="index" width="55"> </el-table-column>
                    <el-table-column prop="disposeWay" label="处理方式" align="center"></el-table-column>
                    <el-table-column prop="disposeRemark" label="备注" align="center"></el-table-column>
                    <el-table-column prop="disposeTime" label="处理时间" align="center"></el-table-column>
                    <el-table-column prop="disposePersonName" label="处理人" align="center"></el-table-column>
                    <!-- <el-table-column prop="op" label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onDetail(scope.row.id)" size="mini">详情</el-button>&nbsp;
                            <el-button type="text" @click="onDelete(scope.$index)" size="mini">解绑</el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
            </el-card>

        </el-form>
        </div>
    </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";
import {findPropertyById} from "@/api/propertyManage";
import fileUploadGrid from "./fileUploadGrid.vue";
import caseBindGrid from "./caseBindGrid.vue";

export default {
    components:{
        fileUploadGrid,
        caseBindGrid
    },
  data() {
    return {
        form:{
            propertyInvolved: {
                propertyNumUnit:"",
                propertyName:"",
                propertyState:"",
                registrationTime:"",
                propertyNum:"",
                saveUnit:"",
                registrant:"",
                propertyBelonger:"",
                savePerson:"",
                storagePeriod:"",
                propertyNo:"",
                saveWay:"",
                savePlace:"",
                remarks:"",
                propertyDescribe:"",
            },
            cases:[],
            accs:[],
            disposes:[],
        },
        handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
        syqxList:[30,90,180,360]
    };
  },
  methods: {

    //获取已归档的数据
    async getData(id) {
        let res = await findPropertyById(id);
        this.form = res.data;
    },
    
  },
  mounted(){
      debugger
      if(this.$route.params.id){
          this.getData(this.$route.params.id);
      }
  },
  created() {
      
  }
};
</script>
<style scope>
.deliver{
    height: 15px
}
.el-card__header{
    height: 50px;
    line-height: 36px;
    padding: 9px 20px;
  }
</style>