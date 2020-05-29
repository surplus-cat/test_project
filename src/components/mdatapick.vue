<template>
  <div class="m_calender">
    <input type="text"
      class="date_input"
      readonly="readonly"
      v-model="dataMsg"
      @click="toggleShow">

    <div class="datamain"
      v-if="openState">
      <div class="datacon">
        <div class="title">
          <div class="dynamic"
            :class="{'selected': type === 1}"
            @click="toggle(1)">动态时间</div>
          <div class="static"
            :class="{'selected': type === 2}"
            @click="toggle(2)">静态时间</div>
          <div class="real-time">
            <p v-show="type === 2">{{start}} 至 {{ end }}</p>
            <p v-show="type === 1">{{ dynamicDateText }}</p>
          </div>
        </div>
        <div class="boxer">
          <div class="ranges">
            <ul>
              <li v-for="(el, idx) in option"
                @click="choose(el)"
                :key="idx">{{ el.name }}</li>
            </ul>
          </div>
          <div class="date_main">
            <table class="table-condensed">
              <thead>
                <tr>
                  <th>
                    <i class="prev_arrow" @click="prev('start')"></i>
                  </th>
                  <th colspan="5">{{startYear}} 年 {{getMonthText(startMonth)}} </th>
                  <th>
                    <i class="next_arrow" @click="next('start')"></i>
                  </th>
                </tr>
                <tr>
                  <th v-for="(week, idx) in weeks"
                    :key="idx">{{ week }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- 1阶段对应 0 -7 ， 2阶段对应 8 - 14， 以此类推 -->
                <tr v-for="idx in (startList.length / 7)"
                  :key="idx">
                  <td v-for="(el, index) in startComplexList[idx-1]"
                    :key="index"
                    :class="el.className"
                    @click="clickDate(el, 'start')">{{ el.num }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="date_main">
            <table class="table-condensed">
              <thead>
                <tr>
                  <th>
                    <i class="prev_arrow" @click="prev('end')"></i>
                  </th>
                  <th colspan="5">{{endYear}} 年 {{getMonthText(endMonth)}} </th>
                  <th>
                    <i class="next_arrow" @click="next('end')"></i>
                  </th>
                </tr>
                <tr>
                  <th v-for="(week, idx) in weeks"
                    :key="idx">{{ week }}</th>
                </tr>
              </thead>
              <tbody>
                <!-- 1阶段对应 0 -7 ， 2阶段对应 8 - 14， 以此类推 -->
                <tr v-for="idx in (endList.length / 7)"
                  :key="idx">
                  <td v-for="(el, index) in endComplexList[idx-1]"
                    :key="index"
                    :class="el.className"
                    @click="clickDate(el,'end')">{{ el.num }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="databtn">
        <div class="btn"
          @click="toggleShow">取消</div>
        <div class="btn"
          :class="{ 'disabled': activeStartData > activeEndData, 'active': activeStartData <= activeEndData }"
          @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  props: ["child"],
  data: function () {
    return {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      openState: false,
      start: this.child.start,
      end: this.child.end,
      initList: new Array(42).fill({ className: '', num: '', date: '' }),
      dynamicDateText: '', // 动态时间文本

      startYear: '',
      startMonth: '',
      startFirstWeek: '',
      startDaySum: '',
      startList: [],
      startComplexList: [],

      endYear: '',
      endMonth: '',
      endFirstWeek: '',
      endDaySum: '',
      endList: [],
      endComplexList: [],

      option: [
        { name: '昨日', type: 'yesterday' },
        { name: '今日', type: 'today' },
        { name: '上周', type: 'lastweek' },
        { name: '本周', type: 'thisweek' },
        { name: '上月', type: 'lastmonth' },
        { name: '本月', type: 'thismonth' },
        { name: '去年', type: 'lastyear' },
        { name: '本年', type: 'thisyear' },
        { name: '过去7天', type: 'past7day' },
        { name: '过去30天', type: 'past30day' },
        { name: '上线至今', type: 'onlineday' }
      ],
      type: 2
    }
  },
  computed: {
    // 开始的时间戳
    activeStartData() {
      return new Date(this.start).getTime();
    },
    // 结束的时间戳
    activeEndData() {
      return new Date(this.end).getTime();
    },
    // 显示文字
    dataMsg() {
      return `${this.child.start} ~ ${this.child.end}`;
    },
    isNext() {
      // return this.startMonth > this.endMonth;
    },
    isNext2() {
      return new Date().getMonth() + 1 > this.endMonth;
    },
    check(tag) {
      var startTime = new Date(`${this.startYear}-${this.dealVal(this.startMonth)}-01`).getTime();
      var endTime = new Date(`${this.endYear}-${this.dealVal(this.endMonth)}-01`).getTime();
      if (endTime <= startTime) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.initCalc();
  },
  methods: {
    initCalc() {
      var startDate = new Date(this.start);
      this.startYear = startDate.getFullYear();
      this.startMonth = startDate.getMonth() + 1;

      var endDate = new Date(this.end);
      this.endYear = endDate.getFullYear();
      this.endMonth = endDate.getMonth() + 1;
      this.init();
      this.calcText();
    },
    choose(el) {
      this.dynamicDateText = el.name;
      let start = dayjs();
      let end = dayjs();
      switch (el.type) {
        case 'yesterday':
          start = dayjs().subtract(1, 'day');
          end = dayjs().subtract(1, 'day');
          break;
        case 'lastweek':
          start = dayjs().startOf('week').subtract(1, 'week').add(1, 'day');
          end = dayjs().startOf('week');
          break;
        case 'thisweek':
          start = dayjs().startOf('week').add(1, 'day');
          break;
        case 'lastmonth':
          start = dayjs().startOf('month').subtract(1, 'month');
          end = dayjs().startOf('month').subtract(1, 'day');
          break;
        case 'thismonth':
          start = dayjs().startOf('month');
          break;
        case 'lastyear':
          start = dayjs().subtract(1, 'year').startOf('year');
          end = dayjs().subtract(1, 'year').endOf('year');
          break;
        case 'thisyear':
          start = dayjs().startOf('year');
          break;
        case 'past7day':
          start = dayjs().subtract(1, 'week');
          break;
        case 'past30day':
          start = dayjs().subtract(1, 'month');
          break;
      }
      this.start = start.format('YYYY-MM-DD');
      this.end = end.format('YYYY-MM-DD');
      this.startYear = new Date(this.start).getFullYear();
      this.startMonth = new Date(this.start).getMonth() + 1;

      this.endYear = new Date(this.end).getFullYear();
      this.endMonth = new Date(this.end).getMonth() + 1;

      this.$nextTick(() => {
        this.init();
        this.calcMonth();
        this.$emit("cb", this.start, this.end)
      })
    },
    calcMonth() {
      this.startMonth = Number(this.start.split('-')[1]);
      this.endMonth = Number(this.end.split('-')[1])
    },
    calcText() {
      if (dayjs(this.end).diff(dayjs(), 'day') === 0) {
        this.dynamicDateText = `最近${dayjs().diff(dayjs(this.start), 'day') + 1}天`
      } else if (dayjs(this.end).diff(dayjs(), 'day') === 1) {
        this.dynamicDateText = `过去${dayjs().diff(dayjs(this.start), 'day') - 1}天`
      } else {
        this.dynamicDateText = `过去${dayjs().diff(dayjs(this.end), 'day')}天 - 过去${dayjs().diff(dayjs(this.start), 'day') - 1}天`
      }
    },
    calcDate() {
      var startDate = new Date(this.start);
      this.startYear = startDate.getFullYear();
      this.startMonth = startDate.getMonth() + 1;

      var endDate = new Date(this.end);
      this.endYear = endDate.getFullYear();
      this.endMonth = endDate.getMonth() + 1;
      // 第一天是星期天
      if (dayjs(this.start).startOf('month').toDate().getDay() === 0) {

      }
    },
    clickDate(val, tag) {
      if (val.className !== 'disabled') {
        this[tag] = val.date;
        this.calcText();
        this.$nextTick(() => {
          this.init();
        })
      }
    },
    toggle(val) {
      this.type = val;
    },
    toggleShow() {
      this.openState = !this.openState;
      if (this.openState) {
        this.initCalc();
      }
    },
    init() {
      // 开始的那一天时间
      this.startFirstWeek = new Date(`${this.startYear}-${this.dealVal(this.startMonth)}-01`).getDay();
      this.startDaySum = dayjs(`${this.startYear}-${this.dealVal(this.startMonth)}-01`).daysInMonth();
      this.startList = this.initDate(this.startFirstWeek, this.startDaySum, this.startYear, this.startMonth, this.activeStartData);
      this.endFirstWeek = new Date(`${this.endYear}-${this.dealVal(this.endMonth)}-01`).getDay();
      this.endDaySum = dayjs(`${this.endYear}-${this.dealVal(this.endMonth)}-1`).daysInMonth();
      this.endList = this.initDate(this.endFirstWeek, this.endDaySum, this.endYear, this.endMonth, this.activeEndData);

      this.startComplexList = this.groupArray(this.startList, 7);
      this.endComplexList = this.groupArray(this.endList, 7);
    },
    // 数据分组
    groupArray(data, cols) {
      const r = data.reduce((r, t) => {
        r.current.push(t);
        if (r.current.length === cols) {
          r.list.push(r.current);
          r.current = [];
        }
        return r;
      }, { list: [], current: [] });

      if (r.current.length) {
        r.list.push(r.current);
      }
      return r.list;
    },
    prev(tag) {
      if (tag === 'end') {
        if (!this.check) {
          return false;
        }
      }
      this[tag + 'Month']--;
      if (!this[tag + 'Month']) {
        this[tag + 'Month'] = 12;
        this[tag + 'Year']--;
      }
      this.$nextTick(() => {
        this.init();
      })
    },
    next(tag) {
      if (tag === 'start') {
        if (!this.check) {
          return false;
        }
      }
      this[tag + 'Month']++;
      if (this[tag + 'Month'] > 12) {
        this[tag + 'Month'] = 1;
        this[tag + 'Year']++;
      }
      this.$nextTick(() => {
        this.init();
      })
    },
    // 生成两个表格的数据源
    initDate(FirstWeek, DaySum, Year, Month, activeData) {
      var list = [];
      if (FirstWeek === 0) FirstWeek = 7;
      // 前空白部分
      for (var v = 1; v <= FirstWeek; v++) {
        var Dates = new Date(`${Year}-${this.dealVal(Month)}-01`);
        Dates.setDate(v - FirstWeek);
        list.push({
          "className": "",
          "num": '',
          "date": `${Year}-${this.dealVal(Month - 1)}-${Dates.getDate()}`
        })
      }
      console.log(list.length)
      for (var i = 1; i <= DaySum; i++) {
        let isActive = new Date(`${Year}-${this.dealVal(Month)}-${this.dealVal(i)}`).getTime() === activeData;
        let isEnabled = new Date(`${Year}-${this.dealVal(Month)}-${this.dealVal(i)}`).getTime() > new Date().getTime();

        let inRange = new Date(`${Year}-${this.dealVal(Month)}-${this.dealVal(i)}`).getTime() >= this.activeStartData && new Date(`${Year}-${this.dealVal(Month)}-${this.dealVal(i)}`).getTime() <= this.activeEndData;
        list.push({
          "className": isActive ? 'active' : (isEnabled ? 'disabled' : (inRange ? 'in-range' : '')),
          "num": i,
          "date": `${Year}-${this.dealVal(Month)}-${this.dealVal(i)}`
        })
      }
      console.log(list.length)
      // 后空白部分
      var nextData = new Date(`${Year}-${this.dealVal(Month)}-${DaySum}`).getDay();
      if (nextData === 6) nextData = 0;
      for (var k = 1; k <= 6 - nextData; k++) {
        list.push({
          "className": "",
          "num": '',
          "date": `${Year}-${this.dealVal(Month + 1)}-${this.dealVal(k)}`
        })
      }
      // 补全
      if (list.length < 42) {
        list = list.concat(new Array(42 - list.length).fill({ className: '', num: '', date: '' }));
      }
      return list;
    },
    dealVal(num) {
      num = +num;
      return +num < 10 ? "0" + num : '' + num;
    },
    // 保存
    confirm() {
      if (this.activeStartData > this.activeEndData) return false;
      this.toggleShow();
      this.$emit("cb", this.start, this.end)
    },
    getMonthText(n) {
      return ['', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][n];
    }
  }
}
</script>
<style lang="less" scoped>
.m_calender {
  position: relative;
  display: block;
  margin: 0 auto;
}

.date_input {
  margin: 0 auto;
  width: 200px;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 20px;
  display: block;
  color: #484848;
  font-size: 12px;
  outline: none;
  cursor: pointer;
}
.datamain {
  border: 1px solid #e6e6e6;
  position: absolute;
  left: 50%;
  top: 30px;
  transform: translateX(-50%);

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -18px;
    width: 0;
    height: 0;
    border-top: 9px solid rgba(0, 0, 0, 0);
    border-right: 9px solid rgba(0, 0, 0, 0);
    border-bottom: 9px solid #e6e6e6;
    border-left: 9px solid rgba(0, 0, 0, 0);
  }
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -15px;
    width: 0;
    height: 0;
    border-top: 8px solid rgba(0, 0, 0, 0);
    border-right: 8px solid rgba(0, 0, 0, 0);
    border-bottom: 8px solid white;
    border-left: 8px solid rgba(0, 0, 0, 0);
  }

  .title {
    color: #757575;
    font-size: 13px;
    border-bottom: 1px solid #eeeff5;
    margin-bottom: 8px;

    div {
      display: inline-block;
      text-align: center;
      padding: 5px 0px 8px;
      margin-bottom: -1px;
      cursor: pointer;
      color: #535d68;
      font-size: 14px;
      font-weight: 700;
    }

    .dynamic,
    .static {
      width: 15%;
    }

    .real-time {
      width: 70%;
      box-sizing: border-box;
      padding-right: 15px;
      text-align: right;
    }

    .selected {
      color: #2dca93;
      border-bottom: 2px solid #2dca93;
    }
  }

  .title.original-title div:nth-child(1) {
    width: 30%;
  }

  .title.original-title div:nth-child(2) {
    width: 30%;
  }

  .title.original-title div:nth-child(3) {
    width: 40%;
    text-align: center;
  }

  .ranges {
    width: 156px;
    margin: 0 5px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      font-size: 13px;
      background: #f5f5f5;
      border: 1px solid #f5f5f5;
      color: #08c;
      padding: 3px 12px;
      margin-bottom: 8px;
      border-radius: 5px;
      cursor: pointer;
      display: inline-block;
      margin: 4px 3px;
      padding: 4px 3px;
      text-align: center;
      color: #559ff0;
      border-radius: 2px;
      transition: background 0.2s;
      width: 64px;

      &:nth-last-child(-n + 3) {
        width: 142px;
      }

      &:hover {
        background: #08c;
        border: 1px solid #08c;
        color: #fff;
      }
    }
  }
  .databtn {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 15px 0px 11px;
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 56px;
      height: 24px;
      border: 1px solid red;
      font-size: 12px;
      border: 1px solid #e6e6e6;
      border-radius: 2px;
      margin-right: 8px;
      &.active {
        color: #fff;
        cursor: pointer;
        background-color: #2dca93;
      }

      &.disabled {
        background-color: #ccc;
      }
    }
  }
}

