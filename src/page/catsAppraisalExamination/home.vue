<template>
    <div class="contentCreenHome">
        <el-header style="height: 60px;">
            <div class="main_logo">
                <span>{{ systemTitle }}</span>
            </div>
            <div class="headerRight">
                <li @click="handleCommand()">
                    <img style="width: 18px;height: 20px;" :src="
                            './static/images/img/catsAppraisalExamination/btn_back.png'
                        " alt="" />
                </li>
            </div>
        </el-header>
        <div class="top">
            <span class="num">2020</span>
            <span class="title">年全国交通运输综合执法检查
                <span class="txt_shadow">年全国交通运输综合执法检查</span>
            </span>

            <!-- <img :src="'./static/images/img/catsAppraisalExamination/banner.png'"> -->
        </div>
        <div class="container check">
            <div class="leftBox shadow">
                <div class="noticeBox">
                    <div class="center_content">
                        <span class="noticeIcon"></span>
                        <span class="title fontGray">通知公告</span>
                        <!-- <span class="right">更多内容 ></span> -->
                    </div>
                    <ul class="list" v-infinite-scroll="getNotices">
                        <li :class="{ fontGray: item.isRead == 'N' }" v-for="(item, index) in noticeList" :key="index">
                            <div class="c">
                                <em class="circle" v-show="item.isRead == 'N'"></em>
                                <span class="tz" @click="viewNotice(item)">{{
                                    item.title
                                }}</span>
                                <em class="date">
                                    <span v-if="firstOrganBoo">
                                        <el-popover title="消息接收列表" placement="bottom" trigger="click">
                                            <div v-show="
                                                    unReadNumber > 0 ||
                                                        readNumber > 0
                                                " style="display:flex;width: 600px;height:400px;overflow: auto;">
                                                <div style="flex:1">
                                                    <div>
                                                        未读（{{
                                                            unReadNumber
                                                        }}）
                                                    </div>
                                                    <el-tree :data="unReadOrganTree" :props="defaultProps">
                                                    </el-tree>
                                                    <!-- default-expand-all -->
                                                </div>
                                                <div style="flex:1">
                                                    <div>
                                                        已读（{{ readNumber }}
                                                        ）
                                                    </div>
                                                    <el-tree :data="readOrganTree" :props="defaultProps">
                                                    </el-tree>
                                                </div>
                                            </div>
                                            <span slot="reference" @click="viewOrganTree(item)">
                                                {{
                                                    item.readCount ==
                                                    item.totalCount
                                                        ? "全部已读"
                                                        : "未读  " +
                                                          item.readCount +
                                                          "/" +
                                                          item.totalCount
                                                }}</span>
                                        </el-popover>
                                    </span>
                                    <span v-else>
                                        {{ item.createDate }}
                                    </span>
                                </em>
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
                        <li v-for="(item, index) in menuList" :key="index" @click="clickMenu(item)">
                            <!-- <div class="menuBox"></div> -->
                            <img width="66px" height="66px"
                                onerror="this.src='./static/images/img/catsAppraisalExamination/icon_bscl-style.png'"
                                :src="
                                    './static/images/img/catsAppraisalExamination/icon_' +
                                        item.icon +
                                        '_on.png'
                                " />
                            <!--  -->
                            <div class="text">{{ item.title }}</div>
                        </li>
                    </ul>
                </div>
                <!-- <div class="noticeBox">
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
            </div> -->
            </div>
            <div class="rightBox">
                <div class="people">
                    <img width="62px" height="62px" class="right"
                        onerror="this.src='./static/images/img/catsAppraisalExamination/icon_head.png'" :src="
                            './static/images/img/catsAppraisalExamination/icon_head.png'
                        " />
                    <div class="peopleMessage" v-if="userInfo">
                        <span>{{ userInfo.nickName }}</span><br />
                        <span>{{ userInfo.organName }}</span><br />
                        <a href="javascript:void(0)" @click="alertPwdDialog">修改密码</a>
                    </div>
                </div>
                <div class="noticeBox">
                    <div class="center_content">
                        <span class="downLoadIcon"></span>
                        <span class="title fontGray">下载专区</span>
                    </div>
                    <ul class="list line50">
                        <li class="fontNormal line50" v-for="(item, index) in downloadList" :key="index">
                            <!-- <a :href="'/static/excel/执法考试人员信息报送模版.xlsx'" download="执法考试人员信息报送模版.xlsx" target="_blank"> -->
                            <a :href="item.type?'javascript:void(0)':item.url" @click="exportStaff(item.type,item.url,item.name)" :download="item.title">
                                <div class="c">
                                    <em class="numIcon" v-if="index < 3">{{//numRed
                                        index + 1
                                    }}</em>
                                    <em class="numIcon" v-else>{{
                                        index + 1
                                    }}</em>
                                    <span class="tz">{{ item.title }}</span>
                                </div>
                            </a>
                            <!-- </a> -->
                        </li>
                    </ul>
                    <div class="footer-banner shadow">
                        <!-- <img width="380px" height=""
                        onerror="this.src='./static/images/img/catsAppraisalExamination/zc.jpg'"
                     :src="'./static/images/img/catsAppraisalExamination/zc.jpg'"> -->
                        <img width="57px" height="60px"
                            onerror="this.src='./static/images/img/catsAppraisalExamination/icon_kefu.png'" :src="
                                './static/images/img/catsAppraisalExamination/icon_kefu.png'
                            " />
                        <div class="lxfs">
                            <h5>技术支持</h5>
                            <div class="content">
                                <div>联系电话：010-58278962</div>
                                <div>电子邮箱：jtzonghezhifa@catsti.com</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <updatePasswordDialog v-if="userInfo" :userInfo="userInfo" ref="updatePasswordDialog"></updatePasswordDialog>
        <viewNotice ref="viewNoticeRef"></viewNotice>
    </div>
