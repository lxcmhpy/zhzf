<!--<template>
    <div>
        <!-- <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">称重检测数据</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">图像识别车牌</td>
                        <td width="260px">{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">车牌颜色</td>
                        <td width="260px">{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">ETC识别车牌</td>
                        <td></td>
                        <td class="color_ff w-1">最大允许总质量</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车辆类型</td>
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1">重点监管</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">车速（km/h）</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">行驶方向</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                </table>
            </div>
            <div class="box w-2">
                <div class="box_title">
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">轴数</td>
                        <td width="260px">6</td>
                        <td class="color_ff w-1">驱动轴</td>
                        <td width="260px">
                             双轴
                        </td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">轴型</td>
                        <td >{{obj.vehicleColor}}</td>
                        <td class="color_ff w-1">总重</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">限重</td>
                        <td>{{obj.key}}</td>
                        <td class="color_ff w-1">超重（KG）</td>
                        <td>{{obj.checkTime}}</td>
                     </tr>
                    <tr>
                        <td class="color_ff w-1">超限率（%）</td>
                        <td></td>
                        <td class="color_ff w-1">车长</td>
                        <td>{{obj.speed}}</td>
                   </tr>
                    <tr>
                        <td class="color_ff w-1">车宽</td>
                        <td>{{obj.direction}}</td>
                        <td class="color_ff w-1">车高</td>
                        <td>{{obj.axleNumber}}</td>
                    </tr>
                </table>
            </div>
            <div class="box w-2">

                <div class="box_title">
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">检测时间</td>
                        <td width="260px">{{obj.vehicleNumber}}</td>
                        <td class="color_ff w-1">检测站点</td>
                        <td width="260px">{{obj.vehicleColor}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测设备编号</td>
                        <td></td>
                        <td class="color_ff w-1">设备状态</td>
                        <td>{{obj.key}}</td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">检测位置</td>
                        <td>{{obj.checkTime}}</td>
                        <td class="color_ff w-1">车道号</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="color_ff w-1">所属执法机构</td>
                        <td>{{obj.speed}}</td>
                        <td class="color_ff w-1">处理状态</td>
                        <td>{{obj.direction}}</td>
                    </tr>
                </table>
            </div>
        </div> -->
<!--  <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">驾驶员/车主信息</span>
                </div>
                <table class="table_style" v-if="obj">
                    <tr>
                        <td class="color_ff w-1">姓名</td>
                        <td width="260px"><el-input width="300px" v-model="userObj.name" placeholder="请输入"></el-input></td>
                        <td class="color_ff w-1">联系方式</td>
                        <td width="260px"><el-input width="300px" v-model="userObj.mobile" placeholder="请输入"></el-input></td>
                    </tr>
                     <tr>
                        <td class="color_ff w-1">备注</td>
                        <td width="260px" colspan="3"><el-input v-model="userObj.mark" type="textarea" :autosize="{ minRows: 1, maxRows: 2}"></el-input></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag"></span>
                    <span class="title">电子证据单</span>
                </div>
                <ul class="list" >
                    <li>
                        <embed name="plugin" id="plugin" :src="storageStr"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 815px; height:250px; position: relative;">
                    </li>
                </ul>
            </div>
        </div>
        <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">现场照片/视频</span>
                </div>
                <ul class="list">
                    <li>
                        <div class="demo-image__preview">
                            <el-image
                            class="img"
                                style="width: 100px; height: 100px"
                                :src="'./static/images/img/lawSupervise/temp/link_01.jpg'"
                                :preview-src-list="['./static/images/img/lawSupervise/temp/link_01.jpg','./static/images/img/lawSupervise/temp/link_02.jpg','./static/images/img/lawSupervise/temp/link_03.jpg','./static/images/img/lawSupervise/temp/link_04.jpg']"
                                >
                            </el-image>
                        </div>
                    </li>
                    <li>
                        <video class="img" controls>
		                    <source :src="'./static/images/img/lawSupervise/temp/link_05.mp4'" type="video/mp4">
                        </video>
                    </li>
                    <li @click="dialogPDFVisible = true">
                        <img class="img" :src="'./static/images/img/lawSupervise/temp/link_03.jpg'">
                       <i class="iconfont law-pdf1" style="color:#ccc;"></i>
                    </li>
                    <li @click="dialogPDFVisible = true">
                       <img class="img" :src="'./static/images/img/lawSupervise/temp/link_04.jpg'">
                       <i class="iconfont law-pdf1" style="color:white;"></i>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="shadow">
            <div class="box w-2">
                <div class="box_title">
                    <span class="titleflag">
                    </span>
                    <span class="title">补充证据材料</span>
                </div>
                <ul class="list">
                    <li v-for="index in 2" :key="index">
                        <div class="demo-image__preview">
                            <el-image
                            class="img"
                                style="width: 100px; height: 100px"
                                :src="'./static/images/img/temp/sp.jpg'"
                                :preview-src-list="['https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg','https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg']"
                                >
                            </el-image>
                        </div>
                    </li>
                    <li>
                        <img  class="img" :src="'./static/images/img/temp/sp.jpg'" @click="dialogPDFVisible = true">
                    </li>
                    <li>
                        <img class="img" :src="'./static/images/img/temp/sp.jpg'" @click="dialogPDFVisible = true">
                        <i class="iconfont law-bofang"></i>
                    </li>
                </ul>
            </div>
        </div> -->
<!--  <el-dialog title="PDF展示" :visible.sync="dialogPDFVisible" append-to-body width="770px">
            <div>
                <embed name="plugin" id="plugin" :src="storageStr"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 730px; height:1100px; position: relative;">
            </div>
        </el-dialog>
    </div>

</template>-->
<template>
  <div class="flex">
    <div class="b-flex-1">
      <!-- <span :class="$route.name">待审核</span> -->
      <div class="shadow">
        <div class="box b-w-720">
          <div class="box_title">
            <span class="titleflag"> </span>
            <span class="title">电子证据单</span>
          </div>
          <ul class="list">
            <li>
              <!-- <embed name="plugin" id="plugin" :src="storageStr"
                type="application/pdf" internalinstanceid="29" class="print_info"
                style="padding: 0px; width: 815px; height:630px; position: relative;"> -->
              <div class="pdf-html">
                <div class="container">
                  <h3>非现场执法电子证据单</h3>
                  <p>证据编号：{{obj.workNo}}</p>
                  <table width="100%">
                    <tr>
                      <td>车牌号</td>
                      <td>{{obj.vehicleNumber}}</td>
                      <td colspan="2">车辆图片 1</td>
                    </tr>
                    <tr>
                      <td>轴数</td>
                      <td>{{obj.axleNumber}}</td>
                      <td rowspan="7" colspan="2">
                          <!-- xjHost -->
                        <img
                          :src="xjHost + imgList[2]"
                          alt=""
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>车速（公里/小时）</td>
                      <td>{{obj.speed}}</td>
                    </tr>
                    <tr>
                      <td>总重（吨）</td>
                      <td>{{obj.totalWeight/1000}}</td>
                    </tr>
                    <tr>
                      <td>超重（吨）</td>
                      <td>{{obj.overweight/1000}}</td>
                    </tr>
                    <tr>
                      <td>超限率（%）</td>
                      <td>{{obj.overload}}</td>
                    </tr>
                    <tr>
                      <td>检测时间</td>
                      <td>{{obj.checkTime}}</td>
                    </tr>
                    <tr>
                      <td>检测地点</td>
                      <td>{{obj.siteName}}</td>
                    </tr>
                    <tr>
                      <td>车长/车宽/车高(mm)</td>
                      <td>{{obj.length}}</td>
                      <td>{{obj.width}}</td>
                      <td>{{obj.height}}</td>
                    </tr>
                  </table>

                  <div class="car-picture">
                    <p>车辆图片2</p>
                    <!-- 车头照片 -->
                    <img
                      :src="xjHost + imgList[1]"
                      alt="link_01.jpg"
                    />
                  </div>
                  <div class="car-picture">
                    <p>车辆图片3</p>
                    <!-- 车尾照片 -->
                    <img
                      :src="xjHost + imgList[0]"
                      alt="link_02.jpg"
                    />
                  </div>
                  <div class="car-picture">
                    <p>车辆图片4</p>
                    <!-- 侧面照片 -->
                    <img
                      :src="xjHost + imgList[3]"
                      alt="link_03.jpg"
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="b-w-320">
      <div class="shadow">
        <div class="box">
          <div class="box_title">
            <span class="titleflag"> </span>
            <span class="title">驾驶员/车主信息</span>
          </div>
          <!-- <div > -->
          <el-form
            :model="userObj"
            ref="userObj"
            class="userObj"
            label-width="105px"
          >
            <div class="item">
              <el-form-item label="姓名">
                <el-input
                  width="300px"
                  v-model="obj.personName"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="联系方式">
                <el-input
                  width="300px"
                  v-model="obj.personPhone"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
            <div class="item">
              <el-form-item label="备注">
                <el-input
                  v-model="obj.personRemarks"
                  type="textarea"
                  :autosize="{ minRows: 1, maxRows: 2 }"
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
          <!-- </div> -->
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
            <span class="titleflag"> </span>
            <span class="title">现场照片/视频</span>
            <span class="right f12"> {{ parseInt(acitveCar) + 1 }} / 5</span>
          </div>
          <ul class="list">
            <li>
              <el-carousel
                height="200px"
                @change="setActiveItem"
                :setActiveItem="setActiveItem"
                :autoplay="true"
                indicator-position="outside"
                :interval="5000"
              >
                <el-carousel-item :key="0">
                  <video width="280px" height="180px" controls>
                    <source
                      :src="
                        xjHost +
                          '/api/ecds/GetCarPicture?work_no=' +
                          obj.workNo +
                          '&photo=PHOTO_V'
                      "
                      type="video/mp4"
                    />
                  </video>
                </el-carousel-item>
                <el-carousel-item
                  v-for="(item, index) in imgList"
                  :key="(index + 1).toString()"
                >
                  <img
                    width="280px"
                    height="180px"
                    @click="showImg(index)"
                    :src="xjHost + item"
                  />
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
                    <img width="100%" :src="xjHost+imgIndexUrl">
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
            <span class="titleflag"> </span>
            <span class="title">相关说明</span>
          </div>
          <div>
            <el-input
              style="width: 280px !important;"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="obj.remarks"
            >
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import iLocalStroage from "@/common/js/localStroage";
export default {
  props: ["obj"],
  data() {
    return {
      imgIndexUrl: null,
      imgList: [
          '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_D',
          '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_F',
          '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_L',
          '/api/ecds/GetCarPicture?work_no='+this.obj.workNo+'&photo=PHOTO_S'
          ],
      xjHost: null,
      dialogIMGVisible: false,
      acitveCar: 0,
      dialogPDFVisible: false,
    //   storageStr: "",
      currentUrl: "",
      userObj: {
        name: "",
        mobile: "",
        mark: ""
      }
    };
  },
  methods: {
        showImg (index) {
            this.dialogIMGVisible = true;
            this.imgIndexUrl = this.imgList[index];
        },
        setActiveItem() {
          this.acitveCar++;
          if (this.acitveCar == 5) {
            this.acitveCar = 0;
          }
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
  },
  mounted() {
    // http://172.16.170.54:9332/14,16d92a05edcd   old:9,10a727c3ada3
    // this.storageStr =
    //   iLocalStroage.gets("CURRENT_BASE_URL").PDF_HOST + "14,16d92a05edcd";
    // debugger;
    // this.storageStr = iLocalStroage.gets('CURRENT_BASE_URL').PDF_HOST + '14,16d92a05edcd';
    this.xjHost = iLocalStroage.gets("CURRENT_BASE_URL").XJ_IMG_HOST;
  }
};
</script>
<style lang="scss" src="@/assets/css/cluesReview.scss"></style>
<style lang="scss">
.pdf-html {
  padding: 0px;
  width: 760px;
  position: relative;
  .container {
    h3 {
      text-align: center;
    }
    p {
      padding-top: 16px;
      padding-bottom: 6px;
    }
    table {
      width: 760px;
      text-align: left;
      box-sizing: border-box;
      tr {
        td {
          padding: 10px;
          border: 2px solid #e5e5e5 !important;
          img {
            position: absolute;
            height: 136px;
          }
        }
        td:first-child {
          width: 25%;
        }
        td:nth-child(2) {
          width: 30%;
        }
      }
    }
    .car-picture {
      width: 480px;
      margin: 16px auto;
      p {
        text-align: center;
        padding-bottom: 16px;
      }
      img {
        height: 360px;
      }
    }
  }
}
</style>
