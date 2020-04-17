<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    // 日历table表渲染内容 受year/month/day等变化影响
    tableString: {
      get() {
        let year = this.calender_year;
        let month = parseInt(this.calender_month) + 1;
        let day;
        if (month < 10) {
          month = "0" + month;
        }
        if (parseInt(this.calender_day) < 10) {
          day = "0" + this.calender_day;
        } else {
          day = this.calender_day;
        }
        return year + "-" + month + "-" + day;
      },
      set() {}
    }
  },
  watch: {},
  methods: {
    rows() {
      const date = new Date(this.year, this.month, 1); // 本月一号日期
      let day = this.getFirstDayOfMonth(date); // 本月第一天的星期
      day = day === 0 ? 7 : day;
      const dateCountOfMonth = this.getDayCountOfMonth(
        date.getFullYear(),
        date.getMonth()
      ); // 本月的天数
      const dateCountOfLastMonth = this.getDayCountOfPreMonth(
        date.getFullYear(),
        date.getMonth() === 0 ? 11 : date.getMonth() - 1
      ); // 上个月的天数
      const datesArry = this.tableRows;
      let count = 1;
      // 获取当前月需要渲染的每个单元格的日期
      for (let i = 0; i < 6; i++) {
        const row = datesArry[i];
        for (let j = 0; j < 7; j++) {
          let cell = row[j];
          if (!cell) {
            // 初始化cell
            cell = {
              row: i,
              column: j,
              type: "normal",
              isToday: false,
              dateString: null,
              limit: false,
              week: null,
              year: null
            };
          }
          cell.type = "normal";
          // 获取每个cell对应的日期
          if (i >= 0 && i <= 1) {
            if (j + i * 7 >= day - 1) {
              cell.text = count++;
            } else {
              cell.text = dateCountOfLastMonth - (day - 1) + j + 1 - i * 7;
              cell.type = "prev-month";
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++;
            } else {
              cell.text = count++ - dateCountOfMonth;
              cell.type = "next-month";
            }
          }
          this.setCellToday(cell); // 设置是否今天
          this.setCellDateString(cell); // 设置格式化的日期
          this.setCellLimit(cell); // 是否禁用
          this.setCellYear(cell); // 设置年
          this.setCellWeek(cell); // 设置周数
          this.setDisabledWeeks(cell); // 设置禁用周
          this.$set(row, j, cell); // 保存
        }
      }
      return datesArry;
    },
    // 以每年的1月1号为第一周  根据日期获取周数
    getYearWeekByDate(date) {
      if (!date) {
        // 清空input框时候
        let curDate = new Date();
        return {
          year: curDate.getFullYear(),
          week: 0
        };
      }
      // 讲日期移到周日计算
      var temptDate = new Date(date);
      if (temptDate.getDay() !== 0) {
        date = this.addDate(temptDate, 7 - temptDate.getDay());
      }
      var da = date; // 日期格式2018-12-30
      // 当前日期
      var date1 = new Date(
        da.substring(0, 4),
        parseInt(da.substring(5, 7)) - 1,
        da.substring(8, 10)
      );
      // 1月1号
      var date2 = new Date(da.substring(0, 4), 0, 1);
      // 获取1月1号星期（以周一为第一天，0周一~6周日）
      var dateWeekNum = date2.getDay() - 1;
      if (dateWeekNum < 0) {
        dateWeekNum = 6;
      }
      date2.setDate(date2.getDate() - dateWeekNum);
      var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000) + 1;
      var week = Math.ceil(d / 7);
      return {
        year: da.substring(0, 4),
        week: week
      };
    },
    setSelectValue(datesArry) {
      datesArry.forEach((row) => {
        row.forEach((cell, index) => {
          var select = 0
          if (cell.type === 'normal') { // 本月的才设置选中状态
            if ((row[0].year === row[6].year)) {
              // 如果该周起止日期是同一年  并且选择的结束周 > 开始周
              if (cell.week >= this.weekNumStart && cell.week <= this.weekNumEnd && cell.year === Number(this.weekYearStart)) {
                select = 1
                if (index === 0 && cell.week === this.weekNumStart) {
                  select = 2
                }
                if (index === 6 && cell.week === this.weekNumEnd) {
                  select = 3
                }
              }
              // 如果该周跨年了    并且选择的结束周 < 开始周
              if (this.weekYearStart !== this.weekYearEnd) {
                if ((cell.week >= this.weekNumStart && cell.year === Number(this.weekYearStart)) || (cell.week <= this.weekNumEnd && cell.year === Number(this.weekYearEnd))) {
                  select = 1
                  if (index === 0 && cell.week === this.weekNumStart) {
                    select = 2
                  }
                  if (index === 6 && cell.week === this.weekNumEnd) {
                    select = 3
                  }
                }
              }
            } else {
              // 如果该周跨年 以该周的周日所在年和周为比较依据  决定该周是否被选中
              if (row[6].week >= this.weekNumStart && row[6].week <= this.weekNumEnd && row[6].year === Number(this.weekYearStart)) {
                select = 1
                if (index === 0) {
                  select = 2
                }
                if (index === 6 && cell.week === this.weekNumEnd) {
                  select = 3
                }
              }
            }
          }
          this.$set(cell, 'select', select)
        })
      })
    },
    // 设置可选的周范围
    setRngeWeeks(cell) {
      // 如果设置了特定的周范围 并且选择了开始周
      if (this.isSetRange && this.selectFlag !== 0) {
        // 获取结束周可选的周范围的起止时间
        var weekNumsBegin = this.weekNumStart - (Number(this.weekOptions.weekRange) - 1)
        var weekNumsEnd = this.weekNumStart + (Number(this.weekOptions.weekRange) - 1)
        // 周区间时候  获取开始周的年份的总周数
        var currentYear = this.getYearWeekByDate(this.firstSelectValue[1].dateString).year
        var totalWeeksOfCurrentYear = this.getWeekNumsOfYear(currentYear).week
        var totalWeeksOfPreYear = this.getWeekNumsOfYear(Number(currentYear) - 1).week
        var totalWeeksOfAftYear = this.getWeekNumsOfYear(Number(currentYear) + 1).week
        // 对结束周可选的前后区间的取值情况进行多重分类
        if (weekNumsBegin >= 1 && weekNumsEnd <= totalWeeksOfCurrentYear) {
          // 结束周可选的前后区间落在 今年
          if ((cell.week < weekNumsBegin && cell.year === this.weekYearStart) || (cell.week > weekNumsEnd && cell.year === this.weekYearStart)) {
            this.$set(cell, 'limit', true)
          }
          if ((cell.year !== this.weekYearStart)) {
            this.$set(cell, 'limit', true)
          }
        }
        if (weekNumsBegin < 1 && weekNumsEnd <= totalWeeksOfCurrentYear) {
          // 结束周可选的前后区间落在 今年和前一年
          weekNumsBegin = totalWeeksOfPreYear + weekNumsBegin
          if ((cell.week < weekNumsBegin && (Number(cell.year) + 1) === this.weekYearStart) || (cell.week > weekNumsEnd && cell.year === this.weekYearStart)) {
            this.$set(cell, 'limit', true)
          }
          if ((cell.year < this.weekYearStart - 1) || (cell.year > this.weekYearStart + 1)) {
            this.$set(cell, 'limit', true)
          }
        }
        if (weekNumsBegin >= 1 && weekNumsEnd > totalWeeksOfCurrentYear) {
          // 结束周可选的前后区间落在 今年和后一年
          weekNumsEnd = weekNumsEnd - totalWeeksOfCurrentYear
          // debugger
          if ((cell.week < weekNumsBegin && (cell.year) === this.weekYearStart) || (cell.week > weekNumsEnd && Number(cell.year - 1) === this.weekYearStart)) {
            this.$set(cell, 'limit', true)
          }
          if ((cell.year < this.weekYearStart) || (cell.year > this.weekYearStart + 1)) {
            this.$set(cell, 'limit', true)
          }
        }
        if (weekNumsBegin < 1 && weekNumsEnd > totalWeeksOfCurrentYear) {
          // 结束周可选的前后区间落在 前一年和后一年
          weekNumsBegin = totalWeeksOfPreYear + weekNumsBegin
          weekNumsEnd = weekNumsEnd - totalWeeksOfCurrentYear
          if ((cell.week < weekNumsBegin && (cell.year + 1) === this.weekYearStart) || (cell.week > weekNumsEnd && Number(cell.year - 1) === this.weekYearStart)) {
            this.$set(cell, 'limit', true)
          }
          if ((cell.year < this.weekYearStart - 1) || (cell.year > this.weekYearStart + 1)) {
            this.$set(cell, 'limit', true)
          }
        }
      }
    }

  }
};
</script>
<style lang="less" scoped></style>
