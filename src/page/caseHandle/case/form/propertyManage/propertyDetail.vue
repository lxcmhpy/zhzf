<!-------长软------->
<template>
    <div class="com_searchAndpageBoxPadding hasBigMarginRight">
        <div :class="hideSomeSearch ? 'searchAndpageBox' : 'searchAndpageBox searchAndpageBox2'">
        <el-form ref="form" :model="form"  size="small" label-width="150px">
            <el-card class="box-card" shadow="never">
                <div slot="header" class="clearfix">
                    <span>基本信息</span>
                </div>
                <div>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财务名称" prop="propertyName">
                                {{form.propertyName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财务数量" prop="propertyNum">
                              {{form.propertyNum + form.propertyNumUnit}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="财物归属人/单位" prop="propertyBelonger">
                              {{form.propertyBelonger}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="财物状态">
                              {{form.propertyState}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保管单位" prop="saveUnit">
                              {{form.saveUnit}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管人员">
                              {{form.savePerson}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="保存地点">
                              {{form.savePlace}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管方式">
                              {{form.saveWay}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="登记时间">
                              {{form.registrationTime}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="登记人">
                              {{form.registrant}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="保管期限">
                              {{form.storagePeriod}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="财物描述">
                              <div v-html="form.propertyDescribe"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="备注">
                              <div v-html="form.remarks"></div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </el-card>

            <el-card class="box-card" shadow="never" style="margin-top:15px;">
                <div slot="header" class="clearfix">
                    <span>附件信息</span>
                </div>
                <div>
                    
                </div>
            </el-card>

            <el-card class="box-card" shadow="never" style="margin-top:15px;">
                <div slot="header" class="clearfix">
                    <span>案件信息</span>
                </div>
                <div>
                    
                </div>
            </el-card>

            <el-card class="box-card" shadow="never" style="margin-top:15px;">
                <div slot="header" class="clearfix">
                    <span>处理记录</span>
                </div>
                <div>
                    
                </div>
            </el-card>
        </el-form>
        </div>
    </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
import { mixinGetCaseApiList } from "@/common/js/mixins";
import caseListSearch from "@/components/caseListSearch/caseListSearch";

export default {
  data() {
    return {
      form: {
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
      handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
      syqxList:[30,90,180,360]
    };
  },
  methods: {

    //获取已归档的数据
    getData(searchData) {
        let data = searchData;
        data.userId = iLocalStroage.gets("userInfo").id;
        // this.getCaseList(data);
    },
    
  },
  mounted(){
      // if(this.$route.params.id !== "add"){
      //     this.getData({id:this.$route.params.id});
      // }
  },
  created() {
      
  }
};
</script>