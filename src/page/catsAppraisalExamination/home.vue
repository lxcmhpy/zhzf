<template>
<div class="contentCreenHome">
    <header class="el-header" id="mainHeader" style="height: 60px;">
        <div class="main_logo">
            <span>{{systemTitle}}</span>
        </div>
        <div class="headerRight">
            <li @click="handleCommand()" >
                <img style="width: 18px;height: 20px;" :src="'./static/images/img/catsAppraisalExamination/btn_back.png'" alt="">
            </li>
        </div>
    </header>
    <div class="top"></div>
    <div class="container check">
        <div class="leftBox shadow">
            <div class="noticeBox">
                <div class="center_content">
                    <span class="noticeIcon"></span>
                    <span class="title fontGray">通知公告</span>
                    <span class="right">更多内容 ></span>
                </div>
                <ul class="list">
                    <li :class="{'fontGray':item.isRead =='N'}" v-for="(item,index) in noticeList" :key="index" @click="viewNotice(item)">
                        <div class="c">
                            <em class="circle" v-show="item.isRead=='N'"></em>
                            <span class="tz">{{item.title}}</span>
                           <em class="date">{{item.createDate}}</em>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="noticeBox">
                <div class="center_content">
                    <span class="applicationIcon"></span>
                    <span class="title fontGray">应用平台</span>
                </div>
                <ul class="menuList">
                    <li :class="item.icon" v-for="(item, index) in menuList" :key="index"  @click="clickMenu(item)">
                        <div class="menuBox"></div>
                        <div class="text">{{item.title}}</div>
                    </li>
                </ul>
            </div>
            <div class="noticeBox">
                <div class="center_content">
                    <span class="sysIcon"></span>
                    <span class="title fontGray">相关系统</span>
                </div>
                <ul class="xtList">
                     <li v-for="(item, index) in xtList" :key="index" @click="otherUrl(item)">
                            <span>
                                <img onerror="this.src='./static/images/img/catsAppraisalExamination/pic_falvfagui.png'"
                                    :src="'./static/images/img/catsAppraisalExamination/'+item.icon+'.png'">
                                <em class="name">{{item.name}}</em>
                            </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="rightBox">
            <div class="people">

                <img width="62px" height="62px" class="right"
                    onerror="this.src='./static/images/img/catsAppraisalExamination/icon_head.png'"
                    :src="'./static/images/img/catsAppraisalExamination/icon_head.png'">
                <div class="peopleMessage" v-if="userInfo">
                    <span>{{userInfo.nickName}}</span><br>
                    <span>{{userInfo.organName}}</span>
                </div>
            </div>
             <div class="noticeBox">
                <div class="center_content">
                    <span class="downLoadIcon"></span>
                    <span class="title fontGray">下载专区</span>
                </div>
                  <ul class="list line50">
                    <li class="fontNormal line50" v-for="(item,index) in downloadList" :key="index" >
                         <a :href="item.url" target="_blank">
                            <div class="c">
                                <em class="numRed" v-if="index < 3">{{index+1}}</em>
                                <em class="numIcon" v-else>{{index+1}}</em>
                                <span class="tz">{{item.title}}</span>
                            </div>
                         </a>
                    </li>
                </ul>
                <div>
                    <img width="380px" height=""
                        onerror="this.src='./static/images/img/catsAppraisalExamination/zc.jpg'"
                     :src="'./static/images/img/catsAppraisalExamination/zc.jpg'">
                </div>
            </div>
        </div>
    </div>
    <viewNotice ref="viewNoticeRef"></viewNotice>
</div>
</template>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
<style lang='scss' src="@/assets/css/checkInfo.scss" ></style>
<script>
import iLocalStroage from "@/common/js/localStroage";
import { mapGetters } from "vuex";
import { mixinsCommon } from "@/common/js/mixinsCommon";
import {getContentApi,getNoticeByPageAndUserId,getAppraisalMenuList,clickNotice} from "@/api/appraisalExam.js";
import viewNotice from "./noticeManage/viewNotice";
export default {
    mixins: [mixinsCommon],
    data () {
        return {
            // <el-link href="./static/excel/人员表.xlsx">
            //     <el-button type="primary" size="medium" icon="el-icon-plus" >模板下载</el-button>
            //   </el-link>
            downloadList: [{
                title: '人员表.xlsx',
                url: './static/excel/人员表.xlsx'
            },{
                title: '案卷信息.xlsx',
                 url: './static/excel/案卷信息.xlsx'
            }],
            noticeList: [],
            menuList: [],
            xtList: [{
                name: '法律法规系统',
                icon: 'pic_falvfagui',
                url: 'http://law.mot.gov.cn/index.action'
            },{
                name: '信息查验系统',
                icon: 'oic_xinxichayan',
                url: ''
            },{
                name: '人员考试系统',
                icon: 'pic_renyuan',
                url: ''
            },{
                name: '执法办案系统(测试)',
                icon: 'pic_zhifabanan',
                url: ''
            }
            // ,{
            //     name: '分析研判系统',
            //     icon: 'pic_fenxiyanpan'
            // }
            ],
            userInfo: null
        }
    },
    components: {
        viewNotice
    },
    methods: {
        otherUrl (item) {
            if (item.url) {
                this.$message({type: "success",message: "页面已打开，请在新窗口中查看。"});
                window.open(item.url);
            } else {
                 this.$message({type: "success",message: "此功能正在紧急开发中..."});
            }
        },
        handleCommand () {
            this.$store.dispatch('deleteAllTabs');
            this.$router.push("/");
        },
        //获取公告信息
        getNotices() {
            let data = {
                current: this.currentPage,
                size: this.pageSize
            };
            let _this = this;
            getNoticeByPageAndUserId(data).then(
                res => {
                    console.log(res.data.records)
                    _this.noticeList = res.data.records;
                },
                err => {
                    console.log(err);
                }
            );
        },
        getAppraisalMenuList() {
            let _this = this;
            getAppraisalMenuList().then(
                res => {
                    _this.menuList = res.data;
                },
                err => {
                    console.log(err);
                }
            );
        },
        //查看公告信息
        viewNotice(row) {
            if(row.noticeType==="附件"){
                let routerData = {
                    storageId: row.storageId
                };
                // this.$router.push({ name: "case_handle_viewPDF", params: routerData });
                this.$refs.viewNoticeRef.showPDF(row.storageId);
                if(row.isRead==='N'){
                    clickNotice(row.id).then(
                        res => {
                        },
                        err => {
                            console.log(err);
                        }
                    )
                }
            }else{
                let _that = this
                getContentApi(row.id).then(
                    res => {
                        if(row.isRead==='N'){
                            clickNotice(row.id).then(
                                res => {
                                },
                                err => {
                                    console.log(err);
                                }
                            )
                        }
                        _that.$refs.viewNoticeRef.showModal(res.data);
                    },
                    err => {
                        console.log(err);
                    }
                )
            }
        },
        clickMenu(row){
            let routerData = {
            };
            this.$router.push({ name: row.path, params: routerData });
        }
    },
    mounted () {
        debugger;
        this.userInfo = iLocalStroage.gets('userInfo');
        // this.$store.dispatch("deleteTabs", this.$route.name);
        this.getNotices()
        this.getAppraisalMenuList()
    },
    computed: {
        ...mapGetters(["systemTitle"])
    }
}
</script>
