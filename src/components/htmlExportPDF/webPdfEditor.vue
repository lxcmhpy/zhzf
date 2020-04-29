<template>
    <div>
        <!-- <button type="button" @click="openURL">通过MultBrowser来打开控件</button> -->
        <a href="javascript:void(0)" @click="openURL">
        打开控件
        </a>
        <!-- <object >
      <embed class="print_info" style="padding:0px;width: 1000px;margin:0 auto;height:100% !important" name="plugin"
       id="plugin" src="http://172.16.170.54:9332/12,3b11e8faa6" type="application/pdf" internalinstanceid="29">
    </object> -->

    <object id="PDF" object="" classid="clsid:3BCB99FC-44E6-407A-ACE8-9E20BFAA1A0F" style="width: 100%; height: 740px; vertical-align: top; display: inline-block;"

    src="http://172.16.170.54:9332/12,3b11e8faa6">
        <param NAME="_Version" VALUE="65536"/>
        <param NAME="_ExtentX" VALUE="42492"/>
        <param NAME="_ExtentY" VALUE="19579"/>
        <param NAME="_StockProps" VALUE="0"/>
    </object>
        <!-- <frame > -->
            <!-- <div> -->
            <!-- <iframe src="http://172.16.170.44:8083/iWebPDFEditor-V5.1/MultBrowser.html?path=http://172.16.170.54:9332/12,3b11e8faa6"></iframe> -->
            <!-- </div> -->
        <!-- </frame> -->
        <!-- <el-dialog class='mini-dialog-title' title="无效信息" :visible.sync="visible" :show-close='false' :close-on-click-modal="false" width="1000px">
            <template>
                <iframe src="http://172.16.170.44:8083/iWebPDFEditor-V5.1/MultBrowser.html?path=http://172.16.170.54:9332/12,3b11e8faa6">
                    <div>
                        <div style="display: inline-block;overflow-y: auto;width: 13%;height: 740px">
                            <div style="display: inline-block;">
                                <table width="100%" style="border-width: 1px; border-color: #000; border-style: solid" border="0">


                                    <fieldset>
                                        <button style="width:108pt;" @click="SetSafeKey()">
                                            设置应用授权
                                        </button>

                                        <button style="width:108pt;" @click="SoftSign()">
                                            账号密码签章
                                        </button>

                                    </fieldset>
                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">文档操作接口</legend>

                                    <button style="width:108pt;" @click="GetOCXVersion()">
                                        获取控件版本号
                                    </button>
                                    <button style="width:108pt;" @click="OpenFile()">
                                        打开本地文档
                                    </button>
                                    <button style="width:108pt;" @click="OpenWebFile()">
                                        打开网络文档
                                    </button>
                                    <button style="width:108pt;" @click="SaveFile()">
                                        另存文档到本地
                                    </button>
                                    <button style="width:108pt;" @click="SaveWebFile()">
                                        另存文档到后台
                                    </button>
                                    <button  style="width:108pt;" @click="CloseFile()">
                                        关闭当前文档
                                    </button>
                                    <button style="width:108pt;" @click="PrintFile()">
                                        打印文档
                                    </button>
                                    <button style="width:108pt;" @click="ScrollView()">
                                        滚动视图
                                    </button>
                                    <button style="width:108pt;" @click="GetPageCount()">
                                        文档总页数
                                    </button>
                                    <button style="width:108pt;" @click="SetReadPage()">
                                        跳转到页码
                                    </button>
                                    <button style="width:108pt;" @click="GetReadPage()">
                                        获取当前页码
                                    </button>

                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">外观接口</legend>
                                    <button style="width:108pt;" @click="SetReadZoom()">
                                        设置缩放
                                    </button>
                                    <button style="width:108pt;" @click="SetReadRotate()">
                                        设置旋转
                                    </button>
                                    <button style="width:108pt;" @click="SetDocName()">
                                        设置文档显示名称
                                    </button>
                                    <button style="width:108pt;" @click="SetDocToolbarShow()">
                                        隐藏文档工具栏
                                    </button>
                                    <button style="width:108pt;" @click="SetToolboxShow()">
                                        隐藏工具箱
                                    </button>
                                    <button style="width:108pt;" @click="SetSidebarShow()">
                                        隐藏左导航栏
                                    </button>
                                    <button style="width:108pt;" @click="SetDocToolbarButtonShow()">
                                        隐藏文档工具栏上的按钮
                                    </button>
                                    <button style="width:108pt;" @click="SetToolboxButtonShow()">
                                        隐藏工具箱中的按钮
                                    </button>
                                    <button style="width:108pt;" @click="SetTextColor()">
                                        设置文字颜色
                                    </button>
                                    <button style="width:108pt;" @click="SetBackColor()">
                                        设置背景颜色
                                    </button>
                                    <button style="width:108pt;" @click="SetTabShow()">
                                        隐藏Tab标签栏
                                    </button>
                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">签章接口</legend>
                                    <button style="width:108pt;" @click="SetSignImage()">
                                        设置印章图片来源
                                    </button>
                                    <button style="width:108pt;" @click="SetSignCert()">
                                        设置证书来源
                                    </button>
                                    <button style="width:108pt;" @click="SetSignWidthHeight()">
                                        设置印章宽高(可选)
                                    </button>
                                    <button style="width:108pt;" @click="AddNormalSign()">
                                        开始普通印章
                                    </button>
                                    <button style="width:108pt;" @click="AddMultiSign()">
                                        开始骑缝印章
                                    </button>
                                    <button style="width:108pt;" @click="AddBatchSign()">
                                        开始多页印章
                                    </button>
                                    <button style="width:108pt;" @click="SetKeyWordOffset()">
                                        设置关键字印章偏移(可选)
                                    </button>
                                    <button style="width:108pt;" @click="AddKeyWordSign()">
                                        开始关键字印章
                                    </button>
                                    <button style="width:108pt;" @click="AddTextWaterMark()">
                                        文字水印
                                    </button>
                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">签章扩展接口</legend>
                                    <button style="width:108pt;" @click="GetSignCount()">
                                        获取印章个数
                                    </button>
                                    <button style="width:108pt;" @click="GetAllSignInfo()">
                                        获取当前文档所有印章信息
                                    </button>
                                    <button style="width:108pt;" @click="SetOpenVerify()">
                                        设置打开文档是否验证
                                    </button>
                                    <button style="width:108pt;" @click="SetSignSubjoin()">
                                        设置印章附加数据
                                    </button>
                                    <button style="width:108pt;" @click="CallToolboxItem()">
                                        触发工具箱上的按钮
                                    </button>
                                    <button style="width:108pt;" @click="VerifySign()">
                                        验证当前文档内的印章
                                    </button>
                                    <button style="width:108pt;" @click="CrytoDataJiaM()">
                                        加密数据
                                    </button>
                                    <button style="width:108pt;" @click="CrytoDataJieM()">
                                        解密数据
                                    </button>

                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">注释接口</legend>

                                    <button style="width:108pt;" @click="InsertGraphAnnotFZ()">
                                        插入附注
                                    </button>
                                    <button style="width:108pt;" @click="InsertGraphAnnotYB()">
                                        插入直线注释
                                    </button>
                                    <button style="width:108pt;" @click="InsertGraphAnnot()">
                                        插入圆形注释
                                    </button>
                                    <button style="width:108pt;" @click="InsertGraphAnnotJX()">
                                        插入矩形注释
                                    </button>
                                    <button style="width:108pt;" @click="InsertGraphAnnotDBX()">
                                        插入多边形注释
                                    </button>
                                    <button style="width:108pt;" @click="InsertGraphAnnotYX()">
                                        插入云线注释
                                    </button>
                                    <button style="width:108pt;" @click="GetAllAnnotInfo()">
                                        获取所有注释信息
                                    </button>
                                    <button style="width:108pt;" @click="AddAnnot()">
                                        合并注释
                                    </button>
                                    <button style="width:108pt;" @click="SetAnnotTipWndShow()">
                                        隐藏注释点击弹框
                                    </button>
                                    <button style="width:108pt;" @click="GetAllTabAnnotInfo()">
                                        获取所有打开的文档内的注释
                                    </button>
                                    <button style="width:108pt;" @click="SetAnnotOptionDlgInfo()">
                                        设置注释选项对话框的信息
                                    </button>
                                    <button style="width:108pt;" @click="SetAnnotMenuVisible()">
                                        隐藏注释右键选项
                                    </button>
                                </fieldset>


                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">测量接口</legend>
                                    <button style="width:108pt;" @click="MeterJL()">
                                        测量距离
                                    </button>
                                    <button style="width:108pt;" @click="MeterJD()">
                                        测量角度
                                    </button>
                                    <button style="width:108pt;" @click="MeterHC()">
                                        测量弧长
                                    </button>
                                    <button style="width:108pt;" @click="MeterBJ()">
                                        测量半径
                                    </button>
                                    <button style="width:108pt;" @click="MeterCX()">
                                        测量垂线
                                    </button>
                                    <button style="width:108pt;" @click="MeterLXXD()">
                                        测量连续线段
                                    </button>
                                    <button style="width:108pt;" @click="MeterTYMJ()">
                                        测量椭圆面积
                                    </button>
                                    <button style="width:108pt;" @click="MeterJXMJ()">
                                        测量矩形面积
                                    </button>
                                    <button style="width:108pt;" @click="MeterYXMJ()">
                                        测量异形面积
                                    </button>

                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">表单接口</legend>
                                    <button style="width:108pt;" @click="SetFormMode()">
                                        进入表单编辑模式
                                    </button>
                                    <button style="width:108pt;" @click="WriteForm()">
                                        接口自动填写表单
                                    </button>
                                    <button style="width:108pt;" @click="GetFormInfo()">
                                        获取所有表单数据
                                    </button>
                                    <button style="width:108pt; " @click="GetNumberOfUnfilledEssentialForms()">
                                        获取未填写的必填表单数量
                                    </button>
                                    <button style="width:108pt;" @click="SetFormModeEnd()">
                                        退出编辑模式
                                    </button>
                                </fieldset>

                                    <fieldset>
                                    <legend style="color:#0000ff;font-size:14px">分区域保护接口</legend>
                                    <button style="width:108pt;" @click="SetRegionGuard1()">
                                        承办人签名
                                    </button>
                                    <button style="width:108pt;" @click="SetRegionGuard2()">
                                        法制部门签名
                                    </button>
                                    <button style="width:108pt;" @click="SetRegionGuard3()">
                                        承办负责人签名
                                    </button>
                                    <button style="width:108pt;" @click="SetRegionGuard4()">
                                        行政负责人签名
                                    </button>
                                </fieldset>
                                </table>
                            </div>
                        </div>

                        <div id='myDiv' style="display:inline-block; vertical-align:top;height:740px;width:86%;padding:0;margin:0"></div>
                    </div>
                </iframe>
            </template>
        </el-dialog> -->
    </div>
