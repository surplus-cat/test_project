<template>
  <div>
    <base-table
      class="btable"
      ref="baseTable"
      :table-data="data"
      :col-configs="colConfigs"
      :is-symbol="false"
      :is-row-click="false">
    </base-table>
  </div>
</template>

<script>
import baseTable from '@/components/my-table';

export default {
  data () {
    return {
      data: [{
        saleman: '黄庭辉',
        InitialOrderTime: '2020-03-29'
      },
      {
        saleman: '欧阳峰祖',
        InitialOrderTime: '2020-03-29'
      },
      {
        saleman: '黄庭辉',
        InitialOrderTime: '2020-03-29'
      },
      {
        saleman: '黄庭辉',
        InitialOrderTime: '2020-03-29'
      }],
      colConfigs: [
        { prop: 'saleman', label: '业务员' },
        { prop: 'GMV', label: '首次下单时间' },
        { prop: 'saleAmount', label: '首次下单时间' },
        { prop: 'averageGMV', label: '首次下单时间' },
        { prop: 'averageSaleAmount', label: '首次下单时间' },
        { prop: 'InitialOrderTime', label: '接单趋势' },
      ]
    };
  },
  components: {},
  computed: {},
  watch: {},
  methods: {}
};

</script>
<style lang="less" scoped>
</style>
