<template>
  <div class="ProviderBox">
    <div class="vessel">
      <echart ref="chart" type="trends" height="600px" v-show="isWhether"/>
      <div class="nodata" v-show="!isWhether"></div>
    </div>
    <div class="tableBox">
      <div class="titleBox">
        <h3 class="title">xxx月xx日供应商接单明细</h3>
        <el-input class="el_input" />
      </div>
      <el-table ref="filterTable" :data="tableData">
        <el-table-column
          prop="productName"
          label="产品名称"
          width="220"
          column-key="productName"
        >
          <template slot-scope="scope">
            <div class="innerBox">
              <span class="rank">{{ scope.$index + 1 }}</span>
              <p class="productName">{{ scope.row.productName }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="gmv"
          label="GMV"
          column-key="date"
          sortable
        >
        </el-table-column>
        <el-table-column prop="gmvChain" label="GMV占比"></el-table-column>
        <el-table-column prop="saleAmount" label="接单量"
          :sortable="true"
          :sort-method="(a,b) => sortMethod(a, b, 'saleAmount')"
          :formatter="formatter">
        </el-table-column>
        <el-table-column prop="saleAmountChain" label="接单量占比"></el-table-column>
        <el-table-column
          prop="tag"
          label="接单趋势"
          width="100"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <i class="dj-bi- dj-bi-histogram" @click="open"></i>
          </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import echart from '@/components/echart';
import chartPop from './popout/chartPop';

export default {
  data () {
    return {
      isWhether: true,
      tableData: [
        {
          productName: '东宋二号',
          gmv: "￥111,183.11",
          gmvChain: '71%',
          saleAmount: "1,221,831.00",
          saleAmountChain: '71%'
        },
        {
          productName: '东宋三号',
          gmv: "￥110,183.00",
          gmvChain: '71%',
          saleAmount: "132,331.10",
          saleAmountChain: '71%'
        },
        {
          productName: '东丽2号',
          gmv: "￥954,103.11",
          gmvChain: '61%',
          saleAmount: "218,331.00",
          saleAmountChain: '71%'
        },
        {
          productName: '特2号',
          gmv: "￥11,183.11",
          gmvChain: '41%',
          saleAmount: "1,223,831.00",
          saleAmountChain: '81%'
        },
        {
          productName: '东丽2号',
          gmv: "￥954,103.11",
          gmvChain: '31%',
          saleAmount: "218,331.00",
          saleAmountChain: '90%'
        },
        {
          productName: '特2号',
          gmv: "￥11,183.11",
          gmvChain: '21%',
          saleAmount: "1,223,831.00",
          saleAmountChain: '56%'
        }
      ],
    };
  },
  components: {
    echart
  },
  computed: {},
  mounted() {
    console.log(this.$refs.chart, this.$refs.chart.option)
    this.draw();
  },
  methods: {
    formatter(row, column) {
      return row.saleAmount + 'm²';
    },
    sortMethod(a, b, field) {
      const val1 = a[field].replace(/,/g, '');
      const val2 = b[field].replace(/,/g, '');
      return val1 - val2
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
        this.$refs.ChartPop.$refs.echart.option.dataset.source = this.ChartObj.data;
        this.$refs.ChartPop.$refs.echart.draw();
      })
    },
    draw () {
      let data = [
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
      setTimeout(() => {
        this.$refs.chart.option.dataset.source = data;
        this.$refs.chart.draw();
      }, 0)
    }
  }
};
</script>
<style lang="less" scoped>
.ProviderBox {
  padding: 0 24px;
  display: flex;
  margin-top: 50px;
  
  .vessel {
    background-color: rgba(8,21,42,1);
    border-radius: 4px;
    position: relative;
    //width: 100%;
    flex: 1;
    height: 640px;
    .nodata {
      height: 100%;
      //background-image: url("../assets/images/noData.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100px 100px;
    }
  }

  .tableBox {
    width: 832px;
    height:640px;
    background-color: rgba(8,21,42,1);
    border-radius:4px;
    margin-left:16px;

    .titleBox {
      padding: 36px 24px 24px;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }

    .title {
      font-size: 18px;
      font-weight: 100;
      color: #fff;
    }

    .el_input {
      width: 180px;
    }

    /deep/.el-table {
      width: 100%;

      tr {
        background-color: rgba(8,21,42,1);


        &:nth-child(1) .rank {
          background-color: rgba(250,173,20,1);
        }

        &:nth-child(2) .rank {
          background-color: rgba(255,255,255,0.45);
        }

        &:nth-child(3) .rank {
          background-color: rgba(197,139,67,1)
        }
      }

      th {
        background-color: rgba(255,255,255,0.08);
      }
      
    }

    .innerBox {
      display: flex;
    }

    .rank {
      width: 18px;
      height: 18px;
      line-height: 20px;
      text-align: center;
      font-size: 12px;
      border-radius: 100%;
      display: block;
      margin-right: 20px;
      color: #fff;
      background-color: rgba(255,255,255,0.12);
    }

    .productName {
      width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.dj-bi-histogram {
  color: #80F5FF
}


</style>