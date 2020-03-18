<template>
  <div>
    <el-date-picker v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerMinDate: '',
      pickerOptions: {
        onPick: (obj) => {
          this.pickerMinDate = new Date(obj.minDate).getTime();
          console.log(obj)
        },
        disabledDate: (time) => {
          return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 120;
        },
        shortcuts: [
          {
            text: '昨日',
            onClick(picker) {
              const now = new Date();
              now.setTime(now.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [now, now]);
            }
          },
          {
            text: '今日',
            onClick(picker) {
              const now = new Date();
              picker.$emit('pick', [now, now]);
            }
          },

          {
            text: '上周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '本周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '上月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '本月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '去年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '本年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },

          {
            text: '过去七天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '过去30天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
      },
      value2: ''
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
