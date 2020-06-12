<template>
<div class="contentCreenHome">
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
                    <li :class="{'fontGray':index <2}" v-for="(item,index) in noticeList" :key="index">
                        <div class="c">
                            <em class="circle" v-show="index< 2"></em>
                            <span class="tz">{{item.title}}</span>
                           <em class="date">{{item.date}}</em>
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
                    <li class="jcpf-style">
                        <div class="menuBox"></div>
                        <div class="text">检查评分</div>
                    </li>
                    <li class="bscl-style">
                       <div class="menuBox"></div>
                        <div class="text">报送材料</div>
                    </li>
                    <li class="jcpz-style">
                        <div class="menuBox"></div>
                        <div class="text">检查配置</div>
                    </li>
                </ul>
            </div>
            <div class="noticeBox">
                <div class="center_content">
                    <span class="sysIcon"></span>
                    <span class="title fontGray">相关系统</span>
                </div>
                <ul class="xtList">
                     <li v-for="(item, index) in xtList" :key="index">
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
                <div class="peopleMessage">
                    <span>王东城</span><br>
                    <span>北京交通执法总队</span>
                </div>
            </div>
             <div class="noticeBox">
                <div class="center_content">
                    <span class="downLoadIcon"></span>
                    <span class="title fontGray">下载专区</span>
                </div>
                  <ul class="list line50">
                    <li class="fontNormal line50" v-for="(item,index) in downloadList" :key="index">
                        <div class="c">
                            <em class="numRed" v-if="index < 3">{{index+1}}</em>
                            <em class="numIcon" v-else>{{index+1}}</em>
                            <span class="tz">{{item.title}}</span>
                        </div>
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
</div>
</template>
<style lang="scss" src="@/assets/css/catsAppraisalExamination.scss"></style>
<style lang='scss' src="@/assets/css/checkInfo.scss" ></style>
<script>
export default {
    data () {
        return {
            downloadList: [{
                title: '1111内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '1111内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '222内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '333内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '44内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '55内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '222内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '333内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '44内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '55内容1内容1内容1内容',
                date: '02/11'
            }],
            noticeList: [{
                title: '1111内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '222内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '333内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '44内容1内容1内容1内容',
                date: '02/11'
            },{
                title: '55内容1内容1内容1内容',
                date: '02/11'
            }],
            xtList: [{
                name: '法律法规系统',
                icon: 'pic_falvfagui'
            },{
                name: '信息查验系统',
                icon: 'oic_xinxichayan'
            },{
                name: '人员考试系统',
                icon: 'pic_renyuan'
            },{
                name: '执法办案系统(测试)',
                icon: 'pic_zhifabanan'
            },{
                name: '分析研判系统',
                icon: 'pic_fenxiyanpan'
            }]
        }
    },
    mounted () {
          this.$store.dispatch("deleteTabs", this.$route.name);
    }
}
</script>
