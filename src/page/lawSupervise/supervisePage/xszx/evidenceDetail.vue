<template>
<div class="main_box">
    <slider ref="slider" :options="options">
        <slideritem v-for="(item,index) in navList" :key="index" >
            <component v-bind:is="item.component"></component>
        </slideritem>
        <div slot="loading">loading...</div>
    </slider>
    <btns></btns>
</div>
</template>
<style src="@/assets/css/sliderPage.scss" lang="scss"></style>
<style src="@/assets/css/basicStyles/error.scss" lang="scss"></style>
<script>
import {slider,slideritem} from 'vue-concise-slider';
import checkDataComponent from './componentChild/checkDataComponent.vue';
import takePhotosComponent from './componentChild/takePhotosComponent.vue';
import btns from '@/page/lawSupervise/componentCommon/btns.vue';
export default {
    data() {
    let self = this;
    return {
        navList: [{
            name:'过检数据',
            className: 'el-icon-warning',
            component: 'checkDataComponent'
        }, {
            name:'检测拍照',
            className: 'el-icon-warning',
            component: 'takePhotosComponent'
        },{
            name:'备注说明',
            className: 'el-icon-success',
            component: 'takePhotosComponent'
        },{
            name:'上传证据',
            className: 'el-icon-success',
            component: 'takePhotosComponent'
        }],
        options: {
            currentPage: 0,
            tracking: false,
            thresholdDistance: 100,
            thresholdTime: 300,
            infinite: 4,
            slidesToScroll: 1,
            loop: false,
            direction:'vertical',
            pagination: true,
            renderPagination: (h, index) => {
                // debugger;
                return h('div', {
                    class: 'swiper-pagination-title'
                }, [
                    h('a', {
                        class: null
                    }, [
                         h('i', {
                            class: self.navList[index-1].className
                        }, null),
                        h('span', {
                            class: 'resultMsg'
                        }, self.navList[index-1].name)
                    ])
                ])
            }
        }
    }
  },
  methods: {
      slide(){

      }
  },
  components: {
    slider,
    slideritem,
    checkDataComponent,
    takePhotosComponent,
    btns
  }
}
</script>
