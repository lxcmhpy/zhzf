<template>
    <div class="dataScreen">
        <div class="border-line-dark">
            <div class="border-line-cover">
                <ul class="left first">
                    <li class="line" v-for="item in 5" :key="item.toString()"></li>
                    <li class="line last" ></li>
                    <li class="line margin0" ></li>
                    <li class="line margin0" ></li>
                    <li class="circle"></li>
                    <li class="line margin0" ></li>
                    <li class="circle"><span class="el-icon-plus"></span></li>
                    <li class="line margin0" ></li>
                    <li class="circle"></li>
                    <li class="line margin0" ></li>
                    <li class="line margin0" ></li>
                </ul>
                <div style="clear:both"></div>
            </div>
            <div style="width: 500px; height: 500px;position:absolute;top:0px;z-index:1000;">
                <div style="width: 400px; height: 400px;" ref="echartsPie"></div>
            </div>
        </div>
    </div>
</template>
<style src="@/assets/css/catsDataScreen.scss" lang="scss"></style>
<script>
import echarts from "echarts";
export default {
    methods: {
        drawPie () {
            var mychart = this.$refs.echartsPie;
            if (mychart) {
                let myChart = echarts.init(mychart);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 10,
                        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center',
                                interval: 20,
                                normal: {
                                    show: true,
                                    // textStyle: {
                                    //     'lineHeight': 16,
                                    //     'fontSize': 14,
                                    //     'z-index': 9999,
                                    //     'fontWeight': 'bold'
                                    // },
                                    formatter: function(data) {
                                        var colorList = [
                                            'blue', 'green', 'orange', 'red', 'purple'
                                        ]
                                        // '\n( '+data.percent+'% )
                                        return colorList[data.dataIndex];
                                    },
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '30',
                                    fontWeight: 'bold',
                                    interval: 20
                                }
                            },
                            labelLine: {
                                show: true,
                                interval: 20
                            },
                            data: [
                                {value: 335, name: '直接访问'},
                                {value: 310, name: '邮件营销'},
                                {value: 234, name: '联盟广告'},
                                {value: 135, name: '视频广告'},
                                {value: 1548, name: '搜索引擎'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowOffsetX: 0,
                                    shadowColor: '#000c14',
                                    borderWidth: 0,
                                },
                                normal: {
                                    shadowBlur: 5,
                                    shadowOffsetX: 0,
                                    shadowColor: 'none',
                                    fontWeight: 'bolder',
                                    borderWidth: 7,
                                    borderColor: '#000c14'

                                }
                            },
                        }
                    ]
                };
                myChart.setOption(option);
            }
        }
    },
    mounted () {
        this.drawPie();
    }
}
</script>

