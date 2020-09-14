<template>
  <div>
    <Chart :data="data"
      :id="id"
      ref="ccc" />

    <Chart :data="data"
      id="id"
      ref="bbb" />

    <Chart :data="data3"
      id="id1"
      ref="aaa" />

    <el-button @click="changeData">面积图重新生成</el-button>
  </div>
</template>

<script>
import Chart from '../components/chart'

export default {
  data() {
    return {
      data: [
        { feature: 'Battery', value: 0.22, phone: 'iPhone' },
        { feature: 'Brand', value: 0.28, phone: 'iPhone' },
        { feature: 'Contract', value: 0.29, phone: 'iPhone' },
        { feature: 'Design', value: 0.17, phone: 'iPhone' },
        { feature: 'Internet', value: 0.22, phone: 'iPhone' },
        { feature: 'Large', value: 0.02, phone: 'iPhone' },
        { feature: 'Price', value: 0.21, phone: 'iPhone' },
        { feature: 'Smartphone', value: 0.5, phone: 'iPhone' },
        { feature: 'Battery', value: 0.27, phone: 'Samsung' },
        { feature: 'Brand', value: 0.16, phone: 'Samsung' },
        { feature: 'Contract', value: 0.35, phone: 'Samsung' },
        { feature: 'Design', value: 0.13, phone: 'Samsung' },
        { feature: 'Internet', value: 0.2, phone: 'Samsung' },
        { feature: 'Large', value: 0.13, phone: 'Samsung' },
        { feature: 'Price', value: 0.35, phone: 'Samsung' },
        { feature: 'Smartphone', value: 0.38, phone: 'Samsung' },
        { feature: 'Battery', value: 0.26, phone: 'Nokia Smartphone' },
        { feature: 'Brand', value: 0.1, phone: 'Nokia Smartphone' },
        { feature: 'Contract', value: 0.3, phone: 'Nokia Smartphone' },
        { feature: 'Design', value: 0.14, phone: 'Nokia Smartphone' },
        { feature: 'Internet', value: 0.22, phone: 'Nokia Smartphone' },
        { feature: 'Large', value: 0.04, phone: 'Nokia Smartphone' },
        { feature: 'Price', value: 0.41, phone: 'Nokia Smartphone' },
        { feature: 'Smartphone', value: 0.3, phone: 'Nokia Smartphone' },
      ],
      data3: [
        { day: '03-01', value: 0 },
        { day: '03-02', value: 192 },
        { day: '03-03', value: 833 },
        { day: '03-04', value: 1412 },
        { day: '03-05', value: 1703 },
        { day: '03-06', value: 2100 },
        { day: '03-07', value: 3714 },
        { day: '03-08', value: 5350 },
        { day: '03-09', value: 6000 },
        { day: '03-10', value: 7300 },
        { day: '03-11', value: 8000 },
        { day: '03-12', value: 10000 },
        { day: '03-13', value: 12000 },
        { day: '03-14', value: 15987 },
        { day: '03-15', value: 21063 },
        { day: '03-16', value: 23000 },
        { day: '03-17', value: 24954 }
      ],
      id: 'ccc'
    };
  },
  components: {
    Chart
  },
  computed: {},
  watch: {},
  methods: {
    changeData() {
      this.data3 = this.data3.concat([
        { day: '03-18', value: 30000 },
        { day: '03-19', value: 36987 },
        { day: '03-20', value: 40063 },
        { day: '03-21', value: 45000 },
        { day: '03-22', value: 50954 }])
      this.$refs.aaa.rebuild();
    }
  },
  mounted() {
    this.$refs.ccc.renderBar();
    this.$refs.bbb.renderLine();
    this.$refs.aaa.renderArea();
  }
};

</script>
<style lang="less" scoped>
</style>
