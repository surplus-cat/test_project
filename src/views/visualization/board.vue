<template>
  <div>
    <div class="board-cards">
      <ul>
        <li v-for="(item, index) in users" :key="item.name">
          <p>{{ item.name }}</p>
          <base-table
            class="btable"
            ref="baseTable"
            :table-data="item.data"
            :col-configs="item.colConfigs"
            :is-symbol="false"
            :is-row-click="false">
          </base-table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import baseTable from '@/components/my-table';

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
            { prop: 'customer', label: '客户', width: '180px' },
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
            { prop: 'customer', label: '客户', width: '180px' },
            { prop: 'saleman', label: '业务员' },
            { prop: 'ReorderTime', label: '再次下单时间' },
            { prop: 'withoutOrderDays', label: '连续未下单天数' },
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
            { prop: 'customer', label: '客户', width: '180px' },
            { prop: 'saleman', label: '业务员' },
            { prop: 'withoutOrderDays', label: '连续未下单天数' },
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
            { prop: 'customer', label: '客户', width: '180px' },
            { prop: 'saleman', label: '业务员' },
            { prop: 'withoutOrderDays', label: '连续未下单天数' },
          ],
        }
      ],
      colConfigs: [
        { prop: 'customer', label: '客户', width: '180px' },
        { prop: 'saleman', label: '业务员' },
        { prop: 'InitialOrderTime', label: '首次下单时间' },
        { prop: 'ReorderTime', label: '再次下单时间' },
        { prop: 'withoutOrderDays', label: '连续未下单天数' },
      ],
    };
  },
  components: {
    baseTable
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped>
.board-cards {
  padding: 0 25px;

  ul {
    width: 100%;
    display: flex;
  }

  li {
    width: 25%;
    height: 1011px;
    border-radius: 8px;
    margin-right: 5px;
    list-style: none;
    background-color: #08152A;

    /deep/.el-table__header-wrapper {
      background-color: rgba(255, 255, 255, 0.08);
    }

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
  }
}
</style>
