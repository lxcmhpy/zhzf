// import html2Canvas from 'html2canvas'
// import JsPDF from 'jspdf'

export function htmlExportPDF(id) {
  debugger
  let element = document.getElementById(id)
  let width = element.offsetWidth; //获取dom 宽度
  let height = element.offsetHeight; //获取dom 高度
  // let element = document.getElementById('a4-outDom');
  // element.style.display = 'none';
  // element.innerHTML = document.getElementById('pdfDom').outerHTML;
  let canvas = document.createElement("canvas"); //创建一个canvas节点
  let scale = 3; //定义任意放大倍数 支持小数
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
    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;

    let imgData = canvas.toDataURL('image/png','1.0');//转化成base64格式,可上网了解此格式
    let img = new Image();
    img.src = imgData;
    img.onload = function() {
      img.width = canvas.width/3;   //因为在上面放大了2倍，生成image之后要/2
      img.height = canvas.height/3;
      // img.style.transform="scale(0.1)";
      // console.log(imgData)

      /****分页******/
      let pageHeight = 841.89;//一页高度
      let leftHeight = height * 0.75;//未打印内容高度
      let position = 0;//页面偏移
      let imgWidth = 595.28;
        //var imgHeight = 841.89;
        let imgHeight =   592.28 /img.width *img.height;
        console.log("imgWidth="+imgWidth);
        console.log("imgHeight="+imgHeight);
        let doc = new JsPDF('', 'pt', 'a4');
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
          return doc
      }
  })
}
