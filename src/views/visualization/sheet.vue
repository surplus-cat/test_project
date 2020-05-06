<template>
  <div class="boxer">
    <lb-table
      class="btable"
      ref="baseTable"
      :data="tableData"
      :column="colConfigs">
    </lb-table>

    <chart-pop
      ref="ChartPop"
      :dialog-visible="dialogVisible"
      :chart-obj="ChartObj"
      @close="close">
    </chart-pop>
  </div>
</template>

<script>
import chartPop from './popout/chartPop';
import LbTable from '@/components/lb-table/lb-table';

export default {
  data() {
    return {
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
      data: [
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
    chartPop,
    LbTable
  },
  methods: {
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
      this.ChartObj.title = "纸板团购接单趋势";
      let data = JSON.parse(JSON.stringify(this.data));
      let newObj = JSON.parse(JSON.stringify(this.data[index]));

      newObj.date = `3-${index}`;

      data.push(newObj);

      // this.ChartObj.source = data;
      this.ChartObj.type = "trends";
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
@import './common.less';

// .boxer {
//   width: 1000px;
//   background-color: #000D22;
//   margin: 0 auto;
// }
.icon {
  cursor: pointer;
}
</style>
