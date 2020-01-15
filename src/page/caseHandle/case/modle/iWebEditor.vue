<template>
 <body onload="LoadPage()">
  <div style="display: inline-block;overflow-y: auto;width: 13%;height: 1000px">
        <div style="display: inline-block;">
            <table width="100%" style="border-width: 1px; border-color: #000; border-style: solid" border="0">
                <fieldset>
                     <button style="width:108pt;height:30pt;" onclick="SetSafeKey()">
						设置应用授权
					 </button>
					  <button style="width:108pt;height:30pt;" onclick="SoftSign()">
						账号密码签章
					 </button>
				</fieldset>
                <fieldset>
                <legend style="color:#0000ff;font-size:14px">文档操作接口</legend>
                <button style="width:108pt;height:30pt;" onclick="SaveWebFile()">
                    保存该文件
                </button>
                <button  style="width:108pt;height:30pt;" onclick="CloseFile()">
                    关闭当前文档
                </button>
                <button style="width:108pt;height:30pt;" onclick="PrintFile()">
                    打印文档
                </button>

                <button style="width:108pt;height:30pt;" onclick="GetPageCount()">
                    文档总页数
                </button>
             </fieldset>
            </table>
        </div>
    </div>
    <div id='myDiv' style="display:inline-block; vertical-align:top;height:740px;width:86%;padding:0;margin:0"></div>
 </body>
</template>

