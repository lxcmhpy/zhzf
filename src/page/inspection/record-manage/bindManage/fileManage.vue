<template>
  <div class="imanage-box noborder-card">
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in titleList" :key="index" :label="item"></el-tab-pane>
    </el-tabs>
    <div class="tabs-content">
      <div class="halfpage-left">
        <p class="border-title">关联文书</p>
        <div>
          <ul>
            <li class="icon-list" v-for="(item,index) in choosedList" :key="index" :label="item">
              <div class="icon-box">
                <svg t="1599039558192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14049" width="35" height="35">
                  <path d="M158.339657 27.882057a79.579429 79.579429 0 0 0-79.286857 79.286857v836.169143a79.579429 79.579429 0 0 0 79.286857 79.286857h711.855543a79.579429 79.579429 0 0 0 79.286857-79.286857V343.420343L655.740343 27.882057h-497.371429z" fill="#8C181A" p-id="14050"></path>
                  <path d="M949.482057 344.941714v15.5648h-198.948571s-97.923657-20.187429-94.793143-104.155428c0 0 3.072 88.619886 93.242514 88.619885h200.4992z" fill="#6B0D12" p-id="14051"></path>
                  <path d="M655.711086 27.882057V254.829714c0 26.4192 17.115429 90.170514 94.793143 90.170515h198.948571L655.740343 27.882057z" fill="#FFFFFF" p-id="14052"></path>
                  <path d="M490.583771 697.197714l11.410286-17.554285c-46.811429-17.261714-85.723429-38.912-116.736-65.243429 28.672-31.012571 50.322286-69.924571 64.658286-116.150857h45.641143v-21.065143h-111.762286c-9.362286-20.187429-19.309714-37.449143-30.427429-51.492571l-21.065142 7.606857c11.702857 13.750857 21.357714 28.379429 29.257142 43.885714h-121.124571v21.065143h45.056a267.4688 267.4688 0 0 0 70.509714 117.613714c-31.597714 28.672-71.972571 49.444571-121.124571 62.610286l11.117714 18.432c49.737143-14.336 91.282286-36.864 124.635429-67.584 31.597714 27.209143 71.387429 49.737143 119.954285 67.876571z m-119.954285-95.963428c-30.427429-29.257143-51.785143-63.488-64.365715-102.985143h121.709715c-12.288 40.374857-31.305143 74.605714-57.344 102.985143z m284.379428 95.085714v-119.661714h100.644572c-0.877714 36.864-3.218286 57.636571-7.314286 62.610285-3.803429 4.681143-9.947429 7.021714-18.724571 7.314286-8.777143 0-18.432-0.292571-28.379429-0.292571l5.558857 19.894857h19.309714c6.436571 0 12.580571-0.877714 19.017143-2.048 7.606857-1.755429 13.458286-4.681143 17.554286-9.069714 8.777143-9.654857 13.458286-42.422857 13.750857-98.596572h-41.545143l5.851429-68.461714v-10.24h-85.723429v-51.2h-21.065143v51.2h-87.186285v20.187428h87.186285v58.514286h-103.862857v20.187429h103.862857v119.661714h21.065143z m122.002286-211.529143l11.117714-17.554286c-17.846857-15.213714-37.741714-28.379429-59.392-39.497142l-10.825143 15.798857c20.187429 9.947429 39.789714 23.698286 59.099429 41.252571z m-62.610286 71.68h-59.392v-58.514286h64.950857l-5.558857 58.514286z" fill="#FFFFFF" opacity=".802" p-id="14053"></path>
                </svg>
              </div>
              {{item}}
              <i @click="deleteChosed(item,index)" class="el-icon-circle-close hover-delete"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="halfpage-right">
        <p class="border-title">可选文书</p>
        <div class="filecheck-name-list">
          <el-checkbox-group v-model="checkboxGroup1" size="small">
            <el-checkbox-button  v-for="(item,index) in fileList" :key="index" :label="item"></el-checkbox-button>
            <el-checkbox label="备选项2" border disabled></el-checkbox>
          </el-checkbox-group>
        </div>

      </div>
    </div>
    <div class="big-bottom-btn">
      <el-button>取消</el-button>
      <el-button type="primary" style="margin-left:34px">保存</el-button>
    </div>
  </div>
</template>
<script>
import { mixinGetCaseApiList } from "@/common/js/mixins";

export default {

  data() {
    return {
      isHome: true,
      searchModleName: '',
      titleList: ['处罚案件的什么模板'],
      typeList: [{}],
     checkboxGroup1: [],
      choosedList: ['《安全隐患告知函》', '《责令整改通知书》', '《立案登记表》'],
      fileList: ['《安全隐患告知函》', '《责令整改通知书》', '《立案登记表》'],
    }
  },

  methods: {
    fileHover() {
    },
    deleteChosed(item, index) {
      console.log('删除', item, index)
    },
  },
  mounted() {
  }
}
</script>