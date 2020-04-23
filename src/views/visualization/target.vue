<template>
  <div class="echart-content">
    <h4 class="title">供应商销售趋势</h4>
    <!-- 销售趋势图 -->
    <div class="echart-wrapper">
      <echart
        ref="echart"
        type="salemanTarget"
        v-show="isWhether"/>
      <div class="nodata"
        v-show="!isWhether"></div>
    </div>
  </div>
</template>

<script>
import echart from '@/components/echart';
import { func } from '@/util';
export default {
  data () {
    return {
      isWhether: true,
      data: [
        {
          salemanName: '张翰夫',
          saleAmount: 354,
          targetValue: 100
        },
        {
          salemanName: '李宗仁',
          saleAmount: 454,
          targetValue: 100
        },
        {
          salemanName: '贾谊',
          saleAmount: 254,
          targetValue: 100
        },
        {
          salemanName: '彭万里',
          saleAmount: 67.8,
          targetValue: 100
        },
        {
          salemanName: '吕先祖',
          saleAmount: 76.8,
          targetValue: 100
        },
        {
          salemanName: '于学忠',
          saleAmount: 347,
        },
      ]
    };
  },
  components: {
    echart
  },
  computed: {},
  watch: {},
  mounted() {
    setTimeout(() => {
      this.query();
    }, 1000)
  },
  methods: {
    query () {
      this.data.forEach((v) => {
        v.originVal = v.saleAmount;
        v.relativeRatio = v.targetValue ? `${v.originVal * 100 / v.targetValue}%`: '-';
        if (!v.targetValue) {
          v.NotSet = v.saleAmount;
          delete v.saleAmount
        } else if (v.saleAmount < v.targetValue) {
          v.LackOf = v.saleAmount;
          delete v.saleAmount
        }
      })
      let echart = this.$refs.echart;
      echart.option.dataset.source = this.data;
      echart.reDraw();
      this.isWhether = true;
    }
  }
};
</script>
<style lang="less" scoped>
.echart-wrapper {
  height: 600px;
  background-color: #08152A;
}
</style>
