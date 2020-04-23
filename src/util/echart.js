import { func } from '../utils';
//let arr = [] // 用来存放最近七天的时间
//let arrs = []; // 用来存放一个月的时间
function calc(n) {
  let arr = [];
  for (let i = 0; i > -n; i--) {
    arr.push(func.getBeforeDate(i));
  }
  return arr.reverse();
}
function RandomNumBoth(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function generator(n, min = 10, max = 10000) {
  let data = [];
  for (let i = 0; i < n; i++) {
    data.push(RandomNumBoth(min, max));
  }
  return data;
}

var itemStyle = {
  normal: {
  },
  emphasis: {
    barBorderWidth: 1,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: 'rgba(0,0,0,0.5)'
  }
};
let _arr = calc(7);

let data = [
  {
    name: 'supplyDiagram',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['供应产能', '接单量'],
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      align: 'left',
      left: 10
    },
    xAxis: {
      data: _arr, // x轴显示数据
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      name: '（万平方米）',
      inverse: false,
      axisLine: {
        show: false
      }
    },
    grid: {
      left: 40 // y轴显示不全 缩进增大
    },
    series: [
      {
        name: '供应产能',
        type: 'bar',
        stack: 'two',
        barWidth: 30,
        itemStyle: itemStyle,
        data: generator(7, 200)
      },
      {
        name: '接单量',
        type: 'bar',
        stack: 'two',
        barWidth: 30,
        itemStyle: itemStyle,
        data: generator(7, 500)
      }
    ]
  }, {
    name: 'customerAreaMap',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['客户总数', '日活数量', '新增客户'],
      icon: 'rect', // 设置为矩形
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      left: 'left',
      textStyle: {
        color: ['#80DAFF', '#8CABFF', '#7EFF8E'],
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      data: _arr, // x轴显示数据
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: '（家）',
      left: 'left',
      axisLine: { // y轴
        show: false,
        lineStyle: {
          color: '#fff'
        }
      }
    },
    color: ['#80F4FF', '#8CABFF', '#7EFF8E '],
    series: [
      {
        // smooth: true,
        name: '客户总数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'circle',
        data: generator(7, 2200),
        lineStyle: {
          normal: {
            color: '#80F4FF',
            width: 3
          }
        }
      },
      {
        // smooth: true,
        name: '日活数量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'circle',
        data: generator(7, 1000),
        lineStyle: {
          normal: {
            color: '#8CABFF',
            width: 3
          }
        }
      },
      {
        // smooth: true,
        name: '新增客户',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'circle',
        data: generator(7, 1200),
        lineStyle: {
          normal: {
            color: '#7EFF8E',
            width: 3
          }
        }
      }
    ]
  }, {
    name: 'timePhasedWarning',
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['今日', '昨日'],
      left: 'left',
      icon: 'rect',
      itemWidth: 10, // 图例的宽度
      itemHeight: 10 // 图例的高度
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      data: _arr // x轴显示数据
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '今日',
        type: 'line',
        symbol: 'none',
        data: generator(7, 100)
      },
      {
        name: '昨日',
        type: 'line',
        symbol: 'none',
        data: generator(7, 200)
      }
    ]
  }, {
    name: 'productMap',
    isDouble: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#283b56'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['单品接单量', '产品均价'],
      icon: 'rect', // 设置为矩形
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      left: 'left',
      textStyle: {
        color: ['#80DAFF', '#8CABFF'],
      }
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: _arr,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '面积（万平方米）',
        nameRotate: 0,
        axisLine: { // y轴
          show: false,
          lineStyle: {
            color: '#fff'
          }
        }
      },
      {
        type: 'value',
        name: '均价（元/平方米）',
        nameRotate: 0,
        axisLine: { // y轴
          show: false,
          lineStyle: {
            color: '#fff'
          }
        }
      }
    ],
    series: [
      {
        name: '单品接单量',
        type: 'line',
        yAxisIndex: 0,
        data: [],
        symbol: 'none',
        itemStyle: {
          normal: {
            width: '3',
            color: '#8CABFF'
          }
        },
      },
      {
        name: '产品均价',
        type: 'bar',
        yAxisIndex: 1,
        data: [],
        symbol: 'none',
        barWidth: "32",
        itemStyle: {
          normal: {
            color: '#80F4FF'
          }
        },
      }
    ]
  }, {
    name: 'itemVolume',
    isDouble: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        // 竖线样式改成虚线
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['接单量', '交易量'],
      top: 0,
      left: 'left',
      icon: 'rect', // 设置为矩形
      itemWidth: 10, // 图例的宽度
      itemHeight: 10 // 图例的高度
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: _arr,
        axisTick: {
          alignWithLabel: true
        }
      },
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '面积（万平方米）',
        nameLocation: 'end',
        nameRotate: 0,
        axisLine: { // y轴
          show: false
        },
        nameTextStyle: {
          color: '#476791',
          left: '0%'
        },
      },
      {
        type: 'value',
        name: '金额（万元）',
        nameLocation: 'end',
        nameRotate: 0,
        axisLine: { // y轴
          show: false
        },
        nameTextStyle: {
          color: '#476791',
          left: '0%'
        },
      }
    ],
    series: [
      {
        name: '接单量',
        type: 'line',
        symbol: 'none',
        yAxisIndex: 0,
        data: []
      },
      {
        name: '交易量',
        type: 'line',
        symbol: 'none',
        yAxisIndex: 1,
        data: []
      }
    ]
  }, {
    name: 'clientTrends',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['客户总数', '日活数量', '新增客户', '新增客户留存数'],
      icon: 'rect', // 设置为矩形
      itemWidth: 15, // 图例的宽度
      itemHeight: 15, // 图例的高度
      left: '2%',
      textStyle: {
        color: ['#80F4FF', '#8CABFF', '#7EFF8E', '#2A9BA6'],
      }
    },
    color: ['#80F4FF', '#8CABFF', '#7EFF8E', '#2A9BA6'],
    grid: {
      left: '2%',
      right: '4%',
      bottom: '40px',
      containLabel: true
    },
    dataZoom: {
      height: '8px',
      backgroundColor: '#476791',
      type: 'slider',
      zoomLock: true,
      show: true,
      labelFormatter: () => {
        return '';
      },
      bottom: 40,
      realtime: true,
      start: 0,
      filterMode: 'none',
      end: 8,
      throttle: 500,
      dataBackground: {
        lineStyle: {
          opacity: 0
        },
        areaStyle: {
          opacity: 0
        }
      },
      xAxisIndex: [0]
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: calc(90),
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#fff' //更改坐标轴颜色
        }
      },
      offset: 30
    },
    yAxis: {
      type: 'value',
      color: '#476791',
      name: '客户（家）',
      axisLine: { // y轴
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: '#476791',
        left: '0%'
      },
      lineStyle: {
        color: '#476791'
      }
    },
    series: [
      {
        // smooth: true,
        name: '客户总数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: generator(90, 550),
        lineStyle: {
          normal: {
            color: '#0000ff',
            width: 1
          }
        }
      },
      {
        // smooth: true,
        name: '日活数量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: generator(90, 250),
        lineStyle: {
          normal: {
            color: '#ecff00',
            width: 1
          }
        }
      },
      {
        // smooth: true,
        name: '新增客户',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: generator(90, 90),
        lineStyle: {
          normal: {
            color: '#FF4613',
            width: 1
          }
        }
      },
      {
        // smooth: true,
        name: '新增客户留存数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: generator(90, 200),
        lineStyle: {
          normal: {
            color: '#2A9BA6',
            width: 1
          }
        }
      }
    ]
  }, {
    name: 'prAnalysis',
    isDouble: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['产品接单量', '产品单价'],
      left: 'left',
      icon: 'rect',
      itemWidth: 15,
      itemHeight: 15,
      textStyle: {//图例文字的样式
        color: ['#9AF7FD', '#FFCB5D'],
      }
    },
    color: ['#9AF7FD', '#FFCB5D'],
    grid: {
      left: '5%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      data: _arr,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '销售量（平方米）',
        // nameGap: 35, // name距离坐标轴的位置
        nameRotate: 0,
        axisLine: { // y轴
          show: false
        },
        splitLine: { // 去掉背景水平网格线
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          }
        },
      },
      {
        type: 'value',
        name: '价格（元）',
        nameRotate: 0,
        axisLine: { // y轴
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          }
        },
      }
    ],
    series: [
      {
        name: '产品接单量',
        type: 'line',
        symbol: 'circle',
        yAxisIndex: 0,
        data: [],
        lineStyle: {
          normal: {
            color: '#9af7fd',
            width: 1
          }
        }
      },
      {
        name: '产品单价',
        type: 'line',
        symbol: 'circle',
        yAxisIndex: 1,
        data: [],
        lineStyle: {
          normal: {
            color: '#ffcb5d',
            width: 1
          }
        }
      }
    ]
  }, {
    name: 'saleAnalysis',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    legend: {
      data: ['接单量', '交易额'],
      left: 'left',
      icon: 'rect',
      itemWidth: 10, // 图例的宽度
      itemHeight: 10, // 图例的高度
      textStyle: {
        color: ['#80DAFF', '#FFD67E']
      }
    },
    grid: {
      left: '10%',
    },
    xAxis: {
      data: calc(7), // x轴显示数据
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '接单量（平方米）',
        nameLocation: 'end',
        nameRotate: 0,
        axisLine: { // y轴
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        lineStyle: {
          color: '#476791'
        }
      },
      {
        type: 'value',
        name: '交易额（万元）',
        nameLocation: 'end',
        nameRotate: 0,
        axisLine: { // y轴
          show: false,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        lineStyle: {
          color: '#476791'
        }
      }
    ],
    series: [
      {
        name: '接单量',
        type: 'line',
        data: [],
        symbol: 'circle'
      },
      {
        name: '交易额',
        type: 'line',
        yAxisIndex: 1,
        data: [],
        symbol: 'circle'
      }
    ],
    color: ['#9af7fd', '#ffd67e']
  }
];
export default data;
