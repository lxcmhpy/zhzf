// import echarts from 'echarts'
// import 'echarts/lib/chart/graph'
export const lawSuperviseObj = {
    option: {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['待办任务', '接收任务', '完成任务']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            top: '18%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['一月', '二月', '三月']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '待办任务',
                type: 'bar',
                data: [920, 432, 301],
                itemStyle: {
                    color: '#4573D0'
                    // color: new echarts.graphic.LinearGradient(
                    //     0, 0, 0, 1,
                    //     [
                    //         {offset: 0, color: '#4573D0'},
                    //         {offset: 0.5, color: '#188df0'},
                    //         {offset: 1, color: '#188df0'}
                    //     ]
                    // )
                }
            },
            {
                name: '接收任务',
                type: 'bar',
                stack: '广告',
                data: [420, 632, 401],
                itemStyle: {
                    color: '#5AD8A6'
                    // color: new echarts.graphic.LinearGradient(
                    //     0, 0, 0, 1,
                    //     [
                    //         {offset: 0, color: '#f1d69f'},
                    //         {offset: 0.5, color: '#ebb951'},
                    //         {offset: 1, color: '#ffac00'}
                    //     ]
                    // )
                }
            },
            {
                name: '完成任务',
                type: 'bar',
                data: [862, 318, 164],
                itemStyle: {
                    color: '#5D7092'
                    // color: new echarts.graphic.LinearGradient(
                    //     0, 0, 0, 1,
                    //     [
                    //         {offset: 0, color: '#eeeeee'},
                    //         {offset: 0.5, color: '#dad9d8'},
                    //         {offset: 1, color: '#c4c4c4'}
                    //     ]
                    // )
                }
            }
        ]
    }
}
var dataAxis = ['出租车', '入口\n检测', '投诉\n举报', '非现场\n检测'];
var data = [120, 182, 191, 234];
var yMax = 300;
var dataShadow = [];

for (var i = 0; i < data.length; i++) {
    dataShadow.push(yMax);
}

export var yjObj = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '8%',
        top: '5%',
        containLabel: true
    },
    xAxis: {
        data: dataAxis,
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                color: '#999'
            }
        }
    },
    series: [
        { // For shadow
            type: 'bar',
            itemStyle: {
                // color: 'rgba(0,0,0,0.05)'
                // color: 'rgba(255, 156, 27, 0.6)'
                color: '#6188D7'
            },
            barGap: '-100%',
            barCategoryGap: '60%',
            data: dataShadow,
            animation: false
        },
        {
            type: 'bar',
            itemStyle: {
                color:'#5AD8A6'
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1,
                //     [
                //         {offset: 0, color: '#83bff6'},
                //         {offset: 0.5, color: '#188df0'},
                //         {offset: 1, color: '#188df0'}
                //     ]
                // )
            },
            data: data
        }
    ]
};
