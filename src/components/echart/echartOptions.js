let option = [
  {
    name: 'supplyDiagram',
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
      data: ['供应产能', '接单量'],
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      align: 'left',
      left: 22,
      textStyle: {
        color: ['#80daff', '#ffcb5d'],
      }
    },
    xAxis: {
      data: [],
      axisTick: {
        show: false,
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
    },
    yAxis: {
      name: '（万平方米）',
      inverse: false,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      nameTextStyle: {
        color: '#476791'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    series: [
      {
        name: '供应产能',
        type: 'bar',
        stack: 'one',
        barWidth: 30,
        itemStyle: {
          normal: {
            color: "#F4FF3C",
            emphasis: {
              barBorderWidth: 1,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          },
        },
        data: []
      },
      {
        name: '接单量',
        type: 'bar',
        stack: 'one',
        barWidth: 30,
        itemStyle: {
          normal: {
            color: "#3CEAFF",
            emphasis: {
              barBorderWidth: 1,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0,0,0,0.5)'
            }
          },
        },
        data: []
      }
    ]
  }, {
    name: 'clientAnalysis',
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
      left: 20,
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
      data: [],
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
      nameRotate: -0.1,
      left: 'left',
      axisLine: { // y轴
        show: false,
        lineStyle: {
          color: '#fff'
        }
      },
      nameTextStyle: {
        color: '#476791'
      }
    },
    color: ['#80F4FF', '#8CABFF', '#7EFF8E '],
    series: [
      {
        name: '客户总数',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        symbol: 'circle',
        data: [],
        lineStyle: {
          normal: {
            color: '#80F4FF',
            width: 1
          }
        }
      },
      {
        name: '日活数量',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        symbol: 'circle',
        data: [],
        lineStyle: {
          normal: {
            color: '#8CABFF',
            width: 1
          }
        }
      },
      {
        name: '新增客户',
        type: 'line',
        stack: 'one',
        areaStyle: {},
        symbol: 'circle',
        data: [],
        lineStyle: {
          normal: {
            color: '#7EFF8E',
            width: 1
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
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      left: 22,
      top: 10,
      textStyle: {
        color: ['#80F5FF', '#FFD67E'],
      }
    },
    color: ['#80F5FF', '#FFD67E'],
    grid: {
      left: '0',
      right: '1%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: [], // x轴显示数据
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '（万平方米）',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      },
      nameTextStyle: {
        color: '#476791'
      }
    },
    series: [
      {
        name: '今日',
        type: 'line',
        symbol: 'circle',
        data: []
      },
      {
        name: '昨日',
        type: 'line',
        symbol: 'circle',
        data: []
      },
      {
        name: '峰值',
        type: 'line',
        symbol: 'circle',
        data: []
      },
      {
        name: '平均',
        type: 'line',
        symbol: 'circle',
        data: []
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
      left: 20,
      textStyle: {
        color: ['#80DAFF', '#8CABFF'],
      }
    },
    grid: {
      left: '6%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: [],
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
        },
        nameTextStyle: {
          color: '#476791'
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
        },
        nameTextStyle: {
          color: '#476791'
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
      end: 30,
      filterMode: 'none',
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
      data: [],
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
        name: '客户总数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: [],
        lineStyle: {
          normal: {
            color: '#0000ff',
            width: 1
          }
        }
      },
      {
        name: '日活数量',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: [],
        lineStyle: {
          normal: {
            color: '#ecff00',
            width: 1
          }
        }
      },
      {
        name: '新增客户',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: [],
        lineStyle: {
          normal: {
            color: '#FF4613',
            width: 1
          }
        }
      },
      {

        name: '新增客户留存数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        symbol: 'none',
        data: [],
        lineStyle: {
          normal: {
            color: '#2A9BA6',
            width: 1
          }
        }
      }
    ]
  }, {
    name: 'salesAnalysis',
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
      left: 20,
      icon: 'rect',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: ['#80DAFF', '#FFD67E']
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      data: [],
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
        lineStyle: {
          color: '#476791'
        },
        nameTextStyle: {
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
        lineStyle: {
          color: '#476791'
        },
        nameTextStyle: {
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
    color: ['#9af7fd', '#ffd67e'],
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
      end: 30,
      filterMode: 'none',
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
  },
  {
    name: 'priceVolumn',
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
      left: '0',
      right: '0',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      data: [],
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
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          }
        },
        nameTextStyle: {
          color: '#476791'
        }
      },
      {
        type: 'value',
        name: '价格（元）',
        nameRotate: 0,
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#fff',
          }
        },
        nameTextStyle: {
          color: '#476791'
        }
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
  },
];
export default option;
