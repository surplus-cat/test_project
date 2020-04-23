import { func } from '@/util';
import echarts from 'echarts';

let option = [
  {
    name: 'supplyDiagram',
    title: {
      text: '（万平方米）',
      left: 13,
      top: 32,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    legend: {
      data: ['供应产能', '接单量'],
      icon: 'rect',
      align: 'left',
      itemWidth: 14, // 图例的宽度
      itemHeight: 14, // 图例的高度
      left: 20,
      top: -10,
      textStyle: {
        color: ['#80DAFF', '#FFD67E'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[1]['marker']} 供应产能：${params[0]['value']["capacity"]}</p>
                      <p style="font-size: 14px;">${params[0]['marker']} 接单量：${params[0]['value']["saleArea"]}</p>`;
        return text;
      }
    },
    dataset: {
      dimensions: [
        'date', 'saleArea', 'capacity'
      ],
      source: []
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false,
        alignWithLabel: true,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: {
      nameGap: 33,
      nameRotate: 0,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    grid: {
      left: '25px',
      right: '25px',
      top: '85',
      bottom: '40',
      containLabel: true
    },
    series: [{
      type: 'bar',
      stack: 'one',
      encode: {
        x: 'date',
        y: 'saleArea'
      },
      barWidth: 30,
      itemStyle: {
        normal: {
          color: "#80DAFF",
          emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      },
      name: '接单量'
    },
    {
      type: 'bar',
      stack: 'one',
      encode: {
        x: 'date',
        y: 'capacity'
      },
      itemStyle: {
        normal: {
          color: "#FFD67E",
          emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      },
      name: '供应产能'
    }
    ]
  }, {
    name: 'clientAnalysis',
    title: {
      text: '（家）',
      left: 13,
      top: 40,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 客户总数：${params[0]['value']["custCnt"]} </p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[1]['marker']} 日活客户：${params[0]['value']["custActiveCnt"]} </p>
                      <p style="font-size: 14px;">${params[2]['marker']} 新增客户：${params[0]['value']["newCustCnt"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['客户总数', '日活客户', '新增客户'],
      icon: 'rect', // 设置为矩形
      itemWidth: 14, // 图例的宽度
      itemHeight: 14, // 图例的高度
      left: 20,
      top: -10,
      textStyle: {
        color: ['#80DAFF', '#8CABFF', '#7EFF8E'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'custCnt', 'custActiveCnt', 'newCustCnt'
      ],
      source: []
    },
    grid: {
      left: '25px',
      right: '25px',
      top: '100',
      bottom: '40',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      offset: 16
    },
    yAxis: {
      type: 'value',
      nameGap: 45,
      left: 'left',
      axisLine: { // y轴
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    color: ['#80F4FF', '#8CABFF', '#7EFF8E '],
    series: [{
      name: '客户总数',
      type: 'line',
      areaStyle: {
        color: 'rgba(128, 244, 255, 0.1)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'custCnt'
      },
      lineStyle: {
        normal: {
          color: '#80F4FF',
          width: 2
        }
      }
    },
    {
      name: '日活客户',
      type: 'line',
      areaStyle: {
        color: 'rgba(140, 171, 255, 0.2)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'custActiveCnt'
      },
      lineStyle: {
        normal: {
          color: '#8CABFF',
          width: 2
        }
      }
    },
    {
      name: '新增客户',
      type: 'line',
      areaStyle: {
        color: 'rgba(126, 255, 142, 0.5)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'newCustCnt'
      },
      lineStyle: {
        normal: {
          color: '#7EFF8E',
          width: 2
        }
      }
    }
    ]
  }, {
    name: 'timePhasedWarning',
    title: {
      text: '（万平方米）',
      left: 13,
      top: 55,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        if (Object.keys(params[0].data).length === 1) {
          return '';
        }
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name} 时</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 今日：${params[0]['value']["saleAreaAccum"]} </p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[1]['marker']} 昨日：${params[0]['value']["saleAreaAccumForYday"]}  </p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[2]['marker']} 峰值：${params[0]['value']["saleAreaAccumMax"]}  </p>
                      <p style="font-size: 14px;">${params[3]['marker']} 平均：${params[0]['value']["saleAreaAccumAvg"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['今日', '昨日', '峰值', '平均'],
      icon: 'rect',
      itemWidth: 14, // 图例的宽度
      itemHeight: 14, // 图例的高度
      left: 20,
      top: 15,
      textStyle: {
        color: ['#80F5FF', '#FFD67E', '#FF857E', '#2A9BA6'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    color: ['#80F5FF', '#FFD67E', '#FF857E', '#2A9BA6'],
    grid: {
      left: '25px',
      right: '25px',
      top: '100',
      bottom: '40',
      containLabel: true
    },
    dataset: {
      source: []
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: {
      type: 'value',
      nameGap: 27,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      splitNumber: 4,
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    series: [{
      name: '今日',
      type: 'line',
      symbol: 'none',
      encode: {
        x: 'hour',
        y: 'saleAreaAccum'
      },
      lineStyle: {
        color: 'rgba(128, 245, 255, 1)'
      }
    },
    {
      name: '昨日',
      type: 'line',
      symbol: 'none',
      encode: {
        x: 'hour',
        y: 'saleAreaAccumForYday'
      },
      lineStyle: {
        color: 'rgba(255, 203, 93, 0.25)'
      }
    },
    {
      name: '峰值',
      type: 'line',
      symbol: 'none',
      encode: {
        x: 'hour',
        y: 'saleAreaAccumMax'
      },
      lineStyle: {
        color: 'rgba(255, 133, 126, 0.25)'
      }
    },
    {
      name: '平均',
      type: 'line',
      symbol: 'none',
      encode: {
        x: 'hour',
        y: 'saleAreaAccumAvg'
      },
      lineStyle: {
        color: 'rgba(42, 155, 166, 0.25)'
      }
    }
    ]
  }, {
    name: 'productMap',
    title: [{
      text: '接单量（万平方米）',
      left: 18,
      top: 42,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    }, {
      subtext: '均价（元/平方米）',
      subtextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      right: 12,
      top: 32
    }],
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
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 单品接单量：${params[0]['value']["singlePdtSaleArea"]} </p>
                      <p style="font-size: 14px;">${params[1]['marker']} 产品均价：${params[0]['value']["pdtAvgPrice"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['单品接单量', '产品均价'],
      icon: 'rect', // 设置为矩形
      itemWidth: 14, // 图例的宽度
      itemHeight: 14, // 图例的高度
      left: 20,
      top: -10,
      textStyle: {
        color: ['#80DAFF', '#8CABFF'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'singlePdtSaleArea', 'pdtAvgPrice'
      ],
      source: []
    },
    grid: {
      left: '25px',
      right: '25px',
      top: '100',
      bottom: '40',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: [{
      type: 'value',
      offset: 0,
      nameRotate: 0,
      nameGap: 40,
      axisLine: { // y轴
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    {
      type: 'value',
      nameRotate: 0,
      nameGap: 40,
      axisLine: { // y轴
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    }
    ],
    series: [{
      name: '单品接单量',
      type: 'bar',
      yAxisIndex: 0,
      symbol: 'circle',
      barWidth: "32",
      itemStyle: {
        normal: {
          color: '#80F4FF'
        }
      },
      encode: {
        x: 'date',
        y: 'singlePdtSaleArea'
      }
    },
    {
      name: '产品均价',
      type: 'line',
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          width: '3',
          color: '#8CABFF'
        }
      },
      encode: {
        x: 'date',
        y: 'pdtAvgPrice'
      }
    }
    ]
  }, {
    name: 'clientTrends',
    title: {
      text: '客户（家）',
      left: 18,
      top: 41,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 客户总数：${params[0]['value']["custCnt"]} </p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[1]['marker']} 日活客户：${params[0]['value']["custActiveCnt"]}  </p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[2]['marker']} 新增客户：${params[0]['value']["newCustCnt"]}  </p>
                      <p style="font-size: 14px;">${params[3]['marker']} 新增客户留存数：${params[0]['value']["newCustRemainCnt"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['客户总数', '日活客户', '新增客户', '新增客户留存数'],
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 14,
      left: 18,
      top: -10,
      textStyle: {
        color: ['#80F4FF', '#8CABFF', '#7EFF8E', '#2A9BA6'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'custCnt', 'custActiveCnt', 'newCustCnt', 'newCustRemainCnt'
      ],
      source: []
    },
    color: ['#80F4FF', '#8CABFF', '#7EFF8E', '#2A9BA6'],
    grid: {
      left: '22',
      right: '25',
      top: '100',
      bottom: '60',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        },
        interval: 3
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE' // 更改坐标轴颜色
        }
      },
      offset: 30
    },
    yAxis: {
      type: 'value',
      color: 'rgba(225, 245, 254, 0.2)',
      nameGap: 40,
      axisLine: { // y轴
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    series: [{
      name: '客户总数',
      type: 'line',
      areaStyle: {
        color: 'rgba(128, 244, 255, 0.2)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'custCnt'
      },
      lineStyle: {
        width: 2,
        normal: {}
      }
    },
    {
      name: '日活客户',
      type: 'line',
      areaStyle: {
        color: 'rgba(140, 171, 255, 0.2)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'custActiveCnt'
      },
      lineStyle: {
        width: 2,
        normal: {
          // color: '#ecff00',
          // width: 1
        }
      }
    },
    {
      name: '新增客户',
      type: 'line',
      areaStyle: {
        color: 'rgba(126, 255, 142, 0.2)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'newCustCnt'
      },
      lineStyle: {
        width: 2,
        normal: {
          // color: '#FF4613',
          // width: 1
        }
      }
    },
    {
      name: '新增客户留存数',
      type: 'line',
      areaStyle: {
        color: 'rgba(42, 155, 166, 0.2)'
      },
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'newCustRemainCnt'
      },
      lineStyle: {
        width: 2,
        normal: {}
      }
    }
    ]
  }, {
    name: 'salesAnalysis',
    title: [{
      text: '接单量（万平方米）',
      left: 20,
      top: 42,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    }, {
      subtext: '交易额（万元）',
      subtextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      right: 0,
      top: 32
    }],
    isDouble: true,
    isStack: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 接单量：${params[0]['value']["saleArea"]} </p>
                      <p style="font-size: 14px;">${params[1]['marker']} 交易额：${params[0]['value']["saleAmount"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['接单量', '交易额'],
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 14,
      left: 22,
      top: -10,
      textStyle: {
        color: ['#80DAFF', '#FFD67E'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'saleAmount', 'saleArea'
      ],
      source: []
    },
    grid: {
      left: '35px',
      right: '25px',
      top: '100',
      bottom: '40',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        },
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: [{
      type: 'value',
      nameLocation: 'end',
      nameGap: 40,
      offset: 10,
      nameRotate: 0,
      axisLine: { // y轴
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        padding: [0, 0, 0, 54]
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    {
      type: 'value',
      nameLocation: 'end',
      nameGap: 40,
      offset: 10,
      nameRotate: 0,
      axisLine: { // y轴
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    }
    ],
    series: [{
      name: '接单量',
      type: 'line',
      symbol: 'circle',
      yAxisIndex: 0,
      encode: {
        x: 'date',
        y: 'saleArea'
      }
    },
    {
      name: '交易额',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'saleAmount'
      }
    }
    ],
    color: ['#9af7fd', '#ffd67e']
  },
  {
    name: 'saleDetails',
    title: [{
      text: '接单量（平方米）',
      left: 25,
      top: 50,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    }, {
      subtext: '交易额（元）',
      subtextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      right: 15,
      top: 50
    }],
    isDouble: true,
    isStack: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 接单量：${params[0]['value']["saleArea"]} </p>
                      <p style="font-size: 14px;">${params[1]['marker']} 交易额：${params[0]['value']["saleAmount"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['接单量', '交易额'],
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 14,
      left: 25,
      top: 10,
      textStyle: {
        color: ['#80DAFF', '#FFD67E'],
        padding: [0, 5],
        lineHeight: 28,
        fontSize: 14,
        verticalAlign: 'middle',
        itemGap: 10
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'saleAmount', 'saleArea'
      ],
      source: []
    },
    grid: {
      left: '40',
      right: '40',
      top: '100',
      bottom: '100',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 30
    },
    yAxis: [{
      type: 'value',
      nameLocation: 'end',
      nameGap: 30,
      offset: 10,
      nameRotate: 0,
      axisLine: { // y轴
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    {
      type: 'value',
      nameLocation: 'end',
      nameGap: 30,
      offset: 10,
      nameRotate: 0,
      axisLine: { // y轴
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    }
    ],
    series: [{
      name: '接单量',
      type: 'line',
      symbol: 'circle',
      yAxisIndex: 0,
      encode: {
        x: 'date',
        y: 'saleArea'
      }
    },
    {
      name: '交易额',
      type: 'line',
      yAxisIndex: 1,
      symbol: 'circle',
      encode: {
        x: 'date',
        y: 'saleAmount'
      }
    }
    ],
    color: ['#9af7fd', '#ffd67e']
  },
  {
    name: 'priceVolumn',
    title: [{
      text: '接单量（平方米）',
      left: 25,
      top: 47,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    }, {
      subtext: '单价（元/平方米）',
      subtextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      right: 10,
      top: 47
    }],
    isDouble: true,
    isY2: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      formatter: function (params) {
        let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
                      <p style="margin-bottom: 10px; font-size: 14px;">${params[0]['marker']} 产品接单量：${params[0]['value']["saleArea"]} </p>
                      <p style="font-size: 14px;">${params[params.length - 1]['marker']} 产品单价：${params[0]['value']["unitPrice"]} </p>`;
        return text;
      }
    },
    legend: {
      data: ['产品接单量', '产品单价'],
      left: 25,
      icon: 'rect',
      itemWidth: 15,
      itemHeight: 15,
      textStyle: { // 图例文字的样式
        color: ['#9AF7FD', '#FFCB5D'],
        padding: [0, 10]
      },
      itemGap: 30,
      selectedMode: false
    },
    dataset: {
      dimensions: [
        'date', 'saleArea', 'unitPrice'
      ],
      source: []
    },

    grid: {
      left: '25px',
      right: '25px',
      top: '100',
      bottom: '60',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 25
    },
    yAxis: [{
      type: 'value',
      nameGap: 35,
      nameRotate: 0,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    {
      type: 'value',
      nameGap: 35,
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#E1F5FE'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    }
    ],
    series: [{
      name: '产品接单量',
      type: 'line',
      symbol: 'circle',
      yAxisIndex: 0,
      lineStyle: {
        normal: {
          color: '#9af7fd',
          width: 2
        }
      },
      encode: {
        x: 'date',
        y: 'saleArea'
      }
    },
    {
      name: '产品单价',
      type: 'line',
      symbol: 'circle',
      yAxisIndex: 1,
      lineStyle: {
        normal: {
          color: '#ffcb5d',
          width: 2
        }
      },
      encode: {
        x: 'date',
        y: 'unitPrice'
      }
    }
    ],
    color: ['#9AF7FD', '#FFCB5D']
  },
  {
    name: 'customData',
    title: {
      text: '接单量（平方米）',
      left: 20,
      top: -2,
      textStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)'
      // formatter: function (params) {
      //   let text = `<p style="margin-bottom: 20px; font-size: 19px;">${params[0].name}</p>
      //               <p style="font-size: 14px;">${params[0]['marker']} 接单量：${params[0]['value']["saleArea"]}</p>`;
      //   return text;
      // },
    },
    dataset: {
      dimensions: [
        'customerName', 'customerArea'
      ],
      source: []
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        formatter: function (value) {
          var str = "";
          var num = 5; // 每行显示字数
          var valLength = value.length; // 该项x轴字数
          var rowNum = Math.ceil(valLength / num); // 行数
          if (rowNum > 1) {
            for (var i = 0; i < rowNum; i++) {
              var temp = "";
              var start = i * num;
              var end = start + num;

              if (i === rowNum - 1) {
                temp = value.substring(start, end);
              } else {
                temp = value.substring(start, end) + "\n\n";
              }
              console.log(temp);
              str += temp;
            }
            return str;
          } else {
            return value;
          }
        }
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: {
      nameGap: 33,
      nameRotate: 0,
      axisLine: {
        show: false,
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      axisLabel: {
        textStyle: {
          fontFamily: 'Arial'
        }
      },
      axisTick: {
        show: false
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    },
    grid: {
      left: '25px',
      right: '25px',
      top: '40',
      bottom: '40',
      containLabel: true
    },
    series: [{
      type: 'bar',
      stack: 'one',
      encode: {
        x: 'customerName',
        y: 'customerArea'
      },
      barWidth: 30,
      itemStyle: {
        normal: {
          color: "#80DAFF",
          emphasis: {
            barBorderWidth: 1,
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowColor: 'rgba(0,0,0,0.5)'
          }
        }
      },
      name: '接单量'
    }]
  }, {
    name: 'areaData',
    tooltip: {
      show: false
    },
    grid: {
      left: '24',
      right: '0',
      top: '20',
      bottom: '0',
      x: 0,
      y: 0,
      containLabel: false,
      show: false // 查看边界
    },
    xAxis: {
      show: false,
      type: 'value'
    },
    dataset: {
      dimensions: [
        'name', 'maxVal', 'productArea', 'customerArea', 'productValues'
      ],
      source: []
    },
    yAxis: [{
      type: 'category',
      axisTick: 'none',
      axisLine: 'none',
      axisLabel: {
        verticalAlign: 'bottom',
        align: 'left',
        padding: [0, 8, 15, 10],
        textStyle: {
          color: '#80F5FF',
          fontSize: 14
        }
      },
      interval: 1
    }, {
      type: 'category',
      axisTick: 'none',
      axisLine: 'none',
      axisLabel: {
        show: true,
        verticalAlign: 'bottom',
        align: 'right',
        padding: [0, 8, 15, 0],
        textStyle: {
          color: '#fff',
          fontSize: '16'
        },
        // formatter: '{y|{value}} {x|m2}',
        formatter: function (value) {
          let originValue = value.slice(0, -8);
          // console.log(originValue);
          return `{y| ${func.format(originValue)}} {x|m²}`;
        },
        rich: {
          y: {
            color: '#80F5FF',
            fontFamily: 'Arial',
            fontSize: 18
          },
          x: {
            width: 25,
            fontSize: 14,
            color: 'rgba(128,245,255, 0.5)'
          }
        }
      },
      interval: 1
    }],
    series: [{
      name: '值',
      type: 'bar',
      // barCategoryGap: '30%',
      encode: {
        x: 'customerArea',
        y: 'name'
      },
      label: {
        normal: {
          show: false,
          position: 'right',
          verticalAlign: 'bottom',
          // offset: [0, -10],
          color: 'rgba(128,245,255,1)',
          fontSize: 14,
          fontFamily: 'NotoSansHans-Regular',
          formatter: '{c}%'
        }
      },
      barWidth: 6,
      itemStyle: {
        normal: {
          color: 'rgba(128,245,255,1)',
          barBorderRadius: 5
        }
      },
      z: 2
    }, {
      name: '外框',
      type: 'bar',
      barGap: '-100%',
      // barCategoryGap: '30%',
      encode: {
        x: 'maxVal',
        y: 'productValues'
      },
      barWidth: 6,
      yAxisIndex: 1,
      label: {
        normal: {
          show: false,
          position: 'right',
          verticalAlign: 'bottom',
          // offset: [0, -30],
          color: 'rgba(128,245,255,1)',
          fontSize: 14,
          fontFamily: 'NotoSansHans-Regular'
          // formatter: '{c}%'
        }
      },
      itemStyle: {
        normal: {
          color: 'rgba(17,101,255, .2)',
          opacity: 1,
          barBorderRadius: 5
        }
      },
      z: 0
    }]
  },
  {
    name: 'customInfo',
    tooltip: {
      show: false
    },
    grid: {
      left: '-50',
      top: '10'
    },
    dataset: {
      // dimension: ['regionName', 'waitPayArea', 'percentage'],
      source: []
    },
    legend: {
      orient: 'vertical',
      top: 'center',
      right: '20',
      icon: 'circle',
      itemGap: 12,
      textStyle: {
        padding: [0, -5], // 控制图例和文字的距离
        fontWeight: 'normal',
        fontFamily: '宋体',
        rich: {
          a: {
            width: 140,
            color: "#E1F5FE",
            align: 'left',
            fontSize: 14,
            left: -5
          },
          b: {
            width: 20,
            color: 'rgba(225,245,254, 0.39)',
            fontFamily: 'Arial',
            align: 'right',
            fontSize: 14
          }
        }
      },
      formatter: function (regionName) {
        let index = 0;
        let optionName = "customInfo";
        let options = option.filter(v => {
          return v.name === optionName;
        })[0];
        let data = options.dataset.source;
        data.forEach(function (v, i) {
          if (v.regionName === regionName) {
            index = i;
          }
        });
        return [`{a| ${data[index].regionName}}`, `{b| ${data[index].percentage}% }`].join('');
      }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '80%'],
      center: ['25%', '50%'],
      labelLine: {
        normal: {
          show: false
        }
      },
      color: ["#24FFB5", "#1AC5FF", "#055EFD ", "#14458C", "#FEC421", "#fff"],
      label: {
        normal: {
          show: false,
          textStyle: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14
          }
        }
      },
      encode: {
        itemName: "regionName",
        value: "percentage"
      }
    }]
  },
  // 近七天GMV
  {
    name: 'weekGMV',
    animation: true,
    title: [{
      text: 'GMV（万元）',
      left: 36,
      top: 0,
      textStyle: {
        color: '#909399',
        fontSize: 14,
        fontWeight: 'normal'
      }
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        lineStyle: {
          type: 'dashed'
        }
      },
      textStyle: {
        rich: {
          a: {
            color: '#fff',
            fontSize: 18,
            padding: 5
          },
          b: {
            color: '#80f5ff',
            fontSize: 12
          }
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      // 色值 不需要带''
      formatter: function (params) {
        let content = `<div>
                          <div style="margin-bottom: 5px; font-size: 20px; color: #fff;">￥<span style="font-family: ding">${params[0]['value']['originAmount']}</span></div>
                          <p style="color: #80f5ff; font-size: 14px; ">环比昨日：${params[0]['value']["relativeRatio"]}</p>
                        </div>`;
        return content;
      }

    },
    dataset: {
      dimensions: [
        'date', 'saleAmount', 'relativeRatio'
      ],
      source: []
    },
    grid: {
      left: 50,
      right: 40,
      top: 40,
      bottom: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12
          // fontFamily: 'Arail'
        },
        interval: 0
      },
      axisLine: {
        lineStyle: {
          color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: [{
      // name: 'y1',
      type: 'value',
      nameLocation: 'end',
      nameGap: 40,
      offset: 10,
      nameRotate: 0,
      axisLine: {
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#909399',
          fontSize: 14
          // fontFamily: 'Arail'
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        padding: [0, 0, 0, 54]
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225,245,254, 0.2)'
        }
      }
    }],
    series: [{
      name: '接单量',
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      itemStyle: {
        normal: {
          color: "#80F5FF",
          lineStyle: {
            width: 2,
            color: '#80F5FF',
            type: 'solid' // 'dotted'虚线 'solid'实线
          }
        }
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ // 关键在这里, 设置面积渐变
          offset: 0,
          color: '#03fecd'// 这里是我设置的渐变的颜色从线条颜色变为白色，如果是循环数据，其中的0依次循环colorArr 就ok了
        }, {
          offset: 1,
          color: 'rgba(0, 139, 255, 0)'
        }])
      },
      encode: {
        x: 'date',
        y: 'saleAmount'
      }
    }]
  },
  {
    name: "customTotal",
    tooltip: {
      show: false
    },
    grid: {
      left: '40',
      right: '0',
      top: '20',
      bottom: '0',
      x: 0,
      y: 0,
      containLabel: false,
      show: false // 查看边界
    },
    xAxis: {
      show: false,
      type: 'value'
    },
    dataset: {
      dimensions: [
        'name', 'total', 'customerAmount', 'customerArea', 'per'
      ],
      source: []
    },
    yAxis: [{
      type: "category",
      axisTick: "none",
      axisLine: "none",
      num: 0,
      axisLabel: {
        verticalAlign: "bottom",
        align: "left",
        padding: [-6, 8, 15, 10],
        textStyle: {
          color: "#fff",
          fontSize: 15
        }
      }
    }, {
      type: "category",
      axisTick: "none",
      axisLine: "none",
      num: 1,
      axisLabel: {
        show: true,
        verticalAlign: "bottom",
        align: "left",
        padding: [0, 8, 15, 0],
        textStyle: {
          color: "#fff",
          fontSize: "16",
          align: 'left'
        },
        formatter: '{x|{value}}',
        rich: {
          x: {
            width: 110,
            align: "right",
            fontSize: 16,
            color: "#C8F8FD",
            fontFamily: 'ding'
          }
        }
      }
    }, {
      num: 2,
      type: "category",
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        show: true,
        verticalAlign: "top",
        align: "left",
        padding: [-8, 8, 15, 0],
        formatter: '{x|{value}}',
        rich: {
          "x": {
            width: 110,
            align: "right",
            fontSize: 16,
            color: "#909399"
            // fontFamily: 'ding',
          }
        }
      }
    }],
    series: [{
      num: 0,
      name: "值",
      type: "bar",
      encode: {
        x: "per",
        y: "name"
      },
      barWidth: 6,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#2A84CF'
          }, {
            offset: 1,
            color: '#03FECD'
          }]),
          barBorderRadius: 5
        }
      },
      "z": 3
    }, {
      num: 1,
      name: "外框1",
      type: "bar",
      barGap: "-100%",
      encode: {
        x: "total",
        y: "customerAmount"
      },
      barWidth: 6,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: "rgba(255,255,255, 0.07)",
          barBorderRadius: 5
        }
      },
      "z": 2
    }, {
      num: 2,
      name: "外框",
      type: "bar",
      barGap: "-100%",
      encode: {
        x: "total",
        y: "customerArea"
      },
      barWidth: 6,
      yAxisIndex: 2,
      itemStyle: {
        normal: {
          color: "rgba(255,255,255, 0.07)",
          opacity: 1,
          barBorderRadius: 5
        }
      },
      "z": 1
    }]
  },
  {
    name: 'onlineProvider',
    tooltip: {
      show: false
    },
    grid: {
      left: '-50',
      top: '10'
    },
    dataset: {
      source: []
    },
    legend: {
      orient: 'horizontal',
      right: 'center',
      bottom: '10%',
      icon: 'circle',
      itemGap: 20,
      textStyle: {
        padding: [0, -5], // 控制图例和文字的距离
        fontWeight: 'normal',
        fontFamily: '宋体',
        rich: {
          a: {
            width: 170,
            color: "#fff",
            align: 'left',
            fontSize: 14,
            left: -5
          }
        }
      },
      formatter: function (name) {
        return (name.length > 9 ? `{a| ${name.slice(0, 9)}...}` : `{a| ${name}}`);
      }
      // formatter: function (regionName) {
      //   let index = 0;
      //   let optionName = "onlineProvider";
      //   let options = option.filter(v => {
      //     return v.name === optionName;
      //   })[0];
      //   let data = options.dataset.source;
      //   data.forEach(function (v, i) {
      //     if (v.regionName === regionName) {
      //       index = i;
      //     }
      //   });
      //   return [`{a| ${data[index].regionName}}`].join('');
      // },
    },
    series: [{
      type: 'pie',
      radius: ['35%', '55%'], // 尺寸大小
      center: ['50%', '33%'], // 上下位置
      labelLine: {
        normal: {
          show: false
        }
      },
      color: ["#24FFB5", "#1AC5FF", "#055EFD ", "#14458C", "#FEC421", "#fff"],
      label: {
        normal: {
          show: false,
          position: 'center',
          formatter: function (val) {
            return [`{a| ${val.data.saleAmount}}`, `{b| ${val.data.saleArea}}`].join('\n');
          },
          textStyle: {
            rich: {
              a: {
                width: 100,
                align: 'center',
                verticalAlign: 'middle',
                padding: 8,
                fontFamily: 'ding',
                color: "#fff",
                fontSize: 18
              },
              b: {
                width: 100,
                color: '#909399',
                align: 'center',
                verticalAlign: 'middle',
                fontSize: 16
              }
            }
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '14'
          }
        }
      },
      encode: {
        itemName: "supplierName",
        value: "saleAmountVal"
      }
    }]
  },
  {
    name: "salemanData",
    animation: true,
    tooltip: {
      show: false
    },
    grid: {
      left: '40',
      right: '0',
      top: '20',
      bottom: '0',
      x: 0,
      y: 0,
      containLabel: false,
      show: false // 查看边界
    },
    xAxis: {
      show: false,
      type: 'value'
    },
    dataset: {
      dimensions: [
        'name', 'saleArea', 'saleAmount', 'totalVal', 'percentageComplete', 'per'
      ],
      source: []
    },
    yAxis: [{
      type: "category",
      axisTick: "none",
      axisLine: "none",
      num: 0,
      axisLabel: {
        verticalAlign: "bottom",
        align: "left",
        padding: [-6, 8, 15, 10],
        textStyle: {
          color: "#fff",
          fontSize: 15
        }
      }
    }, {
      type: "category",
      axisTick: "none",
      axisLine: "none",
      num: 1,
      axisLabel: {
        show: true,
        verticalAlign: "bottom",
        align: "left",
        padding: [0, 8, 15, 0],
        textStyle: {
          color: "#fff",
          fontSize: "16",
          align: 'left'
        },
        // formatter: '{x|{value}}',
        rich: {
          x: {
            width: 110,
            align: "right",
            fontSize: 16,
            color: "#C8F8FD",
            fontFamily: 'ding'
          }
        },
        formatter: function (value) {
          return `{x| ${value.slice(0, -8)}}`;
        }
      }
    }, {
      num: 2,
      type: "category",
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        show: true,
        verticalAlign: "top",
        align: "left",
        padding: [-8, 8, 15, 0],
        // formatter: '{x|{value}',
        rich: {
          x: {
            width: 110,
            align: "right",
            fontSize: 16,
            color: "#909399"
          }
        },
        formatter: function (value) {
          return `{x| ${value.slice(0, -8)}}`;
        }
      }
    }],
    series: [{
      num: 0,
      name: "值",
      type: "bar",
      encode: {
        x: "per",
        y: "name"
      },
      barWidth: 6,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
            offset: 0,
            color: '#2A84CF'
          }, {
            offset: 1,
            color: '#03FECD'
          }]),
          barBorderRadius: 5
        }
      },
      "z": 3
    }, {
      num: 1,
      name: "外框1",
      type: "bar",
      barGap: "-100%",
      encode: {
        x: "totalVal",
        y: "saleAmount"
      },
      barWidth: 6,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: "rgba(255,255,255, 0.07)",
          barBorderRadius: 5,
          fontFamily: 'ding'
        }
      },
      label: {
        width: 100,
        show: true,
        position: "insideTopRight",
        align: "right",
        padding: [-30, 0, 0, 0],
        fontSize: 16,
        formatter: function (val) {
          let percent = val.data.percentageComplete !== '-' ? `${val.data.percentageComplete}%` : val.data.percentageComplete;
          return `{a| ${percent}}`;
        },
        rich: {
          a: {
            color: '#C8F8FD',
            fontSize: 16
            // fontFamily: 'ding',
          }
        }
      },
      "z": 2
    }, {
      num: 2,
      name: "外框2",
      type: "bar",
      barGap: "-100%",
      encode: {
        x: "totalVal",
        y: "saleArea"
      },
      barWidth: 6,
      yAxisIndex: 2,
      itemStyle: {
        normal: {
          color: "rgba(255,255,255, 0.07)",
          opacity: 1,
          barBorderRadius: 5
          // fontFamily: 'ding',
        }
      },
      "z": 1
    }]
  }, {
    name: 'salemanTarget',
    animation: true,
    title: [{
      text: '各业务员目标达成情况',
      left: 36,
      top: 40,
      textStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'normal'
      }
    }, {
      subtext: 'GMV（万元）',
      subtextStyle: {
        color: 'rgba(255, 255, 255, 0.65)',
        fontSize: 14,
        fontWeight: 'normal'
      },
      left: 36,
      top: 82
    }],
    legend: {
      data: ['目标值', '未达成', '已达成', '未设置该维度目标'],
      left: 300,
      top: 40,
      icon: 'rect',
      itemWidth: 17,
      itemHeight: 17,
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: "shadow",
        label: {
          backgroundColor: '#6a7985'
        }
      },
      textStyle: {
        rich: {
          a: {
            color: '#fff',
            fontSize: 18,
            padding: 5
          },
          b: {
            color: '#80f5ff',
            fontSize: 12
          }
        }
      },
      padding: 15,
      backgroundColor: 'rgba(0,0,0,0.7)',
      // 色值 不需要带''
      formatter: function (params) {
        let content = `
        <div style="color: #fff; font-size: 14px;">
                          <div style="margin-bottom: 5px;">￥<span style="font-family: ding">${params[0]['value']['originVal']}</span></div>
                          <p>达成率 ${params[0]['value']["relativeRatio"]}</p>
                        </div>`;
        return content;
      }

    },
    dataset: {
      dimensions: [
        'salemanName', 'saleAmount', 'relativeRatio', 'targetValue', 'NotSet', 'LackOf', 'originVal'
      ],
      source: []
    },
    grid: {
      left: 50,
      right: 40,
      top: 160,
      bottom: 40,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        interval: 0
      },
      axisLine: {
        lineStyle: {
          // color: '#E1F5FE'
        }
      },
      offset: 16
    },
    yAxis: [{
      type: 'value',
      nameLocation: 'end',
      nameGap: 40,
      offset: 10,
      nameRotate: 0,
      axisLine: {
        show: false
      },
      axisTick: {
        alignWithLabel: true,
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#909399',
          fontSize: 14
        }
      },
      nameTextStyle: {
        color: 'rgba(225, 245, 254, 0.2)',
        fontSize: 14,
        padding: [0, 0, 0, 54]
      },
      splitLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: 'rgba(225, 255, 255, 0.12)'
        }
      }
    }],
    series: [{
      name: '目标值',
      type: "bar",
      barMaxWidth: 30,
      z: 0,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(255,255,255,0.12)'
          }, {
            offset: 1,
            color: 'rgba(255,255,255,0.12)'
          }]),
          label: {
            show: false,
            textStyle: {
              fontSize: 16
            },
            position: "top",
            distance: 10
          }
        }
      },
      encode: {
        x: 'salemanName',
        y: 'targetValue'
      }
    }, {
      name: "未达成",
      type: "bar",
      silent: true,
      barMaxWidth: 30,
      barGap: '-100%',
      z: 1,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: '#2A84CF'
          }, {
            offset: 1,
            color: '#03FECD'
          }]),
          label: {
            show: false,
            position: 'top',
            distance: 0,
            color: '#000',
            fontSize: 16,
            padding: [10, 15, 20, 15],
            borderRadius: 100
          }
        }
      },
      encode: {
        x: 'salemanName',
        y: 'LackOf'
      }
    }, {
      name: "已达成",
      type: "bar",
      barMaxWidth: 30,
      barGap: '-100%',
      z: 2,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: '#3654EA'
          }, {
            offset: 1,
            color: '#00B9FF'
          }]),
          label: {
            show: false,
            position: 'top',
            distance: 0,
            color: '#434e79',
            fontSize: 16,
            padding: [10, 15, 20, 15],
            borderRadius: 100
          }
        }
      },
      encode: {
        x: 'salemanName',
        y: 'saleAmount'
      }
    }, {
      name: "未设置该维度目标",
      type: "bar",
      barMaxWidth: 30,
      barGap: '-100%',
      z: 3,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
            offset: 0,
            color: '#FFD329'
          }, {
            offset: 1,
            color: '#FEA712'
          }]),
          label: {
            show: false,
            position: 'top',
            distance: 0,
            color: '#434e79',
            fontSize: 16,
            padding: [10, 15, 20, 15],
            borderRadius: 100
          }
        }
      },
      encode: {
        x: 'salemanName',
        y: 'NotSet'
      }
    }]
  },
];
export default option;
