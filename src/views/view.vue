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
        { month: 'Jan', city: 'Tokyo', temperature: 7 },
        { month: 'Jan', city: 'Beijing', temperature: 10 },
        { month: 'Jan', city: 'London', temperature: 3.9 },
        { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
        { month: 'Feb', city: 'Beijing', temperature: 16.9 },
        { month: 'Feb', city: 'London', temperature: 4.2 },
        { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
        { month: 'Mar', city: 'Beijing', temperature: 12.5 },
        { month: 'Mar', city: 'London', temperature: 5.7 },
        { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
        { month: 'Apr', city: 'Beijing', temperature: 12.5 },
        { month: 'Apr', city: 'London', temperature: 8.5 },
        { month: 'May', city: 'Tokyo', temperature: 18.4 },
        { month: 'May', city: 'Beijing', temperature: 10.9 },
        { month: 'May', city: 'London', temperature: 11.9 },
        { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
        { month: 'Jun', city: 'Beijing', temperature: 31.5 },
        { month: 'Jun', city: 'London', temperature: 15.2 }
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
