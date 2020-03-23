export const mixinsCommon = {
    data () {
        return {
            errorObj: {
                error: 'iconfont law-error',
                success: 'iconfont law-success'
            }
        }
    },
    methods: {
        errorMsg (msg, type) {
            // type: error错误
            this.$message({
                iconClass: this.errorObj[type],
                customClass: type+'Msg',
                dangerouslyUseHTMLString: true,
                message: `${type}：${msg}`
            });
            return
        }
    }
}
// 综合监管
export const lawSuperviseMixins = {
    data () {
        return {
            tableData: [{
                name: '京A12345',
                num: '123'
            },{
                name: '粤C12345',
                num: '333'
            },{
                name: '津B12345',
                num: '2'
            },{
                name: '冀C12345',
                num: '89'
            }],
            style: "amap://styles/whitesmoke",
            styleIndexNumher: 1,
            loading: false,
            styleListNumber: ['标准', '远山黛', '马卡龙', '涂鸦','极夜蓝','靛青蓝','草色青','幻影黑','月光银','雅士灰'],
            styleList: [
                "amap://styles/normal", // 标准
                "amap://styles/whitesmoke", // 远山黛
                "amap://styles/macaron", // 马卡龙
                "amap://styles/graffiti", // 涂鸦
                "amap://styles/darkblue", // 极夜蓝
                "amap://styles/blue", // 靛青蓝
                "amap://styles/fresh", // 草色青
                "amap://styles/dark", // 幻影黑
                "amap://styles/light", // 月光银
                "amap://styles/grey" // 雅士灰
            ]
        }
    },
    methods: {
        // 上传证据
        // uploadEvApi (file) {

        // }
        getRealTimeDataByLawSupervise () {
            let nameList = ['京A','京C','京F','津E', '津A','粤A','沪C','沪D','渝A','渝F']
            let _this = this
            setInterval (function(){
                _this.loading = true
                _this.updateLoading()
                _this.tableData.splice(0, _this.tableData.length)
                for(let i=0;i<4;i++) {
                    // delete (_this.tableData[i])
                    let nameListNum = Math.floor(Math.random() * 10);
                    let nameNum = Math.floor(Math.random() * 10000 + 1);
                    let num = Math.floor(Math.random() * 100);
                    _this.tableData.push({
                        name: nameList[nameListNum] + nameNum,
                        num: num
                    })
                }
                // _this.style="amap://styles/macaron"
            }, 10000)
        },
        updateLoading () {
            let _this = this
            setTimeout(function(){
                _this.loading = !_this.loading
            },500)
        }
    },
    watch: {
        styleIndexNumher (newVal, oldVal) {
            this.style = this.styleList[newVal];
        }
    },
    mounted () {

    }
}

