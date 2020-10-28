

import { getAllOrganApi } from "@/api/system";
import { findLawOfficerListApi } from "@/api/caseHandle";
import { queryLawCateByOrganIdApi } from "@/api/caseDeploy";
import iLocalStroage from "@/common/js/localStroage";
import elSelectTree from "@/components/elSelectTree/elSelectTree";
import caseInfoDia from "@/page/lawEnforcementSupervision/components/caseInfoDia";

export const caseSupervisionCommonMixins = {
    data() {
        return {
            hideSomeSearch: true,
            tableData: [],
            currentPage: 1, //当前页
            pageSize: 10, //pagesize
            total: 0, //总页数
            lawCateList: [],
            allCaseStatus: [{ value: "已结案" }, { value: "未结案" }],
            organTreeData: [],
            myprops: {
                label: "label",
                value: "id",
            },
            selectOrganId: "", //默认选中机构的id
            acceptTimeArray: [],
            allStaff: [],
        }
    },
    components: {
        elSelectTree,
        caseInfoDia,
    },
    methods: {
        showSomeSearchEmit() {
            //   this.$emit("showSomeSearch");
            this.hideSomeSearch = !this.hideSomeSearch;
        },
        //更改每页显示的条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.searchCase();
        },
        //更换页码
        handleCurrentChange(val) {
            this.currentPage = val;
            this.searchCase();
        },
        //获取执法领域
        getEnforceLawType() {
            queryLawCateByOrganIdApi({
                organId: iLocalStroage.gets("userInfo").organId,
            })
                .then((res) => {
                    console.log("res", res);
                    this.lawCateList = res.data;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        //获取机构树
        async getAllOrigins() {
            getAllOrganApi()
                .then((res) => {
                    console.log("获取机构树", res);
                    this.organTreeData = res.data;
                    // this.selectOrganId = res.data[0].id;
                    this.$refs.elSelectTreeObj.valueTitle = res.data[0].label
                    this.$refs.elSelectTreeObj.valueId = res.data[0].id;
                    this.caseSearchForm.organId = res.data[0].id;
                    this.findLawOfficerList(res.data[0].id);

                })
                .catch((err) => {
                    // throw new Error(err);
                    console.log(err)
                });
        },
        //显示案件总览弹窗
        showCaseInfo(row) {
            console.log("show");
            this.$store.commit("setCaseId", row.id);
            this.$refs.caseInfoDiaRef.showModel();
        },
        //获取选中的机构
        handleOrgan(val) {
            this.$refs.elSelectTreeObj.$children[0].handleClose();
            this.caseSearchForm.organId = val;
            this.caseSearchForm.staffId = '';
            //根据机构获取执法人员
            this.findLawOfficerList(val);
        },
        //获取机构下的执法人员
        findLawOfficerList(val) {
            findLawOfficerListApi(val)
                .then((res) => {
                    console.log("执法人员", res);
                    this.allStaff = res.data;
                })
                .catch((err) => {
                    throw new Error(err);
                });
        },
        async resetSearchForm() {
            this.$refs["caseSearchForm"].resetFields();
             
            this.acceptTimeArray = [];
            await this.getAllOrigins();
            this.caseSearchForm.organId = iLocalStroage.gets("userInfo").organId;
            this.searchCase();
        },
    },

    async mounted() {
        await this.getEnforceLawType();
        await this.getAllOrigins();
        this.searchCase();
    }
}