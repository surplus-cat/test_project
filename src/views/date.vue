<template>
  <div>
    <el-date-picker
      v-model="timeDayzones"
      type="daterange"
      @blur="clear"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      :clearable="false"
      placeholder="选择日期" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeDayzones: '',
      pickerMinDate: '',
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime();

          if (maxDate) {
            this.pickerMinDate = '';
          }
        },
        disabledDate: (time) => {
          if (this.pickerMinDate !== '') {
            const day = 24 * 3600 * 1000;
            let maxTime = this.pickerMinDate + 30 * day;
            let minTime = this.pickerMinDate - 30 * day;

            return time.getTime() > maxTime || time.getTime() < minTime;
          }
        }
      },
    };
  },
  components: {},
  computed: {},
  methods: {
    clear() {
      this.pickerMinDate = '';
    }
  }
};
</script>
<style lang="less" scoped>
</style>
