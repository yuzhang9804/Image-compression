/**
 * @author: YuPeng Zhang
 * @date: 2020/09/06
 * @Description: 前端图片压缩
 */

const getDom = (id) => document.querySelector(`#${id}`);

const submit = getDom('submit');
const file = getDom('file');
const beforeImg = getDom('beforeImg');
const afterImg = getDom('afterImg');
const select = getDom('select-file');
const fileName = getDom('file-name');

const fileReader = new FileReader();

const imgToCanvas = () => {
  const width = getDom('width').value || 300;
  const height = getDom('height').value || (width * (beforeImg.height / beforeImg.width));
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

submit.addEventListener('click', function () {
  const { files } = file;
  fileReader.readAsDataURL(files[0]);
})

fileReader.addEventListener('load', function () {
  beforeImg.src = fileReader.result;
  beforeImg.style.display = 'inline-block';
})

beforeImg.addEventListener('load', imgToCanvas);

select.addEventListener('click', () => {
  file.click();
})

file.addEventListener('change',  () => {
  fileName.value = file.files[0].name;
})


