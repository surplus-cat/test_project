<template>
  <div class="filtro_box">
    <div class="condition_gather">
      <div class="dimension">
        <ul>
          <li v-show="mold !== 1">
            <span class="name">供应商</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <span class="name">时间维度</span>
            <span class="option"
              v-for="(item, index) in times"
              @click="toggle('time', item.value)"
              :class="{'active': time === item.value }"
              :key="index">{{ item.name }}</span>
          </li>
          <li>
            <span class="name">时间段</span>
            <el-date-picker
              v-show="time === 'day'"
              v-model="timezones"
              type="daterange"
              :clearable="false"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <week-picker
              v-show="time === 'week'"
              class="timer"
              v-model="timezones"
              start-placeholder="开始周"
              end-placeholder="结束周"
              type="weekrange"
              value-format="yyyy-MM-dd"
              :clearable="false"
              placeholder="选择周"
              :picker-options="{'firstDayOfWeek': 1}">
            </week-picker>
            <el-date-picker
              v-show="time === 'month'"
              v-model="timezones"
              type="monthrange"
              :clearable="false"
              value-format="yyyy-MM"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <p class="reset">重置</p>
          </li>
        </ul>
      </div>

      <div class="Last_update">
        <span class="clock">数据更新于 <span class="nowTime">{{ nowTime }}</span></span>
        <span class="refreshBtn">刷新 <i class="dj-bi- dj-bi-refresh dj-bi-histogram" /></span>
      </div>
    </div>
  </div>
</template>

<script>
import WeekPicker from 'packages/date-picker/index.js';

export default {
  props: {
    mold: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      nowTime: +new Date(),
      time: 'day',
      timezones: '',
      timeing: '',
      type: 'manager',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      times: [
        {
          name: '日',
          value: 'day'
        },
        {
          name: '周',
          value: 'week'
        },
        {
          name: '月',
          value: 'month'
        },
      ],
    };
  },
  components: {
    WeekPicker
  },
  computed: {},
  methods: {
    toggle (property, value) {
      this[property] = value;
    }
  }
};
</script>
<style lang="less" scoped>
@import './default';

.timer {
  width: 400px
}
</style>
