<template>
<div class="flex">
    <div class="b-flex-1">
         <!-- <span :class="$route.name">待审核</span> -->
        <div class="shadow">
            <div class="box b-w-720">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">电子证据单</span>
                </div>
                <ul class="list" >
                    <li>
                        <embed name="plugin" id="plugin" :src="storageStr"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 815px; height:630px; position: relative;">
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="b-w-320">
        <div class="shadow">
            <div class="box">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">驾驶员/车主信息</span>
                </div>
                <div >
                    <el-form :model="userObj" ref="userObj" class="userObj" label-width="105px">
                        <div class="item">
                            <el-form-item label="姓名">
                                 <el-input width="300px" readonly="readonly" v-model="obj.personName" placeholder="请输入"></el-input>
                            </el-form-item>
                        </div>
                        <div class="item">
                            <el-form-item label="联系方式">
                                <el-input width="300px" readonly="readonly" v-model="obj.personPhone" placeholder="请输入"></el-input>
                            </el-form-item>
                        </div>
                        <div class="item">
                        <el-form-item label="备注">
                            <el-input v-model="obj.personRemarks" readonly="readonly" type="textarea" :autosize="{ minRows: 1, maxRows: 2}"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>
                </div>
                   <!-- <table v-if="obj">
                    <tr>
                        <td class="color_ff w-1">姓名</td>
                        <td width="260px"><el-input width="300px" v-model="userObj.name" placeholder="请输入"></el-input></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">联系方式</td>
                        <td width="260px"><el-input width="300px" v-model="userObj.mobile" placeholder="请输入"></el-input></td>
                    </tr>
                     <tr>
                        <td class="color_ff w-1">备注</td>
                        <td width="260px" colspan="3"><el-input v-model="userObj.mark" type="textarea" :autosize="{ minRows: 1, maxRows: 2}"></el-input></td>
                    </tr>
                </table> -->

            </div>
        </div>
        <div class="shadow">
            <div class="box">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">现场照片/视频</span>
                    <span class="right f12">  {{ parseInt(acitveCar) + 1 }} / {{imgSize}}</span>
                </div>
                <ul class="list">
                    <li >
                         <el-carousel height="200px" @change="setActiveItem" :setActiveItem="setActiveItem" :autoplay="true" indicator-position="outside" :interval="5000">
                            <el-carousel-item :key="0"  v-if="videoUrl!=''">
                                <video width="280px" height="180px" controls>
                                    <source :src="videoUrl" type="video/mp4">
                                </video>
                            </el-carousel-item>
                            <el-carousel-item  v-for="(item,index) in imgList" :key="(index +1).toString()">
                                <img width="280px" height="180px" @click="showImg(index)"  :src="item">
                            </el-carousel-item>
                        </el-carousel>
                    </li>
                </ul>
                <el-dialog :visible.sync="dialogIMGVisible" append-to-body width="90%">
                    <div>
                        <el-row>
                            <el-col :span="1" style="margin-top: 200px;">
                            <el-button @click="preview" icon="el-icon-arrow-left" circle title="上一个"></el-button>
                            </el-col>
                            <el-col :span="22">
                                <img width="100%" :src="imgIndexUrl">
                            </el-col>
                            <el-col :span="1" style="margin-top: 200px;">
                                <el-button @click="next" icon="el-icon-arrow-right" circle title="下一个" class="right"></el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-dialog>
            </div>
        </div>
    <div class="shadow">
        <div class="box w-2">
            <div class="box_title">
                <span class="titleflag">
                </span>
                <span class="title">相关说明</span>
            </div>
            <div>
                 <el-input
                 readonly="readonly"
                    style="width: 280px !important;"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="obj.remarks">
                </el-input>
            </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import {getFileByCaseId} from "@/api/lawSupervise.js";
export default {
    props: ['obj'],
    data () {
        return {
            imgIndexUrl: null,
            imgList: [],
            xjHost: null,
            dialogIMGVisible: false,
            acitveCar: 0,
            dialogPDFVisible: false,
            storageStr: '',
            currentUrl: '',
            userObj: {
                name: '',
                mobile: '',
                mark: ''
            },
            videoUrl:'',
            imgSize:0
        }
    },
    methods: {
        showImg (index) {
            this.dialogIMGVisible = true;
            this.imgIndexUrl = this.imgList[index];
        },
        preview(){
          let index = this.imgList.findIndex(item=>item == this.imgIndexUrl);
          let n = index - 1;
          if(index == 0){
            n = this.imgList.length-1;
          }
          this.imgIndexUrl = this.imgList[n];
        },
        next(){
          let index = this.imgList.findIndex(item=>item == this.imgIndexUrl);
          let n = index + 1;
          if(index == this.imgList.length-1){
            n = 0
          }
          this.imgIndexUrl = this.imgList[n];
        },
        setActiveItem () {
            this.acitveCar++;
            if (this.acitveCar == 5) {
                this.acitveCar = 0;
            }
        },
        //通过案件ID和文书ID查询附件
        findFileList() {
            let data = {
                caseId: this.obj.workNo
            }
            getFileByCaseId(data).then(
                res => {
                    let size = 0;
                    res.data.forEach(p => {
                        if(p.status=='治超图片'){
                            this.$util.com_getZfjgFileStream(p.storageId).then(res=>{
                                this.imgList.push(res)
                            });
                            size++
                        }else if(p.status=='治超视频'){
                            this.$util.com_getZfjgFileStream(p.storageId).then(res=>{
                                this.videoUrl=res
                            });
                            size++
                        }
                    });
                    this.imgSize=size
                },
                error => {
                    console.log(error);
                }
            )
        }
    },
    mounted () {
        debugger
        this.findFileList();
        if(this.obj.storageId){
            this.$util.com_getZfjgFileStream(this.obj.storageId).then(res=>{
                this.storageStr = res
            });
        }
    }
}
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
