<template>
  <div>
    <div class="date-range-field" @click="showCalendar">
      <div class="date-field">
        <label>起始日期</label>
        <span>{{startDate}}</span>
      </div>
      <div class="date-field">
        <label>结束日期</label>
        <span>{{endDate}}</span>
      </div>
    </div>
    <Calendar
      :show="isShow"
      :range="range"
      :from="startDate"
      :to="endDate"
      @complete="complete"
    />
  </div>
</template>

<script>
import Calendar from './menology'
export default {
  name: 'Index',
  data () {
    return {
      isShow: false,
      range: ['2017-12', '2018-5'], // 日历月份范围
      startDate: '2017-12-17', // 默认选中的起始时间
      endDate: '2017-12-26' // 默认选中的结束时间
    }
  },
  created () {
  },
  methods: {
    complete (startDate, endDate) {
      this.startDate = startDate
      this.endDate = endDate
      this.isShow = false
    },
    showCalendar () {
      this.isShow = true
    }
  },
  components: {
    Calendar
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.date-range-field {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin: 0 1.25em;
  border-bottom: 1px solid #eee;
}
.date-field:first-child {
  text-align: left;
}
.date-field:last-child {
  text-align: right;
}
.date-field label {
  display: block;
  font-size: .8em;
  line-height: 2;
  color: rgb(120, 120, 120);
}
.date-field span {
  font-size: 1.4em;
  line-height: 2;
  color: rgb(85, 85, 90);
}
</style>
