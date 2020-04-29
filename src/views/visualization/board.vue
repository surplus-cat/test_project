<template>
  <div>
    <div class="board-cards">
      <ul>
        <li v-for="item in users" :key="item.name">
          <!--<el-tooltip class="item" :content="item.name" placement="top-start" effect="light">
            <p>{{ item.name }}</p>
          </el-tooltip>-->
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
  </div>
</template>

<script>
import LbTable from '@/components/lb-table/lb-table';

export default {
  data () {
    return {
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
.board-cards {
  margin-top: 20px;
  padding: 0 25px;

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
    height: 800px;
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
