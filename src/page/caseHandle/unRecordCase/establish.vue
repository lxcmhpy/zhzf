<template>
  <div class="main">
    <div class="a4-box">
      <div class="pdf-box">
        <!-- <div>交通运输行政执法文书式样之一 ： 立案</div> -->
        <div class="pdf-title">立案登记表</div>
        <div class="case-number">案号：{{formData.tempNo}}</div>
         <el-form ref="docForm" :model="formData" label-width="135px">
        <div class="pdf-table">
          <table border="1" bordercolor="black" width="100%" cellspacing="0">
            <tr>
              <td>
                案件
                <br />来源
              </td>
              <td colspan="8">
                <div class="text-left">
                  <form>
                    <input type="checkbox" />1.在行政检查中发现的；
                    <br />
                    <input type="checkbox" />2.个人、法人及其他组织举报经核实的；
                    <br />
                    <input type="checkbox" />3.上级机关交办的；
                    <br />
                    <input type="checkbox" />4.下级机关 报请查处的
                    <br />
                    <input type="checkbox" />5.有关部门 移送的；
                    <br />
                    <input type="checkbox" />6.其他途径发现的
                    <br />
                  </form>
                </div>
              </td>
            </tr>

            <tr>
              <td>案由</td>
              <td colspan="8">{{formData.caseName}}</td>
            </tr>
            <tr>
              <td>
                受案
                <br />时间
              </td>
              <td colspan="8">{{formData.acceptTime}}</td>
            </tr>
            <tr>
              <td rowspan="5">
                当
                <br />事
                <br />人
                <br />基
                <br />本
                <br />情
                <br />况
              </td>
              <td rowspan="2">个人</td>
              <td>姓名</td>
              <td colspan="2">{{formData.party}}</td>
              <td>性别</td>
              <td>\</td>
              <td>年龄</td>
              <td>\</td>
            </tr>
            <tr>
              <td>住址</td>
              <td colspan="2">{{formData.party}}</td>
              <td>
                身份证
                <br />件号
              </td>
              <td>\</td>
              <td>联系电话</td>
              <td>\</td>
            </tr>
            <tr>
              <td rowspan="3">单位</td>
              <td>名称</td>
              <td colspan="4">\</td>
              <td>法定代表人</td>
              <td>\</td>
            </tr>
            <tr>
              <td>地址</td>
              <td colspan="4">\</td>
              <td>联系电话</td>
              <td>\</td>
            </tr>
            <tr>
              <td colspan="2">统一社会信用代码</td>
              <td colspan="5">\</td>
            </tr>
            <tr>
              <td>
                案件基
                <br />本情况
              </td>
              <td colspan="8">\</td>
            </tr>
            <tr>
              <td>
                立
                <br />案
                <br />依
                <br />据
              </td>
              <td colspan="4">\</td>
              <td>
                经办机构
                <br />负责人  
                <br />意见
              </td>
              <td colspan="3" class="pdf-wirte">
                {{formData.approveOpinions}}
                <div class="pdf-write-name">
                  签名：{{formData.approvePeo}}
                  <br />时间:{{formData.approveTime}}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                负
                <br />责
                <br />人
                <br />审
                <br />批
                <br />意
                <br />见
              </td>
              <td colspan="8" class="pdf-wirte">
                {{formData.secondApproveOpinions}}
                <div class="pdf-write-name">
                  签名：{{formData.secondApprovePeo}}
                  <br />时间: {{formData.secondApproveTime}}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                备
                <br />注
              </td>
              <td colspan="8">\</td>
            </tr>
          </table>
        </div>
         </el-form>
      </div>
    </div>
    <!-- 悬浮按钮 -->
    <div class="float-btns">
      <el-button type="success">
        <svg
          t="1577706357599"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2136"
          width="16"
          height="16"
        >
          <path
            d="M153.6 0h716.8v102.4H153.6zM0 153.6v614.4h153.6v256h716.8v-256h153.6V153.6z m768 768H256v-307.2h512z m153.6-563.2h-153.6V256h153.6z"
            p-id="2137"
            fill="#FFFFFF"
          />
        </svg>
        <br />打印
      </el-button>
      <!-- <el-button type="success" @click="goEdit">
        <svg
          t="1577706400265"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3033"
          width="16"
          height="16"
        >
          <path
            d="M946.176 896a34.304 34.304 0 0 1 0 68.608H77.824a34.304 34.304 0 0 1 0-68.608h868.352z m0-622.08L401.92 818.176 189.44 839.68l21.504-211.968 473.088-473.088 71.168-71.168c31.744-31.744 87.552-31.744 119.296 0l71.168 71.168c15.872 15.872 24.576 37.376 24.576 59.904 0.512 22.016-8.192 43.52-24.064 59.392zM266.24 762.88l103.936-10.752 431.616-431.616-93.696-93.696L276.48 658.432 266.24 762.88zM815.104 127.488c-4.096 0-8.192 1.536-11.264 4.608l-46.592 46.592 93.696 93.696 46.592-46.592c6.144-6.144 6.144-16.384 0-22.528l-71.168-71.168c-3.072-3.072-7.168-4.608-11.264-4.608z"
            p-id="3034"
            fill="#FFFFFF"
          />
        </svg>
        <br />编辑
      </el-button> -->
      <el-button type="success">
        <svg
          t="1577706320726"
          class="icon"
          viewBox="0 0 1052 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1274"
          width="16"
          height="16"
        >
          <path
            d="M615.822222 597.674667c-20.48-18.744889-33.194667-48.981333-33.194666-77.539556 0-27.107556 11.52-51.683556 30.208-70.115555a1.905778 1.905778 0 0 1 0.483555-0.227556c6.314667-6.229333 13.454222-11.776 21.248-16.412444a162.872889 162.872889 0 0 0 54.812445-121.571556c0-91.079111-75.121778-164.892444-167.822223-164.892444-92.728889 0-167.879111 73.813333-167.879111 164.892444 0 48.184889 21.219556 91.477333 54.840889 121.571556 7.822222 4.636444 14.904889 10.183111 21.276445 16.412444a0.995556 0.995556 0 0 1 0.341333 0.170667c18.830222 18.488889 30.293333 43.064889 30.293333 70.172444 0 28.558222-12.714667 58.794667-33.166222 77.539556h-246.613333c-13.368889 0-24.206222 10.609778-24.206223 23.665777v152.092445h730.168889v-152.092445a23.893333 23.893333 0 0 0-24.177777-23.665777h-246.613334z m-407.210666 227.271111H834.56v52.138666H208.611556v-52.138666z"
            fill="#FFFFFF"
            p-id="1275"
          />
        </svg>
        <br />签章
      </el-button>
      <el-button type="primary" @click="showApprovePeopleList" v-if="!approval">
        <svg
          t="1577414377979"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1726"
          width="16"
          height="16"
        >
          <path
            d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
            p-id="1727"
            fill="#FFFFFF"
          />
        </svg>
        <br />提交审批 
      </el-button>
      <el-button type="primary" @click="addFormData(1)" v-if="!approval">
        <svg
          t="1577414377979"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1726"
          width="16"
          height="16"
        >
          <path
            d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
            p-id="1727"
            fill="#FFFFFF"
          />
        </svg>
        <br />提交
      </el-button>
      <el-button type="primary" @click="showApproval" v-if="approval">
        <svg
          t="1577414377979"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1726"
          width="16"
          height="16"
        >
          <path
            d="M414.273133 1024a19.76097 19.76097 0 0 1-19.741211-20.488101l8.762126-237.513979a19.749115 19.749115 0 0 1 4.202738-11.471084l503.439415-641.372015-822.359463 475.187017 249.409882 129.274208c9.688823 5.021748 13.47267 16.947289 8.450922 26.635125-5.023724 9.687835-16.946301 13.471682-26.635125 8.449934L38.362218 606.82539a19.758006 19.758006 0 1 1-0.793324-34.650361l932.344942-538.738859a19.759982 19.759982 0 0 1 29.505118 19.454706l-109.172395 912.697585a19.758994 19.758994 0 0 1-28.848132 15.124522L609.347756 847.568976l-181.518965 171.052626a19.754055 19.754055 0 0 1-13.555658 5.378398z m28.276109-250.126145l-6.748685 182.935685 156.731307-147.692555a19.76097 19.76097 0 0 1 22.780144-3.091294l239.112482 126.310359L950.834551 126.32913 442.549242 773.873855z"
            p-id="1727"
            fill="#FFFFFF"
          />
        </svg>
        <br />审批
      </el-button>
    </div>
    <showApprovePeople ref="showApprovePeopleRef"></showApprovePeople>
    <approvalDialog ref="approvalDialogRef" @getNewData="setData"></approvalDialog>

  </div>
