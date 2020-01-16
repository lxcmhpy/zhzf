// 废弃
<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  data() {
    return {
      caseNumber: '010-123456',
    }
  },
  methods: {

    install ( ) {
      //太虚
      // debugger
      var width = document.querySelector('#pdfDom').offsetWidth; //获取dom 宽度
  var height = document.querySelector('#pdfDom').offsetHeight; //获取dom 高度
  var element = document.getElementById('a4-outDom');
  // element.style.display = 'none';
  element.innerHTML = document.getElementById('pdfDom').outerHTML;
  width = width;
  height = height;
	var canvas = document.createElement("canvas"); //创建一个canvas节点
	var scale = 3; //定义任意放大倍数 支持小数
	canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
	canvas.height = height * scale; //定义canvas高度 *缩放
	canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

      html2Canvas(element, {
        allowTaint: true,
        backgroundColor: 'white',
        canvas: canvas,
        dpi: 1200
      }).then(function (canvas) {
        element.style.display = 'none';
        var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = true;
        context.webkitImageSmoothingEnabled = true;
        context.msImageSmoothingEnabled = true;
        context.imageSmoothingEnabled = true;

        var imgData = canvas.toDataURL('image/png','1.0');//转化成base64格式,可上网了解此格式
        var img = new Image();
        img.src = imgData;
		  img.onload = function() {
		    img.width = canvas.width/3;   //因为在上面放大了2倍，生成image之后要/2
		    img.height = canvas.height/3;
        // img.style.transform="scale(0.1)";
        console.log(imgData)

		    /****分页******/
		     var pageHeight = 841.89;//一页高度
		     var leftHeight = height * 0.75;//未打印内容高度
	      	 var position = 0;//页面偏移
	      	 var imgWidth = 595.28;
	         //var imgHeight = 841.89;
	         var imgHeight =   592.28 /img.width *img.height;
	         console.log("imgWidth="+imgWidth);
	         console.log("imgHeight="+imgHeight);
	      	  var doc = new JsPDF('', 'pt', 'a4');
            if(pageHeight >= leftHeight){//不需要分页，页面高度>=未打印内容高度
              console.log("不需要分页");
              doc.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight);
            }else{//需要分页
              console.log("需要分页");
              while(leftHeight>0){
              console.log("position="+position);
              console.log("leftHeight="+leftHeight);
              doc.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if(leftHeight > 0){
                console.log("添加空白页");
                doc.addPage();
              }
              }
            }
            doc.save('report_pdf_' + new Date().getTime() + '.pdf');//保存为pdf文件
        }
      })
    }
  }

}
</script>
