<template>
  <div class="echart-container">
    <div ref="chart" class="chart" :style="{ width, height }"></div>
  </div>
</template>

<script>
import field from './echartsOption';
// import Worker from 'worker-loader!./worker';
// import Worker from 'worker-loader!./webworker.worker';
import { func } from '@/util';

export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    source: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data () {
    return {
      option: {},
      width: null,
      height: null,
      originHeight: null,
      myChart: ''
    };
  },
  mounted () {
    // console.log(this.$el.offsetWidth)
    // 基于准备好的dom，初始化echarts实例
    this.width = this.$el.offsetWidth + 'px';
    this.height = this.$el.offsetHeight + 'px';
    this.originHeight = this.$el.offsetHeight + 'px';
    this.myChart = this.$echarts.init(this.$refs.chart);
    this.draw();
    // console.log(Worker);
  },
  methods: {
    clear() {
      this.myChart.clear();
    },
    draw () {
      let data = field.filter(v => v.name === this.type);
      this.option = Object.assign({}, this.option, data[0]);
      this.drawLine();
    },
    drawLine () {
      // 数据赋值
      if (this.source.length > 0) {
        this.option.dataset.source = this.source;
      }
      // 绘制图表
      this.myChart.setOption(this.option, true);
      this.myChart.resize();
    },
    async reDraw (calcHeight) {
      this.width = this.width ? this.width : this.$el.offsetWidth + 'px';
      // 卡片有数据模块是根据接口来判断是否展示，因此高度需要重新计算
      this.height = calcHeight ? calcHeight + 'px' : (this.height && parseInt(this.height, 10) === this.$el.offsetHeight) ? this.height : this.$el.offsetHeight + 'px';
      this.myChart.getDom().style.height = this.height;
      this.myChart.resize();
      if (this.option.isDouble) {
        // const worker = new Worker();
        // let blob = new Blob([JSON.stringify(this.option, null, 2)], {type: 'application/json'});
        // //var url = window.URL.createObjectURL(blob);
        // //var worker = new Worker();
        // worker.postMessage({ data: blob });
        // worker.onmessage = async (event) => {
        //   this.option = event.data;
        //   await this.myChart.setOption(event.data);
        //   worker.terminate();
        // };
        this.option = this.deal(this.option);
        await this.myChart.setOption(this.option);
      } else {
        await this.myChart.setOption(this.option);
      }
      if (this.option.hasOwnProperty('dataZoom')) {
        this.myChart.on('dataZoom', (params) => {
          this.option.dataZoom.start = params.start;
          this.option.dataZoom.end = params.end;
        });
      }
    },
    deal(option) {
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

      return option;
    }
  }
};
</script>
<style lang="less" scoped>
.echart-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
</style>
