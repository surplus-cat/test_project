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

    <detail-pop
      :dialog-visible="dialogVisible"
      :data-obj="dataObj"
      @close="close">
    </detail-pop>
  </div>
</template>

<script>
import detailPop from './popout/detailPop';
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
              scope.row.GMVChain
                ? <div class="innerBox">
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
              scope.row.saleAmountChain
                ? <div class="innerBox">
                  <span class="progress">
                    <i class="default" style={{ width: scope.row.saleAmountChain }}></i>
                  </span>
                  <span>{scope.row.saleAmountChain}</span>
                </div>
                : ''
            )
          }
        },
        // { prop: 'count', label: '下单笔数' },
        {
          label: '下单笔数',
          render: (h, scope) => {
            // 根据二级表格有的属性做筛除
            return (
              !scope.row.saleAmountChain
                ? <span>{scope.row.count}</span>
                : <span class="count" on-click={() => this.open(scope.row.count) } >{scope.row.count}</span>
            )
          }
        },
        {
          label: '下单趋势',
          render: (h, scope) => {
            // 根据二级表格有的属性做筛除
            return (
              !scope.row.saleAmountChain
                ? <i class="dj-bi- dj-bi-histogram" on-click={() => this.open() } />
                : ''
            )
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
      dialogVisible: false,
      dataObj: {}
    };
  },
  components: {
    LbTable,
    detailPop
  },
  computed: {},
  watch: {},
  methods: {
    close () {
      this.dialogVisible = false;
    },
    open(row) {
      let index = row.$index;
      this.dataObj.title = `xxx下单明细表`;

      this.dataObj.tableData = [
        {
          orderNumber: '46464464',
          paytime: '2020-09-19 19:01',
          size: '1313cm',
          gmv: '￥13131346',
          saleAmount: '46464m²'
        },
        {
          orderNumber: '979116464646',
          paytime: '2020-09-19 19:01',
          size: '1313cm',
          gmv: '￥13131346',
          saleAmount: '46464m²'
        }
      ];
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="less" scoped>
@import './common.less';

</style>
