<template>
    <div>

        <el-dialog title="案件信息" :visible.sync="caseVisible" @close="caseVisible = false" :close-on-click-modal="false" width="60%">
            <div>
                <!-- <el-form ref="handleForm" :model="handleForm" label-width="90px">
                    <el-form-item label="申请决定">
                    <el-select v-model="handleForm.executeHandle">
                        <el-option :value='1' label="同意"></el-option>
                        <el-option :value='0' label='不同意'></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="执行方式" v-if="handleForm.executeHandle==1">
                    <el-select v-model="handleForm.executeType">
                        <el-option :value='1' label="分期（第N期）"></el-option>
                        <el-option :value='0' label='延期'></el-option>
                    </el-select>
                    </el-form-item>

                </el-form> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="caseVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCaseData()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="财物处理" :visible.sync="propertyVisible" @close="propertyVisible = false" :close-on-click-modal="false" width="50%">
            <div>
                <el-form ref="handleForm" :model="handleForm" label-width="90px">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="处理方式">
                                <el-radio-group v-model="handleForm.handleWay">
                                    <el-radio 
                                    v-for="(item,index) in handleWayList"
                                    :key="index"
                                    :label="item">
                                        {{item}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="其他">
                                <el-input type="textarea" v-model="handleForm.other"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="propertyVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveHandleWayData()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";
import iLocalStroage from "@/common/js/localStroage";

export default {
  data() {
    return {
        caseVisible: false,
        propertyVisible: false,
        handleForm: {
            ids: "",
            caseIds: "",
            handleWay:"",
            other:""
        },
        caseData: "",
        isSaveLink: '',
        caseLinktypeId:'',
        handleWayList:["封存","扣押","退回当事人","移交法院","销毁","其他"],
    };
  },
  inject: ["reload"],
  mixins: [mixinGetCaseApiList],
  methods: {
    showModal(type,data,caseLinktypeId,isSaveLink) {
      console.log(data);
      if(type === 'case'){
          this.caseVisible = true;
      }else{
          this.propertyVisible = true;
      }
      
      this.caseData = data;
      this.isSaveLink = isSaveLink;
      this.caseLinktypeId = caseLinktypeId;

    },
    //关闭弹窗的时候清除数据
    closeDialog(type) {
        if(type === 'case'){
            this.caseVisible = false;
        }else{
            this.propertyVisible = false;
        }
    },
    saveCaseData() {
      
    },
    saveHandleWayData() {
      
    }

  },
  mounted() { }
};
</script>