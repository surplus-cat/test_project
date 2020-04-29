<template>
  <div class="container">
    <lb-table
      class="btable"
      ref="baseTable"
      :data="tableData"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :column="colConfigs">
    </lb-table>
  </div>
</template>

<script>
import LbTable from '@/components/lb-table/lb-table';

export default {
  data () {
    return {
      colConfigs: [
        { prop: 'customer', label: '客户' },
        { prop: 'saleman', label: '业务员' },
        { prop: 'GMV', label: 'GMV' },
        {
          label: 'GMV占比',
          render: (h, scope) => {
            return (
              scope.row.GMVChain ?
                <div class="innerBox">
                  <span class="progress">
                    <i class="gmv" style={{ width: scope.row.GMVChain }}></i>
                  </span>
                  <span>{scope.row.GMVChain}</span>
                </div>
              : ''
            )
          }
        },
        { prop: 'saleAmount', label: '下单量' },
        {
          label: '下单量占比',
          render: (h, scope) => {
            return (
              scope.row.saleAmountChain ?
                <div class="innerBox">
                  <span class="progress">
                    <i class="default" style={{ width: scope.row.saleAmountChain }}></i>
                  </span>
                  <span>{scope.row.saleAmountChain}</span>
                </div>
                : ''
            )
          }
        },
        { prop: 'count', label: '下单笔数' },
        {
          label: '下单趋势',
          render: (h, scope) => {
            return <i class="dj-bi- dj-bi-histogram" on-click={() => this.open() } />
          }
        },
      ],
      tableData: [
        {
          id: 1,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          // GMVChain: '',
          saleAmount: '464,646',
          // saleAmountChain: '',
          count: 71,
          children: [
            {
              id: 11,
              // saleman: "贾谊",
              customer: "王小虎",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            },
            {
              id: 12,
              // saleman: "贾谊",
              customer: "王二狗",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            }
          ],
        },
        {
          id: 2,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          // GMVChain: '',
          saleAmount: '464,646',
          // saleAmountChain: '',
          count: 71,
          children: [
            {
              id: 301,
              // saleman: "贾谊",
              customer: "王小波",
              GMV: '￥13,671,341',
              GMVChain: '',
              saleAmount: '464,646',
              saleAmountChain: '',
              count: 71,
            },
          ],
          // hasChildren: true
        },
        {
          id: 3,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          // GMVChain: '',
          saleAmount: '464,646',
          // saleAmountChain: '',
          count: 71,
          children: [
            {
              id: 31,
              // saleman: "贾谊",
              customer: "王小波",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            },
            {
              id: 312,
              // saleman: "贾谊",
              customer: "王黑虎",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            }
          ]
        },
        {
          id: 4,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          // GMVChain: '',
          saleAmount: '464,646',
          // saleAmountChain: '',
          count: 71,
          children: [
            {
              id: 66,
              // saleman: "贾谊",
              customer: "王波",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            },
            {
              id: 68,
              // saleman: "贾谊",
              customer: "李虎",
              GMV: '￥13,671,341',
              GMVChain: '50%',
              saleAmount: '464,646',
              saleAmountChain: '72%',
              count: 71,
            }
          ]
        }
      ],
    };
  },
  components: {
    LbTable
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
/deep/.el-table {
  background-color: rgba(0,13,34, 0.2);

  tr {
    color: #fff;
    background-color: rgba(8,21,42, 0.2);

    &:hover > td {
      background-color: rgba(8,21,42, 0.2);
    }
  }

  th {
    background-color: rgba(255,255,255,0.08);
  }
}
/deep/.innerBox {
  width: 148px;
  display: flex;
  color: #fff;
  justify-content: space-between;

  .progress {
    width: 80px;
    height: 6px;
    display: block;
    background-color: rgba(0,0,0,0.15);
    border-radius:4px;
    margin-top: 8px;
  }

  i {
    height: 6px;
    display: block;
    background: linear-gradient(270deg,rgba(12,115,249,1) 0%,rgba(0,185,255,1) 100%);
    border-radius:3px;

    &.gmv {
      background: linear-gradient(270deg,rgba(42,132,207,1) 0%,rgba(3,254,205,1) 100%);
    }
  }

}
/deep/.el-table__indent {
  // padding-left: 3px!important;
}
/deep/ .el-icon-arrow-right {
  font-family: "dj-bi-" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  &:before {
    content: "\e65b";
  }
}

/deep/ .el-table__expand-icon--expanded {
  transform: rotate(0deg);

  .el-icon-arrow-right:before {
    content: "\e65a";
  }
}
</style>
