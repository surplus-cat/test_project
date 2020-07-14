<template>
  <transition name="el-zoom-in-top" @after-leave="$emit('dodestroy')">
    <div
      v-show="visible"
      class="el-picker-panel el-date-range-picker el-popper"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]"
    >
      <div class="slide-head">
        <div class="slide-head-wrapper">
          <span
            class="slide-item"
            :class="{'selected': slideIndex === 1}"
            @click="slideIndex = 1"
          >相对时间</span>
          <span
            class="slide-item"
            :class="{'selected': slideIndex === 2}"
            @click="slideIndex = 2"
          >绝对时间</span>
        </div>
      </div>
      <div class="slide-box" v-show="slideIndex === 1" style="padding: 0 16px;">
        <ul>
          <li
            class="item"
            :class="{'selected': timeIndex === key}"
            v-for="(item, key) in timeMap"
            :key="key"
            @click="changeTimeIndex(key)"
          >{{item.label}}</li>
        </ul>
      </div>
      <div class="slide-box" v-show="slideIndex === 2">
        <div class="el-picker-panel__body-wrapper">
          <slot name="sidebar" class="el-picker-panel__sidebar"></slot>
          <div class="el-picker-panel__sidebar" v-if="shortcuts">
            <button
              type="button"
              class="el-picker-panel__shortcut"
              v-for="(shortcut, key) in shortcuts"
              :key="key"
              @click="handleShortcutClick(shortcut)"
            >{{shortcut.text}}</button>
          </div>
          <div class="el-picker-panel__body">
            <div class="el-date-range-picker__time-header" v-if="showTime">
              <span class="el-date-range-picker__editors-wrap">
                <span class="el-date-range-picker__time-picker-wrap">
                  <el-input
                    size="small"
                    :disabled="rangeState.selecting"
                    ref="minInput"
                    :placeholder="t('el.datepicker.startDate')"
                    class="el-date-range-picker__editor"
                    :value="minVisibleDate"
                    @input.native="handleDateInput($event, 'min')"
                    @change.native="handleDateChange($event, 'min')"
                  />
                </span>
                <span
                  class="el-date-range-picker__time-picker-wrap"
                  v-clickoutside="handleMinTimeClose"
                >
                  <el-input
                    size="small"
                    :disabled="rangeState.selecting"
                    :placeholder="t('el.datepicker.startTime')"
                    class="el-date-range-picker__editor"
                    :value="minVisibleTime"
                    @focus="minTimePickerVisible = true"
                    @change.native="handleTimeChange($event, 'min')"
                  />
                </span>
              </span>
              <span class="el-icon-arrow-right"></span>
              <span class="el-date-range-picker__editors-wrap is-right">
                <span class="el-date-range-picker__time-picker-wrap">
                  <el-input
                    size="small"
                    :disabled="rangeState.selecting"
                    :placeholder="t('el.datepicker.endDate')"
                    class="el-date-range-picker__editor"
                    :value="maxVisibleDate"
                    :readonly="!minDate"
                    @input.native="handleDateInput($event, 'max')"
                    @change.native="handleDateChange($event, 'max')"
                  />
                </span>
                <span
                  class="el-date-range-picker__time-picker-wrap"
                  v-clickoutside="handleMaxTimeClose"
                >
                  <el-input
                    size="small"
                    :disabled="rangeState.selecting"
                    ref="maxInput"
                    :placeholder="t('el.datepicker.endTime')"
                    class="el-date-range-picker__editor"
                    :value="maxVisibleTime"
                    @focus="minDate && (maxTimePickerVisible = true)"
                    :readonly="!minDate"
                    @change.native="handleTimeChange($event, 'max')"
                  />
                </span>
              </span>
            </div>
            <div class="el-picker-panel__content el-date-range-picker__content is-left">
              <div class="el-date-range-picker__header">
                <button
                  type="button"
                  @click="leftPrevYear"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="leftPrevMonth"
                  class="el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="leftNextYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="leftNextMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
                <div>{{ leftLabel }}</div>
              </div>
              <date-table
                selection-mode="range"
                :date="leftDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick"
              ></date-table>
            </div>
            <div class="el-picker-panel__content el-date-range-picker__content is-right">
              <div class="el-date-range-picker__header">
                <button
                  type="button"
                  @click="rightPrevYear"
                  v-if="unlinkPanels"
                  :disabled="!enableYearArrow"
                  :class="{ 'is-disabled': !enableYearArrow }"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightPrevMonth"
                  v-if="unlinkPanels"
                  :disabled="!enableMonthArrow"
                  :class="{ 'is-disabled': !enableMonthArrow }"
                  class="el-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightNextYear"
                  class="el-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="rightNextMonth"
                  class="el-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
                <div>{{ rightLabel }}</div>
              </div>
              <date-table
                selection-mode="range"
                :date="rightDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                @changerange="handleChangeRange"
                :first-day-of-week="firstDayOfWeek"
                @pick="handleRangePick"
              ></date-table>
            </div>
          </div>
        </div>
        <div class="el-picker-panel__footer" v-if="showTime">
          <el-button
            size="mini"
            type="text"
            class="el-picker-panel__link-btn"
            @click="handleClear"
          >{{ t('el.datepicker.clear') }}</el-button>
          <el-button
            plain
            size="mini"
            class="el-picker-panel__link-btn"
            :disabled="btnDisabled"
            @click="handleConfirm()"
          >{{ t('el.datepicker.confirm') }}</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
