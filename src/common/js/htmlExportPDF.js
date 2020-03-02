import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'

export async function htmlExportPDF(id, callback) {
    debugger;
  let element = document.getElementById(id);
  element.className += ' color_FFFFFF';
  let width = element.offsetWidth; //获取dom 宽度
  let height = element.offsetHeight; //获取dom 高度

  let canvas = document.createElement("canvas"); //创建一个canvas节点
  let scale = 5; //定义任意放大倍数 支持小数
  canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
  canvas.height = height * scale; //定义canvas高度 *缩放
  canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

  html2Canvas(element, {
    allowTaint: true,
    backgroundColor: 'white',
    canvas: canvas,
    dpi: 600
  }).then(function (canvas) {
    let context = canvas.getContext('2d');
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    let imgData = canvas.toDataURL('image/jpeg','1.0');//转化成base64格式,可上网了解此格式
    let img = new Image();
    img.src = imgData;
    let doc = new JsPDF('', 'pt', 'a4');
    img.onload = function() {
      img.width = canvas.width/5;   //因为在上面放大了2倍，生成image之后要/2
      img.height = canvas.height/5;
      // img.style.transform="scale(5,5)";
      // console.log(imgData)

      var contentWidth = img.width;
      var contentHeight = img.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 595.28 * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 595.28 / contentWidth * contentHeight;

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      var page = leftHeight/pageHeight
      var minus = (leftHeight%pageHeight)/page
      if (leftHeight < pageHeight) {
        doc.addImage(imgData, 'jpeg', 0, 0, imgWidth, imgHeight);
      } else {
        while (leftHeight > 0) {
          doc.addImage(imgData, 'jpeg', 0, position, imgWidth, imgHeight)
          leftHeight -= (pageHeight+minus);
          position -= 841.49;
          //避免添加空白页
          if (leftHeight > minus) {
            doc.addPage();
          }
        }
      }

      let name = 'report_pdf_' + new Date().getTime() + '.pdf'
    //   doc.save(name); //保存为pdf文件
      callback(doc, name)
    }
  })
}
