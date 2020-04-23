import { func } from '@/utils';

onmessage = function (evt) {
  // 工作线程收到主线程的消息
  //console.log(evt.data);
  const result = typeof evt.data.data === 'string' ? JSON.parse(evt.data.data) : evt.data.data;
  let read = new FileReader();
  read.readAsText(result);
  read.onload = function() {
    let option = JSON.parse(read.result);
    let y1 = option.dataset.source.map(v => v[option.series[0].encode.y]);
    let y2 = option.dataset.source.map(v => v[option.series[1].encode.y]);

    option.yAxis[0].max = func.calMax(y1);
    option.yAxis[1].max = func.calMax(y2);

    if (option.isStack) {
      option.yAxis[0].max = func.calMax(y1) * 1.6;
      option.yAxis[1].max = func.calMax(y2);
    }

    if (option.isY2) {
      if (func.toMin(y2) !== func.toMax(y2)) {
        option.yAxis[1].min = func.toMin(y2);
      }
      option.yAxis[0].max = func.calMax(y1);
      option.yAxis[1].max = func.toMax(y2);
    }

    for (let i in option.yAxis) {
      option.yAxis[i].interval = option.yAxis[i].max / 5;
      if (option.yAxis[i].min) {
        option.yAxis[i].interval = func.accDiv(func.accSub(option.yAxis[i].max, option.yAxis[i].min), 5);
      }
    }

    postMessage(option);
  };
};
