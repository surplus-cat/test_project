import imageConversion from 'image-conversion';

export function getBase64Image(img) {
  var canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL('image/png');
  return dataURL;
}

export function dataURLtoFile(dataurl, filename = 'image.png') {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type: mime});
}

export function blobToDataURI(blob) {
  return new Promise((resolve) => {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function (e) {
      resolve(e.target.result);
    };
  });
}

export function getFileByUrl(url, filename = 'image.png') {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      let dataURL = getBase64Image(img);
      let file = dataURLtoFile(dataURL, filename);
      resolve(file);
    };
  });
}

export function compressFile(file, multiple) {
  let size = file.size / 1000 * multiple;
  return imageConversion.compressAccurately(file, size).then(blobToDataURI).then(base64 => {
    return dataURLtoFile(base64);
  });
}

export function compressDataUrl(dataUrl, multiple) {
  let file = dataURLtoFile(dataUrl);
  let size = file.size / 1000 * multiple;
  return imageConversion.compressAccurately(file, size).then(blobToDataURI).then(base64 => {
    return dataURLtoFile(base64);
  });
}
