<template>
  <transition name="slide">
    <div class="calendar" v-show="show">
      <div class="cal-header">
        <div class="header-bar">
          <div class="btn btn-back" @click="back">取消</div>
          <div class="cal-title">选择日期</div>
        </div>
        <div class="week-bar">
          <div class="cell" v-for="w in week" :key="w">{{w}}</div>
        </div>
      </div>
      <div class="cal-body">
        <section v-for="(item, index) in data" :key="index">
          <div class="month-title">{{item.year}}年{{item.month}}月</div>
          <div class="month-body">
            <div class="cell" v-for="(date, index) in item.dateList" :key="index" @click="selectDate(item.year, item.month, date)">
              <div class="inner" :class="{'start-date': date.isStartDate, 'end-date': date.isEndDate}">
                {{date.date}}
                <div class="cell-desc" v-if="date.isStartDate">开始</div>
                <div class="cell-desc" v-else-if="date.isEndDate">结束</div>
                <div class="cell-desc" v-else-if="date.isToday">今天</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
    'from': {
      type: String,
      default: null
    },
    'to': {
      type: String,
      default: null
    },
    'show': {
      default: false
    },
    'range': {
      type: Array,
      default: () => {
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let start = (y - 1) + '-' + m
        let end = (y + 1) + '-' + m
        return [start, end]
      }
    }
  },
  data () {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      data: [],
      curStartDate: {
        dateStr: this.from,
        isStartDate: false,
        isEndDate: false
      },
      curEndDate: {
        dateStr: this.to,
        isStartDate: false,
        isEndDate: false
      }
    }
  },
  created () {
    this.getData()
  },
  watch: {
    show: function (isShow) {
      if (isShow) {
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      let ret = []
      let startY
      let startM
      let endY
      let endM
      if (this.range) {
        let s = this.range[0].split('-')
        let e = this.range[1].split('-')
        startY = s[0]
        startM = s[1]
        endY = e[0]
        endM = e[1]
      }
      let totalMonth = (endY - startY) * 12 + (endM - startM) + 1
      let curY = startY
      let curM = startM
      for (let i = 0; i < totalMonth; i++) {
        if (curM > 12) {
          curM = 1
          curY++
        }
        let curDateList = this.getMonthData(curY, curM)
        ret[i] = {
          year: curY,
          month: curM,
          dateList: curDateList
        }
        curM++
      }
      this.data = ret
    },
    getMonthData (y, m) {
      let ret = []
      let firstDate = new Date(y, m - 1) // 月第一天
      let firstDateWeek = firstDate.getDay() // 月第一天周几
      let lastDate = new Date(y, m, 0) // 月最后一天
      let totalDate = lastDate.getDate() // 月总天数
      for (let i = 0; i < firstDateWeek; i++) {
        ret[i] = {
          date: null,
          today: false
        }
      }
      for (let i = 1; i <= totalDate; i++) {
        let today = new Date().toDateString()
        let curDate = new Date(y, m - 1, i).toDateString()
        let curDateStr = [y, m, i].join('-')
        let startDate = new Date(this.from).toDateString()
        let endDate = new Date(this.to).toDateString()
        let isToday = curDate === today
        let isStartDate = curDate === startDate
        let isEndDate = curDate === endDate
        let date = {
          date: i,
          dateStr: curDateStr,
          isToday: isToday,
          isStartDate: isStartDate,
          isEndDate: isEndDate
        }
        ret.push(date)
        if (isStartDate) {
          this.curStartDate = date
        }
        if (isEndDate) {
          this.curEndDate = date
        }
      }
      return ret
    },
    selectDate (y, m, d) {
      if (!d.date) {
        return
      }
      let selectDateStr = d.dateStr
      let curStartDateStr = this.curStartDate.dateStr
      let curEndDateStr = this.curEndDate.dateStr
      if (selectDateStr === curStartDateStr || selectDateStr === curEndDateStr) {
        return
      }
      if ((curStartDateStr && ((curEndDateStr) || (+new Date(selectDateStr) - new Date(curStartDateStr) < 0))) || (!curStartDateStr && !curEndDateStr)) {
        // 设置开始日期
        this.curStartDate.isStartDate = false
        this.curEndDate.isEndDate = false
        d.isStartDate = true
        d.isEndDate = false
        this.curStartDate = d
        this.curEndDate = {}
      } else {
        // 设置结束日期
        this.curEndDate.isEndDate = false
        d.isStartDate = false
        d.isEndDate = true
        this.curEndDate = d
      }
      if (this.curStartDate.dateStr && this.curEndDate.dateStr) {
        // 完成选择
        setTimeout(() => {
          this.$emit('complete', this.curStartDate.dateStr, this.curEndDate.dateStr)
        }, 150)
      }
    },
    back () {
      this.$emit('complete', this.from, this.to)
    }
  }
}
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.calendar {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .background-color: #fff;
}
.cal-header {
  position: fixed;
  width: 100%;
  z-index: 1;
  background-color: #f5f5f5;
}
.cal-header::after {
  content: '';
  position: absolute;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #aaa;
  transform: scaleY(0.5);
}
.header-bar {
  height: 2rem;
  line-height: 2rem;
}
.cal-title {
  font-size: 1.1em;
}
.btn {
  padding: 0 .6em;
}
.btn-back {
  position: absolute;
  width: 3.25rem;
  color: rgb(94, 156, 225);
}
.week-bar,
.month-body {
  display: flex;
  flex-wrap: wrap;
}
.month-title {
  background-color: #f5f5f5;
  line-height: 2.5em;
  font-size: 0.9em;
  color: #666;
}
.cell {
  padding: .2em;
  width: 14.28571%;
  height: 2.8rem;
  line-height: 2rem;
  text-align: center;
  font-size: 0.9em;
  background-color: #fff;
}
.cell:nth-child(7n),
.cell:nth-child(7n+1) {
  color: rgb(94, 156, 225);
}
.cell .inner {
  position: relative;
  height: 100%;
  border-radius: 3px;
}
.cell .start-date,
.cell .end-date {
  background-color: rgb(94, 156, 225);
  color: #fff;
}
.cell .cell-desc {
  position: absolute;
  bottom: .25em;
  width: 100%;
  margin: 0 auto;
  font-size: 0.6em;
  line-height: 1;
  color: inherit;
}
.week-bar .cell {
  height: 1.75rem;
  line-height: 1.75rem;
  background-color: inherit;
}
.cal-body {
  padding-top: 3.75rem;
}
.slide-enter-active, .slide-leave-active {
  transition: transform .25s, opacity .1s;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(3rem);
}
</style>