.boxer {
  display: flex;
  .date_main {
    width: 232px;
    background: #ffffff;
    z-index: 20;
    padding: 5px 10px;
    margin-right: 5px;
    border: 1px solid #ccc;
    .title {
      padding: 8px 4px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .time {
        color: #939393;
      }
      .timenum {
        color: #333333;
      }
    }
    .date_top {
      height: 28px;
      line-height: 28px;
      padding: 0 6px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .prev_arrow {
        width: 14px;
        height: 14px;
        background-image: url('../assets/right_arrow.png');
        background-size: contain;
      }
      .next_arrow {
        width: 14px;
        height: 14px;
        background-image: url('../assets/right_arrow.png');
        background-size: contain;
      }
      em {
        width: 14px;
        font-style: normal;
        margin: 9px 4px;
        &.prev_month {
          width: 0px;
          height: 0px;
          border-top: 7px solid rgba(0, 0, 0, 0);
          border-bottom: 7px solid rgba(0, 0, 0, 0);
          border-right: 7px solid #a1a1a1;
          border-left: 7px solid rgba(0, 0, 0, 0);
        }
        &.next_month {
          width: 0px;
          height: 0px;
          border-top: 7px solid rgba(0, 0, 0, 0);
          border-bottom: 7px solid rgba(0, 0, 0, 0);
          border-left: 7px solid #a1a1a1;
          border-right: 7px solid rgba(0, 0, 0, 0);
        }
      }
      p {
        width: 100px;
        flex: 1;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        span {
          display: inline-block;
          text-align: center;
        }
      }
    }
    .date_week {
      height: 24px;
      display: flex;
      .weekday {
        box-sizing: border-box;
        font-style: normal;
        width: 33px;
        height: 24px;
        line-height: 24px;
        display: block;
        color: #484848;
        font-size: 12px;
        font-weight: 700;
        text-align: center;
      }
    }
    .date_day {
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      em {
        font-style: normal;
        width: 22px;
        height: 23px;
        line-height: 23px;
        display: block;
        color: #484848;
        font-size: 12px;
        padding: 5px;
        text-align: center;
        border-top: 1px solid #fff;
        border-right: 1px solid #fff;
        cursor: pointer;
        &:nth-child(7n) {
          border-right: 0px solid #e6e6e6;
        }
        &.on {
          color: #fff;
          background-color: #559ff0;
        }
        &.in-range {
          color: #fff;
          background-color: rgba(74, 144, 226, 0.6);
        }
        &.disabled {
          color: #ccc;
          background-color: #fff;
          cursor: default;
        }
        &:hover {
          color: #fff;
          background-color: #559ff0;
        }
      }
    }
  }
}

