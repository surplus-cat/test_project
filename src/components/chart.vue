<template>
  <div class="boxer">
    <div :id="id"></div>
    <div></div>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';

export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: function () { return [] }
    }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    rebuild() {
      if (!this.chart) return false;
      // this.chart.clear();
      this.$nextTick(() => {
        this.chart.data(this.data);
        this.chart.render();
      })
    },
    init() {
      // Step 1: 创建 Chart 对象
      this.chart = new Chart({
        autoFit: true,
        container: this.id, // 指定图表容器 ID
        width: 800, // 指定图表宽度
        height: 400 // 指定图表高度
      });
    },
    renderLine() {
      if (!this.chart) return false;
      this.chart.clear();
      this.chart.data(this.data);

      this.chart.scale({
        value: {
          nice: true
        }
      });

      this.chart
        .line()
        .position('feature*value')
        .color('phone')

      this.chart
        .point()
        .position('feature*value')
        .color('phone')
        .shape('circle');
      this.chart.render();
    },
    renderBar() {
      if (!this.chart) return false;
      this.chart.clear();
      this.chart.data(this.data);

      this.chart.scale({
        value: {
          nice: true
        }
      });
      this.chart
        .interval()
        .position('feature*value')
        .color('phone')
        .adjust([  // 分组
          {
            type: 'dodge',
            marginRatio: 0
          }
        ]);

      this.chart.interaction('active-region');
      this.chart.render();
    },
    renderArea() {
      if (!this.chart) return false;
      this.chart.clear();
      this.chart.data(this.data);

      this.chart.scale({
        value: {
          nice: true
        }
      });

      this.chart
        .area()
        .position('day*value')

      this.chart
        .point()
        .position('day*value')

      this.chart.render();
    }
  }
};

</script>
<style lang="less" scoped>
.boxer {
  width: 400px;
  height: 400px;
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