</template>
<script>
import showApprovePeople from "../components/showApprovePeople";
import approvalDialog from "../components/approvalDialog";

import { mixinGetCaseApiList } from "@/js/mixins";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      caseNumber: "010-123456",
      // tableData: {},
      formData: {
        partyType: "个人"
      },
      caseLinkDataForm: { 
        id: "", //修改的时候用
        caseBasicinfoId: '', //案件id
        caseLinktypeId: "2c90293b6c178b55016c17c255a4000d", //表单类型ID
        //表单数据
        formData: "",
        status: ""
      },
      approval:this.$route.params.isApproval ? true : false, //   是否是审批人员进入

    };
  },
  components: {
    showApprovePeople,
    approvalDialog
  },
  computed:{...mapGetters(['caseId'])},
  mixins:[mixinGetCaseApiList],
  methods: {
    //返回编辑
    // goEdit() {
    //   this.$router.push({
    //     name: "filingApproval",
    //     params: {
    //       id: this.caseId
    //     }
    //   });
    // },
    setData(){
      this.caseLinkDataForm.caseBasicinfoId = this.caseId;
      this.com_getFormDataByCaseIdAndFormId(this.caseLinkDataForm.caseBasicinfoId,this.caseLinkDataForm.caseLinktypeId,'form');
    },
    // 提交表单
    addFormData(handleType) {
      //参数  提交类型 、formRef  
      this.com_submitCaseForm(handleType,'docForm',true);
    },
    showApprovePeopleList(){
      let data={
        caseId:this.caseId,
        caseLinktypeId:'2c90293b6c178b55016c17c255a4000d'
      }
      this.$refs.showApprovePeopleRef.showModal(data);
    },
    //审批弹窗
    showApproval(){
      //判断是一级审批还是二级审批(经办机构负责人审批、部门负责人审批)
      let approvePeo = this.formData.approvePeo ? this.formData.approvePeo : '';
      let caseData={
        caseId:this.caseId,
        caseLinktypeId:"2c90293b6c178b55016c17c255a4000d",
        firstApproval:approvePeo
      }
      this.$refs.approvalDialogRef.showModal(caseData);
    }
  },
  created(){
    this.setData();
  }
};
</script>
<style lang="less">
@import "../../../css/pdf.less";
</style>