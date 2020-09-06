/**
 * @author: YuPeng Zhang
 * @date: 2020/09/06
 * @Description: 前端图片压缩
 */

const btn = document.querySelector('#submit'),
      file = document.querySelector('#file'),
      beforeImg = document.querySelector('#beforeImg'),
      afterImg = document.querySelector('#afterImg');

const fileReader = new FileReader();

const imgToCanvas = () => {
  /* 等比缩放为宽 300px 大小 */
  const width = 300;
  const height = 300 / beforeImg.width * beforeImg.height;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  context.clearRect(0, 0, width, height);
  /*
  * drewImage 方法将图片绘制成Canvas
  * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
  * */
  context.drawImage(beforeImg,0, 0, width, height);
  /* toDataUrl将其转换成base64数据 （toBlob可以将其转换 成blob对象)*/
  afterImg.src = canvas.toDataURL();
  afterImg.style.display = 'inline-block';
}

btn.addEventListener('click', function () {
  const { files } = file;
  fileReader.readAsDataURL(files[0]);
})

fileReader.addEventListener('load', function () {
  beforeImg.src = fileReader.result;
  beforeImg.style.display = 'inline-block';
})

beforeImg.addEventListener('load', imgToCanvas)


