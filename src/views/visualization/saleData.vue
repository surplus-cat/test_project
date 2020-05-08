<template>
  <div>
    <dataCommon />
    <div class="container">
      <lb-table
        class="btable"
        ref="baseTable"
        :data="tableData"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        :column="colConfigs[ordinal]">
      </lb-table>
    </div>
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
import dataCommon from './components/dataCommon';

export default {
  props: {
    index: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      colConfigs: [
        [
          { prop: 'customer', label: '客户' },
          {
            label: '业务员',
            render: (h, scope) => {
              return (
                scope.row.size
                  ? <span class="count" on-click={() => this.open(scope.row.saleman) } >{scope.row.saleman}</span>
                  : <span>{scope.row.saleman}</span>
              )
            }
          },
          { prop: 'GMV', label: 'GMV', align: 'right' },
          { prop: 'saleAmount', label: '下单量', align: 'right' },
          { prop: 'size', label: '落料规格', align: 'center' },
          { prop: 'orderTime', label: '下单时间', align: 'center' }
        ],
        [
          {
            label: '客户',
            render: (h, scope) => {
              return (
                scope.row.size
                  ? <span class="count" on-click={() => this.open(scope.row.customer) } >{scope.row.customer}</span>
                  : <span>{scope.row.customer}</span>
              )
            }
          },
          { prop: 'saleman', label: '业务员' },
          { prop: 'GMV', label: 'GMV', align: 'right' },
          { prop: 'saleAmount', label: '下单量', align: 'right' },
          { prop: 'size', label: '落料规格', align: 'center' },
          { prop: 'purchaseTime', label: '加购时间', align: 'center' }
        ]
      ],
      tableData: [
        {
          id: 1,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          saleAmount: '464,646',
          children: [
            {
              id: 11,
              customer: "东宋一号",
              saleman: "sjaijoajsap",
              GMV: '￥13,671',
              saleAmount: '4,646',
              size: '123*23cm',
              orderTime: '2020-06-14 11:56'
            },
            {
              id: 12,
              customer: "东宋二号",
              saleman: "sjaijoajsap",
              GMV: '￥71,341',
              saleAmount: '1,646',
              size: '123*21cm',
              orderTime: '2020-01-14 11:56'
            }
          ],
        },
        {
          id: 2,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          saleAmount: '464,646',
          children: [
            {
              id: 22,
              customer: "东宋一号",
              GMV: '￥13,671',
              saleAmount: '4,646',
              size: '123*23cm',
              purchaseTime: '2020-06-14 11:56'
            },
            {
              id: 23,
              customer: "东宋二号",
              GMV: '￥71,341',
              saleAmount: '1,646',
              size: '123*21cm',
              purchaseTime: '2020-01-14 11:56'
            }
          ],
        },
      ],
      dialogVisible: false,
      dataObj: {}
    };
  },
  components: {
    LbTable,
    detailPop,
    dataCommon
  },
  computed: {
    ordinal () {
      return this.index - 4;
    }
  },
  watch: {},
  mounted() {
    if (this.index === 5) {
      this.tableData = [
        {
          id: 1,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          saleAmount: '464,646',
          children: [
            {
              id: 11,
              customer: "东宋一号",
              GMV: '￥13,671',
              saleAmount: '4,646',
              size: '123*23cm',
              purchaseTime: '2020-06-14 11:56'
            },
            {
              id: 12,
              customer: "东宋二号",
              GMV: '￥71,341',
              saleAmount: '1,646',
              size: '123*21cm',
              purchaseTime: '2020-01-14 11:56'
            }
          ],
        },
        {
          id: 2,
          saleman: "贾谊",
          customer: "王小虎",
          GMV: '￥13,671,341',
          saleAmount: '464,646',
          children: [
            {
              id: 22,
              customer: "东宋一号",
              GMV: '￥13,671',
              saleAmount: '4,646',
              size: '123*23cm',
              purchaseTime: '2020-06-14 11:56'
            },
            {
              id: 23,
              customer: "东宋二号",
              GMV: '￥71,341',
              saleAmount: '1,646',
              size: '123*21cm',
              purchaseTime: '2020-01-14 11:56'
            }
          ],
        },
      ]
    }
  },
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
