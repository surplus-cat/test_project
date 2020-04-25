<template>
  <div class="boxer">
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180"
        column-key="date"
      >
      </el-table-column>
      <el-table-column prop="gmv" label="总gmv" width="180" sortable></el-table-column>
      <el-table-column prop="address" label="接单量"
        :sortable="true"
        :sort-method="(a,b) => sortMethod(a, b)"
        :formatter="formatter">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="接单趋势"
        width="100"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <i class="icon iconfont el-icon-my-trend" @click="open"></i>
        </template>
      </el-table-column>
    </el-table>

    <chart-pop
      ref="ChartPop"
      v-if="dialogVisible"
      :dialog-visible="dialogVisible"
      :chart-obj="ChartObj"
      @close="close">
    </chart-pop>
  </div>
</template>

<script>
import chartPop from './popout/chartPop'

export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          gmv: "￥111,183.11",
          address: "1,221,831.00",
          tag: "家"
        },
        {
          date: "2016-05-04",
          gmv: "￥110,183.00",
          address: "132,331.10",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          gmv: "￥954,103.11",
          address: "218,331.00",
          tag: "家"
        },
        {
          date: "2016-05-03",
          gmv: "￥11,183.11",
          address: "1,223,831.00",
          tag: "公司"
        }
      ],
      ChartObj: {},
      dialogVisible: false
    };
  },
  components: {
    chartPop
  },
  methods: {
    close() {
      this.dialogVisible = false;
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address + 'm²';
    },
    sortMethod(a, b) {
      const val1 = a.address.replace(/,/g, '');
      const val2 = b.address.replace(/,/g, '');
      return val1 - val2
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    open() {
      this.ChartObj.title = "值班团购接单趋势";
      this.ChartObj.data = [
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
      ];
      this.ChartObj.ChartType = "trends";
      this.dialogVisible = true;

      this.$nextTick(() => {
        console.log(this.$refs.ChartPop.$refs)
        this.$refs.ChartPop.$refs.echart.option.dataset.source = this.ChartObj.data;
        this.$refs.ChartPop.$refs.echart.draw();
      })
    }
  }
};
</script>
<style lang="less" scoped>
.boxer {
  width: 1000px;
  margin: 0 auto;
}
.icon {
  cursor: pointer;
}
</style>
