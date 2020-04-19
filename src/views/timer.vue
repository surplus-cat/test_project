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

    <div class="block">
      <span class="demonstration">默认</span>
      <el-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">周</span>
      <el-date-picker
        v-model="value3"
        type="week"
        format="yyyy 第 WW 周"
        placeholder="选择周"
        :picker-options="{'firstDayOfWeek': 1}">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">周</span>
      <week-picker
        v-model="nowTime"
        type="weekrange"
        format="yyyy 第 WW 周"
        placeholder="选择周"
        :picker-options="{'firstDayOfWeek': 1}">
      </week-picker>
    </div>
  </div>
</template>

<script>
//import WeekPicker from 'packages/date-picker/index.js';

export default {
  components: {
    //WeekPicker
  },
  data() {
    return {
      value1: '',
      value3: '',
      nowTime: '',
      pickerMinDate: '',
      pickerOptions: {
        onPick: (obj) => {
          this.pickerMinDate = new Date(obj.minDate).getTime();
          console.log(obj)
        },
        disabledDate: (time) => {
          // return time.getTime() > Date.now() || time.getTime() < Date.now() - 3600 * 1000 * 24 * 120;
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
.block {
  margin-top: 20px;
}
</style>