</template>
	<script src="./MultBrowser/jquery-1.11.2.min.js"></script>
	<script src="./MultBrowser/MultBrowser-1.0.2.js"></script>
	<script src="./MultBrowser/bootstrap.min.js" ></script>
	<script src="./MultBrowser/base64.js" ></script>
	<script src="./MultBrowser/json.js" ></script>
	<script src="./MultBrowser/jsonp.js"></script>

<script>
export default {
    data () {
        return {
            visible: false,
            PDFReader: null,
            g_guid: null,
            Data: null,
            AnnotData: null
        }
    },
    methods: {
        //功能说明：创建AZTBrowser浏览器并打开URL地址后的回调用函数
		//参数1：状态值
		//参数2：AZTBrowser浏览器的ID号，如果打开多个，此ID不同
		 callBackBrowserURL(error, id){
			if(error == 0){  //调用成功
				//功能说明：监听AZTBrowser浏览器返回状态和数据
				//参数1：AZTBrowser浏览器的ID号
				//参数2：监听间隔时间，以秒位单位
				//参数3：回调函数
				MultBrowser.waitStatus(id, "2", this.callBackWaitStatus);
			}
		},

         //功能说明：监听AZTBrowser浏览器返回状态和数据
		 //参数1：AZTBrowser浏览器的ID号，如果打开多个，此ID不同
		 //参数2：状态值
		 //参数3：AZTBrowser浏览器返回来的ID号
		 //参数4：AZTBrowser浏览器返回来的内容
		 callBackWaitStatus(id, error, status, msg){
			if(error == 0){
				if(status == "0"){
					//超时
					//alert("我啥也不做");
				}
				else{
					//成功
					alert(status + "---" + msg);  //通过这里的数据进行刷新调用方页面等操作
				}

				//继续循环监听
				MultBrowser.waitStatus(id, "2", this.callBackWaitStatus);
			}
		},

		//通过AZTBrowser来打开需要的地址
		 openURL(){

            var ActivexURL="http://172.16.170.44:8083/iWebPDFEditor-V5.1/MultBrowser.html?path=http://172.16.170.54:9332/12,3b11e8faa6";
            // http://124.192.215.4:8083/iWebPDFEditor-V5.1/MultBrowser.html?path=http://124.192.215.10:9332/12,3b11e8faa6
		    alert("请确定您传入的地址，不支持带中文URL！当前传入的路径为："+ActivexURL);
		    //功能说明：创建AZTBrowser浏览器并打开URL地址
			//参数1：URL地址
			//参数2：是否置顶 1表示置顶，0表示不置顶
			//参数3：回调函数
            MultBrowser.openBrowserURL(ActivexURL, "1", this.callBackBrowserURL);
            // window.opener
		}
    }
}
</script>