</template>
<style lang="scss" scope src="@/assets/scss/page/catsAppraisalExamination.scss"></style>
<script>
    import iLocalStroage from '@/common/js/localStroage'
    import {
        mapGetters
    } from 'vuex'
    import updatePasswordDialog from '@/components/updatePassword/updatePasswordDialog.vue'
    import {
        getContentApi,
        getNoticeByPageAndUserId,
        getAppraisalMenuList,
        clickNotice,
        judgmentOrganId,
        findUnReadUserByPage,
        findReadUserByPage,
        exportStaff
    } from '@/api/pykh/appraisalExam.js'
    import viewNotice from './noticeManage/viewNotice'
    export default {
        data() {
            return {
                // <el-link href="./static/excel/人员表.xlsx">
                //     <el-button type="primary" size="cats-common" icon="el-icon-plus" >模板下载</el-button>
                //   </el-link>
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                readNumber: 0,
                readOrganTree: [],
                unReadNumber: 0,
                unReadOrganTree: [],
                downloadList: [
                    {
                        title: '自查报告模版.doc',
                        url: './static/download/excel/自查自评报告模板.doc',
                        type:false
                    },
                    {
                        title: '案卷报送信息模版.xlsx',
                        url: './static/download/excel/案卷报送信息模版.xlsx',
                        type:false
                    },
                    {
                        title: '执法考试人员信息报送模版.xlsx',
                        url: './static/download/excel/执法考试人员信息报送模版.xlsx',
                        type:false
                    },
                    {
                        title: '执法考试考场情况信息报送表.xlsx',
                        url: './static/download/excel/执法考试考场情况信息报送表.xlsx',
                        type:false
                    },
                    {
                        title: '综合执法检查网上平台使用手册.pdf',
                        url: './static/download/systemManual/综合执法检查网上平台使用手册.pdf',
                        type:false
                    },
                    {
                        title: '执法考试参考人员名单.xlsx',
                        type:true,
                        url: 'staff/exportStaff',
                        name:'执法考试参考人员名单' 
                    },
                    {
                        title: '监考人员信息表.xls',
                        url: './static/download/excel/监考人员信息表.xls',
                        type:false
                    },
                    {
                        title: '谷歌浏览器下载',
                        url: 'http://on.wall.aldcup.com/download/谷歌浏览器_0147993.exe',
                        type:false
                    },
                    // {
                    //     title: '评查案卷清单.xlsx',
                    //     url: 'case/exportCase',
                    //     type:true,
                    //     name:'评查案卷清单'
                    // }
                ],
                noticeList: [],
                menuList: [],
                xtList: [{
                        name: '法律法规系统',
                        icon: 'pic_falvfagui',
                        url: 'http://law.mot.gov.cn/index.action'
                    },
                    {
                        name: '信息查验系统',
                        icon: 'oic_xinxichayan',
                        url: ''
                    },
                    {
                        name: '人员考试系统',
                        icon: 'pic_renyuan',
                        url: ''
                    },
                    {
                        name: '执法办案系统(测试)',
                        icon: 'pic_zhifabanan',
                        url: ''
                    }
                    // ,{
                    //     name: '分析研判系统',
                    //     icon: 'pic_fenxiyanpan'
                    // }
                ],
                userInfo: null,
                currentPage: 1,
                pageSize: 5,
                firstOrganBoo: false
            }
        },
        components: {
            viewNotice,
            updatePasswordDialog
        },
        methods: {
            alertPwdDialog() {
                this.$refs.updatePasswordDialog.updatePwdDialog(true)
            },
            async viewOrganTree(row) {
                console.log(row)
                // 已读列表、未读列表
                let readList = (await findReadUserByPage(row.id)).data
                this.readNumber = readList.length
                this.readOrganTree = this.getTree(readList)

                let unReadList = (await findUnReadUserByPage(row.id)).data
                this.unReadNumber = unReadList.length
                this.unReadOrganTree = this.getTree(unReadList)
            },
            getTree(list) {
                let tempList = [],
                    tree = []
                list.forEach((v, i) => {
                    tempList.push(v.organName)
                })

                new Set(tempList).forEach((v, i) => {
                    let children = list.filter(item => {
                        item.label = item.nickName
                        return item.organName === v
                    })
                    tree.push({
                        label: v,
                        children: children
                    })
                })
                return tree
            },
            otherUrl(item) {
                if (item.url) {
                    this.catsMessage({
                        type: 'success',
                        message: '页面已打开，请在新窗口中查看。'
                    })
                    window.open(item.url)
                } else {
                    this.catsMessage({
                        type: 'success',
                        message: '此功能正在紧急开发中...'
                    })
                }
            },
            handleCommand() {
                // this.$store.dispatch('deleteAllTabs');
                this.$router.push({
                    name: 'login'
                })
            },
            //获取公告信息
            getNotices() {
                let data = {
                    current: this.currentPage++,
                    size: this.pageSize
                }
                let _this = this
                getNoticeByPageAndUserId(data).then(
                    res => {
                        // console.log(res.data.records)
                        _this.noticeList = [..._this.noticeList, ...res.data.records]
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            exportStaff(type,url,title){
                if(!type){
                    return;
                }
                let _this = this
                exportStaff(url).then(
                    res => {
                        let blob = new Blob([res], {type: "application/vnd.ms-excel"});
                        let fileName = title;
                        let elink = document.createElement('a');
                        elink.download = fileName;
                        elink.style.display = 'none';
                        elink.href = window.URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        window.URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink);
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            getAppraisalMenuList() {
                let _this = this
                getAppraisalMenuList().then(
                    res => {
                        _this.menuList = res.data
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            //查看公告信息
            viewNotice(row) {
                if (row.noticeType === '附件') {
                    let routerData = {
                        storageId: row.storageId
                    }
                    // this.$router.push({ name: "case_handle_viewPDF", params: routerData });
                    this.$refs.viewNoticeRef.showPDF(row)
                    if (row.isRead === 'N') {
                        // clickNotice(row.id).then(
                        //     res => {
                        //     },
                        //     err => {
                        //         console.log(err);
                        //     }
                        // )
                    }
                } else {
                    let _that = this
                    getContentApi(row.id).then(
                        res => {
                            if (row.isRead === 'N') {
                                // clickNotice(row.id).then(
                                //     res => {
                                //     },
                                //     err => {
                                //         console.log(err);
                                //     }
                                // )
                            }
                            _that.$refs.viewNoticeRef.showModal(res.data, row)
                        },
                        err => {
                            console.log(err)
                        }
                    )
                }
            },
            clickMenu(row) {
                let routerData = {}
                this.$router.push({
                    name: row.path,
                    params: routerData
                })
            }
        },
        async mounted() {
            this.userInfo = iLocalStroage.gets('userInfo')
            this.getNotices()
            this.getAppraisalMenuList()
            let result = await judgmentOrganId()
            this.firstOrganBoo = result.data
            // this.$store.dispatch("deleteTabs", this.$route.name);
        },
        updated() {},
        computed: {
            ...mapGetters(['systemTitle'])
        }
    }

</script>
