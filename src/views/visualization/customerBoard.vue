<template>
  <div>
    <customerFiltro ref="filtro" @handover="handover" />
    <div class="concrete_content">
      <div class="board-cards" v-if="tab === 'manager'">
        <ul>
          <li v-for="item in users" :key="item.name">
            <p>{{ item.name }}</p>
            <Lb-table
              class="btable"
              ref="baseTable"
              :data="item.data"
              :column="item.colConfigs">
            </Lb-table>
          </li>
        </ul>
      </div>
      <lb-table
        v-if="tab === 'order'"
        class="btable"
        ref="baseTable"
        :data="tableData"
        :column="colConfigs[tab]">
      </lb-table>
    </div>
    <!--<chart-pop
      ref="ChartPop"
      :dialog-visible="dialogVisibles"
      :chart-obj="ChartObj"
      @close="close">
    </chart-pop>
    <detail-pop
      :dialog-visible="dialogVisible"
      :data-obj="dataObj"
      @close="close">
    </detail-pop>-->
  </div>
</template>

<script>
import customerFiltro from './components/customerFiltro';
import { func } from '@/util';
import chartPop from './popout/chartPop';
import detailPop from './popout/detailPop';
import LbTable from '@/components/lb-table/lb-table';

export default {
  data () {
    return {
      tab: 'order',
      dialogVisibles: false,
      users: [
        {
          name: '新用户',
          data: [{
            customer: '海亮集团',
            saleman: '黄庭辉',
            InitialOrderTime: '2020-03-29'
          },
          {
            customer: '人民电器集团有限公司',
            saleman: '欧阳峰祖',
            InitialOrderTime: '2020-03-29'
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            InitialOrderTime: '2020-03-29'
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            InitialOrderTime: '2020-03-29'
          }],
          colConfigs: [
            {
              prop: 'customer',
              label: '客户',
              width: '140px',
              render: (event, source) => {
                return (
                  source.row.customer.length > 8
                    ? (<el-tooltip content={source.row.customer} placement="top-start" effect="light">
                      <div class="customer">{source.row.customer}</div>
                    </el-tooltip>) : <div class="customer">{source.row.customer}</div>
                )
              }
            },
            { prop: 'saleman', label: '业务员' },
            { prop: 'InitialOrderTime', label: '首次下单时间' },
          ],
        },
        {
          name: '流失激活用户',
          data: [{
            customer: '海亮集团',
            saleman: '黄庭辉',
            ReorderTime: '2020-03-29',
            withoutOrderDays: 2
          },
          {
            customer: '人民电器集团有限公司',
            saleman: '欧阳峰祖',
            ReorderTime: '2020-03-29',
            withoutOrderDays: 20
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            ReorderTime: '2020-03-29',
            withoutOrderDays: 12
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            ReorderTime: '2020-03-29',
            withoutOrderDays: 21
          }],
          colConfigs: [
            {
              prop: 'customer',
              label: '客户',
              width: '100px',
              render: (event, source) => {
                return (
                  source.row.customer.length > 8
                    ? (<el-tooltip content={source.row.customer} placement="top-start" effect="light">
                      <div class="customer">{source.row.customer}</div>
                    </el-tooltip>) : <div class="customer">{source.row.customer}</div>
                )
              }
            },
            { prop: 'saleman', label: '业务员', width: '80px' },
            { prop: 'ReorderTime', label: '再次下单时间' },
            { prop: 'withoutOrderDays', label: '连续未下单天数', align: 'center', },
          ],
        },
        {
          name: '流失预警用户',
          data: [{
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 2
          },
          {
            customer: '人民电器集团有限公司',
            saleman: '欧阳峰祖',
            withoutOrderDays: 20
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 12
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 21
          }],
          colConfigs: [
            {
              label: '客户',
              width: '140px',
              render: (event, source) => {
                return (
                  source.row.customer.length > 8
                    ? (<el-tooltip content={source.row.customer} placement="top-start" effect="light">
                      <div class="customer">{source.row.customer}</div>
                    </el-tooltip>) : <div class="customer">{source.row.customer}</div>
                )
              }
            },
            {
              prop: 'saleman',
              label: '业务员',
            },
            {
              label: '连续未下单天数',
              align: 'center',
              render: (event, source) => {
                return <span class="yellow">{source.row.withoutOrderDays}</span>;
              }
            },
          ],
        },
        {
          name: '流失用户',
          data: [{
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 22
          },
          {
            customer: '人民电器集团有限公司',
            saleman: '欧阳峰祖',
            withoutOrderDays: 120
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 142
          },
          {
            customer: '海亮集团',
            saleman: '黄庭辉',
            withoutOrderDays: 61
          }],
          colConfigs: [
            {
              prop: 'customer',
              label: '客户',
              width: '100px',
              render: (event, source) => {
                return (
                  source.row.customer.length > 8
                    ? (<el-tooltip content={source.row.customer} placement="top-start" effect="light">
                      <div class="customer">{source.row.customer}</div>
                    </el-tooltip>) : <div class="customer">{source.row.customer}</div>
                )
              }
            },
            { prop: 'saleman', label: '业务员' },
            {
              label: '连续未下单天数',
              align: 'center',
              render: (event, source) => {
                return <span class="pink">{source.row.withoutOrderDays}</span>;
              }
            },
          ],
        }
      ],
      colConfigs: {
        'order': [
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
        'manager': [
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
                      <i class="integral" style={{ width: scope.row.GMVChain }}></i>
                    </span>
                    <span>{scope.row.GMVChain}</span>
                  </div>
                  : ''
              )
            }
          },
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
        ]
      },
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
    };
  },
  components: {
    chartPop,
    LbTable,
    customerFiltro,
    detailPop
  },
  computed: {},
  watch: {},
  methods: {
    handover(val) {
      this.tab = val;
    },
  }
};

</script>
<style lang="less" scoped>
.board-cards {
  margin-top: 20px;

  /deep/.el-table {
    width: 100%;

    tr {
      color: #fff;
      background-color: rgba(8,21,42,1);

      &:hover > td {
        background-color: rgba(8,21,42,1);
      }
    }

    th {
      background-color: rgba(255,255,255,0.08);
    }

  }

  ul {
    width: 100%;
    display: flex;
  }

  li {
    width: 25%;
    // height: 800px;
    height: 550px;
    border-radius: 8px;
    margin-right: 5px;
    list-style: none;
    background-color: #08152A;

    &:nth-child(1) p {
      background: linear-gradient(to left, #2A84CF , #03FECD);
    }

    &:nth-child(2) p {
      background: linear-gradient(to left, #0C73F9 , #00B9FF);
    }

    &:nth-child(3) p {
      background: linear-gradient(to left, #FFD329 , #FEA712);
    }

    &:nth-child(4) p {
      background: linear-gradient(to left, #FF8F6A , #FF69AD);
    }

    p {
      height: 92px;
      line-height: 92px;
      color: #fff;
      font-size: 20px;
      border-radius: 8px 8px 0 0;
    }

    /deep/.customer {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /deep/.pink {
      color: #ff70a1;
    }

    /deep/.yellow {
      color: #ffb71b;
    }
  }
}
</style>