.table-condensed {
  border-collapse: separate;

  .prev_arrow {
    width: 32px;
    height: 21px;
    display: block;
    background-image: url('../assets/left_arrow.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .next_arrow {
    width: 32px;
    height: 21px;
    display: block;
    background-image: url('../assets/right_arrow.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.table-condensed td {
  min-width: 30px;
  height: 31px;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  border-collapse: separate;
}

.table-condensed td:empty {
  height: 31px;
}

.table-condensed td.active {
  color: #fff;
  background-color: #559ff0;
  border-bottom: 1px solid #fff;
  border-right: 1px solid #fff;
}

.table-condensed td.available:hover,
.table-condensed td.active:hover {
  background-color: #559ff0 !important;
  border-color: #fff;
}

.table-condensed td.available:not(.active):hover:not {
  border-radius: 4px;
}

.table-condensed td.in-range:hover:not(.start-date):not(.end-date) {
  border-radius: 0;
}

.table-condensed td.disabled {
  opacity: 0.3;
  cursor: default;
}

.table-condensed td.in-range {
  background-color: rgba(74, 144, 226, 0.6);
  border-bottom: 1px solid #fff;
  color: #fff;
}

.table-condensed td.compare.active,
.table-condensed td.compare.available:hover,
.table-condensed td.compare.active:hover {
  background-color: #2dca93 !important;
  border-color: #fff;
}

.table-condensed td.compare.in-range {
  background-color: rgba(0, 178, 121, 0.6);
  border-bottom: 1px solid #fff;
  border-color: #fff;
  color: #fff;
}

.table-condensed td.both.active,
.table-condensed td.both.available:hover,
.table-condensed td.both.active:hover {
  background-color: #28a8b1 !important;
  border-color: #fff;
}

.table-condensed td.both.in-range {
  background-color: rgba(40, 168, 177, 0.7);
  border-bottom: 1px solid #fff;
  border-color: #fff;
  color: #fff;
}
</style>