import {
  formatDate,
  parseDate,
  isDate,
  modifyDate,
  modifyTime,
  modifyWithTimeString,
  prevYear,
  nextYear,
  prevMonth,
  nextMonth,
  extractDateFormat,
  extractTimeFormat
} from "../util";
import Clickoutside from "element-ui/src/utils/clickoutside";
import Locale from "element-ui/src/mixins/locale";
import DateTable from "../basic/date-table";
import ElInput from "element-ui/packages/input";
import ElButton from "element-ui/packages/button";

const advanceDate = (date, amount) => {
  return new Date(new Date(date).getTime() + amount);
};

const calcDefaultValue = defaultValue => {
  if (Array.isArray(defaultValue)) {
    return [new Date(defaultValue[0]), new Date(defaultValue[1])];
  } else if (defaultValue) {
    return [
      new Date(defaultValue),
      advanceDate(defaultValue, 24 * 60 * 60 * 1000)
    ];
  } else {
    return [new Date(), advanceDate(Date.now(), 24 * 60 * 60 * 1000)];
  }
};

export default {
  mixins: [Locale],

  directives: { Clickoutside },

  computed: {
    btnDisabled() {
      return !(this.minDate && this.maxDate && !this.selecting);
    },

    leftLabel() {
      return (
        this.leftDate.getFullYear() +
        " " +
        this.t("el.datepicker.year") +
        " " +
        this.t(`el.datepicker.month${this.leftDate.getMonth() + 1}`)
      );
    },

    rightLabel() {
      return (
        this.rightDate.getFullYear() +
        " " +
        this.t("el.datepicker.year") +
        " " +
        this.t(`el.datepicker.month${this.rightDate.getMonth() + 1}`)
      );
    },

    leftYear() {
      return this.leftDate.getFullYear();
    },

    leftMonth() {
      return this.leftDate.getMonth();
    },

    leftMonthDate() {
      return this.leftDate.getDate();
    },

    rightYear() {
      return this.rightDate.getFullYear();
    },

    rightMonth() {
      return this.rightDate.getMonth();
    },

    rightMonthDate() {
      return this.rightDate.getDate();
    },

    minVisibleDate() {
      return this.minDate ? formatDate(this.minDate, this.dateFormat) : "";
    },

    maxVisibleDate() {
      return this.maxDate || this.minDate
        ? formatDate(this.maxDate || this.minDate, this.dateFormat)
        : "";
    },

    minVisibleTime() {
      return this.minDate ? formatDate(this.minDate, this.timeFormat) : "";
    },

    maxVisibleTime() {
      return this.maxDate || this.minDate
        ? formatDate(this.maxDate || this.minDate, this.timeFormat)
        : "";
    },

    timeFormat() {
      if (this.format) {
        return extractTimeFormat(this.format);
      } else {
        return "HH:mm:ss";
      }
    },

    dateFormat() {
      if (this.format) {
        return extractDateFormat(this.format);
      } else {
        return "yyyy-MM-dd";
      }
    },

    enableMonthArrow() {
      const nextMonth = (this.leftMonth + 1) % 12;
      const yearOffset = this.leftMonth + 1 >= 12 ? 1 : 0;
      return (
        this.unlinkPanels &&
        new Date(this.leftYear + yearOffset, nextMonth) <
          new Date(this.rightYear, this.rightMonth)
      );
    },

    enableYearArrow() {
      return (
        this.unlinkPanels &&
        this.rightYear * 12 +
          this.rightMonth -
          (this.leftYear * 12 + this.leftMonth + 1) >=
          12
      );
    }
  },

  data() {
    return {
      popperClass: "",
      value: [],
      defaultValue: null,
      defaultTime: null,
      minDate: "",
      maxDate: "",
      leftDate: new Date(),
      rightDate: nextMonth(new Date()),
      rangeState: {
        endDate: null,
        selecting: false,
        row: null,
        column: null
      },
      showTime: false,
      shortcuts: "",
      visible: "",
      disabledDate: "",
      firstDayOfWeek: 7,
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      format: "",
      arrowControl: false,
      unlinkPanels: false,
      // 模式切换
      slideIndex: 1,
      timeIndex: "-1",
      timeMap: [
        {
          label: "今日",
          value: "-1"
        },
        {
          label: "本周",
          value: "10010"
        },
        {
          label: "本月",
          value: "100"
        },
        {
          label: "本年",
          value: "10086"
        },
        {
          label: "今日",
          value: "-1"
        },
        {
          label: "昨日",
          value: "1"
        },
        {
          label: "近3天",
          value: "3"
        },
        {
          label: "近7天",
          value: "7"
        },
        {
          label: "近15天",
          value: "15"
        },
        {
          label: "近30天",
          value: "30"
        },
      ]
    };
  },

  watch: {
    minDate(val) {
      this.$nextTick(() => {
        if (
          this.$refs.maxTimePicker &&
          this.maxDate &&
          this.maxDate < this.minDate
        ) {
          const format = "HH:mm:ss";
          this.$refs.maxTimePicker.selectableRange = [
            [
              parseDate(formatDate(this.minDate, format), format),
              parseDate("23:59:59", format)
            ]
          ];
        }
      });
      if (val && this.$refs.minTimePicker) {
        this.$refs.minTimePicker.date = val;
        this.$refs.minTimePicker.value = val;
      }
    },

    maxDate(val) {
      if (val && this.$refs.maxTimePicker) {
        this.$refs.maxTimePicker.date = val;
        this.$refs.maxTimePicker.value = val;
      }
    },

    minTimePickerVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.minTimePicker.date = this.minDate;
          this.$refs.minTimePicker.value = this.minDate;
          this.$refs.minTimePicker.adjustSpinners();
        });
      }
    },

    maxTimePickerVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.maxTimePicker.date = this.maxDate;
          this.$refs.maxTimePicker.value = this.maxDate;
          this.$refs.maxTimePicker.adjustSpinners();
        });
      }
    },

    value(newVal) {
      if (!newVal) {
        this.minDate = null;
        this.maxDate = null;
      } else if (Array.isArray(newVal)) {
        this.minDate = isDate(newVal[0]) ? new Date(newVal[0]) : null;
        this.maxDate = isDate(newVal[1]) ? new Date(newVal[1]) : null;
        // NOTE: currently, maxDate = minDate + 1 month
        //       should allow them to be set individually in the future
        if (this.minDate) {
          this.leftDate = this.minDate;
          if (this.unlinkPanels && this.maxDate) {
            const minDateYear = this.minDate.getFullYear();
            const minDateMonth = this.minDate.getMonth();
            const maxDateYear = this.maxDate.getFullYear();
            const maxDateMonth = this.maxDate.getMonth();
            this.rightDate =
              minDateYear === maxDateYear && minDateMonth === maxDateMonth
                ? nextMonth(this.maxDate)
                : this.maxDate;
          } else {
            this.rightDate = nextMonth(this.leftDate);
          }
        } else {
          this.leftDate = calcDefaultValue(this.defaultValue)[0];
          this.rightDate = nextMonth(this.leftDate);
        }
      }
    },

    defaultValue(val) {
      if (!Array.isArray(this.value)) {
        const [left, right] = calcDefaultValue(val);
        this.leftDate = left;
        this.rightDate =
          val && val[1] && this.unlinkPanels ? right : nextMonth(this.leftDate);
      }
    }
  },

  methods: {
    changeTimeIndex(index) {
      this.timeIndex = index;
      // 时间参数处理
      this.value = [];
      this.$emit('pick', this.timeMap[index]);
      // this.$emit("pick", [this.minDate, this.maxDate], visible);
    },
    setTimeValue(value) {
      // console.log(value, 5555)
      this.timeMap.forEach((item, key) => {
        if (item.value == value) {
          this.timeIndex = key;
          // this.changeTimeIndex(key);
        }
      });
    },
    // ---------------------------------------------------------
    handleClear() {
      this.minDate = null;
      this.maxDate = null;
      this.leftDate = calcDefaultValue(this.defaultValue)[0];
      this.rightDate = nextMonth(this.leftDate);
      this.$emit("pick", null);
    },

    handleChangeRange(val) {
      this.minDate = val.minDate;
      this.maxDate = val.maxDate;
      this.rangeState = val.rangeState;
    },

    handleDateInput(event, type) {
      const value = event.target.value;
      if (value.length !== this.dateFormat.length) return;
      const parsedValue = parseDate(value, this.dateFormat);

      if (parsedValue) {
        if (
          typeof this.disabledDate === "function" &&
          this.disabledDate(new Date(parsedValue))
        ) {
          return;
        }
        if (type === "min") {
          this.minDate = new Date(parsedValue);
          this.leftDate = new Date(parsedValue);
          this.rightDate = nextMonth(this.leftDate);
        } else {
          this.maxDate = new Date(parsedValue);
          this.leftDate = prevMonth(parsedValue);
          this.rightDate = new Date(parsedValue);
        }
      }
    },

    handleDateChange(event, type) {
      const value = event.target.value;
      const parsedValue = parseDate(value, this.dateFormat);
      if (parsedValue) {
        if (type === "min") {
          this.minDate = modifyDate(
            this.minDate,
            parsedValue.getFullYear(),
            parsedValue.getMonth(),
            parsedValue.getDate()
          );
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
        } else {
          this.maxDate = modifyDate(
            this.maxDate,
            parsedValue.getFullYear(),
            parsedValue.getMonth(),
            parsedValue.getDate()
          );
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
        }
      }
    },

    handleTimeChange(event, type) {
      const value = event.target.value;
      const parsedValue = parseDate(value, this.timeFormat);
      if (parsedValue) {
        if (type === "min") {
          this.minDate = modifyTime(
            this.minDate,
            parsedValue.getHours(),
            parsedValue.getMinutes(),
            parsedValue.getSeconds()
          );
          if (this.minDate > this.maxDate) {
            this.maxDate = this.minDate;
          }
          this.$refs.minTimePicker.value = this.minDate;
          this.minTimePickerVisible = false;
        } else {
          this.maxDate = modifyTime(
            this.maxDate,
            parsedValue.getHours(),
            parsedValue.getMinutes(),
            parsedValue.getSeconds()
          );
          if (this.maxDate < this.minDate) {
            this.minDate = this.maxDate;
          }
          this.$refs.maxTimePicker.value = this.minDate;
          this.maxTimePickerVisible = false;
        }
      }
    },

    handleRangePick(val, close = true) {
      const defaultTime = this.defaultTime || [];
      const minDate = modifyWithTimeString(val.minDate, defaultTime[0]);
      const maxDate = modifyWithTimeString(val.maxDate, defaultTime[1]);

      if (this.maxDate === maxDate && this.minDate === minDate) {
        return;
      }
      this.onPick && this.onPick(val);
      this.maxDate = maxDate;
      this.minDate = minDate;

      // workaround for https://github.com/ElemeFE/element/issues/7539, should remove this block when we don't have to care about Chromium 55 - 57
      setTimeout(() => {
        this.maxDate = maxDate;
        this.minDate = minDate;
      }, 10);
      if (!close || this.showTime) return;
      this.handleConfirm();
    },

    handleShortcutClick(shortcut) {
      if (shortcut.onClick) {
        shortcut.onClick(this);
      }
    },

    handleMinTimePick(value, visible, first) {
      this.minDate = this.minDate || new Date();
      if (value) {
        this.minDate = modifyTime(
          this.minDate,
          value.getHours(),
          value.getMinutes(),
          value.getSeconds()
        );
      }

      if (!first) {
        this.minTimePickerVisible = visible;
      }

      if (
        !this.maxDate ||
        (this.maxDate && this.maxDate.getTime() < this.minDate.getTime())
      ) {
        this.maxDate = new Date(this.minDate);
      }
    },

    handleMinTimeClose() {
      this.minTimePickerVisible = false;
    },

    handleMaxTimePick(value, visible, first) {
      if (this.maxDate && value) {
        this.maxDate = modifyTime(
          this.maxDate,
          value.getHours(),
          value.getMinutes(),
          value.getSeconds()
        );
      }

      if (!first) {
        this.maxTimePickerVisible = visible;
      }

      if (
        this.maxDate &&
        this.minDate &&
        this.minDate.getTime() > this.maxDate.getTime()
      ) {
        this.minDate = new Date(this.maxDate);
      }
    },

    handleMaxTimeClose() {
      this.maxTimePickerVisible = false;
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear() {
      this.leftDate = prevYear(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },

    leftPrevMonth() {
      this.leftDate = prevMonth(this.leftDate);
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate);
      }
    },

    rightNextYear() {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      } else {
        this.rightDate = nextYear(this.rightDate);
      }
    },

    rightNextMonth() {
      if (!this.unlinkPanels) {
        this.leftDate = nextMonth(this.leftDate);
        this.rightDate = nextMonth(this.leftDate);
      } else {
        this.rightDate = nextMonth(this.rightDate);
      }
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear() {
      this.leftDate = nextYear(this.leftDate);
    },

    leftNextMonth() {
      this.leftDate = nextMonth(this.leftDate);
    },

    rightPrevYear() {
      this.rightDate = prevYear(this.rightDate);
    },

    rightPrevMonth() {
      this.rightDate = prevMonth(this.rightDate);
    },

    handleConfirm(visible = false) {
      this.timeIndex = -1;
      this.$emit("pick", [this.minDate, this.maxDate], visible);
    },

    isValidValue(value) {
      return (
        Array.isArray(value) &&
        value &&
        value[0] &&
        value[1] &&
        isDate(value[0]) &&
        isDate(value[1]) &&
        value[0].getTime() <= value[1].getTime() &&
        (typeof this.disabledDate === "function"
          ? !this.disabledDate(value[0]) && !this.disabledDate(value[1])
          : true)
      );
    }
  },

  components: { DateTable, ElInput, ElButton }
};
</script>
<style lang="less" scoped>
.slide-head {
  height: 45px;
  padding: 0 16px;
  margin-bottom: 20px;
  &-wrapper {
    border-bottom: 1px solid #ebeef5;
    .slide-item {
      display: inline-block;
      width: 50%;
      font-size: 14px;
      line-height: 45px;
      text-align: center;
      color: #606266;
      cursor: pointer;
      &.selected {
        color: #3654ea;
        border-bottom: 1px solid #3654ea;
      }
    }
  }
}
.slide-box {
  ul {
    padding-bottom: 20px;
    margin: 0 -8px;
    li.item {
      display: inline-block;
      width: 200px;
      text-align: center;
      line-height: 32px;
      height: 32px;
      background: #eee;
      border: 10px 0;
      border-radius: 4px;
      margin: 5px;
      color: #909399;
      cursor: pointer;
      &.selected {
        background: #3654ea;
        color: #ffffff;
      }
    }
  }
}
</style>
