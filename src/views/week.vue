<template>
  <div>
    <p>
      单选周：<week-pick
        v-model="dateNow"
        @change="changeDate"
        :weekOptions="weekOptions"
      ></week-pick>
    </p>
  </div>
</template>

<script>
import weekPick from "../components/calendar";
export default {
  data() {
    return {
      // 默认值 [开始值,结算值] 或者 []
      dateNow: ["2020-02-25", "2020-03-03"],
      // 配置禁选周
      weekOptions: {
        disabledWeeks: {
          "2019": [10, 11, 12] // 禁用 2019年 第10,11,12 周
        }
      }
    };
  },
  components: {
    weekPick
  },
  computed: {},
  watch: {},
  methods: {}
};
</script>
<style lang="less" scoped></style>
