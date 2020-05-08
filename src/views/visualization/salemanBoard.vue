<template>
  <div>
    <salemanfiltro ref="filtro" @handover="handover" />
    <div class="concrete_content">
      <div class="echart-content" v-show="type === 'manager'">
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
      <lb-table
        v-show="type === 'order'"
        class="btable"
        ref="baseTable"
        :data="tableData"
        :column="colConfigs">
      </lb-table>
    </div>
    <chart-pop
      ref="ChartPop"
      :dialog-visible="dialogVisible"
      :chart-obj="ChartObj"
      @close="close">
    </chart-pop>
  </div>
</template>

<script>
import salemanfiltro from './components/salemanCommon';
import echart from '@/components/echart';
import { func } from '@/util';
import chartPop from './popout/chartPop';
import LbTable from '@/components/lb-table/lb-table';

export default {
  data () {
    return {
      type: 'manager',
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
          targetValue: 200
        },
        {
          salemanName: '张若君',
          saleAmount: 254,
          targetValue: 300
        },
        {
          salemanName: '李宗盛',
          saleAmount: 454,
          targetValue: 300
        },
        {
          salemanName: '贾小宝',
          saleAmount: 284,
          targetValue: 500
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
          saleAmount: 347
        },
        {
          salemanName: '李学忠',
          saleAmount: 747
        },
      ],
      colConfigs: [
        { prop: 'customer', label: '客户', width: '140px' },
        { prop: 'gmv',
          label: 'GMV',
          sortable: true,
          sortMethod: (a, b) => {
            return this.sortMethod(a, b, 'gmv');
          }
        },
        { prop: 'saleAmount',
          label: '接单量',
          sortable: true,
          sortMethod: (a, b) => {
            return this.sortMethod(a, b, 'saleAmount');
          },
          formatter: this.formatter
        },
        { prop: 'gmvAverage', label: '日均GMV' },
        { prop: 'saleAmountAverage', label: '日均接单量' },
        { label: '接单趋势',
          render: (event, row) => {
            return <i class="dj-bi- dj-bi-chart" on-click={() => this.open(row) } />
          }
        },
      ],
      tableData: [
        {
          customer: "高大山",
          gmv: "￥112,183.11",
          saleAmount: "71,831.00",
          gmvAverage: "￥121,183.11",
          saleAmountAverage: "123,831.00",
        },
        {
          customer: "高大山",
          gmv: "￥151,183.11",
          saleAmount: "2,221,831.00",
          gmvAverage: "￥111,183.11",
          saleAmountAverage: "121,831.00",
        },
        {
          customer: "高大山",
          gmv: "￥2,111,183.11",
          saleAmount: "2,921,831.00",
          gmvAverage: "￥111,183.11",
          saleAmountAverage: "20,831.00",
        },
        {
          customer: "高大山",
          gmv: "￥211,183.11",
          saleAmount: "10,221,831.10",
          gmvAverage: "￥1,183.11",
          saleAmountAverage: "121,831.00",
        },
        {
          customer: "高山",
          gmv: "￥910,183.11",
          saleAmount: "3,221,831.00",
          gmvAverage: "￥111,183.11",
          saleAmountAverage: "11,831.00",
        },
        {
          customer: "大山",
          gmv: "￥211,283.21",
          saleAmount: "10,221,831.00",
          gmvAverage: "￥2,183.11",
          saleAmountAverage: "221,831.00",
        },
      ],
      data2: [
        {
          date: '3-21',
          saleAmount: 287,
          saleAmountChain: "2.4",
          GMV: 131,
          GMVChain: '-1.5',
        },
        {
          date: '3-22',
          saleAmount: 187,
          saleAmountChain: "2",
          GMV: 136,
          GMVChain: '-12.8',
        },
        {
          date: '3-23',
          saleAmount: 147,
          saleAmountChain: "12",
          GMV: 126,
          GMVChain: '-11',
        },
        {
          date: '3-24',
          saleAmount: 87,
          saleAmountChain: "12",
          GMV: 226,
          GMVChain: '-10',
        },
        {
          date: '3-25',
          saleAmount: 107,
          saleAmountChain: "12",
          GMV: 246,
          GMVChain: '-18',
        },
        {
          date: '3-26',
          saleAmount: 227,
          saleAmountChain: "2.2",
          GMV: 46,
          GMVChain: '12',
        },
        {
          date: '3-27',
          saleAmount: 127,
          saleAmountChain: "3",
          GMV: 16,
          GMVChain: '-12',
        }
      ],
      ChartObj: {},
      dialogVisible: false
    };
  },
  components: {
    echart,
    salemanfiltro,
    chartPop,
    LbTable
  },
  watch: {},
  mounted() {
    setTimeout(() => {
      this.query();
    }, 1000)
  },
  computed: {
    mold () {
      return this.$refs.filtro.source;
    }
  },
  methods: {
    handover(val) {
      this.type = val;
    },
    query () {
      this.data.forEach((v) => {
        v.originVal = v.saleAmount;
        v.relativeRatio = v.targetValue ? `${v.originVal * 100 / v.targetValue}%` : '-';
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
    },
    formatter(row, column) {
      return row['saleAmount'] + 'm²';
    },
    sortMethod(a, b, field) {
      const val1 = a[field].replace(/\D/g, '');
      const val2 = b[field].replace(/\D/g, '');
      return val1 - val2
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    close() {
      this.dialogVisible = false;
      // this.ChartObj.source = [];
    },
    open(row) {
      let index = row.$index;
      if (this.mold === 'groupon') {
        this.ChartObj.title = "纸板团购接单趋势";
        this.ChartObj.type = "trends";
      } else {
        this.ChartObj.title = "积分商城接单趋势";
        this.ChartObj.type = "integral";
      }

      let data = JSON.parse(JSON.stringify(this.data2));
      let newObj = JSON.parse(JSON.stringify(this.data2[index]));

      newObj.date = `3-${index}`;

      data.push(newObj);

      // this.ChartObj.source = data;

      this.dialogVisible = true;

      // if (this.$refs.ChartPop.$refs.echart) {
      //   this.$refs.ChartPop.$refs.echart.option.dataset.source = data;
      //   this.$refs.ChartPop.$refs.echart.draw();
      // }

      this.$nextTick(() => {
        this.$refs.ChartPop.$refs.echart.option.dataset.source = data;
        this.$refs.ChartPop.$refs.echart.draw();
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import './common';

.echart-wrapper {
  height: 600px;
  background-color: #08152A;
}
</style>