<script>
export default {
    data() {
        return{
           PDFReader:"",
		    g_guid:""
        }
    },
   methods: {
        LoadPage() 
			{
            	let url  = getParam("path");
				let divobj = document.createElement("div");
				divobj.setAttribute("id", "objdiv1");
				let obj = "";
				obj = "<object style='display:inline-block;width:100%;height:1000px;vertical-align:top;' classid=clsid:3BCB99FC-44E6-407A-ACE8-9E20BFAA1A0F  id='PDF'</object>";
				divobj.innerHTML = obj;
			    document.getElementById('myDiv').appendChild(divobj);
                this.PDFReader = document.getElementById("PDF");
                //打开网络文档
                this.PDFReader.OpenFile(2,url,"", ""); 
            },
        getParam(paramName) 
            {
           	    paramValue = "", isFound = !1;
           	    if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
           	        arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("="), i = 0;
           	     	paramValue = arrSource[1];
           	    }
           	    return paramValue == "" && (paramValue = null), paramValue;
           		 //alert(paramValue);
           	},
         /*设置应用接口*/
        SetSafeKey() 
            {
				this.PDFReader.SetSafeKey("660456855e0d40ca96a8a7d93b0f7894","a4b5f7427d10471197126369d38827a6","MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAK8T1lXrwP4xcVHVJnXe0+HHKrxid+sqbnFxFf2SJ0ufYUiorvAWzBnb/5lhE6yLz9ivykz1mliOr4FzuqxMH/sCAwEAAQ==","MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEArxPWVevA/jFxUdUmdd7T4ccqvGJ36ypucXEV/ZInS59hSKiu8BbMGdv/mWETrIvP2K/KTPWaWI6vgXO6rEwf+wIDAQABAkBW18Qtgm+MpwHK0avuM8Vt7Nkp8L4DDF0UMD/0M5cCTwzo3bvdiQbxB0fGWFUS+GhKdZ0pWPPo0T/4zIlwPBeBAiEA7s/hxI8Xk65V1UYE1zTGqQztKr/j6yc7RqwJ/yN7/AsCIQC7raUEDp4aMgTqLc/AROLUjvtbjQVbpBIquytodofx0QIhAKQSSshijw41fl8SxgydA8ftS5xNTeengoAhfpS96lbVAiBqPM9OTp/8oBfcH/acFeJ5BD8RAfDogSWvfqgByCcIIQIhAKoBy2f3NmtF3NZ/Jze6pGyFqCyqZhJ+K9WAdZHl3vFR","mFDuULIPoSAcXxEyfV6AAQ==","");
            },
        //软证书签章
        SoftSign() 
            {
			    this.PDFReader.SetSignImage(7, "", "");				//设置印章图片
				this.PDFReader.SetSignCert(3,"","","");              //设置证书
				this.PDFReader.AddNormalSign(0,"","");               //手动定位模式
            },
        /*文档操作接口类*/
        //获取控件版本
        GetOCXVersion() {
                alert(PDFReader.GetOCXVersion());                                    
            },
         //打开本地文档   
        OpenFile() {
                var url="";
                alert("正在打开本地文档："+url); 
                PDFReader.OpenFile(1,"C:\\Users\\admin\\Desktop\\test.pdf","",""); 
            },
        //打开网络文档
        OpenWebFile() {
                var url="";
                PDFReader.OpenFile(2,url,"", "");                   
            },
        //保存文档到本地
        SaveFile() {
                alert("保存到:D:\\test.pdf");
                PDFReader.SaveFile(2, "D:\\test.pdf", "");           //保存文档到本地
            },
            //保存文档到服务器
        SaveWebFile() {  
            	var href = window.location.href;
            	var spstr = href.split("/");
            	var hrefPost = spstr[2]+"/"+spstr[3];
            	var fileName = getParam(fileName).split("/");
            	var pdfname = fileName[fileName.length-1];
            	var url  = "http://"+hrefPost+"/fileDocUpload/uploadAZT?fileName="+pdfname;
            	//var url  = "http://"+window.location.host+"/zhzf/fileDocUpload/uploadAZT?fileName="+pdfname;
            	//alert("正在保存文档："+url);
            	if(PDFReader.GetSignCount(0, 0, "") == 0){
            		alert("请先进行签章操作，在保存！");
            	}else{
            		 PDFReader.SaveFile(3,url,"");
                     alert("保存成功");
            	}
            },
        //关闭当前打开的文档
        CloseFile() {
                PDFReader.CloseFile(0);                    
            },
        //打印当前文档
        PrintFile() {
                PDFReader.PrintFile(1, "", 0, "","");      
            },
        //获取文档总页数
        GetPageCount() {
                alert(PDFReader.GetPageCount()); 
            },
        //开始普通印章
        AddNormalSign() {
                PDFReader.AddNormalSign(1, "", "");						
            },
        //设置印章宽度和高度（可选）
        SetSignWidthHeight() {
                PDFReader.SetSignWidthHeight(100, 200);					
            },
        //获取电子签章个数
        GetSignCount() {
                alert(PDFReader.GetSignCount(0, 0, ""));		//获取电子签章个数
            },
        SetOpenVerify() {
                PDFReader.SetOpenVerify(true);							//设置打开文档是否验证印章
            },
        VerifySign() {
                var Rit=PDFReader.VerifySign(0, "");					//验证电子签章有效性
                alert(Rit);
            },
        SetRegionGuard1()
            {
                PDFReader.SetSignImage(1, "", "");     //设置印章,必须放在最前面设置
                PDFReader.SetSignCert(1, "", "", "");  //设置证书
                PDFReader.SetDimension(2);             //设置尺寸单位  1-像素 2-毫米 3–英寸
                PDFReader.SetRegionGuard("1,0,0,200,200","");   //设置保护区域,文档左上角0,0为起点,10,10为一个矩形区域
                PDFReader.AddNormalSign(1, "", "");    //开始签章
            },
        SetRegionGuard2(){
                PDFReader.SetSignImage(1, "", "");      //设置印章,必须放在最前面设置
                PDFReader.SetSignCert(1, "", "", "");   //设置证书
                PDFReader.SetDimension(2);				//设置尺寸单位  1-像素 2-毫米 3–英寸
                PDFReader.SetRegionGuard("1,0,0,200,225","");   //设置保护区域,文档左上角0,0为起点,10,10为一个矩形区域
                PDFReader.AddNormalSign(1, "", "");     //开始签章
            },
        SetRegionGuard3(){
                PDFReader.SetSignImage(1, "", "");      //设置印章,必须放在最前面设置
                PDFReader.SetSignCert(1, "", "", "");   //设置证书
                PDFReader.SetDimension(2);              //设置尺寸单位  1-像素 2-毫米 3–英寸
                PDFReader.SetRegionGuard("1,0,0,200,250","");   //设置保护区域,文档左上角0,0为起点,10,10为一个矩形区域
                PDFReader.AddNormalSign(1, "", "");     //开始签章
            },
        SetRegionGuard4(){
                PDFReader.SetSignImage(1, "", "");      //设置印章,必须放在最前面设置
                PDFReader.SetSignCert(1, "", "", "");   //设置证书
                PDFReader.SetDimension(2);              //设置尺寸单位  1-像素 2-毫米 3–英寸
                PDFReader.SetRegionGuard("1,0,0,200,275","");   //设置保护区域,文档左上角0,0为起点,10,10为一个矩形区域
                PDFReader.AddNormalSign(1, "", "");     //开始签章
            },
   }
}
</script>
